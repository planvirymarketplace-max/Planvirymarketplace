export default function VendorDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-neutral-900 text-white py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-display font-bold mb-4">Vendor: {params.id}</h1>
          <p className="text-xl text-neutral-300 max-w-2xl">
            View vendor details and services.
          </p>
        </div>
      </section>

      <section className="py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="border border-neutral-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Vendor Information</h2>
            <div className="space-y-4">
              <div>
                <span className="font-semibold">Vendor ID:</span>
                <span className="ml-2">{params.id}</span>
              </div>
              <div>
                <span className="font-semibold">Rating:</span>
                <span className="ml-2">4.8/5.0</span>
              </div>
              <div>
                <span className="font-semibold">Location:</span>
                <span className="ml-2">Savannah, GA</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
