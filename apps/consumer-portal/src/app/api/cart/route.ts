import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { json, error, parseBody, ser } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

export async function GET() {
  const items = await db.cartItem.findMany({ orderBy: { createdAt: "desc" } });
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const fee = Math.round(subtotal * 0.05 * 100) / 100;
  const tax = Math.round(subtotal * 0.0825 * 100) / 100;
  const total = Math.round((subtotal + fee + tax) * 100) / 100;
  return json(ser({ items, summary: { subtotal, fee, tax, total } }));
}

export async function POST(req: NextRequest) {
  const body = await parseBody<Record<string, unknown>>(req);
  if (!body.title) return error("title is required");
  // de-dupe by listingId
  if (body.listingId) {
    const existing = await db.cartItem.findFirst({
      where: { listingId: String(body.listingId) },
    });
    if (existing) {
      const updated = await db.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + Number(body.quantity ?? 1) },
      });
      return json(ser(updated));
    }
  }
  const item = await db.cartItem.create({
    data: {
      listingId: String(body.listingId ?? `l-${Date.now()}`),
      title: String(body.title),
      vendorName: String(body.vendorName ?? "Vendor"),
      vertical: String(body.vertical ?? "services"),
      price: Number(body.price ?? 0),
      quantity: Number(body.quantity ?? 1),
      image: body.image ? String(body.image) : null,
      expiresAt: body.expiresAt ? String(body.expiresAt) : null,
    },
  });
  return json(ser(item), 201);
}

export async function DELETE() {
  await db.cartItem.deleteMany();
  return json({ ok: true });
}
