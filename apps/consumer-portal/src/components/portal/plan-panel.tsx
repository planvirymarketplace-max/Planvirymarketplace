"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useIntent, type PlanIntent } from "@/hooks/use-intent";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Compass,
  MapPin,
  CalendarDays,
  Users,
  DollarSign,
  ChevronDown,
  Check,
  Sparkles,
  Plane,
} from "lucide-react";
import { toast } from "sonner";
import { OCCASION_TYPES } from "@/lib/constants";
import { format } from "date-fns";

const PRICE_BANDS = [
  { id: "0-500", label: "Under $500", min: 0, max: 500 },
  { id: "500-1500", label: "$500 – $1,500", min: 500, max: 1500 },
  { id: "1500-5000", label: "$1,500 – $5,000", min: 1500, max: 5000 },
  { id: "1500+", label: "$1,500+", min: 1500, max: Infinity },
  { id: "5000+", label: "$5,000+", min: 5000, max: Infinity },
];

const CITIES = [
  "Austin, TX",
  "Chicago, IL",
  "New York, NY",
  "Miami, FL",
  "Seattle, WA",
  "Los Angeles, CA",
  "San Francisco, CA",
  "Las Vegas, NV",
  "New Orleans, LA",
];

/**
 * PlanPanel — the omnipresent control panel. Per the Planviry IA, "Plan" is
 * not a category; it's the literal control panel (What / Where / When / Price /
 * Attendees), present on every page, because search is not a feature of the
 * homepage — it IS the homepage.
 *
 * This component renders as a compact summary chip-bar in the portal header
 * (always visible) that expands into a full editor Popover. The Plan is global
 * intent state persisted on the guest record; /book, /calendar, and dashboard
 * recommendations all read it to scope their results.
 */
