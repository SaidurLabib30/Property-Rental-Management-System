"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { Session } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { Toaster } from "@/components/ui/toast";
import type { UserRole } from "@/types";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone: string;
  verified: boolean;
};

export type SignUpInput = {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  phone?: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  loading: boolean;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ error: string | null; role?: UserRole }>;
  signUp: (
    input: SignUpInput
  ) => Promise<{ error: string | null; needsEmailConfirmation?: boolean }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used within <Providers>");
  return ctx;
}

/* PLACEHOLDER-PROVIDER */

export function Providers({ children }: { children: React.ReactNode }) {
  const [supabase] = useState(() => createClient());
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const resolveUser = useCallback(
    async (session: Session | null): Promise<AuthUser | null> => {
      if (!session?.user) return null;
      const { data } = await supabase
        .from("profiles")
        .select("id,name,email,role,phone,verified")
        .eq("id", session.user.id)
        .maybeSingle();
      if (data) {
        return {
          id: data.id,
          name: data.name ?? "",
          email: data.email ?? session.user.email ?? "",
          role: data.role as UserRole,
          phone: data.phone ?? "",
          verified: !!data.verified,
        };
      }
      // Profile not created yet (e.g. trigger lag) — fall back to signup metadata.
      const meta = session.user.user_metadata ?? {};
      return {
        id: session.user.id,
        name: (meta.name as string) ?? "",
        email: session.user.email ?? "",
        role: (meta.role as UserRole) ?? "tenant",
        phone: (meta.phone as string) ?? "",
        verified: false,
      };
    },
    [supabase]
  );

  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(async ({ data }) => {
      const u = await resolveUser(data.session);
      if (active) {
        setUser(u);
        setLoading(false);
      }
    });
    const { data: sub } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const u = await resolveUser(session);
        if (active) setUser(u);
      }
    );
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, [supabase, resolveUser]);

  /* PLACEHOLDER-ACTIONS */

  const signIn = useCallback(
    async (email: string, password: string) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) return { error: error.message };
      const u = await resolveUser(data.session);
      setUser(u);
      return { error: null, role: u?.role };
    },
    [supabase, resolveUser]
  );

  const signUp = useCallback(
    async ({ name, email, password, role, phone }: SignUpInput) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name, role, phone } },
      });
      if (error) return { error: error.message };
      if (data.session) {
        setUser(await resolveUser(data.session));
        return { error: null, needsEmailConfirmation: false };
      }
      // No session => email confirmation is enabled for this project.
      return { error: null, needsEmailConfirmation: true };
    },
    [supabase, resolveUser]
  );

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
  }, [supabase]);

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
      <Toaster />
    </AuthContext.Provider>
  );
}
