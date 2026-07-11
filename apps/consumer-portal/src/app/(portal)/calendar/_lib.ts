// Shared (non-client) constants + types for the calendar page.
// Kept here so the server component can read TYPE_STYLE without crossing
// the "use client" boundary.

export type CalItem = {
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

// Brand color mapping — NO indigo/blue.
export const TYPE_STYLE: Record<
  CalItem["type"],
  { dot: string; pill: string; label: string }
> = {
  reservation: {
    dot: "bg-teal",
    pill: "bg-teal/10 text-teal hover:bg-teal/20 border-teal/20",
    label: "Reservation",
  },
  itinerary: {
    dot: "bg-navy",
    pill: "bg-navy/10 text-navy hover:bg-navy/20 border-navy/15",
    label: "Itinerary",
  },
  event: {
    dot: "bg-amber-500",
    pill:
      "bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 border-amber-500/25",
    label: "Event",
  },
};
