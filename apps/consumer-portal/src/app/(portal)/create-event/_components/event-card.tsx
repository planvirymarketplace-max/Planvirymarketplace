"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  CalendarDays,
  Clock,
  MapPin,
  Users,
  Wallet,
  Trash2,
  ExternalLink,
  Loader2,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { StatusBadge } from "@/components/portal/status-badge";
import { formatDate, formatCurrency } from "@/lib/constants";
import { cn } from "@/lib/utils";

export type EventItem = {
  id: string;
  title: string;
  type: string;
  description: string | null;
  date: string;
  endDate: string | null;
  time: string | null;
  location: string;
  venue: string | null;
  capacity: number;
  budget: number;
  status: string;
  coverImage: string | null;
  services: string | null;
  itineraryId: string | null;
};

// Type badge colors — color by occasion type (NO indigo/blue).
const TYPE_COLORS: Record<string, string> = {
  Birthday: "bg-rose-500/10 text-rose-600",
  Wedding: "bg-pink-500/10 text-pink-600",
  Corporate: "bg-teal/10 text-teal",
  Trip: "bg-amber-500/10 text-amber-600",
  Other: "bg-slate-500/10 text-slate-600",
};

export function EventCard({ event }: { event: EventItem }) {
  const router = useRouter();
  const [deleting, setDeleting] = React.useState(false);
  const services = event.services
    ? event.services.split("|").filter(Boolean)
    : [];

  async function handleDelete() {
    setDeleting(true);
    try {
      const res = await fetch(`/api/events/${event.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete");
      toast.success("Event deleted.");
      router.refresh();
    } catch {
      toast.error("Could not delete event. Try again.");
    } finally {
      setDeleting(false);
    }
  }

  const typeClass =
    TYPE_COLORS[event.type] ?? "bg-slate-500/10 text-slate-600";

  return (
    <Card className="group flex flex-col overflow-hidden p-0 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
      {/* Cover */}
      <div className="relative h-36 overflow-hidden">
        {event.coverImage ? (
          <img
            src={event.coverImage}
            alt={event.title}
            className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="size-full bg-gradient-to-br from-navy/80 to-teal/40" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/15 to-transparent" />
        <div className="absolute left-3 top-3 flex items-center gap-1.5">
          <span
            className={cn(
              "rounded-md px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide",
              typeClass
            )}
          >
            {event.type}
          </span>
        </div>
        <div className="absolute right-3 top-3">
          <StatusBadge status={event.status} className="bg-white/90 backdrop-blur" />
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="line-clamp-2 font-display text-base font-600 leading-tight text-white">
            {event.title}
          </h3>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* Date + time */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="size-3.5 text-teal" />
            {formatDate(event.date, { month: "short", day: "numeric", year: "numeric" })}
            {event.endDate && (
              <>
                {" — "}
                {formatDate(event.endDate, { month: "short", day: "numeric" })}
              </>
            )}
          </span>
          {event.time && (
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-3.5 text-teal" />
              {event.time}
            </span>
          )}
        </div>

        {/* Location + venue */}
        {(event.venue || event.location) && (
          <div className="flex items-start gap-1.5 text-xs text-muted-foreground">
            <MapPin className="mt-0.5 size-3.5 shrink-0 text-teal" />
            <span className="line-clamp-1">
              {event.venue ? `${event.venue} · ` : ""}
              {event.location}
            </span>
          </div>
        )}

        {/* Capacity + budget */}
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-lg bg-muted/60 px-2.5 py-1.5">
            <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-muted-foreground">
              <Users className="size-3" />
              Capacity
            </div>
            <p className="mt-0.5 text-sm font-600 text-navy">
              {event.capacity > 0 ? `${event.capacity} guests` : "—"}
            </p>
          </div>
          <div className="rounded-lg bg-muted/60 px-2.5 py-1.5">
            <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-muted-foreground">
              <Wallet className="size-3" />
              Budget
            </div>
            <p className="mt-0.5 text-sm font-600 text-navy">
              {event.budget > 0 ? formatCurrency(event.budget) : "—"}
            </p>
          </div>
        </div>

        {/* Services */}
        {services.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {services.map((s) => (
              <span
                key={s}
                className="rounded-full border border-border bg-card px-2 py-0.5 text-[11px] font-medium text-foreground"
              >
                {s}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="mt-auto flex items-center justify-between gap-2 border-t border-border pt-3">
          {event.itineraryId ? (
            <Button
              asChild
              size="sm"
              variant="ghost"
              className="text-teal hover:bg-teal/10 hover:text-teal"
            >
              <Link href={`/itineraries/${event.itineraryId}`}>
                <ExternalLink className="size-3.5" />
                View itinerary
              </Link>
            </Button>
          ) : (
            <Button
              asChild
              size="sm"
              variant="ghost"
              className="text-muted-foreground hover:text-foreground"
            >
              <Link href="/calendar">
                <CalendarDays className="size-3.5" />
                View on calendar
              </Link>
            </Button>
          )}

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="size-8 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                aria-label={`Delete ${event.title}`}
              >
                <Trash2 className="size-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="font-display text-navy">
                  Delete &ldquo;{event.title}&rdquo;?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This permanently removes the event. Reservations and
                  itineraries are not affected.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  disabled={deleting}
                  className="bg-destructive text-white hover:bg-destructive/90"
                >
                  {deleting ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Deleting…
                    </>
                  ) : (
                    "Delete"
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </Card>
  );
}
