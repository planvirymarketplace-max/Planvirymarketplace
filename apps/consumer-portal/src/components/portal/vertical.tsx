import { cn } from "@/lib/utils";
import { VERTICAL_META, type Vertical } from "@/lib/constants";

const ICONS: Record<string, string> = {
  // Keys are the canonical lowercase vertical IDs (aligned with vendor portal).
  lodging: "M3 21h18M5 21V7l7-4 7 4v14M9 9h.01M9 13h.01M9 17h.01M15 9h.01M15 13h.01M15 17h.01",
  tickets: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7M3 7l2-4h14l2 4M3 7h18M12 11v4",
  venue: "M2 22h20M4 22V8l8-5 8 5v14M9 22v-6h6v6M9 12h.01M15 12h.01",
  services: "M12 2l2.4 7.4H22l-6 4.5 2.3 7.1L12 16.7 5.7 21l2.3-7.1-6-4.5h7.6z",
  dining: "M3 2v7a3 3 0 0 0 3 3v10M6 2v6M9 2v6M16 2c-2 0-3 2-3 5s1 4 3 4v9",
  transport: "M5 17h14M5 17a2 2 0 1 1-4 0M5 17V9l2-4h10l2 4v8M19 17a2 2 0 1 0 4 0M7 9h10",
};

export function VerticalIcon({
  vertical,
  className,
}: {
  vertical: Vertical;
  className?: string;
}) {
  const v = (vertical as string) in ICONS ? (vertical as string) : "services";
  const path = ICONS[v] ?? ICONS.services;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("size-4", className)}
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  );
}

export function VerticalBar({
  vertical,
  className,
}: {
  vertical: Vertical;
  className?: string;
}) {
  const meta = VERTICAL_META[vertical];
  return (
    <span
      className={cn("block w-1 shrink-0 self-stretch rounded-full", className)}
      style={{ backgroundColor: meta.color }}
      aria-hidden="true"
    />
  );
}

export function VerticalBadge({
  vertical,
  className,
  withIcon = true,
}: {
  vertical: Vertical;
  className?: string;
  withIcon?: boolean;
}) {
  const meta = VERTICAL_META[vertical];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-[4px] px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide",
        className
      )}
      style={{ backgroundColor: `${meta.color}14`, color: meta.color }}
    >
      {withIcon && <VerticalIcon vertical={vertical} className="size-3" />}
      {meta.label}
    </span>
  );
}
