import { notFound } from "next/navigation";
import { Store } from "lucide-react";

import { db } from "@/lib/db";
import { PageHeader } from "@/components/portal/page-header";

import { Wizard } from "./wizard";
import { type Draft } from "./types";

export const dynamic = "force-dynamic";

function toDraft(d: {
  id: string;
  businessType: string;
  title: string;
  slug: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  description: string | null;
  photos: string | null;
  price: number;
  pricingUnit: string | null;
  availabilityNotes: string | null;
  minNoticeHours: number;
  cancellationPolicy: string | null;
  houseRules: string | null;
  contactEmail: string | null;
  contactPhone: string | null;
  status: string;
  step: number;
  supabaseChannel: string | null;
  publishedListingId: string | null;
  createdAt: Date;
  updatedAt: Date;
}): Draft {
  return {
    id: d.id,
    businessType: d.businessType,
    title: d.title,
    slug: d.slug,
    address: d.address,
    city: d.city,
    state: d.state,
    zip: d.zip,
    description: d.description,
    photos: d.photos,
    price: d.price,
    pricingUnit: d.pricingUnit,
    availabilityNotes: d.availabilityNotes,
    minNoticeHours: d.minNoticeHours,
    cancellationPolicy: d.cancellationPolicy,
    houseRules: d.houseRules,
    contactEmail: d.contactEmail,
    contactPhone: d.contactPhone,
    status: d.status,
    step: d.step,
    supabaseChannel: d.supabaseChannel,
    publishedListingId: d.publishedListingId,
    createdAt: d.createdAt.toISOString(),
    updatedAt: d.updatedAt.toISOString(),
  };
}

export default async function WizardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const row = await db.listingDraft.findUnique({ where: { id } });
  if (!row) notFound();

  const draft = toDraft(row);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Create Listing"
        description="Build your listing step by step — progress saves automatically."
        icon={Store}
      />
      <Wizard initialDraft={draft} />
    </div>
  );
}
