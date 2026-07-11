import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { json, error, parseBody, ser } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

// GET /api/membership → { membership, tiers[] }
export async function GET() {
  let membership = await db.membership.findFirst();
  if (!membership) {
    membership = await db.membership.create({
      data: {
        tier: "Silver",
        status: "Active",
        startDate: new Date().toISOString().slice(0, 10),
        renewDate: new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10),
        price: 19,
        billingPeriod: "monthly",
        autoRenew: true,
      },
    });
  }
  const tiers = await db.membershipTier.findMany({ orderBy: { sortOrder: "asc" } });
  return json(ser({ membership, tiers }));
}

// PATCH /api/membership { tier?, autoRenew?, action? } → upgrade/cancel/toggle
export async function PATCH(req: NextRequest) {
  const body = await parseBody<Record<string, unknown>>(req);
  let membership = await db.membership.findFirst();
  if (!membership) return error("Membership not found", 404);

  const tier = await db.membershipTier.findFirst({
    where: { name: String(body.tier ?? membership.tier) },
  });
  const data: Record<string, unknown> = {};
  if (body.tier && tier) {
    data.tier = tier.name;
    data.price = tier.price;
    data.billingPeriod = tier.billingPeriod;
  }
  if (body.autoRenew !== undefined) data.autoRenew = Boolean(body.autoRenew);
  if (body.action === "cancel") {
    data.status = "Canceled";
    data.autoRenew = false;
  }
  if (body.action === "reactivate") {
    data.status = "Active";
    data.autoRenew = true;
  }

  membership = await db.membership.update({ where: { id: membership.id }, data });
  return json(ser(membership));
}
