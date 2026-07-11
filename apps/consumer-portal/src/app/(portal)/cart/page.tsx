"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  Clock,
  Lock,
  Tag,
  ArrowRight,
  CalendarPlus,
  AlertCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { PageHeader } from "@/components/portal/page-header";
import { EmptyState } from "@/components/portal/empty-state";
import { VerticalBadge } from "@/components/portal/vertical";
import { usePortalCounts } from "@/hooks/use-portal-data";
import {
  PROMO_CODES,
  SERVICE_FEE_RATE,
  TAX_RATE,
  formatCurrency,
  type Vertical,
} from "@/lib/constants";

type CartItem = {
  id: string;
  listingId: string;
  title: string;
  vendorName: string;
  vertical: Vertical;
  price: number;
  quantity: number;
  image: string | null;
  expiresAt: string | null;
};

type Itinerary = {
  id: string;
  title: string;
  city: string;
  startDate: string;
  status: string;
};

const round2 = (n: number) => Math.round(n * 100) / 100;

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

/** Live TTL countdown for a cart item. */
function useTTL(expiresAt: string | null) {
  // `now` is updated every second by an interval; `remaining` is derived
  // during render so we never call setState synchronously inside the effect.
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!expiresAt) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [expiresAt]);

  if (!expiresAt) return { active: false, expired: false, label: "" };
  const remaining = new Date(expiresAt).getTime() - now;
  if (remaining <= 0) return { active: false, expired: true, label: "Expired" };
  const totalSec = Math.floor(remaining / 1000);
  const mm = Math.floor(totalSec / 60);
  const ss = totalSec % 60;
  return { active: true, expired: false, label: `${pad(mm)}:${pad(ss)}` };
}

