import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { json, error, parseBody, ser } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const thread = await db.messageThread.findUnique({
    where: { id },
    include: { messages: { orderBy: { createdAt: "asc" } } },
  });
  if (!thread) return error("Thread not found", 404);
  // mark read on open
  await db.messageThread.update({ where: { id }, data: { unread: false } });
  return json(ser(thread));
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await parseBody<Record<string, unknown>>(req);
  if (!body.text) return error("text is required");
  const msg = await db.message.create({
    data: {
      threadId: id,
      sender: String(body.sender ?? "guest"),
      text: String(body.text),
    },
  });
  await db.messageThread.update({
    where: { id },
    data: { lastMessage: String(body.text), lastMessageAt: new Date().toISOString() },
  });
  return json(ser(msg), 201);
}
