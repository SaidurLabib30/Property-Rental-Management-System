"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AgentSettingsPage() {
  return (
    <div className="max-w-2xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings</p>
        </div>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6 space-y-4">
            <div>
              <Label>Full Name</Label>
              <Input defaultValue="Michael Brown" />
            </div>
            <div>
              <Label>Email</Label>
              <Input defaultValue="michael@example.com" />
            </div>
            <div>
              <Label>Phone</Label>
              <Input defaultValue="+1 555-0103" />
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>
      </div>
  );
}
