import Link from "next/link";
import { categories } from "@/lib/events-data";

export function Footer() {
  return (
    <footer className="hairline-t mt-32">
      <div className="container-page py-20 grid grid-cols-2 md:grid-cols-5 gap-12">
        <div className="col-span-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-copper" />
            <span className="font-display text-3xl">Aperture</span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground max-w-xs">
            The ticketing platform for arenas and neighborhoods alike. From sold-out
            stadium nights to Tuesday's pottery class.
          </p>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-sans">
            Discover
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            {categories.slice(0, 4).map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/category/${c.slug}`}
                  className="hover:text-copper transition-colors"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-sans">
            Organizers
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li className="hover:text-copper transition-colors cursor-pointer">Sell tickets</li>
            <li className="hover:text-copper transition-colors cursor-pointer">Venue partners</li>
            <li className="hover:text-copper transition-colors cursor-pointer">Pricing</li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-sans">
            Company
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li className="hover:text-copper transition-colors cursor-pointer">About</li>
            <li className="hover:text-copper transition-colors cursor-pointer">Careers</li>
            <li className="hover:text-copper transition-colors cursor-pointer">Press</li>
            <li className="hover:text-copper transition-colors cursor-pointer">Contact</li>
          </ul>
        </div>
      </div>
      <div className="hairline-t">
        <div className="container-page py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© 2026 Aperture Ticketing, Inc. All rights reserved.</p>
          <p className="font-mono">v1.0 · Enterprise</p>
        </div>
      </div>
    </footer>
  );
}
