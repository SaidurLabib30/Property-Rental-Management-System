"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Home } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const router = useRouter();

  // Turn a Supabase auth failure into a clear, accurate message. "Invalid
  // credentials" is shown ONLY for genuinely wrong email/password; every other
  // failure (unconfirmed email, disabled provider, unreachable server, rate
  // limiting) gets its own message so the real cause isn't hidden.
  const describeSignInError = (message: string | null, code?: string) => {
    const m = (message ?? '').toLowerCase();
    if (code === 'invalid_credentials' || m.includes('invalid login credentials')) {
      return 'Invalid credentials. Please try again.';
    }
    if (code === 'email_not_confirmed' || m.includes('email not confirmed')) {
      return 'Please confirm your email address first — check your inbox for the confirmation link, then sign in.';
    }
    if (code === 'email_provider_disabled' || m.includes('email logins are disabled')) {
      return 'Email sign-in is disabled for this project. Enable the Email provider in Supabase → Authentication.';
    }
    if (code === 'over_request_rate_limit' || m.includes('rate limit')) {
      return 'Too many attempts. Please wait a moment and try again.';
    }
    if (m.includes('database error')) {
      return 'The sign-in service hit a database error. If the demo users were seeded with SQL, their auth rows need repairing — re-run the fixed seed, then try again.';
    }
    if (m.includes('failed to fetch') || m.includes('networkerror') || m.includes('load failed')) {
      return "Can't reach the authentication server. Check your connection and that the app's Supabase settings are configured, then try again.";
    }
    return message || 'Something went wrong while signing in. Please try again.';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate before calling the server so missing fields get a clear message
    // rather than a generic auth failure.
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail || !password) {
      setError('Please enter both your email and password.');
      return;
    }

    setLoading(true);
    const { error: signInError, code, role } = await signIn(normalizedEmail, password);
    setLoading(false);
    if (signInError) {
      setError(describeSignInError(signInError, code));
      return;
    }
    // Role comes from the user's stored profile, never from client input, so a
    // user can only reach the dashboard their assigned role allows.
    router.push(`/${role ?? 'tenant'}`);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md border-0 shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2">
            <Home className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
          <p className="text-sm text-muted-foreground">Sign in to your PropEase account</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">{error}</div>}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Signing in…' : 'Sign In'}</Button>
          </form>
          <div className="mt-4 text-center text-sm text-muted-foreground">
            Don&apos;t have an account? <Link href="/register" className="text-primary font-medium hover:underline">Sign up</Link>
          </div>
          <div className="mt-4 p-3 bg-muted rounded-md text-xs text-muted-foreground">
            <p className="font-semibold mb-1">Demo Credentials (after seeding):</p>
            <p>Owner: john@example.com</p>
            <p>Tenant: sarah@example.com</p>
            <p>Agent: michael@example.com</p>
            <p>Admin: emily@example.com</p>
            <p>Password: password123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
