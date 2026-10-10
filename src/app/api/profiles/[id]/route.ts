import type { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  toUser,
  mapInput,
  PROFILE_FIELDS,
  type ProfileRow,
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

export async function GET(_request: NextRequest, { params }: Params) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return unauthorized();

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) return dbError(error.message);
  if (!data) return notFound("Profile not found");
  return json(toUser(data as ProfileRow));
}

// PATCH /api/profiles/[id] — update own profile (or any profile as admin).
export async function PATCH(request: NextRequest, { params }: Params) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return unauthorized();

  const body = await readJson(request);
  if (!body) return badRequest("Invalid JSON body");

  const update = mapInput(body, PROFILE_FIELDS);
  const { data, error } = await supabase
    .from("profiles")
    .update(update)
    .eq("id", id)
    .select("*")
    .maybeSingle();
  if (error) return dbError(error.message);
  if (!data) return notFound("Profile not found or not permitted");
  return json(toUser(data as ProfileRow));
}
