"use client";

import { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { PropertyType, PropertyStatus } from '@/types';

interface SearchFilterProps {
  onSearch?: (query: string) => void;
  onFilterChange?: (filters: {
    location?: string;
    type?: PropertyType;
    status?: PropertyStatus;
    minPrice?: number;
    maxPrice?: number;
    bedrooms?: number;
  }) => void;
}

export function SearchFilter({ onSearch, onFilterChange }: SearchFilterProps) {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState<PropertyType | ''>('');
  const [status, setStatus] = useState<PropertyStatus | ''>('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [bedrooms, setBedrooms] = useState('');

  const activeFilters = [location, type, status, minPrice, maxPrice, bedrooms].filter(Boolean);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(query);
    onFilterChange?.({
      location: location || undefined,
      type: type || undefined,
      status: status || undefined,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      bedrooms: bedrooms ? Number(bedrooms) : undefined,
    });
  };

  const clearFilters = () => {
    setQuery('');
    setLocation('');
    setType('');
    setStatus('');
    setMinPrice('');
    setMaxPrice('');
    setBedrooms('');
    onSearch?.('');
    onFilterChange?.({});
  };

  const FilterContent = () => (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-1.5 block">Location</label>
        <Input
          placeholder="City, state, or zip"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div>
        <label className="text-sm font-medium mb-1.5 block">Property Type</label>
        <Select value={type} onValueChange={(v) => setType(v as PropertyType)}>
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Types</SelectItem>
            <SelectItem value="apartment">Apartment</SelectItem>
            <SelectItem value="house">House</SelectItem>
            <SelectItem value="condo">Condo</SelectItem>
            <SelectItem value="studio">Studio</SelectItem>
            <SelectItem value="villa">Villa</SelectItem>
            <SelectItem value="office">Office</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="text-sm font-medium mb-1.5 block">Status</label>
        <Select value={status} onValueChange={(v) => setStatus(v as PropertyStatus)}>
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Statuses</SelectItem>
            <SelectItem value="available">Available</SelectItem>
            <SelectItem value="rented">Rented</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="maintenance">Maintenance</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-medium mb-1.5 block">Min Price</label>
          <Input type="number" placeholder="$0" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
        </div>
        <div>
          <label className="text-sm font-medium mb-1.5 block">Max Price</label>
          <Input type="number" placeholder="$10000" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium mb-1.5 block">Bedrooms</label>
        <Select value={bedrooms} onValueChange={setBedrooms}>
          <SelectTrigger>
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Any</SelectItem>
            <SelectItem value="1">1+</SelectItem>
            <SelectItem value="2">2+</SelectItem>
            <SelectItem value="3">3+</SelectItem>
            <SelectItem value="4">4+</SelectItem>
            <SelectItem value="5">5+</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {activeFilters.length > 0 && (
        <Button variant="outline" className="w-full gap-2" onClick={clearFilters}>
          <X className="h-4 w-4" />
          Clear Filters ({activeFilters.length})
        </Button>
      )}
    </div>
  );

  return (
    <form onSubmit={handleSearch} className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search properties..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9 h-11"
          />
        </div>
        <div className="hidden md:block">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="h-11 w-11 relative">
                <SlidersHorizontal className="h-4 w-4" />
                {activeFilters.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] text-white flex items-center justify-center">
                    {activeFilters.length}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-md">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <FilterContent />
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <Button type="submit" size="default" className="h-11">Search</Button>
      </div>

      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filters {activeFilters.length > 0 && `(${activeFilters.length})`}
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[80vh] overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {location && <Badge variant="secondary">{location}</Badge>}
          {type && <Badge variant="secondary">{type}</Badge>}
          {status && <Badge variant="secondary">{status}</Badge>}
          {(minPrice || maxPrice) && <Badge variant="secondary">${minPrice || '0'} - ${maxPrice || 'Any'}</Badge>}
          {bedrooms && <Badge variant="secondary">{bedrooms}+ beds</Badge>}
        </div>
      )}
    </form>
  );
}
