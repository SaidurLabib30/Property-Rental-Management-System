import type { NextConfig } from "next";

// Next.js configuration for the app. Values here change build/runtime behavior
// across the whole project. (Comments only — do not change these values casually.)
const nextConfig: NextConfig = {
  /* config options here */
  // Enable Cache Components (Next.js caching model used by this app).
  cacheComponents: true,
  // Prefetch only part of a route ahead of navigation for faster page loads.
  partialPrefetching: true,
  // Turbopack bundler settings: run CSS files through the Tailwind loader.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
