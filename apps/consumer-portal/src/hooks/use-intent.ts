"use client";

import { useEffect, useState, useCallback } from "react";

export type PlanIntent = {
  what: string | null;
  where: string | null;
  when: string | null;
  whenEnd: string | null;
  price: string | null;
  attendees: string | null;
};

export type VendorSummary = {
  activeListings: number;
  draftListings: number;
  pausedListings: number;
  totalListings: number;
  bookings: number;
  revenue: number;
  vendorOnboarded: boolean;
  slug: string | null;
  portalUrl: string;
  modules: readonly string[];
};

export type IntentState = {
  role: "guest" | "vendor" | "dual";
  activeRole: "guest" | "vendor";
  vendorStatus: "none" | "pending" | "onboarded";
  vendorSlug: string | null;
  signals: { guest: number; vendor: number };
  vendorSummary: VendorSummary;
  plan: PlanIntent | null;
};

const ZERO: IntentState = {
  role: "guest",
  activeRole: "guest",
  vendorStatus: "none",
  vendorSlug: null,
  signals: { guest: 0, vendor: 0 },
  vendorSummary: {
    activeListings: 0,
    draftListings: 0,
    pausedListings: 0,
    totalListings: 0,
    bookings: 0,
    revenue: 0,
    vendorOnboarded: false,
    slug: null,
    portalUrl: "/create-listing",
    modules: [],
  },
  plan: null,
};

let cached: IntentState | null = null;
const listeners = new Set<(s: IntentState) => void>();

function emit(s: IntentState) {
  cached = s;
  listeners.forEach((l) => l(s));
}

export function useIntent() {
  const [state, setState] = useState<IntentState>(() => cached ?? ZERO);
  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/portal/intent", { cache: "no-store" });
      if (res.ok) {
        const data = (await res.json()) as IntentState;
        emit(data);
      }
    } catch {
      /* ignore */
    }
  }, []);

  // Switch active role (guest ↔ vendor). Persists on the guest record.
  const switchRole = useCallback(
    async (next: "guest" | "vendor") => {
      // optimistic
      if (cached) emit({ ...cached, activeRole: next });
      try {
        await fetch("/api/guest", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ activeRole: next }),
        });
        await refresh();
      } catch {
        /* ignore */
      }
    },
    [refresh]
  );

  // Save the Plan (global intent). Persists on the guest record.
  const savePlan = useCallback(
    async (plan: PlanIntent) => {
      try {
        await fetch("/api/guest", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(plan),
        });
        await refresh();
      } catch {
        /* ignore */
      }
    },
    [refresh]
  );

  useEffect(() => {
    listeners.add(setState);
    if (!cached) {
      void refresh();
    }
    return () => {
      listeners.delete(setState);
    };
  }, [refresh]);

  return { intent: state, refresh, switchRole, savePlan };
}
