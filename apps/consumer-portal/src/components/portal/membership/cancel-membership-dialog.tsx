"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AlertTriangle, Loader2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Cancel-membership confirmation dialog.
 * Triggered by a muted "Cancel membership" link at the bottom of the page.
 * Confirms → PATCH /api/membership { action: "cancel" } → toast + refresh.
 */
export function CancelMembershipDialog({
  tierName,
  renewDate,
  triggerClassName,
}: {
  tierName: string;
  renewDate: string;
  triggerClassName?: string;
}) {
  const router = useRouter();
  const [pending, setPending] = React.useState(false);

  const onConfirm = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (pending) return;
    setPending(true);
    try {
      const res = await fetch("/api/membership", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "cancel" }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          (data && (data.error as string)) || "Failed to cancel membership"
        );
      }
      toast.success("Membership canceled", {
        description: `Your ${tierName} plan ends on ${renewDate}.`,
      });
      router.refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Cancel failed");
    } finally {
      setPending(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          type="button"
          className={cn(
            "text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-rose-600 hover:underline",
            triggerClassName
          )}
        >
          Cancel membership
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-full bg-rose-100 text-rose-600">
              <AlertTriangle className="size-4" />
            </span>
            Cancel {tierName} membership?
          </AlertDialogTitle>
          <AlertDialogDescription>
            You&apos;ll keep your benefits until{" "}
            <span className="font-semibold text-navy">{renewDate}</span>, after
            which your account reverts to the Free tier. You can reactivate any
            time before then.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={pending}>Keep plan</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={pending}
            className={cn(
              buttonVariants({ variant: "destructive" }),
              "bg-rose-600 text-white hover:bg-rose-700"
            )}
          >
            {pending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Canceling…
              </>
            ) : (
              "Cancel membership"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
