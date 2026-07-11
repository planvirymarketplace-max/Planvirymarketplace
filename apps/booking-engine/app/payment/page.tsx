export default function PaymentPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-neutral-900 text-white py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-display font-bold mb-4">Payment & Splitting</h1>
          <p className="text-xl text-neutral-300 max-w-2xl">
            Manage mutual contributions, strategy splits, and secure checkout transfers.
          </p>
        </div>
      </section>

      {/* Payment Content */}
      <section className="py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border border-neutral-200 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Cost Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Total Estimated Cost</span>
                  <span className="font-bold">$12,500</span>
                </div>
                <div className="flex justify-between">
                  <span>Lodging Portion</span>
                  <span>$8,500</span>
                </div>
                <div className="flex justify-between">
                  <span>Other Items</span>
                  <span>$4,000</span>
                </div>
              </div>
            </div>

            <div className="border border-neutral-200 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Split Strategy</h2>
              <div className="space-y-3">
                <button className="w-full p-4 border border-neutral-300 rounded-lg text-left hover:border-neutral-400">
                  <div className="font-semibold">Split Equally</div>
                  <div className="text-sm text-neutral-600">$3,125 per person</div>
                </button>
                <button className="w-full p-4 border border-neutral-300 rounded-lg text-left hover:border-neutral-400">
                  <div className="font-semibold">Split by Item</div>
                  <div className="text-sm text-neutral-600">Assign custom events per member</div>
                </button>
                <button className="w-full p-4 border border-neutral-300 rounded-lg text-left hover:border-neutral-400">
                  <div className="font-semibold">Custom Split</div>
                  <div className="text-sm text-neutral-600">Set custom amounts per person</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
