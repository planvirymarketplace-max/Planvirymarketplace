"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";

import { cn } from "@/lib/utils";
import { TYPE_STYLE, type CalItem } from "../_lib";

export type { CalItem };

function Pill({ item, compact }: { item: CalItem; compact?: boolean }) {
  const style = TYPE_STYLE[item.type];
  return (
    <Link
      href={item.href}
      title={`${item.title} · ${style.label}${item.time ? ` · ${item.time}` : ""}`}
      className={cn(
        "group flex items-center gap-1.5 rounded-md border px-1.5 py-0.5 text-[11px] font-medium leading-tight transition-colors",
        style.pill,
        compact && "truncate"
      )}
    >
      <span className={cn("size-1.5 shrink-0 rounded-full", style.dot)} />
      <span className="truncate">{item.title}</span>
      {item.time && !compact && (
        <span className="ml-auto shrink-0 text-[10px] opacity-70">
          {item.time}
        </span>
      )}
    </Link>
  );
}

const MAX_VISIBLE = 3;

/** Desktop 7-column grid. */
export function CalendarGrid({
  month,
  year,
  items,
  todayISO,
}: {
  month: number; // 1-based
  year: number;
  items: CalItem[];
  todayISO: string; // YYYY-MM-DD
}) {
  // Track which days are expanded (show all items beyond MAX_VISIBLE).
  const [expanded, setExpanded] = React.useState<Set<number>>(new Set());

  const firstWeekday = new Date(year, month - 1, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(year, month, 0).getDate();

  // Group items by day-of-month.
  const byDay = React.useMemo(() => {
    const map = new Map<number, CalItem[]>();
    for (const item of items) {
      // item.date is YYYY-MM-DD; extract day
      const dayMatch = item.date.match(/^\d{4}-\d{2}-(\d{2})$/);
      if (!dayMatch) continue;
      const day = parseInt(dayMatch[1], 10);
      if (day < 1 || day > daysInMonth) continue;
      if (!map.has(day)) map.set(day, []);
      map.get(day)!.push(item);
    }
    // Sort items within a day by time then title
    for (const list of map.values()) {
      list.sort((a, b) => {
        const ta = a.time ?? "";
        const tb = b.time ?? "";
        if (ta !== tb) return ta.localeCompare(tb);
        return a.title.localeCompare(b.title);
      });
    }
    return map;
  }, [items, daysInMonth]);

  function toggleDay(day: number) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(day)) next.delete(day);
      else next.add(day);
      return next;
    });
  }

  const weekdayCells: React.ReactNode[] = [];
  for (let i = 0; i < firstWeekday; i++) {
    weekdayCells.push(
      <div
        key={`lead-${i}`}
        className="min-h-[92px] rounded-lg border border-dashed border-border/60 bg-muted/20"
        aria-hidden="true"
      />
    );
  }

  const dayCells: React.ReactNode[] = [];
  for (let day = 1; day <= daysInMonth; day++) {
    const dayStr = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const isToday = dayStr === todayISO;
    const dayItems = byDay.get(day) ?? [];
    const isExpanded = expanded.has(day);
    const visible = isExpanded ? dayItems : dayItems.slice(0, MAX_VISIBLE);
    const hiddenCount = dayItems.length - visible.length;

    dayCells.push(
      <div
        key={day}
        className={cn(
          "min-h-[92px] rounded-lg border bg-card p-1.5 transition-colors",
          isToday
            ? "border-teal/40 ring-1 ring-teal/20"
            : "border-border hover:border-border/80",
          dayItems.length > 0 && "focus-within:border-teal/40"
        )}
        tabIndex={dayItems.length > 0 ? 0 : undefined}
        aria-label={
          dayItems.length > 0
            ? `${dayStr}, ${dayItems.length} item${dayItems.length === 1 ? "" : "s"}`
            : dayStr
        }
      >
        <div className="mb-1 flex items-center justify-between">
          <span
            className={cn(
              "inline-flex size-6 items-center justify-center rounded-full text-xs font-600",
              isToday ? "bg-teal text-white" : "text-muted-foreground"
            )}
          >
            {day}
          </span>
          {dayItems.length > 0 && (
            <span className="text-[10px] font-medium text-muted-foreground">
              {dayItems.length}
            </span>
          )}
        </div>
        <div className="space-y-1">
          {visible.map((item) => (
            <Pill key={`${item.type}-${item.id}`} item={item} />
          ))}
          {hiddenCount > 0 && (
            <button
              type="button"
              onClick={() => toggleDay(day)}
              className="flex w-full items-center justify-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label={isExpanded ? "Show fewer" : `Show ${hiddenCount} more`}
              aria-expanded={isExpanded}
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="size-3" />
                  Less
                </>
              ) : (
                <>
                  <ChevronDown className="size-3" />+{hiddenCount} more
                </>
              )}
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-7 gap-1.5"
      role="grid"
      aria-label={`Calendar for ${month}/${year}`}
    >
      {weekdayCells}
      {dayCells}
    </div>
  );
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function CalendarWeekdayHeader() {
  return (
    <div className="mb-2 grid grid-cols-7 gap-1.5" aria-hidden="true">
      {WEEKDAYS.map((d) => (
        <div
          key={d}
          className="py-1 text-center text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground"
        >
          {d}
        </div>
      ))}
    </div>
  );
}

/** Mobile day-list view (sm:hidden). */
export function CalendarDayList({
  month,
  year,
  items,
  todayISO,
}: {
  month: number; // 1-based
  year: number;
  items: CalItem[];
  todayISO: string;
}) {
  const daysInMonth = new Date(year, month, 0).getDate();

  const byDay = React.useMemo(() => {
    const map = new Map<number, CalItem[]>();
    for (const item of items) {
      const dayMatch = item.date.match(/^\d{4}-\d{2}-(\d{2})$/);
      if (!dayMatch) continue;
      const day = parseInt(dayMatch[1], 10);
      if (day < 1 || day > daysInMonth) continue;
      if (!map.has(day)) map.set(day, []);
      map.get(day)!.push(item);
    }
    for (const list of map.values()) {
      list.sort((a, b) => {
        const ta = a.time ?? "";
        const tb = b.time ?? "";
        if (ta !== tb) return ta.localeCompare(tb);
        return a.title.localeCompare(b.title);
      });
    }
    return map;
  }, [items, daysInMonth]);

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="space-y-2">
      {days.map((day) => {
        const dayStr = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        const isToday = dayStr === todayISO;
        const dayItems = byDay.get(day) ?? [];
        if (dayItems.length === 0) return null;
        return (
          <div
            key={day}
            className={cn(
              "rounded-lg border bg-card p-3",
              isToday ? "border-teal/40 ring-1 ring-teal/20" : "border-border"
            )}
          >
            <div className="mb-2 flex items-center gap-2">
              <span
                className={cn(
                  "inline-flex size-7 items-center justify-center rounded-full text-xs font-600",
                  isToday ? "bg-teal text-white" : "bg-muted text-muted-foreground"
                )}
              >
                {day}
              </span>
              <span className="text-xs font-medium text-muted-foreground">
                {new Date(year, month - 1, day).toLocaleDateString("en-US", {
                  weekday: "long",
                })}
              </span>
            </div>
            <div className="space-y-1.5">
              {dayItems.map((item) => (
                <Pill key={`${item.type}-${item.id}`} item={item} />
              ))}
            </div>
          </div>
        );
      })}
      {items.length === 0 && (
        <p className="rounded-lg border border-dashed border-border bg-card px-4 py-8 text-center text-sm text-muted-foreground">
          Nothing scheduled this month.
        </p>
      )}
    </div>
  );
}
