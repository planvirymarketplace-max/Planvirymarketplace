import Link from "next/link";
import type { ReactNode } from "react";
import { DestinationSearch } from "./DestinationSearch";

export function SiteHeader({ compact = false }: { compact?: boolean }) {
  return (
    <header className="border-b-4 border-ink bg-paper">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <Link href="/" className="font-display text-2xl leading-none tracking-tight">
          Meridian<span className="text-accent">·</span>
        </Link>
        <nav className="hidden gap-6 label-mono md:flex">
          <Link href="/destinations" className="hover:underline underline-offset-4">Destinations</Link>
          <a href="#packages" className="hover:underline underline-offset-4">Packages</a>
          <a href="#journal" className="hover:underline underline-offset-4">Journal</a>
        </nav>
        <div className="hidden md:block w-72">
          {!compact && <DestinationSearch size="md" placeholder="Search…" />}
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t-4 border-ink bg-paper-warm">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-12 md:grid-cols-4">
        <div>
          <div className="font-display text-xl">Meridian·</div>
          <p className="mt-2 text-sm text-muted-foreground">
            An editorial guide to the world's cities, in the tradition of the old broadsheets.
          </p>
        </div>
        <div>
          <div className="label-mono mb-3">Explore</div>
          <ul className="space-y-1 text-sm">
            <li><Link to="/destinations" className="hover:underline">All destinations</Link></li>
          </ul>
        </div>
        <div>
          <div className="label-mono mb-3">Company</div>
          <ul className="space-y-1 text-sm">
            <li><a className="hover:underline" href="#">About</a></li>
            <li><a className="hover:underline" href="#">Contact</a></li>
          </ul>
        </div>
        <div>
          <div className="label-mono mb-3">Colophon</div>
          <p className="text-sm text-muted-foreground">Set in Fraunces &amp; Inter. Printed on the Web.</p>
        </div>
      </div>
      <div className="border-t border-ink/20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 label-mono text-muted-foreground">
          <span>© {new Date().getFullYear()} Meridian</span>
          <span>Issue No. 01</span>
        </div>
      </div>
    </footer>
  );
}

export function Breadcrumbs({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav className="label-mono text-muted-foreground">
      {items.map((it, i) => (
        <span key={i}>
          {it.to ? (
            <Link href={it.to} className="hover:text-ink hover:underline underline-offset-4">{it.label}</Link>
          ) : (
            <span className="text-ink">{it.label}</span>
          )}
          {i < items.length - 1 && <span className="mx-2">/</span>}
        </span>
      ))}
    </nav>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
