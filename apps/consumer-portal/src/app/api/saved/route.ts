import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { json, error, parseBody, ser } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

export async function GET() {
  const items = await db.savedItem.findMany({ orderBy: { createdAt: "desc" } });
  const collections = await db.savedItem.groupBy({
    by: ["collection"],
    _count: true,
  });
  return json(ser({ items, collections }));
}

export async function POST(req: NextRequest) {
  const body = await parseBody<Record<string, unknown>>(req);
  if (!body.title) return error("title is required");
  // de-dupe by listingId
  if (body.listingId) {
    const existing = await db.savedItem.findFirst({
      where: { listingId: String(body.listingId) },
    });
    if (existing) return json(ser(existing));
  }
  const item = await db.savedItem.create({
    data: {
      listingId: String(body.listingId ?? `l-${Date.now()}`),
      title: String(body.title),
      vendorName: String(body.vendorName ?? "Vendor"),
      vertical: String(body.vertical ?? "services"),
      price: Number(body.price ?? 0),
      image: body.image ? String(body.image) : null,
      rating: Number(body.rating ?? 0),
      collection: body.collection ? String(body.collection) : null,
    },
  });
  return json(ser(item), 201);
}

export async function DELETE() {
  await db.savedItem.deleteMany();
  return json({ ok: true });
}
