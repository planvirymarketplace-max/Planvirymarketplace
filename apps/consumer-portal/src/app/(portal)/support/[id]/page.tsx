import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  LifeBuoy,
  Tag,
  CalendarDays,
  Building2,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";

import { db } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

import { PageHeader } from "@/components/portal/page-header";
import { StatusBadge } from "@/components/portal/status-badge";
import { PriorityBadge } from "../_components/priority-badge";
import { TicketReplyBox } from "./_components/ticket-reply-box";
import { CloseTicketButton } from "./_components/close-ticket-button";
import { relativeTime, formatDate } from "@/lib/constants";

export const dynamic = "force-dynamic";

type Comment = {
  id: string;
  author: string;
  text: string;
  createdAt: string;
};

function toISO(d: Date | string): string {
  return d instanceof Date ? d.toISOString() : d;
}

export default async function TicketDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const ticket = await db.supportTicket.findUnique({
    where: { id },
    include: { comments: { orderBy: { createdAt: "asc" } } },
  });

  if (!ticket) notFound();

  const comments: Comment[] = ticket.comments.map((c) => ({
    id: c.id,
    author: c.author,
    text: c.text,
    createdAt: toISO(c.createdAt),
  }));

  const isClosed = ticket.status === "Closed";
  const createdAt = toISO(ticket.createdAt);
  const updatedAt = toISO(ticket.updatedAt);

  return (
    <div className="space-y-6">
      <div>
        <Button asChild variant="ghost" size="sm" className="-ml-2 gap-1 text-muted-foreground">
          <Link href="/support">
            <ArrowLeft className="size-4" />
            All tickets
          </Link>
        </Button>
      </div>

      <PageHeader
        title={ticket.subject}
        description={`Ticket #${ticket.id.slice(-6).toUpperCase()} · Created ${formatDate(
          createdAt,
          { month: "short", day: "numeric", year: "numeric" }
        )}`}
        icon={LifeBuoy}
        actions={<CloseTicketButton ticketId={ticket.id} closed={isClosed} />}
      />

      {/* Header badges row: status / priority / category / related reservation / created */}
      <Card className="bg-card/60">
        <CardContent className="flex flex-wrap items-center gap-x-4 gap-y-2 p-3.5 text-sm">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Status
            </span>
            <StatusBadge status={ticket.status} />
          </div>
          <Separator orientation="vertical" className="hidden h-5 sm:block" />
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Priority
            </span>
            <PriorityBadge priority={ticket.priority} />
          </div>
          <Separator orientation="vertical" className="hidden h-5 sm:block" />
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Category
            </span>
            <Badge
              variant="outline"
              className="rounded-full px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
            >
              {ticket.category}
            </Badge>
          </div>
          {ticket.relatedReservation && (
            <>
              <Separator orientation="vertical" className="hidden h-5 sm:block" />
              <div className="flex items-center gap-1.5">
                <Building2 className="size-3.5 text-muted-foreground" />
                <Link
                  href="/reservations"
                  className="text-sm font-medium text-teal hover:underline"
                >
                  {ticket.relatedReservation}
                </Link>
              </div>
            </>
          )}
          <div className="ml-auto flex items-center gap-1.5 text-xs text-muted-foreground">
            <CalendarDays className="size-3.5" />
            <span>Opened {formatDate(createdAt)}</span>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main: thread */}
        <div className="space-y-6 lg:col-span-2">
          {/* Conversation thread */}
          <Card className="flex flex-col">
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="flex items-center justify-between text-base font-600 text-navy">
                <span className="flex items-center gap-2">
                  <MessageSquare className="size-4 text-teal" />
                  Conversation
                </span>
                <span className="text-xs font-normal text-muted-foreground">
                  {comments.length} message{comments.length === 1 ? "" : "s"}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="max-h-[28rem]">
                <div className="space-y-4 p-4 sm:p-5">
                  {comments.map((c) => {
                    const isGuest = c.author === "guest";
                    return (
                      <div
                        key={c.id}
                        className={`flex gap-3 ${
                          isGuest ? "flex-row-reverse" : "flex-row"
                        }`}
                      >
                        <Avatar className="size-8 shrink-0 border border-border">
                          <AvatarFallback
                            className={
                              isGuest
                                ? "bg-teal text-[11px] font-semibold text-white"
                                : "bg-navy text-[11px] font-semibold text-white"
                            }
                          >
                            {isGuest ? "You" : "CS"}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={`max-w-[80%] ${
                            isGuest ? "items-end text-right" : "items-start"
                          } flex flex-col`}
                        >
                          <div
                            className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                              isGuest
                                ? "rounded-tr-sm bg-teal text-white"
                                : "rounded-tl-sm bg-muted text-foreground"
                            }`}
                          >
                            {c.text}
                          </div>
                          <span className="mt-1 px-1 text-[11px] text-muted-foreground">
                            {isGuest ? "You" : "Planviry Support"} ·{" "}
                            {relativeTime(c.createdAt)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                  {comments.length === 0 && (
                    <p className="py-8 text-center text-sm text-muted-foreground">
                      No messages yet.
                    </p>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Reply */}
          {!isClosed ? (
            <TicketReplyBox ticketId={ticket.id} />
          ) : (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center gap-2 py-8 text-center">
                <ShieldCheck className="size-6 text-muted-foreground" />
                <p className="text-sm font-medium text-navy">
                  This ticket is closed.
                </p>
                <p className="max-w-sm text-xs text-muted-foreground">
                  Need more help? Open a new ticket and our concierge team will
                  pick it up.
                </p>
                <Button asChild className="mt-2 bg-teal text-white hover:bg-teal/90">
                  <Link href="/support">Open a new ticket</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar: details */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-600 text-navy">
                Ticket details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <DetailRow icon={Tag} label="Category">
                <Badge
                  variant="outline"
                  className="rounded-full px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
                >
                  {ticket.category}
                </Badge>
              </DetailRow>
              <DetailRow icon={LifeBuoy} label="Status">
                <StatusBadge status={ticket.status} />
              </DetailRow>
              <DetailRow icon={LifeBuoy} label="Priority">
                <PriorityBadge priority={ticket.priority} />
              </DetailRow>
              {ticket.relatedReservation && (
                <DetailRow icon={Building2} label="Reservation">
                  <Link
                    href="/reservations"
                    className="text-sm font-medium text-teal hover:underline"
                  >
                    {ticket.relatedReservation}
                  </Link>
                </DetailRow>
              )}
              <DetailRow icon={CalendarDays} label="Created">
                <span className="text-sm text-muted-foreground">
                  {formatDate(createdAt)}
                </span>
              </DetailRow>
              <DetailRow icon={CalendarDays} label="Last update">
                <span className="text-sm text-muted-foreground">
                  {relativeTime(updatedAt)}
                </span>
              </DetailRow>
            </CardContent>
          </Card>

          {/* Description */}
          {ticket.description && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-600 text-navy">
                  Your description
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
                  {ticket.description}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Need more help */}
          <Card className="bg-navy text-white">
            <CardContent className="space-y-3 p-5">
              <h4 className="font-display text-sm font-600 text-white">
                Need urgent help?
              </h4>
              <p className="text-xs leading-relaxed text-white/70">
                For time-sensitive issues, reach our concierge line at{" "}
                <a
                  href="tel:+18005550100"
                  className="font-semibold text-teal hover:underline"
                >
                  +1 (800) 555-0100
                </a>{" "}
                — available 24/7.
              </p>
              <Separator className="bg-white/10" />
              <Button
                asChild
                variant="secondary"
                size="sm"
                className="w-full bg-white/10 text-white hover:bg-white/20"
              >
                <Link href="/inbox">Message a vendor</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function DetailRow({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Tag;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        <Icon className="size-3.5" />
        {label}
      </span>
      <div className="flex items-center">{children}</div>
    </div>
  );
}
