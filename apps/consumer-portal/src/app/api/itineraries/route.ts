import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { json, error, parseBody, ser } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

export async function GET() {
  const itineraries = await db.itinerary.findMany({
    include: {
      collaborators: true,
      items: true,
      reservations: true,
    },
    orderBy: { createdAt: "desc" },
  });
  const result = itineraries.map((i) => ({
    ...i,
    reservationCount: i.reservations.length,
    collaboratorCount: i.collaborators.length,
    itemCount: i.items.length,
  }));
  return json(ser(result));
}

export async function POST(req: NextRequest) {
  const body = await parseBody<Record<string, unknown>>(req);
  if (!body.title) return error("title is required");
  const itin = await db.itinerary.create({
    data: {
      title: String(body.title),
      occasionType: String(body.occasionType ?? "Trip"),
      startDate: String(body.startDate ?? new Date().toISOString().slice(0, 10)),
      endDate: String(body.endDate ?? new Date().toISOString().slice(0, 10)),
      city: String(body.city ?? "Austin"),
      coverImage: body.coverImage ? String(body.coverImage) : null,
      status: String(body.status ?? "Draft"),
      allowEdit: body.allowEdit !== false,
    },
    include: { collaborators: true, items: true, reservations: true },
  });
  return json(ser(itin), 201);
}
