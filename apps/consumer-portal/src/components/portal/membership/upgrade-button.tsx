"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Check, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Upgrade button for a tier card.
 * - Renders a disabled "Current plan" pill when `isCurrent`.
 * - Renders teal solid when `popular` (matches the highlighted tier card).
 * - Renders outline otherwise.
 * - PATCH /api/membership { tier: name } → toast.success + router.refresh.
 */
export function UpgradeButton({
  tierName,
  isCurrent,
  popular,
}: {
  tierName: string;
  isCurrent: boolean;
  popular: boolean;
}) {
  const router = useRouter();
  const [pending, setPending] = React.useState(false);

  const onUpgrade = async () => {
    if (isCurrent || pending) return;
    setPending(true);
    try {
      const res = await fetch("/api/membership", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier: tierName }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          (data && (data.error as string)) || "Upgrade failed"
        );
      }
      toast.success(`Upgraded to ${tierName}!`, {
        description: "Your new benefits are active immediately.",
      });
      router.refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Upgrade failed");
    } finally {
      setPending(false);
    }
  };

  if (isCurrent) {
    return (
      <Button
        type="button"
        disabled
        variant="outline"
        className="w-full cursor-default border-teal/40 bg-teal/5 text-teal"
        aria-label={`Current plan: ${tierName}`}
      >
        <Check className="size-4" />
        Current plan
      </Button>
    );
  }

  return (
    <Button
      type="button"
      onClick={onUpgrade}
      disabled={pending}
      variant={popular ? "default" : "outline"}
      className={cn(
        "w-full",
        popular
          ? "bg-teal text-white hover:bg-teal/90"
          : "border-border text-navy hover:bg-muted"
      )}
      aria-label={`Upgrade to ${tierName}`}
    >
      {pending ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <>Upgrade to {tierName}</>
      )}
    </Button>
  );
}
