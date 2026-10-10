"use client";

// Admin "Overview" page.
// The admin landing screen: top-level KPI cards, a user-role breakdown, and a
// recent system-activity feed. All numbers here are static demo values.
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminDashboard() {
  // Static platform-wide statistics shown in the cards below.
  const stats = {
    totalUsers: 1247,
    owners: 342,
    tenants: 856,
    agents: 49,
    properties: 1893,
    applications: 567,
    reports: 12,
  };

  return (
    <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Overview</h1>
          <p className="text-muted-foreground">System-wide statistics and management</p>
        </div>

        <div className="stat-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground mb-1">Total Users</div>
              <div className="text-3xl font-bold">{stats.totalUsers.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground mt-1">+12% this month</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground mb-1">Properties</div>
              <div className="text-3xl font-bold">{stats.properties.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground mb-1">Applications</div>
              <div className="text-3xl font-bold">{stats.applications}</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground mb-1">Reports</div>
              <div className="text-3xl font-bold text-red-600">{stats.reports}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>User Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Owners</span>
                  <span className="font-semibold">{stats.owners}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Tenants</span>
                  <span className="font-semibold">{stats.tenants}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Agents</span>
                  <span className="font-semibold">{stats.agents}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm lg:col-span-2">
            <CardHeader>
              <CardTitle>System Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {/* Recent activity feed — placeholder entries rendered in a list */}
                {[
                  { action: 'New property listed', user: 'John Smith', time: '2 min ago' },
                  { action: 'Application approved', user: 'Michael Brown', time: '15 min ago' },
                  { action: 'New user registered', user: 'Laura Martinez', time: '1 hour ago' },
                  { action: 'Complaint filed', user: 'Sarah Johnson', time: '2 hours ago' },
                ].map((activity, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div>
                      <div className="font-medium text-sm">{activity.action}</div>
                      <div className="text-xs text-muted-foreground">by {activity.user}</div>
                    </div>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
  );
}
