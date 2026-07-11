import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { EventCard } from "@/components/EventCard";
import { categories, events, featuredEvents } from "@/lib/events-data";

export default function Home() {
  const featured = featuredEvents();
  const trending = events.slice(0, 8);

  return (
    <>
      <Header />

      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-end grain overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-copper/20 via-background to-background" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 to-transparent" />

        <div className="container-page relative z-10 pb-20 md:pb-28 pt-32">
          <p className="text-xs uppercase tracking-[0.3em] text-copper font-mono">
            Est. 2026 · Enterprise Ticketing
          </p>
          <h1 className="mt-6 font-display text-[clamp(3rem,9vw,8.5rem)] leading-[0.9] max-w-5xl">
            From the Garden
            <br />
            <span className="italic text-copper-soft">to your street</span>.
          </h1>
          <p className="mt-8 text-lg md:text-xl text-foreground/80 max-w-xl leading-relaxed">
            One platform for stadium nights and neighborhood block parties. Same polish,
            same trust, same rail.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/browse"
              className="inline-flex items-center h-12 px-7 rounded-full bg-ivory text-ink font-medium hover:bg-copper-soft transition-colors"
            >
              Browse events
            </Link>
            <Link
              href="/category/concerts"
              className="inline-flex items-center h-12 px-7 rounded-full border border-hairline hover:border-copper hover:text-copper transition-colors"
            >
              Tonight's shows →
            </Link>
          </div>
        </div>
      </section>

      {/* Stat strip */}
      <section className="hairline-b">
        <div className="container-page grid grid-cols-2 md:grid-cols-4 gap-8 py-12">
          {[
            { k: "142M+", v: "Tickets sold" },
            { k: "38K", v: "Venues & organizers" },
            { k: "1,200+", v: "Cities live" },
            { k: "99.98%", v: "Checkout uptime" },
          ].map((s) => (
            <div key={s.v}>
              <div className="font-display text-4xl md:text-5xl">{s.k}</div>
              <div className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground font-mono">
                {s.v}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="container-page py-24 md:py-32">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-copper font-mono mb-3">
              Featured
            </p>
            <h2 className="font-display text-5xl md:text-6xl">This week's marquee</h2>
          </div>
          <Link href="/browse" className="hidden md:inline-flex text-sm text-foreground/70 hover:text-copper transition-colors">
            All featured →
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {featured.map((e) => (
            <EventCard key={e.id} event={e} />
          ))}
        </div>
      </section>

      {/* Categories — editorial split */}
      <section className="hairline-t hairline-b bg-surface/40">
        <div className="container-page py-24 md:py-32">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <p className="text-xs uppercase tracking-[0.25em] text-copper font-mono mb-3">
                Categories
              </p>
              <h2 className="font-display text-5xl md:text-6xl leading-[0.95]">
                Everything, <br />
                <span className="italic">properly indexed</span>.
              </h2>
              <p className="mt-6 text-muted-foreground max-w-sm">
                Twenty-plus parent categories, hundreds of subcategories, mapped from the
                same taxonomy Ticketmaster and Eventbrite use — with a lot more in between.
              </p>
            </div>
            <div className="md:col-span-8 grid sm:grid-cols-2 gap-4">
              {categories.map((c, i) => (
                <Link
                  key={c.slug}
                  href={`/category/${c.slug}`}
                  className="group relative overflow-hidden rounded-lg aspect-[5/4] bg-surface"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-between">
                    <span className="text-[10px] font-mono tracking-[0.2em] text-copper self-end">
                      0{i + 1}
                    </span>
                    <div>
                      <h3 className="font-display text-3xl">{c.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{c.tagline}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className="container-page py-24 md:py-32">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-copper font-mono mb-3">
              Trending now
            </p>
            <h2 className="font-display text-5xl md:text-6xl">On sale this week</h2>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trending.map((e) => (
            <EventCard key={e.id} event={e} />
          ))}
        </div>
      </section>

      {/* Organizer CTA */}
      <section className="container-page">
        <div className="relative overflow-hidden rounded-2xl bg-surface p-10 md:p-20 grain">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.25em] text-copper font-mono mb-4">
              For organizers
            </p>
            <h2 className="font-display text-5xl md:text-6xl leading-[0.95]">
              Sell tickets like <span className="italic">the majors</span>.
            </h2>
            <p className="mt-6 text-lg text-foreground/80">
              The same infrastructure that powers stadium on-sales, in a checkout your
              neighborhood workshop can set up in fifteen minutes.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button className="inline-flex items-center h-12 px-7 rounded-full bg-ivory text-ink font-medium hover:bg-copper-soft transition-colors">
                Start selling
              </button>
              <button className="inline-flex items-center h-12 px-7 rounded-full border border-hairline hover:border-copper hover:text-copper transition-colors">
                Talk to enterprise
              </button>
            </div>
          </div>
          <div className="absolute -right-20 -bottom-20 w-[420px] h-[420px] rounded-full bg-copper/20 blur-3xl" />
        </div>
      </section>

      <Footer />
    </>
  );
}
