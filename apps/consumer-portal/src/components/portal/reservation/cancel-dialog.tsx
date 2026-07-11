"use client";

import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AlertTriangle, Loader2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
import { CANCEL_REASONS, formatCurrency } from "@/lib/constants";

const CONFIRM_TOKEN = "CANCEL";

/**
 * Reusable cancellation dialog. Can be used two ways:
 *  1. Uncontrolled — pass `trigger` and the dialog manages its own open state.
 *  2. Controlled — pass `open` + `onOpenChange` (used by row-actions dropdown).
 */
export function CancelDialog({
  reservationId,
  listingTitle,
  total,
  trigger,
  open,
  onOpenChange,
}: {
  reservationId: string;
  listingTitle: string;
  total: number;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const router = useRouter();
  const [reason, setReason] = useState<string>("");
  const [confirmText, setConfirmText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;
  const setOpen = isControlled ? onOpenChange! : setInternalOpen;

  const canConfirm =
    reason !== "" && confirmText.trim().toUpperCase() === CONFIRM_TOKEN;

  const reset = () => {
    setReason("");
    setConfirmText("");
    setSubmitting(false);
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) reset();
    setOpen(next);
  };

  const onConfirm = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!canConfirm || submitting) return;
    setSubmitting(true);
    try {
      const res = await fetch(`/api/reservations/${reservationId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "cancel" }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Could not cancel reservation");
      }
      toast.success("Reservation cancelled", {
        description: `${formatCurrency(total)} will be refunded to your original payment method.`,
      });
      handleOpenChange(false);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Cancellation failed");
      setSubmitting(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
      {trigger && <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-navy">
            <span className="flex size-7 items-center justify-center rounded-full bg-rose-100 text-rose-600 dark:bg-rose-950/40 dark:text-rose-300">
              <AlertTriangle className="size-4" />
            </span>
            Cancel this reservation?
          </AlertDialogTitle>
          <AlertDialogDescription asChild>
            <span>
              You&apos;re about to cancel{" "}
              <span className="font-semibold text-foreground">{listingTitle}</span>.
              A refund of{" "}
              <span className="font-semibold text-foreground">
                {formatCurrency(total)}
              </span>{" "}
              will be initiated to your original payment method. This action
              cannot be undone.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-4 py-1">
          <div className="space-y-2">
            <Label
              htmlFor={`cancel-reason-${reservationId}`}
              className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
            >
              Reason for cancellation
            </Label>
            <Select value={reason} onValueChange={setReason}>
              <SelectTrigger
                id={`cancel-reason-${reservationId}`}
                className="w-full"
                aria-label="Select cancellation reason"
              >
                <SelectValue placeholder="Choose a reason…" />
              </SelectTrigger>
              <SelectContent>
                {CANCEL_REASONS.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor={`cancel-confirm-${reservationId}`}
              className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
            >
              Type{" "}
              <span className="font-bold text-rose-600">{CONFIRM_TOKEN}</span>{" "}
              to confirm
            </Label>
            <Input
              id={`cancel-confirm-${reservationId}`}
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder={CONFIRM_TOKEN}
              autoComplete="off"
              autoCapitalize="characters"
              className="uppercase tracking-widest"
              aria-describedby={`cancel-confirm-help-${reservationId}`}
              disabled={submitting}
            />
            <p
              id={`cancel-confirm-help-${reservationId}`}
              className="text-[11px] text-muted-foreground"
            >
              This helps prevent accidental cancellations.
            </p>
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={submitting}>Keep it</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={!canConfirm || submitting}
            className="bg-rose-600 text-white shadow-sm hover:bg-rose-600/90 focus-visible:ring-rose-600/40"
          >
            {submitting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Cancelling…
              </>
            ) : (
              "Cancel reservation"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
