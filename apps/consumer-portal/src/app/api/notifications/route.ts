import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { json, parseBody, ser } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const filter = searchParams.get("filter") ?? "all"; // all/unread/booking/message/cancellation/promotion/review
  const where: Record<string, unknown> = {};
  if (filter === "unread") where.read = false;
  else if (filter !== "all") where.type = filter;
  const items = await db.notification.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
  return json(ser(items));
}
