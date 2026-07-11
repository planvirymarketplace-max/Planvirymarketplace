"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

import { STEP_META, TOTAL_STEPS } from "./steps";

export function StepRail({
  current,
  maxReached,
  onJump,
  className,
}: {
  current: number;
  maxReached: number;
  onJump: (step: number) => void;
  className?: string;
}) {
  return (
    <nav aria-label="Wizard progress" className={cn("", className)}>
      {/* Desktop: vertical rail */}
      <ol className="hidden lg:flex lg:flex-col lg:gap-1">
        {STEP_META.map((s, i) => {
          const n = i + 1;
          const isCurrent = n === current;
          const isComplete = n < current;
          const isReachable = n <= maxReached;
          const Icon = s.icon;
          return (
            <li key={s.key}>
              <button
                type="button"
                onClick={() => isReachable && onJump(n)}
                disabled={!isReachable}
                aria-current={isCurrent ? "step" : undefined}
                aria-label={`Step ${n}: ${s.label}${isCurrent ? " (current)" : isComplete ? " (completed)" : ""}`}
                className={cn(
                  "group flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-all",
                  isCurrent
                    ? "border-teal/40 bg-teal/[0.06] shadow-sm"
                    : isReachable
                    ? "border-border bg-card hover:border-teal/30 hover:bg-teal/[0.03]"
                    : "border-transparent bg-transparent opacity-50 cursor-not-allowed"
                )}
              >
                <span
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-600 transition",
                    isCurrent
                      ? "bg-teal text-white"
                      : isComplete
                      ? "bg-teal/15 text-teal"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {isComplete ? (
                    <Check className="size-4" />
                  ) : (
                    <Icon className="size-4" />
                  )}
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className={cn(
                      "block font-display text-sm font-600 leading-tight",
                      isCurrent ? "text-navy" : "text-foreground"
                    )}
                  >
                    {s.label}
                  </span>
                  <span className="block text-[11px] leading-tight text-muted-foreground">
                    {s.hint}
                  </span>
                </span>
                <span
                  className={cn(
                    "text-[10px] font-semibold uppercase tracking-wide",
                    isCurrent ? "text-teal" : "text-muted-foreground/60"
                  )}
                >
                  {n}/{TOTAL_STEPS}
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      {/* Mobile: horizontal scrollable strip */}
      <ol className="flex items-stretch gap-2 overflow-x-auto pb-1 lg:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {STEP_META.map((s, i) => {
          const n = i + 1;
          const isCurrent = n === current;
          const isComplete = n < current;
          const isReachable = n <= maxReached;
          const Icon = s.icon;
          return (
            <li key={s.key} className="shrink-0">
              <button
                type="button"
                onClick={() => isReachable && onJump(n)}
                disabled={!isReachable}
                aria-current={isCurrent ? "step" : undefined}
                className={cn(
                  "flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-all",
                  isCurrent
                    ? "border-teal bg-teal text-white"
                    : isComplete
                    ? "border-teal/30 bg-teal/10 text-teal"
                    : isReachable
                    ? "border-border bg-card text-foreground"
                    : "border-transparent bg-muted/50 text-muted-foreground opacity-60"
                )}
              >
                <span className="flex size-4 items-center justify-center">
                  {isComplete ? <Check className="size-3.5" /> : <Icon className="size-3.5" />}
                </span>
                {s.label}
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
