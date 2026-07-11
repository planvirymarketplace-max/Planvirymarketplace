"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";
import {
  Cake,
  Heart,
  Briefcase,
  Plane,
  Compass,
  MapPin,
  LocateFixed,
  Calendar as CalendarIcon,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Sparkles,
  ShieldCheck,
  Clock4,
  ConciergeBell,
} from "lucide-react";
import { format } from "date-fns";

import { Logo } from "@/components/portal/logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { OCCASION_TYPES } from "@/lib/constants";
import { usePortalCounts } from "@/hooks/use-portal-data";

type Occasion = (typeof OCCASION_TYPES)[number];

const OCCASION_META: Record<
  Occasion,
  { icon: typeof Cake; blurb: string; accent: string }
> = {
  Birthday: {
    icon: Cake,
    blurb: "Cakes, venues, dinner, surprises",
    accent: "from-rose-500/15 to-amber-500/10",
  },
  Wedding: {
    icon: Heart,
    blurb: "Venues, catering, transport, suites",
    accent: "from-pink-500/15 to-violet-500/10",
  },
  Corporate: {
    icon: Briefcase,
    blurb: "Retreats, off-sites, group travel",
    accent: "from-teal/15 to-sky-500/10",
  },
  Trip: {
    icon: Plane,
    blurb: "Getaways, hotels, dining, transport",
    accent: "from-teal/15 to-emerald-500/10",
  },
  "Just browsing": {
    icon: Compass,
    blurb: "Explore options without commitment",
    accent: "from-slate-400/15 to-slate-500/10",
  },
};

const CITY_SUGGESTIONS = [
  "Austin",
  "Chicago",
  "New York",
  "Miami",
  "Los Angeles",
  "San Francisco",
];

const STEPS = ["occasion", "location", "dates"] as const;
type StepKey = (typeof STEPS)[number];

const STEP_LABELS: Record<StepKey, string> = {
  occasion: "What",
  location: "Where",
  dates: "When",
};

