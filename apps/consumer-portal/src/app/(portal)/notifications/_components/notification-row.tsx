"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ClipboardCheck,
  MessageSquare,
  XCircle,
  Tag,
  Star,
  ExternalLink,
  X,
  Loader2,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { relativeTime } from "@/lib/constants";
import { usePortalCounts } from "@/hooks/use-portal-data";

export type NotificationItem = {
  id: string;
  type: string;
  title: string;
  body: string;
  link?: string | null;
  read: boolean;
  createdAt: string;
};

const ICON_BY_TYPE: Record<string, LucideIcon> = {
  booking: ClipboardCheck,
  message: MessageSquare,
  cancellation: XCircle,
  promotion: Tag,
  review: Star,
};

const ICON_BG_BY_TYPE: Record<string, string> = {
  booking: "bg-teal/10 text-teal",
  message: "bg-sky-100 text-sky-700",
  cancellation: "bg-rose-100 text-rose-700",
  promotion: "bg-amber-100 text-amber-700",
  review: "bg-violet-100 text-violet-700",
};

export function NotificationRow({ n }: { n: NotificationItem }) {
  const router = useRouter();
  const { refresh } = usePortalCounts();
  const [dismissing, setDismissing] = React.useState(false);
  const [marking, setMarking] = React.useState(false);

  const Icon = ICON_BY_TYPE[n.type] ?? MessageSquare;
  const iconCls = ICON_BG_BY_TYPE[n.type] ?? "bg-muted text-muted-foreground";

  async function markRead() {
    if (n.read) return;
    setMarking(true);
    try {
      const res = await fetch(`/api/notifications/${n.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: true }),
      });
      if (!res.ok) throw new Error("Failed");
      await Promise.all([refresh(), router.refresh()]);
    } catch {
      // Silent — don't toast on read failure
    } finally {
      setMarking(false);
    }
  }

  async function dismiss(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setDismissing(true);
    try {
      const res = await fetch(`/api/notifications/${n.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed");
      toast.success("Notification dismissed");
      await Promise.all([refresh(), router.refresh()]);
    } catch {
      toast.error("Could not dismiss");
      setDismissing(false);
    }
  }

  const Wrapper: React.ElementType = n.link ? Link : "div";
  const wrapperProps = n.link ? { href: n.link } : {};

  return (
    <Wrapper
      {...wrapperProps}
      onClick={() => {
        if (n.link && !n.read) void markRead();
      }}
      className={cn(
        "group relative flex gap-3 rounded-xl border bg-card p-3.5 transition-all hover:shadow-sm sm:p-4",
        n.link && "cursor-pointer hover:border-teal/40",
        !n.read && "border-l-4 border-l-teal",
        n.read && "border-border"
      )}
    >
      {/* Icon */}
      <div
        className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded-lg",
          iconCls
        )}
        aria-hidden
      >
        <Icon className="size-5" />
      </div>

      {/* Body */}
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              {!n.read && (
                <span
                  className="size-2 shrink-0 rounded-full bg-teal"
                  aria-label="Unread"
                />
              )}
              <h3
                className={cn(
                  "truncate text-sm font-600 text-navy",
                  !n.read && "font-700"
                )}
              >
                {n.title}
              </h3>
            </div>
            <p className="mt-0.5 line-clamp-2 text-sm text-muted-foreground">
              {n.body}
            </p>
            <p className="mt-1.5 text-xs text-muted-foreground">
              {relativeTime(n.createdAt)}
            </p>
          </div>

          {/* Dismiss */}
          <Button
            variant="ghost"
            size="icon"
            className="size-7 shrink-0 text-muted-foreground opacity-0 transition-opacity hover:bg-muted hover:text-foreground focus-visible:opacity-100 group-hover:opacity-100"
            onClick={dismiss}
            disabled={dismissing}
            aria-label="Dismiss notification"
          >
            {dismissing ? (
              <Loader2 className="size-3.5 animate-spin" />
            ) : (
              <X className="size-3.5" />
            )}
          </Button>
        </div>

        {/* Actions */}
        {(n.link || marking) && (
          <div className="mt-2.5 flex items-center gap-2">
            {n.link && (
              <span
                // Plain button-styled span — the whole row is already a Link
                // (when n.link is set), so a nested <a> here would be invalid
                // HTML. Clicking this span marks the notification as read; the
                // parent Link's default navigation handles the route change.
                aria-label={`View: ${n.title}`}
                onClick={(e) => {
                  // Don't preventDefault — let the parent anchor navigate.
                  e.stopPropagation();
                  if (!n.read) void markRead();
                }}
                className="inline-flex h-7 cursor-pointer items-center gap-1 rounded-md px-2 text-xs font-semibold text-teal transition-colors hover:bg-teal/10 hover:text-teal"
              >
                View
                <ExternalLink className="size-3" />
              </span>
            )}
            {marking && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Loader2 className="size-3 animate-spin" />
                Marking read…
              </span>
            )}
          </div>
        )}
      </div>
    </Wrapper>
  );
}
