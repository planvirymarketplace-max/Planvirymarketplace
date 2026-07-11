import {
  LayoutDashboard,
  CalendarRange,
  ClipboardList,
  ShoppingCart,
  Heart,
  Inbox as InboxIcon,
  CreditCard,
  User,
  Bell,
  LifeBuoy,
  Sparkles,
  Award,
  Crown,
  CalendarPlus,
  CalendarDays,
  Compass,
  Store,
  type LucideIcon,
} from "lucide-react";

/**
 * Canonical vertical taxonomy — ALIGNED WITH THE VENDOR SUITE (vendor portal).
 * Source of truth: the vendor portal's `src/lib/verticals.ts`. IDs are lowercase
 * (`lodging | tickets | dining | transport | services | venue`) and shared across
 * both portals via the polymorphic InventoryItem.vertical discriminator.
 *
 * Color system: the vendor portal assigns each vertical a distinct hue
 * (indigo/violet/rose/amber/emerald/teal). We adopt the SAME hex values so a
 * listing shows the same color whether a guest sees it in /book or a vendor
 * sees it in their dashboard. Teal `#0d9488` remains the platform brand action
 * color (CTAs, active nav) — the multi-color verticals are informational.
 */
export type Vertical =
  | "lodging"
  | "tickets"
  | "dining"
  | "transport"
  | "services"
  | "venue";

export const VERTICALS: Vertical[] = [
  "lodging",
  "tickets",
  "dining",
  "transport",
  "services",
  "venue",
];

export const VERTICAL_META: Record<
  Vertical,
  { label: string; color: string; text: string; dot: string; bg: string; border: string; icon: string }
> = {
  // Colors mirror vendor portal lib/verticals.ts exactly.
  lodging: { label: "Lodging", color: "#6366f1", text: "#ffffff", dot: "bg-indigo-500", bg: "bg-indigo-50", border: "border-indigo-200", icon: "lodging" },
  tickets: { label: "Tickets", color: "#8b5cf6", text: "#ffffff", dot: "bg-violet-500", bg: "bg-violet-50", border: "border-violet-200", icon: "tickets" },
  dining: { label: "Dining", color: "#f43f5e", text: "#ffffff", dot: "bg-rose-500", bg: "bg-rose-50", border: "border-rose-200", icon: "dining" },
  transport: { label: "Transport", color: "#f59e0b", text: "#ffffff", dot: "bg-amber-500", bg: "bg-amber-50", border: "border-amber-200", icon: "transport" },
  services: { label: "Services", color: "#10b981", text: "#ffffff", dot: "bg-emerald-500", bg: "bg-emerald-50", border: "border-emerald-200", icon: "services" },
  venue: { label: "Venue", color: "#14b8a6", text: "#ffffff", dot: "bg-teal-500", bg: "bg-teal-50", border: "border-teal-200", icon: "venue" },
};

/** Map a legacy PascalCase vertical (old guest-portal seed) → canonical lowercase. */
export function canonicalVertical(v: string): Vertical {
  const map: Record<string, Vertical> = {
    Property: "lodging",
    property: "lodging",
    lodging: "lodging",
    Tickets: "tickets",
    tickets: "tickets",
    Venue: "venue",
    venue: "venue",
    Service: "services",
    service: "services",
    services: "services",
    Dining: "dining",
    dining: "dining",
    Transport: "transport",
    transport: "transport",
  };
  return map[v] ?? "services";
}

/** Shared listing status enum — union of guest + vendor lifecycles. */
export type ListingStatus = "active" | "paused" | "draft" | "archived";

export const LISTING_STATUS_META: Record<
  ListingStatus,
  { label: string; className: string }
> = {
  active: { label: "Active", className: "bg-emerald-100 text-emerald-700" },
  paused: { label: "Paused", className: "bg-amber-100 text-amber-700" },
  draft: { label: "Draft", className: "bg-slate-100 text-slate-600" },
  archived: { label: "Archived", className: "bg-slate-100 text-slate-500" },
};

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export type NavSection = {
  label: string;
  items: NavItem[];
};

