import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { json, error, parseBody, ser } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await parseBody<Record<string, unknown>>(req);
  if (!body.title) return error("title is required");
  const item = await db.itineraryItem.create({
    data: {
      itineraryId: id,
      day: Number(body.day ?? 1),
      date: String(body.date ?? new Date().toISOString().slice(0, 10)),
      startTime: String(body.startTime ?? "09:00"),
      endTime: body.endTime ? String(body.endTime) : null,
      title: String(body.title),
      vertical: String(body.vertical ?? "services"),
      location: body.location ? String(body.location) : null,
      status: String(body.status ?? "Planning"),
      notes: body.notes ? String(body.notes) : null,
      reservationId: body.reservationId ? String(body.reservationId) : null,
    },
  });
  return json(ser(item), 201);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { searchParams } = new URL(req.url);
  const itemId = searchParams.get("itemId");
  if (itemId) {
    await db.itineraryItem.delete({ where: { id: itemId } });
  }
  return json({ ok: true });
}
