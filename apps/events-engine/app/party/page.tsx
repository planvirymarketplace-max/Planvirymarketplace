export default function PartyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-neutral-900 text-white py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-display font-bold mb-4">Party & Social Events</h1>
          <p className="text-xl text-neutral-300 max-w-2xl">
            Discover nightlife mixers, gaming tournaments, and seasonal celebrations.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-neutral-200 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-2">Nightlife & Social</h2>
              <p className="text-sm text-neutral-600">Singles events, happy hours, karaoke nights</p>
            </div>
            <div className="border border-neutral-200 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-2">Gaming & Esports</h2>
              <p className="text-sm text-neutral-600">Tabletop gaming, trading card tournaments, LAN parties</p>
            </div>
            <div className="border border-neutral-200 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-2">Seasonal & Holiday</h2>
              <p className="text-sm text-neutral-600">New Year's Eve, Halloween, Christmas celebrations</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
