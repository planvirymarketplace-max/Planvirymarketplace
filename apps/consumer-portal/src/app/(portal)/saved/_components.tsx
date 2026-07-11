"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  LayoutGrid,
  List as ListIcon,
  Search,
  X,
  ShoppingCart,
  Trash2,
  Plus,
  Loader2,
  ExternalLink,
  FolderPlus,
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
  DialogTrigger,
} from "@/components/ui/dialog";

import { VERTICALS } from "@/lib/constants";
import { usePortalCounts } from "@/hooks/use-portal-data";
import { cn } from "@/lib/utils";

/** Build a /saved URL preserving every filter except the one being changed. */
function buildHref(
  overrides: { view?: string; vertical?: string; q?: string; collection?: string },
  current: { view: string; vertical: string; q: string; collection: string }
): string {
  const view = overrides.view ?? current.view;
  const vertical = overrides.vertical ?? current.vertical;
  const q = overrides.q !== undefined ? overrides.q : current.q;
  const collection =
    overrides.collection !== undefined ? overrides.collection : current.collection;
  const p = new URLSearchParams();
  if (view && view !== "grid") p.set("view", view);
  if (vertical && vertical !== "all") p.set("vertical", vertical);
  if (q) p.set("q", q);
  if (collection && collection !== "all") p.set("collection", collection);
  const qs = p.toString();
  return qs ? `/saved?${qs}` : "/saved";
}

// ---------------------------------------------------------------------------
// Toolbar — view toggle, vertical select, search input
// ---------------------------------------------------------------------------

