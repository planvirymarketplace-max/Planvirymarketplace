import { db } from "@/lib/db";
import { json, ser } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

/**
 * GET /api/portal/intent
 *
 * Determines the user's role from behavioral signals (not a one-time choice):
 *  - guest signals: itineraries, reservations, events, cart items
 *  - vendor signals: published listings, listing drafts, vendor onboarding
 *
 * Returns:
 *  - role: "guest" | "vendor" | "dual"  (the detected capability set)
 *  - activeRole: "guest" | "vendor"     (which view is currently shown)
 *  - vendorStatus: "none" | "pending" | "onboarded"
 *  - vendorSlug, vendorPortalUrl        (mono-repo bridge)
 *  - signals: { guest: number, vendor: number }  (raw scores)
 *  - vendorSummary: compact metrics for the inline vendor widget
 *  - plan: the current global Plan intent { what, where, when, whenEnd, price, attendees }
 *
 * The RoleSwitcher in the header uses `role` to decide whether to render
 * (it only shows when role === "dual"). Toggling it PATCHes activeRole on the
 * guest record via /api/guest.
 */
export async function GET() {
  const guest = await db.guest.findFirst();

  // Guest signals
  const [itineraries, reservations, events, cartItems] = await Promise.all([
    db.itinerary.count(),
    db.reservation.count(),
    db.event.count(),
    db.cartItem.count(),
  ]);
  const guestSignals =
    (itineraries > 0 ? 1 : 0) +
    (reservations > 0 ? 1 : 0) +
    (events > 0 ? 1 : 0) +
    (cartItems > 0 ? 1 : 0) +
    (guest && guest.location ? 1 : 0);

  // Vendor signals — mirror the Vendor Suite (vendor portal) data shape.
  // The vendor portal's Listing model uses status: active|paused|draft and
  // tracks bookingsCount + rating + capacity. We map our ListingDraft +
  // Reservation ledger into the same shape so the guest portal's inline
  // VendorSummary widget shows the same numbers the vendor portal dashboard
  // would show for this vendor.
  const [activeListings, draftListings, vendorBookings, vendorRevenue] =
    await Promise.all([
      db.listingDraft.count({ where: { status: "active" } }),
      db.listingDraft.count({ where: { status: "draft" } }),
      db.reservation.count({
        where: { status: { in: ["Confirmed", "Completed"] } },
      }),
      db.reservation.aggregate({
        _sum: { total: true },
        where: {
          status: { in: ["Confirmed", "Completed"] },
        },
      }),
    ]);
  const vendorOnboarded = guest?.vendorStatus === "onboarded";
  const vendorSignals =
    (activeListings > 0 ? 2 : 0) +
    (draftListings > 0 ? 1 : 0) +
    (vendorOnboarded ? 1 : 0);

  // Determine capability role (what the user CAN do)
  const hasGuest = guestSignals > 0 || !vendorOnboarded; // everyone is at least a guest
  const hasVendor = vendorSignals > 0;
  let role: "guest" | "vendor" | "dual" = "guest";
  if (hasGuest && hasVendor) role = "dual";
  else if (hasVendor && !hasGuest) role = "vendor";

  // Active role: what's currently shown. Persisted on guest.activeRole; falls
  // back to "guest" for safety (the guest portal is the default surface).
  const activeRole: "guest" | "vendor" =
    guest?.activeRole === "vendor" && hasVendor ? "vendor" : "guest";

  // Vendor summary — aligns with the Vendor Suite dashboard KPIs so a
  // dual-role user sees consistent metrics whether they glance at the inline
  // widget here or open the full vendor portal.
  const totalListings = activeListings + draftListings;
  const vendorSummary = {
    activeListings,
    draftListings,
    pausedListings: 0, // the vendor portal supports a "paused" status; not yet modeled here
    totalListings,
    bookings: vendorBookings,
    revenue: vendorRevenue._sum.total ?? 0,
    vendorOnboarded,
    slug: guest?.vendorSlug ?? null,
    // Bridge to the Vendor Suite (separate app in the mono-repo). In production
    // set this to the vendor portal's base URL (e.g. https://vendor.planviry.app).
    // Shared Supabase Auth session carries the identity across.
    portalUrl: guest?.vendorSlug
      ? `/vendor/${guest.vendorSlug}`
      : "/create-listing",
    // Modules available in the vendor portal (for the inline module launcher)
    modules: [
      "dashboard",
      "inbox",
      "calendar",
      "listings",
      "bookings",
      "guests",
      "promote",
      "payouts",
      "analytics",
      "tickets",
      "team",
      "settings",
    ] as const,
  };

  const plan = guest
    ? {
        what: guest.planWhat ?? null,
        where: guest.planWhere ?? null,
        when: guest.planWhen ?? null,
        whenEnd: guest.planWhenEnd ?? null,
        price: guest.planPrice ?? null,
        attendees: guest.planAttendees ?? null,
      }
    : null;

  return json(
    ser({
      role,
      activeRole,
      vendorStatus: guest?.vendorStatus ?? "none",
      vendorSlug: guest?.vendorSlug ?? null,
      signals: { guest: guestSignals, vendor: vendorSignals },
      vendorSummary,
      plan,
    })
  );
}
