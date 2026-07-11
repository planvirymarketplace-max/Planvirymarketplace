import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { json, error, parseBody, ser } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

export async function GET() {
  const events = await db.event.findMany({ orderBy: { date: "asc" } });
  return json(ser(events));
}

export async function POST(req: NextRequest) {
  const body = await parseBody<Record<string, unknown>>(req);
  if (!body.title) return error("title is required");
  if (!body.date) return error("date is required");
  const event = await db.event.create({
    data: {
      title: String(body.title),
      type: String(body.type ?? "Other"),
      description: body.description ? String(body.description) : null,
      date: String(body.date),
      endDate: body.endDate ? String(body.endDate) : null,
      time: body.time ? String(body.time) : null,
      location: String(body.location ?? "Austin, TX"),
      venue: body.venue ? String(body.venue) : null,
      capacity: Number(body.capacity ?? 0),
      budget: Number(body.budget ?? 0),
      status: String(body.status ?? "Draft"),
      coverImage: body.coverImage ? String(body.coverImage) : null,
      services: body.services ? String(body.services) : null,
      itineraryId: body.itineraryId ? String(body.itineraryId) : null,
    },
  });
  return json(ser(event), 201);
}
