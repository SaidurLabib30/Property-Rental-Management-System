// dashboard-card.tsx
// A small stat/KPI card for dashboards: shows a title, a big value, an icon,
// and an optional trend line (e.g. "+12% vs last month") colored green/red.
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

// Props: the label, the value to highlight, an icon component, and an optional
// trend object whose numeric `value` decides the color and +/- sign.
interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: { value: number; label: string };
  className?: string;
}

export function DashboardCard({ title, value, icon: Icon, trend, className }: DashboardCardProps) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {/* Only show the trend line when a trend is provided; green if >= 0, red otherwise */}
        {trend && (
          <p className={`text-xs ${trend.value >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {trend.value >= 0 ? '+' : ''}{trend.value}% {trend.label}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
