"use client";

import * as React from "react";
import { useIntent } from "@/hooks/use-intent";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Store, UserRound, ArrowLeftRight } from "lucide-react";

/**
 * RoleSwitcher — renders only when the user is dual-role (guest + vendor).
 * Toggles the active portal view between Guest and Vendor. Persisted via
 * /api/guest { activeRole }. In vendor mode the sidebar reveals the Vendor
 * section + the VendorSummary widget surfaces inline.
 *
 * The mono-repo's full vendor portal is a separate app; this switch controls
 * the *view within the guest portal* (guest sections vs vendor sections) and
 * the vendor summary's "Open vendor dashboard" button deep-links to the vendor
 * portal via `vendorSummary.portalUrl`.
 */
export function RoleSwitcher() {
  const { intent, switchRole } = useIntent();
  const [pending, setPending] = React.useState(false);

  if (intent.role !== "dual") return null;

  const isVendor = intent.activeRole === "vendor";

  async function toggle() {
    setPending(true);
    await switchRole(isVendor ? "guest" : "vendor");
    setPending(false);
  }

  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={toggle}
            disabled={pending}
            aria-label={`Switch to ${isVendor ? "Guest" : "Vendor"} view`}
            className={cn(
              "group flex h-9 items-center gap-1.5 rounded-full border px-1 transition-colors",
              isVendor
                ? "border-navy/30 bg-navy text-white"
                : "border-border bg-card text-navy hover:bg-muted"
            )}
          >
            <span
              className={cn(
                "flex size-7 items-center justify-center rounded-full transition-colors",
                isVendor ? "bg-white/15 text-white" : "bg-teal/10 text-teal"
              )}
            >
              {isVendor ? <Store className="size-3.5" /> : <UserRound className="size-3.5" />}
            </span>
            <span className="pr-2 text-xs font-semibold">
              {isVendor ? "Vendor" : "Guest"}
            </span>
            <ArrowLeftRight className="mr-1.5 size-3 opacity-50" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="text-xs">
          {isVendor
            ? "You're in Vendor view. Click to switch to Guest."
            : "You're in Guest view. Click to switch to Vendor."}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

/**
 * VendorModeBanner — shown at the top of portal pages when activeRole === "vendor".
 * Explains that vendor tools are scoped here + links to the full vendor portal.
 */
export function VendorModeBanner() {
  const { intent } = useIntent();
  if (intent.activeRole !== "vendor") return null;
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-navy/15 bg-navy px-4 py-3 text-sm text-white">
      <div className="flex items-center gap-2.5">
        <Store className="size-4 text-teal" />
        <span className="font-semibold">Vendor view</span>
        <span className="text-white/70">
          · Your listings, drafts, and marketplace tools are scoped to this session.
        </span>
      </div>
      <a
        href={intent.vendorSummary.portalUrl}
        className="inline-flex items-center gap-1.5 rounded-lg bg-teal px-3 py-1.5 text-xs font-semibold text-white hover:bg-teal/90"
      >
        Open full vendor dashboard
      </a>
    </div>
  );
}
