export default function ItineraryPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-neutral-900 text-white py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-display font-bold mb-4">Itinerary</h1>
          <p className="text-xl text-neutral-300 max-w-2xl">
            Weekend Gala Itinerary - Oct 18 - Oct 20, 2026
          </p>
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <span className="flex items-center gap-1.5 text-neutral-300 text-sm bg-white/10 px-4 py-1.5 rounded-full">
              Oct 18 - Oct 20, 2026
            </span>
            <span className="flex items-center gap-1 text-neutral-300 text-sm bg-white/10 px-4 py-1 rounded-full">
              Savannah, GA
            </span>
          </div>
        </div>
      </section>

      {/* Itinerary Timeline */}
      <section className="py-16 px-8">
        <div className="max-w-6xl mx-auto">
          {/* Day 1: Friday */}
          <div className="space-y-6 mb-12">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-sm">
                FRI
              </div>
              <h3 className="text-2xl font-bold">Arrival & Grand Welcomes</h3>
            </div>

            <div className="ml-6 space-y-4">
              <div className="border border-neutral-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">Check-in at Perry Lane Hotel</h4>
                    <p className="text-sm text-neutral-600 mt-1">3:00 PM - 5:00 PM</p>
                  </div>
                  <span className="text-sm font-bold">$850</span>
                </div>
              </div>

              <div className="border border-neutral-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">Welcome Cocktail Hour</h4>
                    <p className="text-sm text-neutral-600 mt-1">6:00 PM - 8:00 PM</p>
                  </div>
                  <span className="text-sm font-bold">$450</span>
                </div>
              </div>
            </div>
          </div>

          {/* Day 2: Saturday */}
          <div className="space-y-6 mb-12">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-sm">
                SAT
              </div>
              <h3 className="text-2xl font-bold">Gala Day</h3>
            </div>

            <div className="ml-6 space-y-4">
              <div className="border border-neutral-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">Brunch at The Collins Quarter</h4>
                    <p className="text-sm text-neutral-600 mt-1">10:00 AM - 12:00 PM</p>
                  </div>
                  <span className="text-sm font-bold">$320</span>
                </div>
              </div>

              <div className="border border-neutral-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">Historic Trolley Tour</h4>
                    <p className="text-sm text-neutral-600 mt-1">1:00 PM - 3:00 PM</p>
                  </div>
                  <span className="text-sm font-bold">$180</span>
                </div>
              </div>

              <div className="border border-neutral-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">Main Gala Event</h4>
                    <p className="text-sm text-neutral-600 mt-1">7:00 PM - 11:00 PM</p>
                  </div>
                  <span className="text-sm font-bold">$5,500</span>
                </div>
              </div>
            </div>
          </div>

          {/* Day 3: Sunday */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-sm">
                SUN
              </div>
              <h3 className="text-2xl font-bold">Departure</h3>
            </div>

            <div className="ml-6 space-y-4">
              <div className="border border-neutral-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">Farewell Brunch</h4>
                    <p className="text-sm text-neutral-600 mt-1">10:00 AM - 12:00 PM</p>
                  </div>
                  <span className="text-sm font-bold">$280</span>
                </div>
              </div>

              <div className="border border-neutral-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">Check-out & Departure</h4>
                    <p className="text-sm text-neutral-600 mt-1">12:00 PM - 2:00 PM</p>
                  </div>
                  <span className="text-sm font-bold">-</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
