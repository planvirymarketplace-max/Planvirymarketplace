import { useRef, useState, useEffect } from "react";
import { useNavigate } from "@/planviry/router";

/**
 * Composition section — imported verbatim from eventsphere-global (GitHub).
 * "One score. Every seat." — a constellation visualization showing a real
 * event composing itself.
 *
 * Sequential animation: a dot travels node 1 → 2 → 3 → 4 → 5, blinking
 * at each stop, then loops. Only the active node pings; the path draws
 * progressively up to the active node.
 */

function buildPath(nodes: { x: number; y: number }[]) {
  let d = `M ${nodes[0].x} ${nodes[0].y}`;
  for (let i = 1; i < nodes.length; i++) {
    const p = nodes[i - 1], c = nodes[i];
    const mx = (p.x + c.x) / 2;
    d += ` C ${mx} ${p.y}, ${mx} ${c.y}, ${c.x} ${c.y}`;
  }
  return d;
}

export function Composition() {
  const navigate = useNavigate();
  const [activeNode, setActiveNode] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const nodes = [
    { x: 8, y: 30, label: "Ground", title: "Aman Venice · Grand Canal Suite", meta: "4 nights · 2 guests" },
    { x: 28, y: 62, label: "Movement", title: "Embraer 1000E · LCY → VCE", meta: "Sat 14 Jun · 09:20 UTC" },
    { x: 50, y: 22, label: "Partners", title: "L'Effervescence · Private catering", meta: "Tasting menu · 42 covers" },
    { x: 70, y: 68, label: "Access", title: "Teatro La Fenice · Palco Reale", meta: "Puccini · La Bohème · 20:00" },
    { x: 85, y: 50, label: "Cover", title: "Successful event", meta: "Sealed · all strata composed" },
  ];

  // Sequential animation: cycle through nodes 0→1→2→3→4→0...
  useEffect(() => {
    const id = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % nodes.length);
    }, 1800);
    return () => clearInterval(id);
  }, [nodes.length]);
  return (
    <section id="compose" className="relative py-32 bg-ink text-canvas overflow-hidden">
      <div className="px-6 md:px-10 mb-20">
        <div className="flex items-baseline gap-6 mb-12 border-b border-canvas/15 pb-6">
          <span className="text-[10px] font-medium tracking-[0.35em] uppercase opacity-50">§ II</span>
          <span className="font-serif italic text-2xl md:text-3xl opacity-60">The Symphony of Planning</span>
          <span className="text-[10px] font-medium tracking-[0.35em] uppercase opacity-50 hidden md:block ml-auto">
          </span>
        </div>
        <div className="grid md:grid-cols-[1.2fr_1fr] gap-10 items-end">
          <h2 className="font-serif italic leading-[0.82] tracking-tighter text-[22vw] md:text-[16rem] text-canvas">
            Compose.
          </h2>
          <p className="max-w-[46ch] text-canvas/60 text-lg pb-4">
            Watch a real event compose itself — a Venice weekend, five strata,
            drawn as constellation. Each node negotiated, priced, insured, sealed.
          </p>
        </div>
      </div>

      <div ref={ref} className="relative mx-6 md:mx-10 h-[560px] md:h-[620px] ring-1 ring-canvas/10 rounded-sm overflow-hidden">
        {/* Map background */}
        <img
          src="https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=1200&q=80"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-[0.08]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.04),transparent_60%)]" />
        {/* grid ticks */}
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }} />
        {/* connecting curve */}
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
          <path
            d={buildPath(nodes)}
            stroke="#F47245"
            strokeWidth="0.2"
            fill="none"
            strokeDasharray="1 1.5"
          />
        </svg>

        {nodes.map((n, i) => {
          const isActive = i === activeNode;
          const isVisited = i <= activeNode;
          return (
            <div
              key={i}
              className="absolute -translate-x-1/2 -translate-y-1/2 group"
              style={{ left: `${n.x}%`, top: `${n.y}%` }}
            >
              <div className="relative">
                <div className={`size-3 rounded-full shadow-[0_0_0_6px_rgba(0,0,0,0.4)] group-hover:scale-125 transition-all duration-300 ${isActive ? "bg-[#F47245] scale-125" : isVisited ? "bg-[#F47245]" : "bg-canvas/20"}`} />
                {isActive && <div className="absolute size-3 rounded-full bg-[#F47245]/40 animate-ping" />}
              </div>
              <div className={`absolute left-5 top-1/2 -translate-y-1/2 min-w-[240px] transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-40"}`}>
                <div className="text-[11px] tracking-[0.35em] uppercase text-[#F47245]">{String(i + 1).padStart(2, "0")} · {n.label}</div>
                <div className="font-serif text-xl italic mt-1">{n.title}</div>
                <div className="text-[13px] text-canvas/50 mt-0.5">{n.meta}</div>
              </div>
            </div>
          );
        })}

        {/* corner meta */}
        <div className="absolute top-4 left-4 text-[10px] tracking-[0.3em] uppercase text-canvas/40">Composition · VCE.0614</div>
        <div className="absolute bottom-4 right-4 text-[10px] tracking-[0.3em] uppercase text-canvas/40">Sealed · 00:00:04</div>
      </div>

      <div className="mt-16 px-6 md:px-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="font-serif text-2xl italic text-canvas/70 max-w-[36ch]">
          "One instrument replaced eleven partners, four spreadsheets, two agencies."
        </div>
        <button
          onClick={() => navigate("/compose")}
          className="text-[11px] tracking-[0.35em] uppercase border border-accent text-accent px-8 py-4 hover:bg-accent hover:text-ink transition-colors cursor-pointer"
        >
          Begin your composition →
        </button>
      </div>
    </section>
  );
}
