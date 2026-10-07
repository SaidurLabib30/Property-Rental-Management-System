"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/dashboard/status-badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { mockComplaints } from '@/data/mockData';

export default function OwnerComplaintsPage() {
  const [complaints] = useState(mockComplaints.filter(c => c.userId === 'u1' || c.userId === 'u2'));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Complaints</h1>
        <p className="text-muted-foreground">Manage and resolve tenant complaints</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
          <CardTitle>Recent Complaints</CardTitle>
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
                <div className="flex gap-2 mt-3">
                  <Input placeholder="Reply..." className="h-9 text-sm" />
                  <Button size="sm">Reply</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
