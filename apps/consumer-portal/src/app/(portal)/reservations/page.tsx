import Link from "next/link";
import { ClipboardList, Plus, SearchX } from "lucide-react";

import { db } from "@/lib/db";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { PageHeader } from "@/components/portal/page-header";
import { EmptyState } from "@/components/portal/empty-state";
import { StatusBadge } from "@/components/portal/status-badge";
import { VerticalBadge } from "@/components/portal/vertical";
import { ReservationsToolbar } from "@/components/portal/reservation/reservations-toolbar";
import { ReservationRowActions } from "@/components/portal/reservation/reservation-row-actions";
import {
  formatCurrency,
  formatDate,
  type Vertical,
} from "@/lib/constants";

export const dynamic = "force-dynamic";

const VALID_TABS = new Set(["all", "upcoming", "past", "cancelled"]);
const VALID_VERTICALS = new Set([
  "lodging",
  "tickets",
  "venue",
  "services",
  "dining",
  "transport",
]);

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

function dateRangeLabel(start: string, end?: string | null) {
  const startLabel = formatDate(start, { month: "short", day: "numeric", year: "numeric" });
  if (!end || end === start) return startLabel;
  const endDate = new Date(end);
  const startDate = new Date(start);
  const sameYear = startDate.getFullYear() === endDate.getFullYear();
  const endLabel = formatDate(
    end,
    sameYear
      ? { month: "short", day: "numeric" }
      : { month: "short", day: "numeric", year: "numeric" }
  );
  return `${startLabel} → ${endLabel}`;
}

export default async function ReservationsPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string; vertical?: string; q?: string }>;
}) {
  const sp = await searchParams;
  const tab = VALID_TABS.has(sp.tab ?? "") ? (sp.tab as string) : "all";
  const vertical =
    sp.vertical && VALID_VERTICALS.has(sp.vertical) ? sp.vertical : "all";
  const q = (sp.q ?? "").trim();

  const reservations = await db.reservation.findMany({
    orderBy: { startDate: "desc" },
  });

  const now = new Date().toISOString().slice(0, 10);
  let filtered = reservations;
  if (tab === "upcoming") {
    filtered = filtered.filter(
      (r) => r.startDate >= now && r.status !== "Cancelled"
    );
  } else if (tab === "past") {
    filtered = filtered.filter(
      (r) => r.startDate < now && r.status !== "Cancelled"
    );
  } else if (tab === "cancelled") {
    filtered = filtered.filter((r) => r.status === "Cancelled");
  }
  if (vertical !== "all") {
    filtered = filtered.filter((r) => r.vertical === vertical);
  }
  if (q) {
    const ql = q.toLowerCase();
    filtered = filtered.filter(
      (r) =>
        r.listingTitle.toLowerCase().includes(ql) ||
        r.id.toLowerCase().includes(ql) ||
        r.vendorName.toLowerCase().includes(ql)
    );
  }

  const hasFilters = tab !== "all" || vertical !== "all" || q !== "";

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reservations"
        description="Manage your bookings, cancellations and reviews"
        icon={ClipboardList}
        actions={
          <Button asChild className="bg-teal text-white hover:bg-teal/90">
            <Link href="/onboarding">
              <Plus className="size-4" />
              Plan a New Occasion
            </Link>
          </Button>
        }
      />

      <ReservationsToolbar
        tab={tab}
        vertical={vertical}
        q={q}
        count={filtered.length}
      />

      {filtered.length === 0 ? (
        <EmptyState
          icon={hasFilters ? SearchX : ClipboardList}
          title={hasFilters ? "No matching reservations" : "No reservations yet"}
          description={
            hasFilters
              ? "Try adjusting your filters or search query."
              : "When you check out from your cart, your reservations will appear here."
          }
          action={
            hasFilters ? (
              <Button asChild variant="outline">
                <Link href="/reservations">Clear filters</Link>
              </Button>
            ) : (
              <Button asChild className="bg-teal text-white hover:bg-teal/90">
                <Link href="/onboarding">
                  <Plus className="size-4" />
                  Plan a New Occasion
                </Link>
              </Button>
            )
          }
        />
      ) : (
        <>
          {/* Desktop table */}
          <Card className="hidden py-0 md:block">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40">
                  <TableHead className="pl-4">Listing</TableHead>
                  <TableHead>Vertical</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="pr-4 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((r) => (
                  <TableRow key={r.id} className="group">
                    <TableCell className="pl-4">
                      <Link
                        href={`/reservations/${r.id}`}
                        className="flex items-center gap-3"
                      >
                        {r.image ? (
                          <img
                            src={r.image}
                            alt=""
                            className="size-10 shrink-0 rounded-md object-cover"
                          />
                        ) : (
                          <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                            <ClipboardList className="size-4" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="line-clamp-1 font-medium text-navy group-hover:text-teal">
                            {r.listingTitle}
                          </p>
                          <p className="line-clamp-1 text-xs text-muted-foreground">
                            {r.vendorName} · #{r.id.slice(-6).toUpperCase()}
                          </p>
                        </div>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <VerticalBadge vertical={r.vertical as Vertical} />
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                      {dateRangeLabel(r.startDate, r.endDate)}
                    </TableCell>
                    <TableCell className="text-right font-600 text-navy">
                      {formatCurrency(r.total)}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={r.status} />
                    </TableCell>
                    <TableCell className="pr-4 text-right">
                      <ReservationRowActions
                        reservationId={r.id}
                        listingTitle={r.listingTitle}
                        vendorName={r.vendorName}
                        total={r.total}
                        status={r.status}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          {/* Mobile cards */}
          <div className="space-y-3 md:hidden">
            {filtered.map((r) => (
              <Card key={r.id} className="py-0">
                <CardContent className="flex flex-col gap-3 p-4">
                  <div className="flex items-start gap-3">
                    {r.image ? (
                      <img
                        src={r.image}
                        alt=""
                        className="size-14 shrink-0 rounded-md object-cover"
                      />
                    ) : (
                      <div className="flex size-14 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                        <ClipboardList className="size-5" />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <Link href={`/reservations/${r.id}`}>
                        <h3 className="line-clamp-2 font-display text-base font-600 leading-tight text-navy">
                          {r.listingTitle}
                        </h3>
                      </Link>
                      <div className="mt-1 flex items-center gap-2">
                        <Avatar className="size-5">
                          {r.vendorAvatar ? (
                            <AvatarImage src={r.vendorAvatar} alt="" />
                          ) : null}
                          <AvatarFallback className="text-[10px]">
                            {initials(r.vendorName)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="truncate text-xs text-muted-foreground">
                          {r.vendorName}
                        </span>
                      </div>
                    </div>
                    <ReservationRowActions
                      reservationId={r.id}
                      listingTitle={r.listingTitle}
                      vendorName={r.vendorName}
                      total={r.total}
                      status={r.status}
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <VerticalBadge vertical={r.vertical as Vertical} />
                    <StatusBadge status={r.status} />
                  </div>

                  <div className="flex items-center justify-between border-t border-border pt-3 text-sm">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                        Date
                      </p>
                      <p className="font-medium text-navy">
                        {dateRangeLabel(r.startDate, r.endDate)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                        Total
                      </p>
                      <p className="font-display font-700 text-navy">
                        {formatCurrency(r.total)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
