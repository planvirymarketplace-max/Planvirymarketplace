import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ALL_HITS, type SearchHit } from "@/data/destinations";

type Props = {
  placeholder?: string;
  size?: "lg" | "md";
};

export function DestinationSearch({ placeholder = "Search a city, country or continent…", size = "md" }: Props) {
  const [q, setQ] = useState("");
  const [debounced, setDebounced] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const wrap = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setDebounced(q.trim().toLowerCase()), 300);
    return () => clearTimeout(t);
  }, [q]);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const results = useMemo<SearchHit[]>(() => {
    if (!debounced) return [];
    const rank = { city: 0, country: 1, continent: 2 } as const;
    return ALL_HITS
      .filter((h) => h.label.toLowerCase().includes(debounced))
      .sort((a, b) => {
        const ai = a.label.toLowerCase().indexOf(debounced);
        const bi = b.label.toLowerCase().indexOf(debounced);
        if (ai !== bi) return ai - bi;
        return rank[a.kind] - rank[b.kind];
      })
      .slice(0, 8);
  }, [debounced]);

  const pick = (hit: SearchHit) => {
    setOpen(false);
    setQ("");
    navigate({ to: hit.href });
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (!open || results.length === 0) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((i) => (i + 1) % results.length); }
    if (e.key === "ArrowUp") { e.preventDefault(); setActive((i) => (i - 1 + results.length) % results.length); }
    if (e.key === "Enter") { e.preventDefault(); pick(results[active]); }
    if (e.key === "Escape") setOpen(false);
  };

  const inputCls =
    size === "lg"
      ? "w-full bg-transparent border-0 border-b-4 border-ink py-4 pr-4 text-2xl md:text-3xl font-display placeholder:text-muted-foreground/60 focus:outline-none"
      : "w-full bg-transparent border-0 border-b-2 border-ink py-2 pr-4 text-base placeholder:text-muted-foreground/70 focus:outline-none";

  return (
    <div ref={wrap} className="relative w-full">
      <input
        value={q}
        onChange={(e) => { setQ(e.target.value); setOpen(true); setActive(0); }}
        onFocus={() => q && setOpen(true)}
        onKeyDown={onKey}
        placeholder={placeholder}
        className={inputCls}
        aria-label="Search destinations"
      />
      {open && results.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-0 border-4 border-ink bg-paper">
          <ul>
            {results.map((h, i) => (
              <li key={h.href}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onClick={() => pick(h)}
                  className={`flex w-full items-baseline justify-between gap-4 border-b border-ink/20 px-4 py-3 text-left last:border-b-0 ${i === active ? "bg-paper-warm" : ""}`}
                >
                  <span className="flex items-baseline gap-3">
                    <span className="label-mono text-muted-foreground w-16">{h.kind}</span>
                    <span className="font-display text-lg">{h.label}</span>
                  </span>
                  <span className="text-sm text-muted-foreground">{h.sub}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
