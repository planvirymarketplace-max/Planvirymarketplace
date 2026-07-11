import Link from "next/link";
import {
  LifeBuoy,
  ChevronRight,
  MessageSquare,
  ClipboardList,
  CreditCard,
} from "lucide-react";

import { db } from "@/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { PageHeader } from "@/components/portal/page-header";
import { EmptyState } from "@/components/portal/empty-state";
import { StatusBadge } from "@/components/portal/status-badge";
import { relativeTime } from "@/lib/constants";
import { NewTicketDialog } from "./_components/new-ticket-dialog";
import { PriorityBadge } from "./_components/priority-badge";

export const dynamic = "force-dynamic";

export default async function SupportPage() {
  const [tickets, reservations] = await Promise.all([
    db.supportTicket.findMany({
      include: { comments: { orderBy: { createdAt: "asc" } } },
      orderBy: { createdAt: "desc" },
    }),
    db.reservation.findMany({
      select: { id: true, listingTitle: true },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const openCount = tickets.filter(
    (t) => t.status === "Open" || t.status === "InProgress"
  ).length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Support"
        description={
          openCount > 0
            ? `${openCount} active ticket${openCount === 1 ? "" : "s"} · We typically reply within a few hours.`
            : "Get help with your bookings, payments, and account."
        }
        icon={LifeBuoy}
        actions={<NewTicketDialog reservations={reservations} />}
      />

      {/* Quick help row */}
      <div className="grid gap-3 sm:grid-cols-3">
        <QuickHelp
          icon="book"
          title="Booking issues"
          href="/reservations"
          cta="View reservations"
        />
        <QuickHelp
          icon="card"
          title="Payment & refunds"
          href="/payments"
          cta="Go to payments"
        />
        <QuickHelp
          icon="chat"
          title="Message a vendor"
          href="/inbox"
          cta="Open inbox"
        />
      </div>

      {tickets.length === 0 ? (
        <EmptyState
          icon={LifeBuoy}
          title="No support tickets yet"
          description="If something comes up — a booking issue, a refund question, or anything else — our concierge team is here to help."
          action={<NewTicketDialog reservations={reservations} />}
        />
      ) : (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {tickets.length} ticket{tickets.length === 1 ? "" : "s"} total
            </p>
          </div>
          {tickets.map((t) => {
            const lastComment = t.comments[t.comments.length - 1];
            const isClosed = t.status === "Closed";
            return (
              <Link
                key={t.id}
                href={`/support/${t.id}`}
                className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl"
              >
                <Card
                  className={`transition-all hover:-translate-y-0.5 hover:shadow-md ${
                    isClosed ? "opacity-75" : ""
                  }`}
                >
                  <CardContent className="flex items-start gap-3 p-4 sm:p-5">
                    {/* Avatar */}
                    <Avatar className="size-10 shrink-0 border border-border">
                      <AvatarFallback className="bg-teal/10 text-xs font-semibold text-teal">
                        <LifeBuoy className="size-4" />
                      </AvatarFallback>
                    </Avatar>

                    {/* Body */}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="line-clamp-1 font-display text-base font-600 text-navy group-hover:text-teal">
                          {t.subject}
                        </h3>
                        <Badge
                          variant="outline"
                          className="rounded-full px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
                        >
                          {t.category}
                        </Badge>
                      </div>

                      <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                        {t.description || (lastComment?.text ?? "No description")}
                      </p>

                      {/* Meta row */}
                      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        <StatusBadge status={t.status} />
                        <PriorityBadge priority={t.priority} />
                        {t.relatedReservation && (
                          <span className="rounded-full bg-muted px-2 py-0.5 font-medium">
                            {t.relatedReservation}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <MessageSquare className="size-3.5" />
                          {t.comments.length} comment
                          {t.comments.length === 1 ? "" : "s"}
                        </span>
                        <span aria-hidden>·</span>
                        <span>
                          Updated {relativeTime(t.updatedAt)}
                        </span>
                      </div>
                    </div>

                    {/* Chevron */}
                    <ChevronRight className="hidden size-5 shrink-0 self-center text-muted-foreground transition-transform group-hover:translate-x-0.5 sm:block" />
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

function QuickHelp({
  icon,
  title,
  href,
  cta,
}: {
  icon: "book" | "card" | "chat";
  title: string;
  href: string;
  cta: string;
}) {
  const Icon =
    icon === "book" ? ClipboardList : icon === "card" ? CreditCard : MessageSquare;
  return (
    <Card className="transition-all hover:-translate-y-0.5 hover:shadow-sm">
      <CardContent className="flex items-center gap-3 p-4">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-teal/10 text-teal">
          <Icon className="size-4" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-600 text-navy">{title}</p>
          <Link
            href={href}
            className="text-xs font-medium text-teal hover:underline"
          >
            {cta} →
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
