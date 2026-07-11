import Link from "next/link";
import { CARIBBEAN_DESTINATIONS, DOMESTIC_DESTINATIONS, INTERNATIONAL_DESTINATIONS } from "@/data/travelData";

export default function TravelPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-neutral-900 text-white py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-display font-bold mb-4">Travel Destinations</h1>
          <p className="text-xl text-neutral-300 max-w-2xl">
            Explore curated luxury destinations across the Caribbean, domestic favorites, and international hideaways.
          </p>
        </div>
      </section>

      {/* Caribbean Destinations */}
      <section className="py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-display font-bold mb-8">Caribbean Destinations</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CARIBBEAN_DESTINATIONS.map((dest) => (
              <div key={dest.id} className="border border-neutral-200 rounded-lg overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{dest.name}</h3>
                  <p className="text-sm text-neutral-600 mb-2">{dest.stateOrCountry}</p>
                  <p className="text-sm line-clamp-2">{dest.description}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-bold">${dest.price}</span>
                    <span className="text-sm text-neutral-500">⭐ {dest.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Domestic Destinations */}
      <section className="py-16 px-8 bg-neutral-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-display font-bold mb-8">Domestic Destinations</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DOMESTIC_DESTINATIONS.map((dest) => (
              <div key={dest.id} className="border border-neutral-200 rounded-lg overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{dest.name}</h3>
                  <p className="text-sm text-neutral-600 mb-2">{dest.stateOrCountry}</p>
                  <p className="text-sm line-clamp-2">{dest.description}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-bold">${dest.price}</span>
                    <span className="text-sm text-neutral-500">⭐ {dest.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* International Destinations */}
      <section className="py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-display font-bold mb-8">International Destinations</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INTERNATIONAL_DESTINATIONS.map((dest) => (
              <div key={dest.id} className="border border-neutral-200 rounded-lg overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{dest.name}</h3>
                  <p className="text-sm text-neutral-600 mb-2">{dest.stateOrCountry}</p>
                  <p className="text-sm line-clamp-2">{dest.description}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-bold">${dest.price}</span>
                    <span className="text-sm text-neutral-500">⭐ {dest.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
