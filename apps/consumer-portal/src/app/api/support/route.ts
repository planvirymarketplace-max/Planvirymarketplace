import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { json, error, parseBody, ser } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

export async function GET() {
  const tickets = await db.supportTicket.findMany({
    include: { comments: { orderBy: { createdAt: "asc" } } },
    orderBy: { createdAt: "desc" },
  });
  return json(ser(tickets));
}

export async function POST(req: NextRequest) {
  const body = await parseBody<Record<string, unknown>>(req);
  if (!body.subject) return error("subject is required");
  const ticket = await db.supportTicket.create({
    data: {
      subject: String(body.subject),
      category: String(body.category ?? "Other"),
      priority: String(body.priority ?? "Normal"),
      status: "Open",
      description: String(body.description ?? ""),
      relatedReservation: body.relatedReservation
        ? String(body.relatedReservation)
        : null,
    },
    include: { comments: true },
  });
  // seed the first comment as the guest's description
  if (body.description) {
    await db.ticketComment.create({
      data: {
        ticketId: ticket.id,
        author: "guest",
        text: String(body.description),
      },
    });
  }
  const fresh = await db.supportTicket.findUnique({
    where: { id: ticket.id },
    include: { comments: { orderBy: { createdAt: "asc" } } },
  });
  return json(ser(fresh), 201);
}
