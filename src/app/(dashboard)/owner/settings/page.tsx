// Owner "Settings" page.
// A static settings form for editing profile details and changing the
// password. The inputs use defaultValue placeholders and are not yet wired
// to a save action.
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';

export default function OwnerSettingsPage() {
  return (
    <div className="max-w-2xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings</p>
        </div>

        {/* Profile details card */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6 space-y-4">
            <div>
              <Label>Full Name</Label>
              <Input defaultValue="John Smith" />
            </div>
            <div>
              <Label>Email</Label>
              <Input defaultValue="john@example.com" />
            </div>
            <div>
              <Label>Phone</Label>
              <Input defaultValue="+1 555-0101" />
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        {/* Change-password card */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6 space-y-4">
            <h3 className="font-semibold">Change Password</h3>
            <div>
              <Label>Current Password</Label>
              <Input type="password" />
            </div>
            <div>
              <Label>New Password</Label>
              <Input type="password" />
            </div>
            <div>
              <Label>Confirm New Password</Label>
              <Input type="password" />
            </div>
            <Button variant="outline">Update Password</Button>
          </CardContent>
        </Card>
      </div>
  );
}
