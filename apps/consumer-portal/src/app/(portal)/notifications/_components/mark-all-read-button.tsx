"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CheckCheck, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePortalCounts } from "@/hooks/use-portal-data";

export function MarkAllReadButton({ hasUnread }: { hasUnread: boolean }) {
  const router = useRouter();
  const { refresh } = usePortalCounts();
  const [busy, setBusy] = useState(false);

  async function markAll() {
    setBusy(true);
    try {
      const res = await fetch("/api/notifications/read-all", { method: "POST" });
      if (!res.ok) throw new Error("Failed");
      toast.success("All marked as read");
      await Promise.all([refresh(), router.refresh()]);
    } catch {
      toast.error("Could not mark all as read");
    } finally {
      setBusy(false);
    }
  }

  // Spec: hide the button when there are no unread notifications.
  if (!hasUnread) return null;

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={markAll}
      disabled={busy}
      className="gap-1.5"
    >
      {busy ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <CheckCheck className="size-4" />
      )}
      Mark all as read
    </Button>
  );
}
