import { useEffect, useState } from "react";

/**
 * Atlas hero — imported verbatim from eventsphere-global (GitHub).
 * Do NOT modify fonts, sizes, text, or components. The design tokens
 * (canvas, ink, ink-muted, accent, stone, font-serif) are provided by
 * the `.atlas-hero-scope` wrapper in globals.css.
 */

// Real-ish coordinates → projected into a 1000x500 equirectangular map viewbox.
const project = (lat: number, lng: number) => ({
  x: ((lng + 180) / 360) * 1000,
  y: ((90 - lat) / 180) * 500,
});

const PINS = [
  { id: "tus", label: "Val d'Orcia", type: "Wedding", lat: 43.07, lng: 11.61 },
  { id: "bal", label: "Ubud", type: "Retreat", lat: -8.51, lng: 115.26 },
  { id: "lon", label: "London", type: "Summit", lat: 51.51, lng: -0.13 },
  { id: "sgp", label: "Marina Bay", type: "Gala", lat: 1.28, lng: 103.86 },
  { id: "isl", label: "Höfn", type: "Cercle", lat: 64.25, lng: -15.2 },
  { id: "vgs", label: "Nobu Vegas", type: "Bachelor", lat: 36.12, lng: -115.17 },
  { id: "tky", label: "Aoyama", type: "Product Launch", lat: 35.66, lng: 139.71 },
  { id: "rio", label: "Ipanema", type: "Concert", lat: -22.98, lng: -43.2 },
  { id: "nyc", label: "Manhattan", type: "IPO Dinner", lat: 40.75, lng: -73.99 },
  { id: "mar", label: "Marrakech", type: "Weekend", lat: 31.63, lng: -7.99 },
];

export function AtlasHero() {
  return <Atlas />;
}

/* ─────────── ATLAS HERO ─────────── */
function Atlas() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive((i) => (i + 1) % PINS.length), 2400);
    return () => clearInterval(t);
  }, []);
  const focus = PINS[active];
  return (
    <section id="atlas" className="relative min-h-screen w-full pt-24 pb-16">
      {/* Dotted atlas backdrop */}
      <div className="absolute inset-0 z-0">
        <DottedAtlas activeId={focus.id} />
        <div className="absolute inset-0 bg-gradient-to-b from-canvas via-canvas/40 to-canvas" />
      </div>

      <div className="relative z-10 px-6 md:px-10">
        {/* Meta strip removed */}

        {/* Massive kinetic headline */}
        <div className="relative">
          <h1 className="font-serif leading-[0.82] tracking-[-0.03em]">
            <span className="block text-[22vw] md:text-[16vw]">Any Event.</span>
            <span className="block text-[22vw] md:text-[16vw] pl-[8vw] italic text-ink-muted">Anywhere</span>
            <span className="block text-[22vw] md:text-[16vw] pl-[24vw] -mt-[2vw]">on Earth.</span>
          </h1>
        </div>

        {/* Focus card floating right */}
        <div className="mt-12 grid md:grid-cols-[1fr_auto] gap-10 items-end">
          <p className="max-w-[46ch] text-lg text-ink-muted text-pretty">
            One instrument that composes venue, travel, partners, tickets
            and cover into a single, unbreakable score.
          </p>
          <div className="border-l border-ink/15 pl-6 min-w-[280px]">
            <div className="text-[10px] tracking-[0.35em] uppercase text-accent mb-3 flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-accent animate-pulse" /> Now composing
            </div>
            <div className="font-serif text-3xl italic">{focus.label}</div>
            <div className="text-xs text-ink-muted mt-1 tabular-nums">
              {focus.type} · {focus.lat.toFixed(2)}°, {focus.lng.toFixed(2)}°
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DottedAtlas({ activeId }: { activeId: string }) {
  // Simple dot cloud approximating continent silhouettes (procedural, no data file).
  const dots: { x: number; y: number }[] = [];
  for (let x = 0; x < 1000; x += 12) {
    for (let y = 0; y < 500; y += 12) {
      const inLand = landMask(x, y);
      if (inLand) dots.push({ x, y });
    }
  }
  return (
    <svg viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={1} className="fill-ink/25" />
      ))}
      {PINS.map((p) => {
        const { x, y } = project(p.lat, p.lng);
        const on = p.id === activeId;
        return (
          <g key={p.id} transform={`translate(${x} ${y})`}>
            {on && <circle r={14} className="fill-accent/20">
              <animate attributeName="r" values="6;22;6" dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.6;0;0.6" dur="2.4s" repeatCount="indefinite" />
            </circle>}
            <circle r={on ? 3.2 : 1.8} className={on ? "fill-accent" : "fill-ink/70"} />
            {on && (
              <text x={8} y={-6} className="fill-ink font-serif italic" style={{ fontSize: 10 }}>
                {p.label}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

// Rough landmask so continents feel recognizable without a data file.
function landMask(x: number, y: number) {
  const shapes: [number, number, number, number][] = [
    // [cx, cy, rx, ry]  -- crude continent blobs on equirectangular 1000x500
    [180, 160, 90, 60],   // N America west
    [260, 180, 90, 80],   // N America east
    [290, 260, 40, 50],   // C America
    [320, 360, 55, 90],   // S America
    [500, 170, 70, 55],   // Europe
    [560, 250, 110, 90],  // Africa
    [660, 180, 130, 90],  // Asia
    [780, 250, 60, 40],   // SE Asia
    [820, 360, 55, 30],   // Australia
    [500, 470, 250, 30],  // Antarctica strip
  ];
  for (const [cx, cy, rx, ry] of shapes) {
    const dx = (x - cx) / rx, dy = (y - cy) / ry;
    if (dx * dx + dy * dy <= 1) return true;
  }
  return false;
}