export function PlanPanel() {
  const { intent, savePlan } = useIntent();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const plan = intent.plan;

  // Local working copy while editing
  const [draft, setDraft] = React.useState<PlanIntent>({
    what: null,
    where: null,
    when: null,
    whenEnd: null,
    price: null,
    attendees: null,
  });
  const [dateRange, setDateRange] = React.useState<{
    from?: Date;
    to?: Date;
  }>({});
  const [saving, setSaving] = React.useState(false);

  // Sync draft from server when the popover opens
  React.useEffect(() => {
    if (open && plan) {
      setDraft(plan);
      setDateRange({
        from: plan.when ? new Date(plan.when) : undefined,
        to: plan.whenEnd ? new Date(plan.whenEnd) : undefined,
      });
    }
  }, [open, plan]);

  const filledCount = [
    plan?.what,
    plan?.where,
    plan?.when,
    plan?.price,
    plan?.attendees,
  ].filter(Boolean).length;

  function update<K extends keyof PlanIntent>(key: K, value: PlanIntent[K]) {
    setDraft((d) => ({ ...d, [key]: value }));
  }

  async function apply() {
    setSaving(true);
    // Sync date range → draft
    const next: PlanIntent = {
      ...draft,
      when: dateRange.from ? dateRange.from.toISOString().slice(0, 10) : null,
      whenEnd: dateRange.to ? dateRange.to.toISOString().slice(0, 10) : null,
    };
    await savePlan(next);
    setSaving(false);
    setOpen(false);
    toast.success("Plan updated", {
      description: "Your browse results and recommendations are now scoped to your plan.",
    });
    // Refresh server-rendered pages so /book etc. pick up the new intent
    router.refresh();
  }

  function clear() {
    setDraft({ what: null, where: null, when: null, whenEnd: null, price: null, attendees: null });
    setDateRange({});
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className="group flex h-9 items-center gap-2 rounded-full border border-teal/30 bg-teal/5 px-3 text-sm font-medium text-navy transition-colors hover:bg-teal/10"
          aria-label="Edit your Plan"
        >
          <Compass className="size-4 text-teal" />
          <span className="hidden sm:inline">
            {filledCount === 0 ? (
              "Set your Plan"
            ) : (
              <span className="flex items-center gap-1.5">
                {plan?.what && <span className="font-semibold">{plan.what}</span>}
                {plan?.where && (
                  <span className="flex items-center gap-0.5 text-muted-foreground">
                    <MapPin className="size-3" />
                    {plan.where.split(",")[0]}
                  </span>
                )}
                {plan?.when && (
                  <span className="hidden items-center gap-0.5 text-muted-foreground md:flex">
                    <CalendarDays className="size-3" />
                    {format(new Date(plan.when), "MMM d")}
                  </span>
                )}
              </span>
            )}
          </span>
          <ChevronDown className="size-3.5 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
          {filledCount > 0 && (
            <Badge className="ml-0.5 h-5 min-w-5 justify-center rounded-full bg-teal px-1.5 text-[10px] font-bold text-white">
              {filledCount}
            </Badge>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-[min(92vw,30rem)] p-0"
        sideOffset={8}
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-lg bg-teal/10 text-teal">
              <Compass className="size-4" />
            </div>
            <div>
              <p className="text-sm font-700 text-navy">Your Plan</p>
              <p className="text-[11px] text-muted-foreground">
                Scopes browse results, calendar & recommendations
              </p>
            </div>
          </div>
          <button
            onClick={clear}
            className="text-xs font-medium text-muted-foreground hover:text-foreground"
          >
            Clear
          </button>
        </div>

        <div className="max-h-[70vh] space-y-4 overflow-y-auto scroll-area-thin p-4">
          {/* WHAT */}
          <div>
            <Label className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <Sparkles className="size-3" /> What are you planning?
            </Label>
            <div className="flex flex-wrap gap-1.5">
              {OCCASION_TYPES.map((t) => (
                <button
                  key={t}
                  onClick={() => update("what", t === draft.what ? null : t)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                    draft.what === t
                      ? "border-teal bg-teal text-white"
                      : "border-border bg-card text-foreground hover:bg-muted"
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* WHERE */}
          <div>
            <Label htmlFor="plan-where" className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <MapPin className="size-3" /> Where?
            </Label>
            <Input
              id="plan-where"
              list="plan-cities"
              placeholder="City or destination"
              value={draft.where ?? ""}
              onChange={(e) => update("where", e.target.value || null)}
              className="h-9"
            />
            <datalist id="plan-cities">
              {CITIES.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
            <div className="mt-1.5 flex flex-wrap gap-1">
              {CITIES.slice(0, 4).map((c) => (
                <button
                  key={c}
                  onClick={() => update("where", c)}
                  className="rounded-md px-2 py-0.5 text-[11px] text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  {c.split(",")[0]}
                </button>
              ))}
            </div>
          </div>

          {/* WHEN */}
          <div>
            <Label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <CalendarDays className="size-3" /> When?
            </Label>
            <div className="rounded-lg border border-border">
              <Calendar
                mode="range"
                selected={{
                  from: dateRange.from,
                  to: dateRange.to,
                }}
                onSelect={(range) => {
                  if (!range) {
                    setDateRange({});
                    return;
                  }
                  setDateRange({
                    from: range.from,
                    to: range.to ?? range.from,
                  });
                }}
                numberOfMonths={1}
                className="[&_.rdp-day_button]:h-8 [&_.rdp-day_button]:w-8"
              />
            </div>
            {dateRange.from && (
              <p className="mt-1.5 text-[11px] text-muted-foreground">
                {format(dateRange.from, "MMM d, yyyy")}
                {dateRange.to && dateRange.to !== dateRange.from
                  ? ` → ${format(dateRange.to, "MMM d, yyyy")}`
                  : " (single day)"}
              </p>
            )}
          </div>

          {/* PRICE + ATTENDEES */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                <DollarSign className="size-3" /> Budget
              </Label>
              <select
                value={draft.price ?? ""}
                onChange={(e) => update("price", e.target.value || null)}
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Any</option>
                {PRICE_BANDS.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="plan-attendees" className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                <Users className="size-3" /> Attendees
              </Label>
              <Input
                id="plan-attendees"
                type="number"
                min={1}
                placeholder="2"
                value={draft.attendees ?? ""}
                onChange={(e) => update("attendees", e.target.value || null)}
                className="h-9"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 border-t border-border bg-muted/30 px-4 py-3">
          <p className="hidden items-center gap-1.5 text-[11px] text-muted-foreground sm:flex">
            <Plane className="size-3 text-teal" />
            One plan. Every vertical. One cart.
          </p>
          <div className="ml-auto flex gap-2">
            <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={apply}
              disabled={saving}
              className="bg-teal text-white hover:bg-teal/90"
            >
              {saving ? (
                "Saving…"
              ) : (
                <>
                  <Check className="size-3.5" /> Apply plan
                </>
              )}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
