"use client";

// Agent dashboard home ("Overview"). Shows a quick summary for an agent:
// four stat cards plus two lists (recent applications and properties waiting
// for verification). The data here comes from local mock data, not a live backend.

import { mockApplications, mockProperties } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/dashboard/status-badge';

export default function AgentDashboard() {
  return (
    <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Overview</h1>
          <p className="text-muted-foreground">Agent dashboard summary</p>
        </div>

        {/* Top row of summary stat cards (hard-coded sample numbers) */}
        <div className="stat-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground mb-1">Total Listings</div>
              <div className="text-2xl font-bold">8</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground mb-1">Pending Verification</div>
              <div className="text-2xl font-bold">3</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground mb-1">Applications</div>
              <div className="text-2xl font-bold">5</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground mb-1">Active Agreements</div>
              <div className="text-2xl font-bold">4</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Recent Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {/* Show only the first 3 applications as a preview */}
                {mockApplications.slice(0, 3).map(app => (
                  <div key={app.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <div className="font-medium text-sm">Property {app.propertyId}</div>
                      <div className="text-xs text-muted-foreground">Tenant: {app.tenantId}</div>
                    </div>
                    {/* Colour the badge based on the application status */}
                    <StatusBadge variant={app.status === 'approved' ? 'success' : app.status === 'pending' ? 'warning' : 'info'}>
                      {app.status}
                    </StatusBadge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Pending Verifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {/* Preview of the first 3 properties, each with a Verify button */}
                {mockProperties.slice(0, 3).map(property => (
                  <div key={property.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <div className="font-medium text-sm">{property.title}</div>
                      <div className="text-xs text-muted-foreground">{property.address}</div>
                    </div>
                    <div className="flex gap-1">
                      <Button size="sm" className="h-8">Verify</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
  );
}
