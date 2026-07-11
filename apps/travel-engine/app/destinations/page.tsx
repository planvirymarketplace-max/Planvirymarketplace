import Link from "next/link";
import { CONTINENTS } from "@/data/destinations";
import { DestinationSearch } from "@/components/DestinationSearch";
import { PageShell } from "@/components/SiteChrome";

export default function DestinationsIndex() {
  return (
    <PageShell>
      <section className="border-b-4 border-ink">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <h1 className="font-display text-6xl md:text-8xl tracking-tight">Destinations</h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Browse our complete atlas — nine continents, a hundred-odd countries, and the cities that make them.
          </p>
          <div className="mt-8 max-w-2xl">
            <DestinationSearch placeholder="Search any destination…" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="flex items-end justify-between border-b-2 border-ink pb-2">
          <h2 className="font-display text-3xl">Continents</h2>
          <span className="label-mono text-muted-foreground">{CONTINENTS.length}</span>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {CONTINENTS.map((cont, i) => (
            <Link
              key={cont.slug}
              href={`/destinations/${cont.slug}`}
              className={`group flex flex-col justify-between border-ink p-6 min-h-[180px] border-b border-r ${i % 3 === 2 ? "lg:border-r-0" : ""}`}
            >
              <span className="label-mono text-muted-foreground">No. {String(i + 1).padStart(2, "0")}</span>
              <div>
                <div className="font-display text-3xl group-hover:text-accent">{cont.name}</div>
                <div className="mt-1 label-mono text-muted-foreground">{cont.countries.length} countries →</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
