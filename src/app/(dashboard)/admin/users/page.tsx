"use client";

// Admin "User Management" page.
// Lists every platform user with verification/ban status, plus summary counts
// per role. Reads from mock data; the Add/View buttons are not wired yet.
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockUsers } from '@/data/mockData';
import { StatusBadge } from '@/components/dashboard/status-badge';

export default function AdminUsersPage() {
  // All users (demo data). The counts below are derived with .filter by role.
  const users = mockUsers;

  return (
    <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">User Management</h1>
            <p className="text-muted-foreground">Manage all platform users</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> Add User
          </Button>
        </div>

        <div className="stat-grid grid grid-cols-1 sm:grid-cols-4 gap-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground mb-1">Total Users</div>
              <div className="text-2xl font-bold">{users.length}</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground mb-1">Owners</div>
              <div className="text-2xl font-bold">{users.filter(u => u.role === 'owner').length}</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground mb-1">Tenants</div>
              <div className="text-2xl font-bold">{users.filter(u => u.role === 'tenant').length}</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground mb-1">Agents</div>
              <div className="text-2xl font-bold">{users.filter(u => u.role === 'agent').length}</div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>All Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {users.map(user => (
                  <div key={user.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    {/* Avatar shows the user's initials, built from their name */}
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge variant={user.verified ? 'success' : 'warning'}>{user.verified ? 'Verified' : 'Unverified'}</StatusBadge>
                    <StatusBadge variant={user.banned ? 'destructive' : 'default'}>{user.banned ? 'Banned' : 'Active'}</StatusBadge>
                    <Button size="sm" variant="outline" className="h-8">View</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
  );
}
