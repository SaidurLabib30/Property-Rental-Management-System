// Tenant "Settings" page.
// A simple profile form (name/email/phone) for the tenant account. Inputs use
// placeholder defaultValues; the Save button is not wired to an action yet.
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function TenantSettingsPage() {
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
            <Input defaultValue="Sarah Johnson" />
          </div>
          <div>
            <Label>Email</Label>
            <Input defaultValue="sarah@example.com" />
          </div>
          <div>
            <Label>Phone</Label>
            <Input defaultValue="+1 555-0102" />
          </div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  );
}
