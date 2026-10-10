import type { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  toPayment,
  mapInput,
  PAYMENT_FIELDS,
  type PaymentRow,
} from "@/lib/supabase/mappers";
import { json, badRequest, unauthorized, dbError, readJson } from "@/lib/api/http";

// GET /api/payments — RLS limits rows to the tenant, property owner, or admin.
export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const sp = request.nextUrl.searchParams;

  let query = supabase
    .from("payments")
    .select("*")
    .order("payment_date", { ascending: false });

  const status = sp.get("status");
  const propertyId = sp.get("propertyId");
  const tenantId = sp.get("tenantId");
  if (status) query = query.eq("status", status);
  if (propertyId) query = query.eq("property_id", propertyId);
  if (tenantId) query = query.eq("tenant_id", tenantId);

  const { data, error } = await query;
  if (error) return dbError(error.message);
  return json((data as PaymentRow[]).map(toPayment));
}

// POST /api/payments — record a payment (tenant or property owner).
export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return unauthorized();

  const body = await readJson(request);
  if (!body) return badRequest("Invalid JSON body");
  if (!body.propertyId) return badRequest("propertyId is required");
  if (body.amount === undefined) return badRequest("amount is required");

  const insert = {
    tenant_id: user.id,
    ...mapInput(body, PAYMENT_FIELDS),
  };
  const { data, error } = await supabase
    .from("payments")
    .insert(insert)
    .select("*")
    .single();
  if (error) return dbError(error.message);
  return json(toPayment(data as PaymentRow), 201);
}
