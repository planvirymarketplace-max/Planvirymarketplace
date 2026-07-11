"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Search,
  X,
  Heart,
  ShoppingCart,
  Check,
  Loader2,
  MapPin,
  Sparkles,
  ArrowUpDown,
  PackageOpen,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { StarRating } from "@/components/portal/star-rating";
import { VerticalBadge } from "@/components/portal/vertical";
import {
  VERTICALS,
  VERTICAL_META,
  formatCurrency,
  type Vertical,
} from "@/lib/constants";
import { usePortalCounts } from "@/hooks/use-portal-data";
import { cn } from "@/lib/utils";

/** Cities surfaced in the Book search filter. */
export const BOOK_CITIES = ["Austin", "Chicago", "New York", "Miami"] as const;

/** Shape passed from the server page to every card / action button. */
export type BookListing = {
  id: string;
  title: string;
  vendorName: string;
  vertical: string;
  city: string;
  price: number;
  image: string | null;
  rating: number;
  category: string;
  description: string | null;
  match: number;
};

/** Build a /book URL preserving every filter except the one being changed. */
function buildHref(
  overrides: {
    q?: string;
    vertical?: string;
    city?: string;
    sort?: string;
  },
  current: { q: string; vertical: string; city: string; sort: string }
): string {
  const q = overrides.q !== undefined ? overrides.q : current.q;
  const vertical =
    overrides.vertical !== undefined ? overrides.vertical : current.vertical;
  const city = overrides.city !== undefined ? overrides.city : current.city;
  const sort = overrides.sort !== undefined ? overrides.sort : current.sort;
  const p = new URLSearchParams();
  if (q) p.set("q", q);
  if (vertical && vertical !== "all") p.set("vertical", vertical);
  if (city && city !== "all") p.set("city", city);
  if (sort && sort !== "best") p.set("sort", sort);
  const qs = p.toString();
  return qs ? `/book?${qs}` : "/book";
}

// ---------------------------------------------------------------------------
// Hero search bar — premium card with search + vertical + city + submit
// ---------------------------------------------------------------------------

export function BookSearchBar({
  q,
  vertical,
  city,
}: {
  q: string;
  vertical: string;
  city: string;
}) {
  const router = useRouter();
  const [search, setSearch] = React.useState(q ?? "");

  React.useEffect(() => {
    setSearch(q ?? "");
  }, [q]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = search.trim();
    const params = new URLSearchParams();
    if (trimmed) params.set("q", trimmed);
    // Read current selects from the form's hidden reflected state via the controlled values.
    if (vertical && vertical !== "all") params.set("vertical", vertical);
    if (city && city !== "all") params.set("city", city);
    const qs = params.toString();
    router.push(qs ? `/book?${qs}` : "/book");
  };

  return (
    <form
      role="search"
      aria-label="Browse listings"
      onSubmit={onSubmit}
      className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card to-teal/5 p-4 shadow-sm sm:p-5"
    >
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
        {/* Search text */}
        <div className="flex-1 space-y-1.5">
          <Label
            htmlFor="book-search"
            className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground"
          >
            Search
          </Label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="book-search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, vendor, or city…"
              className="h-11 pl-9 pr-9"
              autoComplete="off"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="absolute right-2 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center rounded text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Vertical */}
        <div className="space-y-1.5 lg:w-[180px]">
          <Label
            htmlFor="book-vertical"
            className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground"
          >
            Category
          </Label>
          <VerticalSelect
            value={vertical}
            onChange={(v) =>
              router.push(
                buildHref(
                  { vertical: v },
                  { q: search.trim(), vertical, city, sort: "best" }
                )
              )
            }
          />
        </div>

        {/* City */}
        <div className="space-y-1.5 lg:w-[170px]">
          <Label
            htmlFor="book-city"
            className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground"
          >
            City
          </Label>
          <CitySelect
            value={city}
            onChange={(c) =>
              router.push(
                buildHref(
                  { city: c },
                  { q: search.trim(), vertical, city, sort: "best" }
                )
              )
            }
          />
        </div>

        <Button
          type="submit"
          className="h-11 gap-2 bg-teal text-white hover:bg-teal/90 lg:px-6"
        >
          <Search className="size-4" />
          <span>Search</span>
        </Button>
      </div>
    </form>
  );
}

function VerticalSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger id="book-vertical" className="h-11 w-full">
        <SelectValue placeholder="All categories" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All categories</SelectItem>
        {VERTICALS.map((v) => (
          <SelectItem key={v} value={v}>
            {VERTICAL_META[v].label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function CitySelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger id="book-city" className="h-11 w-full">
        <SelectValue placeholder="All cities" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All cities</SelectItem>
        {BOOK_CITIES.map((c) => (
          <SelectItem key={c} value={c}>
            {c}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

// ---------------------------------------------------------------------------
// Quick filter chips — "All" + each vertical, active = teal
// ---------------------------------------------------------------------------

export function QuickFilterChips({
  q,
  vertical,
  city,
  sort,
}: {
  q: string;
  vertical: string;
  city: string;
  sort: string;
}) {
  const current = { q, vertical, city, sort };
  const chips: { value: string; label: string }[] = [
    { value: "all", label: "All" },
    ...VERTICALS.map((v) => ({ value: v, label: VERTICAL_META[v].label })),
  ];
  return (
    <nav aria-label="Filter by category" className="flex flex-wrap items-center gap-2">
      {chips.map((c) => {
        const isActive = vertical === c.value;
        return (
          <Link
            key={c.value}
            href={buildHref({ vertical: c.value }, current)}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors",
              isActive
                ? "border-teal bg-teal text-white shadow-sm hover:bg-teal/90"
                : "border-border bg-card text-foreground hover:border-teal/40 hover:bg-teal/5 hover:text-teal"
            )}
          >
            {c.label}
          </Link>
        );
      })}
    </nav>
  );
}

// ---------------------------------------------------------------------------
// Sort dropdown
// ---------------------------------------------------------------------------

const SORT_OPTIONS: { value: string; label: string }[] = [
  { value: "best", label: "Best match" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "rating", label: "Top rated" },
];

export function SortSelect({
  q,
  vertical,
  city,
  sort,
}: {
  q: string;
  vertical: string;
  city: string;
  sort: string;
}) {
  const router = useRouter();
  const current = { q, vertical, city, sort };
  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown className="size-3.5 text-muted-foreground" aria-hidden="true" />
      <Label
        htmlFor="book-sort"
        className="hidden text-xs font-medium text-muted-foreground sm:inline"
      >
        Sort
      </Label>
      <Select
        value={sort}
        onValueChange={(v) => router.push(buildHref({ sort: v }, current))}
      >
        <SelectTrigger id="book-sort" size="sm" className="h-8 w-[170px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {SORT_OPTIONS.map((o) => (
            <SelectItem key={o.value} value={o.value}>
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Add to cart — POST /api/cart, spinner + brief "Added" check
// ---------------------------------------------------------------------------

export function AddToCartButton({
  listing,
  className,
  variant = "default",
}: {
  listing: BookListing;
  className?: string;
  variant?: "default" | "compact";
}) {
  const { refresh } = usePortalCounts();
  const [status, setStatus] = React.useState<"idle" | "loading" | "added">(
    "idle"
  );
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const onClick = async () => {
    setStatus("loading");
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          listingId: listing.id,
          title: listing.title,
          vendorName: listing.vendorName,
          vertical: listing.vertical,
          price: listing.price,
          quantity: 1,
          image: listing.image,
        }),
      });
      if (!res.ok) throw new Error("add-to-cart failed");
      toast.success("Added to cart");
      void refresh();
      setStatus("added");
      timer.current = setTimeout(() => setStatus("idle"), 1500);
    } catch {
      toast.error("Could not add to cart");
      setStatus("idle");
    }
  };

  const compact = variant === "compact";

  return (
    <Button
      type="button"
      onClick={() => void onClick()}
      disabled={status === "loading"}
      aria-label={`Add ${listing.title} to cart`}
      className={cn(
        "gap-1.5 bg-teal text-white hover:bg-teal/90",
        compact ? "h-8 px-3 text-xs" : "h-9 px-4",
        status === "added" && "bg-emerald-600 hover:bg-emerald-600",
        className
      )}
    >
      {status === "loading" ? (
        <Loader2 className="size-3.5 animate-spin" />
      ) : status === "added" ? (
        <Check className="size-3.5" />
      ) : (
        <ShoppingCart className="size-3.5" />
      )}
      <span>{status === "added" ? "Added" : "Add to Cart"}</span>
    </Button>
  );
}

// ---------------------------------------------------------------------------
// Save button — toggles filled heart. POST /api/saved or DELETE /api/saved/[id]
// ---------------------------------------------------------------------------

export function SaveButton({
  listing,
  savedId,
  variant = "overlay",
  onSavedChange,
}: {
  listing: BookListing;
  /** savedItem.id if the listing is already in the user's saved set, else null */
  savedId: string | null;
  variant?: "overlay" | "inline";
  onSavedChange?: (savedId: string | null) => void;
}) {
  const router = useRouter();
  const [saved, setSaved] = React.useState<boolean>(savedId !== null);
  const [currentSavedId, setCurrentSavedId] = React.useState<string | null>(
    savedId
  );
  const [loading, setLoading] = React.useState(false);

  // Keep local state in sync if the server prop changes (e.g. after router.refresh)
  React.useEffect(() => {
    setSaved(savedId !== null);
    setCurrentSavedId(savedId);
  }, [savedId]);

  const onClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (loading) return;
    setLoading(true);
    try {
      if (!saved) {
        const res = await fetch("/api/saved", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            listingId: listing.id,
            title: listing.title,
            vendorName: listing.vendorName,
            vertical: listing.vertical,
            price: listing.price,
            image: listing.image,
            rating: listing.rating,
          }),
        });
        if (!res.ok) throw new Error("save failed");
        const data = (await res.json()) as { id?: string };
        const newId = data.id ?? null;
        setCurrentSavedId(newId);
        setSaved(true);
        onSavedChange?.(newId);
        toast.success("Saved to favorites");
      } else if (currentSavedId) {
        const res = await fetch(`/api/saved/${currentSavedId}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error("unsave failed");
        setCurrentSavedId(null);
        setSaved(false);
        onSavedChange?.(null);
        toast.success("Removed from saved");
        router.refresh();
      }
    } catch {
      toast.error("Could not update favorites");
    } finally {
      setLoading(false);
    }
  };

  if (variant === "inline") {
    return (
      <Button
        type="button"
        variant="outline"
        onClick={(e) => void onClick(e)}
        disabled={loading}
        aria-pressed={saved}
        aria-label={saved ? `Remove ${listing.title} from saved` : `Save ${listing.title} to favorites`}
        className={cn(
          "gap-1.5",
          saved &&
            "border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100 hover:text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-400"
        )}
      >
        {loading ? (
          <Loader2 className="size-3.5 animate-spin" />
        ) : (
          <Heart className={cn("size-3.5", saved && "fill-current")} />
        )}
        <span>{saved ? "Saved" : "Save"}</span>
      </Button>
    );
  }

  // Overlay (image corner) variant
  return (
    <button
      type="button"
      onClick={(e) => void onClick(e)}
      disabled={loading}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${listing.title} from saved` : `Save ${listing.title} to favorites`}
      className={cn(
        "flex size-9 items-center justify-center rounded-full backdrop-blur transition-colors",
        "bg-white/90 text-navy shadow-sm hover:bg-white",
        saved && "text-rose-600 hover:text-rose-700"
      )}
    >
      {loading ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <Heart className={cn("size-4", saved && "fill-current")} />
      )}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Listing card — image (clickable → detail dialog), overlays, body, footer
