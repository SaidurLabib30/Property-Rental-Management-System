"use client";

// Owner "Analytics" page.
// Shows portfolio performance using the reusable ChartCard component.
// The datasets below are static demo values that feed the charts.
import { ChartCard } from '@/components/dashboard/chart-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Monthly revenue figures (used by the bar and line charts).
const revenueData = [
  { name: 'Jan', value: 24000 },
  { name: 'Feb', value: 22100 },
  { name: 'Mar', value: 22900 },
  { name: 'Apr', value: 20000 },
  { name: 'May', value: 21800 },
  { name: 'Jun', value: 28500 },
];

// Occupied vs available split (used by the pie chart).
const occupancyData = [
  { name: 'Occupied', value: 75 },
  { name: 'Available', value: 25 },
];

// Count of properties grouped by type.
const propertiesByType = [
  { name: 'Apartment', value: 5 },
  { name: 'House', value: 3 },
  { name: 'Villa', value: 2 },
  { name: 'Condo', value: 2 },
];

export default function OwnerAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">Insights into your property portfolio performance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Revenue Overview" type="bar" data={revenueData} dataKey="value" />
        <ChartCard title="Occupancy Rate" type="pie" data={occupancyData} dataKey="value" />
        <ChartCard title="Properties by Type" type="line" data={propertiesByType} dataKey="value" />
        <ChartCard title="Monthly Trends" type="line" data={revenueData} dataKey="value" />
      </div>
    </div>
  );
}
