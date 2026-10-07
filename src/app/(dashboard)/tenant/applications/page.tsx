"use client";

import { mockApplications } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/dashboard/status-badge';

export default function TenantApplicationsPage() {
  const applications = mockApplications.filter(a => a.tenantId === 'u2');

  return (
    <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Applications</h1>
          <p className="text-muted-foreground">Track your rental applications</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground mb-1">Total</div>
              <div className="text-2xl font-bold">{applications.length}</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground mb-1">Approved</div>
              <div className="text-2xl font-bold text-green-600">{applications.filter(a => a.status === 'approved').length}</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground mb-1">Pending</div>
              <div className="text-2xl font-bold text-amber-600">{applications.filter(a => a.status === 'pending' || a.status === 'under_review').length}</div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>My Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {applications.map(app => (
                  <div key={app.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div>
                    <div className="font-medium">Property {app.propertyId}</div>
                    <div className="text-sm text-muted-foreground">Applied: {app.appliedAt}</div>
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
  );
}
