"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { VERTICALS } from "@/lib/constants";

const TABS: { value: string; label: string }[] = [
  { value: "all", label: "All" },
  { value: "upcoming", label: "Upcoming" },
  { value: "past", label: "Past" },
  { value: "cancelled", label: "Cancelled" },
];

/** Build a reservations URL preserving every filter except the one being changed. */
function buildHref(
  overrides: { tab?: string; vertical?: string; q?: string },
  current: { tab: string; vertical: string; q: string }
): string {
  const tab = overrides.tab ?? current.tab;
  const vertical = overrides.vertical ?? current.vertical;
  const q = overrides.q !== undefined ? overrides.q : current.q;
  const p = new URLSearchParams();
  if (tab && tab !== "all") p.set("tab", tab);
  if (vertical && vertical !== "all") p.set("vertical", vertical);
  if (q) p.set("q", q);
  const qs = p.toString();
  return qs ? `/reservations?${qs}` : "/reservations";
}

export function ReservationsToolbar({
  tab,
  vertical,
  q,
  count,
}: {
  tab: string;
  vertical: string;
  q: string;
  count: number;
}) {
  const router = useRouter();
  const [search, setSearch] = useState(q ?? "");

  const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = search.trim();
    router.push(buildHref({ q: trimmed }, { tab, vertical, q }));
  };

  const onClearSearch = () => {
    setSearch("");
    if (q) router.push(buildHref({ q: "" }, { tab, vertical, q }));
  };

  const onVerticalChange = (v: string) => {
    router.push(buildHref({ vertical: v }, { tab, vertical, q }));
  };

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <Tabs value={tab} onValueChange={() => {}}>
        <TabsList className="w-full sm:w-auto">
          {TABS.map((t) => (
            <TabsTrigger key={t.value} value={t.value} asChild>
              <Link
                href={buildHref({ tab: t.value }, { tab, vertical, q })}
                aria-current={tab === t.value ? "page" : undefined}
              >
                {t.label}
              </Link>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <span
          className="hidden text-xs font-medium text-muted-foreground sm:inline"
          aria-live="polite"
        >
          {count === 1 ? "1 result" : `${count} results`}
        </span>

        <Select value={vertical} onValueChange={onVerticalChange}>
          <SelectTrigger
            size="sm"
            className="w-full sm:w-[170px]"
            aria-label="Filter by vertical"
          >
            <SelectValue placeholder="All verticals" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All verticals</SelectItem>
            {VERTICALS.map((v) => (
              <SelectItem key={v} value={v}>
                {v}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <form
          onSubmit={onSearch}
          role="search"
          className="relative w-full sm:w-64"
        >
          <label htmlFor="reservation-search" className="sr-only">
            Search reservations by listing name or ID
          </label>
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="reservation-search"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search listings or ID…"
            className="h-8 pl-8 pr-8"
            autoComplete="off"
          />
          {search && (
            <button
              type="button"
              onClick={onClearSearch}
              aria-label="Clear search"
              className="absolute right-1.5 top-1/2 flex size-5 -translate-y-1/2 items-center justify-center rounded text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <X className="size-3.5" />
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
