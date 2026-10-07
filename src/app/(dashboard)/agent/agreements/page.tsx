"use client";

import { mockAgreements } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/dashboard/status-badge';

export default function AgentAgreementsPage() {
  return (
    <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Rental Agreements</h1>
          <p className="text-muted-foreground">Manage rental agreements</p>
        </div>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Active Agreements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockAgreements.map(agreement => (
                 <div key={agreement.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div>
                    <div className="font-medium">Property {agreement.propertyId} - Tenant {agreement.tenantId}</div>
                    <div className="text-sm text-muted-foreground">{agreement.startDate} to {agreement.endDate}</div>
                    <div className="text-sm font-medium text-primary">${agreement.monthlyRent.toLocaleString()}/mo</div>
                  </div>
                  <StatusBadge variant="success">{agreement.status}</StatusBadge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
  );
}
