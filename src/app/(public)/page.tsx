"use client";

import { useState } from 'react';
import { Home, Star, MapPin, TrendingUp, Users, Building2 } from 'lucide-react';
import { PropertyCard } from '@/components/public/property-card';
import { SearchFilter } from '@/components/public/search-filter';
import CoverflowCarouselDemo from '@/components/ui/coverflow-carousel-demo';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockProperties } from '@/data/mockData';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';

export default function HomePage() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<string[]>([]);

  const featuredProperties = mockProperties.filter(p => p.featured);
  const latestProperties = [...mockProperties].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 4);

  const popularLocations = [
    { city: 'New York', state: 'NY', count: 245, image: '/images/ny.jpg' },
    { city: 'Los Angeles', state: 'CA', count: 189, image: '/images/la.jpg' },
    { city: 'Miami', state: 'FL', count: 156, image: '/images/miami.jpg' },
    { city: 'Chicago', state: 'IL', count: 134, image: '/images/chicago.jpg' },
    { city: 'Seattle', state: 'WA', count: 98, image: '/images/seattle.jpg' },
    { city: 'San Francisco', state: 'CA', count: 112, image: '/images/sf.jpg' },
  ];

  const toggleFavorite = (id: string) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  return (
    <div className="flex flex-col">
      <section className="relative bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-800/90 z-10" />
        <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center opacity-30" />
        <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-background dark:bg-card rounded-lg p-2 shadow-xl">
              <SearchFilter onSearch={(q) => console.log('search', q)} />
            </div>
            <div className="mt-4">
              <CoverflowCarouselDemo />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
               { icon: Building2, label: '2,000+', desc: 'Properties Listed' },
               { icon: Users, label: '5,000+', desc: 'Happy Tenants' },
               { icon: TrendingUp, label: '$50M+', desc: 'Properties Managed' },
             ].map((stat, i) => (
               <Card key={i} className="bg-orange-100 border border-orange-300 shadow-sm text-center">
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

      <section className="py-16 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-2">Featured</Badge>
            <h2 className="text-3xl font-bold">Featured Properties</h2>
            <p className="text-muted-foreground mt-2">Handpicked premium properties for you</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProperties.map(property => (
              <PropertyCard key={property.id} property={property} onFavorite={toggleFavorite} orange={true} />
            ))}
          </div>
        </div>
      </section>

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
            {latestProperties.map(property => (
              <PropertyCard key={property.id} property={property} onFavorite={toggleFavorite} orange={true} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-2">Explore</Badge>
            <h2 className="text-3xl font-bold">Popular Locations</h2>
            <p className="text-muted-foreground mt-2">Discover properties in top cities</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {popularLocations.map((location, i) => (
              <Card key={i} className="bg-orange-100 border border-orange-300 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
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

      <section className="py-16 bg-blue-50">
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
               <Card key={i} className="bg-[#72BCEB] border border-[#5aa3d4] shadow-sm">
                 <CardContent className="pt-6 text-white">
                   <div className="flex gap-1 mb-4">
                     {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
                   </div>
                   <p className="text-sm mb-4 text-white">"{testimonial.text}"</p>
                   <div>
                     <p className="font-semibold text-sm text-white">{testimonial.name}</p>
                     <p className="text-xs text-blue-50">{testimonial.role}</p>
                   </div>
                 </CardContent>
               </Card>
             ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-foreground">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-primary-foreground/80 mb-8 text-lg">Join thousands of happy users and find your perfect property today.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <Link href={`/dashboard/${user.role}`}>
                <Button size="lg" className="bg-yellow-200 text-black hover:bg-yellow-300">Go to Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link href="/register">
                  <Button size="lg" className="bg-yellow-200 text-black hover:bg-yellow-300">Create Account</Button>
                </Link>
                <Link href="/listings">
                  <Button size="lg" className="bg-yellow-200 text-black hover:bg-yellow-300 border-yellow-200">Browse Properties</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
