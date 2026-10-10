"use client";

// Owner "Tenants" page.
// Shows summary cards and a list of the owner's current tenants,
// derived from approved rental applications in the mock data.

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/dashboard/status-badge';
import { mockApplications } from '@/data/mockData';

export default function OwnerTenantsPage() {
  // Current tenants are approximated from applications that were approved.
  const tenants = mockApplications.filter(a => a.status === 'approved');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Tenants</h1>
        <p className="text-muted-foreground">Manage your current tenants</p>
      </div>

      <div className="stat-grid grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="text-sm text-muted-foreground mb-1">Total Tenants</div>
            <div className="text-2xl font-bold">{tenants.length}</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="text-sm text-muted-foreground mb-1">Active Leases</div>
            <div className="text-2xl font-bold">{tenants.length}</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="text-sm text-muted-foreground mb-1">Pending Applications</div>
            <div className="text-2xl font-bold">2</div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Tenant List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tenants.map(tenant => (
               <div key={tenant.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  {/* Demo-only: map known tenant ids to initials/names (placeholder data) */}
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                    {tenant.tenantId === 'u2' ? 'SJ' : 'JL'}
                  </div>
                  <div>
                    <div className="font-medium">{tenant.tenantId === 'u2' ? 'Sarah Johnson' : 'Jessica Lee'}</div>
                    <div className="text-sm text-muted-foreground">Property ID: {tenant.propertyId}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge variant="success">Active</StatusBadge>
                  <Button size="sm" variant="outline">View</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
