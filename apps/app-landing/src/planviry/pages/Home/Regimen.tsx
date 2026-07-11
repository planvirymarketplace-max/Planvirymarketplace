/**
 * Regimen section — imported verbatim from eventsphere-global (GitHub).
 * "The Order" — Compose your event — anywhere.
 * Dark bg (bg-ink), light text (text-canvas).
 * 3-column box changed to 4-column, with PlanStep band info transferred in.
 * Self-contained scope with repo's exact color values.
 */

const REGIMEN_SCOPE_STYLE = `
.regimen-scope {
  --color-canvas: oklch(0.982 0.006 85);
  --color-ink: oklch(0.16 0.008 60);
  --color-ink-muted: oklch(0.5 0.008 60);
  --color-stone: oklch(0.93 0.008 75);
  --color-accent: oklch(0.32 0.028 130);
  --accent: oklch(0.32 0.028 130);
  --font-serif: "Instrument Serif", ui-serif, Georgia, serif;
  --font-sans: "Instrument Sans", ui-sans-serif, system-ui, sans-serif;
}
.regimen-scope .bg-ink { background-color: oklch(0.16 0.008 60) !important; }
.regimen-scope .bg-canvas { background-color: oklch(0.982 0.006 85) !important; }
.regimen-scope .text-ink { color: oklch(0.16 0.008 60) !important; }
.regimen-scope .text-canvas { color: oklch(0.982 0.006 85) !important; }
.regimen-scope .text-canvas\\/40 { color: oklch(0.982 0.006 85) !important; opacity: 0.4; }
.regimen-scope .text-canvas\\/60 { color: oklch(0.982 0.006 85) !important; opacity: 0.6; }
.regimen-scope .bg-canvas\\/10 { background-color: oklch(0.982 0.006 85 / 0.10) !important; }
.regimen-scope .bg-canvas\\/5 { background-color: oklch(0.982 0.006 85 / 0.05) !important; }
.regimen-scope .border-canvas\\/10 { border-color: oklch(0.982 0.006 85 / 0.10) !important; }
.regimen-scope .text-accent { color: oklch(0.32 0.028 130) !important; }
.regimen-scope .bg-accent { background-color: oklch(0.32 0.028 130) !important; }
`;

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

export function Regimen() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: REGIMEN_SCOPE_STYLE }} />
      <div className="regimen-scope">
        <section id="regimen" className="relative py-32 md:py-48 px-6 bg-ink text-canvas overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="relative px-6 md:px-10">
            <SectionMark code="§ IX" kicker="The Order" />
            <h2 className="font-serif italic leading-[0.82] tracking-tighter text-[22vw] md:text-[16rem] text-canvas">
              Finis.
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-canvas/10 border border-canvas/10 mb-16">
              {[
                { k: "01", t: "Describe your event", d: "Any occasion, any scale" },
                { k: "02", t: "Compare & book", d: "Partners, venues, travel" },
                { k: "03", t: "One payment", d: "Everything on one invoice" },
                { k: "04", t: "One itinerary", d: "Live timeline, synced" },
              ].map((r) => (
                <div key={r.k} className="bg-ink p-8 hover:bg-canvas/5 transition-colors">
                  <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-canvas/40 mb-4">{r.k}</div>
                  <h3 className="font-serif text-2xl mb-3">{r.t}</h3>
                  <p className="text-sm text-canvas/60">{r.d}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-6 items-center">
              <a
                href="/#/plan"
                className="px-10 py-5 bg-canvas text-ink text-xs font-medium tracking-[0.3em] uppercase hover:bg-accent hover:text-canvas transition-colors cursor-pointer no-underline"
              >
                Start planning →
              </a>
              <a href="/#/compose" className="font-serif italic text-2xl md:text-3xl hover:text-canvas/60 transition-colors cursor-pointer no-underline">
                or compose an event →
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
