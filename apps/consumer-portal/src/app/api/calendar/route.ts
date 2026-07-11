import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { json, ser } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

// GET /api/calendar?month=YYYY-MM → unified calendar of reservations,
// itinerary items, and events for the given month.
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const month = searchParams.get("month"); // YYYY-MM
  let start: Date;
  let end: Date;
  if (month && /^\d{4}-\d{2}$/.test(month)) {
    const [y, m] = month.split("-").map(Number);
    start = new Date(y, m - 1, 1);
    end = new Date(y, m, 0, 23, 59, 59);
  } else {
    start = new Date();
    start.setDate(1);
    end = new Date(start.getFullYear(), start.getMonth() + 1, 0, 23, 59, 59);
  }
  const startStr = start.toISOString().slice(0, 10);
  const endStr = end.toISOString().slice(0, 10);

  const [reservations, itineraryItems, events] = await Promise.all([
    db.reservation.findMany(),
    db.itineraryItem.findMany({ include: { itinerary: { select: { title: true, city: true } } } }),
    db.event.findMany(),
  ]);

  type CalItem = {
    id: string;
    date: string;
    endDate?: string | null;
    time?: string | null;
    title: string;
    type: "reservation" | "itinerary" | "event";
    vertical?: string;
    location?: string | null;
    status?: string;
    href: string;
  };

  const items: CalItem[] = [];
  for (const r of reservations) {
    if (r.startDate >= startStr && r.startDate <= endStr) {
      items.push({
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
    if (it.date >= startStr && it.date <= endStr) {
      items.push({
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
    if (e.date >= startStr && e.date <= endStr) {
      items.push({
        id: e.id,
        date: e.date,
        endDate: e.endDate,
        time: e.time,
        title: e.title,
        type: "event",
        location: e.venue ?? e.location,
        status: e.status,
        href: `/create-event`,
      });
    }
  }
  items.sort((a, b) => a.date.localeCompare(b.date));
  return json(ser({ month: startStr.slice(0, 7), items }));
}
