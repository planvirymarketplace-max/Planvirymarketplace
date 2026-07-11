import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { EventCard } from "@/components/EventCard";
import { categories, events } from "@/lib/events-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse events — Aperture",
  description: "Concerts, sports, theater, festivals, classes, and community events — all indexed in one place.",
};

export default function Browse() {
  return (
    <>
      <Header />
      <section className="hairline-b">
        <div className="container-page pt-16 pb-10">
          <p className="text-xs uppercase tracking-[0.25em] text-copper font-mono">Browse</p>
          <h1 className="mt-4 font-display text-6xl md:text-7xl leading-[0.95]">
            All events, <span className="italic">every category</span>.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
            {events.length} events currently on sale across {categories.length} categories.
            Filter by city, price, and date coming soon.
          </p>
        </div>
      </section>

      <section className="container-page py-10">
        <div className="flex flex-wrap gap-2 mb-10">
          <span className="inline-flex items-center h-9 px-4 rounded-full bg-ivory text-ink text-sm font-medium">
            All
          </span>
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className="inline-flex items-center h-9 px-4 rounded-full border border-hairline text-sm text-foreground/80 hover:border-copper hover:text-copper transition-colors"
            >
              {c.name}
            </Link>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {events.map((e) => (
            <EventCard key={e.id} event={e} />
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
