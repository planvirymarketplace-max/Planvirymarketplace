import { Bell, BellOff } from "lucide-react";
import { db } from "@/lib/db";
import { PageHeader } from "@/components/portal/page-header";
import { EmptyState } from "@/components/portal/empty-state";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { RefreshOnMount } from "./_components/refresh-on-mount";
import { NotificationsTabs } from "./_components/notifications-tabs";
import { MarkAllReadButton } from "./_components/mark-all-read-button";
import { NotificationPreferences } from "./_components/notification-preferences";
import { NotificationRow } from "./_components/notification-row";

export const dynamic = "force-dynamic";

const VALID_FILTERS = new Set([
  "all",
  "unread",
  "booking",
  "message",
  "promotion",
]);

// Map tab keys to db filter — tabs are: All/Unread/Bookings/Messages/Promotions
// (cancellation + review types only show under "All" / "Unread")

export default async function NotificationsPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const sp = await searchParams;
  const rawFilter = (sp.filter ?? "all").toLowerCase();
  const filter = VALID_FILTERS.has(rawFilter) ? rawFilter : "all";

  const all = await db.notification.findMany({
    orderBy: { createdAt: "desc" },
  });

  let items = all;
  if (filter === "unread") {
    items = all.filter((n) => !n.read);
  } else if (filter === "booking") {
    items = all.filter((n) => n.type === "booking");
  } else if (filter === "message") {
    items = all.filter((n) => n.type === "message");
  } else if (filter === "promotion") {
    items = all.filter((n) => n.type === "promotion");
  }

  const unreadCount = all.filter((n) => !n.read).length;

  return (
    <div className="space-y-6">
      <RefreshOnMount />
      <PageHeader
        title="Notifications"
        description={
          unreadCount > 0
            ? `You have ${unreadCount} unread notification${unreadCount === 1 ? "" : "s"}`
            : "You're all caught up"
        }
        icon={Bell}
        actions={
          <>
            <NotificationPreferences />
            <MarkAllReadButton hasUnread={unreadCount > 0} />
          </>
        }
      />

      <NotificationsTabs active={filter} />

      {items.length === 0 ? (
        <EmptyState
          icon={filter === "unread" ? BellOff : Bell}
          title={
            filter === "unread"
              ? "No unread notifications"
              : filter === "all"
              ? "No notifications yet"
              : `No ${filter} notifications`
          }
          description={
            filter === "unread"
              ? "You're all caught up. New notifications will appear here."
              : "When something happens with your bookings, messages, or promotions, you'll see it here."
          }
          action={
            filter !== "all" ? (
              <Button asChild variant="outline">
                <Link href="/notifications">View all notifications</Link>
              </Button>
            ) : (
              <Button asChild className="bg-teal text-white hover:bg-teal/90">
                <Link href="/saved">Browse experiences</Link>
              </Button>
            )
          }
        />
      ) : (
        <div className="space-y-3">
          {items.map((n) => (
            <NotificationRow
              key={n.id}
              n={{
                id: n.id,
                type: n.type,
                title: n.title,
                body: n.body,
                link: n.link,
                read: n.read,
                createdAt:
                  n.createdAt instanceof Date
                    ? n.createdAt.toISOString()
                    : n.createdAt,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
