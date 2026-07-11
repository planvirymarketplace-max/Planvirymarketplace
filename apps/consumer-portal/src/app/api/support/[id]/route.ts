import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { json, error, parseBody, ser } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const ticket = await db.supportTicket.findUnique({
    where: { id },
    include: { comments: { orderBy: { createdAt: "asc" } } },
  });
  if (!ticket) return error("Ticket not found", 404);
  return json(ser(ticket));
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await parseBody<Record<string, unknown>>(req);
  if (!body.text) return error("text is required");
  const comment = await db.ticketComment.create({
    data: {
      ticketId: id,
      author: String(body.author ?? "guest"),
      text: String(body.text),
    },
  });
  await db.supportTicket.update({ where: { id }, data: { status: "InProgress" } });
  return json(ser(comment), 201);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await parseBody<Record<string, unknown>>(req);
  if (body.action === "close") {
    const updated = await db.supportTicket.update({
      where: { id },
      data: { status: "Closed" },
      include: { comments: { orderBy: { createdAt: "asc" } } },
    });
    return json(ser(updated));
  }
  const updated = await db.supportTicket.update({
    where: { id },
    data: { ...(body.status ? { status: String(body.status) } : {}) },
    include: { comments: { orderBy: { createdAt: "asc" } } },
  });
  return json(ser(updated));
}
