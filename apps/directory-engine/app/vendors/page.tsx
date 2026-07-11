export default function VendorsPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-neutral-900 text-white py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-display font-bold mb-4">Vendors</h1>
          <p className="text-xl text-neutral-300 max-w-2xl">
            Discover premium vendors for your events and experiences.
          </p>
        </div>
      </section>

      <section className="py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-neutral-200 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-2">Catering</h2>
              <p className="text-sm text-neutral-600">Gourmet food and beverage services</p>
            </div>
            <div className="border border-neutral-200 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-2">Venues</h2>
              <p className="text-sm text-neutral-600">Event spaces and locations</p>
            </div>
            <div className="border border-neutral-200 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-2">Entertainment</h2>
              <p className="text-sm text-neutral-600">Music, DJs, and performers</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
