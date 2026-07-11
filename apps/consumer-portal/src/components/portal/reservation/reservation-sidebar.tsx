"use client";

import Link from "next/link";
import { toast } from "sonner";
import { Ban, MessageSquare, Download, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/constants";
import { CancelDialog } from "@/components/portal/reservation/cancel-dialog";

const CANCELLABLE_STATUSES = new Set(["Confirmed", "Pending", "Active"]);

/**
 * Sidebar for the reservation detail page. Renders the cancellation,
 * messaging and invoice actions. Server-side passed-in props only — no db.
 */
export function ReservationSidebar({
  reservationId,
  listingTitle,
  vendorName,
  total,
  status,
  startDate,
}: {
  reservationId: string;
  listingTitle: string;
  vendorName: string;
  total: number;
  status: string;
  startDate: string;
}) {
  const canCancel = CANCELLABLE_STATUSES.has(status);
  const refundEligible =
    canCancel && new Date(startDate).getTime() > Date.now();

  return (
    <Card className="sticky top-24 overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="font-display text-base font-600 text-navy">
          Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {canCancel ? (
          <CancelDialog
            reservationId={reservationId}
            listingTitle={listingTitle}
            total={total}
            trigger={
              <Button
                variant="outline"
                className="w-full border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700 dark:border-rose-900/60 dark:hover:bg-rose-950/40"
              >
                <Ban className="size-4" />
                Cancel Reservation
              </Button>
            }
          />
        ) : (
          <div
            className="rounded-md border border-dashed border-border bg-muted/40 px-3 py-2.5 text-center text-xs text-muted-foreground"
            role="status"
          >
            This reservation can no longer be cancelled.
          </div>
        )}

        <Button asChild variant="outline" className="w-full">
          <Link
            href={`/inbox?vendor=${encodeURIComponent(vendorName)}`}
            aria-label={`Message ${vendorName}`}
          >
            <MessageSquare className="size-4" />
            Message Vendor
          </Link>
        </Button>

        <Button
          variant="outline"
          className="w-full"
          onClick={() =>
            toast.success("Invoice downloaded", {
              description: `${listingTitle} · ${formatCurrency(total)}`,
            })
          }
        >
          <Download className="size-4" />
          Download Invoice
        </Button>

        <Separator />

        <div className="space-y-2 text-xs">
          <div className="flex items-start gap-2 text-muted-foreground">
            <ShieldCheck className="mt-0.5 size-3.5 shrink-0 text-teal" />
            <p>
              Bookings on Planviry are covered by our{" "}
              <Link
                href="/support"
                className="font-medium text-teal hover:underline"
              >
                Guest Protection
              </Link>{" "}
              policy.
            </p>
          </div>
          {refundEligible && (
            <p className="rounded-md bg-teal/5 px-2 py-1.5 text-teal">
              Eligible for full refund: {formatCurrency(total)}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
