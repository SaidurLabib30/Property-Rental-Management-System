"use client";

// Tenant "Overview" page.
// The tenant landing screen: quick stat cards (current rental, applications,
// next payment, open tickets), the current rental summary, and a short list of
// recent applications. The values here are static demo content.
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/dashboard/status-badge';
import { Building2 } from 'lucide-react';

export default function TenantDashboard() {
  return (
    <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Overview</h1>
          <p className="text-muted-foreground">Welcome back, Sarah!</p>
        </div>

        <div className="stat-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground mb-1">My Rental</div>
              <div className="text-2xl font-bold">1</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground mb-1">Applications</div>
              <div className="text-2xl font-bold">2</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground mb-1">Next Payment</div>
              <div className="text-2xl font-bold">৳ 3,500</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground mb-1">Open Tickets</div>
              <div className="text-2xl font-bold">1</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>My Current Rental</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                 <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center">
                     <Building2 className="h-8 w-8 text-muted-foreground" />
                   </div>
                  <div>
                    <h3 className="font-semibold">Luxury Downtown Apartment</h3>
                    <p className="text-sm text-muted-foreground">123 Main St, New York, NY</p>
                    <p className="text-sm font-medium text-primary">৳ 3,500/month</p>
                  </div>
                </div>
                <div className="pt-3 border-t">
                  <p className="text-sm text-muted-foreground">Lease ends on Feb 1, 2025</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Recent Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {/* Recent applications — static demo rows with a colored status badge */}
                {[
                  { property: 'Modern Condo with Ocean View', status: 'under_review', date: '2024-05-25' },
                  { property: 'Elegant Villa with Pool', status: 'pending', date: '2024-05-20' },
                ].map((app, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <div className="font-medium text-sm">{app.property}</div>
                      <div className="text-xs text-muted-foreground">Applied: {app.date}</div>
                    </div>
                    <StatusBadge variant={app.status === 'approved' ? 'success' : app.status === 'pending' ? 'warning' : 'info'}>
                      {app.status.replace('_', ' ')}
                    </StatusBadge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
  );
}
