import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { json, error, parseBody, ser } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

// POST /api/loyalty/redeem { rewardId } → deducts points, logs transaction
export async function POST(req: NextRequest) {
  const body = await parseBody<{ rewardId?: string }>(req);
  if (!body.rewardId) return error("rewardId is required");

  const account = await db.loyaltyAccount.findFirst();
  if (!account) return error("Loyalty account not found", 404);

  const reward = await db.reward.findUnique({ where: { id: body.rewardId } });
  if (!reward) return error("Reward not found", 404);
  if (!reward.available) return error("Reward unavailable");
  if (account.points < reward.pointsCost)
    return error("Not enough points", 400);

  const [updatedAccount, txn] = await Promise.all([
    db.loyaltyAccount.update({
      where: { id: account.id },
      data: { points: account.points - reward.pointsCost },
    }),
    db.loyaltyTransaction.create({
      data: {
        accountId: account.id,
        points: -reward.pointsCost,
        type: "redeem",
        description: `Redeemed: ${reward.title}`,
        source: "redeem",
      },
    }),
  ]);
  return json(ser({ account: updatedAccount, transaction: txn, reward }));
}
