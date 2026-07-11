import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { json, parseBody, ser } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

// Onboarding creates an itinerary from intent (what/where/when)
export async function POST(req: NextRequest) {
  const body = await parseBody<Record<string, unknown>>(req);
  const occasionType = String(body.occasionType ?? "Trip");
  const city = String(body.city ?? "Austin");
  const startDate = String(body.startDate ?? new Date().toISOString().slice(0, 10));
  const endDate = String(body.endDate ?? startDate);
  const title =
    String(body.title ?? "") ||
    `${occasionType} — ${city}`;

  const covers: Record<string, string> = {
    Austin: "https://images.unsplash.com/photo-1517423440428-a5a00ad49331?w=900&q=80",
    Chicago: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=900&q=80",
    "New York": "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=900&q=80",
    Miami: "https://images.unsplash.com/photo-1515347570802-67f8732c5b76?w=900&q=80",
  };

  const itin = await db.itinerary.create({
    data: {
      title,
      occasionType,
      startDate,
      endDate,
      city,
      coverImage: covers[city] ?? covers.Austin,
      status: "Draft",
    },
  });

  // update guest default city if provided
  const guest = await db.guest.findFirst();
  if (guest && city) {
    await db.guest.update({ where: { id: guest.id }, data: { location: city } });
  }

  return json(ser(itin), 201);
}
