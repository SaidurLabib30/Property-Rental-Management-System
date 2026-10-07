"use client";

import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockProperties } from '@/data/mockData';
import { StatusBadge } from '@/components/dashboard/status-badge';

export default function AdminPropertiesPage() {
  const properties = mockProperties;

  return (
    <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Properties</h1>
            <p className="text-muted-foreground">Manage all platform properties</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> Add Property
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground mb-1">Total</div>
              <div className="text-2xl font-bold">{properties.length}</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground mb-1">Available</div>
              <div className="text-2xl font-bold text-green-600">{properties.filter(p => p.status === 'available').length}</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground mb-1">Rented</div>
              <div className="text-2xl font-bold text-blue-600">{properties.filter(p => p.status === 'rented').length}</div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>All Properties</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {properties.map(property => (
                  <div key={property.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div>
                    <div className="font-medium">{property.title}</div>
                    <div className="text-sm text-muted-foreground">{property.address}, {property.city}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold">${property.price.toLocaleString()}/mo</span>
                    <StatusBadge variant={property.status === 'available' ? 'success' : 'secondary'}>{property.status}</StatusBadge>
                    <Button size="sm" variant="outline" className="h-8">View</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
  );
}
