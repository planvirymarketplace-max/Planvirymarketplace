import { db } from "@/lib/db";
import { PageHeader } from "@/components/portal/page-header";
import { StatusBadge } from "@/components/portal/status-badge";
import { AutoRenewToggle } from "@/components/portal/membership/auto-renew-toggle";
import { UpgradeButton } from "@/components/portal/membership/upgrade-button";
import { CancelMembershipDialog } from "@/components/portal/membership/cancel-membership-dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Crown,
  Check,
  Sparkles,
  CalendarClock,
  CreditCard,
  RefreshCw,
} from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/constants";

export const dynamic = "force-dynamic";

export default async function MembershipPage() {
  let membership = await db.membership.findFirst();
  if (!membership) {
    membership = await db.membership.create({
      data: {
        tier: "Silver",
        status: "Active",
        startDate: new Date().toISOString().slice(0, 10),
        renewDate: new Date(Date.now() + 30 * 86400000)
          .toISOString()
          .slice(0, 10),
        price: 19,
        billingPeriod: "monthly",
        autoRenew: true,
      },
    });
  }
  const tiers = await db.membershipTier.findMany({
    orderBy: { sortOrder: "asc" },
  });

  const periodLabel = membership.billingPeriod === "yearly" ? "/yr" : "/mo";
  const canceled = membership.status === "Canceled";

  return (
    <div className="space-y-8">
      <PageHeader
        title="Membership"
        description="Choose the plan that fits your planning style"
        icon={Crown}
      />

      {/* Current plan banner */}
      <section aria-labelledby="current-plan">
        <Card className="overflow-hidden border-border">
          <div className="relative bg-gradient-to-r from-navy to-teal-900 p-6 text-white sm:p-8">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-10 size-44 rounded-full bg-teal/20 blur-3xl"
            />
            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="bg-white/15 text-white ring-1 ring-inset ring-white/25 hover:bg-white/15">
                    <Sparkles className="size-3" /> Current plan
                  </Badge>
                  <StatusBadge status={membership.status} />
                </div>
                <h2
                  id="current-plan"
                  className="font-display text-3xl font-700 tracking-tight"
                >
                  {membership.tier}
                </h2>
                <p className="text-sm text-white/80">
                  {formatCurrency(membership.price)}
                  <span className="text-white/60">{periodLabel}</span> · billed{" "}
                  {membership.billingPeriod}
                </p>
              </div>
              <div className="flex flex-col items-start gap-4 sm:items-end">
                <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm ring-1 ring-inset ring-white/20">
                  <CalendarClock className="size-4 text-teal" />
                  <span className="text-white/80">
                    {canceled ? "Ends" : "Renews"}{" "}
                    <span className="font-semibold text-white">
                      {formatDate(membership.renewDate, {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </span>
                </div>
                <div className="flex flex-col gap-1.5 sm:items-end">
                  <span className="text-xs uppercase tracking-wider text-white/60">
                    Auto-renew
                  </span>
                  <AutoRenewToggle
                    autoRenew={membership.autoRenew}
                    status={membership.status}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Summary strip */}
          <CardContent className="grid gap-4 p-5 sm:grid-cols-3">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-teal/10 text-teal">
                <CreditCard className="size-4.5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Started</p>
                <p className="text-sm font-600 text-navy">
                  {formatDate(membership.startDate, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-teal/10 text-teal">
                <RefreshCw className="size-4.5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Billing</p>
                <p className="text-sm font-600 capitalize text-navy">
                  {membership.billingPeriod} ·{" "}
                  {formatCurrency(membership.price)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-teal/10 text-teal">
                <CalendarClock className="size-4.5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {canceled ? "Ends" : "Next renewal"}
                </p>
                <p className="text-sm font-600 text-navy">
                  {formatDate(membership.renewDate, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Tier comparison grid */}
      <section aria-labelledby="tiers">
        <h2 id="tiers" className="sr-only">
          Membership tiers
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {tiers.map((tier) => {
            const isCurrent = tier.name === membership.tier;
            const benefits = tier.benefits
              .split("|")
              .map((b) => b.trim())
              .filter(Boolean);
            const tierPeriod = tier.billingPeriod === "yearly" ? "/yr" : "/mo";
            return (
              <Card
                key={tier.id}
                className={
                  "relative flex flex-col overflow-hidden transition-all " +
                  (tier.popular
                    ? "border-teal shadow-lg ring-1 ring-teal/30"
                    : "border-border")
                }
              >
                {/* Top accent bar */}
                <div
                  className="h-1.5 w-full"
                  style={{ backgroundColor: tier.color }}
                />
                {tier.popular && (
                  <div className="absolute right-3 top-3">
                    <Badge className="bg-teal text-white hover:bg-teal/90">
                      <Sparkles className="size-3" /> Popular
                    </Badge>
                  </div>
                )}
                <CardContent className="flex flex-1 flex-col p-5">
                  <div
                    className="flex size-10 items-center justify-center rounded-xl text-white"
                    style={{ backgroundColor: tier.color }}
                  >
                    <Crown className="size-5" />
                  </div>
                  <h3 className="mt-3 font-display text-xl font-700 text-navy">
                    {tier.name}
                  </h3>
                  <div className="mt-1 flex items-baseline gap-0.5">
                    <span className="font-display text-2xl font-700 text-navy">
                      {formatCurrency(tier.price)}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {tierPeriod}
                    </span>
                  </div>

                  {/* Benefits list */}
                  <ul className="mt-4 flex-1 space-y-2.5">
                    {benefits.map((b) => {
                      const isEverything =
                        b.toLowerCase().startsWith("everything in");
                      return (
                        <li
                          key={b}
                          className="flex items-start gap-2 text-sm"
                        >
                          <Check
                            className={
                              "mt-0.5 size-4 shrink-0 " +
                              (isEverything
                                ? "text-muted-foreground"
                                : "text-teal")
                            }
                          />
                          <span
                            className={
                              isEverything
                                ? "text-muted-foreground"
                                : "text-foreground"
                            }
                          >
                            {b}
                          </span>
                        </li>
                      );
                    })}
                  </ul>

                  <div className="mt-5">
                    <UpgradeButton
                      tierName={tier.name}
                      isCurrent={isCurrent}
                      popular={tier.popular}
                    />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Cancel link */}
      {!canceled && (
        <section className="flex justify-center pt-2">
          <CancelMembershipDialog
            tierName={membership.tier}
            renewDate={formatDate(membership.renewDate, {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          />
        </section>
      )}
    </div>
  );
}
