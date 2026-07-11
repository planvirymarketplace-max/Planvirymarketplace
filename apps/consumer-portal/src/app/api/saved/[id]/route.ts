import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { json, parseBody, ser } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await db.savedItem.delete({ where: { id } });
  return json({ ok: true });
}

// Move to cart
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await parseBody<Record<string, unknown>>(req);
  const saved = await db.savedItem.findUnique({ where: { id } });
  if (!saved) return json({ ok: false });
  if (body.action === "move-to-cart") {
    const existing = await db.cartItem.findFirst({
      where: { listingId: saved.listingId },
    });
    if (existing) {
      await db.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + 1 },
      });
    } else {
      await db.cartItem.create({
        data: {
          listingId: saved.listingId,
          title: saved.title,
          vendorName: saved.vendorName,
          vertical: saved.vertical,
          price: saved.price,
          quantity: 1,
          image: saved.image,
        },
      });
    }
    await db.savedItem.delete({ where: { id } });
    return json(ser({ ok: true }));
  }
  return json({ ok: false });
}
