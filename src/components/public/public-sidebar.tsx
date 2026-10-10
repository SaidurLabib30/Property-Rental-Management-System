"use client";

// public-sidebar.tsx
// The left-hand navigation for the PUBLIC site (home, listings, about,
// contact). The four primary links live here now instead of across the top
// navbar. `PublicNavLinks` is the shared vertical list (reused in the mobile
// drawer); `PublicSidebar` wraps it in a fixed navy rail for desktop.
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Building2, Info, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

// The four public navigation links, each with an icon and its existing route.
const links = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/listings', label: 'Properties', icon: Building2 },
  { href: '/about', label: 'About', icon: Info },
  { href: '/contact', label: 'Contact', icon: Mail },
];

// The vertical list of links with the current route highlighted. `onNavigate`
// lets the mobile drawer close itself when a link is tapped.
export function PublicNavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav className="space-y-1">
      {links.map((item) => {
        // "/" matches only the home page exactly; other links match when the
        // URL starts with their path (so /listings/123 still highlights Properties).
        const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
              isActive
                // Active link: solid blue pill, white text, amber icon.
                ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                // Inactive: light text that lifts to a lighter navy on hover.
                : 'text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground'
            )}
          >
            <item.icon className={cn('h-4 w-4 shrink-0', isActive && 'text-sidebar-primary')} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

// Desktop: fixed navy rail on the left. Hidden below `lg`, where the navbar's
// menu button opens the same links in a slide-out drawer instead.
export function PublicSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 border-r border-sidebar-border bg-sidebar text-sidebar-foreground lg:block">
      {/* PropEase branding at the very top of the sidebar: logo mark + name. */}
      <Link href="/" className="flex h-16 items-center gap-2 border-b border-sidebar-border px-5">
        <Building2 className="h-7 w-7 shrink-0 text-sidebar-primary" />
        <span className="text-lg font-bold tracking-tight text-white">PropEase</span>
      </Link>
      {/* Vertical navigation links below the branding. */}
      <div className="px-4 pt-4">
        <PublicNavLinks />
      </div>
    </aside>
  );
}
