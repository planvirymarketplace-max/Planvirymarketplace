"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  CreditCard,
  Plus,
  Trash2,
  Lock,
  Loader2,
  ShieldCheck,
  Star,
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
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { CardBrandBadge } from "./card-brand-badge";

export type PaymentMethod = {
  id: string;
  brand: string;
  last4: string;
  expiry: string;
  isDefault: boolean;
  createdAt: string | Date;
};

const MAX_CARDS = 5;

/** Derive brand from the first digit of the card number. */
function deriveBrand(num: string): string {
  const first = (num.replace(/\s/g, "") || "").charAt(0);
  switch (first) {
    case "4":
      return "visa";
    case "5":
      return "mastercard";
    case "3":
      return "amex";
    case "6":
      return "discover";
    default:
      return "visa";
  }
}

function sanitizeDigits(value: string, max: number): string {
  return value.replace(/\D/g, "").slice(0, max);
}

function formatCardNumber(value: string): string {
  const digits = sanitizeDigits(value, 19);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(value: string): string {
  const digits = sanitizeDigits(value, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export function PaymentMethodsCard({
  methods,
}: {
  methods: PaymentMethod[];
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const count = methods.length;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-3 space-y-0">
        <div>
          <CardTitle className="flex items-center gap-2 text-base font-600 text-navy">
            <CreditCard className="size-4 text-teal" />
            Payment Methods
          </CardTitle>
          <p className="mt-1 text-xs text-muted-foreground">
            <span
              className={
                count >= MAX_CARDS
                  ? "font-semibold text-rose-600"
                  : "text-muted-foreground"
              }
            >
              {count} / {MAX_CARDS} cards
            </span>
            {" — "}saved cards on file
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-teal text-white hover:bg-teal/90"
              size="sm"
              disabled={count >= MAX_CARDS}
              aria-label="Add a new payment method"
            >
              <Plus className="size-4" />
              <span className="hidden sm:inline">Add Payment Method</span>
              <span className="sm:hidden">Add</span>
            </Button>
          </DialogTrigger>
          <AddCardDialogContent
            isOnly={count === 0}
            onDone={() => {
              setOpen(false);
              router.refresh();
            }}
          />
        </Dialog>
      </CardHeader>
      <CardContent className="space-y-3">
        {methods.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border px-6 py-10 text-center">
            <CreditCard className="size-7 text-muted-foreground" />
            <p className="mt-2 text-sm font-medium text-navy">
              No payment methods yet
            </p>
            <p className="mt-1 max-w-xs text-xs text-muted-foreground">
              Add a card to speed up checkout on future occasions.
            </p>
          </div>
        ) : (
          methods.map((m) => <PaymentMethodRow key={m.id} method={m} />)
        )}
      </CardContent>
    </Card>
  );
}

function PaymentMethodRow({ method }: { method: PaymentMethod }) {
  const router = useRouter();
  const [removing, startRemove] = useTransition();
  const [toggling, startToggle] = useTransition();
  const [confirmOpen, setConfirmOpen] = useState(false);

  function setDefault(next: boolean) {
    if (!next || method.isDefault) return;
    startToggle(async () => {
      try {
        const res = await fetch(`/api/payments/methods/${method.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isDefault: true }),
        });
        if (!res.ok) throw new Error("Failed to set default");
        toast.success("Default payment method updated");
        router.refresh();
      } catch {
        toast.error("Could not update default card");
      }
    });
  }

  function remove() {
    startRemove(async () => {
      try {
        const res = await fetch(`/api/payments/methods/${method.id}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error("Failed to remove card");
        toast.success("Payment method removed");
        setConfirmOpen(false);
        router.refresh();
      } catch {
        toast.error("Could not remove card");
      }
    });
  }

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-card/60 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <CardBrandBadge brand={method.brand} />
        <div>
          <div className="flex items-center gap-2">
            <span className="font-display text-sm font-600 tracking-wide text-navy">
              •••• {method.last4}
            </span>
            {method.isDefault && (
              <Badge
                variant="secondary"
                className="gap-1 bg-teal/10 text-teal"
              >
                <Star className="size-3" />
                Default
              </Badge>
            )}
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Expires {method.expiry}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <label className="flex cursor-pointer items-center gap-2 text-xs text-muted-foreground">
          <Switch
            checked={method.isDefault}
            disabled={method.isDefault || toggling}
            onCheckedChange={setDefault}
            aria-label={`Set card ending ${method.last4} as default`}
          />
          <span className="hidden sm:inline">Set as default</span>
          {toggling && <Loader2 className="size-3 animate-spin" />}
        </label>
        <Separator orientation="vertical" className="hidden h-6 sm:block" />
        <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
          <Button
            size="sm"
            variant="ghost"
            className="text-rose-600 hover:bg-rose-50 hover:text-rose-700"
            onClick={() => setConfirmOpen(true)}
            disabled={removing}
            aria-label={`Remove card ending ${method.last4}`}
          >
            <Trash2 className="size-4" />
            <span className="hidden sm:inline">Remove</span>
          </Button>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Remove this card?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently remove the card ending{" "}
                <span className="font-semibold text-navy">
                  {method.last4}
                </span>{" "}
                from your account. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={removing}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={remove}
                disabled={removing}
                className="bg-rose-600 text-white hover:bg-rose-700"
              >
                {removing && <Loader2 className="size-4 animate-spin" />}
                Remove card
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

function AddCardDialogContent({
  isOnly,
  onDone,
}: {
  isOnly: boolean;
  onDone: () => void;
}) {
  const [number, setNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [zip, setZip] = useState("");
  const [submitting, startSubmit] = useTransition();

  const brand = deriveBrand(number);
  const digits = number.replace(/\D/g, "");
  const valid =
    digits.length >= 13 &&
    digits.length <= 19 &&
    /^\d{2}\/\d{2}$/.test(expiry) &&
    cvc.length >= 3 &&
    zip.length >= 5;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid || submitting) return;
    startSubmit(async () => {
      try {
        const last4 = digits.slice(-4);
        const res = await fetch("/api/payments/methods", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            brand,
            last4,
            expiry,
            isDefault: isOnly,
          }),
        });
        if (!res.ok) {
          const data = (await res.json().catch(() => null)) as
            | { error?: string }
            | null;
          throw new Error(data?.error || "Failed to add card");
        }
        toast.success("Payment method added");
        setNumber("");
        setExpiry("");
        setCvc("");
        setZip("");
        onDone();
      } catch (err) {
        toast.error(
          err instanceof Error ? err.message : "Could not add card"
        );
      }
    });
  }

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 font-display text-navy">
          <CreditCard className="size-4 text-teal" />
          Add a payment method
        </DialogTitle>
        <DialogDescription>
          Enter your card details. This is a sandbox — no real charges are
          made.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={submit} className="space-y-4">
        {/* Card number with live brand preview */}
        <div className="space-y-1.5">
          <Label htmlFor="card-number">Card number</Label>
          <div className="relative">
            <Input
              id="card-number"
              inputMode="numeric"
              autoComplete="cc-number"
              placeholder="4242 4242 4242 4242"
              value={number}
              onChange={(e) => setNumber(formatCardNumber(e.target.value))}
              className="pr-24"
              aria-describedby="card-brand-preview"
            />
            {digits.length >= 4 && (
              <div
                id="card-brand-preview"
                className="absolute top-1/2 right-2 -translate-y-1/2"
              >
                <CardBrandBadge brand={brand} />
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="card-expiry">Expiry</Label>
            <Input
              id="card-expiry"
              inputMode="numeric"
              autoComplete="cc-exp"
              placeholder="MM/YY"
              value={expiry}
              onChange={(e) => setExpiry(formatExpiry(e.target.value))}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="card-cvc">CVC</Label>
            <Input
              id="card-cvc"
              inputMode="numeric"
              autoComplete="cc-csc"
              placeholder="123"
              value={cvc}
              onChange={(e) => setCvc(sanitizeDigits(e.target.value, 4))}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="card-zip">Billing ZIP</Label>
          <Input
            id="card-zip"
            inputMode="numeric"
            autoComplete="postal-code"
            placeholder="78701"
            value={zip}
            onChange={(e) => setZip(sanitizeDigits(e.target.value, 5))}
          />
        </div>

        <div className="flex items-center gap-2 rounded-lg bg-teal/5 px-3 py-2 text-xs text-teal">
          <ShieldCheck className="size-3.5" />
          <span>
            <span className="font-semibold">Secured by Stripe.</span> Your
            card details are encrypted and never stored on our servers.
          </span>
        </div>

        <DialogFooter>
          <Button
            type="submit"
            className="bg-teal text-white hover:bg-teal/90"
            disabled={!valid || submitting}
          >
            {submitting ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Lock className="size-4" />
            )}
            Add card
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
