export interface TravelAsset {
  id: string;
  name: string;
  category: 'car' | 'hotel' | 'flight' | 'cruise' | 'package' | 'rental';
  location: string;
  price: number;
  rating?: number;
  image: string;
  badge?: string;
  description: string;
  details?: string[];
}

export interface TravelDestination {
  id: string;
  name: string;
  type: 'caribbean' | 'domestic' | 'international';
  stateOrCountry: string;
  image: string;
  rating: number;
  price: number; // Starting rate
  description: string;
  highlights: string[];
  bestTime: string;
  flightTime: string;
}

// 1. CARIBBEAN SEO PAGES (ALL 14 EXPLICITLY REQUESTED DESTINATIONS)
export const CARIBBEAN_DESTINATIONS: TravelDestination[] = [
  {
    id: 'dest-anguilla',
    name: 'Anguilla',
    type: 'caribbean',
    stateOrCountry: 'Caribbean',
    image: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    price: 1850,
    description: 'A tranquil sanctuary of pristine white-sand bays, world-class culinary hotspots, and ultra-private luxury villas.',
    highlights: ['Shoal Bay East', 'Meads Bay sunsets', 'Bespoke culinary beach tours'],
    bestTime: 'December to April',
    flightTime: '3.5 hrs from Miami'
  },
  {
    id: 'dest-antigua',
    name: 'Antigua',
    type: 'caribbean',
    stateOrCountry: 'Caribbean',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    price: 1620,
    description: 'Boasting 365 breathtaking beaches, historical Nelson\'s Dockyard, and private yacht regattas.',
    highlights: ['Half Moon Bay', 'Shirley Heights Sunday Sunset Party', 'Sailing charters'],
    bestTime: 'December to May',
    flightTime: '4 hrs from Charlotte'
  },
  {
    id: 'dest-aruba',
    name: 'Aruba',
    type: 'caribbean',
    stateOrCountry: 'Caribbean',
    image: 'https://images.unsplash.com/photo-1589136777351-fdc9c9400c7e?auto=format&fit=crop&w=600&q=80',
    rating: 4.7,
    price: 1290,
    description: 'Renowned for sunny breezes, unique Divi-divi trees, calm turquoise bays, and lively beachside dining.',
    highlights: ['Eagle Beach', 'Flamingo Island visits', 'Arikok National Park ATV'],
    bestTime: 'January to September',
    flightTime: '4.5 hrs from Atlanta'
  },
  {
    id: 'dest-barbados',
    name: 'Barbados',
    type: 'caribbean',
    stateOrCountry: 'Caribbean',
    image: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    price: 1950,
    description: 'An elegant blend of British colonial charm, premium rum distilleries, epic surfing swells, and lively luxury resorts.',
    highlights: ['Crane Beach', 'Harrison\'s Cave tram tour', 'Mount Gay Rum distillery'],
    bestTime: 'December to June',
    flightTime: '5 hrs from New York'
  },
  {
    id: 'dest-bermuda',
    name: 'Bermuda',
    type: 'caribbean',
    stateOrCountry: 'Atlantic / Caribbean',
    image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    price: 2100,
    description: 'Seductive pink-sand beaches, pastel cottages, premier ocean golf courses, and world-class sailing regattas.',
    highlights: ['Horseshoe Bay Pink Sands', 'St. George\'s historic fort', 'Royal Naval Dockyard shopping'],
    bestTime: 'May to October',
    flightTime: '2 hrs from Boston'
  },
  {
    id: 'dest-bimini',
    name: 'Bimini',
    type: 'caribbean',
    stateOrCountry: 'Bahamas Out Islands',
    image: 'https://images.unsplash.com/photo-1534008897995-27a23e859048?auto=format&fit=crop&w=600&q=80',
    rating: 4.6,
    price: 1150,
    description: 'The legendary gateway to the Bahamas, famous for wild shark encounters, Hemingway history, and deep-sea fishing.',
    highlights: ['Alice Town local docks', 'Sapodilla Shipwreck snorkel', 'Wild dolphin marine safaris'],
    bestTime: 'November to April',
    flightTime: '30 mins from Miami'
  },
  {
    id: 'dest-bonaire',
    name: 'Bonaire',
    type: 'caribbean',
    stateOrCountry: 'Dutch Caribbean',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    price: 1400,
    description: 'A shore-diver\'s dreamland featuring completely preserved marine parks, crystal visibility, and pink flamingo lakes.',
    highlights: ['Bari Reef diving', 'Washington Slagbaai National Park', 'Salt flats & slave monuments'],
    bestTime: 'May to October',
    flightTime: '5 hrs from Houston'
  },
  {
    id: 'dest-curacao',
    name: 'Curaçao',
    type: 'caribbean',
    stateOrCountry: 'Dutch Caribbean',
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    price: 1350,
    description: 'Famed for pastel-hued Willemstad storefronts, stunning reef diving, and rich Afro-Caribbean-Dutch culture.',
    highlights: ['Handelskade harbor walk', 'Playa Kenepa Grandi', 'Blue Room sea caves'],
    bestTime: 'December to April',
    flightTime: '4 hrs from Miami'
  },
  {
    id: 'dest-eleuthera',
    name: 'Eleuthera & Harbour Islands',
    type: 'caribbean',
    stateOrCountry: 'Bahamas',
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    price: 2250,
    description: 'Ultra-exclusive pastel sands, boutique estate homes, local organic farmsteads, and high-society celebrity hideaways.',
    highlights: ['Glass Window Bridge view', 'Dunmore Town pink sand beach', 'Golf cart village tours'],
    bestTime: 'November to May',
    flightTime: '1 hr from Fort Lauderdale'
  },
  {
    id: 'dest-exuma',
    name: 'Great Exuma Island',
    type: 'caribbean',
    stateOrCountry: 'Bahamas Out Islands',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    price: 2300,
    description: 'Sapphire seas where sandbars stretch into the horizon, featuring the legendary swimming pigs and private luxury cays.',
    highlights: ['Big Major Cay swimming pigs', 'Thunderball Grotto snorkel', 'Mile-long white sandbar'],
    bestTime: 'December to April',
    flightTime: '1.5 hrs from Miami'
  },
  {
    id: 'dest-grandbahama',
    name: 'Grand Bahama Island',
    type: 'caribbean',
    stateOrCountry: 'Bahamas',
    image: 'https://images.unsplash.com/photo-1545167622-3a6ac756afa4?auto=format&fit=crop&w=600&q=80',
    rating: 4.5,
    price: 1100,
    description: 'An expansive eco-paradise featuring underwater limestone cavern systems, quiet beaches, and duty-free ports.',
    highlights: ['Lucayan National Park kayaking', 'Gold Rock Beach', 'Port Lucaya Marketplace'],
    bestTime: 'December to May',
    flightTime: '45 mins from Miami'
  },
  {
    id: 'dest-cayman',
    name: 'Grand Cayman',
    type: 'caribbean',
    stateOrCountry: 'Cayman Islands',
    image: 'https://images.unsplash.com/photo-1586500036706-41963de24d8b?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    price: 1900,
    description: 'Renowned for Seven Mile Beach, stingray interaction sandbars, gourmet fine dining, and vertical wall diving.',
    highlights: ['Stingray City', 'Seven Mile Beach resorts', 'Bloody Bay Wall dive day'],
    bestTime: 'December to April',
    flightTime: '3 hrs from Atlanta'
  },
  {
    id: 'dest-grenada',
    name: 'Grenada',
    type: 'caribbean',
    stateOrCountry: 'Caribbean',
    image: 'https://images.unsplash.com/photo-1520116467521-a3b91091224a?auto=format&fit=crop&w=600&q=80',
    rating: 4.7,
    price: 1450,
    description: 'The "Spice Isle" of the Caribbean, covered in fragrant organic nutmeg plantations, cascades, and white bays.',
    highlights: ['Grand Anse Beach', 'Underwater Sculpture Park', 'Spiceland local markets'],
    bestTime: 'January to May',
    flightTime: '4.5 hrs from New York'
  },
  {
    id: 'dest-jamaica',
    name: 'Jamaica',
    type: 'caribbean',
    stateOrCountry: 'Caribbean',
    image: 'https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    price: 1500,
    description: 'The heartbeat of the Antilles. Jungle lagoons, famous reggae music, Blue Mountain coffee farms, and cascading waterfalls.',
    highlights: ['Dunn\'s River Falls climb', 'Negril Seven Mile Beach lounge', 'Blue Lagoon bamboo rafting'],
    bestTime: 'December to April',
    flightTime: '3.5 hrs from Atlanta'
  }
];

