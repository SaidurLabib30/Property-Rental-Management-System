"use client";

// chart-card.tsx
// A single card that renders one of three Recharts chart types (line, bar, or
// pie) from the data it is given. Dashboards reuse it for all their charts.
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { LucideIcon } from 'lucide-react';

// Props describe the chart: its title, which chart `type` to draw, the data
// array, the field to plot (`dataKey`), the category field (`xAxisKey`), and
// optional custom colors.
interface ChartCardProps {
  title: string;
  icon?: LucideIcon;
  type: 'line' | 'bar' | 'pie';
  data: any[];
  dataKey: string;
  xAxisKey?: string;
  colors?: string[];
  className?: string;
}

// Default color palette used when no `colors` prop is passed
// (navy, professional blue, amber, green, slate — matching the app theme).
const COLORS = ['#1E3A5F', '#2563EB', '#F59E0B', '#16A34A', '#64748B'];

export function ChartCard({ title, type, data, dataKey, xAxisKey = 'name', colors = COLORS, className }: ChartCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-base font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          {/* ResponsiveContainer makes the chart fill its parent box */}
          <ResponsiveContainer width="100%" height="100%">
            {/* Pick the chart to render based on the `type` prop */}
            {type === 'line' ? (
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey={xAxisKey} tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip />
                <Line type="monotone" dataKey={dataKey} stroke={colors[0]} strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            ) : type === 'bar' ? (
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey={xAxisKey} tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip />
                <Bar dataKey={dataKey} fill={colors[0]} radius={[4, 4, 0, 0]} />
              </BarChart>
            ) : (
              // Pie chart: one colored slice per data entry
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#1E3A5F"
                  dataKey={dataKey}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
