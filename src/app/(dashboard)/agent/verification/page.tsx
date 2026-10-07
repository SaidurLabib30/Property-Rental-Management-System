"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockProperties } from '@/data/mockData';

export default function AgentVerificationPage() {
  const pending = mockProperties.filter(p => p.status === 'pending').slice(0, 3);

  return (
    <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Property Verification</h1>
          <p className="text-muted-foreground">Review and verify property listings</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground mb-1">Pending Verification</div>
              <div className="text-3xl font-bold text-amber-600">{pending.length}</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground mb-1">Verified</div>
              <div className="text-3xl font-bold text-green-600">{mockProperties.filter(p => p.status === 'available').length}</div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Pending Properties</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pending.map(property => (
                  <div key={property.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div>
                    <h3 className="font-medium">{property.title}</h3>
                    <p className="text-sm text-muted-foreground">{property.address}, {property.city}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="h-8">Verify</Button>
                    <Button size="sm" variant="outline" className="h-8">Reject</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
  );
}
