import Link from "next/link";
import { db } from "@/lib/db";
import { PageHeader } from "@/components/portal/page-header";
import { EmptyState } from "@/components/portal/empty-state";
import { RedeemButton } from "@/components/portal/loyalty/redeem-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Award,
  Gift,
  Sparkles,
  Star,
  ArrowUpCircle,
  ArrowDownCircle,
  PartyPopper,
  Coins,
  Heart,
  Crown,
  Trophy,
  CheckCircle2,
} from "lucide-react";
import { formatDate, relativeTime } from "@/lib/constants";

export const dynamic = "force-dynamic";

// Tier ladder definition (matches seed thresholds)
const TIERS = [
  {
    name: "Silver",
    min: 0,
    icon: Award,
    accent: "#94a3b8",
    blurb: "Earn 1 pt per $1",
  },
  {
    name: "Gold",
    min: 2500,
    icon: Crown,
    accent: "#f59e0b",
    blurb: "Earn 1.5 pts per $1 · 5% off",
  },
  {
    name: "Platinum",
    min: 5000,
    icon: Trophy,
    accent: "#7c3aed",
    blurb: "Earn 2 pts per $1 · 10% off",
  },
] as const;

const WAYS_TO_EARN = [
  {
    icon: Coins,
    title: "Earn on every booking",
    desc: "1–3 points per $1 spent, based on tier",
  },
  {
    icon: Star,
    title: "Leave a review",
    desc: "+200 points for every 5-star review",
  },
  {
    icon: PartyPopper,
    title: "Welcome bonus",
    desc: "+500 points when you join Planviry",
  },
  {
    icon: Heart,
    title: "Birthday 2× points",
    desc: "Double points during your birthday week",
  },
] as const;

const TXN_META: Record<
  string,
  { icon: typeof Gift; tone: string }
> = {
  earn: { icon: ArrowUpCircle, tone: "text-teal" },
  redeem: { icon: ArrowDownCircle, tone: "text-amber-600" },
  bonus: { icon: Gift, tone: "text-purple-600" },
  welcome: { icon: Sparkles, tone: "text-rose-600" },
};

const CATEGORY_LABEL: Record<string, string> = {
  dining: "Dining",
  upgrade: "Upgrade",
  travel: "Travel",
  perk: "Perk",
};

