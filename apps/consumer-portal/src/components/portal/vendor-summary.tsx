"use client";

import Link from "next/link";
import { useIntent } from "@/hooks/use-intent";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/constants";
import {
  Store,
  FileEdit,
  CheckCircle2,
  ArrowUpRight,
  CalendarCheck,
  Wallet,
  LayoutDashboard,
  Inbox as InboxIcon,
  BookOpen,
  Megaphone,
  BarChart3,
} from "lucide-react";

/** Compact currency for stat tiles (e.g. $12.4K) — mirrors the vendor portal's formatCurrency({compact:true}). */
function compactCurrency(n: number): string {
  if (Math.abs(n) >= 1000) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(n);
  }
  return formatCurrency(n);
}

/**
 * VendorSummary — compact inline widget showing the user's vendor metrics.
 * Only renders when activeRole === "vendor" (set via the RoleSwitcher).
 *
 * ALIGNMENT WITH THE VENDOR SUITE (vendor portal):
 * The vendor portal is a separate app in the mono-repo (single-page, 12 modules
 * switched via Zustand `usePortalStore`). Its dashboard KPIs are: today's
 * bookings, unread messages, open tickets, revenue. Its Listing model uses
 * status: active|paused|draft. This widget mirrors that shape so a dual-role
 * user sees consistent numbers whether they glance here or open the full vendor
 * portal.
 *
 * The "Open vendor dashboard" button bridges to the vendor portal app via
 * `vendorSummary.portalUrl` (default `/vendor/{slug}`, settable to the vendor
 * app's base URL in production). Shared Supabase Auth session carries identity.
 */
export function VendorSummary() {
  const { intent } = useIntent();
  if (intent.activeRole !== "vendor") return null;

  const v = intent.vendorSummary;

  const stats = [
    {
      label: "Active listings",
      value: v.activeListings,
      icon: CheckCircle2,
      tint: "text-emerald-600 bg-emerald-50",
    },
    {
      label: "Drafts",
      value: v.draftListings,
      icon: FileEdit,
      tint: "text-amber-600 bg-amber-50",
    },
    {
      label: "Bookings",
      value: v.bookings,
      icon: CalendarCheck,
      tint: "text-teal bg-teal/10",
    },
    {
      label: "Revenue",
      value: compactCurrency(v.revenue),
      icon: Wallet,
      tint: "text-violet-600 bg-violet-50",
    },
  ];

  // Quick module launcher — mirrors the vendor portal sidebar groups so the
  // dual-role user can jump directly to a vendor module without opening the
  // full vendor app first.
  const quickModules = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "inbox", label: "Inbox", icon: InboxIcon },
    { id: "bookings", label: "Bookings", icon: BookOpen },
    { id: "promote", label: "Promote", icon: Megaphone },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
  ];

  return (
    <Card className="border-navy/15">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-base font-600 text-navy">
          <span className="flex items-center gap-2">
            <Store className="size-4 text-teal" />
            Vendor overview
          </span>
          <Button asChild size="sm" variant="outline" className="h-7 text-xs">
            <Link href="/create-listing">
              Manage listings <ArrowUpRight className="size-3" />
            </Link>
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="rounded-xl border border-border bg-card p-3"
              >
                <div className={`mb-2 flex size-8 items-center justify-center rounded-lg ${s.tint}`}>
                  <Icon className="size-4" />
                </div>
                <p className="font-display text-xl font-700 text-navy">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            )
          })}
        </div>

        {/* Quick module launcher — bridges into the Vendor Suite */}
        <div className="flex flex-wrap items-center gap-1.5 rounded-lg bg-muted/50 px-3 py-2">
          <span className="mr-1 text-xs font-medium text-muted-foreground">
            Jump to:
          </span>
          {quickModules.map((m) => {
            const Icon = m.icon;
            return (
              <a
                key={m.id}
                href={`${v.portalUrl}?module=${m.id}`}
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2 py-1 text-xs font-medium text-foreground transition-colors hover:border-teal/40 hover:text-teal"
              >
                <Icon className="size-3" />
                {m.label}
              </a>
            );
          })}
        </div>

        <div className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2 text-xs">
          <span className="text-muted-foreground">
            {v.vendorOnboarded
              ? "Stripe Connect linked · ready for payouts"
              : "Complete vendor onboarding to receive payouts"}
          </span>
          <a
            href={v.portalUrl}
            className="font-semibold text-teal hover:underline"
          >
            Open vendor dashboard →
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
