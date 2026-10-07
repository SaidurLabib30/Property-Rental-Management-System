import WorksWheelDemo from '@/components/ui/works-wheel-demo';

export default function OwnerDashboard() {
  return (
    <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Overview</h1>
          <p className="text-muted-foreground">Welcome back! Here is what is happening with your properties.</p>
        </div>

        <div className="bg-card rounded-xl border p-6 shadow-sm">
          <h3 className="font-semibold mb-4 text-center">Featured Properties</h3>
          <p className="text-sm text-muted-foreground text-center mb-4">Scroll or drag to browse</p>
          <div className="flex justify-center mb-4">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search properties..."
                className="w-full h-10 pl-10 pr-4 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <div className="h-[400px]">
            <WorksWheelDemo />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card rounded-xl border p-6 shadow-sm">
            <div className="text-sm font-medium text-muted-foreground mb-1">Total Properties</div>
            <div className="text-3xl font-bold">12</div>
            <div className="text-xs text-green-600 mt-1">+2 this month</div>
          </div>
          <div className="bg-card rounded-xl border p-6 shadow-sm">
            <div className="text-sm font-medium text-muted-foreground mb-1">Occupied</div>
            <div className="text-3xl font-bold">9</div>
            <div className="text-xs text-muted-foreground mt-1">75% occupancy</div>
          </div>
          <div className="bg-card rounded-xl border p-6 shadow-sm">
            <div className="text-sm font-medium text-muted-foreground mb-1">Available</div>
            <div className="text-3xl font-bold">3</div>
            <div className="text-xs text-muted-foreground mt-1">Ready to rent</div>
          </div>
          <div className="bg-card rounded-xl border p-6 shadow-sm">
            <div className="text-sm font-medium text-muted-foreground mb-1">Monthly Collection</div>
            <div className="text-3xl font-bold">$28,500</div>
            <div className="text-xs text-green-600 mt-1">+5.2% from last month</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card rounded-xl border p-6 shadow-sm">
            <h3 className="font-semibold mb-4">Recent Payments</h3>
            <div className="space-y-4">
              {[
                { tenant: 'Sarah Johnson', property: 'Luxury Downtown Apt', amount: 3500, date: '2024-05-01', status: 'paid' },
                { tenant: 'Jessica Lee', property: 'Cozy Studio', amount: 1800, date: '2024-05-05', status: 'paid' },
                { tenant: 'Laura Martinez', property: 'Modern Condo', amount: 3200, date: '2024-06-01', status: 'pending' },
              ].map((payment, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <div className="font-medium text-sm">{payment.tenant}</div>
                    <div className="text-xs text-muted-foreground">{payment.property}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-sm">${payment.amount.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground capitalize">{payment.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-xl border p-6 shadow-sm">
            <h3 className="font-semibold mb-4">My Properties</h3>
            <div className="space-y-3">
              {[
                { title: 'Luxury Downtown Apartment', status: 'rented', price: 3500 },
                { title: 'Cozy Studio in Brooklyn', status: 'rented', price: 1800 },
                { title: 'Elegant Villa with Pool', status: 'available', price: 6000 },
              ].map((property, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <div className="font-medium text-sm">{property.title}</div>
                    <div className="text-xs text-muted-foreground">${property.price.toLocaleString()}/mo</div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${property.status === 'available' ? 'bg-green-100 text-green-700' : 'bg-muted text-foreground'}`}>
                    {property.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  );
}
