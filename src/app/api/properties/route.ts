import type { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  toProperty,
  mapInput,
  PROPERTY_FIELDS,
  type PropertyRow,
} from "@/lib/supabase/mappers";
import { json, badRequest, unauthorized, dbError, readJson } from "@/lib/api/http";

// GET /api/properties — public listing with optional filters.
export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const sp = request.nextUrl.searchParams;

  let query = supabase
    .from("properties")
    .select("*")
    .order("created_at", { ascending: false });

  const city = sp.get("city");
  const type = sp.get("type");
  const status = sp.get("status");
  const featured = sp.get("featured");
  const ownerId = sp.get("ownerId");

  if (city) query = query.ilike("city", `%${city}%`);
  if (type) query = query.eq("property_type", type);
  if (status) query = query.eq("status", status);
  if (featured) query = query.eq("featured", featured === "true");
  if (ownerId) query = query.eq("owner_id", ownerId);

  const { data, error } = await query;
  if (error) return dbError(error.message);
  return json((data as PropertyRow[]).map(toProperty));
}

// POST /api/properties — create a property owned by the current user.
export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return unauthorized();

  const body = await readJson(request);
  if (!body) return badRequest("Invalid JSON body");
  if (!body.title) return badRequest("title is required");

  const insert = { ...mapInput(body, PROPERTY_FIELDS), owner_id: user.id };
  const { data, error } = await supabase
    .from("properties")
    .insert(insert)
    .select("*")
    .single();
  if (error) return dbError(error.message);
  return json(toProperty(data as PropertyRow), 201);
}