const TRUST_BULLETS = [
  { icon: ConciergeBell, label: "Hand-picked venues & vendors" },
  { icon: Clock4, label: "Real humans, on call 24/7" },
  { icon: ShieldCheck, label: "One itinerary, every detail covered" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { refresh } = usePortalCounts();

  const [stepIdx, setStepIdx] = React.useState(0);
  const [occasion, setOccasion] = React.useState<Occasion | null>(null);
  const [city, setCity] = React.useState("");
  const [startDate, setStartDate] = React.useState<Date | undefined>();
  const [endDate, setEndDate] = React.useState<Date | undefined>();
  const [notSure, setNotSure] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  const step = STEPS[stepIdx];
  const isLast = stepIdx === STEPS.length - 1;
  const isFirst = stepIdx === 0;
  const today = new Date();

  function canContinue() {
    if (step === "occasion") return !!occasion;
    if (step === "location") return !!city.trim();
    if (step === "dates") return notSure || !!startDate;
    return false;
  }

  function next() {
    if (isLast) {
      void finish(false);
    } else {
      setStepIdx((i) => Math.min(i + 1, STEPS.length - 1));
    }
  }

  function back() {
    setStepIdx((i) => Math.max(i - 1, 0));
  }

  function skip() {
    if (isLast) {
      void finish(true);
    } else {
      setStepIdx((i) => Math.min(i + 1, STEPS.length - 1));
    }
  }

  async function finish(allSkipped: boolean) {
    setSubmitting(true);
    try {
      const payload: Record<string, unknown> = {};
      if (occasion) payload.occasionType = occasion;
      if (city.trim()) payload.city = city.trim();
      if (notSure) {
        // Flexible — save a placeholder single-day window starting today
        const start = new Date();
        const end = new Date();
        end.setDate(end.getDate() + 1);
        payload.startDate = start.toISOString().slice(0, 10);
        payload.endDate = end.toISOString().slice(0, 10);
      } else if (startDate) {
        payload.startDate = startDate.toISOString().slice(0, 10);
        payload.endDate = (endDate ?? startDate).toISOString().slice(0, 10);
      }

      // If the user skipped every step, still create a default itinerary
      // so they land somewhere useful.
      if (
        allSkipped &&
        !occasion &&
        !city.trim() &&
        !startDate &&
        !notSure
      ) {
        payload.occasionType = "Trip";
        payload.city = "Austin";
        const start = new Date();
        payload.startDate = start.toISOString().slice(0, 10);
        payload.endDate = start.toISOString().slice(0, 10);
      }

      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to create itinerary");
      const itin = await res.json();
      await refresh();
      toast.success("Your occasion is ready!");
      router.push(`/itineraries/${itin.id}`);
    } catch {
      toast.error("Could not start your occasion. Please try again.");
      setSubmitting(false);
    }
  }

  function useMyLocation() {
    // Simulate geolocation detection
    toast.info("Location detected: Austin, TX");
    setCity("Austin, TX");
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* --------------------------------------------------------------- */}
      {/* Left branded visual panel (desktop only)                        */}
      {/* --------------------------------------------------------------- */}
      <aside className="relative hidden w-[45%] flex-col justify-between overflow-hidden bg-gradient-to-br from-navy to-teal-900 p-10 text-white xl:flex">
        {/* Decorative glow accents */}
        <div className="pointer-events-none absolute -top-32 -right-24 size-[28rem] rounded-full bg-teal/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-24 size-[26rem] rounded-full bg-teal/10 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(13,148,136,0.22),transparent_55%)]" />

        {/* Top — Logo (white variant) */}
        <div className="relative">
          <Logo className="[&_.text-navy]:text-white [&_.text-muted-foreground]:text-white/60" />
        </div>

        {/* Middle — headline + value prop + trust bullets */}
        <div className="relative max-w-md">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-teal-200 backdrop-blur">
            <Sparkles className="size-3" />
            Planviry onboarding
          </div>
          <h1 className="mt-5 font-display text-4xl font-700 leading-[1.1] tracking-tight text-white xl:text-5xl">
            Let&apos;s plan something memorable.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-white/70">
            Tell us a little about your occasion and we&apos;ll craft a
            personalized plan — venues, dining, transport, and every detail
            in between.
          </p>

          <ul className="mt-8 space-y-3">
            {TRUST_BULLETS.map((b) => {
              const Icon = b.icon;
              return (
                <li key={b.label} className="flex items-center gap-3">
                  <span className="flex size-8 items-center justify-center rounded-lg bg-white/10 text-teal-200">
                    <Icon className="size-4" />
                  </span>
                  <span className="text-sm font-medium text-white/85">
                    {b.label}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Bottom — microcopy */}
        <p className="relative text-xs text-white/45">
          Free to plan · No commitment · Cancel anytime
        </p>
      </aside>

      {/* --------------------------------------------------------------- */}
      {/* Right wizard column                                             */}
      {/* --------------------------------------------------------------- */}
      <main className="relative flex flex-1 flex-col">
        {/* Top bar — skip link (and compact logo on mobile) */}
        <div className="flex items-center justify-between p-4 sm:px-6 sm:py-5">
          <Logo className="xl:hidden" />
          <span className="hidden xl:block" />
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
          >
            <Link href="/">
              Skip to dashboard
              <ChevronRight className="size-3.5" />
            </Link>
          </Button>
        </div>

        {/* Centered wizard */}
        <div className="flex flex-1 items-center justify-center overflow-y-auto px-4 pb-10 sm:px-8">
          <div className="w-full max-w-md">
            {/* Logo at top of the wizard area (desktop) */}
            <div className="mb-6 hidden justify-center xl:flex">
              <Logo />
            </div>

            {/* Progress — thin bar + "Step X of 3" */}
            <div className="mb-5">
              <div className="mb-2 flex items-center justify-between text-xs font-medium">
                <span className="text-muted-foreground">
                  Step{" "}
                  <span className="font-700 text-navy">{stepIdx + 1}</span> of{" "}
                  {STEPS.length}
                </span>
                <span className="font-semibold uppercase tracking-[0.14em] text-teal">
                  {STEP_LABELS[step]}
                </span>
              </div>
              <div className="flex gap-1.5" aria-hidden>
                {STEPS.map((s, i) => (
                  <div
                    key={s}
                    className={cn(
                      "h-1.5 flex-1 rounded-full transition-colors duration-500",
                      i < stepIdx
                        ? "bg-teal"
                        : i === stepIdx
                          ? "bg-teal"
                          : "bg-border"
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Card */}
            <Card className="overflow-hidden border-border shadow-lg">
              <CardContent className="p-0">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="p-6 sm:p-8"
                  >
                    {/* Step 1 — Occasion */}
                    {step === "occasion" && (
                      <StepOccasion
                        value={occasion}
                        onChange={(o) => setOccasion(o)}
                      />
                    )}

                    {/* Step 2 — Location */}
                    {step === "location" && (
                      <StepLocation
                        value={city}
                        onChange={setCity}
                        onUseLocation={useMyLocation}
                      />
                    )}

                    {/* Step 3 — Dates */}
                    {step === "dates" && (
                      <StepDates
                        startDate={startDate}
                        endDate={endDate}
                        notSure={notSure}
                        onSelectStart={setStartDate}
                        onSelectEnd={setEndDate}
                        onToggleNotSure={setNotSure}
                        today={today}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Footer nav */}
                <div className="flex flex-col gap-3 border-t border-border bg-muted/30 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                  <button
                    type="button"
                    onClick={skip}
                    disabled={submitting}
                    className="text-left text-xs font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline disabled:opacity-50"
                  >
                    {isLast ? "Skip & finish" : "Skip for now"}
                  </button>

                  <div className="flex items-center gap-2">
                    {!isFirst && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={back}
                        disabled={submitting}
                        className="gap-1"
                        aria-label="Go back to the previous step"
                      >
                        <ChevronLeft className="size-4" />
                        Back
                      </Button>
                    )}
                    <Button
                      type="button"
                      size="sm"
                      onClick={next}
                      disabled={!canContinue() || submitting}
                      className="bg-teal text-white hover:bg-teal/90"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="size-4 animate-spin" />
                          Setting up…
                        </>
                      ) : isLast ? (
                        <>
                          <Sparkles className="size-4" />
                          Finish
                        </>
                      ) : (
                        <>
                          Continue
                          <ChevronRight className="size-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trust line (mobile — left panel is hidden) */}
            <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground xl:hidden">
              <Sparkles className="size-3 text-teal" />
              Free to plan · No commitment · Cancel anytime
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Step 1 — Occasion                                                   */
/* ------------------------------------------------------------------ */

function StepOccasion({
  value,
  onChange,
}: {
  value: Occasion | null;
  onChange: (o: Occasion) => void;
}) {
  return (
    <div>
      <StepHeading
        kicker="Step 1"
        title="What are you planning?"
        subtitle="Pick the occasion that fits. You can always change this later."
      />
      <div
        role="radiogroup"
        aria-label="Occasion type"
        className="mt-6 grid gap-3 sm:grid-cols-2"
      >
        {OCCASION_TYPES.map((o) => {
          const meta = OCCASION_META[o];
          const Icon = meta.icon;
          const active = value === o;
          return (
            <button
              key={o}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(o)}
              className={cn(
                "group relative flex items-start gap-3 overflow-hidden rounded-xl border p-4 text-left transition-all",
                active
                  ? "border-teal bg-teal/5 shadow-sm ring-1 ring-teal/30"
                  : "border-border bg-card hover:border-teal/40 hover:bg-teal/5"
              )}
            >
              <div
                className={cn(
                  "flex size-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-navy",
                  meta.accent
                )}
              >
                <Icon className="size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-display text-sm font-600 text-navy">{o}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {meta.blurb}
                </p>
              </div>
              <span
                className={cn(
                  "absolute right-3 top-3 flex size-5 items-center justify-center rounded-full border transition-colors",
                  active
                    ? "border-teal bg-teal text-white"
                    : "border-border text-transparent"
                )}
                aria-hidden
              >
                <Check className="size-3" />
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Step 2 — Location                                                   */
/* ------------------------------------------------------------------ */

function StepLocation({
  value,
  onChange,
  onUseLocation,
}: {
  value: string;
  onChange: (v: string) => void;
  onUseLocation: () => void;
}) {
  return (
    <div>
      <StepHeading
        kicker="Step 2"
        title="Where to?"
        subtitle="Tell us the city — we'll tailor recommendations to your destination."
      />

      <div className="mt-6 space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="city">City</Label>
          <div className="relative">
            <MapPin className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="city"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="e.g. Austin, TX"
              className="pl-9"
              autoComplete="off"
              list="city-suggestions"
            />
            <datalist id="city-suggestions">
              {CITY_SUGGESTIONS.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </div>
        </div>

        {/* Suggestions */}
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Popular destinations
          </p>
          <div className="flex flex-wrap gap-2">
            {CITY_SUGGESTIONS.map((c) => {
              const active = value === c;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => onChange(c)}
                  aria-pressed={active}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                    active
                      ? "border-teal bg-teal/10 text-teal"
                      : "border-border bg-card text-foreground hover:border-teal/40 hover:bg-teal/5"
                  )}
                >
                  <MapPin className="size-3" />
                  {c}
                </button>
              );
            })}
          </div>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onUseLocation}
          className="gap-1.5 text-teal hover:bg-teal/5 hover:text-teal"
        >
          <LocateFixed className="size-4" />
          Use my current location
        </Button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Step 3 — Dates                                                      */
/* ------------------------------------------------------------------ */

function StepDates({
  startDate,
  endDate,
  notSure,
  onSelectStart,
  onSelectEnd,
  onToggleNotSure,
  today,
}: {
  startDate?: Date;
  endDate?: Date;
  notSure: boolean;
  onSelectStart: (d?: Date) => void;
  onSelectEnd: (d?: Date) => void;
  onToggleNotSure: (v: boolean) => void;
  today: Date;
}) {
  const [activeField, setActiveField] = React.useState<"start" | "end">(
    "start"
  );

  function handleCalendarSelect(d?: Date) {
    if (!d) return;
    if (activeField === "start" || !startDate || (endDate && d < startDate)) {
      onSelectStart(d);
      // Reset end if it's now before start
      if (endDate && d > endDate) onSelectEnd(undefined);
      setActiveField("end");
    } else {
      onSelectEnd(d);
    }
  }

  return (
    <div>
      <StepHeading
        kicker="Step 3"
        title="When is it?"
        subtitle="Pick a date range or let us know you're flexible."
      />

      <div className="mt-6 space-y-4">
        <RadioGroup
          value={notSure ? "flexible" : "dates"}
          onValueChange={(v) => onToggleNotSure(v === "flexible")}
          className="grid gap-2 sm:grid-cols-2"
        >
          <label
            htmlFor="opt-dates"
            className={cn(
              "flex cursor-pointer items-start gap-2.5 rounded-xl border p-3 transition-colors",
              !notSure
                ? "border-teal bg-teal/5 ring-1 ring-teal/30"
                : "border-border bg-card hover:bg-muted/40"
            )}
          >
            <RadioGroupItem id="opt-dates" value="dates" className="mt-0.5" />
            <span className="flex flex-col">
              <span className="flex items-center gap-1.5 text-sm font-600 text-navy">
                <CalendarDays className="size-4 text-teal" />
                Specific dates
              </span>
              <span className="text-xs text-muted-foreground">
                Choose your start and end.
              </span>
            </span>
          </label>
          <label
            htmlFor="opt-flexible"
            className={cn(
              "flex cursor-pointer items-start gap-2.5 rounded-xl border p-3 transition-colors",
              notSure
                ? "border-teal bg-teal/5 ring-1 ring-teal/30"
                : "border-border bg-card hover:bg-muted/40"
            )}
          >
            <RadioGroupItem
              id="opt-flexible"
              value="flexible"
              className="mt-0.5"
            />
            <span className="flex flex-col">
              <span className="flex items-center gap-1.5 text-sm font-600 text-navy">
                <Compass className="size-4 text-teal" />
                Not sure yet
              </span>
              <span className="text-xs text-muted-foreground">
                We&apos;ll save a flexible placeholder.
              </span>
            </span>
          </label>
        </RadioGroup>

        {!notSure && (
          <div className="grid gap-3 sm:grid-cols-2">
            {/* Start date */}
            <div className="space-y-1.5">
              <Label>Start date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !startDate && "text-muted-foreground"
                    )}
                    onClick={() => setActiveField("start")}
                    aria-label="Pick a start date"
                  >
                    <CalendarIcon className="size-4 text-teal" />
                    {startDate ? format(startDate, "MMM d, yyyy") : "Pick a start"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={handleCalendarSelect}
                    disabled={[{ before: today }]}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* End date */}
            <div className="space-y-1.5">
              <Label>
                End date{" "}
                <span className="text-muted-foreground">(optional)</span>
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !endDate && "text-muted-foreground"
                    )}
                    onClick={() => setActiveField("end")}
                    disabled={!startDate}
                    aria-label="Pick an end date"
                  >
                    <CalendarIcon className="size-4 text-teal" />
                    {endDate ? format(endDate, "MMM d, yyyy") : "Pick an end"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={handleCalendarSelect}
                    disabled={[
                      ...(startDate
                        ? [{ before: startDate }]
                        : [{ before: today }]),
                    ]}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        )}

        {startDate && !notSure && (
          <div className="flex items-center gap-2 rounded-lg bg-teal/10 px-3 py-2 text-xs font-medium text-teal">
            <Check className="size-3.5" />
            {endDate && endDate > startDate
              ? `${format(startDate, "MMM d")} → ${format(endDate, "MMM d, yyyy")}`
              : `Single day · ${format(startDate, "MMM d, yyyy")}`}
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Shared heading                                                      */
/* ------------------------------------------------------------------ */

function StepHeading({
  kicker,
  title,
  subtitle,
}: {
  kicker: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-teal">
        {kicker}
      </p>
      <h2 className="mt-1 font-display text-2xl font-700 tracking-tight text-navy sm:text-3xl">
        {title}
      </h2>
      <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>
    </div>
  );
}
