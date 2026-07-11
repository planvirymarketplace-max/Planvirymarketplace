export default function LiveShowsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-neutral-900 text-white py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-display font-bold mb-4">Live Shows</h1>
          <p className="text-xl text-neutral-300 max-w-2xl">
            Discover concerts, sports events, theater performances, and more.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-neutral-200 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-2">Concerts</h2>
              <p className="text-sm text-neutral-600">National tours, regional bands, music festivals</p>
            </div>
            <div className="border border-neutral-200 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-2">Sports</h2>
              <p className="text-sm text-neutral-600">NFL, NBA, MLB, NHL games and more</p>
            </div>
            <div className="border border-neutral-200 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-2">Arts & Theater</h2>
              <p className="text-sm text-neutral-600">Musicals, plays, comedy shows</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
