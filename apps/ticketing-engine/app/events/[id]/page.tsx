import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getEvent, getCategory, formatDate, formatTime, formatPrice } from "@/lib/events-data";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface EventPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const event = getEvent(params.id);
  if (!event) {
    return {
      title: "Event — Aperture",
    };
  }
  return {
    title: `${event.title} — Aperture`,
    description: event.description,
  };
}

export default function EventPage({ params }: EventPageProps) {
  const event = getEvent(params.id);
  if (!event) {
    notFound();
  }
  const category = getCategory(event.category);

  return (
    <>
      <Header />

      <section className="relative hairline-b overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />
        <div className="container-page relative z-10 pt-20 pb-16">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] font-mono">
            <Link href="/browse" className="text-muted-foreground hover:text-copper">
              Browse
            </Link>
            <span className="text-muted-foreground">/</span>
            {category && (
              <>
                <Link href={`/category/${category.slug}`} className="text-muted-foreground hover:text-copper">
                  {category.name}
                </Link>
                <span className="text-muted-foreground">/</span>
              </>
            )}
            <span className="text-copper">{event.title}</span>
          </div>
          <div className="mt-12 grid md:grid-cols-2 gap-12">
            <div>
              <h1 className="font-display text-5xl md:text-6xl leading-[0.95] max-w-2xl">
                {event.title}
              </h1>
              <p className="mt-4 text-xl text-foreground/80">{event.subtitle}</p>
              <div className="mt-6 flex items-center gap-4">
                <span className="inline-flex items-center h-9 px-4 rounded-full bg-copper/10 text-copper text-sm font-medium">
                  {event.source}
                </span>
                <span className="text-sm text-muted-foreground">{event.attendance}</span>
              </div>
            </div>
            <div className="bg-surface rounded-lg p-6">
              <div className="text-center mb-6">
                <div className="text-4xl font-display">{formatPrice(event.priceFrom)}</div>
                <div className="text-sm text-muted-foreground">starting price</div>
              </div>
              <button className="w-full h-12 rounded-full bg-ivory text-ink font-medium hover:bg-copper-soft transition-colors">
                Get tickets
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <h2 className="font-display text-3xl mb-6">About this event</h2>
            <p className="text-lg text-foreground/80 leading-relaxed">{event.description}</p>

            <div className="mt-12 grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-mono mb-3">
                  Date & Time
                </h3>
                <div className="font-display text-2xl">{formatDate(event.date)}</div>
                <div className="text-lg text-foreground/80 mt-1">{formatTime(event.date)}</div>
              </div>
              <div>
                <h3 className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-mono mb-3">
                  Location
                </h3>
                <div className="font-display text-2xl">{event.venue}</div>
                <div className="text-lg text-foreground/80 mt-1">
                  {event.city}, {event.state}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-mono mb-4">
              Category
            </h3>
            {category && (
              <Link
                href={`/category/${category.slug}`}
                className="block p-4 hairline rounded-lg hover:bg-surface transition-colors"
              >
                <div className="font-display text-xl">{category.name}</div>
                <div className="text-sm text-muted-foreground mt-1">{event.subcategory}</div>
              </Link>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
