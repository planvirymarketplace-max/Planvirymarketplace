import { notFound } from "next/navigation";
import { getCity } from "@/data/destinations";
import { DestinationSearch } from "@/components/DestinationSearch";
import { Breadcrumbs, PageShell } from "@/components/SiteChrome";

interface CityPageProps {
  params: { continent: string; country: string; city: string };
}

const TABS = ["Overview", "Things to Do", "Packages", "Hotels", "Getting Around", "Day Trips"] as const;

export async function generateMetadata({ params }: CityPageProps) {
  const r = getCity(params.continent, params.country, params.city);
  if (!r) {
    return {
      title: "Not found — Meridian",
      robots: "noindex",
    };
  }
  const title = `${r.city.name} Travel Guide | Top attractions, tours & packages`;
  return {
    title,
    description: `A city guide to ${r.city.name}, ${r.country.name}.`,
    openGraph: {
      title,
      url: `/destinations/${params.continent}/${params.country}/${params.city}`,
    },
    alternates: {
      canonical: `/destinations/${params.continent}/${params.country}/${params.city}`,
    },
  };
}

export default function CityPage({ params }: CityPageProps) {
  const r = getCity(params.continent, params.country, params.city);
  if (!r) notFound();

  const { continent, country, city } = r;

  return (
    <PageShell>
      <section className="border-b-4 border-ink">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <Breadcrumbs items={[
            { label: "Home", to: "/" },
            { label: "Destinations", to: "/destinations" },
            { label: continent.name, to: `/destinations/${continent.slug}` },
            { label: country.name, to: `/destinations/${continent.slug}/${country.slug}` },
            { label: city.name },
          ]} />
          <div className="mt-6 flex items-end justify-between gap-6 flex-wrap">
            <h1 className="font-display text-6xl md:text-8xl tracking-tight">{city.name}</h1>
            <span className="label-mono text-muted-foreground">{country.name} · {continent.name}</span>
          </div>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            The full city guide — attractions, packages, hotels and the streets in between.
          </p>
          <div className="mt-8 max-w-2xl">
            <DestinationSearch placeholder={`Search attractions in ${city.name}…`} />
          </div>
        </div>
      </section>

      <nav className="border-b-2 border-ink bg-paper sticky top-0 z-20 overflow-x-auto">
        <div className="mx-auto max-w-7xl px-6 py-3 flex gap-6 label-mono whitespace-nowrap">
          {TABS.map((t, i) => (
            <a key={t} href={`#${t.toLowerCase().replace(/\s+/g, "-")}`} className={i === 0 ? "text-accent" : "text-muted-foreground hover:text-ink"}>
              {t}
            </a>
          ))}
        </div>
      </nav>

      <section id="overview" className="mx-auto max-w-4xl px-6 py-14">
        <div className="label-mono text-muted-foreground">Overview</div>
        <p className="mt-3 font-display text-3xl md:text-4xl leading-snug">
          A shallow-page draft for <span className="italic">{city.name}</span>. The full editorial guide,
          attraction filter, hotel finder and package board will land here in the next issue.
        </p>
        <p className="mt-6 text-muted-foreground">
          {city.name} sits in {country.name}, part of the {continent.name} atlas. This route is wired,
          searchable and printable — content to follow.
        </p>
      </section>
    </PageShell>
  );
}
