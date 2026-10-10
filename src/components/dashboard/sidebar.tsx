"use client";

// sidebar.tsx
// The dashboard's left navigation. `SidebarContent` renders the brand header
// plus the vertical list of role-specific links; `Sidebar` wraps it in a fixed
// navy rail for desktop. The dashboard layout reuses `SidebarContent` inside a
// slide-out drawer on mobile, so both always show the same vertical menu.
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Building2, Users, FileText, MessageSquare, Settings, BarChart3, LayoutDashboard, CreditCard, UserCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { UserRole } from '@/types';

interface SidebarProps {
  role: UserRole;
}

// Menu definition for every role: the section title plus its list of links
// (each with a URL, label, and icon). The component picks the entry that
// matches the `role` prop. Hrefs point at the real dashboard routes.
const roleConfig: Record<UserRole, { title: string; items: { href: string; label: string; icon: React.ElementType }[] }> = {
  owner: {
    title: 'Owner Dashboard',
    items: [
      { href: '/owner', label: 'Overview', icon: LayoutDashboard },
      { href: '/owner/properties', label: 'My Properties', icon: Building2 },
      { href: '/owner/rent', label: 'Rent Collection', icon: CreditCard },
      { href: '/owner/tenants', label: 'Tenants', icon: Users },
      { href: '/owner/complaints', label: 'Complaints', icon: MessageSquare },
      { href: '/owner/analytics', label: 'Analytics', icon: BarChart3 },
      { href: '/owner/settings', label: 'Settings', icon: Settings },
    ],
  },
  tenant: {
    title: 'Tenant Dashboard',
    items: [
      { href: '/tenant', label: 'Overview', icon: LayoutDashboard },
      { href: '/tenant/properties', label: 'Browse Properties', icon: Building2 },
      { href: '/tenant/applications', label: 'Applications', icon: FileText },
      { href: '/tenant/payments', label: 'Payments', icon: CreditCard },
      { href: '/tenant/complaints', label: 'Support', icon: MessageSquare },
      { href: '/tenant/settings', label: 'Settings', icon: Settings },
    ],
  },
  agent: {
    title: 'Agent Dashboard',
    items: [
      { href: '/agent', label: 'Overview', icon: LayoutDashboard },
      { href: '/agent/properties', label: 'Properties', icon: Building2 },
      { href: '/agent/verification', label: 'Verification', icon: UserCheck },
      { href: '/agent/applications', label: 'Applications', icon: FileText },
      { href: '/agent/agreements', label: 'Agreements', icon: FileText },
      { href: '/agent/messages', label: 'Messages', icon: MessageSquare },
      { href: '/agent/settings', label: 'Settings', icon: Settings },
    ],
  },
  admin: {
    title: 'Admin Dashboard',
    items: [
      { href: '/admin', label: 'Overview', icon: LayoutDashboard },
      { href: '/admin/users', label: 'User Management', icon: Users },
      { href: '/admin/properties', label: 'Properties', icon: Building2 },
      { href: '/admin/reports', label: 'Reports', icon: BarChart3 },
      { href: '/admin/complaints', label: 'Complaints', icon: MessageSquare },
      { href: '/admin/settings', label: 'Settings', icon: Settings },
    ],
  },
};

/* APPEND-SIDEBAR */

// Shared inner content: brand header + vertical nav. Used by both the fixed
// desktop rail and the mobile drawer so they always look identical.
export function SidebarContent({ role }: SidebarProps) {
  // Current URL path, used to highlight the active link.
  const pathname = usePathname();
  // The menu config for this user's role.
  const config = roleConfig[role];

  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      {/* Brand: amber logo mark + project name and the role's dashboard title */}
      <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6">
        <Building2 className="h-6 w-6 shrink-0 text-sidebar-primary" />
        <div className="leading-tight">
          <div className="text-sm font-bold text-white">Property Rental</div>
          <div className="text-[11px] text-sidebar-foreground/70">{config.title}</div>
        </div>
      </div>

      {/* Vertical navigation: one link per row, icon beside its label */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {config.items.map((item) => {
          // A link is "active" when it exactly matches the URL, or (for
          // non-root links) when the URL starts with the link's path.
          const isActive = pathname === item.href || (item.href !== `/${role}` && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  // Active row: solid blue pill with white text and an amber icon.
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  // Inactive row: light text that lifts to a lighter navy on hover.
                  : 'text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground'
              )}
            >
              <item.icon className={cn('h-4 w-4 shrink-0', isActive && 'text-sidebar-primary')} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

// Desktop: fixed navy left rail. Hidden below `lg`, where the layout shows the
// same content inside a slide-out drawer instead.
export function Sidebar({ role }: SidebarProps) {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-sidebar-border lg:block">
      <SidebarContent role={role} />
    </aside>
  );
}
