import type { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  toComplaint,
  mapInput,
  COMPLAINT_FIELDS,
  type ComplaintRow,
} from "@/lib/supabase/mappers";
import { json, badRequest, unauthorized, dbError, readJson } from "@/lib/api/http";

// GET /api/complaints — RLS limits rows to the author, property owner, or admin.
export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const sp = request.nextUrl.searchParams;

  let query = supabase
    .from("complaints")
    .select("*")
    .order("created_at", { ascending: false });

  const status = sp.get("status");
  const propertyId = sp.get("propertyId");
  if (status) query = query.eq("status", status);
  if (propertyId) query = query.eq("property_id", propertyId);

  const { data, error } = await query;
  if (error) return dbError(error.message);
  return json((data as ComplaintRow[]).map(toComplaint));
}

// POST /api/complaints — the current user files a complaint.
export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return unauthorized();

  const body = await readJson(request);
  if (!body) return badRequest("Invalid JSON body");
  if (!body.subject) return badRequest("subject is required");

  const insert = {
    ...mapInput(body, COMPLAINT_FIELDS),
    user_id: user.id,
  };
  const { data, error } = await supabase
    .from("complaints")
    .insert(insert)
    .select("*")
    .single();
  if (error) return dbError(error.message);
  return json(toComplaint(data as ComplaintRow), 201);
}
