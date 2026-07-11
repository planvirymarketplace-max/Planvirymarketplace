export type Category = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  subcategories: string[];
};

export const categories: Category[] = [
  {
    slug: "concerts",
    name: "Concerts",
    tagline: "Live music, all genres",
    description:
      "Arenas, clubs, and everything between. Rock, hip-hop, country, Latin, K-pop, jazz, EDM.",
    image: "/images/hero-arena.jpg",
    subcategories: ["Rock & Alternative", "Hip-Hop & R&B", "Country", "Pop", "Latin", "Electronic", "Jazz & Blues", "Classical"],
  },
  {
    slug: "sports",
    name: "Sports",
    tagline: "Spectator & participatory",
    description:
      "NFL, NBA, MLB, NHL, MLS — plus rec leagues, marathons, and youth tournaments.",
    image: "/images/cat-sports.jpg",
    subcategories: ["NFL", "NBA", "MLB", "NHL", "MLS", "College Sports", "Motorsports", "Rec Leagues", "Marathons & 5Ks"],
  },
  {
    slug: "arts-theater-comedy",
    name: "Arts, Theater & Comedy",
    tagline: "Broadway, dance, opera, comedy",
    description:
      "Plays, musicals, ballet, standup, magic, circus. Broadway houses to black-box rooms.",
    image: "/images/cat-arts.jpg",
    subcategories: ["Broadway & Musicals", "Plays", "Dance & Ballet", "Opera", "Comedy Standup", "Magic & Circus", "Family Theater"],
  },
  {
    slug: "festivals",
    name: "Festivals, Fairs & Expos",
    tagline: "Multi-day, all-day, all-in",
    description:
      "Music festivals, comic-cons, county fairs, industry expos, cultural celebrations.",
    image: "/images/cat-festivals.jpg",
    subcategories: ["Music Festivals", "Cultural Festivals", "County & State Fairs", "Comic-Cons", "Trade Expos", "Seasonal Events"],
  },
  {
    slug: "classes",
    name: "Classes & Workshops",
    tagline: "Learn something new",
    description:
      "Cooking, art, coding, dance, fitness, photography — hands-on and small-group.",
    image: "/images/cat-classes.jpg",
    subcategories: ["Cooking", "Art & Pottery", "Dance", "Photography", "Coding", "Fitness", "Language", "Music Lessons"],
  },
  {
    slug: "community",
    name: "Community & Culture",
    tagline: "Local, together",
    description:
      "Block parties, heritage festivals, book clubs, LGBTQ+ meetups, neighborhood gatherings.",
    image: "/images/cat-festivals.jpg",
    subcategories: ["Block Parties", "Heritage Festivals", "Book Clubs", "LGBTQ+", "Neighborhood Meetups", "Volunteering"],
  },
];

export type EventItem = {
  id: string;
  title: string;
  subtitle: string;
  category: string; // slug
  subcategory: string;
  venue: string;
  city: string;
  state: string;
  date: string; // ISO
  priceFrom: number;
  image: string;
  featured?: boolean;
  source: "Commercial" | "Local";
  attendance: "Reserved Seating" | "General Admission" | "Registration Required";
  description: string;
};

const iso = (m: number, d: number, h = 20) =>
  new Date(Date.UTC(2026, m - 1, d, h, 0, 0)).toISOString();

