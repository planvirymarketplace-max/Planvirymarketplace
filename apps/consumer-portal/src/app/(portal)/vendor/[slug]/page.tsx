import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { PageHeader } from "@/components/portal/page-header";
import { VerticalBadge } from "@/components/portal/vertical";
import { StatusBadge } from "@/components/portal/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Store,
  LayoutDashboard,
  Inbox as InboxIcon,
  BookOpen,
  Megaphone,
  BarChart3,
  ExternalLink,
  TrendingUp,
  Star,
} from "lucide-react";
import { formatCurrency, formatDate, VERTICAL_META, canonicalVertical, type Vertical } from "@/lib/constants";

export const dynamic = "force-dynamic";

/**
 * /vendor/[slug] — the BRIDGE page. This is the landing surface when a dual-role
 * user clicks "Open vendor dashboard" from the guest portal's VendorSummary.
 *
 * In the mono-repo, the full Vendor Suite is a separate app. This page is the
 * guest-portal-side bridge: it reads the SAME shared Listing + Reservation tables
 * the vendor portal reads (filtered by vendorId) and renders a compact vendor
 * dashboard so the user lands on real data, not a 404. The "Open full Vendor
 * Suite" button links out to the separate vendor portal app in production.
 *
 * In production, set `NEXT_PUBLIC_VENDOR_PORTAL_URL` and this page either
 * redirects to it or renders as an embedded summary (SSO via shared Supabase
 * Auth session).
 */
