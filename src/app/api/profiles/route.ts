import type { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { toUser, type ProfileRow } from "@/lib/supabase/mappers";
import { json, unauthorized, dbError } from "@/lib/api/http";

// GET /api/profiles — list profiles (requires auth; RLS applies).
export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return unauthorized();

  const sp = request.nextUrl.searchParams;
  let query = supabase
    .from("profiles")
    .select("*")
    .order("joined_date", { ascending: false });

  const role = sp.get("role");
  if (role) query = query.eq("role", role);

  const { data, error } = await query;
  if (error) return dbError(error.message);
  return json((data as ProfileRow[]).map(toUser));
}
