/**
 * Corpus section — imported verbatim from eventsphere-global (GitHub).
 * "Corpus." — the highlighted partner body. 8 houses in a 4-col grid +
 * marquee of names. Do NOT modify fonts, sizes, text, or components.
 *
 * The section defines its own CSS scope with the repo's EXACT color values
 * so it renders identically to the source, regardless of the project's
 * global token definitions.
 */

const CORPUS_SCOPE_STYLE = `
.corpus-scope {
  --color-canvas: oklch(0.982 0.006 85);
  --color-ink: oklch(0.16 0.008 60);
  --color-ink-muted: oklch(0.5 0.008 60);
  --color-ink-faint: oklch(0.75 0.006 60);
  --color-stone: oklch(0.93 0.008 75);
  --color-accent: oklch(0.32 0.028 130);
  --accent: oklch(0.32 0.028 130);
  --font-serif: "Instrument Serif", ui-serif, Georgia, serif;
  --font-sans: "Instrument Sans", ui-sans-serif, system-ui, sans-serif;
}
.corpus-scope .bg-stone { background-color: oklch(0.93 0.008 75) !important; }
.corpus-scope .bg-canvas { background-color: oklch(0.982 0.006 85) !important; }
.corpus-scope .bg-ink { background-color: oklch(0.16 0.008 60) !important; }
.corpus-scope .text-ink { color: oklch(0.16 0.008 60) !important; }
.corpus-scope .text-canvas { color: oklch(0.982 0.006 85) !important; }
.corpus-scope .text-ink-muted { color: oklch(0.5 0.008 60) !important; }
.corpus-scope .text-ink-faint { color: oklch(0.75 0.006 60) !important; }
.corpus-scope .text-accent { color: oklch(0.32 0.028 130) !important; }
.corpus-scope .bg-accent { background-color: oklch(0.32 0.028 130) !important; }
.corpus-scope .fill-accent { fill: oklch(0.32 0.028 130) !important; }
.corpus-scope .border-accent { border-color: oklch(0.32 0.028 130) !important; }
.corpus-scope .border-ink\\/15 { border-color: oklch(0.16 0.008 60 / 0.15) !important; }
.corpus-scope .border-ink\\/10 { border-color: oklch(0.16 0.008 60 / 0.10) !important; }
.corpus-scope .bg-ink\\/10 { background-color: oklch(0.16 0.008 60 / 0.10) !important; }
.corpus-scope .bg-ink\\/60 { background-color: oklch(0.16 0.008 60 / 0.60) !important; }
`;

// CORPUS — the highlighted partner body
const CORPUS = [
  { house: "Aman",             discipline: "Accommodation", origin: "Zürich",   since: "1988" },
  { house: "Alain Ducasse",    discipline: "Gastronomy",    origin: "Monaco",   since: "1987" },
  { house: "NetJets",          discipline: "Aviation",      origin: "Columbus", since: "1964" },
  { house: "Bureau Betak",     discipline: "Production",    origin: "Paris",    since: "1990" },
  { house: "Preston Bailey",   discipline: "Decor",         origin: "New York", since: "1980" },
  { house: "Annie Leibovitz",  discipline: "Photography",   origin: "New York", since: "1970" },
  { house: "Cirque du Soleil", discipline: "Entertainment", origin: "Montréal", since: "1984" },
  { house: "Rosewood",         discipline: "Estates",       origin: "Dallas",   since: "1979" },
];

function SectionMark({ code, kicker }: { code: string; kicker: string }) {
  return (
    <div className="flex items-end justify-between gap-6 mb-12 border-b border-current/15 pb-6">
      <div className="flex items-baseline gap-6">
        <span className="text-[10px] font-medium tracking-[0.35em] uppercase opacity-50">{code}</span>
        <span className="font-serif italic text-2xl md:text-3xl opacity-60">{kicker}</span>
      </div>
      <span className="text-[10px] font-medium tracking-[0.35em] uppercase opacity-50 hidden md:block">
      </span>
    </div>
  );
}

export function Corpus() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CORPUS_SCOPE_STYLE }} />
      <div className="corpus-scope">
        <section id="corpus" className="relative py-32 md:py-40 bg-stone text-ink overflow-hidden">
          <div className="relative px-6 md:px-10">
            <SectionMark code="§ IV" kicker="The Body of Houses" />
            <div className="flex items-end justify-between flex-wrap gap-8 mb-20">
              <h2 className="font-serif italic leading-[0.82] tracking-tighter text-[22vw] md:text-[16rem]">
                Corpus.
              </h2>
              <p className="max-w-[38ch] text-ink-muted text-sm pb-6">
                <span className="text-ink">The partners we open doors to.</span> A body of houses that
                do not answer public inquiries — Planviry members skip the line.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-ink/10 border border-ink/10">
              {CORPUS.map((c, i) => (
                <div key={c.house} className="bg-canvas p-6 md:p-8 min-h-[220px] flex flex-col justify-between group">
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-ink-muted">
                      H.{String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-ink-muted">
                      est. {c.since}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-serif text-3xl md:text-4xl leading-[0.95] mb-3 group-hover:italic transition-all">
                      {c.house}
                    </h3>
                    <div className="flex items-center justify-between text-[10px] font-medium tracking-[0.25em] uppercase text-ink-muted">
                      <span>{c.discipline}</span>
                      <span>{c.origin}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 overflow-hidden border-y border-ink/10 py-4">
              <div className="whitespace-nowrap font-serif italic text-2xl md:text-3xl text-ink-muted animate-[marquee_40s_linear_infinite]">
                {"Aman · Ducasse · NetJets · Bureau Betak · Preston Bailey · Leibovitz · Cirque du Soleil · Rosewood · Nobu · Baccarat · Sotheby's · Christie's · Ferrari Trento · Krug · ".repeat(3)}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