function CartItemRow({
  item,
  onQuantity,
  onRemove,
  busyId,
}: {
  item: CartItem;
  onQuantity: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  busyId: string | null;
}) {
  const ttl = useTTL(item.expiresAt);
  const disabled = busyId === item.id || ttl.expired;
  const lineTotal = item.price * item.quantity;

  return (
    <Card className="overflow-hidden py-0">
      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
        {/* Thumbnail */}
        <div className="relative shrink-0">
          {item.image ? (
            <img
              src={item.image}
              alt={item.title}
              className="size-16 rounded-lg object-cover"
            />
          ) : (
            <div className="flex size-16 items-center justify-center rounded-lg bg-muted text-muted-foreground">
              <ShoppingCart className="size-5" />
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
              </p>
            </div>
            <VerticalBadge vertical={item.vertical} />
          </div>

          {/* TTL countdown */}
          {item.expiresAt && (
            <div
              className={`mt-2 inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-semibold ${
                ttl.expired
                  ? "bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-300"
                  : "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-300"
              }`}
              role="timer"
              aria-live="polite"
            >
              <Clock className="size-3" />
              {ttl.expired
                ? "Expired"
                : `Item expires in ${ttl.label}`}
            </div>
          )}

          {/* Controls */}
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-md border border-border">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-r-none"
                onClick={() => onQuantity(item.id, Math.max(1, item.quantity - 1))}
                disabled={disabled || item.quantity <= 1}
                aria-label="Decrease quantity"
              >
                <Minus className="size-3.5" />
              </Button>
              <span
                className="min-w-[2ch] text-center text-sm font-semibold tabular-nums text-navy"
                aria-label={`Quantity ${item.quantity}`}
              >
                {item.quantity}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-l-none"
                onClick={() => onQuantity(item.id, item.quantity + 1)}
                disabled={disabled}
                aria-label="Increase quantity"
              >
                <Plus className="size-3.5" />
              </Button>
            </div>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30"
              onClick={() => onRemove(item.id)}
              disabled={busyId === item.id}
            >
              <Trash2 className="size-4" />
              Remove
            </Button>

            <div className="ml-auto text-right">
              <p className="text-xs text-muted-foreground">
                {formatCurrency(item.price)} each
              </p>
              <p className="font-display text-lg font-700 text-navy">
                {formatCurrency(lineTotal)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

function CartItemSkeleton() {
  return (
    <Card className="py-0">
      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
        <Skeleton className="size-16 shrink-0 rounded-lg" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-3 w-1/3" />
          <div className="flex items-center gap-3 pt-2">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
        <Skeleton className="h-10 w-20" />
      </div>
    </Card>
  );
}

export default function CartPage() {
  const router = useRouter();
  const { refresh } = usePortalCounts();

  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  // Promo code state
  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);

  // Itinerary selector state
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [selectedItinerary, setSelectedItinerary] = useState<string>("");

  const [checkingOut, setCheckingOut] = useState(false);
  const fetchedItins = useRef(false);

  const fetchCart = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/cart", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to load cart");
      const data = await res.json();
      setItems((data.items ?? []) as CartItem[]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load your cart");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchCart();
  }, [fetchCart]);

  // Lazily fetch itineraries when the user opens the select
  const ensureItineraries = useCallback(async () => {
    if (fetchedItins.current) return;
    fetchedItins.current = true;
    try {
      const res = await fetch("/api/itineraries", { cache: "no-store" });
      if (!res.ok) return;
      const data = (await res.json()) as Itinerary[];
      setItineraries(data);
    } catch {
      /* ignore */
    }
  }, []);

  // ----- Local derived totals (apply promo to subtotal before fees/tax) -----
  const activeItems = useMemo(
    () => items.filter((i) => !i.expiresAt || new Date(i.expiresAt).getTime() > Date.now()),
    [items]
  );

  const subtotal = useMemo(
    () => activeItems.reduce((s, i) => s + i.price * i.quantity, 0),
    [activeItems]
  );

  const promoRate = appliedPromo ? PROMO_CODES[appliedPromo] ?? 0 : 0;
  const discount = round2(subtotal * promoRate);
  const discountedSubtotal = round2(subtotal - discount);
  const fee = round2(discountedSubtotal * SERVICE_FEE_RATE);
  const tax = round2(discountedSubtotal * TAX_RATE);
  const total = round2(discountedSubtotal + fee + tax);

  // ----- Mutations -----
  const onQuantity = useCallback(
    async (id: string, quantity: number) => {
      // Optimistic update
      setItems((prev) =>
        prev.map((it) => (it.id === id ? { ...it, quantity } : it))
      );
      setBusyId(id);
      try {
        const res = await fetch(`/api/cart/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity }),
        });
        if (!res.ok) throw new Error("Update failed");
        void refresh();
      } catch {
        toast.error("Could not update quantity");
        // Revert
        void fetchCart();
      } finally {
        setBusyId(null);
      }
    },
    [fetchCart, refresh]
  );

  const onRemove = useCallback(
    async (id: string) => {
      const prev = items;
      setItems((p) => p.filter((it) => it.id !== id));
      setBusyId(id);
      try {
        const res = await fetch(`/api/cart/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Delete failed");
        toast.success("Item removed from cart");
        void refresh();
      } catch {
        toast.error("Could not remove item");
        setItems(prev);
      } finally {
        setBusyId(null);
      }
    },
    [items, refresh]
  );

  const onClearAll = useCallback(async () => {
    const prev = items;
    setItems([]);
    try {
      const res = await fetch("/api/cart", { method: "DELETE" });
      if (!res.ok) throw new Error("Clear failed");
      toast.success("Cart cleared");
      void refresh();
    } catch {
      toast.error("Could not clear cart");
      setItems(prev);
    }
  }, [items, refresh]);

  const onApplyPromo = useCallback(() => {
    const code = promoInput.trim().toUpperCase();
    if (!code) {
      toast.error("Enter a promo code");
      return;
    }
    if (!(code in PROMO_CODES)) {
      toast.error("Invalid promo code");
      return;
    }
    setAppliedPromo(code);
    toast.success(`Promo code ${code} applied — ${Math.round(PROMO_CODES[code] * 100)}% off`);
  }, [promoInput]);

  const onRemovePromo = useCallback(() => {
    setAppliedPromo(null);
    setPromoInput("");
  }, []);

  const onCheckout = useCallback(async () => {
    if (activeItems.length === 0) {
      toast.error("Your cart has no active items to checkout");
      return;
    }
    setCheckingOut(true);
    try {
      const res = await fetch("/api/cart/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itineraryId: selectedItinerary || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.message || "Checkout failed");
      }
      toast.success("Checkout complete! Reservations confirmed.");
      void refresh();
      router.push("/reservations");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Checkout failed");
    } finally {
      setCheckingOut(false);
    }
  }, [activeItems.length, selectedItinerary, refresh, router]);

  // ----- Render -----
  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Shopping Cart"
          description="Review your selections and check out when ready"
          icon={ShoppingCart}
        />
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-3 lg:col-span-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <CartItemSkeleton key={i} />
            ))}
          </div>
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <Skeleton className="h-5 w-32" />
              </CardHeader>
              <CardContent className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Shopping Cart"
          description="Review your selections and check out when ready"
          icon={ShoppingCart}
        />
        <Card className="border-rose-200 dark:border-rose-900">
          <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
            <AlertCircle className="size-8 text-rose-500" />
            <div>
              <p className="font-display font-600 text-navy">
                We couldn&apos;t load your cart
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{error}</p>
            </div>
            <Button onClick={() => void fetchCart()} className="bg-teal text-white hover:bg-teal/90">
              Try again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Shopping Cart"
          description="Review your selections and check out when ready"
          icon={ShoppingCart}
        />
        <EmptyState
          icon={ShoppingCart}
          title="Your cart is empty"
          description="Browse available services and add them to your cart."
          action={
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button asChild className="bg-teal text-white hover:bg-teal/90">
                <Link href="/saved">Browse Saved</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/onboarding">
                  <CalendarPlus className="size-4" />
                  Plan a New Occasion
                </Link>
              </Button>
            </div>
          }
        />
      </div>
    );
  }

  const itemCount = items.length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Shopping Cart"
        description={
          itemCount === 1 ? "1 item in your cart" : `${itemCount} items in your cart`
        }
        icon={ShoppingCart}
        actions={
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30"
            onClick={() => void onClearAll()}
          >
            <Trash2 className="size-4" />
            Clear cart
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* LEFT — Cart items list */}
        <div className="space-y-3 lg:col-span-2">
          {items.map((item) => (
            <CartItemRow
              key={item.id}
              item={item}
              onQuantity={onQuantity}
              onRemove={onRemove}
              busyId={busyId}
            />
          ))}

          <div className="flex items-center justify-between pt-2">
            <Button asChild variant="ghost" size="sm">
              <Link href="/saved">
                Continue browsing
                <ArrowRight className="size-3.5" />
              </Link>
            </Button>
            <span className="text-xs text-muted-foreground">
              Prices include taxes &amp; fees at checkout
            </span>
          </div>
        </div>

        {/* RIGHT — Summary + checkout */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader className="pb-3">
              <CardTitle className="font-display text-lg font-600 text-navy">
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Price breakdown */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium text-navy">
                    {formatCurrency(subtotal)}
                  </span>
                </div>

                {appliedPromo && discount > 0 && (
                  <div className="flex items-center justify-between text-teal">
                    <span className="inline-flex items-center gap-1.5 font-medium">
                      <Tag className="size-3.5" />
                      {appliedPromo} (-{Math.round(promoRate * 100)}%)
                    </span>
                    <span className="font-medium">-{formatCurrency(discount)}</span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    Service fee ({Math.round(SERVICE_FEE_RATE * 100)}%)
                  </span>
                  <span className="font-medium text-navy">{formatCurrency(fee)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    Tax ({Math.round(TAX_RATE * 1000) / 10}%)
                  </span>
                  <span className="font-medium text-navy">{formatCurrency(tax)}</span>
                </div>
              </div>

              <Separator />

              <div className="flex items-end justify-between">
                <span className="font-display text-base font-600 text-navy">Total</span>
                <span className="font-display text-2xl font-700 text-navy">
                  {formatCurrency(total)}
                </span>
              </div>

              {/* Promo code */}
              <div className="space-y-2">
                <Label htmlFor="promo" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Promo code
                </Label>
                {appliedPromo ? (
                  <div className="flex items-center justify-between rounded-md border border-teal/40 bg-teal/5 px-3 py-2">
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal">
                      <Tag className="size-3.5" />
                      {appliedPromo}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-muted-foreground hover:text-rose-600"
                      onClick={onRemovePromo}
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Input
                      id="promo"
                      placeholder="e.g. WELCOME10"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          onApplyPromo();
                        }
                      }}
                      className="h-9 uppercase"
                      autoComplete="off"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={onApplyPromo}
                      className="shrink-0"
                    >
                      Apply
                    </Button>
                  </div>
                )}
              </div>

              {/* Add to itinerary */}
              <div className="space-y-2">
                <Label
                  htmlFor="itinerary"
                  className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                >
                  Add to itinerary
                </Label>
                <Select
                  value={selectedItinerary}
                  onValueChange={setSelectedItinerary}
                  onOpenChange={(open) => {
                    if (open) void ensureItineraries();
                  }}
                >
                  <SelectTrigger id="itinerary" className="w-full">
                    <SelectValue placeholder="Select an itinerary" />
                  </SelectTrigger>
                  <SelectContent>
                    {itineraries.length === 0 && (
                      <div className="px-2 py-1.5 text-xs text-muted-foreground">
                        Loading…
                      </div>
                    )}
                    {itineraries.map((it) => (
                      <SelectItem key={it.id} value={it.id}>
                        <span className="flex items-center gap-2">
                          <span className="truncate">{it.title}</span>
                          <span className="text-xs text-muted-foreground">
                            · {it.city}
                          </span>
                        </span>
                      </SelectItem>
                    ))}
                    <SelectSeparator />
                    <SelectItem value="__create__">
                      <span className="flex items-center gap-2 text-teal">
                        <CalendarPlus className="size-4" />
                        Create new itinerary
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
                {selectedItinerary === "__create__" && (
                  <p className="text-xs text-muted-foreground">
                    You&apos;ll be taken to{" "}
                    <Link href="/onboarding" className="font-medium text-teal hover:underline">
                      the onboarding flow
                    </Link>{" "}
                    after checkout.
                  </p>
                )}
              </div>

              <Button
                type="button"
                size="lg"
                className="w-full bg-teal text-white shadow-sm hover:bg-teal/90"
                onClick={() => void onCheckout()}
                disabled={checkingOut || activeItems.length === 0}
              >
                {checkingOut ? "Processing…" : "Complete Checkout"}
                {!checkingOut && <ArrowRight className="size-4" />}
              </Button>

              <p className="flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
                <Lock className="size-3" />
                You won&apos;t be charged until checkout
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
