import React from 'react';
import { useNavigate } from '@/planviry/router';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { DESTINATION_TAXONOMY } from '../../data/destinationTaxonomy';

export const DestinationNavigatorPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-[#010000] font-sans">
      <section className="bg-[#f7f3ee] border-b border-neutral-200 px-8 lg:px-12 py-16">
        <div className="mx-auto max-w-6xl">
          <button
            onClick={() => navigate('/')}
            className="text-sm font-medium text-neutral-600 hover:text-[#F47245] transition"
          >
            ← Back to Planviry
          </button>

          <div className="mt-8 max-w-3xl">
            <p className="text-xs uppercase tracking-[0.35em] text-[#9A7C6E]">Destination Navigator</p>
            <h1 className="mt-4 text-5xl font-serif font-semibold tracking-tight text-[#010000] sm:text-6xl">
              A destination landing page for curated global locations
            </h1>
            <p className="mt-6 text-base leading-8 text-neutral-600">
              Explore regions, countries, and city clusters drawn from Planviry’s destination taxonomy.
              This landing page carries the consumer web design into the destination experience, with a
              direct link to the external destination navigator repository.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="https://github.com/planvirymarketplace-max/destination-navigator.git"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-full bg-[#010000] px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-900"
            >
              Open destination navigator repo
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={() => navigate('/travel')}
              className="inline-flex items-center gap-2 rounded-full border border-neutral-900 px-5 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-100"
            >
              Explore Travel
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      <section className="px-8 lg:px-12 py-16">
        <div className="mx-auto max-w-6xl space-y-10">
          {DESTINATION_TAXONOMY.map((region) => (
            <div key={region.region} className="rounded-[2rem] border border-neutral-200 bg-white p-8 shadow-sm">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-[#F47245]">Region</p>
                  <h2 className="mt-3 text-3xl font-semibold text-[#010000]">{region.region}</h2>
                  <p className="mt-3 text-sm text-neutral-500">Curated destination collections for {region.region.toLowerCase()}.</p>
                </div>
                <span className="inline-flex rounded-full bg-neutral-100 px-3 py-1 text-sm font-semibold text-neutral-700">
                  {region.countries.length} countries
                </span>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {region.countries.slice(0, 8).map((country) => (
                  <div key={country.country} className="rounded-3xl border border-neutral-100 bg-[#fbf8f3] p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-semibold text-[#010000]">{country.country}</h3>
                        <p className="mt-2 text-sm text-neutral-600">{country.cities.length} destinations</p>
                      </div>
                      {country.overviewUrl ? (
                        <a
                          href={country.overviewUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="text-sm font-semibold text-[#F47245] hover:text-[#c2491d]"
                        >
                          Overview
                        </a>
                      ) : null}
                    </div>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {country.cities.slice(0, 5).map((city) => (
                        <a
                          key={city.name}
                          href={city.url}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-neutral-700 transition hover:border-[#F47245] hover:text-[#F47245]"
                        >
                          {city.name}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
