/**
 * Three sections imported verbatim from planviry-unfold repo:
 * 1. Modus — "One booking. One payment. One itinerary." (beneath Tabula)
 * 2. Enterprise — "For the partners, venues and planners who build the moments." (beneath Modus)
 * 3. Civitas — "The cities that host the world." (above Orchestrate)
 *
 * Uses the unfold repo's EXACT color/font tokens:
 *   coral=oklch(0.68 0.18 30), ink=oklch(0.15 0.01 60), ivory=oklch(0.985 0.008 85),
 *   ash=oklch(0.42 0.01 60), sand=oklch(0.93 0.02 75), rule=oklch(0.86 0.015 70)
 *   roman=font-serif italic, eyebrow=font-sans 0.6875rem tracking-0.32em uppercase
 */

const UNFOLD_SCOPE_STYLE = `
.unfold-scope {
  --color-ink: oklch(0.15 0.01 60);
  --color-ivory: oklch(0.985 0.008 85);
  --color-sand: oklch(0.93 0.02 75);
  --color-coral: oklch(0.68 0.18 30);
  --color-ash: oklch(0.42 0.01 60);
  --color-rule: oklch(0.86 0.015 70);
  --color-canvas: oklch(0.985 0.008 85);
  --font-serif: "Instrument Serif", ui-serif, Georgia, serif;
  --font-sans: "Instrument Sans", ui-sans-serif, system-ui, sans-serif;
}
.unfold-scope .bg-ink { background-color: oklch(0.15 0.01 60) !important; }
.unfold-scope .bg-ivory { background-color: oklch(0.985 0.008 85) !important; }
.unfold-scope .bg-sand { background-color: oklch(0.93 0.02 75) !important; }
.unfold-scope .bg-sand\\/50 { background-color: oklch(0.93 0.02 75 / 0.5) !important; }
.unfold-scope .bg-coral { background-color: oklch(0.68 0.18 30) !important; }
.unfold-scope .bg-card { background-color: oklch(1 0 0) !important; }
.unfold-scope .text-ink { color: oklch(0.15 0.01 60) !important; }
.unfold-scope .text-ivory { color: oklch(0.985 0.008 85) !important; }
.unfold-scope .text-coral { color: oklch(0.68 0.18 30) !important; }
.unfold-scope .text-ash { color: oklch(0.42 0.01 60) !important; }
.unfold-scope .text-ivory\\/70 { color: oklch(0.985 0.008 85) !important; opacity: 0.7; }
.unfold-scope .text-ivory\\/60 { color: oklch(0.985 0.008 85) !important; opacity: 0.6; }
.unfold-scope .border-rule { border-color: oklch(0.86 0.015 70) !important; }
.unfold-scope .border-ink { border-color: oklch(0.15 0.01 60) !important; }
.unfold-scope .border-ivory\\/10 { border-color: oklch(0.985 0.008 85 / 0.10) !important; }
.unfold-scope .border-ivory\\/30 { border-color: oklch(0.985 0.008 85 / 0.30) !important; }
.unfold-scope .divide-rule > * + * { border-color: oklch(0.86 0.015 70) !important; }
.unfold-scope .hover\\:text-coral:hover { color: oklch(0.68 0.18 30) !important; }
.unfold-scope .hover\\:border-coral:hover { border-color: oklch(0.68 0.18 30) !important; }
.unfold-scope .hover\\:bg-coral:hover { background-color: oklch(0.68 0.18 30) !important; }
`;

const modules = [
  { k: "Venues",  body: "Villas, resorts, private estates, conference halls and event spaces vetted across 50+ countries." },
  { k: "Travel",  body: "Flights, ground transport, group logistics and door-to-door itineraries for every guest." },
  { k: "Partners", body: "Photographers, caterers, entertainment, decor and planners — verified, insured, ranked." },
  { k: "Tickets", body: "Concerts, sport, theatre, tours and VIP packages, held inside the same itinerary." },
];

const destinations = [
  ["Tuscany", "IT"], ["Bali", "ID"], ["Paris", "FR"], ["New York", "US"],
  ["Cancún", "MX"], ["Marrakech", "MA"], ["Tokyo", "JP"], ["Lisbon", "PT"],
  ["Cape Town", "ZA"], ["Santorini", "GR"], ["Dubai", "AE"], ["London", "UK"],
  ["Kyoto", "JP"], ["Ibiza", "ES"], ["Reykjavik", "IS"], ["Mexico City", "MX"],
  ["Los Angeles", "US"], ["Chicago", "US"], ["Miami", "US"], ["Nashville", "US"],
  ["Atlanta", "US"], ["Denver", "US"], ["Dallas", "US"], ["San Francisco", "US"],
  ["Phoenix", "US"], ["Seattle", "US"], ["Boston", "US"], ["Las Vegas", "US"],
  ["Houston", "US"], ["Orlando", "US"], ["Detroit", "US"],
  ["Florence", "IT"], ["Rome", "IT"], ["Vienna", "AT"], ["Milan", "IT"],
  ["Jerusalem", "IL"], ["Damascus", "SY"], ["Corinth", "GR"], ["Syracuse", "IT"],
  ["Tunis", "TN"], ["Seville", "ES"], ["Marseille", "FR"], ["Alexandria", "EG"],
  ["Istanbul", "TR"],
];

