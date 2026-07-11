import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { json, error, parseBody, ser } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city");
  const vertical = searchParams.get("vertical");
  const limit = Number(searchParams.get("limit") ?? 12);

  const where: Record<string, unknown> = {};
  if (city) where.city = city;
  if (vertical) where.vertical = vertical;

  const listings = await db.listing.findMany({
    where,
    orderBy: { match: "desc" },
    take: limit,
  });
  return json(ser(listings));
}

export async function POST(req: NextRequest) {
  const body = await parseBody<Record<string, unknown>>(req);
  if (!body.title) return error("title is required");
  const listing = await db.listing.create({
    data: {
      title: String(body.title),
      vendorName: String(body.vendorName ?? "Vendor"),
      vertical: String(body.vertical ?? "services"),
      city: String(body.city ?? "Austin"),
      price: Number(body.price ?? 0),
      image: body.image ? String(body.image) : null,
      rating: Number(body.rating ?? 0),
      category: String(body.category ?? "Listing"),
      description: body.description ? String(body.description) : null,
      match: Number(body.match ?? 80),
    },
  });
  return json(ser(listing), 201);
}
