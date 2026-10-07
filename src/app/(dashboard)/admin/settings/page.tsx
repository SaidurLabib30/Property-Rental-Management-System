"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { mockUsers } from '@/data/mockData';
import { StatusBadge } from '@/components/dashboard/status-badge';

export default function AdminSettingsPage() {
  const bannedUsers = mockUsers.filter(u => u.banned);

  return (
    <div className="max-w-2xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">System settings and moderation</p>
        </div>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Banned Users</CardTitle>
          </CardHeader>
          <CardContent>
            {bannedUsers.length === 0 ? (
              <p className="text-sm text-muted-foreground">No banned users.</p>
            ) : (
              <div className="space-y-3">
                {bannedUsers.map(user => (
                   <div key={user.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                    <Button size="sm" variant="outline" className="h-8">Unban</Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6 space-y-4">
            <h3 className="font-semibold">System Configuration</h3>
            <div>
              <Label>Site Name</Label>
              <Input defaultValue="PropEase" />
            </div>
            <div>
              <Label>Support Email</Label>
              <Input defaultValue="support@propease.com" />
            </div>
            <Button>Save Settings</Button>
          </CardContent>
        </Card>
      </div>
  );
}