export function Modus() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: UNFOLD_SCOPE_STYLE }} />
      <div className="unfold-scope">
        <section id="modus" className="border-b border-rule bg-sand/50">
          <div className="grid lg:grid-cols-12 gap-0">
            <div className="lg:col-span-4 px-8 lg:px-14 py-16 lg:py-24 border-r border-rule">
              <div className="flex items-baseline gap-6 mb-12 border-b border-rule pb-6">
                <span className="text-[10px] font-medium tracking-[0.35em] uppercase text-ash">§ VI</span>
                <span className="font-serif italic text-2xl md:text-3xl text-ash">The orchestration</span>
              </div>
              <h2 className="font-serif italic leading-[0.82] tracking-tighter text-[22vw] md:text-[16rem] text-ink">
                Cives.
              </h2>
              <p className="mt-8 font-serif text-5xl lg:text-7xl text-ink leading-[0.95]">
                One booking. <br />
                One payment. <br />
                <span className="italic text-coral">One itinerary.</span>
              </p>
              <p className="mt-8 text-ash leading-relaxed max-w-sm">
                Planviry unifies the seven pillars of event planning under a single ledger.
                No spreadsheets. No middlemen. No fragmented confirmations.
              </p>
              <a href="#/services" className="mt-10 inline-flex items-center gap-2 text-ink border-b border-ink pb-1 hover:text-coral hover:border-coral no-underline">
                See the platform →
              </a>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-rule">
              {modules.map((m, idx) => (
                <div key={m.k} className={`p-10 lg:p-12 ${idx > 1 ? "sm:border-t sm:border-rule" : ""} relative`}>
                  <div className="flex items-start justify-between">
                    <span className="text-[10px] tracking-[0.3em] uppercase text-ash">{String(idx + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mt-6 font-serif italic text-5xl text-ink">{m.k}</h3>
                  <p className="mt-4 text-ash leading-relaxed text-[15px]">{m.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export function Enterprise() {
  return (
    <div className="unfold-scope">
      <section id="enterprise" className="bg-ink text-ivory border-b border-ink">
        <div className="grid lg:grid-cols-12 gap-0">
          <div className="lg:col-span-7 px-8 lg:px-14 py-20 lg:py-28 border-r border-ivory/10">
            <div className="flex items-baseline gap-6 mb-12 border-b border-ivory/10 pb-6">
              <span className="text-[10px] font-medium tracking-[0.35em] uppercase text-ivory/50">§ VII</span>
              <span className="font-serif italic text-2xl md:text-3xl text-ivory/60">The partnership</span>
            </div>
            <h2 className="font-serif italic leading-[0.82] tracking-tighter text-[22vw] md:text-[16rem] text-ivory">
              Collegium.
            </h2>
            <p className="mt-8 font-serif text-6xl lg:text-8xl leading-[0.95] text-ivory">
              For the partners, <br />
              venues and planners <br />
              <span className="italic text-coral">who build the moments.</span>
            </p>
            <p className="mt-10 max-w-xl text-ivory/70 text-lg leading-relaxed">
              Publish inventory, receive verified enquiries and settle in one currency across
              fifty countries. Planviry is the operating layer for the modern events economy.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#/vendors" className="inline-flex items-center gap-2 bg-coral text-ivory px-6 py-3 hover:opacity-80 transition-colors no-underline">
                List your venue →
              </a>
              <a href="#/vendors" className="inline-flex items-center gap-2 border border-ivory/30 text-ivory px-6 py-3 hover:border-coral hover:text-coral transition-colors no-underline">
                Partner portal →
              </a>
            </div>
          </div>
          <div className="lg:col-span-5 px-8 lg:px-14 py-20 lg:py-28 grid grid-cols-2 gap-y-12 gap-x-8 content-center">
            {[
              ["50+", "Countries served"],
              ["7",   "Unified modules"],
              ["1",   "Ledger, one payment"],
              ["∞",   "Itinerary complexity"],
            ].map(([k, v]) => (
              <div key={v}>
                <div className="font-serif italic text-7xl text-coral leading-none">{k}</div>
                <div className="mt-3 text-[10px] tracking-[0.3em] uppercase text-ivory/60">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export function Civitas() {
  const row = [...destinations, ...destinations, ...destinations];
  return (
    <div className="unfold-scope">
      <section id="civitas" className="border-b border-rule py-32 md:py-40 bg-ivory text-ink">
        <div className="px-6 md:px-10">
          <div className="flex items-end justify-between gap-6 mb-12 border-b border-rule pb-6">
            <div className="flex items-baseline gap-6">
              <span className="text-[10px] font-medium tracking-[0.35em] uppercase text-ash">§ VIII</span>
              <span className="font-serif italic text-2xl md:text-3xl text-ash">The cities that host the world</span>
            </div>
            <span className="text-[10px] font-medium tracking-[0.35em] uppercase text-ash hidden md:block">
            </span>
          </div>
          <h2 className="font-serif italic leading-[0.82] tracking-tighter text-[22vw] md:text-[16rem] text-ink mb-16">
            Civitas.
          </h2>
          <div className="flex justify-end mb-10">
            <a href="#/explore" className="text-[13px] text-ink hover:text-coral no-underline">
              All destinations →
            </a>
          </div>
        </div>

        <div className="overflow-hidden">
          <div className="flex gap-14 whitespace-nowrap animate-[marquee_25s_linear_infinite]">
            {row.map((d, i) => (
              <a key={i} href="#/services" className="flex items-baseline gap-3 group no-underline">
                <span className="font-serif italic text-6xl lg:text-8xl text-ink group-hover:text-coral transition-colors">
                  {d[0]}
                </span>
                <span className="text-[10px] tracking-[0.3em] uppercase text-ash">{d[1]}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
