import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { json, error, parseBody, ser } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await parseBody<Record<string, unknown>>(req);
  if (!body.name || !body.email) return error("name and email are required");
  const collab = await db.itineraryCollaborator.create({
    data: {
      itineraryId: id,
      name: String(body.name),
      email: String(body.email),
      role: String(body.role ?? "Viewer"),
      avatar: body.avatar ? String(body.avatar) : null,
    },
  });
  return json(ser(collab), 201);
}
