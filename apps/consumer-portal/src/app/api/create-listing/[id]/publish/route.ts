import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { json, error, parseBody, ser } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

// POST /api/create-listing/[id]/publish
// Marks the draft as published and (in production) pushes the listing to the
// marketplace via Supabase messaging. Here we create a local Listing row so the
// portal surface feed picks it up immediately, and we record the channel + id.
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await parseBody<Record<string, unknown>>(req);
  const draft = await db.listingDraft.findUnique({ where: { id } });
  if (!draft) return error("Listing draft not found", 404);

  // Validate required fields before publishing
  const required = ["title", "businessType", "city", "price", "description"];
  for (const k of required) {
    if (!(draft as Record<string, unknown>)[k]) {
      return error(`Missing required field: ${k}`, 400);
    }
  }

  // 1. Create the listing in the shared catalog (polymorphic InventoryItem).
  //    The same row serves both portals: guest /book reads a projection, the
  //    vendor portal reads a projection. Canonical vertical + shared status.
  const listing = await db.listing.create({
    data: {
      title: draft.title,
      vendorId: draft.vendorId ?? "vendor-1",
      vendorName: draft.contactEmail ?? "Planviry Vendor",
      vertical: draft.businessType, // canonical lowercase
      status: "active", // published → active in the shared enum
      city: draft.city ?? "Austin",
      location: draft.address ?? draft.city ?? null,
      price: draft.price,
      unit: draft.pricingUnit ?? null,
      capacity: draft.capacity ?? 0,
      image: draft.photos?.split("|")[0] ?? null,
      rating: 0,
      bookingsCount: 0,
      category: draft.businessType,
      description: draft.description,
      match: 100,
    },
  });

  // 2. Mark the draft published (status "active" in the shared enum) and link it.
  const updated = await db.listingDraft.update({
    where: { id },
    data: {
      status: "active",
      publishedListingId: listing.id,
      supabaseChannel: body.channel ? String(body.channel) : "listing-sync",
    },
  });

  // 3. (Production hook) — emit a Supabase broadcast message so the marketplace
  //    portal can ingest the listing. See /docs/integration.md for the contract.
  //    In this build we just return the payload so the integration team can wire
  //    the @supabase/supabase-js client.
  const message = {
    channel: updated.supabaseChannel ?? "listing-sync",
    event: "listing:published",
    payload: {
      draftId: updated.id,
      listingId: listing.id,
      businessType: draft.businessType,
      title: draft.title,
      slug: draft.slug,
      city: draft.city,
      price: draft.price,
      pricingUnit: draft.pricingUnit,
      description: draft.description,
      photos: draft.photos?.split("|") ?? [],
      vendor: { email: draft.contactEmail, phone: draft.contactPhone },
      policies: {
        cancellation: draft.cancellationPolicy,
        houseRules: draft.houseRules?.split("|") ?? [],
        minNoticeHours: draft.minNoticeHours,
      },
      publishedAt: new Date().toISOString(),
    },
  };

  return json(ser({ ok: true, draft: updated, listing, supabaseMessage: message }));
}
