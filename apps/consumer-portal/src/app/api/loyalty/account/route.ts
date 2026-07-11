import { db } from "@/lib/db";
import { json, ser } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

// GET /api/loyalty/account → { account, transactions[], rewards[] }
export async function GET() {
  let account = await db.loyaltyAccount.findFirst({
    include: { transactions: { orderBy: { createdAt: "desc" } } },
  });
  if (!account) {
    account = await db.loyaltyAccount.create({
      data: { points: 0, lifetimePoints: 0, tier: "Silver", nextTierPoints: 2500 },
      include: { transactions: true },
    });
  }
  const rewards = await db.reward.findMany({ where: { available: true } });
  return json(ser({ account, rewards }));
}