export const NAV_SECTIONS: NavSection[] = [
  {
    label: "Plan",
    items: [
      { href: "/", label: "Dashboard", icon: LayoutDashboard },
      { href: "/itineraries", label: "Itineraries", icon: CalendarRange },
      { href: "/create-event", label: "Create Event", icon: CalendarPlus },
      { href: "/calendar", label: "Calendar", icon: CalendarDays },
      { href: "/book", label: "Book", icon: Compass },
    ],
  },
  {
    label: "Manage",
    items: [
      { href: "/reservations", label: "Reservations", icon: ClipboardList },
      { href: "/cart", label: "Cart", icon: ShoppingCart },
      { href: "/saved", label: "Saved", icon: Heart },
      { href: "/inbox", label: "Inbox", icon: InboxIcon },
    ],
  },
  {
    label: "Account",
    items: [
      { href: "/loyalty", label: "Loyalty", icon: Award },
      { href: "/membership", label: "Membership", icon: Crown },
      { href: "/payments", label: "Payments", icon: CreditCard },
      { href: "/notifications", label: "Notifications", icon: Bell },
      { href: "/support", label: "Support", icon: LifeBuoy },
    ],
  },
];

// Flat list kept for backward compatibility / badge lookup
export const NAV_ITEMS: NavItem[] = NAV_SECTIONS.flatMap((s) => s.items);

export const ACCOUNT_ITEMS: NavItem[] = [
  { href: "/profile", label: "Profile", icon: User },
];

export const CREATE_LISTING_HREF = "/create-listing";

export const OCCASION_TYPES = [
  "Birthday",
  "Wedding",
  "Corporate",
  "Trip",
  "Just browsing",
] as const;

export const DIETARY_OPTIONS = [
  "Vegetarian",
  "Vegan",
  "Gluten-free",
  "Dairy-free",
  "Halal",
  "Kosher",
  "None",
];

export const ACCESSIBILITY_OPTIONS = [
  "Wheelchair access",
  "Service animal",
  "Hearing impaired",
  "Visual impaired",
  "None",
];

export const CANNED_QUESTIONS = [
  "What's your cancellation policy?",
  "Can I arrive early?",
  "Is parking available?",
  "Do you accommodate dietary restrictions?",
  "What time is check-in?",
];

export const CANCEL_REASONS = [
  "Change of plans",
  "Schedule conflict",
  "Found alternative",
  "Other",
];

export const TICKET_CATEGORIES = [
  "Booking issue",
  "Payment issue",
  "Listing issue",
  "Account issue",
  "Other",
];

export const NOTIFICATION_TYPES = [
  "booking",
  "message",
  "cancellation",
  "promotion",
  "review",
] as const;

export const PROMO_CODES: Record<string, number> = {
  WELCOME10: 0.1,
  CONCIERGE15: 0.15,
  TRIP20: 0.2,
};

export const SERVICE_FEE_RATE = 0.05;
export const TAX_RATE = 0.0825;

export function formatCurrency(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(n || 0);
}

export function formatDate(d: string | Date, opts?: Intl.DateTimeFormatOptions): string {
  const date = typeof d === "string" ? new Date(d) : d;
  if (isNaN(date.getTime())) return String(d);
  return date.toLocaleDateString("en-US", opts ?? { month: "short", day: "numeric", year: "numeric" });
}

export function formatTime(d: string | Date): string {
  const date = typeof d === "string" ? new Date(d) : d;
  if (isNaN(date.getTime())) return String(d);
  return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

export function relativeTime(d: string | Date): string {
  const date = typeof d === "string" ? new Date(d) : d;
  if (isNaN(date.getTime())) return String(d);
  const diff = Date.now() - date.getTime();
  const sec = Math.floor(diff / 1000);
  if (sec < 60) return "just now";
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const day = Math.floor(hr / 24);
  if (day < 7) return `${day}d ago`;
  return formatDate(date);
}

export const STATUS_LABEL: Record<string, string> = {
  Planning: "Planning",
  Confirmed: "Confirmed",
  Active: "Active",
  Completed: "Completed",
  Complete: "Complete",
  Cancelled: "Cancelled",
  Pending: "Pending",
  Draft: "Draft",
  Paid: "Paid",
  Refunded: "Refunded",
  Failed: "Failed",
  Open: "Open",
  InProgress: "In Progress",
  Resolved: "Resolved",
  Closed: "Closed",
};

export { Sparkles };
