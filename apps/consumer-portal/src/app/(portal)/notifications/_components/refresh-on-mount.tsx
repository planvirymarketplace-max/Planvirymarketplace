"use client";

import { useEffect } from "react";
import { usePortalCounts } from "@/hooks/use-portal-data";

/**
 * Tiny client island that calls `refresh()` from `usePortalCounts` once on
 * mount so the header bell badge stays accurate after server-rendered
 * notification state changes.
 */
export function RefreshOnMount() {
  const { refresh } = usePortalCounts();
  useEffect(() => {
    void refresh();
  }, [refresh]);
  return null;
}
