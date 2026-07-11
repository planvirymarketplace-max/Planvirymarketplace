import { useNavigate } from "@/planviry/router";

/**
 * Manifesto section — imported verbatim from eventsphere-global (GitHub).
 * "Weddings were not built to be booked in tabs..." — closing wall.
 * Do NOT modify fonts, sizes, text, or components. The design tokens
 * (canvas, ink, ink-muted, accent) are provided by the `.atlas-hero-scope`
 * wrapper applied where this section is rendered.
 */

const heroTuscany = "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1600&q=80";

export function Manifesto() {
  const navigate = useNavigate();
  return (
    <section className="relative py-40 px-6 md:px-10 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img src={heroTuscany} alt="" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-canvas via-canvas/70 to-canvas" />
      </div>
      <div className="max-w-5xl">
        <div className="text-[10px] tracking-[0.35em] uppercase text-accent mb-8">Manifesto · 01 of 01</div>
        <p className="font-serif text-4xl md:text-6xl italic leading-[1.05] text-balance">
          Weddings were not built to be booked in tabs. Summits were not written
          to be forwarded in threads. Concerts were not staged by seven separate
          partners pretending not to know each other.
        </p>
        <p className="font-serif text-4xl md:text-6xl leading-[1.05] mt-8 text-balance">
          Every event is <span className="italic text-accent">one movement</span>.
          Planviry conducts it.
        </p>
        <div className="mt-16 flex flex-wrap gap-4 items-center">
          <a
            href="#compose"
            onClick={(e) => { e.preventDefault(); navigate("/compose?q=Event%20Composition&location=Global"); }}
            className="bg-accent text-ink px-10 py-5 text-[11px] tracking-[0.35em] uppercase hover:bg-ink hover:text-canvas transition-colors cursor-pointer"
          >
            Compose an event →
          </a>
          <a
            href="#atlas"
            onClick={(e) => { e.preventDefault(); navigate("/"); }}
            className="text-[11px] tracking-[0.35em] uppercase text-ink-muted hover:text-ink transition-colors px-4 py-5 cursor-pointer"
          >
            Or watch the Atlas
          </a>
        </div>
      </div>
    </section>
  );
}
