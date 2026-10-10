// Root layout for the entire app. Next.js wraps every page with this file,
// so it builds the shared <html>/<body> shell, loads the web fonts, sets the
// default page metadata (title/description), and mounts the UI shown on all
// pages (the global Providers and the top Navbar).
import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

// Load the Inter font and expose it as a CSS variable so styles can reference it.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// Load the Geist Mono font (used for monospaced text) as its own CSS variable.
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Default metadata for the site. `template` appends " | PropEase" to each
// page's own title, and `default` is the title shown when a page sets none.
export const metadata: Metadata = {
  title: {
    default: "PropEase - Property Rental & Management",
    template: "%s | PropEase",
  },
  description: "Modern property rental and management platform connecting owners, tenants, and agents seamlessly.",
};

// The layout component. `children` is the page currently being viewed, which
// Next.js injects here so every route shares the same outer frame.
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {/* Providers supplies shared context (such as auth) to all pages.
            The public pages add the top Navbar via their own route-group layout
            ((public)/layout.tsx); dashboards render their own sidebar + header. */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
