/**
 * Forma section — imported verbatim from eventsphere-global (GitHub).
 * "Forma." — the blueprint. 4 movements from first brief to final applause.
 * Replaces Strata (which was redundant with Tabula's 7 disciplines).
 * Do NOT modify fonts, sizes, text, or components.
 *
 * Self-contained scope with repo's exact color values (light: bg-canvas, text-ink).
 */

const FORMA_SCOPE_STYLE = `
.forma-scope {
  --color-canvas: oklch(0.982 0.006 85);
  --color-ink: oklch(0.16 0.008 60);
  --color-ink-muted: oklch(0.5 0.008 60);
  --color-stone: oklch(0.93 0.008 75);
  --color-accent: oklch(0.32 0.028 130);
  --accent: oklch(0.32 0.028 130);
  --font-serif: "Instrument Serif", ui-serif, Georgia, serif;
  --font-sans: "Instrument Sans", ui-sans-serif, system-ui, sans-serif;
}
.forma-scope .bg-canvas { background-color: oklch(0.982 0.006 85) !important; }
.forma-scope .bg-ink { background-color: oklch(0.16 0.008 60) !important; }
.forma-scope .text-ink { color: oklch(0.16 0.008 60) !important; }
.forma-scope .text-canvas { color: oklch(0.982 0.006 85) !important; }
.forma-scope .text-ink-muted { color: oklch(0.5 0.008 60) !important; }
.forma-scope .text-ink\\/10 { color: oklch(0.16 0.008 60) !important; opacity: 0.1; }
.forma-scope .text-ink\\/30 { color: oklch(0.16 0.008 60) !important; opacity: 0.3; }
.forma-scope .border-ink\\/10 { border-color: oklch(0.16 0.008 60 / 0.10) !important; }
.forma-scope .bg-ink\\/10 { background-color: oklch(0.16 0.008 60 / 0.10) !important; }
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

export function Forma() {
  const steps = [
    { n: "I",   title: "Brief",     body: "Your intent, guests, geography and taste captured by a live orchestrator." },
    { n: "II",  title: "Compose",   body: "We assemble modules onto the canvas — venue, travel, partners, tickets." },
    { n: "III", title: "Confirm",   body: "One approval. Every partner, contract and payment resolved simultaneously." },
    { n: "IV",  title: "Conduct",   body: "On the day, a dedicated bureau runs the score. You attend. We orchestrate." },
  ];
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: FORMA_SCOPE_STYLE }} />
      <div className="forma-scope">
        <section id="forma" className="relative py-32 md:py-40 px-6 md:px-10 bg-canvas text-ink overflow-hidden">
          <div className="relative">
            <SectionMark code="§ II" kicker="The Blueprint" />
            <div className="flex items-end justify-between flex-wrap gap-6 mb-20">
              <h2 className="font-serif leading-[0.82] tracking-tighter text-[22vw] md:text-[16rem]">
                Forma.
              </h2>
              <p className="max-w-[36ch] text-ink-muted text-sm pb-6">
                <span className="text-ink">How we do it.</span> Four movements from first brief to final applause.
                No project managers. No spreadsheets. No handoffs.
              </p>
            </div>

            <div className="relative grid md:grid-cols-4 gap-px bg-ink/10 border border-ink/10">
              {steps.map((s, i) => (
                <div key={s.n} className="relative bg-canvas p-8 md:p-10 min-h-[380px] flex flex-col">
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-serif italic text-[8rem] leading-none text-ink/10 -mt-4">{s.n}</span>
                    <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-ink-muted">
                      Step 0{i + 1}
                    </span>
                  </div>
                  <h3 className="font-serif text-3xl mb-4">{s.title}</h3>
                  <p className="text-sm text-ink-muted mt-auto max-w-[32ch]">{s.body}</p>
                  {i < steps.length - 1 && (
                    <svg
                      aria-hidden
                      viewBox="0 0 40 20"
                      className="hidden md:block absolute right-[-20px] top-1/2 -translate-y-1/2 w-10 h-5 text-ink/30 z-10"
                    >
                      <path d="M0 10 H36 M30 4 L36 10 L30 16" stroke="currentColor" fill="none" strokeWidth="1" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
