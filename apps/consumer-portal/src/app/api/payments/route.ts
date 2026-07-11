import { db } from "@/lib/db";
import { json, ser } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

export async function GET() {
  const [methods, transactions] = await Promise.all([
    db.paymentMethod.findMany({ orderBy: [{ isDefault: "desc" }, { createdAt: "desc" }] }),
    db.transaction.findMany({ orderBy: { date: "desc" } }),
  ]);
  return json(ser({ methods, transactions }));
}
