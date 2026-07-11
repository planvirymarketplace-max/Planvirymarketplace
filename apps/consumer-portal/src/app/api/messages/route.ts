import { db } from "@/lib/db";
import { json, ser } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

export async function GET() {
  const threads = await db.messageThread.findMany({
    include: { messages: { orderBy: { createdAt: "asc" } } },
    orderBy: { lastMessageAt: "desc" },
  });
  return json(ser(threads));
}
