"use client";

import * as React from "react";
import { toast } from "sonner";
import {
  Sparkles,
  MapPin,
  AlignLeft,
  ImagePlus,
  DollarSign,
  CalendarClock,
  ScrollText,
  CheckCircle2,
  LocateFixed,
  Plus,
  X,
  ChevronUp,
  ChevronDown,
  Star,
  Mail,
  Phone,
  Globe,
  Tag,
  FileText,
  ImageIcon,
  ShieldCheck,
  CircleCheck,
  CircleX,
  Info,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { VerticalIcon } from "@/components/portal/vertical";
import {
  VERTICALS,
  VERTICAL_META,
  formatCurrency,
  type Vertical,
} from "@/lib/constants";

import { type FormState, slugify } from "./types";

// ---------------------------------------------------------------------------
// Step metadata (used by the wizard + step rail)
// ---------------------------------------------------------------------------

export type StepMeta = {
  key: string;
  label: string;
  icon: LucideIcon;
  hint: string;
};

export const STEP_META: StepMeta[] = [
  { key: "basics", label: "Basics", icon: Sparkles, hint: "Type & title" },
  { key: "location", label: "Location", icon: MapPin, hint: "Where" },
  { key: "description", label: "Description", icon: AlignLeft, hint: "The story" },
  { key: "media", label: "Media", icon: ImagePlus, hint: "Photos" },
  { key: "pricing", label: "Pricing", icon: DollarSign, hint: "Rates" },
  { key: "availability", label: "Availability", icon: CalendarClock, hint: "When" },
  { key: "policies", label: "Policies", icon: ScrollText, hint: "Rules" },
  { key: "review", label: "Review", icon: CheckCircle2, hint: "Publish" },
];

export const TOTAL_STEPS = STEP_META.length;

// ---------------------------------------------------------------------------
// Shared step props
// ---------------------------------------------------------------------------

export type StepProps = {
  form: FormState;
  update: (patch: Partial<FormState>) => void;
  errors: Record<string, string>;
};

const VERTICAL_DESCRIPTIONS: Record<Vertical, string> = {
  Property: "Stays, homes, and short-term rentals",
  Tickets: "Event tickets and admissions",
  Venue: "Event spaces for gatherings and parties",
  Service: "Professional services and experiences",
  Dining: "Restaurants, private dining, and catering",
  Transport: "Cars, charters, and transit",
};

const MAJOR_CITIES = [
  "Austin", "Chicago", "New York", "Los Angeles", "San Francisco",
  "Seattle", "Boston", "Miami", "Denver", "Nashville",
  "Atlanta", "Portland", "Dallas", "Houston", "Phoenix",
  "Las Vegas", "Washington", "Philadelphia", "San Diego", "Minneapolis",
];

const PRICING_UNITS = [
  { value: "per night", label: "per night" },
  { value: "per person", label: "per person" },
  { value: "per hour", label: "per hour" },
  { value: "per event", label: "per event" },
  { value: "flat", label: "flat rate" },
];

const CANCELLATION_PRESETS = [
  { value: "Flexible — full refund up to 24 hours before", label: "Flexible — full refund up to 24h before" },
  { value: "Full refund up to 14 days before", label: "Full refund up to 14 days before" },
  { value: "50% refund up to 7 days before", label: "50% refund up to 7 days before" },
  { value: "No refund", label: "No refund" },
];

const HOUSE_RULE_SUGGESTIONS = [
  "No smoking",
  "No pets",
  "No outside food",
  "Quiet hours after 10pm",
  "Maximum occupancy: 50",
  "No amplified music outdoors",
];

// ---------------------------------------------------------------------------
// Small shared UI helpers
// ---------------------------------------------------------------------------

function FieldError({ id, msg }: { id?: string; msg?: string }) {
  if (!msg) return null;
  return (
    <p id={id} className="mt-1 text-xs font-medium text-destructive">
      {msg}
    </p>
  );
}

function StepHeader({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <div className="mb-6 flex items-start gap-3">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-teal/10 text-teal">
        <Icon className="size-5" />
      </div>
      <div>
        <h2 className="font-display text-xl font-600 tracking-tight text-navy">
          {title}
        </h2>
        <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

// ===========================================================================
// Step 1 — Basics
// ===========================================================================

export function BasicsStep({ form, update, errors }: StepProps) {
  const [slugTouched, setSlugTouched] = React.useState(
    () => !!form.slug && form.slug !== slugify(form.title)
  );

  function onTitleChange(v: string) {
    const patch: Partial<FormState> = { title: v };
    if (!slugTouched) patch.slug = slugify(v);
    update(patch);
  }

  function onSlugChange(v: string) {
    setSlugTouched(true);
    update({ slug: slugify(v) });
  }

  const urlPreview = form.slug
    ? `planviry.app/l/${form.slug}`
    : "planviry.app/l/your-listing";

  return (
    <div>
      <StepHeader
        title="Let's start with the basics"
        description="Tell us what you're listing and what it's called."
        icon={Sparkles}
      />

      <div className="space-y-6">
        {/* Business type */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-navy">
            What are you listing? <span className="text-destructive">*</span>
          </Label>
          <p className="text-xs text-muted-foreground">
            Choose the category that best fits your offering.
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {VERTICALS.map((v) => {
              const meta = VERTICAL_META[v];
              const selected = form.businessType === v;
              return (
                <button
                  key={v}
                  type="button"
                  onClick={() => update({ businessType: v })}
                  aria-pressed={selected}
                  className={`group flex flex-col items-start gap-2 rounded-xl border p-3 text-left transition-all ${
                    selected
                      ? "border-teal bg-teal/5 ring-1 ring-teal/30"
                      : "border-border bg-card hover:border-teal/40 hover:bg-teal/[0.03]"
                  }`}
                >
                  <div
                    className="flex size-9 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${meta.color}14`, color: meta.color }}
                  >
                    <VerticalIcon vertical={v} className="size-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-display text-sm font-600 text-navy">
                        {meta.label}
                      </span>
                      {selected && (
                        <CheckCircle2 className="size-3.5 text-teal" />
                      )}
                    </div>
                    <p className="mt-0.5 text-[11px] leading-tight text-muted-foreground">
                      {VERTICAL_DESCRIPTIONS[v]}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
          <FieldError msg={errors.businessType} />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="title" className="text-sm font-semibold text-navy">
            Listing title <span className="text-destructive">*</span>
          </Label>
          <Input
            id="title"
            value={form.title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="e.g. The Garden Terrace at Hillside"
            maxLength={80}
            aria-invalid={!!errors.title}
            aria-describedby={errors.title ? "title-error" : undefined}
          />
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              A clear, memorable name — avoid all-caps and special characters.
            </p>
            <span className="text-xs text-muted-foreground">
              {form.title.length}/80
            </span>
          </div>
          <FieldError id="title-error" msg={errors.title} />
        </div>

        {/* Slug */}
        <div className="space-y-2">
          <Label htmlFor="slug" className="text-sm font-semibold text-navy">
            Listing URL
          </Label>
          <div className="flex items-center gap-2">
            <span className="flex shrink-0 items-center gap-1.5 rounded-lg border border-border bg-muted px-3 py-2 text-sm text-muted-foreground">
              <Globe className="size-3.5" />
              planviry.app/l/
            </span>
            <Input
              id="slug"
              value={form.slug}
              onChange={(e) => onSlugChange(e.target.value)}
              placeholder="the-garden-terrace"
              className="flex-1"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Preview:{" "}
            <span className="font-medium text-navy">{urlPreview}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

// ===========================================================================
// Step 2 — Location
// ===========================================================================

export function LocationStep({ form, update, errors }: StepProps) {
  return (
    <div>
      <StepHeader
        title="Where is it located?"
        description="Guests use location to find and filter listings."
        icon={MapPin}
      />

      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="address" className="text-sm font-semibold text-navy">
            Street address
          </Label>
          <Input
            id="address"
            value={form.address}
            onChange={(e) => update({ address: e.target.value })}
            placeholder="123 Hillside Avenue"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="city" className="text-sm font-semibold text-navy">
              City <span className="text-destructive">*</span>
            </Label>
            <Input
              id="city"
              list="city-list"
              value={form.city}
              onChange={(e) => update({ city: e.target.value })}
              placeholder="Austin"
              aria-invalid={!!errors.city}
              aria-describedby={errors.city ? "city-error" : undefined}
            />
            <datalist id="city-list">
              {MAJOR_CITIES.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
            <FieldError id="city-error" msg={errors.city} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="state" className="text-sm font-semibold text-navy">
              State / Region
            </Label>
            <Input
              id="state"
              value={form.state}
              onChange={(e) => update({ state: e.target.value })}
              placeholder="TX"
              maxLength={40}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="zip" className="text-sm font-semibold text-navy">
              Postal code
            </Label>
            <Input
              id="zip"
              value={form.zip}
              onChange={(e) => update({ zip: e.target.value })}
              placeholder="78701"
              maxLength={20}
            />
          </div>

          <div className="flex items-end">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                toast.info("Location services aren't available in this demo.")
              }
              className="gap-1.5"
            >
              <LocateFixed className="size-3.5" />
              Use my location
            </Button>
          </div>
        </div>

        {/* Map placeholder */}
        <div className="relative h-40 overflow-hidden rounded-xl border border-dashed border-border bg-muted/40">
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 text-muted-foreground">
            <MapPin className="size-7" />
            <p className="text-xs">
              {form.city
                ? `Map preview for ${form.city}${form.state ? `, ${form.state}` : ""}`
                : "Add a city to see a map preview"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===========================================================================
// Step 3 — Description
// ===========================================================================

const DESC_MAX = 2000;
const DESC_MIN = 30;

export function DescriptionStep({ form, update, errors }: StepProps) {
  const len = form.description.length;
  return (
    <div>
      <StepHeader
        title="Describe your listing"
        description="Help guests picture themselves there."
        icon={AlignLeft}
      />
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="description" className="text-sm font-semibold text-navy">
            Description <span className="text-destructive">*</span>
          </Label>
          <span
            className={`text-xs ${
              len < DESC_MIN
                ? "text-muted-foreground"
                : len > DESC_MAX - 100
                ? "text-amber-600"
                : "text-teal"
            }`}
          >
            {len} / {DESC_MAX}
          </span>
        </div>
        <Textarea
          id="description"
          value={form.description}
          onChange={(e) =>
            update({ description: e.target.value.slice(0, DESC_MAX) })
          }
          rows={7}
          placeholder={`Highlight what makes your listing unique — atmosphere, capacity, amenities, and what guests can expect.\n\nExample: "An intimate 40-seat rooftop terrace overlooking downtown Austin, perfect for rehearsal dinners and milestone birthdays. Includes string lighting, weather backup, and a dedicated event lead."`}
          aria-invalid={!!errors.description}
          aria-describedby={errors.description ? "description-error" : undefined}
        />
        <div className="rounded-lg bg-teal/[0.04] p-3">
          <div className="flex gap-2">
            <Info className="size-4 shrink-0 text-teal" />
            <div className="space-y-1 text-xs text-muted-foreground">
              <p className="font-medium text-navy">What makes a great description?</p>
              <ul className="ml-4 list-disc space-y-0.5">
                <li>Lead with the vibe and key selling points.</li>
                <li>Mention capacity, amenities, and what's included.</li>
                <li>Note anything unique (view, history, accessibility).</li>
                <li>The first ~160 characters appear in search previews.</li>
              </ul>
            </div>
          </div>
        </div>
        <FieldError id="description-error" msg={errors.description} />
      </div>
    </div>
  );
}

// ===========================================================================
// Step 4 — Media
// ===========================================================================

export function MediaStep({ form, update }: StepProps) {
  const [urlInput, setUrlInput] = React.useState("");

  function addUrl() {
    const v = urlInput.trim();
    if (!v) return;
    if (form.photos.includes(v)) {
      toast.error("That photo was already added.");
      return;
    }
    update({ photos: [...form.photos, v] });
    setUrlInput("");
  }

  function removeAt(i: number) {
    update({ photos: form.photos.filter((_, idx) => idx !== i) });
  }

  function move(i: number, dir: -1 | 1) {
    const next = [...form.photos];
    const j = i + dir;
    if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    update({ photos: next });
  }

  return (
    <div>
      <StepHeader
        title="Add photos"
        description="Bright, well-lit photos get up to 2× more bookings."
        icon={ImagePlus}
      />

      <div className="space-y-5">
        {/* Add URL */}
        <div className="space-y-2">
          <Label htmlFor="photo-url" className="text-sm font-semibold text-navy">
            Add a photo URL
          </Label>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Input
              id="photo-url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addUrl();
                }
              }}
              placeholder="https://images.example.com/your-photo.jpg"
              className="flex-1"
            />
            <Button
              type="button"
              onClick={addUrl}
              disabled={!urlInput.trim()}
              className="bg-teal text-white hover:bg-teal/90"
            >
              <Plus className="size-4" />
              Add photo
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Paste a direct image URL. The first photo is your cover — drag to
            reorder.
          </p>
        </div>

        {/* Grid of photos */}
        {form.photos.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 px-6 py-12 text-center">
            <div className="mb-3 flex size-12 items-center justify-center rounded-xl bg-muted text-muted-foreground">
              <ImageIcon className="size-6" />
            </div>
            <h3 className="font-display text-sm font-600 text-navy">
              No photos yet
            </h3>
            <p className="mt-1 max-w-xs text-xs text-muted-foreground">
              Add at least one photo before publishing. Listings with 4+ photos
              get the most bookings.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {form.photos.map((src, i) => (
              <div
                key={`${src}-${i}`}
                className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-muted"
              >
                <img
                  src={src}
                  alt={`Photo ${i + 1}`}
                  className="size-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
                {i === 0 && (
                  <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-navy/85 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur">
                    <Star className="size-2.5 fill-teal text-teal" />
                    Cover
                  </span>
                )}
                <div className="absolute right-2 top-2 flex flex-col gap-1">
                  <button
                    type="button"
                    onClick={() => removeAt(i)}
                    aria-label={`Remove photo ${i + 1}`}
                    className="flex size-6 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-destructive"
                  >
                    <X className="size-3.5" />
                  </button>
                </div>
                {form.photos.length > 1 && (
                  <div className="absolute bottom-2 right-2 flex gap-1">
                    <button
                      type="button"
                      onClick={() => move(i, -1)}
                      disabled={i === 0}
                      aria-label={`Move photo ${i + 1} left`}
                      className="flex size-6 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-navy disabled:opacity-30"
                    >
                      <ChevronUp className="size-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => move(i, 1)}
                      disabled={i === form.photos.length - 1}
                      aria-label={`Move photo ${i + 1} right`}
                      className="flex size-6 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-navy disabled:opacity-30"
                    >
                      <ChevronDown className="size-3.5" />
                    </button>
                  </div>
                )}
                <span className="absolute bottom-2 left-2 rounded-full bg-black/50 px-1.5 py-0.5 text-[10px] font-medium text-white backdrop-blur">
                  {i + 1}
                </span>
              </div>
            ))}
          </div>
        )}

        <p className="text-xs text-muted-foreground">
          {form.photos.length} photo{form.photos.length === 1 ? "" : "s"} added
        </p>
      </div>
    </div>
  );
}

// ===========================================================================
// Step 5 — Pricing
// ===========================================================================

export function PricingStep({ form, update, errors }: StepProps) {
  const priceNum = parseFloat(form.price);
  const validPrice = !isNaN(priceNum) && priceNum > 0;
  const payout = validPrice ? priceNum * 0.95 : 0;

  return (
    <div>
      <StepHeader
        title="Set your price"
        description="You can adjust this any time before publishing."
        icon={DollarSign}
      />

      <div className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="price" className="text-sm font-semibold text-navy">
              Price <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground">
                $
              </span>
              <Input
                id="price"
                type="number"
                inputMode="decimal"
                min={0}
                step="0.01"
                value={form.price}
                onChange={(e) => update({ price: e.target.value })}
                placeholder="0.00"
                className="pl-7"
                aria-invalid={!!errors.price}
                aria-describedby={errors.price ? "price-error" : undefined}
              />
            </div>
            <FieldError id="price-error" msg={errors.price} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pricingUnit" className="text-sm font-semibold text-navy">
              Pricing unit <span className="text-destructive">*</span>
            </Label>
            <Select
              value={form.pricingUnit}
              onValueChange={(v) => update({ pricingUnit: v })}
            >
              <SelectTrigger id="pricingUnit" className="w-full">
                <SelectValue placeholder="Select a unit" />
              </SelectTrigger>
              <SelectContent>
                {PRICING_UNITS.map((u) => (
                  <SelectItem key={u.value} value={u.value}>
                    {u.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldError msg={errors.pricingUnit} />
          </div>
        </div>

        {/* Payout preview */}
        <Card className="border-teal/20 bg-teal/[0.03]">
          <CardContent className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex size-9 items-center justify-center rounded-lg bg-teal/10 text-teal">
                <DollarSign className="size-4" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  You'll receive
                </p>
                <p className="font-display text-xl font-700 text-navy">
                  {formatCurrency(payout)}
                  {form.pricingUnit ? (
                    <span className="ml-1 text-sm font-normal text-muted-foreground">
                      {form.pricingUnit}
                    </span>
                  ) : null}
                </p>
              </div>
            </div>
            <div className="text-xs text-muted-foreground sm:text-right">
              <p>
                Guest pays{" "}
                <span className="font-medium text-navy">
                  {formatCurrency(validPrice ? priceNum : 0)}
                </span>
              </p>
              <p>
                Planviry service fee:{" "}
                <span className="font-medium text-navy">5%</span>
              </p>
            </div>
          </CardContent>
        </Card>

        <p className="text-xs text-muted-foreground">
          Prices are in USD. You can offer seasonal rates or discounts after
          publishing.
        </p>
      </div>
    </div>
  );
}

// ===========================================================================
// Step 6 — Availability
// ===========================================================================

export function AvailabilityStep({ form, update }: StepProps) {
  return (
    <div>
      <StepHeader
        title="Availability & notice"
        description="Tell guests when you're available and how far in advance to book."
        icon={CalendarClock}
      />

      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="availabilityNotes" className="text-sm font-semibold text-navy">
            Availability notes
          </Label>
          <Textarea
            id="availabilityNotes"
            value={form.availabilityNotes}
            onChange={(e) => update({ availabilityNotes: e.target.value })}
            rows={4}
            placeholder="e.g. Available Friday–Sunday, 10am–11pm. Closed on major holidays. Same-day bookings subject to confirmation."
          />
          <p className="text-xs text-muted-foreground">
            Describe your typical availability, blackout dates, or seasonal
            schedule.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="minNoticeHours" className="text-sm font-semibold text-navy">
            Minimum booking notice
          </Label>
          <div className="flex items-center gap-3">
            <Input
              id="minNoticeHours"
              type="number"
              min={0}
              step={1}
              value={form.minNoticeHours}
              onChange={(e) => update({ minNoticeHours: e.target.value })}
              className="w-32"
            />
            <span className="text-sm text-muted-foreground">hours</span>
          </div>
          <p className="text-xs text-muted-foreground">
            How much advance notice do you need before a booking? Most hosts set
            24–48 hours.
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {[1, 24, 48, 72, 168].map((h) => (
              <button
                key={h}
                type="button"
                onClick={() => update({ minNoticeHours: String(h) })}
                className={`rounded-full border px-2.5 py-1 text-xs font-medium transition ${
                  form.minNoticeHours === String(h)
                    ? "border-teal bg-teal/10 text-teal"
                    : "border-border bg-card text-muted-foreground hover:border-teal/40"
                }`}
              >
                {h < 24
                  ? `${h} hour${h === 1 ? "" : "s"}`
                  : h === 168
                  ? "1 week"
                  : `${h / 24} day${h / 24 === 1 ? "" : "s"}`}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ===========================================================================
// Step 7 — Policies
// ===========================================================================

export function PoliciesStep({ form, update }: StepProps) {
  const [ruleInput, setRuleInput] = React.useState("");
  const isCustom = !CANCELLATION_PRESETS.some(
    (p) => p.value === form.cancellationPolicy
  ) && !!form.cancellationPolicy;

  function addRule(v?: string) {
    const rule = (v ?? ruleInput).trim();
    if (!rule) return;
    if (form.houseRules.includes(rule)) {
      toast.error("That rule was already added.");
      return;
    }
    update({ houseRules: [...form.houseRules, rule] });
    setRuleInput("");
  }

  function removeRule(i: number) {
    update({ houseRules: form.houseRules.filter((_, idx) => idx !== i) });
  }

  return (
    <div>
      <StepHeader
        title="Policies & house rules"
        description="Set expectations upfront to avoid issues later."
        icon={ScrollText}
      />

      <div className="space-y-6">
        {/* Cancellation policy */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-navy">
            Cancellation policy
          </Label>
          <Select
            value={isCustom ? "__custom__" : form.cancellationPolicy}
            onValueChange={(v) => {
              if (v === "__custom__") {
                update({ cancellationPolicy: "" });
              } else {
                update({ cancellationPolicy: v });
              }
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a policy" />
            </SelectTrigger>
            <SelectContent>
              {CANCELLATION_PRESETS.map((p) => (
                <SelectItem key={p.value} value={p.value}>
                  {p.label}
                </SelectItem>
              ))}
              <SelectItem value="__custom__">Custom policy</SelectItem>
            </SelectContent>
          </Select>

          {isCustom && (
            <div className="space-y-2 pt-1">
              <Textarea
                value={form.cancellationPolicy}
                onChange={(e) =>
                  update({ cancellationPolicy: e.target.value })
                }
                rows={3}
                placeholder="Describe your custom cancellation policy in plain language…"
              />
              <p className="text-xs text-muted-foreground">
                Be specific about timing, refunds, and any non-refundable
                deposits.
              </p>
            </div>
          )}
        </div>

        <Separator />

        {/* House rules */}
        <div className="space-y-3">
          <div>
            <Label htmlFor="rule-input" className="text-sm font-semibold text-navy">
              House rules
            </Label>
            <p className="text-xs text-muted-foreground">
              Add rules guests should know about. They'll be shown at checkout.
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Input
              id="rule-input"
              value={ruleInput}
              onChange={(e) => setRuleInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addRule();
                }
              }}
              placeholder="e.g. No confetti or glitter"
              className="flex-1"
            />
            <Button
              type="button"
              onClick={() => addRule()}
              disabled={!ruleInput.trim()}
              variant="outline"
            >
              <Plus className="size-4" />
              Add rule
            </Button>
          </div>

          {/* Suggestions */}
          <div className="flex flex-wrap gap-2">
            {HOUSE_RULE_SUGGESTIONS.filter(
              (s) => !form.houseRules.includes(s)
            ).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => addRule(s)}
                className="inline-flex items-center gap-1 rounded-full border border-dashed border-border bg-card px-2.5 py-1 text-xs text-muted-foreground transition hover:border-teal/50 hover:text-teal"
              >
                <Plus className="size-3" />
                {s}
              </button>
            ))}
          </div>

          {/* Rule chips */}
          {form.houseRules.length > 0 && (
            <ul className="flex flex-wrap gap-2 pt-1">
              {form.houseRules.map((rule, i) => (
                <li
                  key={`${rule}-${i}`}
                  className="inline-flex items-center gap-1.5 rounded-full bg-teal/10 px-3 py-1 text-xs font-medium text-teal"
                >
                  <ScrollText className="size-3" />
                  {rule}
                  <button
                    type="button"
                    onClick={() => removeRule(i)}
                    aria-label={`Remove rule: ${rule}`}
                    className="rounded-full p-0.5 hover:bg-teal/20"
                  >
                    <X className="size-3" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

// ===========================================================================
// Step 8 — Contact & Review
// ===========================================================================

export function ContactReviewStep({
  form,
  update,
  errors,
  draft,
}: StepProps & { draft: { id: string; status: string; updatedAt: string } }) {
  const checklist: { label: string; ok: boolean; hint?: string }[] = [
    { label: "Business type", ok: !!form.businessType },
    { label: "Listing title", ok: form.title.trim().length >= 3 },
    { label: "Location (city)", ok: !!form.city.trim() },
    {
      label: "Description",
      ok: form.description.trim().length >= 30,
      hint: "At least 30 characters",
    },
    { label: "At least one photo", ok: form.photos.length >= 1 },
    {
      label: "Price set",
      ok: !isNaN(parseFloat(form.price)) && parseFloat(form.price) > 0,
    },
    {
      label: "Contact email",
      ok: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.contactEmail),
    },
    { label: "Cancellation policy", ok: !!form.cancellationPolicy.trim() },
  ];
  const allReady = checklist.every((c) => c.ok);

  return (
    <div>
      <StepHeader
        title="Contact details & review"
        description="Almost live — verify your details and publish to the marketplace."
        icon={CheckCircle2}
      />

      <div className="space-y-6">
        {/* Contact */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="contactEmail" className="text-sm font-semibold text-navy">
              Contact email <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="contactEmail"
                type="email"
                value={form.contactEmail}
                onChange={(e) => update({ contactEmail: e.target.value })}
                placeholder="host@example.com"
                className="pl-9"
                aria-invalid={!!errors.contactEmail}
                aria-describedby={errors.contactEmail ? "email-error" : undefined}
              />
            </div>
            <FieldError id="email-error" msg={errors.contactEmail} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactPhone" className="text-sm font-semibold text-navy">
              Contact phone
            </Label>
            <div className="relative">
              <Phone className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="contactPhone"
                type="tel"
                value={form.contactPhone}
                onChange={(e) => update({ contactPhone: e.target.value })}
                placeholder="(512) 555-0199"
                className="pl-9"
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Pre-publish checklist */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-sm font-600 text-navy">
              Pre-publish checklist
            </h3>
            {allReady ? (
              <Badge className="rounded-full bg-teal/10 text-teal hover:bg-teal/10">
                <ShieldCheck className="size-3" />
                Ready to publish
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="rounded-full text-amber-600"
              >
                {checklist.filter((c) => !c.ok).length} item(s) missing
              </Badge>
            )}
          </div>
          <ul className="grid gap-1.5 sm:grid-cols-2">
            {checklist.map((c) => (
              <li
                key={c.label}
                className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm ${
                  c.ok
                    ? "border-teal/20 bg-teal/[0.04] text-navy"
                    : "border-amber-200 bg-amber-50 text-amber-900"
                }`}
              >
                {c.ok ? (
                  <CircleCheck className="size-4 shrink-0 text-teal" />
                ) : (
                  <CircleX className="size-4 shrink-0 text-amber-500" />
                )}
                <span className="font-medium">{c.label}</span>
                {!c.ok && c.hint && (
                  <span className="ml-auto text-[11px] text-amber-600">
                    {c.hint}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <Separator />

        {/* Review summary */}
        <div className="space-y-3">
          <h3 className="font-display text-sm font-600 text-navy">
            Listing summary
          </h3>
          <Card className="overflow-hidden py-0">
            {/* Cover */}
            {form.photos[0] && (
              <div className="h-32 w-full overflow-hidden bg-muted">
                <img
                  src={form.photos[0]}
                  alt={form.title}
                  className="size-full object-cover"
                />
              </div>
            )}
            <CardContent className="space-y-4 p-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  {form.businessType && (
                    <Badge className="rounded-full bg-teal/10 text-teal hover:bg-teal/10">
                      {form.businessType}
                    </Badge>
                  )}
                  <span className="text-xs text-muted-foreground">
                    Last updated {relativeTimeShort(draft.updatedAt)}
                  </span>
                </div>
                <h4 className="mt-1.5 font-display text-lg font-600 text-navy">
                  {form.title || "Untitled Listing"}
                </h4>
                {form.city && (
                  <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="size-3" />
                    {[form.address, form.city, form.state]
                      .filter(Boolean)
                      .join(", ")}
                    {form.zip ? ` ${form.zip}` : ""}
                  </p>
                )}
              </div>

              {form.description && (
                <div>
                  <ReviewRow icon={FileText} label="Description">
                    <p className="line-clamp-3 whitespace-pre-wrap text-sm text-muted-foreground">
                      {form.description}
                    </p>
                  </ReviewRow>
                </div>
              )}

              <div className="grid gap-3 sm:grid-cols-2">
                <ReviewRow icon={Tag} label="Pricing">
                  <span className="text-sm font-medium text-navy">
                    {formatCurrency(parseFloat(form.price) || 0)}
                    {form.pricingUnit
                      ? ` ${form.pricingUnit}`
                      : ""}
                  </span>
                </ReviewRow>
                <ReviewRow icon={CalendarClock} label="Min. notice">
                  <span className="text-sm text-muted-foreground">
                    {form.minNoticeHours || "24"} hours
                  </span>
                </ReviewRow>
                {form.cancellationPolicy && (
                  <ReviewRow icon={ShieldCheck} label="Cancellation">
                    <span className="text-sm text-muted-foreground line-clamp-2">
                      {form.cancellationPolicy}
                    </span>
                  </ReviewRow>
                )}
                {form.houseRules.length > 0 && (
                  <ReviewRow icon={ScrollText} label="House rules">
                    <span className="text-sm text-muted-foreground">
                      {form.houseRules.length} rule
                      {form.houseRules.length === 1 ? "" : "s"}
                    </span>
                  </ReviewRow>
                )}
                {form.availabilityNotes && (
                  <ReviewRow icon={CalendarClock} label="Availability">
                    <span className="text-sm text-muted-foreground line-clamp-2">
                      {form.availabilityNotes}
                    </span>
                  </ReviewRow>
                )}
                {form.contactEmail && (
                  <ReviewRow icon={Mail} label="Contact">
                    <span className="text-sm text-muted-foreground">
                      {form.contactEmail}
                      {form.contactPhone ? ` · ${form.contactPhone}` : ""}
                    </span>
                  </ReviewRow>
                )}
              </div>

              {form.photos.length > 0 && (
                <ReviewRow icon={ImagePlus} label="Photos">
                  <span className="text-sm text-muted-foreground">
                    {form.photos.length} photo
                    {form.photos.length === 1 ? "" : "s"}
                  </span>
                </ReviewRow>
              )}
            </CardContent>
          </Card>

          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Info className="size-3.5" />
            Publishing sends your listing to the Planviry marketplace via
            Supabase Realtime. You can edit or unpublish at any time.
          </p>
        </div>
      </div>
    </div>
  );
}

function ReviewRow({
  icon: Icon,
  label,
  children,
}: {
  icon: LucideIcon;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-2">
      <Icon className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <div className="mt-0.5">{children}</div>
      </div>
    </div>
  );
}

function relativeTimeShort(d: string): string {
  const date = new Date(d);
  if (isNaN(date.getTime())) return "recently";
  const diff = Date.now() - date.getTime();
  const sec = Math.floor(diff / 1000);
  if (sec < 60) return "just now";
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const day = Math.floor(hr / 24);
  if (day < 7) return `${day}d ago`;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}
