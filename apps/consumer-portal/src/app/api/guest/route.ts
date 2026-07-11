import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { json, error, parseBody, ser } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

export async function GET() {
  const guest = await db.guest.findFirst();
  if (!guest) return json(null);
  return json(ser(guest));
}

export async function PATCH(req: NextRequest) {
  const body = await parseBody<Record<string, unknown>>(req);
  const guest = await db.guest.findFirst();
  if (!guest) return error("Guest not found", 404);

  const allowed = [
    "name", "phone", "phoneCountry", "avatar", "location",
    "dob", "dietary", "accessibility", "twoFactor",
    // role & intent
    "roles", "activeRole", "vendorStatus", "vendorSlug",
    // the Plan (omnipresent global intent)
    "planWhat", "planWhere", "planWhen", "planWhenEnd", "planPrice", "planAttendees",
  ];
  const data: Record<string, unknown> = {};
  for (const k of allowed) {
    if (k in body) data[k] = body[k];
  }
  const updated = await db.guest.update({ where: { id: guest.id }, data });
  return json(ser(updated));
}
