"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AgentMessagesPage() {
  return (
    <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Messages</h1>
          <p className="text-muted-foreground">Communicate with owners and tenants</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="border-0 shadow-sm lg:col-span-1">
            <CardHeader>
              <CardTitle>Conversations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {['Sarah Johnson', 'John Smith', 'Michael Brown'].map((name, i) => (
                  <div key={i} className={`p-3 rounded-lg cursor-pointer ${i === 0 ? 'bg-primary/10' : 'bg-muted'}`}>
                    <div className="font-medium text-sm">{name}</div>
                    <div className="text-xs text-muted-foreground">Last message preview...</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm lg:col-span-2">
            <CardContent className="p-6">
              <div className="h-96 flex items-center justify-center text-muted-foreground">
                Select a conversation to view messages
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
  );
}