// 2. CITY AND STATE SEO PAGES (DOMESTIC FAVORITES)
export const DOMESTIC_DESTINATIONS: TravelDestination[] = [
  {
    id: 'dest-savannah',
    name: 'Savannah',
    type: 'domestic',
    stateOrCountry: 'Georgia',
    image: 'https://images.unsplash.com/photo-1572985165243-78000575d506?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    price: 850,
    description: 'A historic jewel draped in Spanish moss, showcasing cobblestone squares, stunning Southern mansions, and a legendary food scene.',
    highlights: ['Forsyth Park Walk', 'River Street Shops', 'Historic Ghost Mansion tours'],
    bestTime: 'March to June',
    flightTime: '1.5 hrs from Atlanta'
  },
  {
    id: 'dest-miami',
    name: 'Miami',
    type: 'domestic',
    stateOrCountry: 'Florida',
    image: 'https://images.unsplash.com/photo-1514214246283-d427a95c5d2f?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    price: 1200,
    description: 'An international playground featuring pristine sandy stretches, vibrant Art Deco architecture, and world-class luxury nightclubs.',
    highlights: ['South Beach Art Deco Tour', 'Wynwood Walls', 'Key Biscayne sailing'],
    bestTime: 'November to April',
    flightTime: '2 hrs from New York'
  },
  {
    id: 'dest-charleston',
    name: 'Charleston',
    type: 'domestic',
    stateOrCountry: 'South Carolina',
    image: 'https://images.unsplash.com/photo-1551101882-b9dc565074ff?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    price: 950,
    description: 'A Southern masterpiece of pastel houses, horse-drawn carriages, and cobblestone pathways overlooking the harbor.',
    highlights: ['The Battery & Rainbow Row', 'Historic Charleston Market', 'Sullivan\'s Island beach'],
    bestTime: 'April to June',
    flightTime: '1 hr from Charlotte'
  },
  {
    id: 'dest-aspen',
    name: 'Aspen',
    type: 'domestic',
    stateOrCountry: 'Colorado',
    image: 'https://images.unsplash.com/photo-1611001716885-b3402558a62b?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    price: 2100,
    description: 'The peak of Rocky Mountain luxury, hosting elite ski terrain, high-end design boutiques, and Michelin-starred alpine dining.',
    highlights: ['Maroon Bells hikes', 'Aspen Mountain skiing', 'Exclusive après-ski clubs'],
    bestTime: 'December to March',
    flightTime: '2 hrs from Denver'
  },
  {
    id: 'dest-nyc',
    name: 'New York City',
    type: 'domestic',
    stateOrCountry: 'New York',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    price: 1400,
    description: 'The energetic global capital of theater, design, shopping, and iconic skyscrapers bordering Central Park.',
    highlights: ['Broadway Premieres', 'Central Park bicycle tours', 'Fifth Avenue private styling'],
    bestTime: 'September to November',
    flightTime: 'Direct flights globally'
  },
  {
    id: 'dest-vegas',
    name: 'Las Vegas',
    type: 'domestic',
    stateOrCountry: 'Nevada',
    image: 'https://images.unsplash.com/photo-1522083165195-342750297f05?auto=format&fit=crop&w=600&q=80',
    rating: 4.7,
    price: 1100,
    description: 'An oasis of spectacular shows, grand casinos, high-roller culinary lounges, and luxury desert retreats.',
    highlights: ['Fountain of Bellagio show', 'Grand Canyon helicopter flyover', 'Strip nightlife access'],
    bestTime: 'September to November',
    flightTime: '1 hr from Los Angeles'
  },
  {
    id: 'dest-honolulu',
    name: 'Honolulu',
    type: 'domestic',
    stateOrCountry: 'Hawaii',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    price: 2400,
    description: 'Tropical excellence combined with cosmopolitan shopping, featuring iconic Waikiki Beach and active volcanic peaks.',
    highlights: ['Waikiki catamaran sails', 'Diamond Head volcano hike', 'Traditional Luau banquets'],
    bestTime: 'April to September',
    flightTime: '5.5 hrs from San Francisco'
  },
  {
    id: 'dest-la',
    name: 'Los Angeles',
    type: 'domestic',
    stateOrCountry: 'California',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    price: 1300,
    description: 'The entertainment capital of the world, bordered by coastal cliffs, designer boutiques, and sunset boulevards.',
    highlights: ['Malibu coastal drive', 'Getty Center art walks', 'Rodeo Drive personal shopping'],
    bestTime: 'March to November',
    flightTime: 'Direct flights globally'
  }
];

