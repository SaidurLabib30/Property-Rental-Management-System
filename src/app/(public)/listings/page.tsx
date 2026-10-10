"use client";

// Property listings page. Shows all available properties as cards, with
// controls to switch between grid/list view and to sort by newest or price.
// A SearchFilter is also rendered, but note the list below is only sorted
// here (the filter inputs are not wired to narrow these results). Data comes
// from local mock data.
import { useState } from 'react';
import { PropertyCard } from '@/components/public/property-card';
import { SearchFilter } from '@/components/public/search-filter';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Grid, List, SlidersHorizontal } from 'lucide-react';
import { mockProperties } from '@/data/mockData';
import { PropertyType, PropertyStatus } from '@/types';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

export default function ListingsPage() {
  // Whether cards are shown as a grid or a vertical list.
  const [view, setView] = useState<'grid' | 'list'>('grid');
  // Current sort order: 'newest', 'price-asc', or 'price-desc'.
  const [sortBy, setSortBy] = useState('newest');
  // IDs of favorited properties (kept only in memory for this page).
  const [favorites, setFavorites] = useState<string[]>([]);

  // Copy the properties and sort them according to the selected order:
  // cheapest first, most expensive first, or newest first (the default).
  let filtered = [...mockProperties];
  if (sortBy === 'price-asc') filtered.sort((a, b) => a.price - b.price);
  else if (sortBy === 'price-desc') filtered.sort((a, b) => b.price - a.price);
  else filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  // Add the property id to favorites if missing, or remove it if already there.
  const toggleFavorite = (id: string) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Property Listings</h1>
        <p className="text-muted-foreground">Browse {mockProperties.length} available properties</p>
      </div>

      <div className="space-y-6">
        <SearchFilter />

        <div className="flex items-center justify-between">
          {/* View toggle: grid vs list (the list button is hidden on small screens). */}
          <div className="flex items-center gap-2">
            <Button
              variant={view === 'grid' ? 'default' : 'outline'}
              size="icon"
              className="h-9 w-9"
              onClick={() => setView('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={view === 'list' ? 'default' : 'outline'}
              size="icon"
              className="h-9 w-9 hidden sm:flex"
              onClick={() => setView('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-3">
            {/* Sort dropdown; changing it updates `sortBy` and re-sorts the list. */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>

            {/* On smaller screens, this button opens the filters in a slide-in panel. */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="h-9 w-9 lg:hidden">
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-md">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <SearchFilter />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Render one card per property; layout classes depend on the chosen view. */}
        <div className={view === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'flex flex-col gap-4'}>
          {filtered.map(property => (
            <PropertyCard key={property.id} property={property} onFavorite={toggleFavorite} />
          ))}
        </div>

        {/* Fallback shown when there are no properties to display. */}
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No properties found matching your criteria.</p>
            <Button variant="outline" className="mt-4">Clear Filters</Button>
          </div>
        )}
      </div>
    </div>
  );
}
