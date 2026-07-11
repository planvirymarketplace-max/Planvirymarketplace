"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { NAV_SECTIONS, ACCOUNT_ITEMS, CREATE_LISTING_HREF } from "@/lib/constants";
import { Logo } from "./logo";
import { PlanPanel } from "./plan-panel";
import { RoleSwitcher } from "./role-switcher";
import { usePortalCounts } from "@/hooks/use-portal-data";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Menu,
  Search,
  Bell,
  ShoppingCart,
  Plus,
  Moon,
  Sun,
  Settings,
  LogOut,
  User as UserIcon,
  Sparkles,
  Store,
} from "lucide-react";

type Guest = { name: string; email: string; avatar?: string | null };

export function PortalShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { counts } = usePortalCounts();
  const { theme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [guest, setGuest] = React.useState<Guest | null>(null);

  React.useEffect(() => {
    fetch("/api/guest", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((g) => setGuest(g))
      .catch(() => {});
  }, []);

  const initials = (guest?.name || "Guest")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  function go(href: string) {
    setMobileOpen(false);
    router.push(href);
  }

  const badgeFor = (href: string) =>
    href === "/cart"
      ? counts.cart
      : href === "/notifications"
      ? counts.notifications
      : href === "/inbox"
      ? counts.messages
      : 0;

  const renderNavLink = (item: { href: string; label: string; icon: typeof Plus }) => {
    const active =
      item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
    const badge = badgeFor(item.href);
    const Icon = item.icon;
    return (
      <Link
        key={item.href}
        href={item.href}
        onClick={() => setMobileOpen(false)}
        className={cn(
          "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
          active
            ? "bg-teal/10 text-teal"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        )}
      >
        <Icon
          className={cn(
            "size-[18px] shrink-0",
            active ? "text-teal" : "text-muted-foreground group-hover:text-foreground"
          )}
        />
        <span className="flex-1">{item.label}</span>
        {badge > 0 && (
          <Badge className="h-5 min-w-5 justify-center rounded-full bg-teal px-1.5 text-[11px] font-semibold text-white">
            {badge}
          </Badge>
        )}
      </Link>
    );
  };

  const NavList = (
    <nav className="flex flex-col gap-4 px-3">
      {NAV_SECTIONS.map((section) => (
        <div key={section.label} className="flex flex-col gap-0.5">
          <p className="px-3 pb-1 pt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/70">
            {section.label}
          </p>
          {section.items.map(renderNavLink)}
        </div>
      ))}
    </nav>
  );

  const SidebarInner = (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center px-5">
        <Link href="/" onClick={() => setMobileOpen(false)}>
          <Logo />
        </Link>
      </div>
      <div className="space-y-2 px-3 pb-2">
        <Link
          href="/onboarding"
          onClick={() => setMobileOpen(false)}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-teal px-3 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal/90"
        >
          <Plus className="size-4" />
          Plan a New Occasion
        </Link>
        <Link
          href={CREATE_LISTING_HREF}
          onClick={() => setMobileOpen(false)}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-navy/15 bg-card px-3 py-2.5 text-sm font-semibold text-navy shadow-sm transition-colors hover:bg-navy hover:text-white"
        >
          <Store className="size-4" />
          Create Listing
        </Link>
      </div>
      <div className="mt-2 flex-1 overflow-y-auto scroll-area-thin">{NavList}</div>
      <div className="border-t border-sidebar-border px-3 py-3">
        <nav className="flex flex-col gap-1">
          {ACCOUNT_ITEMS.map((item) => {
            const active = pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-teal/10 text-teal"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="size-[18px]" />
                {item.label}
              </Link>
            );
          })}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            {theme === "dark" ? (
              <Sun className="size-[18px]" />
            ) : (
              <Moon className="size-[18px]" />
            )}
            {theme === "dark" ? "Light mode" : "Dark mode"}
          </button>
        </nav>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-sidebar-border bg-sidebar lg:block">
        {SidebarInner}
      </aside>

      {/* Mobile sidebar */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-72 p-0">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          {SidebarInner}
        </SheetContent>
      </Sheet>

      {/* Main column */}
      <div className="flex min-h-screen flex-1 flex-col lg:pl-64">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-md sm:px-6">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
          </Sheet>

          <div className="relative hidden flex-1 max-w-md sm:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search reservations, vendors, cities…"
              className="h-9 border-border bg-muted/50 pl-9"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const q = (e.target as HTMLInputElement).value.trim();
                  if (q) router.push(`/saved?q=${encodeURIComponent(q)}`);
                }
              }}
            />
          </div>

          <div className="ml-auto flex items-center gap-1.5">
            <PlanPanel />
            <RoleSwitcher />
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              aria-label="Notifications"
              onClick={() => router.push("/notifications")}
            >
              <Bell className="size-5" />
              {counts.notifications > 0 && (
                <span className="absolute right-1.5 top-1.5 flex size-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-white">
                  {counts.notifications > 9 ? "9+" : counts.notifications}
                </span>
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              aria-label="Cart"
              onClick={() => router.push("/cart")}
            >
              <ShoppingCart className="size-5" />
              {counts.cart > 0 && (
                <span className="absolute right-1.5 top-1.5 flex size-4 items-center justify-center rounded-full bg-teal text-[10px] font-bold text-white">
                  {counts.cart > 9 ? "9+" : counts.cart}
                </span>
              )}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="ml-1 rounded-full ring-offset-background transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  <Avatar className="size-9 border border-border">
                    <AvatarImage src={guest?.avatar || undefined} alt={guest?.name || "Guest"} />
                    <AvatarFallback className="bg-teal/10 text-xs font-semibold text-teal">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="flex flex-col">
                  <span className="text-sm font-semibold text-navy">
                    {guest?.name || "Guest"}
                  </span>
                  <span className="truncate text-xs font-normal text-muted-foreground">
                    {guest?.email || "—"}
                  </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => go("/profile")}>
                  <UserIcon className="mr-2 size-4" /> Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => go("/support")}>
                  <Settings className="mr-2 size-4" /> Support
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => go("/onboarding")}>
                  <Sparkles className="mr-2 size-4" /> Plan new occasion
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive focus:text-destructive">
                  <LogOut className="mr-2 size-4" /> Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1">
          <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            {children}
          </div>
        </main>

        {/* Sticky footer */}
        <footer className="mt-auto border-t border-border bg-card">
          <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-sm text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
            <div className="flex items-center gap-2">
              <Logo showText={false} />
              <span>
                © {new Date().getFullYear()} Planviry · Your personal occasion concierge
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/support" className="hover:text-foreground">
                Support
              </Link>
              <Link href="/saved" className="hover:text-foreground">
                Browse
              </Link>
              <span className="text-border">·</span>
              <span className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                All systems operational
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
