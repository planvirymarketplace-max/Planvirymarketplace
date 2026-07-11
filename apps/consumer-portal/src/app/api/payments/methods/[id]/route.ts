import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { json, error, parseBody, ser } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await parseBody<Record<string, unknown>>(req);
  if (body.isDefault) {
    await db.paymentMethod.updateMany({ data: { isDefault: false } });
  }
  const updated = await db.paymentMethod.update({
    where: { id },
    data: { ...(body.isDefault !== undefined ? { isDefault: Boolean(body.isDefault) } : {}) },
  });
  return json(ser(updated));
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await db.paymentMethod.delete({ where: { id } });
  return json({ ok: true });
}
