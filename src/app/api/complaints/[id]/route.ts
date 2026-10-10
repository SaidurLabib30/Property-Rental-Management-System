import type { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  toComplaint,
  mapInput,
  COMPLAINT_FIELDS,
  type ComplaintRow,
} from "@/lib/supabase/mappers";
import {
  json,
  badRequest,
  unauthorized,
  notFound,
  dbError,
  readJson,
} from "@/lib/api/http";

type Params = { params: Promise<{ id: string }> };

// PATCH /api/complaints/[id] — author, property owner, or admin updates it.
export async function PATCH(request: NextRequest, { params }: Params) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return unauthorized();

  const body = await readJson(request);
  if (!body) return badRequest("Invalid JSON body");

  const update = mapInput(body, COMPLAINT_FIELDS);
  const { data, error } = await supabase
    .from("complaints")
    .update(update)
    .eq("id", id)
    .select("*")
    .maybeSingle();
  if (error) return dbError(error.message);
  if (!data) return notFound("Complaint not found or not permitted");
  return json(toComplaint(data as ComplaintRow));
}
