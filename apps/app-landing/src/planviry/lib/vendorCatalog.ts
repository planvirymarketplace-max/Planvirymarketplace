import { MARKETPLACE_ITEMS, SUB_CATEGORIES } from '../data';
import { CITIES } from '../data/cities';
import { CartItem, CategoryLens } from '../types';

/* --------------------------- image pools by category --------------------------- */

const CATEGORY_IMAGES: Record<CategoryLens, string[]> = {
  services: [
    'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1530023367847-a683933f4172?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=800&q=80',
  ],
  plan: [
    'https://images.unsplash.com/photo-1434030216411-0bb7c3f3041d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80',
  ],
  'things-to-do': [
    'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?auto=format&fit=crop&w=800&q=80',
  ],
  'food-drink': [
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
  ],
  'live-shows': [
    'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80',
  ],
  travel: [
    'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80',
  ],
  party: [
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
  ],
  spaces: [
    'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=800&q=80',
  ],
  vendors: [
    'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
  ],
  compose: [
    'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80',
  ],
  concierge: [
    'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80',
  ],
};

/* --------------------------- name + description pools --------------------------- */

const PREFIXES = [
  'Premier', 'Elite', 'Bespoke', 'Signature', 'Heritage', 'Luxe', 'Golden',
  'Royal', 'Prestige', 'Grand', 'Artisan', 'Classic', 'Modern', 'Vintage',
  'Opulent', 'Refined', 'Stellar', 'Summit', 'Crown', 'Diamond',
];

const SUFFIXES = [
  'Group', 'Collective', 'Studio', 'Co.', 'Partners', 'Atelier',
  'Productions', 'Designs', 'Services', 'Events', 'House', 'Bureau',
];

const DESCRIPTIONS: Record<CategoryLens, string[]> = {
  services: [
    'Full-service occasion planning with white-glove concierge support from concept to execution.',
    'Bespoke coordination for milestone celebrations, corporate galas, and intimate gatherings.',
    'Experienced planners who handle every detail — logistics, vendors, timelines, and day-of coordination.',
    'Luxury event design and production tailored to your unique vision and aesthetic.',
  ],
  plan: [
    'Structured planning tools and collaborative workflows to keep your occasion on track.',
    'Milestone tracking, budget management, and vendor coordination in one elegant dashboard.',
    'Expert logistics coordination ensuring every moment of your occasion flows seamlessly.',
    'Comprehensive occasion planning resources with proven templates and expert guidance.',
  ],
  'things-to-do': [
    'Curated local experiences and group activities for memorable occasions and celebrations.',
    'Hand-picked attractions and adventures perfect for groups of all sizes.',
    'Unique local experiences that showcase the best of your destination.',
    'Interactive activities and tours designed for celebration groups.',
  ],
  'food-drink': [
    'Premium catering and dining experiences crafted by award-winning culinary teams.',
    'Farm-to-table menus, custom bars, and bespoke dining for any occasion scale.',
    'Exquisite cuisine and beverage service tailored to your taste and dietary needs.',
    'Full-service restaurant and catering partnerships for private events and celebrations.',
  ],
  'live-shows': [
    'Premium seating and VIP access to concerts, theater, and live performances.',
    'Group booking specialists for the best live entertainment in your area.',
    'Exclusive ticket packages with premium views and hospitality add-ons.',
    'Curated live show experiences from Broadway to local indie scenes.',
  ],
  travel: [
    'Luxury accommodations, flights, and ground transport coordinated end-to-end.',
    'Bespoke travel planning for groups, from villa rentals to private charters.',
    'Premium hotel partnerships with exclusive rates and VIP amenities.',
    'Full-service travel concierge covering flights, stays, and local transport.',
  ],
  party: [
    'Complete party packages with decor, entertainment, and coordination included.',
    'Specialty celebration services for every milestone and theme imaginable.',
    'Turnkey party planning from intimate dinners to large-scale celebrations.',
    'Themed party production with professional staff, rentals, and design.',
  ],
  spaces: [
    'Stunning venues and spaces for every occasion, from rooftops to grand ballrooms.',
    'Unique event spaces with character — historic estates, modern lofts, waterfront decks.',
    'Premium venue rentals with full amenities, parking, and flexible layouts.',
    'Architecturally distinctive spaces that elevate any celebration or production.',
  ],
  vendors: [
    'Vetted local professionals delivering exceptional service for your occasion.',
    'Experienced specialists with proven track records and verified credentials.',
    'Top-tier vendors providing equipment, staffing, and expertise for events.',
    'Trusted partners for every event need — from audio-visual to floral design.',
  ],
  compose: [
    'A fully composed event — venue, travel, vendors, access, and cover in one score.',
    'One instrument replacing eleven vendors, four spreadsheets, and two agencies.',
    'A sealed composition: every strata negotiated, priced, insured, and conducted.',
    'Your event as a single unbreakable score — from ground to cover.',
  ],
  concierge: [
    'White-glove planners and coordinators delivering exceptional concierge service.',
    'Full-service coordinators, wedding planners, and officiating professionals.',
    'Dedicated concierge handling every detail with precision and care.',
    'Premium planning expertise for hosts and attendees alike.',
  ],
};