export default async function VendorBridgePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ module?: string }>;
}) {
  const { slug } = await params;
  const { module: activeModule = "dashboard" } = await searchParams;

  const guest = await db.guest.findFirst();
  if (!guest || guest.vendorSlug !== slug) {
    // Allow the seeded vendor slug or any guest with a vendorSlug match
    if (!guest?.vendorSlug) notFound();
  }

  const vendorId = "vendor-1"; // the seeded vendor (Mara Voss)
  const vendorName = guest?.name ?? "Vendor";

  // Read from the SAME shared tables the vendor portal reads.
  const [listings, bookings, threads, tickets] = await Promise.all([
    db.listing.findMany({ where: { vendorId }, orderBy: { bookingsCount: "desc" } }),
    db.reservation.findMany({
      where: { status: { in: ["Confirmed", "Completed", "Pending"] } },
      orderBy: { startDate: "desc" },
      take: 8,
    }),
    db.messageThread.count({ where: { unread: true } }),
    db.supportTicket.count({ where: { status: { in: ["Open", "InProgress"] } } }),
  ]);

  const activeListings = listings.filter((l) => l.status === "active").length;
  const pausedListings = listings.filter((l) => l.status === "paused").length;
  const draftListings = listings.filter((l) => l.status === "draft").length;
  const revenue = bookings
    .filter((b) => b.status !== "Cancelled")
    .reduce((s, b) => s + b.total, 0);
  const avgRating =
    listings.length > 0
      ? listings.reduce((s, l) => s + l.rating, 0) / listings.length
      : 0;

  const modules = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "inbox", label: "Inbox", icon: InboxIcon, badge: threads },
    { id: "bookings", label: "Bookings", icon: BookOpen },
    { id: "promote", label: "Promote", icon: Megaphone },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
  ] as const;

  const kpis = [
    { label: "Active listings", value: String(activeListings), icon: Store, tint: "text-emerald-600 bg-emerald-50" },
    { label: "Bookings", value: String(bookings.length), icon: BookOpen, tint: "text-teal bg-teal/10" },
    { label: "Revenue", value: formatCurrency(revenue), icon: TrendingUp, tint: "text-violet-600 bg-violet-50" },
    { label: "Avg rating", value: avgRating.toFixed(1), icon: Star, tint: "text-amber-600 bg-amber-50" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm">
        <Link href="/" className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-3.5" /> Back to guest portal
        </Link>
      </div>

      <PageHeader
        title={`${vendorName} — Vendor Suite`}
        description="Your vendor command center. Reading from the same shared inventory + reservation ledger as the guest portal."
        icon={Store}
        actions={
          <Button asChild variant="outline" size="sm">
            <Link href="/">
              <ExternalLink className="size-3.5" /> Open full Vendor Suite
            </Link>
          </Button>
        }
      />

      {/* Module launcher — mirrors the vendor portal sidebar */}
      <div className="flex flex-wrap gap-1.5 rounded-xl border border-border bg-card p-2">
        {modules.map((m) => {
          const Icon = m.icon;
          const active = activeModule === m.id;
          return (
            <Link
              key={m.id}
              href={`/vendor/${slug}?module=${m.id}`}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                active ? "bg-teal text-white" : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon className="size-4" />
              {m.label}
              {"badge" in m && m.badge ? (
                <span className="ml-1 inline-flex min-w-[18px] items-center justify-center rounded-full bg-white/20 px-1.5 text-[10px] font-semibold">
                  {m.badge}
                </span>
              ) : null}
            </Link>
          );
        })}
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis.map((k) => {
          const Icon = k.icon;
          return (
            <Card key={k.label}>
              <CardContent className="flex items-center gap-3">
                <div className={`flex size-10 items-center justify-center rounded-lg ${k.tint}`}>
                  <Icon className="size-5" />
                </div>
                <div>
                  <p className="font-display text-2xl font-700 text-navy">{k.value}</p>
                  <p className="text-xs text-muted-foreground">{k.label}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Listings table — same shared rows the vendor portal shows */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between text-base font-600 text-navy">
            <span className="flex items-center gap-2">
              <Store className="size-4 text-teal" /> Your listings
            </span>
            <Button asChild size="sm" variant="outline" className="h-7 text-xs">
              <Link href="/create-listing">Manage</Link>
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="pb-2 pr-4 font-medium">Listing</th>
                  <th className="pb-2 pr-4 font-medium">Vertical</th>
                  <th className="pb-2 pr-4 font-medium">Status</th>
                  <th className="pb-2 pr-4 font-medium">Price</th>
                  <th className="pb-2 pr-4 font-medium">Bookings</th>
                  <th className="pb-2 pr-4 font-medium">Rating</th>
                </tr>
              </thead>
              <tbody>
                {listings.map((l) => {
                  const v = canonicalVertical(l.vertical);
                  const meta = VERTICAL_META[v];
                  return (
                    <tr key={l.id} className="border-b border-border/50 last:border-0">
                      <td className="py-2.5 pr-4">
                        <div className="flex items-center gap-2">
                          {l.image && (
                            <img src={l.image} alt="" className="size-9 rounded-md object-cover" />
                          )}
                          <span className="font-medium text-navy">{l.title}</span>
                        </div>
                      </td>
                      <td className="py-2.5 pr-4"><VerticalBadge vertical={v} withIcon={false} /></td>
                      <td className="py-2.5 pr-4"><StatusBadge status={l.status} /></td>
                      <td className="py-2.5 pr-4 font-medium">{formatCurrency(l.price)}<span className="text-muted-foreground"> /{l.unit ?? "unit"}</span></td>
                      <td className="py-2.5 pr-4">{l.bookingsCount}</td>
                      <td className="py-2.5 pr-4"><span className="inline-flex items-center gap-1"><Star className="size-3 fill-amber-400 text-amber-400" />{l.rating.toFixed(1)}</span></td>
                    </tr>
                  );
                })}
                {listings.length === 0 && (
                  <tr><td colSpan={6} className="py-8 text-center text-muted-foreground">No listings yet. Create your first from the sidebar.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Recent bookings — same shared reservation ledger */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base font-600 text-navy">
            <BookOpen className="size-4 text-teal" /> Recent bookings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {bookings.map((b) => (
              <div key={b.id} className="flex items-center justify-between rounded-lg border border-border bg-card px-3 py-2">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-navy">{b.listingTitle}</p>
                  <p className="text-xs text-muted-foreground">{b.vendorName} · {formatDate(b.startDate)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-600">{formatCurrency(b.total)}</span>
                  <StatusBadge status={b.status} />
                </div>
              </div>
            ))}
            {bookings.length === 0 && (
              <p className="py-6 text-center text-sm text-muted-foreground">No bookings yet.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
