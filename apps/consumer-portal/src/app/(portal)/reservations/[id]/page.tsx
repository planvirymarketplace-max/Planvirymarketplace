import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ClipboardList,
  CalendarDays,
  Users,
  Ticket,
  Receipt,
  MessageSquare,
  Star,
} from "lucide-react";

import { db } from "@/lib/db";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

import { PageHeader } from "@/components/portal/page-header";
import { StatusBadge } from "@/components/portal/status-badge";
import { VerticalBadge } from "@/components/portal/vertical";
import { StarRating } from "@/components/portal/star-rating";
import { ReservationSidebar } from "@/components/portal/reservation/reservation-sidebar";
import { ReviewForm } from "@/components/portal/reservation/review-form";
import {
  formatCurrency,
  formatDate,
  type Vertical,
} from "@/lib/constants";

export const dynamic = "force-dynamic";

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

function DetailRow({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof CalendarDays;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 py-2.5">
      <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-teal/10 text-teal">
        <Icon className="size-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <div className="text-sm font-medium text-navy">{children}</div>
      </div>
    </div>
  );
}

function PriceRow({
  label,
  value,
  emphasis = false,
  hint,
}: {
  label: string;
  value: string;
  emphasis?: boolean;
  hint?: string;
}) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <div>
        <span
          className={
            emphasis
              ? "font-display font-600 text-navy"
              : "text-sm text-muted-foreground"
          }
        >
          {label}
        </span>
        {hint && (
          <span className="ml-1.5 text-[11px] text-muted-foreground/70">
            {hint}
          </span>
        )}
      </div>
      <span
        className={
          emphasis
            ? "font-display text-lg font-700 text-navy"
            : "text-sm font-medium text-navy"
        }
      >
        {value}
      </span>
    </div>
  );
}

export default async function ReservationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const r = await db.reservation.findUnique({ where: { id } });
  if (!r) notFound();

  const vertical = r.vertical as Vertical;
  const dateRangeLabel = r.endDate
    ? `${formatDate(r.startDate, { month: "short", day: "numeric", year: "numeric" })} → ${formatDate(r.endDate, { month: "short", day: "numeric", year: "numeric" })}`
    : formatDate(r.startDate, { month: "short", day: "numeric", year: "numeric" });
  const isCompleted = r.status === "Completed";
  const hasReview = isCompleted && r.reviewRating != null && r.reviewRating > 0;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reservation Details"
        description={`#${r.id.slice(-8).toUpperCase()} · ${r.listingTitle}`}
        icon={ClipboardList}
        actions={
          <Button asChild variant="ghost" size="sm">
            <Link href="/reservations">
              <ArrowLeft className="size-4" />
              Back to list
            </Link>
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main column */}
        <div className="space-y-6 lg:col-span-2">
          {/* Hero */}
          <Card className="overflow-hidden py-0">
            <div className="relative h-56 w-full bg-muted">
              {r.image ? (
                <img
                  src={r.image}
                  alt={r.listingTitle}
                  className="size-full object-cover"
                />
              ) : (
                <div className="flex size-full items-center justify-center text-muted-foreground">
                  <ClipboardList className="size-10" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/10 to-transparent" />
              <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2">
                <VerticalBadge vertical={vertical} />
                <StatusBadge status={r.status} />
              </div>
            </div>
            <CardContent className="space-y-3 p-5">
              <h1 className="font-display text-2xl font-700 tracking-tight text-navy">
                {r.listingTitle}
              </h1>
              <Link
                href={`/inbox?vendor=${encodeURIComponent(r.vendorName)}`}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-teal"
              >
                <Avatar className="size-7">
                  {r.vendorAvatar ? (
                    <AvatarImage src={r.vendorAvatar} alt="" />
                  ) : null}
                  <AvatarFallback className="text-[10px]">
                    {initials(r.vendorName)}
                  </AvatarFallback>
                </Avatar>
                <span>
                  by <span className="font-medium text-navy">{r.vendorName}</span>
                </span>
              </Link>
            </CardContent>
          </Card>

          {/* Booking details */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 font-display text-base font-600 text-navy">
                <CalendarDays className="size-4 text-teal" />
                Booking Details
              </CardTitle>
            </CardHeader>
            <CardContent className="divide-y divide-border pt-0">
              <DetailRow icon={CalendarDays} label="Dates">
                {dateRangeLabel}
              </DetailRow>
              <DetailRow icon={Ticket} label="Quantity">
                {r.quantity} {r.quantity === 1 ? "unit" : "units"}
              </DetailRow>
              <DetailRow icon={Users} label="Guests">
                {r.guests} {r.guests === 1 ? "guest" : "guests"}
              </DetailRow>
              {r.itineraryId && (
                <div className="flex items-start gap-3 py-2.5">
                  <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-teal/10 text-teal">
                    <ClipboardList className="size-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                      Attached itinerary
                    </p>
                    <Link
                      href={`/itineraries/${r.itineraryId}`}
                      className="text-sm font-medium text-teal hover:underline"
                    >
                      View itinerary →
                    </Link>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Price breakdown */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 font-display text-base font-600 text-navy">
                <Receipt className="size-4 text-teal" />
                Price Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <PriceRow
                label="Subtotal"
                hint={`×${r.quantity}`}
                value={formatCurrency(r.subtotal)}
              />
              <PriceRow
                label="Service fee"
                value={formatCurrency(r.fees)}
              />
              <PriceRow label="Tax" value={formatCurrency(r.tax)} />
              <Separator className="my-2" />
              <PriceRow
                label="Total charged"
                value={formatCurrency(r.total)}
                emphasis
              />
            </CardContent>
          </Card>

          {/* Leave review / existing review */}
          {isCompleted && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 font-display text-base font-600 text-navy">
                  <Star className="size-4 text-amber-400" />
                  {hasReview ? "Your Review" : "Leave a Review"}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                {hasReview ? (
                  <div className="space-y-3">
                    <StarRating value={r.reviewRating ?? 0} size="lg" />
                    {r.reviewText ? (
                      <blockquote className="border-l-2 border-teal/40 bg-muted/30 px-4 py-2 text-sm italic text-navy">
                        “{r.reviewText}”
                      </blockquote>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        You rated this reservation but didn&apos;t leave a written
                        review.
                      </p>
                    )}
                    <p className="text-[11px] text-muted-foreground">
                      Submitted after your trip · rating{" "}
                      {r.reviewRating ?? 0}/5
                    </p>
                  </div>
                ) : (
                  <ReviewForm
                    reservationId={r.id}
                    listingTitle={r.listingTitle}
                  />
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <ReservationSidebar
            reservationId={r.id}
            listingTitle={r.listingTitle}
            vendorName={r.vendorName}
            total={r.total}
            status={r.status}
            startDate={r.startDate}
          />

          <Card className="mt-4">
            <CardHeader className="pb-2">
              <CardTitle className="font-display text-sm font-600 text-navy">
                Need help?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 pt-0 text-sm">
              <p className="text-muted-foreground">
                Something not right with this booking? Reach out to concierge or
                the vendor directly.
              </p>
              <div className="flex flex-wrap gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link href="/support">
                    <MessageSquare className="size-3.5" />
                    Contact Support
                  </Link>
                </Button>
                <Button asChild variant="ghost" size="sm">
                  <Link
                    href={`/inbox?vendor=${encodeURIComponent(r.vendorName)}`}
                  >
                    Message {r.vendorName.split(" ")[0]}
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
