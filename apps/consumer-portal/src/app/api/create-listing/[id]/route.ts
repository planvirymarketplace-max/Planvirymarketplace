import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { json, error, parseBody, ser } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const draft = await db.listingDraft.findUnique({ where: { id } });
  if (!draft) return error("Listing draft not found", 404);
  return json(ser(draft));
}

// PATCH — autosave any subset of fields + bump step
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await parseBody<Record<string, unknown>>(req);
  const allowed = [
    "businessType", "title", "slug",
    "address", "city", "state", "zip",
    "description",
    "photos",
    "price", "pricingUnit",
    "availabilityNotes", "minNoticeHours",
    "cancellationPolicy", "houseRules",
    "contactEmail", "contactPhone",
    "status", "step",
  ];
  const data: Record<string, unknown> = {};
  for (const k of allowed) {
    if (k in body) data[k] = body[k];
  }
  const updated = await db.listingDraft.update({ where: { id }, data });
  return json(ser(updated));
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await db.listingDraft.delete({ where: { id } });
  return json({ ok: true });
}
