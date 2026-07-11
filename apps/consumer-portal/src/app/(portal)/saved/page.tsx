import Link from "next/link";
import { db } from "@/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/portal/page-header";
import { EmptyState } from "@/components/portal/empty-state";
import { VerticalBadge } from "@/components/portal/vertical";
import { StarRating } from "@/components/portal/star-rating";
import { formatCurrency, VERTICALS, type Vertical } from "@/lib/constants";
import {
  CollectionsRow,
  NewCollectionDialog,
  SavedItemActions,
  SavedToolbar,
  type CollectionRow,
} from "./_components";
import { Heart, PackageOpen, Plus, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

type SavedItem = {
  id: string;
  listingId: string;
  title: string;
  vendorName: string;
  vertical: string;
  price: number;
  image: string | null;
  collection: string | null;
  rating: number;
  createdAt: Date;
};

function normalizeVertical(v: string): Vertical {
  return (VERTICALS as string[]).includes(v) ? (v as Vertical) : "services";
}

export default async function SavedPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    vertical?: string;
    collection?: string;
    view?: string;
  }>;
}) {
  const sp = await searchParams;
  const qRaw = (sp.q ?? "").trim();
  const qLower = qRaw.toLowerCase();
  const vertical = sp.vertical ?? "all";
  const collection = sp.collection ?? "all";
  const view = sp.view === "list" ? "list" : "grid";

  const [items, groupRows] = await Promise.all([
    db.savedItem.findMany({ orderBy: { createdAt: "desc" } }),
    db.savedItem.groupBy({ by: ["collection"], _count: true }),
  ]);

  // Build collections array — All first, then named, then Uncategorized last (if any)
  const collections: CollectionRow[] = [];
  collections.push({ collection: "all", count: items.length });
  for (const row of groupRows) {
    if (row.collection) {
      collections.push({ collection: row.collection, count: row._count });
    }
  }
  const uncategorizedRow = groupRows.find((r) => r.collection === null);
  if (uncategorizedRow && uncategorizedRow._count > 0) {
    collections.push({ collection: "__none__", count: uncategorizedRow._count });
  }

  // Filter items in memory (mirrors API logic)
  const filtered = items.filter((it: SavedItem) => {
    if (vertical !== "all" && it.vertical !== vertical) return false;
    if (collection !== "all") {
      if (collection === "__none__") {
        if (it.collection) return false;
      } else if (it.collection !== collection) {
        return false;
      }
    }
    if (qLower) {
      const hay = `${it.title} ${it.vendorName}`.toLowerCase();
      if (!hay.includes(qLower)) return false;
    }
    return true;
  });

  const hasFilters =
    vertical !== "all" || collection !== "all" || qLower.length > 0;

  // Hide the collections row + toolbar when there is nothing to filter at all
  const showFilters = items.length > 0;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Saved"
        description="Your favorited listings"
        icon={Heart}
        actions={<NewCollectionDialog />}
      />

      {showFilters && (
        <CollectionsRow
          collections={collections}
          active={collection}
          view={view}
          vertical={vertical}
          q={qRaw}
        />
      )}

      {showFilters && (
        <SavedToolbar
          view={view}
          vertical={vertical}
          q={qRaw}
          collection={collection}
          count={filtered.length}
        />
      )}

      {filtered.length === 0 ? (
        <EmptyState
          icon={PackageOpen}
          title={hasFilters ? "No matching saved items" : "No saved items yet"}
          description={
            hasFilters
              ? "Try adjusting your filters or search to find what you’re looking for."
              : "Browse listings and tap the heart to save them here for later."
          }
          action={
            <div className="flex flex-wrap items-center justify-center gap-3">
              {hasFilters ? (
                <Button asChild variant="outline">
                  <Link href="/saved">Clear filters</Link>
                </Button>
              ) : null}
              <Button asChild className="bg-teal text-white hover:bg-teal/90">
                <Link href="/onboarding">
                  <Plus className="size-4" />
                  Plan a New Occasion
                </Link>
              </Button>
            </div>
          }
        />
      ) : view === "grid" ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <SavedGridCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((item) => (
            <SavedListRow key={item.id} item={item} />
          ))}
        </div>
      )}

      <div className="flex items-center justify-between pt-2">
        <Button asChild variant="ghost" size="sm">
          <Link href="/">
            Back to dashboard
            <ArrowRight className="size-3.5" />
          </Link>
        </Button>
        <span className="text-xs text-muted-foreground">
          {filtered.length === 1 ? "1 item" : `${filtered.length} items`}
        </span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Grid card (server)
// ---------------------------------------------------------------------------

function SavedGridCard({ item }: { item: SavedItem }) {
  const vertical = normalizeVertical(item.vertical);
  return (
    <Card className="group flex flex-col overflow-hidden py-0 transition-all hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative h-32 overflow-hidden bg-muted">
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            className="size-full object-cover transition-transform group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex size-full items-center justify-center text-muted-foreground">
            <PackageOpen className="size-8" />
          </div>
        )}
        <div className="absolute right-2 top-2">
          <VerticalBadge vertical={vertical} />
        </div>
        {item.collection && (
          <div className="absolute left-2 top-2 rounded-full bg-navy/80 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur">
            {item.collection}
          </div>
        )}
      </div>

      <CardContent className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="line-clamp-1 font-display text-base font-600 leading-tight text-navy">
              {item.title}
            </h3>
            <p className="mt-0.5 truncate text-xs text-muted-foreground">
              by {item.vendorName}
            </p>
          </div>
          <span className="shrink-0 font-display text-base font-700 text-navy">
            {formatCurrency(item.price)}
          </span>
        </div>

        <StarRating value={item.rating} size="sm" />

        <div className="mt-auto pt-2">
          <SavedItemActions id={item.id} title={item.title} />
        </div>
      </CardContent>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// List row (server)
// ---------------------------------------------------------------------------

function SavedListRow({ item }: { item: SavedItem }) {
  const vertical = normalizeVertical(item.vertical);
  return (
    <Card className="py-0">
      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
        {/* Thumbnail */}
        <div className="relative shrink-0">
          {item.image ? (
            <img
              src={item.image}
              alt={item.title}
              className="size-16 rounded-lg object-cover"
              loading="lazy"
            />
          ) : (
            <div className="flex size-16 items-center justify-center rounded-lg bg-muted text-muted-foreground">
              <PackageOpen className="size-5" />
            </div>
          )}
        </div>

        {/* Main info */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-display text-base font-600 leading-tight text-navy">
                {item.title}
              </h3>
              <p className="mt-0.5 text-xs text-muted-foreground">
                by {item.vendorName}
                {item.collection ? ` · ${item.collection}` : ""}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <StarRating value={item.rating} size="sm" />
              <VerticalBadge vertical={vertical} />
              <span className="font-display text-base font-700 text-navy">
                {formatCurrency(item.price)}
              </span>
            </div>
          </div>

          <div className="mt-3">
            <SavedItemActions id={item.id} title={item.title} />
          </div>
        </div>
      </div>
    </Card>
  );
}
