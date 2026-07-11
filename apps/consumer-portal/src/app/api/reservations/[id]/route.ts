import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { json, error, parseBody, ser } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const res = await db.reservation.findUnique({ where: { id } });
  if (!res) return error("Reservation not found", 404);
  return json(ser(res));
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await parseBody<Record<string, unknown>>(req);
  if (body.action === "cancel") {
    const updated = await db.reservation.update({
      where: { id },
      data: { status: "Cancelled" },
    });
    return json(ser(updated));
  }
  const updated = await db.reservation.update({
    where: { id },
    data: {
      ...(body.status ? { status: String(body.status) } : {}),
    },
  });
  return json(ser(updated));
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Leave a review
  const { id } = await params;
  const body = await parseBody<Record<string, unknown>>(req);
  if (body.action === "review") {
    const updated = await db.reservation.update({
      where: { id },
      data: {
        reviewRating: Number(body.rating ?? 0),
        reviewText: String(body.text ?? ""),
      },
    });
    return json(ser(updated));
  }
  return error("Unknown action");
}
