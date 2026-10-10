"use client";

// Agent "Rental Applications" page.
// Lists tenant applications for the agent to review, each with Approve/Reject
// buttons (not wired yet). Reads from mock data.
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockApplications } from '@/data/mockData';

export default function AgentApplicationsPage() {
  // All applications (demo data).
  const applications = mockApplications;

  return (
    <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Rental Applications</h1>
          <p className="text-muted-foreground">Review tenant applications</p>
        </div>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {applications.map(app => (
                  <div key={app.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div>
                    <div className="font-medium">Property {app.propertyId}</div>
                    <div className="text-sm text-muted-foreground">Tenant: {app.tenantId}</div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="h-8">Approve</Button>
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
