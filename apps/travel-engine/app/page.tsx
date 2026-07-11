import Link from "next/link";
import { CONTINENTS } from "@/data/destinations";
import { DestinationSearch } from "@/components/DestinationSearch";
import { PageShell } from "@/components/SiteChrome";

export default function Home() {
  return (
    <PageShell>
      {/* Masthead / hero */}
      <section className="border-b-4 border-ink">
        <div className="mx-auto max-w-7xl px-6 pt-16 pb-10">
          <div className="flex items-center justify-between label-mono text-muted-foreground">
            <span>Vol. I · Issue 01</span>
            <span>The Atlas Number</span>
            <span>{new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })}</span>
          </div>
          <h1 className="mt-8 font-display text-6xl md:text-8xl leading-[0.95] tracking-tight">
            An editorial atlas,<br />
            <span className="italic">arranged by longitude</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            A slow, opinionated guide to the world's cities. Nine continents,
            a hundred-odd countries, and the trains between them.
          </p>
          <div className="mt-10 max-w-3xl">
            <DestinationSearch size="lg" placeholder="Type a city — Budapest, Kyoto, Marrakesh…" />
          </div>
        </div>
      </section>

      {/* Continents grid */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex items-end justify-between border-b-2 border-ink pb-3">
          <h2 className="font-display text-3xl md:text-4xl">Browse by continent</h2>
          <Link href="/destinations" className="label-mono hover:underline underline-offset-4">All destinations →</Link>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {CONTINENTS.map((cont, i) => (
            <Link
              key={cont.slug}
              href={`/destinations/${cont.slug}`}
              className={`group flex flex-col justify-between border-ink p-6 min-h-[220px] border-b border-r ${i % 3 === 2 ? "lg:border-r-0" : ""}`}
            >
              <div className="flex items-start justify-between">
                <span className="label-mono text-muted-foreground">No. {String(i + 1).padStart(2, "0")}</span>
                <span className="label-mono text-muted-foreground">{cont.countries.length} countries</span>
              </div>
              <div>
                <div className="font-display text-4xl md:text-5xl tracking-tight group-hover:text-accent transition-colors">
                  {cont.name}
                </div>
                <p className="mt-3 text-sm text-muted-foreground max-w-sm">{cont.blurb}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Editorial band */}
      <section className="border-y-4 border-ink bg-paper-warm">
        <div className="mx-auto max-w-7xl px-6 py-14 grid md:grid-cols-3 gap-8">
          <div>
            <div className="label-mono text-muted-foreground">Feature</div>
            <h3 className="mt-2 font-display text-3xl">Twelve nights on the sleeper trains of Europe</h3>
            <p className="mt-3 text-sm text-muted-foreground">Kraków to Lisbon by rail, and what the couchette teaches you about time.</p>
          </div>
          <div>
            <div className="label-mono text-muted-foreground">Dispatch</div>
            <h3 className="mt-2 font-display text-3xl">The bath-house etiquette of Budapest</h3>
            <p className="mt-3 text-sm text-muted-foreground">A short field manual to Széchenyi, Gellért and Rudas — with towels.</p>
          </div>
          <div>
            <div className="label-mono text-muted-foreground">Package</div>
            <h3 className="mt-2 font-display text-3xl">Morocco, from the medina outward</h3>
            <p className="mt-3 text-sm text-muted-foreground">Nine days, three riads and a driver called Youssef.</p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
