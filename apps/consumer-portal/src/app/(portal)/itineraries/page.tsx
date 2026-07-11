import Link from "next/link";
import { db } from "@/lib/db";
import {
  CalendarRange,
  ClipboardList,
  MapPin,
  Plus,
  Users,
  CalendarDays,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/portal/page-header";
import { StatusBadge } from "@/components/portal/status-badge";
import { EmptyState } from "@/components/portal/empty-state";
import { formatDate } from "@/lib/constants";

import { InlineEditTitle } from "./_components/inline-edit-title";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Itineraries — Planviry",
};

export default async function ItinerariesPage() {
  const itineraries = await db.itinerary.findMany({
    include: {
      collaborators: true,
      items: true,
      reservations: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Itineraries"
        description="Your trips and occasions"
        actions={
          <Button asChild className="bg-teal text-white hover:bg-teal/90">
            <Link href="/onboarding">
              <Plus className="size-4" />
              New Itinerary
            </Link>
          </Button>
        }
      />

      {itineraries.length === 0 ? (
        <EmptyState
          icon={CalendarRange}
          title="No itineraries yet"
          description="Plan your first occasion — trips, galas, birthdays, and more. We'll help you build a beautiful timeline."
          action={
            <Button asChild className="bg-teal text-white hover:bg-teal/90">
              <Link href="/onboarding">
                <Plus className="size-4" />
                Plan your first occasion
              </Link>
            </Button>
          }
        />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {itineraries.map((itin) => {
            const reservationCount = itin.reservations.length;
            const collaboratorCount = itin.collaborators.length;
            const itemCount = itin.items.length;

            return (
              <Card
                key={itin.id}
                className="group overflow-hidden p-0 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                {/* Cover image */}
                <Link
                  href={`/itineraries/${itin.id}`}
                  className="relative block h-40 overflow-hidden"
                >
                  {itin.coverImage ? (
                    <img
                      src={itin.coverImage}
                      alt={itin.title}
                      className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="size-full bg-gradient-to-br from-navy/80 to-teal/40" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/20 to-transparent" />

                  <div className="absolute left-3 top-3">
                    <StatusBadge status={itin.status} />
                  </div>

                  <div className="absolute bottom-3 left-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-semibold text-navy backdrop-blur">
                      <MapPin className="size-3 text-teal" />
                      {itin.city}
                    </span>
                  </div>
                </Link>

                {/* Body */}
                <div className="space-y-3 p-4">
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-teal/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-teal">
                      {itin.occasionType}
                    </span>
                    <StatusBadge status={itin.status} />
                  </div>

                  {/* Inline-editable title (client component) */}
                  <InlineEditTitle
                    itineraryId={itin.id}
                    initialTitle={itin.title}
                  />

                  {/* Dates */}
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <CalendarDays className="size-3.5 text-teal" />
                    <span>
                      {formatDate(itin.startDate)} — {formatDate(itin.endDate)}
                    </span>
                  </div>

                  {/* Stats row */}
                  <div className="flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <ClipboardList className="size-3.5 text-teal" />
                      <span className="font-semibold text-navy">
                        {reservationCount}
                      </span>
                      reservations
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Users className="size-3.5 text-teal" />
                      <span className="font-semibold text-navy">
                        {collaboratorCount}
                      </span>
                      guests
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarRange className="size-3.5 text-teal" />
                      <span className="font-semibold text-navy">{itemCount}</span>
                      items
                    </span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
