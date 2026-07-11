export default function AdminPortalPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-neutral-900 text-white py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-display font-bold mb-4">Global Admin</h1>
          <p className="text-xl text-neutral-300 max-w-2xl">
            Platform administration, user management, and system configuration.
          </p>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-neutral-200 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-2">User Management</h2>
              <p className="text-sm text-neutral-600">Manage users and permissions</p>
            </div>
            <div className="border border-neutral-200 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-2">Vendor Approval</h2>
              <p className="text-sm text-neutral-600">Review and approve vendor applications</p>
            </div>
            <div className="border border-neutral-200 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-2">System Settings</h2>
              <p className="text-sm text-neutral-600">Configure platform settings</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
