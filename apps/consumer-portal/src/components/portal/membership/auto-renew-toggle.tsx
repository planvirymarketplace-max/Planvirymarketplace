"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, RotateCcw, Sparkles } from "lucide-react";

import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

/**
 * Auto-renew toggle for the current plan banner.
 * - Optimistic UI update on toggle.
 * - PATCH /api/membership { autoRenew } → toast.success / error.
 *
 * If `status === "Canceled"` we render a "Reactivate" button instead
 * (PATCH /api/membership { action: "reactivate" }).
 */
export function AutoRenewToggle({
  autoRenew,
  status,
}: {
  autoRenew: boolean;
  status: string;
}) {
  const router = useRouter();
  const [checked, setChecked] = React.useState(autoRenew);
  const [pending, setPending] = React.useState(false);

  // Keep local state in sync if server data changes (router.refresh)
  React.useEffect(() => {
    setChecked(autoRenew);
  }, [autoRenew]);

  const canceled = status === "Canceled";

  const patch = async (body: Record<string, unknown>) => {
    setPending(true);
    try {
      const res = await fetch("/api/membership", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          (data && (data.error as string)) || "Failed to update membership"
        );
      }
      router.refresh();
      return true;
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Update failed");
      return false;
    } finally {
      setPending(false);
    }
  };

  const onToggle = async (next: boolean) => {
    setChecked(next); // optimistic
    const ok = await patch({ autoRenew: next });
    if (ok) {
      toast.success(next ? "Auto-renew enabled" : "Auto-renew turned off");
    } else {
      setChecked(!next); // revert
    }
  };

  const onReactivate = async () => {
    if (pending) return;
    const ok = await patch({ action: "reactivate" });
    if (ok) {
      toast.success("Membership reactivated!", {
        description: "Auto-renew is now enabled.",
      });
    }
  };

  if (canceled) {
    return (
      <Button
        type="button"
        onClick={onReactivate}
        disabled={pending}
        className="bg-teal text-white hover:bg-teal/90"
      >
        {pending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <RotateCcw className="size-4" />
        )}
        Reactivate membership
      </Button>
    );
  }

  return (
    <label className="inline-flex cursor-pointer items-center gap-3">
      <span className="sr-only">Toggle auto-renew</span>
      <Switch
        checked={checked}
        onCheckedChange={onToggle}
        disabled={pending}
        aria-label="Auto-renew membership"
        className="data-[state=checked]:bg-teal"
      />
      <span className="flex items-center gap-1.5 text-sm font-medium text-navy">
        {pending && <Loader2 className="size-3.5 animate-spin text-teal" />}
        {checked ? "On" : "Off"}
        {checked && <Sparkles className="size-3.5 text-teal" />}
      </span>
    </label>
  );
}
