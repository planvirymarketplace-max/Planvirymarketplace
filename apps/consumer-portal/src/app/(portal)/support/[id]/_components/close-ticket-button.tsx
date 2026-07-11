"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Loader2, Ban } from "lucide-react";
import { Button } from "@/components/ui/button";
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

export function CloseTicketButton({
  ticketId,
  closed,
}: {
  ticketId: string;
  closed: boolean;
}) {
  const router = useRouter();
  const [closing, setClosing] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  async function close() {
    setClosing(true);
    try {
      const res = await fetch(`/api/support/${ticketId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "close" }),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success("Ticket closed");
      setOpen(false);
      router.refresh();
    } catch {
      toast.error("Could not close ticket");
    } finally {
      setClosing(false);
    }
  }

  if (closed) {
    return (
      <Button asChild variant="outline" size="sm" className="gap-1.5">
        <Link href="/support">Back to support</Link>
      </Button>
    );
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1.5">
          <Ban className="size-4" />
          Close Ticket
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Close this ticket?</AlertDialogTitle>
          <AlertDialogDescription>
            Once closed, the conversation is archived. You can always open a new
            ticket if you need more help.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={closing}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              void close();
            }}
            disabled={closing}
            className="bg-destructive text-white hover:bg-destructive/90"
          >
            {closing ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Closing…
              </>
            ) : (
              "Yes, close ticket"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
