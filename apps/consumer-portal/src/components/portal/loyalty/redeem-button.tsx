"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Gift, Loader2, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/constants";

/**
 * Redeem button for a reward card.
 * - Disabled (with lock icon) when `currentPoints < pointsCost`.
 * - POSTs { rewardId } to /api/loyalty/redeem → toast + router.refresh().
 */
export function RedeemButton({
  rewardId,
  rewardTitle,
  pointsCost,
  currentPoints,
  cashValue,
}: {
  rewardId: string;
  rewardTitle: string;
  pointsCost: number;
  currentPoints: number;
  cashValue?: number;
}) {
  const router = useRouter();
  const [submitting, setSubmitting] = React.useState(false);

  const affordable = currentPoints >= pointsCost;

  const onClick = async () => {
    if (!affordable || submitting) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/loyalty/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rewardId }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg =
          (data && (data.error as string)) ||
          (res.status === 400 ? "Not enough points" : "Redemption failed");
        toast.error(msg);
        return;
      }
      toast.success("Reward redeemed!", {
        description: `${pointsCost.toLocaleString()} points deducted · ${rewardTitle}${
          cashValue ? ` (${formatCurrency(cashValue)} value)` : ""
        }`,
      });
      router.refresh();
    } catch {
      toast.error("Network error — please try again");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Button
      type="button"
      onClick={onClick}
      disabled={!affordable || submitting}
      className="w-full bg-teal text-white hover:bg-teal/90"
      aria-label={`Redeem ${rewardTitle} for ${pointsCost.toLocaleString()} points`}
    >
      {submitting ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          Redeeming…
        </>
      ) : !affordable ? (
        <>
          <Lock className="size-4" />
          Need {(pointsCost - currentPoints).toLocaleString()} more
        </>
      ) : (
        <>
          <Gift className="size-4" />
          Redeem · {pointsCost.toLocaleString()} pts
        </>
      )}
    </Button>
  );
}
