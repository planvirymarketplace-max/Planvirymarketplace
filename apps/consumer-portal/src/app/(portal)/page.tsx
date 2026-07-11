import Link from "next/link";
import { db } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/portal/status-badge";
import { VerticalBadge, VerticalIcon } from "@/components/portal/vertical";
import {
  formatDate,
  formatCurrency,
  relativeTime,
  VERTICAL_META,
  type Vertical,
} from "@/lib/constants";
import {
  Plus,
  CalendarDays,
  MapPin,
  ArrowRight,
  ShoppingCart,
  Clock,
  Star,
  ChevronRight,
  Sparkles,
  Hotel,
  Ticket,
  UtensilsCrossed,
  Car,
  MessageSquare,
  FileText,
  CalendarRange,
} from "lucide-react";
import { VendorSummary } from "@/components/portal/vendor-summary";
import { VendorModeBanner } from "@/components/portal/role-switcher";

const ACTIVITY_ICONS: Record<string, typeof Hotel> = {
  cart: ShoppingCart,
  hotel: Hotel,
  review: Star,
  message: MessageSquare,
  itinerary: CalendarRange,
  ticket: Ticket,
  dining: UtensilsCrossed,
  transport: Car,
  doc: FileText,
};

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  // Fetch the guest first so the active Plan can scope recommendations.
  const guest = await db.guest.findFirst();
  const planCity = guest?.planWhere
    ? guest.planWhere.split(",")[0].trim()
    : null;

  const [itineraries, cart, activity, listings] = await Promise.all([
    db.itinerary.findMany({
      include: { collaborators: true, items: true, reservations: true },
      orderBy: { startDate: "asc" },
    }),
    db.cartItem.findMany({ orderBy: { createdAt: "desc" } }),
    db.activity.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    // Recommendations are scoped to the active Plan's city when set.
    db.listing.findMany({
      where: planCity ? { city: { startsWith: planCity } } : undefined,
      orderBy: { match: "desc" },
      take: 4,
    }),
  ]);

  // If the Plan-scoped query returns too few, backfill with top matches so the
  // recommendations section never looks empty.
  let recommended = listings;
  if (recommended.length < 4 && planCity) {
    const more = await db.listing.findMany({
      orderBy: { match: "desc" },
      take: 4 - recommended.length,
    });
    recommended = [...recommended, ...more];
  }

  const now = new Date().toISOString().slice(0, 10);
  const upcoming = itineraries.filter(
    (i) => i.startDate >= now && i.status !== "Completed"
  );
  const firstName = (guest?.name || "Guest").split(" ")[0];
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  const cartSubtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const cartFee = Math.round(cartSubtotal * 0.05 * 100) / 100;
  const cartTax = Math.round(cartSubtotal * 0.0825 * 100) / 100;
  const cartTotal = Math.round((cartSubtotal + cartFee + cartTax) * 100) / 100;

  return (
    <div className="space-y-8">
      {/* Vendor-mode banner (only renders when activeRole === "vendor") */}
      <VendorModeBanner />
      <VendorSummary />

      {/* Welcome header */}
      <div className="flex flex-col gap-4 rounded-2xl border border-border bg-gradient-to-br from-card to-teal/5 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-teal">
            <CalendarDays className="size-3.5" />
            {today}
          </div>
          <h1 className="mt-1.5 font-display text-3xl font-700 tracking-tight text-navy sm:text-4xl">
            Welcome back, {firstName}
          </h1>
          <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="size-4 text-teal" />
            Currently in {guest?.location || "Austin, TX"}
            {guest?.planWhat && (
              <>
                <span className="mx-1.5 text-border">·</span>
                <Sparkles className="size-4 text-teal" />
                Planning a {guest.planWhat}
                {guest?.planWhere ? ` in ${guest.planWhere.split(",")[0]}` : ""}
              </>
            )}
          </p>
        </div>
        <Button asChild size="lg" className="bg-teal text-white shadow-sm hover:bg-teal/90">
          <Link href="/onboarding">
            <Plus className="size-4" />
            Plan a New Occasion
          </Link>
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main column */}
        <div className="space-y-8 lg:col-span-2">
          {/* Upcoming occasions */}
          <section>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="font-display text-xl font-600 text-navy">
                  Upcoming Occasions
                </h2>
                <p className="text-sm text-muted-foreground">
                  Trips and events you’re planning
                </p>
              </div>
              <Button asChild variant="ghost" size="sm">
                <Link href="/itineraries">
                  View all <ArrowRight className="size-3.5" />
                </Link>
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {upcoming.length === 0 && (
                <Card className="col-span-full border-dashed">
                  <CardContent className="flex flex-col items-center py-10 text-center">
                    <p className="text-sm text-muted-foreground">
                      No upcoming occasions. Plan your first one!
                    </p>
                    <Button asChild className="mt-4 bg-teal text-white hover:bg-teal/90">
                      <Link href="/onboarding">
                        <Plus className="size-4" /> Plan a New Occasion
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
              {upcoming.map((itin) => {
                const verticals = Array.from(
                  new Set(itin.items.map((i) => i.vertical))
                ) as Vertical[];
                return (
                  <Link
                    key={itin.id}
                    href={`/itineraries/${itin.id}`}
                    className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="relative h-32 overflow-hidden">
                      {itin.coverImage && (
                        <img
                          src={itin.coverImage}
                          alt={itin.title}
                          className="size-full object-cover transition-transform group-hover:scale-105"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent" />
                      <div className="absolute left-3 top-3">
                        <StatusBadge status={itin.status} />
                      </div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-white/80">
                          {formatDate(itin.startDate, { month: "short", day: "numeric" })} —{" "}
                          {formatDate(itin.endDate, { month: "short", day: "numeric" })}
                        </p>
                        <h3 className="font-display text-base font-600 leading-tight text-white">
                          {itin.title}
                        </h3>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-2 p-3">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="size-3.5 text-muted-foreground" />
                        <span className="text-xs font-medium text-foreground">
                          {itin.city}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5">
                          {verticals.slice(0, 4).map((v) => {
                            const meta = VERTICAL_META[v];
                            return (
                              <span
                                key={v}
                                className="flex size-6 items-center justify-center rounded-md text-white"
                                style={{ backgroundColor: meta.color }}
                                title={meta.label}
                              >
                                <VerticalIcon vertical={v} className="size-3" />
                              </span>
                            );
                          })}
                          {verticals.length === 0 && (
                            <span className="text-xs text-muted-foreground">
                              {itin.items.length} items
                            </span>
                          )}
                        </div>
                        <ChevronRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Recommended for you */}
          <section>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="font-display text-xl font-600 text-navy">
                  Recommended for You
                </h2>
                <p className="text-sm text-muted-foreground">
                  Curated for your occasions & location
                </p>
              </div>
              <Button asChild variant="ghost" size="sm">
                <Link href="/saved">
                  Browse all <ArrowRight className="size-3.5" />
                </Link>
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {recommended.map((l) => (
                <Link
                  key={l.id}
                  href="/saved"
                  className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="relative h-28 overflow-hidden">
                    {l.image && (
                      <img
                        src={l.image}
                        alt={l.title}
                        className="size-full object-cover transition-transform group-hover:scale-105"
                      />
                    )}
                    <div className="absolute right-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold text-teal backdrop-blur">
                      {l.match}% match
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                      {l.category}
                    </p>
                    <h3 className="mt-0.5 line-clamp-1 text-sm font-600 text-navy">
                      {l.title}
                    </h3>
                    <div className="mt-1.5 flex items-center justify-between">
                      <VerticalBadge vertical={l.vertical as Vertical} withIcon={false} />
                      <span className="text-sm font-700 text-navy">
                        {formatCurrency(l.price)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>

        {/* Right sidebar */}
        <div className="space-y-6">
          {/* Continue planning (cart) */}
          {cart.length > 0 && (
            <Card className="overflow-hidden border-0 bg-navy text-white shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base font-600 text-white">
                  <ShoppingCart className="size-4 text-teal" />
                  Continue Planning
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  {cart.slice(0, 4).map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-2.5 rounded-lg bg-white/5 p-2"
                    >
                      {item.image && (
                        <img
                          src={item.image}
                          alt=""
                          className="size-9 shrink-0 rounded-md object-cover"
                        />
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-600 text-white">
                          {item.title}
                        </p>
                        <p className="text-[11px] text-white/60">
                          {item.vendorName} · ×{item.quantity}
                        </p>
                      </div>
                      <span className="text-xs font-700 text-teal">
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between border-t border-white/10 pt-3 text-sm">
                  <span className="text-white/70">{cart.length} items</span>
                  <span className="font-700">{formatCurrency(cartTotal)}</span>
                </div>
                <Button asChild className="w-full bg-teal text-white hover:bg-teal/90">
                  <Link href="/cart">
                    Resume Checkout <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Recent activity */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base font-600 text-navy">
                <Clock className="size-4 text-teal" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="relative space-y-4 before:absolute before:left-[15px] before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-border">
                {activity.map((a) => {
                  const Icon = ACTIVITY_ICONS[a.icon] ?? Sparkles;
                  return (
                    <li key={a.id} className="relative flex gap-3">
                      <span className="z-10 flex size-8 shrink-0 items-center justify-center rounded-full border border-border bg-card text-teal">
                        <Icon className="size-3.5" />
                      </span>
                      <div className="min-w-0 flex-1 pt-0.5">
                        <p className="text-sm font-medium leading-snug text-navy">
                          {a.text}
                        </p>
                        {a.meta && (
                          <p className="text-xs text-muted-foreground">{a.meta}</p>
                        )}
                        <p className="mt-0.5 text-[11px] text-muted-foreground">
                          {relativeTime(a.timestamp)}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
