"use client";

// Home page (landing page) of the public site. It shows a hero search area,
// site stats, featured and latest property cards, popular locations, a
// "how it works" guide, testimonials, and a final call-to-action that changes
// based on whether the visitor is signed in. The property data shown here all
// comes from local mock data, not a live database.
import { useState } from 'react';
import { Home, Star, MapPin, TrendingUp, Users, Building2 } from 'lucide-react';
import { PropertyCard } from '@/components/public/property-card';
import PropertyCarousel from '@/components/public/property-carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockProperties } from '@/data/mockData';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';

export default function HomePage() {
  // Current signed-in user (or null); used to tailor the final call-to-action.
  const { user } = useAuth();
  // IDs of properties the visitor marked as favorite (kept only in memory).
  const [favorites, setFavorites] = useState<string[]>([]);

  // Only the properties flagged as "featured".
  const featuredProperties = mockProperties.filter(p => p.featured);
  // The 4 most recently created properties (sorted newest-first, then trimmed).
  const latestProperties = [...mockProperties].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 4);

  const popularLocations = [
    { city: 'New York', state: 'NY', count: 245, image: '/images/ny.jpg' },
    { city: 'Los Angeles', state: 'CA', count: 189, image: '/images/la.jpg' },
    { city: 'Miami', state: 'FL', count: 156, image: '/images/miami.jpg' },
    { city: 'Chicago', state: 'IL', count: 134, image: '/images/chicago.jpg' },
    { city: 'Seattle', state: 'WA', count: 98, image: '/images/seattle.jpg' },
    { city: 'San Francisco', state: 'CA', count: 112, image: '/images/sf.jpg' },
  ];

  // Add the property id to favorites if missing, or remove it if already there.
  const toggleFavorite = (id: string) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  return (
    <div className="flex flex-col">
      {/* Hero section: property photo background with a navy overlay for contrast. */}
      <section className="relative bg-primary text-primary-foreground overflow-hidden">
        {/* Base layer: the building photo, covering the whole hero (no stretch/repeat). */}
        <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center bg-no-repeat" />
        {/* Lighter navy overlay so more of the photo shows while white text stays readable. */}
        <div className="absolute inset-0 z-10 bg-gradient-to-br from-primary/75 via-primary/60 to-primary/50" />
        <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4 pb-8 lg:pt-6 lg:pb-12">
          <div className="max-w-2xl mx-auto text-center">
            {/* Featured imagery carousel (property search now lives in the top header). */}
            <div>
              <PropertyCarousel />
            </div>
          </div>
        </div>
      </section>

      {/* Stats section: three headline numbers rendered by mapping over a list. */}
      <section className="py-16 bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
               { icon: Building2, label: '2,000+', desc: 'Properties Listed' },
               { icon: Users, label: '5,000+', desc: 'Happy Tenants' },
               { icon: TrendingUp, label: '$50M+', desc: 'Properties Managed' },
             ].map((stat, i) => (
               <Card key={i} className="bg-[#FEF9C3] border border-[#FDE68A] shadow-sm hover:shadow-md transition-shadow text-center">
                 <CardContent className="p-6">
                   <stat.icon className="h-8 w-8 mx-auto text-primary mb-3" />
                   <div className="text-3xl font-bold">{stat.label}</div>
                   <div className="text-sm text-muted-foreground">{stat.desc}</div>
                 </CardContent>
               </Card>
             ))}
          </div>
        </div>
      </section>

      {/* Featured properties: one PropertyCard per featured property. */}
      <section className="py-16 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-2">Featured</Badge>
            <h2 className="text-3xl font-bold">Featured Properties</h2>
            <p className="text-muted-foreground mt-2">Handpicked premium properties for you</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} onFavorite={toggleFavorite} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest properties: newest listings, with a "View All" link to /listings. */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <Badge variant="outline" className="mb-2">New</Badge>
              <h2 className="text-3xl font-bold">Latest Properties</h2>
            </div>
            <Link href="/listings">
              <Button variant="outline">View All</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestProperties.map((property) => (
              <PropertyCard key={property.id} property={property} onFavorite={toggleFavorite} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular locations: a grid of city cards built from the list above. */}
      <section className="py-16 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-2">Explore</Badge>
            <h2 className="text-3xl font-bold">Popular Locations</h2>
            <p className="text-muted-foreground mt-2">Discover properties in top cities</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {popularLocations.map((location, i) => (
              <Card key={i} className="bg-card border border-border shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-sm">{location.city}</h3>
                  <p className="text-xs text-muted-foreground">{location.state}</p>
                  <p className="text-xs text-primary font-medium mt-1">{location.count} properties</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* "How It Works": three steps, each with an icon, title, and description. */}
      <section className="py-16 bg-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">How It Works</h2>
            <p className="text-muted-foreground mt-2">Simple steps to find or list your property</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Home, title: 'Search Properties', description: 'Browse through thousands of verified properties with advanced filters.' },
              { icon: () => <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>, title: 'Apply or List', description: 'Submit applications as a tenant or list your property as an owner.' },
              { icon: () => <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, title: 'Move In', description: 'Sign agreements, make payments, and move into your new home.' },
            ].map((step, i) => (
              <Card key={i} className="text-center border-0 shadow-sm">
                <CardContent className="pt-6">
                  <div className="mx-auto w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <step.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials: quotes from users, each shown with a 5-star rating. */}
      <section className="py-16 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Testimonials</h2>
            <p className="text-muted-foreground mt-2">What our users say about us</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
               { name: 'John Smith', role: 'Property Owner', text: 'PropEase made it incredibly easy to list my properties and find quality tenants. Highly recommended!' },
               { name: 'Sarah Johnson', role: 'Tenant', text: 'Found my dream apartment within a week. The platform is intuitive and the support is excellent.' },
               { name: 'Michael Brown', role: 'Real Estate Agent', text: 'As an agent, PropEase streamlines my workflow and helps me manage multiple listings efficiently.' },
             ].map((testimonial, i) => (
               <Card key={i} className="bg-primary border border-primary shadow-sm">
                 <CardContent className="pt-6 text-primary-foreground">
                   <div className="flex gap-1 mb-4">
                     {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-gold text-gold" />)}
                   </div>
                   <p className="text-sm mb-4 text-primary-foreground">"{testimonial.text}"</p>
                   <div>
                     <p className="font-semibold text-sm text-primary-foreground">{testimonial.name}</p>
                     <p className="text-xs text-primary-foreground/70">{testimonial.role}</p>
                   </div>
                 </CardContent>
               </Card>
             ))}
          </div>
        </div>
      </section>

      {/* Call-to-action: signed-in users see a dashboard link; guests instead
          see "Create Account" and "Browse Properties" buttons. */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-primary-foreground/80 mb-8 text-lg">Join thousands of happy users and find your perfect property today.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <Link href={`/${user.role}`}>
                <Button size="lg" variant="accent">Go to Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link href="/register">
                  <Button size="lg" variant="accent">Create Account</Button>
                </Link>
                <Link href="/listings">
                  <Button size="lg" className="border border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">Browse Properties</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