// 3. INTERNATIONAL FAVORITES
export const INTERNATIONAL_DESTINATIONS: TravelDestination[] = [
  {
    id: 'dest-paris',
    name: 'Paris',
    type: 'international',
    stateOrCountry: 'France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    price: 2500,
    description: 'The City of Light, offering haute couture fashion houses, the Louvre museum, and Michelin-starred gastronomy along the Seine.',
    highlights: ['Private Eiffel Tower sunset deck', 'Louvre Curator guided tour', 'Seine luxury dinner cruise'],
    bestTime: 'April to October',
    flightTime: '7.5 hrs from NYC'
  },
  {
    id: 'dest-tokyo',
    name: 'Tokyo',
    type: 'international',
    stateOrCountry: 'Japan',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    price: 2700,
    description: 'A futuristic megalopolis blended with historic Shinto temples, incredible neon streets, and world-best culinary lanes.',
    highlights: ['Shibuya Crossing views', 'Tsukiji Outer Market food tour', 'Kyoto high-speed rail daytrip'],
    bestTime: 'March to May',
    flightTime: '11 hrs from LAX'
  },
  {
    id: 'dest-london',
    name: 'London',
    type: 'international',
    stateOrCountry: 'United Kingdom',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ca1ad?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    price: 2100,
    description: 'A historic powerhouse of royal palaces, legendary theater shows, beautiful parks, and elite Mayfair private dining.',
    highlights: ['West End VIP tickets', 'Tower of London exhibition', 'High tea at The Ritz London'],
    bestTime: 'May to September',
    flightTime: '6 hrs from Boston'
  },
  {
    id: 'dest-rome',
    name: 'Rome',
    type: 'international',
    stateOrCountry: 'Italy',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    price: 2300,
    description: 'The Eternal City, hosting magnificent ancient ruins like the Colosseum, the Vatican, and bustling cobblestone piazzas.',
    highlights: ['Colosseum underground access', 'Vatican Museums early entry', 'Trastevere gastronomy tour'],
    bestTime: 'April to October',
    flightTime: '8 hrs from NYC'
  },
  {
    id: 'dest-como',
    name: 'Lake Como',
    type: 'international',
    stateOrCountry: 'Italy',
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    price: 2900,
    description: 'An elegant alpine lakeside retreat with majestic mountain views, colorful villas, and private speedboats.',
    highlights: ['Villa d\'Este gardens', 'Bellagio wooden speedboat tour', 'Scenic helicopter flight'],
    bestTime: 'May to September',
    flightTime: '1 hr from Milan Airport'
  },
  {
    id: 'dest-maldives',
    name: 'The Maldives',
    type: 'international',
    stateOrCountry: 'Indian Ocean',
    image: 'https://images.unsplash.com/photo-1514214246283-d427a95c5d2f?auto=format&fit=crop&w=600&q=80',
    rating: 5.0,
    price: 3500,
    description: 'The ultimate luxury getaway featuring private overwater villas, bioluminescent beaches, and pristine coral reef snorkels.',
    highlights: ['Private overwater villa pool', 'Underwater restaurant dining', 'Manta ray snorkel safari'],
    bestTime: 'November to April',
    flightTime: '14 hrs via Doha'
  }
];
