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
  if (body.quantity !== undefined) {
    const updated = await db.cartItem.update({
      where: { id },
      data: { quantity: Math.max(1, Number(body.quantity)) },
    });
    return json(ser(updated));
  }
  return error("Nothing to update");
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await db.cartItem.delete({ where: { id } });
  return json({ ok: true });
}
