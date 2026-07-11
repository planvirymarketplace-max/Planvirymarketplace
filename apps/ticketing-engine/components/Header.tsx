import Link from "next/link";
import { categories } from "@/lib/events-data";

export function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/70 hairline-b">
      <div className="container-page flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="w-2 h-2 rounded-full bg-copper transition-transform group-hover:scale-125" />
          <span className="font-display text-2xl leading-none">Aperture</span>
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground ml-2 hidden sm:inline">
            Tickets
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm">
          <Link
            href="/browse"
            className="text-foreground/80 hover:text-foreground transition-colors"
          >
            Browse
          </Link>
          {categories.slice(0, 4).map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              {c.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="hidden sm:inline-flex text-sm text-foreground/80 hover:text-foreground transition-colors"
          >
            Sign in
          </button>
          <Link
            href="/browse"
            className="inline-flex items-center h-9 px-4 rounded-full bg-ivory text-ink text-sm font-medium hover:bg-copper-soft transition-colors"
          >
            Find tickets
          </Link>
        </div>
      </div>
    </header>
  );
}
