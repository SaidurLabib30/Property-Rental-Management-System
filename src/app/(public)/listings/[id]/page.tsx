"use client";

// Property details page for a single listing. This is a dynamic route: the
// [id] in the URL (e.g. /listings/5) picks which property to show. It finds
// that property in the mock data, then shows a photo, key facts, tabbed
// details, an owner/contact sidebar, and similar properties in the same city.
// If no property matches the id, a "Property Not Found" message is shown.
import { useState, use, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Home as HomeIcon, MapPin, BedDouble, Bath, Square, Heart, Share2, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PropertyCard } from '@/components/public/property-card';
import { mockProperties } from '@/data/mockData';
import { formatBDT } from '@/lib/currency';

export default function PropertyDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  // Reading async route params must happen inside a Suspense boundary so the
  // route can still be prerendered; the id streams in at request time.
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-16 text-center text-muted-foreground">Loading property…</div>}>
      <PropertyDetails params={params} />
    </Suspense>
  );
}

function PropertyDetails({ params }: { params: Promise<{ id: string }> }) {
  // In Next.js 16, route params are async — unwrap the Promise with React.use()
  // so we read the real id from the URL (this was the bug: `params.id` was
  // undefined, so no property ever matched and the page said "not found").
  const { id } = use(params);
  // Look up the property whose id matches the id taken from the URL.
  const property = mockProperties.find(p => p.id === id);
  // Whether the visitor marked this property as a favorite (local only).
  const [favorite, setFavorite] = useState(false);

  // If no property matches the id, show a friendly "not found" screen instead.
  if (!property) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Property Not Found</h1>
        <p className="text-muted-foreground mb-6">The property you are looking for does not exist.</p>
        <Link href="/listings">
          <Button>Back to Listings</Button>
        </Link>
      </div>
    );
  }

  // Up to 3 other properties in the same city, used in the "Similar" section.
  const similarProperties = mockProperties.filter(p => p.id !== property.id && p.city === property.city).slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* Breadcrumb trail: Home / Properties / this property's title. */}
      <div className="bg-muted border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <Link href="/listings" className="hover:text-foreground">Properties</Link>
            <span>/</span>
            <span className="text-foreground">{property.title}</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Clear way back to the full listings page. */}
        <Link href="/listings" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
          ← Back to Listings
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Main photo with status/featured badges and favorite/share buttons. */}
            <div className="relative aspect-video rounded-xl overflow-hidden bg-muted">
              {property.images[0] ? (
                <Image src={property.images[0]} alt={property.title} fill className="object-cover" />
              ) : (
                // Fallback when the property has no image.
                <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                  <HomeIcon className="h-12 w-12" />
                </div>
              )}
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge variant={property.status === 'available' ? 'success' : 'secondary'}>
                  {property.status}
                </Badge>
                {property.featured && <Badge variant="warning">Featured</Badge>}
              </div>
              <div className="absolute top-4 right-4 flex gap-2">
                {/* Toggle the favorite state; a filled red heart means favorited. */}
                <Button size="icon" variant="secondary" className="rounded-full" onClick={() => setFavorite(!favorite)}>
                  <Heart className={`h-4 w-4 ${favorite ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
                <Button size="icon" variant="secondary" className="rounded-full">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Thumbnail gallery — only shown when the property has more than one image. */}
            {property.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {property.images.map((img, i) => (
                  <div key={i} className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                    <Image src={img} alt={`${property.title} photo ${i + 1}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            )}

            <div>
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold">{property.title}</h1>
                  <div className="flex items-center gap-1 text-muted-foreground mt-1">
                    <MapPin className="h-4 w-4" />
                    {property.address}, {property.city}, {property.state} {property.zipCode}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary">{formatBDT(property.price)}</div>
                  <div className="text-sm text-muted-foreground">per month</div>
                </div>
              </div>
            </div>

            {/* Quick facts: bedrooms, bathrooms, area, and property type. */}
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: 'Bedrooms', value: property.bedrooms, icon: BedDouble },
                { label: 'Bathrooms', value: property.bathrooms, icon: Bath },
                { label: 'Area', value: `${property.area.toLocaleString()} sqft`, icon: Square },
                { label: 'Type', value: property.propertyType, icon: HomeIcon },
              ].map((stat, i) => (
                <Card key={i} className="border-0 shadow-sm">
                  <CardContent className="flex items-center gap-3 p-4">
                    <stat.icon className="h-5 w-5 text-primary" />
                    <div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                      <div className="font-semibold capitalize">{stat.value}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Tabbed details: description, amenities list, and a map placeholder. */}
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-4">
                <p className="text-muted-foreground leading-relaxed">{property.description || 'No description provided for this property.'}</p>
              </TabsContent>
              <TabsContent value="amenities" className="mt-4">
                {property.amenities.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {property.amenities.map((amenity, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                        {amenity}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No amenities listed for this property.</p>
                )}
              </TabsContent>
              <TabsContent value="location" className="mt-4">
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
                  Map placeholder - {property.address}, {property.city}, {property.state}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar: price, apply/contact actions, and basic owner info. */}
          <div className="space-y-6">
            <Card className="border-0 shadow-md">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold">{formatBDT(property.price)}<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
                  </div>
                  <Badge variant={property.status === 'available' ? 'success' : 'secondary'}>
                    {property.status}
                  </Badge>
                </div>
                <div className="space-y-3">
                  <Button className="w-full" size="lg">Apply Now</Button>
                  <Button variant="outline" className="w-full gap-2">
                    <Phone className="h-4 w-4" />
                    Contact Owner
                  </Button>
                  <Button variant="outline" className="w-full gap-2">
                    <Mail className="h-4 w-4" />
                    Send Message
                  </Button>
                </div>
                <div className="pt-4 border-t text-sm text-muted-foreground">
                  <p>Property ID: {property.id}</p>
                  <p>Listed on: {new Date(property.createdAt).toLocaleDateString()}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">Property Owner</h3>
                <div className="flex items-center gap-3">
                  {/* Owner avatar initials and name are chosen from the owner id. */}
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                    {property.ownerId === 'u1' ? 'JS' : 'DW'}
                  </div>
                  <div>
                    <p className="font-medium">{property.ownerId === 'u1' ? 'John Smith' : 'David Wilson'}</p>
                    <p className="text-xs text-muted-foreground">Property Owner</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Only render the "Similar Properties" block if any were found. */}
        {similarProperties.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Similar Properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarProperties.map(p => (
                <PropertyCard key={p.id} property={p} onFavorite={() => {}} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
