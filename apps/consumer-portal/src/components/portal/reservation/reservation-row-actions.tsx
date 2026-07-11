"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  MoreHorizontal,
  Eye,
  Ban,
  MessageSquare,
  Download,
  CalendarPlus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CancelDialog } from "@/components/portal/reservation/cancel-dialog";

const CANCELLABLE_STATUSES = new Set(["Confirmed", "Pending", "Active"]);

export function ReservationRowActions({
  reservationId,
  listingTitle,
  vendorName,
  total,
  status,
}: {
  reservationId: string;
  listingTitle: string;
  vendorName: string;
  total: number;
  status: string;
}) {
  const [cancelOpen, setCancelOpen] = useState(false);
  const canCancel = CANCELLABLE_STATUSES.has(status);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="size-8"
            aria-label={`Actions for ${listingTitle}`}
          >
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-52">
          <DropdownMenuLabel className="text-xs text-muted-foreground">
            Reservation
          </DropdownMenuLabel>
          <DropdownMenuItem asChild>
            <Link href={`/reservations/${reservationId}`}>
              <Eye className="size-4" />
              View Detail
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              setCancelOpen(true);
            }}
            disabled={!canCancel}
            variant="destructive"
          >
            <Ban className="size-4" />
            Cancel
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href={`/inbox?vendor=${encodeURIComponent(vendorName)}`}>
              <MessageSquare className="size-4" />
              Message Vendor
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => toast.success("Invoice downloaded")}
          >
            <Download className="size-4" />
            Download Invoice
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/itineraries">
              <CalendarPlus className="size-4" />
              Add to Itinerary
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {canCancel && (
        <CancelDialog
          reservationId={reservationId}
          listingTitle={listingTitle}
          total={total}
          open={cancelOpen}
          onOpenChange={setCancelOpen}
        />
      )}
    </>
  );
}
