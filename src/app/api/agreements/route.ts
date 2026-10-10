import type { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  toAgreement,
  mapInput,
  AGREEMENT_FIELDS,
  type AgreementRow,
} from "@/lib/supabase/mappers";
import { json, badRequest, unauthorized, dbError, readJson } from "@/lib/api/http";

// GET /api/agreements — RLS limits rows to the tenant, owner, or admin.
export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const sp = request.nextUrl.searchParams;

  let query = supabase
    .from("agreements")
    .select("*")
    .order("created_at", { ascending: false });

  const status = sp.get("status");
  const propertyId = sp.get("propertyId");
  if (status) query = query.eq("status", status);
  if (propertyId) query = query.eq("property_id", propertyId);

  const { data, error } = await query;
  if (error) return dbError(error.message);
  return json((data as AgreementRow[]).map(toAgreement));
}

// POST /api/agreements — the property owner (or admin) creates an agreement.
export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return unauthorized();

  const body = await readJson(request);
  if (!body) return badRequest("Invalid JSON body");
  for (const field of ["propertyId", "tenantId", "startDate", "endDate"]) {
    if (!body[field]) return badRequest(`${field} is required`);
  }

  const insert = {
    ...mapInput(body, AGREEMENT_FIELDS),
    owner_id: user.id,
  };
  const { data, error } = await supabase
    .from("agreements")
    .insert(insert)
    .select("*")
    .single();
  if (error) return dbError(error.message);
  return json(toAgreement(data as AgreementRow), 201);
}
