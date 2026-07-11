"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const FILTERS: { value: string; label: string }[] = [
  { value: "all", label: "All" },
  { value: "unread", label: "Unread" },
  { value: "booking", label: "Bookings" },
  { value: "message", label: "Messages" },
  { value: "promotion", label: "Promotions" },
];

export function NotificationsTabs({ active }: { active: string }) {
  const pathname = usePathname();
  const params = useSearchParams();

  function hrefFor(value: string) {
    const sp = new URLSearchParams(params.toString());
    if (value === "all") sp.delete("filter");
    else sp.set("filter", value);
    const qs = sp.toString();
    return qs ? `${pathname}?${qs}` : pathname;
  }

  return (
    <Tabs
      value={active}
      // Tabs are link-driven; suppress Radix selection change.
      onValueChange={() => {}}
      className="w-full"
    >
      <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1 bg-muted/60 p-1 sm:w-auto">
        {FILTERS.map((f) => (
          <TabsTrigger
            key={f.value}
            value={f.value}
            asChild
            className={cn("data-[state=active]:bg-background data-[state=active]:shadow-sm")}
          >
            <Link href={hrefFor(f.value)} aria-current={active === f.value ? "page" : undefined}>
              {f.label}
            </Link>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
