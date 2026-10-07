"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Heart, MapPin, BedDouble, Bath, Square, Star } from 'lucide-react';
import { Property } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PropertyCardProps {
  property: Property;
  onFavorite?: (id: string) => void;
  className?: string;
  orange?: boolean;
}

export function PropertyCard({ property, onFavorite, className, orange }: PropertyCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
      <div className={cn(
        "group rounded-xl border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden",
        orange ? "bg-[#FFF3B0] border-[#E6D98A]" : "bg-card",
        className
      )}>
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={imgError ? '/images/placeholder.jpg' : property.images[0]}
          alt={property.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={() => setImgError(true)}
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge variant={property.status === 'available' ? 'success' : 'secondary'}>
            {property.status === 'available' ? 'Available' : 'Rented'}
          </Badge>
          {property.featured && (
            <Badge variant="warning">Featured</Badge>
          )}
        </div>
        <button
          onClick={() => onFavorite?.(property.id)}
          className="absolute top-3 right-3 rounded-full bg-background/90 p-2 shadow-sm hover:bg-background transition-colors"
        >
          <Heart className="h-4 w-4 text-foreground hover:text-destructive transition-colors" />
        </button>
      </div>

      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
            <Link href={`/listings/${property.id}`}>{property.title}</Link>
          </h3>
          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
            <MapPin className="h-3.5 w-3.5" />
            <span>{property.city}, {property.state}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <BedDouble className="h-4 w-4" />
            {property.bedrooms} Beds
          </span>
          <span className="flex items-center gap-1">
            <Bath className="h-4 w-4" />
            {property.bathrooms} Baths
          </span>
          <span className="flex items-center gap-1">
            <Square className="h-4 w-4" />
            {property.area.toLocaleString()} sqft
          </span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t">
          <div>
            <span className="text-xl font-bold text-primary">${property.price.toLocaleString()}</span>
            <span className="text-sm text-muted-foreground">/mo</span>
          </div>
          <Link href={`/listings/${property.id}`}>
            <Button variant="outline" size="sm">View Details</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
