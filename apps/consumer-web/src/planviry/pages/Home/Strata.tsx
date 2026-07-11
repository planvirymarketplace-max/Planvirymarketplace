/**
 * Strata section — 7 event decision layers on a horizontal rail.
 * Dark bg (bg-ink), light text (text-canvas).
 * Self-contained scope with repo's exact color values.
 */

const STRATA_SCOPE_STYLE = `
.strata-scope {
  --color-canvas: oklch(0.982 0.006 85);
  --color-ink: oklch(0.16 0.008 60);
  --color-ink-muted: oklch(0.5 0.008 60);
  --color-stone: oklch(0.93 0.008 75);
  --color-accent: oklch(0.32 0.028 130);
  --accent: oklch(0.32 0.028 130);
  --font-serif: "Instrument Serif", ui-serif, Georgia, serif;
  --font-sans: "Instrument Sans", ui-sans-serif, system-ui, sans-serif;
}
.strata-scope .bg-ink { background-color: oklch(0.16 0.008 60) !important; }
.strata-scope .bg-canvas { background-color: oklch(0.982 0.006 85) !important; }
.strata-scope .text-ink { color: oklch(0.16 0.008 60) !important; }
.strata-scope .text-canvas { color: oklch(0.982 0.006 85) !important; }
.strata-scope .text-ink-muted { color: oklch(0.5 0.008 60) !important; }
.strata-scope .text-accent { color: oklch(0.32 0.028 130) !important; }
.strata-scope .bg-ink\\/15 { background-color: oklch(0.982 0.006 85 / 0.15) !important; }
.strata-scope .bg-canvas\\/15 { background-color: oklch(0.982 0.006 85 / 0.15) !important; }
`;

const STRATA = [
  { code: "I", name: "Coordination", body: "One conductor. Every hand on the score." },
  { code: "II", name: "Ground", body: "Villas, estates, resorts, halls, event floors." },
  { code: "III", name: "Movement", body: "Charter, commercial, transfer — one arrival." },
  { code: "IV", name: "Access", body: "Boxes, VIP, backstage, front row, tomorrow." },
  { code: "V", name: "Partners", body: "Cuisine, lens, sound, décor, production." },
  { code: "VI", name: "Membership", body: "Club. Loyalty. The gates that don't post rates." },
  { code: "VII", name: "Cover", body: "Event liability. Traveler protection. To enterprise scale." },
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

export function Strata() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STRATA_SCOPE_STYLE }} />
      <div className="strata-scope">
        <section id="strata" className="relative py-32 md:py-40 px-6 md:px-10 bg-ink text-canvas overflow-hidden">
          <div className="relative px-6 md:px-10">
            <SectionMark code="§ III" kicker="The Layers" />
            <div className="flex items-end justify-between flex-wrap gap-6 mb-20">
              <h2 className="font-serif italic leading-[0.82] tracking-tighter text-[22vw] md:text-[16rem] text-canvas">
                Strata.
              </h2>
              <p className="max-w-[38ch] text-canvas/50 text-sm pb-6">
                A single event is a stack of decisions. Planviry names seven, then
                collapses them into one score. Read it top-to-bottom. Play it as you like.
              </p>
            </div>

            {/* horizontal rail */}
            <div className="relative">
              <div className="absolute left-0 right-0 top-1/2 h-px bg-canvas/15" />
              <div className="grid grid-cols-7 relative">
                {STRATA.map((s, i) => (
                  <div key={s.code} className="relative pt-4 pb-6 group min-h-[320px]">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-2 rounded-full bg-canvas group-hover:bg-accent group-hover:scale-150 transition-all z-10" />
                    <div className={`absolute left-0 right-0 ${i % 2 === 0 ? "bottom-1/2 mb-8" : "top-1/2 mt-8"}`}>
                      <div className="text-center">
                        <div className="font-serif text-3xl italic text-accent">{s.code}</div>
                        <div className="text-[10px] tracking-[0.3em] uppercase mt-2 text-canvas">{s.name}</div>
                        <div className="text-[11px] text-canvas/50 mt-2 max-w-[16ch] mx-auto leading-snug">
                          {s.body}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
