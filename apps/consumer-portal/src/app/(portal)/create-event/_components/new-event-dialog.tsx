"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Cake,
  Heart,
  Briefcase,
  Plane,
  Compass,
  Plus,
  Loader2,
  CalendarPlus,
  Image as ImageIcon,
  Check,
  X,
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
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { OCCASION_TYPES, formatCurrency } from "@/lib/constants";

type Occasion = (typeof OCCASION_TYPES)[number];

const OCCASION_META: Record<
  Occasion,
  { icon: typeof Cake; blurb: string; accent: string }
> = {
  Birthday: {
    icon: Cake,
    blurb: "Cakes, dinners, surprises",
    accent: "from-rose-500/15 to-amber-500/10",
  },
  Wedding: {
    icon: Heart,
    blurb: "Venues, catering, suites",
    accent: "from-pink-500/15 to-violet-500/10",
  },
  Corporate: {
    icon: Briefcase,
    blurb: "Offsites, retreats, galas",
    accent: "from-teal/15 to-cyan-500/10",
  },
  Trip: {
    icon: Plane,
    blurb: "Stays, transport, days out",
    accent: "from-amber-500/15 to-orange-500/10",
  },
  "Just browsing": {
    icon: Compass,
    blurb: "Keep it loose — decide later",
    accent: "from-slate-500/15 to-slate-400/10",
  },
};

const SERVICE_OPTIONS = [
  "Venue",
  "Catering",
  "DJ",
  "Photography",
  "Transport",
  "Decor",
] as const;

const PRESET_COVERS: { label: string; url: string }[] = [
  {
    label: "Rooftop",
    url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=900&q=80",
  },
  {
    label: "Dining",
    url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&q=80",
  },
  {
    label: "Vineyard",
    url: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=900&q=80",
  },
  {
    label: "Wedding",
    url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=900&q=80",
  },
  {
    label: "Concert",
    url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=900&q=80",
  },
  {
    label: "Lounge",
    url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=900&q=80",
  },
];

