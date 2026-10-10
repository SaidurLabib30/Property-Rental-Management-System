"use client";

// Agent "Messages" page.
// A simple two-column messaging layout: a list of conversations on the left
// and a reading pane on the right. This is a static placeholder UI (names are
// hard-coded and no conversation is actually loaded yet).
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
          {/* Left column: list of conversations (first one shown as selected) */}
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

          {/* Right column: the selected conversation's messages (empty state here) */}
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
