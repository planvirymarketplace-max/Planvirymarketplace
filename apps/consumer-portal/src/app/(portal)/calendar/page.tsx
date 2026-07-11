import Link from "next/link";
import { db } from "@/lib/db";
import {
  CalendarDays,
  ChevronRight,
  Clock,
  MapPin,
} from "lucide-react";

import { PageHeader } from "@/components/portal/page-header";
import { EmptyState } from "@/components/portal/empty-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MonthNav } from "./_components/month-nav";
import {
  CalendarGrid,
  CalendarWeekdayHeader,
  CalendarDayList,
} from "./_components/calendar-grid";
import { TYPE_STYLE, type CalItem } from "./_lib";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Calendar — Planviry",
};

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function toISODate(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function parseMonthOrDefault(monthParam?: string): {
  year: number;
  month: number; // 1-based
  startISO: string;
  endISO: string;
  monthISO: string; // YYYY-MM
} {
  const now = new Date();
  if (monthParam && /^\d{4}-\d{2}$/.test(monthParam)) {
    const [y, m] = monthParam.split("-").map(Number);
    const start = new Date(y, m - 1, 1);
    const end = new Date(y, m, 0);
    return {
      year: y,
      month: m,
      startISO: toISODate(start),
      endISO: toISODate(end),
      monthISO: monthParam,
    };
  }
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    startISO: toISODate(start),
    endISO: toISODate(end),
    monthISO: `${now.getFullYear()}-${pad(now.getMonth() + 1)}`,
  };
}

