import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Privileged, server-only Supabase client (service-role / secret key).
 * BYPASSES Row Level Security — only use in trusted server code for admin
 * operations (e.g. listing/banning users). Never import this into client code.
 */
export function createAdminClient() {
  const secretKey = process.env.SUPABASE_SECRET_KEY;
  if (!secretKey) {
    throw new Error(
      "SUPABASE_SECRET_KEY is not set. Add it to .env.local to use the admin client."
    );
  }

  return createSupabaseClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, secretKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