const BADGES = [
  'Preferred Vendor', 'Top Rated', 'Verified Partner', 'Premium',
  'Featured', 'Elite', 'Award Winner', undefined, undefined, undefined,
];

/* --------------------------- helpers --------------------------- */

function seedRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function pick<T>(arr: T[], rng: () => number): T {
  return arr[Math.floor(rng() * arr.length)];
}

function genPhone(rng: () => number): string {
  const n = (min: number, max: number) => Math.floor(rng() * (max - min + 1)) + min;
  return `(${n(200, 989)}) ${n(200, 989)}-${n(1000, 9999)}`;
}

function genAddress(city: { city: string; state: string; zip: string }, rng: () => number): string {
  const num = Math.floor(rng() * 9990) + 10;
  const streets = ['Main St', 'Park Ave', 'Oak Blvd', 'River Dr', 'Hill Rd', 'King St', 'Union Ave', 'Market St'];
  return `${num} ${pick(streets, rng)}, ${city.city}, ${city.state} ${city.zip}`;
}

/* --------------------------- generator --------------------------- */

const CITY_POOL = CITIES.map((c) => ({
  city: c.city,
  state: c.state,
  zip: c.zip,
}));

function generateForCategory(
  category: CategoryLens,
  subs: string[],
  targetCount: number,
  seed: number,
): CartItem[] {
  const rng = seedRandom(seed);
  const images = CATEGORY_IMAGES[category];
  const descs = DESCRIPTIONS[category];
  const items: CartItem[] = [];
  let counter = 0;

  while (items.length < targetCount) {
    for (const sub of subs) {
      if (items.length >= targetCount) break;
      const city = pick(CITY_POOL, rng);
      const claimed = rng() > 0.35; // ~65% claimed, ~35% unclaimed
      const prefix = pick(PREFIXES, rng);
      const suffix = pick(SUFFIXES, rng);
      const title = `${prefix} ${sub} ${suffix}`;
      const id = `gen-${category}-${counter++}`;
      const price = Math.floor(rng() * 9000) + 200;

      items.push({
        id,
        title,
        category,
        subcategory: sub,
        price,
        location: `${city.city}, ${city.state}`,
        image: images[counter % images.length],
        badge: pick(BADGES, rng),
        rating: Math.round((rng() * 1.5 + 3.5) * 10) / 10,
        vendorName: title,
        description: pick(descs, rng),
        claimed,
        phone: genPhone(rng),
        address: genAddress(city, rng),
      });
    }
  }
  return items;
}

/* --------------------------- build full catalog --------------------------- */

// Enrich existing items with claimed/phone/address if missing
const ENRICHED_EXISTING: CartItem[] = MARKETPLACE_ITEMS.map((item, idx) => {
  const rng = seedRandom(1000 + idx);
  const city = pick(CITY_POOL, rng);
  return {
    ...item,
    claimed: item.claimed ?? (idx % 4 !== 0), // 75% claimed, 25% unclaimed
    phone: item.phone ?? genPhone(rng),
    address: item.address ?? genAddress(city, rng),
  };
});

// Generate enough items so each category has at least 18 vendor cards
const MIN_PER_CATEGORY = 18;
const GENERATED: CartItem[] = [];

let seedCounter = 2000;
(Object.keys(SUB_CATEGORIES) as CategoryLens[]).forEach((cat) => {
  const subs = SUB_CATEGORIES[cat] || [];
  const existingCount = ENRICHED_EXISTING.filter((i) => i.category === cat).length;
  const needed = Math.max(0, MIN_PER_CATEGORY - existingCount);
  if (needed > 0 && subs.length > 0) {
    GENERATED.push(...generateForCategory(cat, subs, needed, seedCounter));
  }
  seedCounter += 100;
});

export const ALL_MARKETPLACE_ITEMS: CartItem[] = [...ENRICHED_EXISTING, ...GENERATED];

// Lookup helper that works for any vendor ID (existing or generated)
export function findVendorById(id: string): CartItem | undefined {
  return ALL_MARKETPLACE_ITEMS.find((m) => m.id === id);
}
