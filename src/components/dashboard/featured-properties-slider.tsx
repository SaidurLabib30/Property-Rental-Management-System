"use client";

// featured-properties-slider.tsx
// Dashboard "Featured Properties" slider. Reads the live property store, so it
// shows real listings (image, name, BDT price, location, specs) and picks up
// newly added properties automatically — nothing is hardcoded. It advances on
// its own at a steady interval with a smooth transition, pauses on hover, and
// shows a clean message when there are no properties to feature.
import { useEffect, useState } from "react";
import { Building2 } from "lucide-react";
import { PropertyCard } from "@/components/public/property-card";
import { useProperties } from "@/lib/properties-store";

export function FeaturedPropertiesSlider() {
  // Live data from the shared store; only available listings are featured.
  const available = useProperties().filter((p) => p.status === "available");

  // How many cards are visible at once (responsive) and which window is shown.
  const [perView, setPerView] = useState(1);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // Match the visible-card count to the viewport width.
  useEffect(() => {
    const compute = () =>
      setPerView(window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1);
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  const count = available.length;
  const shown = Math.min(perView, Math.max(count, 1));
  const canSlide = count > perView;

  // Auto-advance one card at a time; pause on hover; stop when nothing to slide.
  // The index is kept in range with modulo everywhere it is read, so it never
  // needs resetting when the data or layout changes.
  useEffect(() => {
    if (!canSlide || paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), 3500);
    return () => clearInterval(id);
  }, [canSlide, paused, count]);

  // Empty state — a clean message instead of a broken/empty section.
  if (count === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 rounded-xl bg-muted/40 py-16 text-center text-muted-foreground">
        <Building2 className="h-10 w-10" />
        <p className="font-medium text-foreground">No properties to feature yet</p>
        <p className="text-sm">Add a property and it will appear here automatically.</p>
      </div>
    );
  }

  // The wrapping window of cards starting at the current index.
  const visible = Array.from({ length: shown }, (_, k) => available[(index + k) % count]);

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div
        key={index}
        className="grid gap-4 duration-500 animate-in fade-in slide-in-from-right-4"
        style={{ gridTemplateColumns: `repeat(${shown}, minmax(0, 1fr))` }}
      >
        {visible.map((property, k) => (
          <PropertyCard key={`${property.id}-${k}`} property={property} />
        ))}
      </div>

      {canSlide && (
        <div className="mt-5 flex items-center justify-center gap-1.5">
          {available.map((_, i) => (
            <span
              key={i}
              aria-hidden
              className={`h-1.5 rounded-full transition-all ${
                i === index % count ? "w-5 bg-primary" : "w-1.5 bg-primary/25"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
