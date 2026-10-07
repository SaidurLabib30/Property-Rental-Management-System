"use client";

import { useState } from 'react';
import { Home, Users, Building2, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<'mission' | 'team' | 'values'>('mission');

  return (
    <div className="flex flex-col">
      <section className="bg-slate-900 text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">About PropEase</h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg">
            We are on a mission to revolutionize property rental and management through technology, transparency, and exceptional service.
          </p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                PropEase was founded with a simple idea: make property rental and management accessible, transparent, and efficient for everyone. We believe that finding a home or managing properties should not be complicated.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our platform connects property owners, tenants, and agents in one seamless ecosystem, providing tools and features that simplify every step of the rental journey.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Building2, label: '10K+', desc: 'Properties Listed' },
                { icon: Users, label: '5K+', desc: 'Happy Tenants' },
                { icon: Home, label: '2K+', desc: 'Property Owners' },
                { icon: Shield, label: '99%', desc: 'Satisfaction Rate' },
              ].map((stat, i) => (
                <Card key={i} className="border-0 shadow-sm text-center">
                  <CardContent className="p-6">
                    <stat.icon className="h-8 w-8 mx-auto text-primary mb-2" />
                    <div className="text-2xl font-bold">{stat.label}</div>
                    <div className="text-xs text-muted-foreground">{stat.desc}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Trust', desc: 'We prioritize transparency and security in every transaction, building trust between all parties.' },
              { title: 'Innovation', desc: 'We continuously improve our platform with cutting-edge technology to enhance user experience.' },
              { title: 'Community', desc: 'We foster a supportive community where owners, tenants, and agents can thrive together.' },
            ].map((value, i) => (
              <Card key={i} className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
