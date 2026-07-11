import Link from "next/link";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/portal/page-header";
import { EmptyState } from "@/components/portal/empty-state";
import { Compass, PackageOpen, ArrowRight, X } from "lucide-react";

import {
  BookSearchBar,
  QuickFilterChips,
  SortSelect,
  ListingCard,
  type BookListing,
} from "./_components";

export const dynamic = "force-dynamic";

type SearchParams = {
  q?: string;
  vertical?: string;
  city?: string;
  sort?: string;
};

const VALID_VERTICALS = new Set([
  "lodging",
  "tickets",
  "venue",
  "services",
  "dining",
  "transport",
]);

const VALID_SORTS = new Set(["best", "price-asc", "price-desc", "rating"]);

const PRICE_BANDS = [
  { id: "0-500", label: "Under $500", min: 0, max: 500 },
  { id: "500-1500", label: "$500 – $1,500", min: 500, max: 1500 },
  { id: "1500-5000", label: "$1,500 – $5,000", min: 1500, max: 5000 },
  { id: "1500+", label: "$1,500+", min: 1500, max: Infinity },
  { id: "5000+", label: "$5,000+", min: 5000, max: Infinity },
];

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const qRaw = (sp.q ?? "").trim();
  const qLower = qRaw.toLowerCase();
  const vertical =
    sp.vertical && VALID_VERTICALS.has(sp.vertical) ? sp.vertical : "all";
  const city = sp.city && sp.city !== "all" ? sp.city : "all";
  const sort = sp.sort && VALID_SORTS.has(sp.sort) ? sp.sort : "best";

  // ── Plan-aware scoping ──
  // The omnipresent Plan (What/Where/When/Price/Attendees) scopes browse
  // results. Explicit URL filters (city=) override the Plan; when no explicit
  // city is set, the Plan's `where` is used. Price band filters the catalog.
  const guest = await db.guest.findFirst();
  const planWhere = guest?.planWhere ?? null;
  const planPrice = guest?.planPrice ?? null;
  const planAttendees = guest?.planAttendees ?? null;

  // Build Prisma where — vertical + city are DB-indexed filters; q is in-memory.
  // Plan scoping: the Plan's city applies ONLY when NO ?city= param is in the
  // URL at all. An explicit ?city=all means "all cities" (overrides the Plan);
  // an explicit ?city=Austin means "Austin only" (overrides the Plan).
  const where: { vertical?: string; city?: string } = {};
  if (vertical !== "all") where.vertical = vertical;
  const cityParamPresent = "city" in sp;
  if (cityParamPresent) {
    // explicit ?city= (even "all") → user is overriding the Plan
    if (city !== "all") where.city = city;
  } else if (planWhere) {
    // no ?city= → scope by the Plan's city (e.g. "Seattle, WA" → "Seattle")
    const planCity = planWhere.split(",")[0].trim();
    where.city = planCity;
  }

  const [listings, savedRows] = await Promise.all([
    db.listing.findMany({ where, orderBy: { match: "desc" } }),
    db.savedItem.findMany({ select: { id: true, listingId: true } }),
  ]);

  // Map of listingId → savedItem.id (so the SaveButton can DELETE on toggle-off)
  const savedMap = new Map<string, string>();
  for (const s of savedRows) {
    savedMap.set(s.listingId, s.id);
  }

  // Plan price-band filter (in-memory; in production this is a DB range query)
  const band = PRICE_BANDS.find((b) => b.id === planPrice);

  // In-memory text filter (title + vendor + city) + sort
  let filtered: BookListing[] = listings
    .filter((l) => {
      if (!qLower) return true;
      const hay = `${l.title} ${l.vendorName} ${l.city}`.toLowerCase();
      return hay.includes(qLower);
    })
    .filter((l) => {
      if (!band) return true;
      return l.price >= band.min && l.price < band.max;
    })
    .map((l) => ({
      id: l.id,
      title: l.title,
      vendorName: l.vendorName,
      vertical: l.vertical,
      city: l.city,
      price: l.price,
      image: l.image,
      rating: l.rating,
      category: l.category,
      description: l.description,
      match: l.match,
    }));

  filtered = sortListings(filtered, sort);

  const hasFilters =
    vertical !== "all" || city !== "all" || qLower.length > 0;
  const planActive = !!(planWhere || planPrice || planAttendees);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Book"
        description="Discover stays, tickets, venues, services, dining & transport"
        icon={Compass}
      />

      {/* Plan-aware scoping banner */}
      {planActive && (
        <div className="flex flex-wrap items-center gap-2 rounded-xl border border-teal/20 bg-teal/5 px-4 py-2.5 text-sm">
          <Compass className="size-4 text-teal" />
          <span className="font-medium text-navy">Scoped to your Plan:</span>
          {planWhere && (
            <span className="rounded-md bg-card px-2 py-0.5 text-xs font-medium text-foreground">
              {planWhere}
            </span>
          )}
          {planPrice && (
            <span className="rounded-md bg-card px-2 py-0.5 text-xs font-medium text-foreground">
              {PRICE_BANDS.find((b) => b.id === planPrice)?.label ?? planPrice}
            </span>
          )}
          {planAttendees && (
            <span className="rounded-md bg-card px-2 py-0.5 text-xs font-medium text-foreground">
              {planAttendees} attendees
            </span>
          )}
          <span className="ml-auto text-xs text-muted-foreground">
            Adjust via the Plan button in the header
          </span>
        </div>
      )}

      {/* Hero search */}
      <BookSearchBar q={qRaw} vertical={vertical} city={city} />

      {/* Quick filter chips */}
      <QuickFilterChips
        q={qRaw}
        vertical={vertical}
        city={city}
        sort={sort}
      />

      {/* Results toolbar */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p
          className="text-sm text-muted-foreground"
          aria-live="polite"
        >
          Showing{" "}
          <span className="font-semibold text-navy">{filtered.length}</span>{" "}
          {filtered.length === 1 ? "listing" : "listings"}
          {hasFilters && (
            <>
              {" "}
              for your{" "}
              <button
                type="button"
                className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-foreground hover:bg-muted/70"
              >
                {[
                  qRaw && `“${qRaw}”`,
                  vertical !== "all" && vertical,
                  city !== "all" && city,
                ]
                  .filter(Boolean)
                  .join(" · ")}
                <Link
                  href="/book"
                  className="ml-0.5 text-muted-foreground hover:text-teal"
                  aria-label="Clear all filters"
                >
                  <X className="size-3" />
                </Link>
              </button>
            </>
          )}
        </p>
        <SortSelect q={qRaw} vertical={vertical} city={city} sort={sort} />
      </div>

      {/* Results grid OR empty state */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={PackageOpen}
          title={hasFilters ? "No listings found" : "No listings available"}
          description={
            hasFilters
              ? "Try adjusting your search, category, or city to find what you’re looking for."
              : "Check back soon — new listings are added every day."
          }
          action={
            hasFilters ? (
              <Button asChild className="bg-teal text-white hover:bg-teal/90">
                <Link href="/book">
                  <X className="size-4" />
                  Clear filters
                </Link>
              </Button>
            ) : (
              <Button asChild variant="outline">
                <Link href="/">
                  Back to dashboard
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            )
          }
        />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              savedId={savedMap.get(listing.id) ?? null}
            />
          ))}
        </div>
      )}

      {/* Footer link */}
      <div className="flex items-center justify-between pt-2">
        <Button asChild variant="ghost" size="sm">
          <Link href="/">
            Back to dashboard
            <ArrowRight className="size-3.5" />
          </Link>
        </Button>
        <span className="text-xs text-muted-foreground">
          {filtered.length === 1 ? "1 listing" : `${filtered.length} listings`}
        </span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sorting
// ---------------------------------------------------------------------------

function sortListings(
  list: BookListing[],
  sort: string
): BookListing[] {
  const copy = [...list];
  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    case "rating":
      return copy.sort((a, b) => b.rating - a.rating || b.match - a.match);
    case "best":
    default:
      // Match desc is already the DB order; keep stable but re-sort to be safe
      return copy.sort((a, b) => b.match - a.match);
  }
}