export const events: EventItem[] = [
  {
    id: "sza-msg-2026",
    title: "SZA — SOS Deluxe Tour",
    subtitle: "with special guest Doechii",
    category: "concerts",
    subcategory: "Hip-Hop & R&B",
    venue: "Madison Square Garden",
    city: "New York",
    state: "NY",
    date: iso(9, 12, 20),
    priceFrom: 89,
    image: "/images/hero-arena.jpg",
    featured: true,
    source: "Commercial",
    attendance: "Reserved Seating",
    description:
      "The Grammy-winning artist returns to the Garden for two nights. Expect the full SOS setlist plus new material from the deluxe edition.",
  },
  {
    id: "lakers-celtics-finals",
    title: "Lakers vs. Celtics",
    subtitle: "Regular Season · Prime Time",
    category: "sports",
    subcategory: "NBA",
    venue: "Crypto.com Arena",
    city: "Los Angeles",
    state: "CA",
    date: iso(11, 3, 19),
    priceFrom: 120,
    image: "/images/cat-sports.jpg",
    featured: true,
    source: "Commercial",
    attendance: "Reserved Seating",
    description:
      "The league's oldest rivalry, on primetime. Full lower-bowl and courtside inventory available.",
  },
  {
    id: "hamilton-broadway",
    title: "Hamilton",
    subtitle: "Richard Rodgers Theatre",
    category: "arts-theater-comedy",
    subcategory: "Broadway & Musicals",
    venue: "Richard Rodgers Theatre",
    city: "New York",
    state: "NY",
    date: iso(10, 24, 19),
    priceFrom: 149,
    image: "/images/cat-arts.jpg",
    source: "Commercial",
    attendance: "Reserved Seating",
    description:
      "Lin-Manuel Miranda's landmark musical, still in continuous run on Broadway. Evening and matinee performances.",
  },
  {
    id: "coachella-w1",
    title: "Coachella 2026 — Weekend One",
    subtitle: "Three-day pass",
    category: "festivals",
    subcategory: "Music Festivals",
    venue: "Empire Polo Club",
    city: "Indio",
    state: "CA",
    date: iso(4, 10, 12),
    priceFrom: 549,
    image: "/images/cat-festivals.jpg",
    featured: true,
    source: "Commercial",
    attendance: "General Admission",
    description:
      "Six stages, three days, one desert. Headliners, art installations, and late-night sets. GA and VIP tiers.",
  },
  {
    id: "pottery-brooklyn",
    title: "Wheel-Throwing for Beginners",
    subtitle: "Four-week evening course",
    category: "classes",
    subcategory: "Art & Pottery",
    venue: "Greenpoint Ceramics Studio",
    city: "Brooklyn",
    state: "NY",
    date: iso(9, 8, 19),
    priceFrom: 285,
    image: "/images/cat-classes.jpg",
    source: "Local",
    attendance: "Registration Required",
    description:
      "Small-group class capped at eight. All clay, tools, and firings included. No experience needed.",
  },
  {
    id: "bushwick-block-party",
    title: "Bushwick Summer Block Party",
    subtitle: "Live music, food trucks, kids' zone",
    category: "community",
    subcategory: "Block Parties",
    venue: "Maria Hernandez Park",
    city: "Brooklyn",
    state: "NY",
    date: iso(8, 15, 14),
    priceFrom: 0,
    image: "/images/cat-festivals.jpg",
    source: "Local",
    attendance: "General Admission",
    description:
      "Free to the community. Local bands, twenty food vendors, dance workshops, and a family zone.",
  },
  {
    id: "warriors-nuggets",
    title: "Warriors vs. Nuggets",
    subtitle: "Western Conference matchup",
    category: "sports",
    subcategory: "NBA",
    venue: "Chase Center",
    city: "San Francisco",
    state: "CA",
    date: iso(12, 18, 19),
    priceFrom: 95,
    image: "/images/cat-sports.jpg",
    source: "Commercial",
    attendance: "Reserved Seating",
    description: "Two of the West's most-watched teams. Full arena inventory including club seats.",
  },
  {
    id: "sf-comedy-night",
    title: "Ali Wong — Live at the Fillmore",
    subtitle: "One night only",
    category: "arts-theater-comedy",
    subcategory: "Comedy Standup",
    venue: "The Fillmore",
    city: "San Francisco",
    state: "CA",
    date: iso(10, 5, 20),
    priceFrom: 75,
    image: "/images/cat-arts.jpg",
    source: "Commercial",
    attendance: "Reserved Seating",
    description: "New hour of material from the acclaimed comedian and actor.",
  },
  {
    id: "ramen-workshop",
    title: "Handmade Ramen Workshop",
    subtitle: "From noodle to bowl in one evening",
    category: "classes",
    subcategory: "Cooking",
    venue: "The Cook's Loft",
    city: "Austin",
    state: "TX",
    date: iso(9, 22, 18),
    priceFrom: 95,
    image: "/images/cat-classes.jpg",
    source: "Local",
    attendance: "Registration Required",
    description:
      "Learn to make fresh alkaline noodles, tare, and a proper tonkotsu-style broth. Dinner included.",
  },
  {
    id: "sxsw-2026",
    title: "SXSW 2026",
    subtitle: "Music, Film & Interactive Badge",
    category: "festivals",
    subcategory: "Trade Expos",
    venue: "Downtown Austin",
    city: "Austin",
    state: "TX",
    date: iso(3, 13, 10),
    priceFrom: 1195,
    image: "/images/cat-festivals.jpg",
    source: "Commercial",
    attendance: "Registration Required",
    description: "Ten days of premieres, keynotes, and showcases across downtown Austin.",
  },
  {
    id: "yankees-red-sox",
    title: "Yankees vs. Red Sox",
    subtitle: "AL East Rivalry Weekend",
    category: "sports",
    subcategory: "MLB",
    venue: "Yankee Stadium",
    city: "Bronx",
    state: "NY",
    date: iso(7, 4, 13),
    priceFrom: 65,
    image: "/images/cat-sports.jpg",
    source: "Commercial",
    attendance: "Reserved Seating",
    description: "The rivalry, on the Fourth. Full stadium inventory including bleachers and legends suite.",
  },
  {
    id: "lit-book-club",
    title: "East Bay Literary Society",
    subtitle: "Monthly meetup — this month: Piranesi",
    category: "community",
    subcategory: "Book Clubs",
    venue: "East Bay Booksellers",
    city: "Oakland",
    state: "CA",
    date: iso(9, 19, 19),
    priceFrom: 5,
    image: "/images/cat-classes.jpg",
    source: "Local",
    attendance: "Registration Required",
    description: "A close read of Susanna Clarke's Piranesi. Bring the book, wine provided.",
  },
];

export const featuredEvents = () => events.filter((e) => e.featured);
export const eventsByCategory = (slug: string) => events.filter((e) => e.category === slug);
export const getEvent = (id: string) => events.find((e) => e.id === id);
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);

export const formatDate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });
};
export const formatDay = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { day: "2-digit" });
};
export const formatMonth = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
};
export const formatTime = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
};
export const formatPrice = (n: number) => (n === 0 ? "Free" : `$${n}`);
