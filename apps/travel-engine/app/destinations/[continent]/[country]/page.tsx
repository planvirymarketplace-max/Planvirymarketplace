import Link from "next/link";
import { notFound } from "next/navigation";
import { citySlug, getCountry } from "@/data/destinations";
import { DestinationSearch } from "@/components/DestinationSearch";
import { Breadcrumbs, PageShell } from "@/components/SiteChrome";

interface CountryPageProps {
  params: { continent: string; country: string };
}

const SAMPLE_PACKAGES = [
  { title: "Highlights Small-Group Tour", days: 5, price: 899, type: "Cultural" },
  { title: "Independent Explorer", days: 7, price: 1240, type: "Private" },
  { title: "Slow Rail Journey", days: 10, price: 1890, type: "Rail" },
];

export async function generateMetadata({ params }: CountryPageProps) {
  const r = getCountry(params.continent, params.country);
  if (!r) {
    return {
      title: "Not found — Meridian",
      robots: "noindex",
    };
  }
  const title = `${r.country.name} Travel Guide | Meridian`;
  return {
    title,
    description: `Best cities, packages and slow travel notes for ${r.country.name}.`,
    openGraph: {
      title,
      url: `/destinations/${params.continent}/${params.country}`,
    },
    alternates: {
      canonical: `/destinations/${params.continent}/${params.country}`,
    },
  };
}

export default function CountryPage({ params }: CountryPageProps) {
  const r = getCountry(params.continent, params.country);
  if (!r) notFound();

  const { continent, country } = r;
  const cities = country.cities ?? [];

  return (
    <PageShell>
      <section className="border-b-4 border-ink">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <Breadcrumbs items={[
            { label: "Home", to: "/" },
            { label: "Destinations", to: "/destinations" },
            { label: continent.name, to: `/destinations/${continent.slug}` },
            { label: country.name },
          ]} />
          <div className="mt-6 grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h1 className="font-display text-6xl md:text-8xl tracking-tight">{country.name}</h1>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
                A country guide — cities, packages and the small things worth flying for.
              </p>
              <div className="mt-8 max-w-xl">
                <DestinationSearch placeholder={`Search cities in ${country.name}…`} />
              </div>
            </div>
            <aside className="border-t-2 border-ink pt-4 md:border-t-0 md:border-l-2 md:pl-8 md:pt-0">
              <dl className="space-y-3">
                <div><dt className="label-mono text-muted-foreground">Continent</dt><dd className="font-display text-xl">{continent.name}</dd></div>
                <div><dt className="label-mono text-muted-foreground">Cities covered</dt><dd className="font-display text-xl">{cities.length}</dd></div>
                <div><dt className="label-mono text-muted-foreground">Best time</dt><dd className="font-display text-xl">April – October</dd></div>
                <div><dt className="label-mono text-muted-foreground">Packages</dt><dd className="font-display text-xl">{SAMPLE_PACKAGES.length} featured</dd></div>
              </dl>
            </aside>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="border-b-4 border-ink bg-paper-warm">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="flex items-end justify-between border-b-2 border-ink pb-2">
            <h2 className="font-display text-3xl">Travel-Agent Packages</h2>
            <span className="label-mono text-muted-foreground">Curated · From partners</span>
          </div>
          <div className="mt-8 grid md:grid-cols-3 gap-0">
            {SAMPLE_PACKAGES.map((p, i) => (
              <article key={i} className={`border-ink border-b p-6 flex flex-col ${i < SAMPLE_PACKAGES.length - 1 ? "md:border-r" : ""}`}>
                <span className="label-mono text-muted-foreground">Package No. {i + 1}</span>
                <h3 className="mt-2 font-display text-2xl">{country.name}: {p.title}</h3>
                <div className="mt-4 label-mono flex justify-between text-muted-foreground">
                  <span>{p.days} days</span><span>{p.type}</span>
                </div>
                <div className="mt-6 font-display text-4xl">${p.price}</div>
                <div className="label-mono text-muted-foreground">per person</div>
                <button className="mt-6 border-2 border-ink px-4 py-2 label-mono hover:bg-ink hover:text-paper transition-colors self-start">View package →</button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Cities */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="flex items-end justify-between border-b-2 border-ink pb-2">
          <h2 className="font-display text-3xl">Cities</h2>
          <span className="label-mono text-muted-foreground">{cities.length || "Coming soon"}</span>
        </div>
        {cities.length === 0 ? (
          <p className="mt-6 text-muted-foreground">City guides for {country.name} are in the works.</p>
        ) : (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {cities.map((cityName: string, i: number) => (
              <Link
                key={cityName}
                href={`/destinations/${continent.slug}/${country.slug}/${citySlug(cityName)}`}
                className={`group border-b border-ink p-6 flex flex-col justify-between min-h-[180px] border-r ${i % 3 === 2 ? "lg:border-r-0" : ""}`}
              >
                <span className="label-mono text-muted-foreground">City No. {String(i + 1).padStart(2, "0")}</span>
                <div>
                  <div className="font-display text-3xl group-hover:text-accent">{cityName}</div>
                  <div className="mt-1 label-mono text-muted-foreground">Explore →</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </PageShell>
  );
}
