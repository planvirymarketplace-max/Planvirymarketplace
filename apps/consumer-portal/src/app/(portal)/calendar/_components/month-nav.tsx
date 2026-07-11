"use client";

import * as React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";

function shiftMonth(monthISO: string, delta: number): string {
  // monthISO = "YYYY-MM"
  const [y, m] = monthISO.split("-").map(Number);
  const d = new Date(y, m - 1 + delta, 1);
  const yy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${yy}-${mm}`;
}

export function MonthNav({
  month,
  label,
  todayISO,
}: {
  month: string;
  label: string;
  todayISO: string;
}) {
  const isCurrent = month === todayISO;
  const prev = shiftMonth(month, -1);
  const next = shiftMonth(month, 1);

  return (
    <div className="flex items-center gap-2">
      <Button
        asChild
        variant="outline"
        size="icon"
        aria-label="Previous month"
        className="size-9"
      >
        <Link href={`/calendar?month=${prev}`}>
          <ChevronLeft className="size-4" />
        </Link>
      </Button>
      <div
        className={cn(
          "min-w-[10rem] rounded-md border border-border bg-card px-3 py-1.5 text-center text-sm font-600 text-navy",
          isCurrent && "ring-1 ring-teal"
        )}
      >
        {label}
      </div>
      <Button
        asChild
        variant="outline"
        size="icon"
        aria-label="Next month"
        className="size-9"
      >
        <Link href={`/calendar?month=${next}`}>
          <ChevronRight className="size-4" />
        </Link>
      </Button>
      {!isCurrent && (
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="ml-1 text-teal hover:bg-teal/10 hover:text-teal"
        >
          <Link href="/calendar">
            <CalendarDays className="size-4" />
            Today
          </Link>
        </Button>
      )}
    </div>
  );
}
