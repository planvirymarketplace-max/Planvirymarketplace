import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import {
  ArrowLeft,
  CalendarDays,
  CalendarPlus,
  MapPin,
  Plus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/portal/status-badge";
import { EmptyState } from "@/components/portal/empty-state";
import { formatDate, type Vertical } from "@/lib/constants";

import {
  AddItemDialog,
  CollaboratorsRow,
  ExportMenu,
  ShareDialog,
  TimelineBlock,
  type Collaborator,
  type TimelineItem,
} from "./_components";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Itinerary — Planviry",
};

/** Parse "HH:mm" into minutes since midnight. Returns null on bad input. */
function toMinutes(t: string | null): number | null {
  if (!t) return null;
  const m = /^(\d{1,2}):(\d{2})$/.exec(t.trim());
  if (!m) return null;
  const h = Number(m[1]);
  const min = Number(m[2]);
  if (h > 23 || min > 59) return null;
  return h * 60 + min;
}

type ItemWithTimes = {
  id: string;
  day: number;
  startTime: string;
  endTime: string | null;
};

/**
 * Compute the set of item ids that have at least one overlapping sibling on
 * the same day. Overlap rule: start1 < end2 && start2 < end1 (strict).
 */
function computeConflicts(items: ItemWithTimes[]): Set<string> {
  const conflicts = new Set<string>();
  const byDay = new Map<number, ItemWithTimes[]>();
  for (const it of items) {
    if (!byDay.has(it.day)) byDay.set(it.day, []);
    byDay.get(it.day)!.push(it);
  }
  for (const dayItems of byDay.values()) {
    const ranged = dayItems
      .map((it) => ({
        id: it.id,
        s: toMinutes(it.startTime),
        e: toMinutes(it.endTime),
      }))
      .filter(
        (x): x is { id: string; s: number; e: number } =>
          x.s !== null && x.e !== null,
      );
    for (let i = 0; i < ranged.length; i++) {
      for (let j = i + 1; j < ranged.length; j++) {
        const a = ranged[i];
        const b = ranged[j];
        if (a.s < b.e && b.s < a.e) {
          conflicts.add(a.id);
          conflicts.add(b.id);
        }
      }
    }
  }
  return conflicts;
}

export default async function ItineraryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const itinerary = await db.itinerary.findUnique({
    where: { id },
    include: {
      collaborators: true,
      items: { orderBy: { day: "asc" } },
      reservations: true,
    },
  });

  if (!itinerary) notFound();

  // Group items by day (ordered). Items are already ordered by day asc.
  const dayMap = new Map<number, typeof itinerary.items>();
  for (const item of itinerary.items) {
    if (!dayMap.has(item.day)) dayMap.set(item.day, []);
    dayMap.get(item.day)!.push(item);
  }
  const days = Array.from(dayMap.keys()).sort((a, b) => a - b);

  // Conflict detection across all items.
  const conflictIds = computeConflicts(
    itinerary.items.map((i) => ({
      id: i.id,
      day: i.day,
      startTime: i.startTime,
      endTime: i.endTime,
    })),
  );

  const collaborators: Collaborator[] = itinerary.collaborators.map((c) => ({
    id: c.id,
    name: c.name,
    email: c.email,
    role: c.role,
    avatar: c.avatar,
  }));

  return (
    <div className="space-y-6">
      {/* Back link */}
      <div>
        <Button asChild variant="ghost" size="sm" className="text-muted-foreground">
          <Link href="/itineraries">
            <ArrowLeft className="size-4" />
            All itineraries
          </Link>
        </Button>
      </div>

      {/* Cover banner */}
      <div className="relative h-44 overflow-hidden rounded-2xl sm:h-48">
        {itinerary.coverImage ? (
          <img
            src={itinerary.coverImage}
            alt={itinerary.title}
            className="size-full object-cover"
          />
        ) : (
          <div className="size-full bg-gradient-to-br from-navy to-teal/60" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-teal/90 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-white">
              {itinerary.occasionType}
            </span>
            <StatusBadge status={itinerary.status} />
          </div>
          <h1 className="mt-2 font-display text-2xl font-700 tracking-tight text-white sm:text-3xl">
            {itinerary.title}
          </h1>
          <div className="mt-1.5 flex flex-wrap items-center gap-4 text-sm text-white/85">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-3.5" />
              {itinerary.city}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="size-3.5" />
              {formatDate(itinerary.startDate)} — {formatDate(itinerary.endDate)}
            </span>
          </div>
        </div>
      </div>

      {/* Action buttons + collaborators */}
      <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
        <CollaboratorsRow
          collaborators={collaborators}
          itineraryId={itinerary.id}
        />
        <div className="flex flex-wrap items-center gap-2">
          <Button asChild size="sm" className="bg-teal text-white hover:bg-teal/90">
            <Link href={`/saved?city=${encodeURIComponent(itinerary.city)}`}>
              <Plus className="size-4" />
              Add to this trip
            </Link>
          </Button>
          <ShareDialog
            itineraryId={itinerary.id}
            initialAllowEdit={itinerary.allowEdit}
          />
          <ExportMenu />
        </div>
      </div>

      {/* Timeline */}
      {itinerary.items.length === 0 ? (
        <EmptyState
          icon={CalendarPlus}
          title="No items yet"
          description="Add reservations, activities, and travel blocks to build your day-by-day timeline."
          action={
            <Button asChild className="bg-teal text-white hover:bg-teal/90">
              <Link href={`/saved?city=${encodeURIComponent(itinerary.city)}`}>
                <Plus className="size-4" />
                Add to this trip
              </Link>
            </Button>
          }
        />
      ) : (
        <div className="space-y-8">
          {days.map((day) => {
            const dayItems = dayMap.get(day)!;
            // Date label comes from the first item's date field if available.
            const dayDate =
              dayItems.find((i) => i.date)?.date ??
              itinerary.startDate;

            return (
              <section key={day} className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-2">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-lg font-700 text-navy">
                      Day {day}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {formatDate(dayDate, {
                        weekday: "long",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <AddItemDialog
                    itineraryId={itinerary.id}
                    day={day}
                    date={dayDate}
                    triggerVariant="ghost"
                  />
                </div>

                <div className="space-y-2.5">
                  {dayItems.map((item) => (
                    <TimelineBlock
                      key={item.id}
                      itineraryId={itinerary.id}
                      hasConflict={conflictIds.has(item.id)}
                      item={{
                        id: item.id,
                        startTime: item.startTime,
                        endTime: item.endTime,
                        title: item.title,
                        vertical: item.vertical as Vertical,
                        location: item.location,
                        status: item.status,
                      }}
                    />
                  ))}
                </div>
              </section>
            );
          })}

          {/* Add another day block */}
          <div className="flex justify-center pt-2">
            <AddItemDialog
              itineraryId={itinerary.id}
              day={days.length + 1}
              date={itinerary.endDate}
              triggerVariant="teal"
            />
          </div>
        </div>
      )}
    </div>
  );
}
