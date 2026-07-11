"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Plus, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

/**
 * Creates a new listing draft (POST /api/create-listing) with minimal step-1
 * data, then redirects the user into the wizard at /create-listing/[id].
 */
export function NewListingButton({
  defaultBusinessType = "venue",
  label = "Create New Listing",
  size = "default",
}: {
  defaultBusinessType?: string;
  label?: string;
  size?: "default" | "sm" | "lg";
}) {
  const router = useRouter();
  const [creating, setCreating] = React.useState(false);

  async function create() {
    setCreating(true);
    try {
      const res = await fetch("/api/create-listing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessType: defaultBusinessType,
          title: "Untitled Listing",
          step: 1,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Failed");
      }
      const draft = await res.json();
      toast.success("Draft created — let's set up your listing.");
      router.push(`/create-listing/${draft.id}`);
    } catch (e) {
      toast.error(
        e instanceof Error ? e.message : "Could not create draft. Try again."
      );
      setCreating(false);
    }
  }

  return (
    <Button
      onClick={create}
      disabled={creating}
      size={size}
      className="bg-teal text-white hover:bg-teal/90"
    >
      {creating ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          Starting…
        </>
      ) : (
        <>
          <Plus className="size-4" />
          {label}
        </>
      )}
    </Button>
  );
}
