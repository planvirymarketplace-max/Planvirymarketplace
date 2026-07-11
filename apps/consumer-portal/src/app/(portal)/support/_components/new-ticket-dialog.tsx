"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  LifeBuoy,
  Plus,
  X,
  Paperclip,
  Loader2,
  MessageSquare,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TICKET_CATEGORIES } from "@/lib/constants";

type Reservation = { id: string; listingTitle: string };

const MAX_FILES = 5;

export function NewTicketDialog({
  reservations,
  trigger,
}: {
  reservations: Reservation[];
  trigger?: React.ReactNode;
}) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [subject, setSubject] = React.useState("");
  const [category, setCategory] = React.useState<string>("");
  const [description, setDescription] = React.useState("");
  const [relatedReservation, setRelatedReservation] = React.useState<string>("__none__");
  const [files, setFiles] = React.useState<File[]>([]);
  const [submitting, setSubmitting] = React.useState(false);

  function reset() {
    setSubject("");
    setCategory("");
    setDescription("");
    setRelatedReservation("__none__");
    setFiles([]);
  }

  function handleFiles(list: FileList | null) {
    if (!list) return;
    const next = [...files, ...Array.from(list)].slice(0, MAX_FILES);
    setFiles(next);
    if (next.length === MAX_FILES) {
      toast.info(`Maximum ${MAX_FILES} attachments reached`);
    }
  }

  function removeFile(idx: number) {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!subject.trim() || !category || !description.trim()) {
      toast.error("Please complete subject, category, and description.");
      return;
    }
    setSubmitting(true);
    try {
      const payload: Record<string, unknown> = {
        subject: subject.trim(),
        category,
        description: description.trim(),
      };
      if (relatedReservation !== "__none__") {
        payload.relatedReservation = reservations.find(
          (r) => r.id === relatedReservation
        )?.listingTitle ?? relatedReservation;
      }
      const res = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed");
      const ticket = await res.json();
      toast.success("Ticket created — we'll be in touch shortly.");
      reset();
      setOpen(false);
      router.push(`/support/${ticket.id}`);
    } catch {
      toast.error("Could not create ticket. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) reset();
      }}
    >
      <DialogTrigger asChild>
        {trigger ?? (
          <Button className="bg-teal text-white hover:bg-teal/90">
            <Plus className="size-4" />
            New Ticket
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-display text-navy">
            <LifeBuoy className="size-5 text-teal" />
            Open a Support Ticket
          </DialogTitle>
          <DialogDescription>
            Tell us what's going on and we'll route it to the right team.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={submit} className="space-y-4">
          {/* Category */}
          <div className="space-y-1.5">
            <Label htmlFor="ticket-category">
              Category <span className="text-destructive">*</span>
            </Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="ticket-category" className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {TICKET_CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Subject */}
          <div className="space-y-1.5">
            <Label htmlFor="ticket-subject">
              Subject <span className="text-destructive">*</span>
            </Label>
            <Input
              id="ticket-subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Brief summary of the issue"
              maxLength={120}
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label htmlFor="ticket-description">
              Description <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="ticket-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what happened, what you expected, and any steps to reproduce…"
              rows={5}
              maxLength={4000}
              required
            />
            <p className="text-right text-xs text-muted-foreground">
              {description.length}/4000
            </p>
          </div>

          {/* Related reservation */}
          <div className="space-y-1.5">
            <Label htmlFor="ticket-reservation">Related reservation</Label>
            <Select value={relatedReservation} onValueChange={setRelatedReservation}>
              <SelectTrigger id="ticket-reservation" className="w-full">
                <SelectValue placeholder="None" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__none__">None</SelectItem>
                {reservations.map((r) => (
                  <SelectItem key={r.id} value={r.id}>
                    {r.listingTitle}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Attachments */}
          <div className="space-y-2">
            <Label htmlFor="ticket-files">
              Attachments
              <span className="ml-1 text-xs font-normal text-muted-foreground">
                (optional, up to {MAX_FILES})
              </span>
            </Label>
            <label
              htmlFor="ticket-files"
              className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-muted/30 px-4 py-5 text-sm text-muted-foreground transition hover:border-teal/50 hover:bg-teal/5"
            >
              <Paperclip className="size-4" />
              Click to upload files
              <Input
                id="ticket-files"
                type="file"
                multiple
                className="hidden"
                onChange={(e) => handleFiles(e.target.files)}
                accept="image/*,.pdf,.doc,.docx"
              />
            </label>
            {files.length > 0 && (
              <ul className="flex flex-wrap gap-2">
                {files.map((f, i) => (
                  <li
                    key={`${f.name}-${i}`}
                    className="flex items-center gap-1.5 rounded-full bg-teal/10 px-2.5 py-1 text-xs font-medium text-teal"
                  >
                    <Paperclip className="size-3" />
                    <span className="max-w-[12rem] truncate">{f.name}</span>
                    <button
                      type="button"
                      onClick={() => removeFile(i)}
                      aria-label={`Remove ${f.name}`}
                      className="rounded-full p-0.5 hover:bg-teal/20"
                    >
                      <X className="size-3" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <DialogFooter className="pt-2">
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={submitting}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={submitting}
              className="bg-teal text-white hover:bg-teal/90"
            >
              {submitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Creating…
                </>
              ) : (
                <>
                  <MessageSquare className="size-4" />
                  Submit Ticket
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export { NewTicketDialog as NewTicketButton };

export function NewTicketLink({ reservations }: { reservations: Reservation[] }) {
  // Lightweight ghost link used in empty states
  return (
    <NewTicketDialog
      reservations={reservations}
      trigger={
        <Button variant="outline" className="bg-teal text-white hover:bg-teal/90">
          <Plus className="size-4" />
          Open a ticket
        </Button>
      }
    />
  );
}