export function SavedToolbar({
  view,
  vertical,
  q,
  collection,
  count,
}: {
  view: string;
  vertical: string;
  q: string;
  collection: string;
  count: number;
}) {
  const router = useRouter();
  const [search, setSearch] = React.useState(q ?? "");

  // Keep local input in sync when the URL `q` changes externally
  React.useEffect(() => {
    setSearch(q ?? "");
  }, [q]);

  const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = search.trim();
    router.push(buildHref({ q: trimmed }, { view, vertical, q, collection }));
  };

  const onClearSearch = () => {
    setSearch("");
    if (q) {
      router.push(buildHref({ q: "" }, { view, vertical, q, collection }));
    }
  };

  const onVerticalChange = (v: string) => {
    router.push(buildHref({ vertical: v }, { view, vertical, q, collection }));
  };

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-wrap items-center gap-2">
        {/* View toggle (two icon buttons) */}
        <div
          className="inline-flex items-center rounded-md border border-border bg-card p-0.5"
          role="group"
          aria-label="View mode"
        >
          <Button
            asChild
            variant="ghost"
            size="sm"
            className={cn(
              "h-8 gap-1.5 rounded-sm px-2.5",
              view === "grid"
                ? "bg-teal/10 text-teal hover:bg-teal/15"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Link
              href={buildHref({ view: "grid" }, { view, vertical, q, collection })}
              aria-pressed={view === "grid"}
              aria-label="Grid view"
            >
              <LayoutGrid className="size-4" />
              <span className="hidden sm:inline">Grid</span>
            </Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="sm"
            className={cn(
              "h-8 gap-1.5 rounded-sm px-2.5",
              view === "list"
                ? "bg-teal/10 text-teal hover:bg-teal/15"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Link
              href={buildHref({ view: "list" }, { view, vertical, q, collection })}
              aria-pressed={view === "list"}
              aria-label="List view"
            >
              <ListIcon className="size-4" />
              <span className="hidden sm:inline">List</span>
            </Link>
          </Button>
        </div>

        <Select value={vertical} onValueChange={onVerticalChange}>
          <SelectTrigger
            size="sm"
            className="w-full sm:w-[170px]"
            aria-label="Filter by vertical"
          >
            <SelectValue placeholder="All verticals" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All verticals</SelectItem>
            {VERTICALS.map((v) => (
              <SelectItem key={v} value={v}>
                {v}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <span
          className="hidden text-xs font-medium text-muted-foreground sm:inline"
          aria-live="polite"
        >
          {count === 1 ? "1 result" : `${count} results`}
        </span>

        <form onSubmit={onSearch} role="search" className="relative w-full sm:w-64">
          <label htmlFor="saved-search" className="sr-only">
            Search saved listings by title or vendor
          </label>
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="saved-search"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search saved…"
            className="h-8 pl-8 pr-8"
            autoComplete="off"
          />
          {search && (
            <button
              type="button"
              onClick={onClearSearch}
              aria-label="Clear search"
              className="absolute right-1.5 top-1/2 flex size-5 -translate-y-1/2 items-center justify-center rounded text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <X className="size-3.5" />
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Collections chips row + New Collection dialog
// ---------------------------------------------------------------------------

export type CollectionRow = { collection: string; count: number };

export function CollectionsRow({
  collections,
  active,
  view,
  vertical,
  q,
}: {
  collections: CollectionRow[];
  active: string;
  view: string;
  vertical: string;
  q: string;
}) {
  const current = { view, vertical, q, collection: active };
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Collections
      </span>
      <Separator />

      {collections.map((c) => {
        const isActive = active === c.collection;
        const label =
          c.collection === "all"
            ? "All"
            : c.collection === "__none__"
              ? "Uncategorized"
              : c.collection;
        const href = buildHref({ collection: c.collection }, current);
        return (
          <Link
            key={c.collection}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
              isActive
                ? "border-teal bg-teal text-white hover:bg-teal/90"
                : "border-border bg-card text-foreground hover:border-teal/40 hover:bg-teal/5"
            )}
          >
            {label}
            <span
              className={cn(
                "rounded-full px-1.5 py-0.5 text-[10px] font-bold tabular-nums",
                isActive
                  ? "bg-white/20 text-white"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {c.count}
            </span>
          </Link>
        );
      })}

      <div className="ml-auto">
        <NewCollectionDialog />
      </div>
    </div>
  );
}

function Separator() {
  return <span className="h-4 w-px bg-border" aria-hidden="true" />;
}

export function NewCollectionDialog() {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      toast.error("Enter a collection name");
      return;
    }
    toast.success(`Collection “${trimmed}” created`);
    setName("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5"
          aria-label="Create a new collection"
        >
          <FolderPlus className="size-4" />
          <span className="hidden sm:inline">New Collection</span>
          <span className="sm:hidden">New</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create a new collection</DialogTitle>
          <DialogDescription>
            Group your saved listings into a named collection so you can find
            them later.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="collection-name" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Collection name
            </Label>
            <Input
              id="collection-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Honeymoon Ideas"
              autoFocus
              autoComplete="off"
              maxLength={48}
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setOpen(false);
                setName("");
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-teal text-white hover:bg-teal/90"
              disabled={!name.trim()}
            >
              <Plus className="size-4" />
              Create collection
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ---------------------------------------------------------------------------
// Saved item actions — Remove + Move to Cart (client island)
// ---------------------------------------------------------------------------

export function SavedItemActions({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  const router = useRouter();
  const { refresh } = usePortalCounts();
  const [removing, setRemoving] = React.useState(false);
  const [moving, setMoving] = React.useState(false);

  const onRemove = async () => {
    setRemoving(true);
    try {
      const res = await fetch(`/api/saved/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Remove failed");
      toast.success("Removed from saved");
      router.refresh();
    } catch {
      toast.error("Could not remove item");
    } finally {
      setRemoving(false);
    }
  };

  const onMoveToCart = async () => {
    setMoving(true);
    try {
      const res = await fetch(`/api/saved/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "move-to-cart" }),
      });
      if (!res.ok) throw new Error("Move failed");
      const data = (await res.json()) as { ok?: boolean };
      if (!data.ok) throw new Error("Move failed");
      toast.success("Moved to cart");
      // Sync the cart count in the header
      void refresh();
      router.refresh();
    } catch {
      toast.error("Could not move item to cart");
    } finally {
      setMoving(false);
    }
  };

  const busy = removing || moving;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button asChild variant="outline" size="sm" className="gap-1.5">
        <Link href="#" aria-label={`View ${title}`}>
          <ExternalLink className="size-3.5" />
          View
        </Link>
      </Button>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="gap-1.5 hover:border-teal/40 hover:bg-teal/5 hover:text-teal"
        onClick={() => void onMoveToCart()}
        disabled={busy}
        aria-label={`Move ${title} to cart`}
      >
        {moving ? <Loader2 className="size-3.5 animate-spin" /> : <ShoppingCart className="size-3.5" />}
        Move to Cart
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="gap-1.5 text-muted-foreground hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/30"
        onClick={() => void onRemove()}
        disabled={busy}
        aria-label={`Remove ${title} from saved`}
      >
        {removing ? <Loader2 className="size-3.5 animate-spin" /> : <Trash2 className="size-3.5" />}
        Remove
      </Button>
    </div>
  );
}
