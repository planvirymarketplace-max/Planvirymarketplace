import Link from "next/link";
import {
  Store,
  FileEdit,
  CheckCircle2,
  Hourglass,
  ArrowRight,
  MapPin,
} from "lucide-react";

import { db } from "@/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

import { PageHeader } from "@/components/portal/page-header";
import { EmptyState } from "@/components/portal/empty-state";
import {
  VerticalBadge,
  VerticalIcon,
} from "@/components/portal/vertical";
import {
  VERTICALS,
  VERTICAL_META,
  formatDate,
  relativeTime,
  formatCurrency,
  type Vertical,
} from "@/lib/constants";

import { NewListingButton } from "./_components/new-listing-button";
import { DraftCardActions } from "./_components/draft-card-actions";

export const dynamic = "force-dynamic";

const TOTAL_STEPS = 8;

function normalizeVertical(v: string): Vertical {
  return (VERTICALS as string[]).includes(v) ? (v as Vertical) : "services";
}

export default async function CreateListingPage() {
  const drafts = await db.listingDraft.findMany({
    orderBy: { updatedAt: "desc" },
  });

  const total = drafts.length;
  const published = drafts.filter((d) => d.status === "active").length;
  const inProgress = total - published;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Create Listing"
        description="Publish your venue, service, or stay to the Planviry marketplace."
        icon={Store}
        actions={<NewListingButton />}
      />

      {/* Stats row */}
      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard
          icon={FileEdit}
          label="Total drafts"
          value={total}
          tint="text-navy"
        />
        <StatCard
          icon={Hourglass}
          label="In progress"
          value={inProgress}
          tint="text-amber-600"
        />
        <StatCard
          icon={CheckCircle2}
          label="Published"
          value={published}
          tint="text-teal"
        />
      </div>

      {total === 0 ? (
        <EmptyState
          icon={Store}
          title="No listings yet"
          description="Start your first listing — it takes about 5 minutes. We'll save your progress automatically so you can come back any time."
          action={<NewListingButton size="lg" />}
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {drafts.map((d) => (
            <DraftCard
              key={d.id}
              id={d.id}
              title={d.title}
              businessType={d.businessType}
              status={d.status}
              step={d.step}
              city={d.city}
              price={d.price}
              pricingUnit={d.pricingUnit}
              photo={d.photos?.split("|")[0] ?? null}
              publishedListingId={d.publishedListingId}
              updatedAt={d.updatedAt}
              createdAt={d.createdAt}
            />
          ))}
        </div>
      )}

      <div className="flex items-center justify-between pt-2">
        <Button asChild variant="ghost" size="sm">
          <Link href="/">
            Back to dashboard
            <ArrowRight className="size-3.5" />
          </Link>
        </Button>
        <span className="text-xs text-muted-foreground">
          {total === 1 ? "1 listing" : `${total} listings`}
        </span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Stat card
// ---------------------------------------------------------------------------

function StatCard({
  icon: Icon,
  label,
  value,
  tint,
}: {
  icon: typeof FileEdit;
  label: string;
  value: number;
  tint: string;
}) {
  return (
    <Card className="py-0">
      <CardContent className="flex items-center gap-3 p-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted">
          <Icon className={`size-5 ${tint}`} />
        </div>
        <div className="min-w-0">
          <div className="font-display text-2xl font-700 leading-none text-navy">
            {value}
          </div>
          <div className="mt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {label}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Draft card (server)
// ---------------------------------------------------------------------------

function DraftCard({
  id,
  title,
  businessType,
  status,
  step,
  city,
  price,
  pricingUnit,
  photo,
  publishedListingId,
  updatedAt,
  createdAt,
}: {
  id: string;
  title: string;
  businessType: string;
  status: string;
  step: number;
  city: string | null;
  price: number;
  pricingUnit: string | null;
  photo: string | null;
  publishedListingId: string | null;
  updatedAt: Date;
  createdAt: Date;
}) {
  const vertical = normalizeVertical(businessType);
  const meta = VERTICAL_META[vertical];
  const isPublished = status === "active";
  const progressPct = Math.min(
    100,
    Math.round(((isPublished ? TOTAL_STEPS : step) / TOTAL_STEPS) * 100)
  );

  return (
    <Card className="group flex flex-col overflow-hidden py-0 transition-all hover:-translate-y-0.5 hover:shadow-md">
      {/* Cover */}
      <div
        className="relative h-32 overflow-hidden"
        style={{ backgroundColor: `${meta.color}10` }}
      >
        {photo ? (
          <img
            src={photo}
            alt={title}
            className="size-full object-cover transition-transform group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div
            className="flex size-full items-center justify-center"
            style={{ color: meta.color }}
          >
            <VerticalIcon vertical={vertical} className="size-10" />
          </div>
        )}
        <div className="absolute left-2 top-2">
          <VerticalBadge vertical={vertical} />
        </div>
        <div className="absolute right-2 top-2">
          {isPublished ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-teal px-2.5 py-0.5 text-[11px] font-semibold text-white shadow-sm">
              <CheckCircle2 className="size-3" />
              Published
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/90 px-2.5 py-0.5 text-[11px] font-semibold text-white shadow-sm">
              <Hourglass className="size-3" />
              Draft
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <CardContent className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="line-clamp-1 font-display text-base font-600 leading-tight text-navy">
            {title || "Untitled Listing"}
          </h3>
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
            {city ? (
              <span className="inline-flex items-center gap-1">
                <MapPin className="size-3" />
                {city}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 italic">
                <MapPin className="size-3" />
                No location yet
              </span>
            )}
            {price > 0 && (
              <span className="font-medium text-navy">
                {formatCurrency(price)}
                {pricingUnit ? ` / ${pricingUnit.replace("per ", "")}` : ""}
              </span>
            )}
          </div>
        </div>

        {/* Step progress */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            <span>
              {isPublished
                ? "Published"
                : `Step ${Math.max(1, step)} of ${TOTAL_STEPS}`}
            </span>
            <span>{progressPct}%</span>
          </div>
          <Progress
            value={progressPct}
            className="h-1.5 bg-muted [&>div]:bg-teal"
          />
        </div>

        {/* Meta footer */}
        <div className="flex items-center justify-between text-[11px] text-muted-foreground">
          <span>Updated {relativeTime(updatedAt)}</span>
          {isPublished && (
            <Badge
              variant="outline"
              className="rounded-full px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
            >
              {formatDate(createdAt)}
            </Badge>
          )}
        </div>

        {/* Actions */}
        <div className="mt-auto border-t border-border pt-3">
          <DraftCardActions
            id={id}
            status={status}
            publishedListingId={publishedListingId}
          />
        </div>
      </CardContent>
    </Card>
  );
}
