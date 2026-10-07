"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Building2, Users, FileText, MessageSquare, Settings, BarChart3, LayoutDashboard, CreditCard, UserCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { UserRole } from '@/types';

interface SidebarProps {
  role: UserRole;
}

const roleConfig: Record<UserRole, { title: string; items: { href: string; label: string; icon: React.ElementType }[] }> = {
  owner: {
    title: 'Owner Dashboard',
    items: [
      { href: '/dashboard/owner', label: 'Overview', icon: LayoutDashboard },
      { href: '/dashboard/owner/properties', label: 'My Properties', icon: Building2 },
      { href: '/dashboard/owner/rent', label: 'Rent Collection', icon: CreditCard },
      { href: '/dashboard/owner/tenants', label: 'Tenants', icon: Users },
      { href: '/dashboard/owner/complaints', label: 'Complaints', icon: MessageSquare },
      { href: '/dashboard/owner/analytics', label: 'Analytics', icon: BarChart3 },
      { href: '/dashboard/owner/settings', label: 'Settings', icon: Settings },
    ],
  },
  tenant: {
    title: 'Tenant Dashboard',
    items: [
      { href: '/dashboard/tenant', label: 'Overview', icon: LayoutDashboard },
      { href: '/dashboard/tenant/properties', label: 'Browse Properties', icon: Building2 },
      { href: '/dashboard/tenant/applications', label: 'Applications', icon: FileText },
      { href: '/dashboard/tenant/payments', label: 'Payments', icon: CreditCard },
      { href: '/dashboard/tenant/complaints', label: 'Support', icon: MessageSquare },
      { href: '/dashboard/tenant/settings', label: 'Settings', icon: Settings },
    ],
  },
  agent: {
    title: 'Agent Dashboard',
    items: [
      { href: '/dashboard/agent', label: 'Overview', icon: LayoutDashboard },
      { href: '/dashboard/agent/properties', label: 'Properties', icon: Building2 },
      { href: '/dashboard/agent/verification', label: 'Verification', icon: UserCheck },
      { href: '/dashboard/agent/applications', label: 'Applications', icon: FileText },
      { href: '/dashboard/agent/agreements', label: 'Agreements', icon: FileText },
      { href: '/dashboard/agent/messages', label: 'Messages', icon: MessageSquare },
      { href: '/dashboard/agent/settings', label: 'Settings', icon: Settings },
    ],
  },
  admin: {
    title: 'Admin Dashboard',
    items: [
      { href: '/dashboard/admin', label: 'Overview', icon: LayoutDashboard },
      { href: '/dashboard/admin/users', label: 'User Management', icon: Users },
      { href: '/dashboard/admin/properties', label: 'Properties', icon: Building2 },
      { href: '/dashboard/admin/reports', label: 'Reports', icon: BarChart3 },
      { href: '/dashboard/admin/complaints', label: 'Complaints', icon: MessageSquare },
      { href: '/dashboard/admin/settings', label: 'Settings', icon: Settings },
    ],
  },
};

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const config = roleConfig[role];

  return (
    <aside className="hidden lg:flex w-64 flex-col border-r bg-sidebar">
      <div className="flex h-16 items-center gap-2 border-b px-6">
        <Building2 className="h-6 w-6 text-primary" />
        <span className="font-bold">{config.title}</span>
      </div>
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {config.items.map((item) => {
          const isActive = pathname === item.href || (item.href !== `/dashboard/${role}` && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-sidebar-accent-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
