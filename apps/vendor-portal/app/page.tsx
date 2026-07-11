export default function VendorPortalPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-neutral-900 text-white py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-display font-bold mb-4">Vendor Portal</h1>
          <p className="text-xl text-neutral-300 max-w-2xl">
            Manage your listings, bookings, and business profile.
          </p>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-neutral-200 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-2">My Listings</h2>
              <p className="text-sm text-neutral-600">Manage your services and venues</p>
            </div>
            <div className="border border-neutral-200 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-2">Bookings</h2>
              <p className="text-sm text-neutral-600">View and manage incoming requests</p>
            </div>
            <div className="border border-neutral-200 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-2">Analytics</h2>
              <p className="text-sm text-neutral-600">Track performance and revenue</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
