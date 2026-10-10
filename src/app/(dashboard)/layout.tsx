"use client";

// Shared layout for every page under the (dashboard) route group.
// It renders a fixed navy sidebar on the left and a separate top header, with
// the page content to the right. It also guards access: a signed-in user only
// sees the dashboard section that matches their own role.

import { useAuth } from '@/hooks/useAuth';
import { Sidebar, SidebarContent } from '@/components/dashboard/sidebar';
import { Button } from '@/components/ui/button';
import { Menu, LogOut } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { UserRole } from '@/types';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode } from 'react';

// The dashboard role is the first segment of the URL, e.g. "/owner/payments"
// -> "owner". Returns null when the path has no recognised role so the layout
// can block access.
function getRoleFromPath(pathname: string): UserRole | null {
  const segments = pathname.split('/').filter(Boolean);
  const role = segments[0] as UserRole;
  if (['owner', 'tenant', 'agent', 'admin'].includes(role)) return role;
  return null;
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  // Current user and auth helpers from our auth hook.
  const { user, loading, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  // The role this URL belongs to (e.g. "tenant" for /tenant/...).
  const role = getRoleFromPath(pathname);

  // While we are still checking who is signed in, render nothing to avoid a flicker.
  if (loading) {
    return null;
  }

  // Access guard: only show the page when a valid role is in the URL, a user is
  // signed in, and that user's role matches the section being viewed.
  if (!role || !user || user.role !== role) {
    return null;
  }

  // Sign the user out, then send them back to the login page.
  const handleSignOut = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed navy sidebar on the left (desktop only). */}
      <Sidebar role={role} />

      {/* Everything to the right of the sidebar; offset by the sidebar width on lg+. */}
      <div className="flex min-h-screen flex-col lg:ml-64">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-card px-4 sm:px-6">
          <div className="flex items-center gap-3">
            {/* Mobile: the menu button opens the same sidebar as a slide-out drawer. */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-0 border-sidebar-border">
                <SidebarContent role={role} />
              </SheetContent>
            </Sheet>
            {/* Page title taken from the last part of the URL (falls back to "Overview"). */}
            <h1 className="text-lg font-semibold capitalize hidden sm:block">{pathname.split('/').pop() || 'Overview'}</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:block">Welcome, {user.name}</span>
            {/* Sign-out button wired to the handler above. */}
            <Button variant="ghost" size="sm" className="gap-2" onClick={handleSignOut}>
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Sign out</span>
            </Button>
          </div>
        </header>
        {/* The actual dashboard page content is rendered here. */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
