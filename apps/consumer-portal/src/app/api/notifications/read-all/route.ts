import { db } from "@/lib/db";
import { json } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

export async function POST() {
  await db.notification.updateMany({ where: { read: false }, data: { read: true } });
  return json({ ok: true });
}
