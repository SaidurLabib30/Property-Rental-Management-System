"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockComplaints } from '@/data/mockData';
import { StatusBadge } from '@/components/dashboard/status-badge';

export default function AdminComplaintsPage() {
  const complaints = mockComplaints;

  return (
    <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Fraud & Complaints</h1>
          <p className="text-muted-foreground">Manage platform complaints and fraud reports</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground mb-1">Open</div>
              <div className="text-2xl font-bold text-amber-600">{complaints.filter(c => c.status === 'open').length}</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground mb-1">In Progress</div>
              <div className="text-2xl font-bold text-blue-600">{complaints.filter(c => c.status === 'in_progress').length}</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground mb-1">Resolved</div>
              <div className="text-2xl font-bold text-green-600">{complaints.filter(c => c.status === 'resolved').length}</div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>All Complaints</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {complaints.map(complaint => (
                  <div key={complaint.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div>
                    <div className="font-medium">{complaint.subject}</div>
                    <div className="text-sm text-muted-foreground">{complaint.description}</div>
                    <div className="text-xs text-muted-foreground mt-1">User: {complaint.userId}</div>
                  </div>
                  <div className="flex gap-2">
                    <StatusBadge variant={complaint.status === 'open' ? 'warning' : complaint.status === 'resolved' ? 'success' : 'info'}>
                      {complaint.status.replace('_', ' ')}
                    </StatusBadge>
                    <Button size="sm" variant="outline" className="h-8">Resolve</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
  );
}
