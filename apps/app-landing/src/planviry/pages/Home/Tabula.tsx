/**
 * Tabula section — "Ways to Engage"
 * Two-column: left = solar eclipse, right = engagement text.
 * Dark bg (bg-ink), light text (text-canvas).
 */

const TABULA_SCOPE_STYLE = `
.tabula-scope {
  --color-canvas: oklch(0.982 0.006 85);
  --color-ink: oklch(0.16 0.008 60);
  --color-ink-muted: oklch(0.5 0.008 60);
  --color-accent: oklch(0.32 0.028 130);
  --accent: oklch(0.32 0.028 130);
  --font-serif: "Instrument Serif", ui-serif, Georgia, serif;
  --font-sans: "Instrument Sans", ui-sans-serif, system-ui, sans-serif;
}
.tabula-scope .bg-ink { background-color: oklch(0.16 0.008 60) !important; }
.tabula-scope .bg-canvas { background-color: oklch(0.982 0.006 85) !important; }
.tabula-scope .text-ink { color: oklch(0.16 0.008 60) !important; }
.tabula-scope .text-canvas { color: oklch(0.982 0.006 85) !important; }
.tabula-scope .text-canvas\\/40 { color: oklch(0.982 0.006 85) !important; opacity: 0.4; }
.tabula-scope .text-canvas\\/50 { color: oklch(0.982 0.006 85) !important; opacity: 0.5; }
.tabula-scope .text-canvas\\/60 { color: oklch(0.982 0.006 85) !important; opacity: 0.6; }
.tabula-scope .text-canvas\\/15 { color: oklch(0.982 0.006 85) !important; opacity: 0.15; }
.tabula-scope .border-canvas\\/15 { border-color: oklch(0.982 0.006 85 / 0.15) !important; }
`;

function SectionMark({ code, kicker }: { code: string; kicker: string }) {
  return (
    <div className="flex items-end justify-between gap-6 mb-12 border-b border-canvas/15 pb-6">
      <div className="flex items-baseline gap-6">
        <span className="text-[10px] font-medium tracking-[0.35em] uppercase opacity-50">{code}</span>
        <span className="font-serif italic text-2xl md:text-3xl opacity-60">{kicker}</span>
      </div>
    </div>
  );
}

export function Tabula() {
  const engageOptions = [
    { want: "Plan an event", help: "Discover venues, experiences, travel, and trusted partners while organizing every detail in one place." },
    { want: "Grow my business", help: "Showcase your services, reach new customers, manage bookings, and promote your business." },
    { want: "Create and operate events", help: "Build public or private events, manage registrations, coordinate partners, and deliver exceptional experiences." },
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: TABULA_SCOPE_STYLE }} />
      <div className="tabula-scope">
        <section id="tabula" className="relative py-32 md:py-40 bg-ink text-canvas overflow-hidden">
          <div className="relative px-6 md:px-10">
            <SectionMark code="§ V" kicker="Ways to Engage" />
            <h2 className="font-serif italic leading-[0.82] tracking-tighter text-[22vw] md:text-[16rem] text-canvas mb-12">
              Tabula.
            </h2>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              {/* Left column */}
              <div>
                <p className="text-lg text-canvas/60 leading-relaxed mb-10">
                  Planviry is built for everyone who brings people together. Whether you're planning
                  a family celebration, growing an event business, or operating events around the world,
                  you can start free and expand as your needs evolve.
                </p>

                <div className="border-t border-canvas/15">
                  {engageOptions.map((opt) => (
                    <div key={opt.want} className="grid grid-cols-[1fr_2fr] gap-6 py-6 border-b border-canvas/15 items-baseline">
                      <div className="font-serif text-2xl md:text-3xl leading-none text-canvas">{opt.want}</div>
                      <p className="text-sm text-canvas/50 leading-relaxed">{opt.help}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right column */}
              <div>
                <p className="font-serif text-2xl md:text-3xl italic text-canvas/70 mb-4">
                  Start free. Add what you need.
                </p>
                <p className="text-sm text-canvas/50 leading-relaxed">
                  Most people begin with a free account. As your events become larger, more frequent,
                  or more complex, you can add specialized tools, professional services, memberships,
                  advertising, or business features — only when they create value for you.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