function todayISO(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

export function NewEventDialog({ trigger }: { trigger?: React.ReactNode }) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  // form state
  const [type, setType] = React.useState<Occasion>("Birthday");
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [date, setDate] = React.useState(todayISO());
  const [endDate, setEndDate] = React.useState("");
  const [time, setTime] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [venue, setVenue] = React.useState("");
  const [capacity, setCapacity] = React.useState<string>("");
  const [budget, setBudget] = React.useState<string>("");
  const [budgetDisplay, setBudgetDisplay] = React.useState<string>("");
  const [coverImage, setCoverImage] = React.useState<string>(PRESET_COVERS[0].url);
  const [services, setServices] = React.useState<string[]>([]);
  const [submitting, setSubmitting] = React.useState(false);

  function reset() {
    setType("Birthday");
    setTitle("");
    setDescription("");
    setDate(todayISO());
    setEndDate("");
    setTime("");
    setLocation("");
    setVenue("");
    setCapacity("");
    setBudget("");
    setBudgetDisplay("");
    setCoverImage(PRESET_COVERS[0].url);
    setServices([]);
  }

  function toggleService(s: string) {
    setServices((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  }

  function onBudgetBlur() {
    if (!budget) {
      setBudgetDisplay("");
      return;
    }
    const n = parseFloat(budget);
    if (!isNaN(n)) {
      setBudgetDisplay(formatCurrency(n));
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Please give your event a title.");
      return;
    }
    if (!date) {
      toast.error("Please pick an event date.");
      return;
    }
    setSubmitting(true);
    try {
      const payload: Record<string, unknown> = {
        title: title.trim(),
        type: type === "Just browsing" ? "Other" : type,
        description: description.trim() || undefined,
        date,
        endDate: endDate || undefined,
        time: time || undefined,
        location: location.trim() || "Austin, TX",
        venue: venue.trim() || undefined,
        capacity: capacity ? Number(capacity) : 0,
        budget: budget ? Number(budget) : 0,
        status: "Draft",
        coverImage: coverImage || undefined,
        services: services.length ? services.join("|") : undefined,
      };
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Failed to create event");
      }
      toast.success("Event created!");
      reset();
      setOpen(false);
      router.refresh();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Could not create event. Try again."
      );
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
            New Event
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-display text-navy">
            <CalendarPlus className="size-5 text-teal" />
            Create an Event
          </DialogTitle>
          <DialogDescription>
            Turn an occasion into a plan. You can refine the details later.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={submit} className="space-y-6">
          {/* Section 1 — Occasion */}
          <section className="space-y-3">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                1 · Occasion
              </h3>
              <p className="mt-0.5 text-sm text-muted-foreground">
                What are you planning?
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {OCCASION_TYPES.map((o) => {
                const meta = OCCASION_META[o];
                const Icon = meta.icon;
                const active = type === o;
                return (
                  <button
                    key={o}
                    type="button"
                    onClick={() => setType(o)}
                    aria-pressed={active}
                    className={cn(
                      "group relative flex flex-col items-start gap-1 rounded-xl border p-3 text-left transition-all",
                      active
                        ? "border-teal bg-teal/5 ring-1 ring-teal"
                        : "border-border bg-card hover:border-teal/40 hover:bg-teal/5"
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-8 items-center justify-center rounded-lg bg-gradient-to-br text-navy",
                        meta.accent
                      )}
                    >
                      <Icon className="size-4" />
                    </span>
                    <span className="text-sm font-semibold text-navy">{o}</span>
                    <span className="text-[11px] leading-tight text-muted-foreground">
                      {meta.blurb}
                    </span>
                    {active && (
                      <span className="absolute right-2 top-2 flex size-4 items-center justify-center rounded-full bg-teal text-white">
                        <Check className="size-3" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </section>

          <Separator />

          {/* Section 2 — Essentials */}
          <section className="space-y-4">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                2 · Essentials
              </h3>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ev-title">
                Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="ev-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Sarah's 30th Birthday"
                maxLength={120}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ev-desc">Description</Label>
              <Textarea
                id="ev-desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="A short note about the occasion, vibe, or goals…"
                rows={3}
                maxLength={2000}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-1.5">
                <Label htmlFor="ev-date">
                  Date <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="ev-date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="ev-end">End date</Label>
                <Input
                  id="ev-end"
                  type="date"
                  value={endDate}
                  min={date}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="ev-time">Time</Label>
                <Input
                  id="ev-time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>
          </section>

          <Separator />

          {/* Section 3 — Where & who */}
          <section className="space-y-4">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                3 · Where &amp; who
              </h3>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="ev-location">Location</Label>
                <Input
                  id="ev-location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City, State"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="ev-venue">Venue</Label>
                <Input
                  id="ev-venue"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  placeholder="Venue name (optional)"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="ev-capacity">Capacity</Label>
                <Input
                  id="ev-capacity"
                  type="number"
                  inputMode="numeric"
                  min={0}
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  placeholder="Number of guests"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="ev-budget">Budget</Label>
                <Input
                  id="ev-budget"
                  type="number"
                  inputMode="decimal"
                  min={0}
                  step="0.01"
                  value={budget}
                  onChange={(e) => {
                    setBudget(e.target.value);
                    setBudgetDisplay("");
                  }}
                  onBlur={onBudgetBlur}
                  placeholder="USD"
                />
                {budgetDisplay && (
                  <p className="text-xs text-muted-foreground">
                    ≈ {budgetDisplay}
                  </p>
                )}
              </div>
            </div>
          </section>

          <Separator />

          {/* Section 4 — Cover image */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <ImageIcon className="size-4 text-teal" />
              <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                4 · Cover image
              </h3>
            </div>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
              {PRESET_COVERS.map((p) => {
                const active = coverImage === p.url;
                return (
                  <button
                    key={p.url}
                    type="button"
                    onClick={() => setCoverImage(p.url)}
                    aria-pressed={active}
                    aria-label={`Use ${p.label} cover`}
                    className={cn(
                      "group relative aspect-[4/3] overflow-hidden rounded-lg border transition-all",
                      active
                        ? "border-teal ring-2 ring-teal"
                        : "border-border hover:border-teal/40"
                    )}
                  >
                    <img
                      src={p.url}
                      alt={p.label}
                      className="size-full object-cover transition-transform group-hover:scale-105"
                    />
                    {active && (
                      <span className="absolute inset-0 flex items-center justify-center bg-teal/30">
                        <span className="flex size-6 items-center justify-center rounded-full bg-teal text-white">
                          <Check className="size-3.5" />
                        </span>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ev-cover-url">
                Or paste an image URL
              </Label>
              <Input
                id="ev-cover-url"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="https://…"
              />
            </div>
          </section>

          <Separator />

          {/* Section 5 — Services */}
          <section className="space-y-3">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                5 · Services
              </h3>
              <p className="mt-0.5 text-sm text-muted-foreground">
                What do you need help booking?
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {SERVICE_OPTIONS.map((s) => {
                const active = services.includes(s);
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => toggleService(s)}
                    aria-pressed={active}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-all",
                      active
                        ? "border-teal bg-teal text-white"
                        : "border-border bg-card text-foreground hover:border-teal/40 hover:bg-teal/5"
                    )}
                  >
                    {active ? <Check className="size-3.5" /> : <Plus className="size-3.5" />}
                    {s}
                  </button>
                );
              })}
            </div>
          </section>

          <DialogFooter className="pt-2">
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={submitting}>
                <X className="size-4" />
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
                  <Plus className="size-4" />
                  Create Event
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export { NewEventDialog as NewEventButton };
