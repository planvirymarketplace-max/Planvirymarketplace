import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { json, error, parseBody, ser } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const itin = await db.itinerary.findUnique({
    where: { id },
    include: { collaborators: true, items: { orderBy: { day: "asc" } }, reservations: true },
  });
  if (!itin) return error("Itinerary not found", 404);
  return json(ser(itin));
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await parseBody<Record<string, unknown>>(req);
  const allowed = ["title", "status", "allowEdit", "coverImage", "city", "startDate", "endDate", "occasionType"];
  const data: Record<string, unknown> = {};
  for (const k of allowed) if (k in body) data[k] = body[k];
  const updated = await db.itinerary.update({
    where: { id },
    data,
    include: { collaborators: true, items: true, reservations: true },
  });
  return json(ser(updated));
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await db.itinerary.delete({ where: { id } });
  return json({ ok: true });
}
