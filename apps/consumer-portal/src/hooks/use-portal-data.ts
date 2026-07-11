"use client";

import { useEffect, useState, useCallback } from "react";

export type PortalCounts = {
  cart: number;
  notifications: number;
  messages: number;
};

const ZERO: PortalCounts = { cart: 0, notifications: 0, messages: 0 };

let cached: PortalCounts | null = null;
const listeners = new Set<(c: PortalCounts) => void>();

function emit(c: PortalCounts) {
  cached = c;
  listeners.forEach((l) => l(c));
}

export function usePortalCounts() {
  const [counts, setCounts] = useState<PortalCounts>(() => cached ?? ZERO);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/portal/counts", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        emit(data);
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    listeners.add(setCounts);
    if (!cached) {
      void refresh();
    }
    return () => {
      listeners.delete(setCounts);
    };
  }, [refresh]);

  return { counts, refresh };
}

// Decrement a specific count optimistically (e.g. after marking notifications read)
export function mutateCounts(patch: Partial<PortalCounts>) {
  if (!cached) return;
  emit({ ...cached, ...patch });
}
