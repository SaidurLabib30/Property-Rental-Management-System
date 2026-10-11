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
    // Price keeps its own line (bold) with a quieter "/ month" suffix and the
    // location just below. Compact ~half-size type, all pure black.
    subtitle: (
      <span className="flex flex-col items-center gap-0.5">
        <span className="text-sm font-extrabold leading-none text-black sm:text-base lg:text-lg">
          {formatBDT(p.price)}
          <span className="ml-1 align-middle text-[10px] font-medium text-black sm:text-[11px]">
            / month
          </span>
        </span>
        <span className="text-[11px] font-medium text-black sm:text-xs">
          {p.city}, {p.state}
        </span>
      </span>
    ),
    meta: [
      { label: "Beds", value: String(p.bedrooms) },
      { label: "Baths", value: String(p.bathrooms) },
      { label: "Area", value: `${p.area.toLocaleString()} sqft` },
    ],
  }));

  if (slides.length === 0) return null;

  return (
    // Hero caption styling (scoped to this wrapper so only the hero carousel is
    // affected). All property text is pure black (#000000) on a compact light
    // info panel — kept small in width, padding and type (~half the previous
    // size), and still responsive, so the box takes up noticeably less space.
    <div
      className={[
        "w-full overflow-hidden bg-transparent",
        // Compact light info panel behind the caption (the only `.animate-in`
        // descendant): narrower max-width and tighter padding shrink the box,
        // while black text stays legible over the dark navy hero.
        "[&_.animate-in]:mx-auto [&_.animate-in]:max-w-[260px] [&_.animate-in]:rounded-xl [&_.animate-in]:border [&_.animate-in]:border-white/60 [&_.animate-in]:bg-white/90 [&_.animate-in]:px-4 [&_.animate-in]:py-2.5 [&_.animate-in]:shadow-md [&_.animate-in]:backdrop-blur-sm",
        // Property name (first caption line): bold, black, ~half its old size.
        "[&_p:first-of-type]:text-[11px] [&_p:first-of-type]:font-bold [&_p:first-of-type]:tracking-tight [&_p:first-of-type]:text-black",
        "sm:[&_p:first-of-type]:text-sm lg:[&_p:first-of-type]:text-base",
        // Specs table (beds / baths / area): small black text, tightened gaps.
        "[&_dl]:mt-2 [&_dl]:text-[11px] sm:[&_dl]:text-xs [&_dl>div]:py-0.5 [&_dt]:text-black [&_dd]:font-semibold [&_dd]:text-black",
      ].join(" ")}
    >
      <CoverflowCarousel slides={slides} showCaption autoplay cardWidth="clamp(148px, 18vw, 220px)" />
    </div>
  );
}