export default async function LoyaltyPage() {
  let account = await db.loyaltyAccount.findFirst({
    include: { transactions: { orderBy: { createdAt: "desc" } } },
  });
  if (!account) {
    account = await db.loyaltyAccount.create({
      data: {
        points: 0,
        lifetimePoints: 0,
        tier: "Silver",
        nextTierPoints: 2500,
        memberSince: new Date().toISOString().slice(0, 10),
      },
      include: { transactions: true },
    });
  }
  const rewards = await db.reward.findMany({
    where: { available: true },
    orderBy: { pointsCost: "asc" },
  });

  const points = account.points;
  const currentTierIdx = Math.max(
    0,
    TIERS.findIndex((t) => t.name === account.tier)
  );
  const currentTier = TIERS[currentTierIdx] ?? TIERS[0];
  const nextTier = TIERS[currentTierIdx + 1];
  const progressPct = nextTier
    ? Math.min(
        100,
        Math.round(
          ((points - currentTier.min) / (nextTier.min - currentTier.min)) * 100
        )
      )
    : 100;
  const pointsToNext = nextTier ? Math.max(0, nextTier.min - points) : 0;

  return (
    <div className="space-y-8">
      <PageHeader
        title="Loyalty"
        description="Earn points on every booking, redeem for rewards"
        icon={Award}
      />

      {/* Hero card — premium gradient */}
      <section
        aria-labelledby="loyalty-hero"
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-navy via-navy to-teal-900 p-6 text-white shadow-lg sm:p-8"
      >
        {/* Decorative glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-teal/20 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-20 -left-10 size-56 rounded-full bg-teal/10 blur-3xl"
        />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/90 ring-1 ring-inset ring-white/20">
                <currentTier.icon
                  className="size-3.5"
                  style={{ color: currentTier.accent }}
                />
                {account.tier} Member
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80 ring-1 ring-inset ring-white/20">
                Member since {formatDate(account.memberSince, { month: "long", year: "numeric" })}
              </span>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/60">
                Available points
              </p>
              <p
                id="loyalty-hero"
                className="font-display text-5xl font-700 tracking-tight sm:text-6xl"
              >
                {points.toLocaleString()}
              </p>
              <p className="mt-1 text-sm text-white/70">
                {account.lifetimePoints.toLocaleString()} lifetime points earned
              </p>
            </div>

            {/* Progress to next tier */}
            <div className="max-w-md space-y-1.5 pt-2">
              <div className="flex items-center justify-between text-xs text-white/80">
                <span className="font-medium">
                  {currentTier.name}
                </span>
                <span>
                  {nextTier ? (
                    <>
                      {pointsToNext.toLocaleString()} pts to{" "}
                      <span className="font-semibold">{nextTier.name}</span>
                    </>
                  ) : (
                    "Highest tier unlocked"
                  )}
                </span>
              </div>
              <Progress
                value={progressPct}
                className="h-2 bg-white/15 [&>[data-slot=progress-indicator]]:bg-teal"
                aria-label={`Progress to ${nextTier?.name ?? "next tier"}`}
              />
            </div>
          </div>

          {/* Right: tier ring visualization */}
          <div className="hidden shrink-0 lg:block">
            <div
              className="flex size-40 flex-col items-center justify-center rounded-full border-4 border-white/15 bg-white/5 backdrop-blur"
              style={{ boxShadow: `inset 0 0 40px ${currentTier.accent}33` }}
            >
              <currentTier.icon
                className="size-10"
                style={{ color: currentTier.accent }}
              />
              <p className="mt-1 font-display text-lg font-700">{account.tier}</p>
              <p className="text-[11px] uppercase tracking-wider text-white/60">
                Tier
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tier ladder */}
      <section aria-labelledby="tier-ladder">
        <h2
          id="tier-ladder"
          className="mb-4 font-display text-xl font-600 text-navy"
        >
          Tier ladder
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {TIERS.map((t, i) => {
            const isCurrent = t.name === account.tier;
            const isUnlocked = points >= t.min;
            const Icon = t.icon;
            return (
              <Card
                key={t.name}
                className={
                  "relative overflow-hidden transition-all " +
                  (isCurrent
                    ? "border-teal shadow-md ring-2 ring-teal/30"
                    : "border-border")
                }
              >
                {isCurrent && (
                  <div
                    className="absolute inset-x-0 top-0 h-1"
                    style={{ backgroundColor: t.accent }}
                  />
                )}
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div
                      className="flex size-10 items-center justify-center rounded-xl text-white"
                      style={{ backgroundColor: t.accent }}
                    >
                      <Icon className="size-5" />
                    </div>
                    {isCurrent ? (
                      <Badge className="bg-teal text-white hover:bg-teal/90">
                        Current
                      </Badge>
                    ) : isUnlocked ? (
                      <Badge variant="outline" className="text-muted-foreground">
                        <CheckCircle2 className="size-3" /> Earned
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-muted-foreground">
                        Locked
                      </Badge>
                    )}
                  </div>
                  <h3 className="mt-3 font-display text-lg font-700 text-navy">
                    {t.name}
                  </h3>
                  <p className="text-sm font-medium text-muted-foreground">
                    {t.min.toLocaleString()}+ points
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">{t.blurb}</p>
                  {!isUnlocked && i > currentTierIdx && (
                    <p className="mt-3 rounded-md bg-muted px-2 py-1.5 text-xs font-medium text-navy">
                      {(t.min - points).toLocaleString()} pts to unlock
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Ways to earn */}
      <section aria-labelledby="ways-to-earn">
        <h2
          id="ways-to-earn"
          className="mb-4 font-display text-xl font-600 text-navy"
        >
          Ways to earn
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {WAYS_TO_EARN.map((w) => {
            const Icon = w.icon;
            return (
              <Card key={w.title} className="border-border">
                <CardContent className="p-4">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-teal/10 text-teal">
                    <Icon className="size-4.5" />
                  </div>
                  <h3 className="mt-3 text-sm font-600 text-navy">{w.title}</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {w.desc}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Rewards catalog */}
      <section aria-labelledby="rewards-catalog">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2
              id="rewards-catalog"
              className="font-display text-xl font-600 text-navy"
            >
              Rewards catalog
            </h2>
            <p className="text-sm text-muted-foreground">
              Redeem your points for experiences and perks
            </p>
          </div>
          <span className="text-sm text-muted-foreground">
            {rewards.length} reward{rewards.length === 1 ? "" : "s"} available
          </span>
        </div>
        {rewards.length === 0 ? (
          <EmptyState
            icon={Gift}
            title="No rewards available"
            description="Check back soon — we add new rewards every month."
          />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {rewards.map((r) => {
              const cashValue = r.title.match(/^\$(\d+)/)?.[1];
              return (
                <Card
                  key={r.id}
                  className="flex flex-col overflow-hidden border-border transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="relative h-32 overflow-hidden bg-muted">
                    {r.image ? (
                      <img
                        src={r.image}
                        alt={r.title}
                        className="size-full object-cover"
                      />
                    ) : (
                      <div className="flex size-full items-center justify-center text-muted-foreground">
                        <Gift className="size-10" />
                      </div>
                    )}
                    <Badge
                      className="absolute left-2 top-2 bg-white/90 text-navy hover:bg-white/90"
                      variant="secondary"
                    >
                      {CATEGORY_LABEL[r.category] ?? r.category}
                    </Badge>
                  </div>
                  <CardContent className="flex flex-1 flex-col p-4">
                    <h3 className="font-display text-base font-600 text-navy">
                      {r.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 flex-1 text-xs text-muted-foreground">
                      {r.description}
                    </p>
                    <div className="mt-3 flex items-center gap-1.5 text-sm font-700 text-teal">
                      <Sparkles className="size-4" />
                      {r.pointsCost.toLocaleString()} pts
                    </div>
                    <div className="mt-3">
                      <RedeemButton
                        rewardId={r.id}
                        rewardTitle={r.title}
                        pointsCost={r.pointsCost}
                        currentPoints={points}
                        cashValue={cashValue ? Number(cashValue) : undefined}
                      />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </section>

      {/* Points history */}
      <section aria-labelledby="points-history">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle
              id="points-history"
              className="flex items-center gap-2 text-base font-600 text-navy"
            >
              <Coins className="size-4 text-teal" />
              Points history
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Most recent transactions first
            </p>
          </CardHeader>
          <CardContent>
            {account.transactions.length === 0 ? (
              <EmptyState
                icon={Coins}
                title="No activity yet"
                description="Earn points by booking experiences and leaving reviews."
                className="border-0 bg-transparent py-10"
                action={
                  <Link
                    href="/book"
                    className="inline-flex items-center gap-1.5 rounded-md bg-teal px-4 py-2 text-sm font-600 text-white hover:bg-teal/90"
                  >
                    Browse experiences
                  </Link>
                }
              />
            ) : (
              <ScrollArea className="max-h-96 pr-3">
                <ol className="divide-y divide-border">
                  {account.transactions.map((t) => {
                    const meta = TXN_META[t.type] ?? {
                      icon: Coins,
                      tone: "text-muted-foreground",
                    };
                    const Icon = meta.icon;
                    const positive = t.points >= 0;
                    return (
                      <li
                        key={t.id}
                        className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
                      >
                        <div
                          className={`flex size-9 shrink-0 items-center justify-center rounded-full bg-muted ${meta.tone}`}
                        >
                          <Icon className="size-4.5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-navy">
                            {t.description}
                          </p>
                          <p className="text-xs capitalize text-muted-foreground">
                            {t.type}
                            {t.source ? ` · ${t.source}` : ""} ·{" "}
                            {relativeTime(t.createdAt)}
                          </p>
                        </div>
                        <div
                          className={`shrink-0 text-sm font-700 ${
                            positive ? "text-teal" : "text-amber-600"
                          }`}
                        >
                          {positive ? "+" : ""}
                          {t.points.toLocaleString()} pts
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </ScrollArea>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
