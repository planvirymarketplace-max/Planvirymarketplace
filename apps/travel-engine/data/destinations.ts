export type Country = {
  name: string;
  slug: string;
  cities?: string[];
};

export type Continent = {
  name: string;
  slug: string;
  blurb: string;
  countries: Country[];
};

const c = (name: string, cities: string[] = []): Country => ({
  name,
  slug: name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, ""),
  cities,
});

export const CONTINENTS: Continent[] = [
  {
    name: "Europe",
    slug: "europe",
    blurb:
      "Cathedrals, coffee houses, cold mornings on the platform. A continent of overlapping empires and short train rides.",
    countries: [
      c("Albania"), c("Andorra"), c("Armenia"), c("Austria", ["Vienna", "Salzburg"]),
      c("Azerbaijan"), c("Belarus"), c("Belgium", ["Brussels", "Bruges"]),
      c("Bosnia & Hercegovina"), c("Bulgaria"), c("Croatia", ["Zagreb", "Split"]),
      c("Cyprus"), c("Czechia", ["Prague"]), c("Denmark", ["Copenhagen"]),
      c("England", ["London", "Manchester"]), c("Estonia"), c("Finland", ["Helsinki"]),
      c("France", ["Paris", "Lyon", "Nice"]), c("Georgia"),
      c("Germany", ["Berlin", "Munich", "Hamburg"]), c("Greece", ["Athens", "Santorini"]),
      c("Hungary", ["Budapest", "Debrecen", "Szeged", "Pécs", "Eger", "Sopron"]),
      c("Iceland", ["Reykjavík"]), c("Ireland", ["Dublin"]),
      c("Italy", ["Rome", "Florence", "Venice", "Milan"]), c("Kosovo"),
      c("Latvia"), c("Liechtenstein"), c("Lithuania"), c("Luxembourg"),
      c("Malta"), c("Moldova"), c("Montenegro"),
      c("Netherlands", ["Amsterdam"]), c("North Macedonia"), c("Norway", ["Oslo", "Bergen"]),
      c("Poland", ["Warsaw", "Kraków"]), c("Portugal", ["Lisbon", "Porto"]),
      c("Romania"), c("Russia", ["Moscow", "St Petersburg"]), c("Scotland", ["Edinburgh"]),
      c("Serbia"), c("Slovakia"), c("Slovenia"),
      c("Spain", ["Madrid", "Barcelona", "Seville"]), c("Sweden", ["Stockholm"]),
      c("Switzerland", ["Zurich", "Geneva"]), c("Turkey", ["Istanbul"]),
      c("Ukraine"), c("Wales", ["Cardiff"]),
    ],
  },
  {
    name: "Africa",
    slug: "africa",
    blurb: "Sand dunes, savannah, market towns. A continent that resists the single-image summary.",
    countries: [
      c("Algeria"), c("Botswana"), c("Cabo Verde"), c("Congo (Democratic Republic)"),
      c("Congo (Republic)"), c("Côte d'Ivoire"), c("Egypt", ["Cairo", "Luxor"]),
      c("Equatorial Guinea"), c("Ethiopia"), c("Gabon"), c("Ghana"),
      c("Kenya", ["Nairobi"]), c("Madagascar"), c("Malawi"), c("Mauritius"),
      c("Morocco", ["Marrakesh", "Fes", "Casablanca"]), c("Mozambique"), c("Nigeria"),
      c("Rwanda"), c("São Tomé & Príncipe"), c("Senegal"), c("Seychelles"),
      c("Sierra Leone"), c("Sudan"), c("Tanzania", ["Zanzibar"]), c("The Gambia"),
      c("Togo"), c("Tunisia"), c("Uganda"), c("Zambia"), c("Zimbabwe"),
    ],
  },
  {
    name: "Asia",
    slug: "asia",
    blurb: "The largest continent, and the one most flattened by generalisations.",
    countries: [
      c("Afghanistan"), c("Bangladesh"), c("Bhutan"),
      c("Cambodia", ["Phnom Penh", "Siem Reap"]), c("China", ["Beijing", "Shanghai"]),
      c("India", ["Delhi", "Mumbai", "Jaipur"]),
      c("Indonesia", ["Bali", "Jakarta"]), c("Japan", ["Tokyo", "Kyoto", "Osaka"]),
      c("Kazakhstan"), c("Kyrgyzstan"), c("Laos"),
      c("Malaysia", ["Kuala Lumpur"]), c("Maldives"), c("Mongolia"),
      c("Myanmar (Burma)"), c("Nepal", ["Kathmandu"]), c("North Korea"),
      c("Pakistan"), c("Philippines", ["Manila"]),
      c("South Korea", ["Seoul"]), c("Sri Lanka"),
      c("Tajikistan"), c("Thailand", ["Bangkok", "Chiang Mai"]),
    ],
  },
  {
    name: "North America",
    slug: "north-america",
    blurb: "Vast interstates, quiet diners, snowfields the size of countries.",
    countries: [
      c("Canada", ["Toronto", "Montreal", "Vancouver"]),
      c("Mexico", ["Mexico City", "Oaxaca"]),
      c("USA", ["New York", "Los Angeles", "Chicago", "New Orleans"]),
    ],
  },
  {
    name: "Central America",
    slug: "central-america",
    blurb: "A narrow isthmus with two coastlines, cloud forests and colonial squares.",
    countries: [
      c("Belize"), c("Costa Rica", ["San José"]), c("El Salvador"),
      c("Guatemala", ["Antigua"]), c("Honduras"), c("Nicaragua"), c("Panama"),
    ],
  },
  {
    name: "Caribbean",
    slug: "caribbean",
    blurb: "Warm water, colonial ports, and reggae drifting from open windows.",
    countries: [
      c("Bahamas"), c("British Virgin Islands"), c("Cayman Islands"),
      c("Cuba", ["Havana"]), c("Grenada"), c("Guadeloupe"), c("Haiti"),
      c("Jamaica", ["Kingston"]), c("Martinique"), c("Puerto Rico", ["San Juan"]),
      c("St Kitts & Nevis"), c("St Vincent & Grenadines"), c("US Virgin Islands"),
    ],
  },
  {
    name: "South America",
    slug: "south-america",
    blurb: "The Andes to the Amazon. Long buses, longer coastlines.",
    countries: [
      c("Argentina", ["Buenos Aires"]), c("Bolivia", ["La Paz"]),
      c("Brazil", ["Rio de Janeiro", "São Paulo"]), c("Chile", ["Santiago"]),
      c("Colombia", ["Bogotá", "Cartagena"]), c("Ecuador", ["Quito"]),
      c("Paraguay"), c("Peru", ["Lima", "Cusco"]),
      c("Uruguay"), c("Venezuela"),
    ],
  },
  {
    name: "Oceania",
    slug: "oceania",
    blurb: "A scatter of islands and two continents' worth of sky.",
    countries: [
      c("Australia", ["Sydney", "Melbourne"]), c("Cook Islands"), c("Fiji"),
      c("French Polynesia", ["Papeete"]), c("New Caledonia"),
      c("New Zealand", ["Auckland", "Queenstown"]), c("Palau"),
      c("Papua New Guinea"), c("Samoa"), c("Vanuatu"),
    ],
  },
  {
    name: "Middle East",
    slug: "middle-east",
    blurb: "Ancient trade routes, contemporary skylines, desert crossings.",
    countries: [
      c("Bahrain"), c("Iran"), c("Israel", ["Tel Aviv", "Jerusalem"]),
      c("Jordan", ["Amman", "Petra"]), c("Kuwait"),
      c("Lebanon", ["Beirut"]), c("Oman"), c("Palestinian Territories"),
      c("Qatar", ["Doha"]), c("Saudi Arabia"),
      c("United Arab Emirates", ["Dubai", "Abu Dhabi"]),
    ],
  },
];