// ---------------------------------------------------------------------------

function normalizeVertical(v: string): Vertical {
  return (VERTICALS as string[]).includes(v) ? (v as Vertical) : "services";
}

export function ListingCard({
  listing,
  savedId,
}: {
  listing: BookListing;
  savedId: string | null;
}) {
  const [savedIdState, setSavedIdState] = React.useState<string | null>(savedId);
  const [open, setOpen] = React.useState(false);
  const vertical = normalizeVertical(listing.vertical);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-muted">
        {listing.image ? (
          <img
            src={listing.image}
            alt={listing.title}
            loading="lazy"
            className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex size-full items-center justify-center text-muted-foreground">
            <PackageOpen className="size-8" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent" />

        {/* Save button — top-left */}
        <div className="absolute left-2.5 top-2.5">
          <SaveButton
            listing={listing}
            savedId={savedIdState}
            onSavedChange={setSavedIdState}
          />
        </div>

        {/* Match badge — top-right */}
        <div className="absolute right-2.5 top-2.5 flex items-center gap-1 rounded-full bg-teal px-2 py-0.5 text-[11px] font-bold text-white shadow-sm">
          <Sparkles className="size-3" />
          {listing.match}% match
        </div>

        {/* Click-to-open overlay button */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`View details for ${listing.title}`}
          className="absolute inset-0 h-full w-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-inset"
        />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            {listing.category}
          </p>
          <VerticalBadge vertical={vertical} withIcon={false} />
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="text-left"
        >
          <h3 className="line-clamp-1 font-display text-base font-600 leading-tight text-navy transition-colors group-hover:text-teal">
            {listing.title}
          </h3>
        </button>

        <p className="flex items-center gap-1.5 truncate text-xs text-muted-foreground">
          <span
            className="size-1.5 shrink-0 rounded-full bg-teal"
            aria-hidden="true"
          />
          by {listing.vendorName}
        </p>

        <div className="flex items-center gap-2">
          <StarRating value={listing.rating} size="sm" />
          <span className="text-xs font-semibold text-navy">
            {listing.rating.toFixed(1)}
          </span>
        </div>

        <p className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="size-3.5 text-teal" aria-hidden="true" />
          {listing.city}
        </p>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between gap-2 border-t border-border pt-3">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              From
            </p>
            <p className="font-display text-lg font-700 leading-none text-navy">
              {formatCurrency(listing.price)}
            </p>
          </div>
          <AddToCartButton listing={listing} />
        </div>
      </div>

      {/* Detail dialog */}
      <ListingDetailDialog
        listing={listing}
        savedId={savedIdState}
        onSavedChange={setSavedIdState}
        open={open}
        onOpenChange={setOpen}
      />
    </article>
  );
}

function ListingDetailDialog({
  listing,
  savedId,
  onSavedChange,
  open,
  onOpenChange,
}: {
  listing: BookListing;
  savedId: string | null;
  onSavedChange: (id: string | null) => void;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const vertical = normalizeVertical(listing.vertical);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden p-0 sm:max-w-2xl">
        <div className="relative h-56 w-full overflow-hidden bg-muted sm:h-64">
          {listing.image ? (
            <img
              src={listing.image}
              alt={listing.title}
              className="size-full object-cover"
            />
          ) : (
            <div className="flex size-full items-center justify-center text-muted-foreground">
              <PackageOpen className="size-10" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/10 to-transparent" />
          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-teal px-2.5 py-1 text-xs font-bold text-white shadow-sm">
            <Sparkles className="size-3.5" />
            {listing.match}% match
          </div>
          <div className="absolute bottom-3 left-3 right-3">
            <div className="mb-1.5 flex items-center gap-2">
              <VerticalBadge vertical={vertical} withIcon />
              <span className="rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-navy">
                {listing.category}
              </span>
            </div>
            <DialogTitle className="font-display text-xl font-700 leading-tight text-white">
              {listing.title}
            </DialogTitle>
          </div>
        </div>

        <div className="space-y-4 p-5 sm:p-6">
          <DialogDescription asChild>
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <span
                    className="size-2 rounded-full bg-teal"
                    aria-hidden="true"
                  />
                  <span className="font-medium text-foreground">
                    {listing.vendorName}
                  </span>
                </span>
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <MapPin className="size-4 text-teal" aria-hidden="true" />
                  {listing.city}
                </span>
                <span className="flex items-center gap-1.5">
                  <StarRating value={listing.rating} size="sm" />
                  <span className="text-sm font-semibold text-navy">
                    {listing.rating.toFixed(1)}
                  </span>
                </span>
              </div>

              <div>
                <h4 className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  About
                </h4>
                <p className="text-sm leading-relaxed text-foreground">
                  {listing.description ||
                    `${listing.title} by ${listing.vendorName} in ${listing.city}.`}
                </p>
              </div>
            </div>
          </DialogDescription>

          <DialogFooter className="flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                Starting from
              </p>
              <p className="font-display text-2xl font-700 leading-none text-navy">
                {formatCurrency(listing.price)}
              </p>
            </div>
            <div className="flex w-full items-center gap-2 sm:w-auto">
              <SaveButton
                listing={listing}
                savedId={savedId}
                variant="inline"
                onSavedChange={onSavedChange}
              />
              <AddToCartButton listing={listing} className="flex-1 sm:flex-none" />
            </div>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
