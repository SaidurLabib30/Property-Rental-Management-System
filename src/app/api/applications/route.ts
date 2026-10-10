import type { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { toApplication, type ApplicationRow } from "@/lib/supabase/mappers";
import { json, badRequest, unauthorized, dbError, readJson } from "@/lib/api/http";

// GET /api/applications — RLS limits rows to the tenant, owner, or admin.
export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const sp = request.nextUrl.searchParams;

  let query = supabase
    .from("applications")
    .select("*")
    .order("applied_at", { ascending: false });

  const status = sp.get("status");
  const propertyId = sp.get("propertyId");
  if (status) query = query.eq("status", status);
  if (propertyId) query = query.eq("property_id", propertyId);

  const { data, error } = await query;
  if (error) return dbError(error.message);
  return json((data as ApplicationRow[]).map(toApplication));
}

// POST /api/applications — a tenant applies for a property.
export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return unauthorized();

  const body = await readJson(request);
  if (!body) return badRequest("Invalid JSON body");
  const propertyId = body.propertyId as string | undefined;
  if (!propertyId) return badRequest("propertyId is required");

  // Derive the owner from the property so the client cannot spoof it.
  const { data: property, error: propError } = await supabase
    .from("properties")
    .select("owner_id")
    .eq("id", propertyId)
    .maybeSingle();
  if (propError) return dbError(propError.message);
  if (!property) return badRequest("Invalid propertyId");

  const insert = {
    property_id: propertyId,
    tenant_id: user.id,
    owner_id: (property as { owner_id: string }).owner_id,
    message: (body.message as string) ?? null,
    status: "pending",
  };
  const { data, error } = await supabase
    .from("applications")
    .insert(insert)
    .select("*")
    .single();
  if (error) return dbError(error.message);
  return json(toApplication(data as ApplicationRow), 201);
}
