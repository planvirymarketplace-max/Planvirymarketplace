import { db } from "@/lib/db";
import { json, ser } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

export async function GET() {
  const activity = await db.activity.findMany({
    orderBy: { createdAt: "desc" },
    take: 6,
  });
  return json(ser(activity));
}
