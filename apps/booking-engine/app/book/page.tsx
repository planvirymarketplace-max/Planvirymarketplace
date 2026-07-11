export default function BookPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-neutral-900 text-white py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-display font-bold mb-4">Book Experience</h1>
          <p className="text-xl text-neutral-300 max-w-2xl">
            Complete your booking in a few simple steps.
          </p>
        </div>
      </section>

      <section className="py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="border border-neutral-200 rounded-lg p-6 bg-neutral-50">
              <div className="text-2xl font-bold mb-2">1</div>
              <h3 className="font-semibold">Select Date</h3>
            </div>
            <div className="border border-neutral-200 rounded-lg p-6">
              <div className="text-2xl font-bold mb-2 text-neutral-400">2</div>
              <h3 className="font-semibold text-neutral-400">Choose Options</h3>
            </div>
            <div className="border border-neutral-200 rounded-lg p-6">
              <div className="text-2xl font-bold mb-2 text-neutral-400">3</div>
              <h3 className="font-semibold text-neutral-400">Review</h3>
            </div>
            <div className="border border-neutral-200 rounded-lg p-6">
              <div className="text-2xl font-bold mb-2 text-neutral-400">4</div>
              <h3 className="font-semibold text-neutral-400">Confirm</h3>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
