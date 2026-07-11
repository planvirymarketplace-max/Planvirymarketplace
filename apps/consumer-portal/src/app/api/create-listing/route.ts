import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { json, error, parseBody, ser } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

// GET /api/create-listing → list all drafts for the current vendor
export async function GET() {
  const drafts = await db.listingDraft.findMany({ orderBy: { updatedAt: "desc" } });
  return json(ser(drafts));
}

// POST /api/create-listing → create a new draft (step 1 minimal) or upsert by id
export async function POST(req: NextRequest) {
  const body = await parseBody<Record<string, unknown>>(req);
  if (!body.businessType) return error("businessType is required");
  if (!body.title) return error("title is required");

  const draft = await db.listingDraft.create({
    data: {
      businessType: String(body.businessType),
      title: String(body.title),
      slug: body.slug ? String(body.slug) : null,
      step: Number(body.step ?? 1),
      status: String(body.status ?? "draft"),
    },
  });
  return json(ser(draft), 201);
}
