import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { json, parseBody, ser } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

// Checkout: convert cart into reservations + a transaction, then clear cart
export async function POST(req: NextRequest) {
  const body = await parseBody<Record<string, unknown>>(req);
  const items = await db.cartItem.findMany();
  if (items.length === 0) return json({ ok: false, message: "Cart is empty" });

  const itineraryId = body.itineraryId ? String(body.itineraryId) : null;
  const created = [];
  for (const item of items) {
    const subtotal = item.price * item.quantity;
    const fee = Math.round(subtotal * 0.05 * 100) / 100;
    const tax = Math.round(subtotal * 0.0825 * 100) / 100;
    const total = Math.round((subtotal + fee + tax) * 100) / 100;
    const res = await db.reservation.create({
      data: {
        listingTitle: item.title,
        vendorName: item.vendorName,
        vertical: item.vertical,
        image: item.image,
        startDate: new Date().toISOString().slice(0, 10),
        quantity: item.quantity,
        guests: item.quantity,
        subtotal,
        fees: fee,
        tax,
        total,
        status: "Confirmed",
        itineraryId,
      },
    });
    created.push(res);
    await db.transaction.create({
      data: {
        date: new Date().toISOString().slice(0, 10),
        description: item.title,
        amount: total,
        status: "Paid",
        invoiceUrl: "#",
      },
    });
  }
  await db.cartItem.deleteMany();
  return json(ser({ ok: true, reservations: created }));
}
