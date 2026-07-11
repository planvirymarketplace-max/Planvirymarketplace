import { db } from "@/lib/db";
import { json, ser } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

export async function GET() {
  const [cart, notifications, threads] = await Promise.all([
    db.cartItem.count(),
    db.notification.count({ where: { read: false } }),
    db.messageThread.count({ where: { unread: true } }),
  ]);
  return json(ser({ cart, notifications, messages: threads }));
}
