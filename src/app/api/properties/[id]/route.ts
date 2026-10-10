import type { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  toProperty,
  mapInput,
  PROPERTY_FIELDS,
  type PropertyRow,
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
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) return dbError(error.message);
  if (!data) return notFound("Property not found");
  return json(toProperty(data as PropertyRow));
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return unauthorized();

  const body = await readJson(request);
  if (!body) return badRequest("Invalid JSON body");

  const update = mapInput(body, PROPERTY_FIELDS);
  const { data, error } = await supabase
    .from("properties")
    .update(update)
    .eq("id", id)
    .select("*")
    .maybeSingle();
  if (error) return dbError(error.message);
  if (!data) return notFound("Property not found or not permitted");
  return json(toProperty(data as PropertyRow));
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return unauthorized();

  const { error } = await supabase.from("properties").delete().eq("id", id);
  if (error) return dbError(error.message);
  return json({ success: true });
}
