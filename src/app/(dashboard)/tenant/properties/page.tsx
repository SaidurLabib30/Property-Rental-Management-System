"use client";

import { mockApplications, mockProperties } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function TenantPropertiesPage() {
  const applications = mockApplications.filter(a => a.tenantId === 'u2');
  const properties = mockProperties.filter(p => p.status === 'available').slice(0, 4);

  return (
    <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Browse Properties</h1>
          <p className="text-muted-foreground">Find your next rental home</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map(property => (
            <Card key={property.id} className="border-0 shadow-sm">
              <CardContent className="p-0">
                 <div className="aspect-video bg-muted rounded-t-lg" />
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold">{property.title}</h3>
                  <p className="text-sm text-muted-foreground">{property.city}, {property.state}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-primary">${property.price.toLocaleString()}/mo</span>
                    <Button size="sm">Apply</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
  );
}
