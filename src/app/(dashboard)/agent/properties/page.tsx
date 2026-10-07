"use client";

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { StatusBadge } from '@/components/dashboard/status-badge';
import { mockProperties } from '@/data/mockData';

export default function AgentPropertiesPage() {
  const properties = mockProperties.filter(p => p.agentId || true).slice(0, 5);

  return (
    <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Property Listings</h1>
            <p className="text-muted-foreground">Manage your property listings</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> Add Property
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map(property => (
            <Card key={property.id} className="border-0 shadow-sm">
              <CardContent className="p-4 space-y-3">
                <div className="aspect-video bg-muted rounded-lg" />
                <h3 className="font-semibold">{property.title}</h3>
                <p className="text-sm text-muted-foreground">{property.address}, {property.city}</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-primary">${property.price.toLocaleString()}/mo</span>
                  <StatusBadge variant={property.status === 'available' ? 'success' : 'secondary'}>{property.status}</StatusBadge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
  );
}
