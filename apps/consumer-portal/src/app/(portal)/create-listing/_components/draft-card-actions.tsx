"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ArrowRight,
  Trash2,
  ExternalLink,
  Loader2,
} from "lucide-react";

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

/**
 * The per-draft action cluster used on the Create Listing dashboard.
 *
 * - If the draft is published: show "View" (→ /book) primary, "Edit" outline.
 * - If it's a draft in progress: show "Continue" (→ /create-listing/[id]) primary.
 * - Always: a destructive "Delete" with an AlertDialog confirmation.
 */
export function DraftCardActions({
  id,
  status,
  publishedListingId,
}: {
  id: string;
  status: string;
  publishedListingId: string | null;
}) {
  const router = useRouter();
  const [deleting, setDeleting] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const isPublished = status === "active";

  async function doDelete() {
    setDeleting(true);
    try {
      const res = await fetch(`/api/create-listing/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed");
      toast.success("Listing draft deleted.");
      router.refresh();
    } catch {
      toast.error("Could not delete draft. Try again.");
      setDeleting(false);
      setOpen(false);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {isPublished ? (
        <>
          <Button
            asChild
            size="sm"
            className="bg-teal text-white hover:bg-teal/90"
          >
            <Link href="/book">
              <ExternalLink className="size-3.5" />
              View in marketplace
            </Link>
          </Button>
          <Button asChild size="sm" variant="outline">
            <Link href={`/create-listing/${id}`}>
              Edit
              <ArrowRight className="size-3.5" />
            </Link>
          </Button>
        </>
      ) : (
        <Button
          asChild
          size="sm"
          className="bg-teal text-white hover:bg-teal/90"
        >
          <Link href={`/create-listing/${id}`}>
            Continue editing
            <ArrowRight className="size-3.5" />
          </Link>
        </Button>
      )}

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button
            size="sm"
            variant="ghost"
            className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
          >
            <Trash2 className="size-3.5" />
            Delete
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this listing draft?</AlertDialogTitle>
            <AlertDialogDescription>
              {isPublished
                ? "This will permanently remove the draft. The published listing in the marketplace will remain."
                : "This will permanently remove the draft and all progress. This action cannot be undone."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                void doDelete();
              }}
              disabled={deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Deleting…
                </>
              ) : (
                "Delete draft"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
