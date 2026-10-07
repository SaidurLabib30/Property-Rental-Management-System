"use client";

import { mockComplaints } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/dashboard/status-badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function TenantComplaintsPage() {
  const complaints = mockComplaints.filter(c => c.userId === 'u2');

  return (
    <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Support & Complaints</h1>
          <p className="text-muted-foreground">Submit and track your support requests</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Submit a Complaint</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div>
                  <Label>Subject</Label>
                  <Input placeholder="Brief description of the issue" />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea rows={4} placeholder="Describe your issue in detail..." />
                </div>
                <Button type="submit">Submit Complaint</Button>
              </form>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>My Complaints</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complaints.map(complaint => (
                   <div key={complaint.id} className="p-4 bg-muted rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium">{complaint.subject}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{complaint.description}</p>
                      </div>
                      <StatusBadge variant={complaint.status === 'open' ? 'warning' : complaint.status === 'resolved' ? 'success' : 'info'}>
                        {complaint.status.replace('_', ' ')}
                      </StatusBadge>
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
