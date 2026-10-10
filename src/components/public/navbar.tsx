"use client";

// navbar.tsx
// The dark top header for the public site. It holds a functional search bar
// (left/center) and the auth controls (right): "Sign in / Get Started" when
// logged out, or a Dashboard shortcut + avatar menu when logged in. The four
// primary nav links live in the left PublicSidebar; on mobile the menu button
// opens them in a navy drawer.
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, X, Building2, LogOut, LayoutDashboard, Search } from 'lucide-react';
import { PublicNavLinks } from '@/components/public/public-sidebar';

export function Navbar() {
  // Current signed-in user (null when logged out) and the sign-out action.
  const { user, logout } = useAuth();
  // Whether the mobile menu is expanded.
  const [mobileOpen, setMobileOpen] = useState(false);
  // The header search text.
  const [query, setQuery] = useState('');
  const router = useRouter();

  // Submitting the search sends the visitor to the Properties listing page.
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(query ? `/listings?q=${encodeURIComponent(query)}` : '/listings');
  };

  // The search bar markup, reused for the desktop (inline) and mobile (row) layouts.
  const renderSearch = (className: string) => (
    <form onSubmit={handleSearch} className={className}>
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for properties, location..."
          aria-label="Search properties"
          className="h-10 w-full rounded-l-full border-0 bg-white pl-10 pr-3 text-sm text-[#111111] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF9800]"
        />
      </div>
      {/* Orange search action button with dark text. */}
      <button type="submit" className="h-10 shrink-0 rounded-r-full bg-[#FF9800] px-5 text-sm font-semibold text-[#111111] transition-colors hover:bg-[#F57C00]">
        Search
      </button>
    </form>
  );

  /* PLACEHOLDER-RETURN */

  return (
    <header className="sticky top-0 z-20 w-full border-b border-white/10 bg-[#111111] text-white">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
        {/* Left: mobile menu toggle + mobile-only brand (desktop brand is in the sidebar). */}
        <div className="flex items-center gap-2">
          <button className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          <Link href="/" className="flex items-center gap-2 lg:hidden">
            <Building2 className="h-7 w-7 text-[#FF9800]" />
            <span className="text-lg font-bold tracking-tight">PropEase</span>
          </Link>
        </div>

        {/* Center: search bar (inline on tablet/desktop). */}
        {renderSearch('hidden md:flex flex-1 max-w-xl items-center')}

        {/* Spacer keeps auth on the right when the inline search is hidden (mobile). */}
        <div className="flex-1 md:hidden" />

        {/* Right: auth controls. */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link href={`/${user.role}`} className="hidden sm:block">
                <Button size="sm" className="gap-2 bg-[#FF9800] text-[#111111] hover:bg-[#F57C00]">
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/10">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                  <DropdownMenuLabel className="text-xs font-normal text-muted-foreground capitalize">{user.role}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={`/${user.role}`} className="cursor-pointer">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              {/* Sign In: orange button with dark text. */}
              <Link href="/login">
                <Button size="sm" className="bg-[#FF9800] text-[#111111] hover:bg-[#F57C00]">Sign in</Button>
              </Link>
              {/* Get Started: subtle outline so it reads on the dark header. */}
              <Link href="/register" className="hidden sm:block">
                <Button size="sm" variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white">Get Started</Button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile: full-width search row under the top bar. */}
      {renderSearch('md:hidden flex items-center px-4 pb-3')}

      {/* Mobile drawer: the public nav links (navy panel) plus auth shortcuts. */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-sidebar-border bg-sidebar px-4 py-4 space-y-3">
          <PublicNavLinks onNavigate={() => setMobileOpen(false)} />
          <div className="border-t border-sidebar-border pt-3">
            {user ? (
              <div className="space-y-2">
                <Link href={`/${user.role}`} onClick={() => setMobileOpen(false)}>
                  <Button className="w-full" size="sm" variant="accent">Dashboard</Button>
                </Link>
                <Button variant="ghost" className="w-full text-white hover:bg-white/10" size="sm" onClick={() => { logout(); setMobileOpen(false); }}>Logout</Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link href="/login" onClick={() => setMobileOpen(false)} className="flex-1">
                  <Button className="w-full bg-[#FF9800] text-[#111111] hover:bg-[#F57C00]" size="sm">Sign in</Button>
                </Link>
                <Link href="/register" onClick={() => setMobileOpen(false)} className="flex-1">
                  <Button className="w-full" variant="accent" size="sm">Get Started</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
