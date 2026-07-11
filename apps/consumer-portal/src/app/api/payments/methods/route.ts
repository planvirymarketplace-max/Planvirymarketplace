import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { json, error, parseBody, ser } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const count = await db.paymentMethod.count();
  if (count >= 5) return error("Maximum of 5 cards reached", 400);
  const body = await parseBody<Record<string, unknown>>(req);
  const brand = String(body.brand ?? "visa");
  const last4 = String(body.last4 ?? "0000");
  const expiry = String(body.expiry ?? "12/27");
  const isDefault = Boolean(body.isDefault);
  if (isDefault) {
    await db.paymentMethod.updateMany({ data: { isDefault: false } });
  }
  const method = await db.paymentMethod.create({
    data: { brand, last4, expiry, isDefault },
  });
  return json(ser(method), 201);
}
