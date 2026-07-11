"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Star, ImagePlus, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StarRating } from "@/components/portal/star-rating";

export function ReviewForm({
  reservationId,
  listingTitle,
}: {
  reservationId: string;
  listingTitle: string;
}) {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const canSubmit = rating > 0 && text.trim().length >= 4 && !submitting;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    try {
      const res = await fetch(`/api/reservations/${reservationId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "review",
          rating,
          text: text.trim(),
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Could not submit review");
      }
      toast.success("Review submitted", {
        description: "Thanks for sharing your experience!",
      });
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Review failed");
      setSubmitting(false);
    }
  };

  const ratingLabel =
    rating === 0
      ? "Tap a star to rate"
      : rating === 1
      ? "Disappointed"
      : rating === 2
      ? "Below expectations"
      : rating === 3
      ? "It was okay"
      : rating === 4
      ? "Good experience"
      : "Outstanding";

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Your rating
        </Label>
        <div className="flex flex-wrap items-center gap-3">
          <StarRating
            value={rating}
            size="lg"
            onChange={setRating}
            aria-label={`Rate ${listingTitle} out of 5 stars`}
          />
          <span className="text-sm font-medium text-navy" aria-live="polite">
            {ratingLabel}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="review-text"
          className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
        >
          Tell others about your experience
        </Label>
        <Textarea
          id="review-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What stood out? Would you book again?"
          rows={4}
          maxLength={1000}
          disabled={submitting}
          aria-describedby="review-text-help"
        />
        <div className="flex items-center justify-between">
          <p id="review-text-help" className="text-[11px] text-muted-foreground">
            Min. 4 characters · be honest and respectful.
          </p>
          <span className="text-[11px] tabular-nums text-muted-foreground">
            {text.length}/1000
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="review-photo"
          className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
        >
          Add a photo <span className="font-normal normal-case text-muted-foreground/70">(optional)</span>
        </Label>
        <div className="flex items-center gap-3">
          <label
            htmlFor="review-photo"
            className="flex h-20 w-20 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-border bg-muted/30 text-muted-foreground transition-colors hover:border-teal hover:text-teal"
          >
            <ImagePlus className="size-4" />
            <span className="text-[10px] font-medium">Upload</span>
          </label>
          <Input
            id="review-photo"
            type="file"
            accept="image/*"
            className="hidden"
            disabled={submitting}
          />
          <p className="text-xs text-muted-foreground">
            Photos help other guests decide. JPG or PNG up to 5 MB.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <Star className="size-3.5 text-amber-400" />
          Your review will be public on the listing page.
        </p>
        <Button
          type="submit"
          disabled={!canSubmit}
          className="bg-teal text-white hover:bg-teal/90"
        >
          {submitting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Submitting…
            </>
          ) : (
            <>
              <Send className="size-4" />
              Submit Review
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