export const getContinent = (slug: string) =>
  CONTINENTS.find((k) => k.slug === slug);

export const getCountry = (continentSlug: string, countrySlug: string) => {
  const cont = getContinent(continentSlug);
  const country = cont?.countries.find((k) => k.slug === countrySlug);
  return country ? { continent: cont!, country } : null;
};

const citySlug = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const getCity = (
  continentSlug: string,
  countrySlug: string,
  citySlugParam: string,
) => {
  const found = getCountry(continentSlug, countrySlug);
  if (!found) return null;
  const cityName = found.country.cities?.find((n) => citySlug(n) === citySlugParam);
  if (!cityName) return null;
  return { ...found, city: { name: cityName, slug: citySlugParam } };
};

export type SearchHit =
  | { kind: "continent"; label: string; sub: string; href: string }
  | { kind: "country"; label: string; sub: string; href: string }
  | { kind: "city"; label: string; sub: string; href: string };

export const ALL_HITS: SearchHit[] = CONTINENTS.flatMap((cont) => [
  {
    kind: "continent" as const,
    label: cont.name,
    sub: `${cont.countries.length} countries`,
    href: `/destinations/${cont.slug}`,
  },
  ...cont.countries.flatMap<SearchHit>((country) => [
    {
      kind: "country" as const,
      label: country.name,
      sub: cont.name,
      href: `/destinations/${cont.slug}/${country.slug}`,
    },
    ...(country.cities ?? []).map<SearchHit>((cityName) => ({
      kind: "city" as const,
      label: cityName,
      sub: `${country.name} · ${cont.name}`,
      href: `/destinations/${cont.slug}/${country.slug}/${citySlug(cityName)}`,
    })),
  ]),
]);

export { citySlug };
