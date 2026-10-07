"use client";

import { useAuth } from '@/hooks/useAuth';
import { Sidebar } from '@/components/dashboard/sidebar';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { UserRole } from '@/types';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

function getRoleFromPath(pathname: string): UserRole | null {
  const segments = pathname.split('/').filter(Boolean);
  const dashboardIndex = segments.indexOf('dashboard');
  if (dashboardIndex === -1 || dashboardIndex + 1 >= segments.length) return null;
  const role = segments[dashboardIndex + 1] as UserRole;
  if (['owner', 'tenant', 'agent', 'admin'].includes(role)) return role;
  return null;
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const pathname = usePathname();
  const role = getRoleFromPath(pathname);

  if (!role || !user || user.role !== role) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role={role} />
      <div className="flex-1 flex flex-col lg:ml-64">
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-0">
                <div className="flex h-16 items-center gap-2 border-b px-6">
                  <span className="font-bold capitalize">{role} Dashboard</span>
                </div>
                <nav className="p-3">
                  <Sidebar role={role} />
                </nav>
              </SheetContent>
            </Sheet>
            <h1 className="text-lg font-semibold capitalize hidden sm:block">{pathname.split('/').pop() || 'Overview'}</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:block">Welcome, {user.name}</span>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