export default async function CalendarPage({
  searchParams,
}: {
  searchParams: Promise<{ month?: string }>;
}) {
  const sp = await searchParams;
  const { year, month, startISO, endISO, monthISO } = parseMonthOrDefault(
    sp.month
  );

  const today = new Date();
  const todayISO = toISODate(today);
  const in14 = toISODate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 14));

  const [reservations, itineraryItems, events] = await Promise.all([
    db.reservation.findMany(),
    db.itineraryItem.findMany({
      include: { itinerary: { select: { title: true, city: true } } },
    }),
    db.event.findMany(),
  ]);

  // Build month items (mirror /api/calendar logic)
  const monthItems: CalItem[] = [];
  for (const r of reservations) {
    if (r.startDate >= startISO && r.startDate <= endISO) {
      monthItems.push({
        id: r.id,
        date: r.startDate,
        endDate: r.endDate,
        title: r.listingTitle,
        type: "reservation",
        vertical: r.vertical,
        location: r.vendorName,
        status: r.status,
        href: `/reservations/${r.id}`,
      });
    }
  }
  for (const it of itineraryItems) {
    if (it.date >= startISO && it.date <= endISO) {
      monthItems.push({
        id: it.id,
        date: it.date,
        time: it.startTime,
        title: it.title,
        type: "itinerary",
        vertical: it.vertical,
        location: it.location ?? it.itinerary?.city ?? null,
        status: it.status,
        href: `/itineraries/${it.itineraryId}`,
      });
    }
  }
  for (const e of events) {
    if (e.date >= startISO && e.date <= endISO) {
      monthItems.push({
        id: e.id,
        date: e.date,
        endDate: e.endDate,
        time: e.time,
        title: e.title,
        type: "event",
        location: e.venue ?? e.location,
        status: e.status,
        href: e.itineraryId
          ? `/itineraries/${e.itineraryId}`
          : "/create-event",
      });
    }
  }
  monthItems.sort((a, b) => a.date.localeCompare(b.date));

  // Upcoming list — next 14 days, sorted chronologically
  const upcoming: CalItem[] = [];
  for (const r of reservations) {
    if (r.startDate >= todayISO && r.startDate <= in14) {
      upcoming.push({
        id: r.id,
        date: r.startDate,
        endDate: r.endDate,
        title: r.listingTitle,
        type: "reservation",
        vertical: r.vertical,
        location: r.vendorName,
        status: r.status,
        href: `/reservations/${r.id}`,
      });
    }
  }
  for (const it of itineraryItems) {
    if (it.date >= todayISO && it.date <= in14) {
      upcoming.push({
        id: it.id,
        date: it.date,
        time: it.startTime,
        title: it.title,
        type: "itinerary",
        vertical: it.vertical,
        location: it.location ?? it.itinerary?.city ?? null,
        status: it.status,
        href: `/itineraries/${it.itineraryId}`,
      });
    }
  }
  for (const e of events) {
    if (e.date >= todayISO && e.date <= in14) {
      upcoming.push({
        id: e.id,
        date: e.date,
        endDate: e.endDate,
        time: e.time,
        title: e.title,
        type: "event",
        location: e.venue ?? e.location,
        status: e.status,
        href: e.itineraryId ? `/itineraries/${e.itineraryId}` : "/create-event",
      });
    }
  }
  upcoming.sort((a, b) => {
    if (a.date !== b.date) return a.date.localeCompare(b.date);
    const ta = a.time ?? "";
    const tb = b.time ?? "";
    return ta.localeCompare(tb);
  });

  const monthLabel = new Date(year, month - 1, 1).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Calendar"
        description="All your reservations, events, and itinerary items in one view"
        icon={CalendarDays}
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Calendar column */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card p-3">
            <MonthNav
              month={monthISO}
              label={monthLabel}
              todayISO={`${today.getFullYear()}-${pad(today.getMonth() + 1)}`}
            />
            {/* Legend */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
              {(
                [
                  ["reservation", "Reservation"],
                  ["itinerary", "Itinerary"],
                  ["event", "Event"],
                ] as const
              ).map(([key, label]) => (
                <span
                  key={key}
                  className="inline-flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground"
                >
                  <span
                    className={`size-2 rounded-full ${TYPE_STYLE[key].dot}`}
                  />
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Desktop / tablet grid */}
          <div className="hidden sm:block">
            <CalendarWeekdayHeader />
            <CalendarGrid
              month={month}
              year={year}
              items={monthItems}
              todayISO={todayISO}
            />
          </div>

          {/* Mobile day-list */}
          <div className="sm:hidden">
            <CalendarDayList
              month={month}
              year={year}
              items={monthItems}
              todayISO={todayISO}
            />
          </div>

          {monthItems.length === 0 && (
            <p className="hidden text-center text-sm text-muted-foreground sm:block">
              Nothing scheduled this month.{" "}
              <Link
                href="/create-event"
                className="font-medium text-teal hover:underline"
              >
                Create an event
              </Link>{" "}
              or{" "}
              <Link
                href="/onboarding"
                className="font-medium text-teal hover:underline"
              >
                plan an occasion
              </Link>
              .
            </p>
          )}
        </div>

        {/* Upcoming sidebar */}
        <div className="lg:sticky lg:top-4 lg:self-start">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 font-display text-base font-600 text-navy">
                <Clock className="size-4 text-teal" />
                Next 14 Days
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              {upcoming.length === 0 ? (
                <EmptyState
                  icon={CalendarDays}
                  title="Nothing coming up"
                  description="Your next two weeks are clear."
                  className="border-0 bg-transparent py-8"
                />
              ) : (
                <ol className="max-h-[60vh] space-y-2 overflow-y-auto scroll-area-thin pr-1">
                  {upcoming.map((item) => {
                    const style = TYPE_STYLE[item.type];
                    const itemDate = new Date(item.date + "T00:00:00");
                    const dayNum = itemDate.getDate();
                    const dayMon = itemDate.toLocaleDateString("en-US", {
                      month: "short",
                    });
                    return (
                      <li key={`${item.type}-${item.id}`}>
                        <Link
                          href={item.href}
                          className="group flex items-start gap-3 rounded-lg border border-border bg-card p-2.5 transition-all hover:-translate-y-0.5 hover:border-teal/30 hover:shadow-sm"
                        >
                          <div className="flex size-10 shrink-0 flex-col items-center justify-center rounded-lg bg-muted/60 text-center">
                            <span className="text-[9px] font-semibold uppercase text-muted-foreground">
                              {dayMon}
                            </span>
                            <span className="text-base font-700 leading-none text-navy">
                              {dayNum}
                            </span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5">
                              <span
                                className={`size-1.5 rounded-full ${style.dot}`}
                              />
                              <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                                {style.label}
                              </span>
                              {item.time && (
                                <span className="text-[10px] text-muted-foreground">
                                  · {item.time}
                                </span>
                              )}
                            </div>
                            <p className="mt-0.5 line-clamp-1 text-sm font-600 text-navy">
                              {item.title}
                            </p>
                            {item.location && (
                              <p className="flex items-center gap-1 text-[11px] text-muted-foreground">
                                <MapPin className="size-3 shrink-0" />
                                <span className="truncate">{item.location}</span>
                              </p>
                            )}
                          </div>
                          <ChevronRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                        </Link>
                      </li>
                    );
                  })}
                </ol>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
