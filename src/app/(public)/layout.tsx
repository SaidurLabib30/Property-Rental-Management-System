// Layout for the public (marketing) section: home, listings, about, contact,
// login, and register. It places the shared PublicSidebar on the left (desktop)
// and the Navbar + page content on the right. Dashboard routes are a separate
// route group with their own sidebar, so this shell never applies there.
import { Suspense } from "react";
import { Navbar } from "@/components/public/navbar";
import { PublicSidebar } from "@/components/public/public-sidebar";
import { ReactNode } from "react";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Fixed navy sidebar on the left (desktop). Wrapped in Suspense because
          it reads the current route, which must stream in for prerendered routes. */}
      <Suspense fallback={null}>
        <PublicSidebar />
      </Suspense>

      {/* Content column, offset by the sidebar width on large screens. */}
      <div className="flex flex-1 flex-col lg:ml-60">
        <Navbar />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
