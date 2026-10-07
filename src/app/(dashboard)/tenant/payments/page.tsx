"use client";

import { mockPayments } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/dashboard/status-badge';

export default function TenantPaymentsPage() {
  const payments = mockPayments.filter(p => p.tenantId === 'u2');

  return (
    <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Payments</h1>
          <p className="text-muted-foreground">Your rent payment history</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground mb-1">Total Paid</div>
              <div className="text-2xl font-bold text-green-600">${payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0).toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground mb-1">Pending</div>
              <div className="text-2xl font-bold text-amber-600">${payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0).toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground mb-1">Overdue</div>
              <div className="text-2xl font-bold text-red-600">$0</div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {payments.map(payment => (
                  <div key={payment.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div>
                    <div className="font-medium">Property {payment.propertyId}</div>
                    <div className="text-sm text-muted-foreground">{payment.date} via {payment.method}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">${payment.amount.toLocaleString()}</div>
                    <StatusBadge variant={payment.status === 'paid' ? 'success' : payment.status === 'pending' ? 'warning' : 'destructive'}>
                      {payment.status}
                    </StatusBadge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
  );
}
