"use client";

// Owner "Rent Collection" page.
// Shows summary totals (collected, pending, overdue) and a list of payments.
// The payment data is hard-coded sample data for now.

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/dashboard/status-badge';

export default function OwnerRentPage() {
  // Sample list of rent payments, each with a status of paid/pending/overdue.
  const payments = [
    { id: 'pm1', property: 'Luxury Downtown Apt', tenant: 'Sarah Johnson', amount: 3500, date: '2024-05-01', status: 'paid' },
    { id: 'pm2', property: 'Cozy Studio', tenant: 'Jessica Lee', amount: 1800, date: '2024-05-05', status: 'paid' },
    { id: 'pm3', property: 'Luxury Downtown Apt', tenant: 'Sarah Johnson', amount: 3500, date: '2024-06-01', status: 'pending' },
    { id: 'pm4', property: 'Spacious Family House', tenant: 'Emily Brown', amount: 4500, date: '2024-06-01', status: 'overdue' },
  ];

  // Add up the amounts of all "paid" payments for the Total Collected card.
  const totalCollected = payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);
  // Add up the amounts of all "pending" payments for the Pending card.
  const totalPending = payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Rent Collection</h1>
        <p className="text-muted-foreground">Track and manage rent payments</p>
      </div>

      {/* Three summary cards. Collected and Pending use the computed totals;
          Overdue is a static value here. */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="text-sm text-muted-foreground mb-1">Total Collected</div>
            <div className="text-2xl font-bold text-green-600">৳ {totalCollected.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="text-sm text-muted-foreground mb-1">Pending</div>
            <div className="text-2xl font-bold text-amber-600">৳ {totalPending.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="text-sm text-muted-foreground mb-1">Overdue</div>
            <div className="text-2xl font-bold text-red-600">৳ 4,500</div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* One row per payment; the badge colour reflects the payment status */}
            {payments.map(payment => (
              <div key={payment.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <div className="font-medium">{payment.property}</div>
                  <div className="text-sm text-muted-foreground">{payment.tenant}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">৳ {payment.amount.toLocaleString()}</div>
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
