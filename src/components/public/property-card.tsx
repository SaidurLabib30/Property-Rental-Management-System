"use client";

// property-card.tsx
// The single, shared property card used everywhere (home, listings, property
// details "similar" section). Every card has identical size, colors, spacing,
// typography, image aspect ratio, and button styling — only the property data
// and image differ. Prices are shown in Bangladeshi Taka (BDT).
import { useState } from 'react';
import Link from 'next/link';
import { Heart, MapPin, BedDouble, Bath, Square } from 'lucide-react';
import { Property } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { formatBDT } from '@/lib/currency';

// Props: the property to render, an optional favorite callback, and optional
// extra classes. The card's visual style is fixed so all cards look the same.
interface PropertyCardProps {
  property: Property;
  onFavorite?: (id: string) => void;
  className?: string;
}

export function PropertyCard({ property, onFavorite, className }: PropertyCardProps) {
  // Tracks whether the main image failed to load so we can show a placeholder.
  const [imgError, setImgError] = useState(false);

  return (
    // h-full + flex-col lets cards in the same grid row stretch to equal height.
    <div className={cn(
      "group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm card-hover",
      className
    )}>
      {/* Fixed 4:3 image area (object-cover) so every image is the same size. */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={imgError ? '/images/placeholder.jpg' : property.images[0]}
          alt={property.title}
          onError={() => setImgError(true)}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Top-left badges: availability status and an optional "Featured" tag */}
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge variant={property.status === 'available' ? 'success' : 'secondary'}>
            {property.status === 'available' ? 'Available' : 'Rented'}
          </Badge>
          {property.featured && <Badge variant="warning">Featured</Badge>}
        </div>
        {/* Favorite (heart) button — calls the optional onFavorite callback */}
        <button
          onClick={() => onFavorite?.(property.id)}
          className="absolute top-3 right-3 rounded-full bg-background/90 p-2 shadow-sm transition-colors hover:bg-background"
          aria-label="Toggle favorite"
        >
          <Heart className="h-4 w-4 text-foreground transition-colors hover:text-destructive" />
        </button>
      </div>

      {/* Body: grows to fill the card; the price/button block is pinned to the bottom. */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="text-lg font-semibold leading-tight transition-colors group-hover:text-primary">
            <Link href={`/listings/${property.id}`}>{property.title}</Link>
          </h3>
          <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span>{property.city}, {property.state}</span>
          </div>
        </div>

        {/* Key specs row (beds / baths / area) */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><BedDouble className="h-4 w-4" />{property.bedrooms} Beds</span>
          <span className="flex items-center gap-1"><Bath className="h-4 w-4" />{property.bathrooms} Baths</span>
          <span className="flex items-center gap-1"><Square className="h-4 w-4" />{property.area.toLocaleString()} sqft</span>
        </div>

        {/* Price (BDT) + full-width action button, pinned to the bottom of the card. */}
        <div className="mt-auto space-y-3 border-t pt-3">
          <div>
            <span className="text-xl font-bold text-primary">{formatBDT(property.price)}</span>
            <span className="text-sm text-muted-foreground"> / month</span>
          </div>
          <Link href={`/listings/${property.id}`} className="block">
            <Button className="w-full">View Details</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
