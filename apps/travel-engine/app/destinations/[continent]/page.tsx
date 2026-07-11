import Link from "next/link";
import { notFound } from "next/navigation";
import { getContinent } from "@/data/destinations";
import { DestinationSearch } from "@/components/DestinationSearch";
import { Breadcrumbs, PageShell } from "@/components/SiteChrome";

interface ContinentPageProps {
  params: { continent: string };
}

export async function generateMetadata({ params }: ContinentPageProps) {
  const cont = getContinent(params.continent);
  if (!cont) {
    return {
      title: "Not found — Meridian",
      robots: "noindex",
    };
  }
  const title = `Explore ${cont.name} | Travel guides, packages & itineraries`;
  return {
    title,
    description: `${cont.name}: ${cont.countries.length} countries, curated packages and city guides.`,
    openGraph: {
      title,
      url: `/destinations/${params.continent}`,
    },
    alternates: {
      canonical: `/destinations/${params.continent}`,
    },
  };
}

export default function ContinentPage({ params }: ContinentPageProps) {
  const cont = getContinent(params.continent);
  if (!cont) notFound();

  return (
    <PageShell>
      <section className="border-b-4 border-ink bg-paper-warm">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <Breadcrumbs items={[
            { label: "Home", to: "/" },
            { label: "Destinations", to: "/destinations" },
            { label: cont.name },
          ]} />
          <div className="mt-6 flex items-end justify-between gap-6 flex-wrap">
            <h1 className="font-display text-6xl md:text-8xl tracking-tight">{cont.name}</h1>
            <span className="label-mono text-muted-foreground">{cont.countries.length} countries</span>
          </div>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{cont.blurb}</p>
          <div className="mt-8 max-w-2xl">
            <DestinationSearch placeholder={`Search a country or city in ${cont.name}…`} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="flex items-end justify-between border-b-2 border-ink pb-2">
          <h2 className="font-display text-3xl">Countries</h2>
          <span className="label-mono text-muted-foreground">A → Z</span>
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {cont.countries.map((k: { name: string; slug: string; cities?: string[] }, i: number) => (
            <Link
              key={k.slug}
              href={`/destinations/${cont.slug}/${k.slug}`}
              className={`group flex items-baseline justify-between border-b border-ink p-5 ${i % 3 !== 2 ? "lg:border-r" : ""} ${i % 2 === 0 ? "sm:border-r lg:border-r" : ""} border-r`}
            >
              <div>
                <span className="label-mono text-muted-foreground">No. {String(i + 1).padStart(2, "0")}</span>
                <div className="mt-1 font-display text-2xl group-hover:text-accent">{k.name}</div>
              </div>
              <span className="label-mono text-muted-foreground">
                {k.cities?.length ? `${k.cities.length} cities` : "—"}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
