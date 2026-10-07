"use client";

import { ChartCard } from '@/components/dashboard/chart-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminReportsPage() {
  const userGrowth = [
    { name: 'Jan', value: 120 },
    { name: 'Feb', value: 180 },
    { name: 'Mar', value: 220 },
    { name: 'Apr', value: 280 },
    { name: 'May', value: 340 },
    { name: 'Jun', value: 420 },
  ];

  const propertyStats = [
    { name: 'Apartment', value: 45 },
    { name: 'House', value: 30 },
    { name: 'Villa', value: 15 },
    { name: 'Condo', value: 10 },
  ];

  return (
    <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Reports & Analytics</h1>
          <p className="text-muted-foreground">Platform-wide insights and statistics</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="User Growth" type="line" data={userGrowth} dataKey="value" />
          <ChartCard title="Property Distribution" type="pie" data={propertyStats} dataKey="value" />
          <ChartCard title="Monthly Revenue" type="bar" data={userGrowth} dataKey="value" />
          <ChartCard title="Application Trends" type="line" data={userGrowth} dataKey="value" />
        </div>
      </div>
  );
}
