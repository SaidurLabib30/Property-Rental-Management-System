import type { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  toApplication,
  mapInput,
  APPLICATION_FIELDS,
  type ApplicationRow,
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

// PATCH /api/applications/[id] — the owner (or admin) updates status/message.
export async function PATCH(request: NextRequest, { params }: Params) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return unauthorized();

  const body = await readJson(request);
  if (!body) return badRequest("Invalid JSON body");

  const update = mapInput(body, APPLICATION_FIELDS);
  const { data, error } = await supabase
    .from("applications")
    .update(update)
    .eq("id", id)
    .select("*")
    .maybeSingle();
  if (error) return dbError(error.message);
  if (!data) return notFound("Application not found or not permitted");
  return json(toApplication(data as ApplicationRow));
}
