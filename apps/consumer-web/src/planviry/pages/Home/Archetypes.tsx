import { useNavigate } from "@/planviry/router";

/**
 * Archetypes section — imported verbatim from eventsphere-global (GitHub).
 * "Archive / MMXXVI" — a corpus of 3 event case studies.
 * Do NOT modify fonts, sizes, text, or components. The design tokens
 * (ink, ink-muted, accent, stone) are provided by the `.atlas-hero-scope`
 * wrapper applied where this section is rendered.
 */

const ARCHETYPES = [
  {
    image: "/gates/case-tuscany.jpg",
    tag: "PRIVATE",
    city: "SIENA",
    coord: "43.07°N · 11.61°E",
    title: "The Marchesi Nuptials",
    line: "Villa Cetinale · 180 guests · 6 strata · 11 partners · one weekend.",
    yearRoman: "MMXXVI",
    route: "/concierge",
  },
  {
    image: "/gates/case-bali.jpg",
    tag: "CORPORATE",
    city: "UBUD",
    coord: "8.51°S · 115.26°E",
    title: "The Ubud Strategy Retreat",
    line: "Bambu private compound · 45 executives · 7 strata · one narrative.",
    yearRoman: "MMXXVI",
    route: "/concierge",
  },
  {
    image: "/gates/case-london.jpg",
    tag: "ENTERPRISE",
    city: "LONDON",
    coord: "51.51°N · 0.13°W",
    title: "Sovereign Fintech Summit",
    line: "Old Billingsgate · 1,200 delegates · 4 strata · zero seams.",
    yearRoman: "MMXXVI",
    route: "/concierge",
  },
];

export function Archetypes() {
  const navigate = useNavigate();
  return (
    <section id="archetypes" className="py-32 px-6 md:px-10">
      <div className="flex items-end justify-between mb-16">
        <h2 className="font-serif text-[14vw] md:text-[8vw] leading-[0.82] tracking-[-0.03em]">
          Archive<span className="italic text-ink-muted"> / MMXXVI</span>
        </h2>
        <div className="text-[10px] tracking-[0.35em] uppercase text-ink-muted hidden md:block">Vol. 03 · 42 Cities</div>
      </div>

      <div className="space-y-2">
        {ARCHETYPES.map((a, i) => (
          <a
            key={a.title}
            href="#"
            onClick={(e) => { e.preventDefault(); navigate(a.route); }}
            className="group relative grid grid-cols-12 items-center gap-6 py-8 border-t border-ink/15 last:border-b hover:bg-stone/40 transition-colors px-2 md:px-6 cursor-pointer"
          >
            <div className="col-span-1 font-serif text-2xl italic text-accent tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </div>
            <div className="col-span-3 md:col-span-2 text-[10px] tracking-[0.3em] uppercase">
              <div className="text-accent">{a.tag}</div>
              <div className="mt-1 text-ink">{a.city}</div>
              <div className="mt-1 text-ink-muted tabular-nums">{a.coord}</div>
            </div>
            <div className="col-span-8 md:col-span-6">
              <div className="font-serif text-3xl md:text-5xl italic leading-none">{a.title}</div>
              <div className="text-sm text-ink-muted mt-3">{a.line}</div>
            </div>
            <div className="col-span-12 md:col-span-3 relative">
              <div className="ml-auto relative aspect-[4/3] w-full max-w-[280px] overflow-hidden">
                <img
                  src={a.image}
                  alt={a.title}
                  width={560}
                  height={420}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105 grayscale group-hover:grayscale-0"
                />
                <div className="absolute bottom-2 right-2 text-[9px] tracking-[0.3em] uppercase text-canvas bg-ink/60 backdrop-blur px-2 py-1">
                  {a.yearRoman}
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
