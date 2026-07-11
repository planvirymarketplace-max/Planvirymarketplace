import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { json, ser } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const tab = searchParams.get("tab") ?? "all"; // upcoming/past/cancelled/all
  const vertical = searchParams.get("vertical");
  const q = searchParams.get("q")?.toLowerCase();

  const reservations = await db.reservation.findMany({
    orderBy: { startDate: "desc" },
  });

  const now = new Date().toISOString().slice(0, 10);
  let filtered = reservations;
  if (tab === "upcoming") {
    filtered = filtered.filter((r) => r.startDate >= now && r.status !== "Cancelled");
  } else if (tab === "past") {
    filtered = filtered.filter((r) => r.startDate < now && r.status !== "Cancelled");
  } else if (tab === "cancelled") {
    filtered = filtered.filter((r) => r.status === "Cancelled");
  }
  if (vertical && vertical !== "all") {
    filtered = filtered.filter((r) => r.vertical === vertical);
  }
  if (q) {
    filtered = filtered.filter(
      (r) =>
        r.listingTitle.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q) ||
        r.vendorName.toLowerCase().includes(q)
    );
  }
  return json(ser(filtered));
}
