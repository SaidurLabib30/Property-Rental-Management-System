"use client";

// property-carousel.tsx
// Dynamic property slider for the Home page hero. It builds its slides from the
// available properties in the shared data source, so adding or removing a
// property updates the slider automatically — no code change needed here. It
// auto-rotates smoothly and shows each property's image, name, price (BDT), and
// location, reusing the existing CoverflowCarousel for the look and layout.
import { CoverflowCarousel, type CoverflowSlide } from "@/components/ui/coverflow-carousel";
import { mockProperties } from "@/data/mockData";
import { formatBDT } from "@/lib/currency";

export default function PropertyCarousel() {
  // Prefer available properties; fall back to all of them if none are available.
  const available = mockProperties.filter((p) => p.status === "available");
  const list = available.length > 0 ? available : mockProperties;

  // Turn each property into a slide: image + caption (name, price, location, specs).
  const slides: CoverflowSlide[] = list.map((p) => ({
    src: p.images[0] ?? "",
    alt: p.title,
    title: p.title,
    subtitle: `${formatBDT(p.price)} / month · ${p.city}, ${p.state}`,
    meta: [
      { label: "Beds", value: String(p.bedrooms) },
      { label: "Baths", value: String(p.bathrooms) },
      { label: "Area", value: `${p.area.toLocaleString()} sqft` },
    ],
  }));

  if (slides.length === 0) return null;

  return (
    // Force caption text to light colors so it stays readable on the dark hero.
    <div className="w-full overflow-hidden bg-transparent [&_p]:!text-white [&_dt]:!text-white/70 [&_dd]:!text-white">
      <CoverflowCarousel slides={slides} showCaption autoplay cardWidth="clamp(148px, 18vw, 220px)" />
    </div>
  );
}
