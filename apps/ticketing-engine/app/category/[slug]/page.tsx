import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { EventCard } from "@/components/EventCard";
import { categories, eventsByCategory, getCategory, type EventItem } from "@/lib/events-data";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = getCategory(params.slug);
  if (!category) {
    return {
      title: "Category — Aperture",
    };
  }
  return {
    title: `${category.name} — Aperture`,
    description: category.description,
    openGraph: {
      title: `${category.name} tickets — Aperture`,
      description: category.description,
      images: [category.image],
    },
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = getCategory(params.slug);
  if (!category) {
    notFound();
  }
  const events = eventsByCategory(params.slug);

  return (
    <>
      <Header />

      <section className="relative hairline-b overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/60" />
        <div className="container-page relative z-10 pt-20 pb-16">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] font-mono">
            <Link href="/browse" className="text-muted-foreground hover:text-copper">
              Browse
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-copper">{category.name}</span>
          </div>
          <h1 className="mt-8 font-display text-6xl md:text-8xl leading-[0.95] max-w-4xl">
            {category.name}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-foreground/80 max-w-2xl">
            {category.description}
          </p>
        </div>
      </section>

      <section className="container-page py-10">
        <div className="flex flex-wrap gap-2 mb-10">
          {category.subcategories.map((s: string) => (
            <button
              key={s}
              className="inline-flex items-center h-9 px-4 rounded-full border border-hairline text-sm text-foreground/80 hover:border-copper hover:text-copper transition-colors"
            >
              {s}
            </button>
          ))}
        </div>

        {events.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((e: EventItem) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        ) : (
          <div className="hairline-t py-24 text-center">
            <p className="font-display text-3xl">No events yet in {category.name}.</p>
            <p className="mt-3 text-muted-foreground">More on sale soon.</p>
          </div>
        )}
      </section>

      <section className="container-page py-24">
        <p className="text-xs uppercase tracking-[0.25em] text-copper font-mono mb-4">
          Keep exploring
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {categories
            .filter((c) => c.slug !== category.slug)
            .map((c) => (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                className="group flex items-center justify-between p-5 hairline-b hover:bg-surface transition-colors"
              >
                <span className="font-display text-2xl">{c.name}</span>
                <span className="text-copper opacity-0 group-hover:opacity-100 transition-opacity">
                  →
                </span>
              </Link>
            ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
