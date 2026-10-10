"use client";

import { useAuthContext } from "@/components/providers";
export type { AuthUser } from "@/components/providers";

/**
 * Auth hook backed by real Supabase Auth (see `Providers` in
 * `src/components/providers.tsx`). Exposes the current user plus
 * sign-in / sign-up / sign-out actions.
 *
 * `logout` is kept as an alias of `signOut` for existing callers.
 */
export function useAuth() {
  const { user, loading, signIn, signUp, signOut } = useAuthContext();
  return { user, loading, signIn, signUp, signOut, logout: signOut };
}
