import { db } from "@/lib/db";
import { CalendarPlus } from "lucide-react";

import { PageHeader } from "@/components/portal/page-header";
import { EmptyState } from "@/components/portal/empty-state";
import { NewEventDialog } from "./_components/new-event-dialog";
import { EventCard, type EventItem } from "./_components/event-card";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Create an Event — Planviry",
};

export default async function CreateEventPage() {
  const events = await db.event.findMany({ orderBy: { date: "asc" } });

  // Serialize for client components (Prisma returns Date-ish / nullable fields)
  const serialized: EventItem[] = events.map((e) => ({
    id: e.id,
    title: e.title,
    type: e.type,
    description: e.description,
    date: e.date,
    endDate: e.endDate,
    time: e.time,
    location: e.location,
    venue: e.venue,
    capacity: e.capacity,
    budget: e.budget,
    status: e.status,
    coverImage: e.coverImage,
    services: e.services,
    itineraryId: e.itineraryId,
  }));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Create an Event"
        description="Turn an occasion into a plan"
        icon={CalendarPlus}
        actions={<NewEventDialog />}
      />

      {serialized.length === 0 ? (
        <EmptyState
          icon={CalendarPlus}
          title="No events yet"
          description="Create your first event — a birthday, wedding, offsite, or trip — and we'll help you pull the details together."
          action={<NewEventDialog />}
        />
      ) : (
        <>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {serialized.length} event{serialized.length === 1 ? "" : "s"}
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {serialized.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
