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

// 4. PRE-CONFIGURED DEALS & ASSETS
export const DIRECT_HOTELS: TravelAsset[] = [
  {
    id: 'hotel-villas-anguilla',
    name: 'Cap Juluca, A Belmond Hotel',
    category: 'hotel',
    location: 'Meads Bay, Anguilla',
    price: 950,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80',
    badge: 'Luxury Oceanfront',
    description: 'A sanctuary on the crescent-shaped cove of Meads Bay. Pure luxury white sand beach access, private pools, and premier beachside dining.',
    details: ['Private pool access', 'Daily complimentary champagne breakfast', 'Dedicated villa butler service']
  },
  {
    id: 'hotel-jumby-bay',
    name: 'Jumby Bay Island Oetker Collection',
    category: 'hotel',
    location: 'Antigua',
    price: 1800,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=600&q=80',
    badge: 'Private Island Resort',
    description: 'An elegant private island estate offering pristine sand corridors, beautiful infinity pools, and five-star spa treatments.',
    details: ['Private island access', 'All-inclusive dining by Michelin chefs', 'Yacht transfers included']
  },
  {
    id: 'hotel-st-regis-bermuda',
    name: 'The St. Regis Bermuda Resort',
    category: 'hotel',
    location: 'St. George\'s, Bermuda',
    price: 820,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
    badge: 'Historic Luxury',
    description: 'Nestled on the pink-sands of Fort St. Catherine, this world-class resort features custom gold golf courses and historic views.',
    details: ['Oceanfront gold course access', 'Signature St. Regis Butler Service', 'Heated private cabana pool']
  },
  {
    id: 'hotel-ritz-como',
    name: 'Villa d\'Este Prestige Grand',
    category: 'hotel',
    location: 'Lake Como, Italy',
    price: 1450,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=600&q=80',
    badge: 'Elite Lakeside Historic',
    description: 'A masterpiece of architecture and botanical beauty. Home to royalty for centuries, featuring a unique floating pool on Como.',
    details: ['Floating lake pool access', 'Exclusive vintage boat tour', 'Fine-dining terrace reservation']
  },
  {
    id: 'hotel-savannah-perry',
    name: 'Perry Lane Hotel, A Luxury Collection',
    category: 'hotel',
    location: 'Savannah, GA',
    price: 450,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80',
    badge: 'Rooftop Lounge Fav',
    description: 'The epitome of Southern charm and design, located in the absolute heart of Savannah’s historic downtown district.',
    details: ['Access to Peregrin Rooftop lounge', 'Complimentary local driver transport', 'Savannah art collection tour']
  }
];

export const DIRECT_FLIGHTS: TravelAsset[] = [
  {
    id: 'flight-nyc-anguilla',
    name: 'New York (JFK) to Anguilla (AXA) First Class',
    category: 'flight',
    location: 'Anguilla (AXA)',
    price: 850,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80',
    badge: 'Top International Flight',
    description: 'Enjoy premium first-class suites with fully flat beds, gourmet meals, and airport lounge access.',
    details: ['Lie-flat leather suite', 'Prioritized terminal boarding', 'Signature Flagship Lounge entry']
  },
  {
    id: 'flight-mia-exuma',
    name: 'Miami (MIA) to Great Exuma (GGT) Premium Business',
    category: 'flight',
    location: 'Great Exuma (GGT)',
    price: 420,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80',
    badge: 'Short Haul Elite',
    description: 'A short, luxury connection to the Bahamas Out Islands, enjoying spacious seating and local island rum punch.',
    details: ['Expedited security lanes', 'Extra-spacious luxury seating', 'Free Wi-Fi on flight']
  },
  {
    id: 'flight-nyc-savannah',
    name: 'New York (LGA) to Savannah (SAV) First Class Deal',
    category: 'flight',
    location: 'Savannah (SAV)',
    price: 310,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80',
    badge: 'Domestic Flight Deal',
    description: 'Fly in luxury to the host city of your grand celebration. Premium cabin seating with early-access boarding.',
    details: ['Dedicated first-class service', 'Complimentary luggage allowance', 'Gourmet snacks on-board']
  },
  {
    id: 'flight-lax-paris',
    name: 'Los Angeles (LAX) to Paris (CDG) Flagship Suite',
    category: 'flight',
    location: 'Paris (CDG)',
    price: 1350,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80',
    badge: 'Top International Flight',
    description: 'The supreme way to cross the Atlantic. Individual suites, wine tasting menu, and high-speed satellite Wi-Fi.',
    details: ['Individual private suite pods', 'Multi-course tasting menu', 'Five-star arrival lounge access']
  }
];

export const CAR_RENTALS: TravelAsset[] = [
  {
    id: 'car-mustang-axa',
    name: 'Ford Mustang GT Convertible',
    category: 'car',
    location: 'Anguilla Clay Airport (AXA)',
    price: 110,
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=300&q=80',
    badge: 'Sport Convertible',
    description: 'Rent the quintessential island cruiser. Cruise with the top down and feel the warm Atlantic trade-winds.'
  },
  {
    id: 'car-defender-gcm',
    name: 'Land Rover Defender 110 SUV',
    category: 'car',
    location: 'Grand Cayman Airport (GCM)',
    price: 165,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=300&q=80',
    badge: 'Elite 4x4 Offroad',
    description: 'Excellent luxury and offroad capability for exploring remote Cayman sands, coral cliffs, and local pathways.'
  },
  {
    id: 'car-gclass-miami',
    name: 'Mercedes-Benz G-Wagon G63 AMG',
    category: 'car',
    location: 'Miami Intl Airport (MIA)',
    price: 380,
    image: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf0a3?auto=format&fit=crop&w=300&q=80',
    badge: 'Presidential Premium',
    description: 'Make an entrance in Miami with the ultimate premium SUV, detailed in absolute leather and custom sport suspensions.'
  },
  {
    id: 'car-tesla-sav',
    name: 'Tesla Model Y Long Range AWD',
    category: 'car',
    location: 'Savannah Airport (SAV)',
    price: 95,
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=300&q=80',
    badge: 'Eco Premium Electric',
    description: 'Quiet, premium electric cruising through Savannah’s historic avenues. Delivered fully charged to terminal.'
  }
];

export const CRUISE_DEALS: TravelAsset[] = [
  {
    id: 'cruise-ritz-western',
    name: '7-Night Western Caribbean Ultra-Luxury',
    category: 'cruise',
    location: 'Departure: Miami, FL',
    price: 4200,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=600&q=80',
    badge: 'Ritz-Carlton Yacht Collection',
    description: 'Popular cruise destination aboard Evrima. Enjoy bespoke culinary dining, private terraces, and high staff ratios.',
    details: ['All-suite cabins with private terrace', 'Michelin-concept dining included', 'Personal concierge Butler']
  },
  {
    id: 'cruise-celeb-bermuda',
    name: '5-Night Bermuda Escape Cruise',
    category: 'cruise',
    location: 'Departure: Cape Liberty, NJ',
    price: 1550,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=600&q=80',
    badge: 'Celebrity Edge Prestige',
    description: 'Cruise from the northeast directly to the pink-sand beaches and ocean golf courses of St. George\'s, Bermuda.',
    details: ['Infinite Veranda cabin view', 'Access to Elite Thermal Suite', 'Included drink & Wi-Fi pack']
  },
  {
    id: 'cruise-med-rome',
    name: '9-Night Greek Isles & Amalfi Coast Luxury Yacht',
    category: 'cruise',
    location: 'Departure: Civitavecchia (Rome), Italy',
    price: 5400,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=600&q=80',
    badge: 'Silver Sea Signature',
    description: 'Navigate the stunning volcanic cliffs of Santorini, the beaches of Mykonos, and the dramatic vertical cliffs of Amalfi.',
    details: ['Butler service in every suite', 'Champagne and fine wines included', 'Private shore excursions included']
  }
];

export const TRAVEL_TIPS = [
  {
    id: 'tip-1',
    title: 'Anguilla Gastronomy Masterplan',
    excerpt: 'Always reserve a beach dinner table at Blanchards at Meads Bay 3 weeks in advance. Request the local garlic butter lobster flambé.',
    readTime: '3 min read',
    author: 'Elena Sinclair, Travel Curator'
  },
  {
    id: 'tip-2',
    title: 'Discover Secluded Pink Coves of Bermuda',
    excerpt: 'While Horseshoe Bay is stunningly iconic, Warwick Long Bay offers highly secluded sand valleys and natural limestone tunnels.',
    readTime: '5 min read',
    author: 'Lord Sterling, Yacht Captain'
  },
  {
    id: 'tip-3',
    title: 'Great Exuma Swim-With-Pig Etiquette',
    excerpt: 'Hire a licensed private boat charter at Barraterre docks to visit Big Major Spot early at 8:00 AM to beat tourist ferry crowds.',
    readTime: '4 min read',
    author: 'Chef Jean-Luc, Yacht Host'
  },
  {
    id: 'tip-4',
    title: 'How to Split Savannah Group Travel Payments',
    excerpt: 'Add hotel and flight items directly to your Planviry Occasion Cart, and leverage the interactive pay slider to split invoices instantly.',
    readTime: '2 min read',
    author: 'Planviry Concierge Team'
  }
];

export interface DealCategoryDetail {
  key: string;
  title: string;
  subtitle: string;
  editorial: string;
  table: {
    item: string;
    standardRate: number;
    bundleRate: number;
    savings: string;
    perk: string;
  }[];
  expertTips: string[];
  filterCategory: 'hotel' | 'flight' | 'car' | 'cruise' | 'package' | 'rental' | 'tips';
}

// 13 SOUGHT-AFTER LUXURY DEALS CATEGORIES
export const DEAL_CATEGORIES_DATA: Record<string, DealCategoryDetail> = {
  'hotels-internationally': {
    key: 'hotels-internationally',
    title: 'Premium International Hotels & Grand Estates',
    subtitle: 'Curated Five-Star Accommodations with Exclusive Concierge Status Perks',
    editorial: 'Sourced globally, our international hotel network highlights properties where luxury is defined by privacy and bespoke service. Through our exclusive partnerships with Aman, Belmond, and the Oetker Collection, guests receive guaranteed villa upgrades, private beach club access, daily butler service, and $200 in spa credits. Whether you are seeking a grand historic palazzo on the shores of Lake Como or a secluded cliffside villa in Anguilla, we compare starting rates against direct booking values to unlock unparalleled savings.',
    table: [
      { item: 'Cap Juluca, A Belmond Hotel (Anguilla)', standardRate: 1150, bundleRate: 950, savings: '17%', perk: 'Complimentary Suite Upgrade & Beach Butler' },
      { item: 'Villa d\'Este Prestige (Lake Como)', standardRate: 1750, bundleRate: 1450, savings: '17%', perk: 'Floating Pool Day Passes & Private Wooden Boat Tour' },
      { item: 'Jumby Bay Island Estate (Antigua)', standardRate: 2100, bundleRate: 1800, savings: '14%', perk: 'Private Yacht Transfer & All-Inclusive Fine Dining' },
      { item: 'Aman Tokyo (Tokyo)', standardRate: 1650, bundleRate: 1350, savings: '18%', perk: 'Early Check-in & Curated Tsukiji Market Culinary Tour' }
    ],
    expertTips: [
      'Book at least 45 days in advance during shoulder seasons (April-May, September-October) to lock in the highest probability of complementary junior suite upgrades.',
      'Leverage your Planviry card at check-in to unlock priority dining reservations at the resort’s Michelin-starred restaurants.'
    ],
    filterCategory: 'hotel'
  },
  'flights-domestic': {
    key: 'flights-domestic',
    title: 'First Class & Business Cabin Domestic Flight Deals',
    subtitle: 'Fly in Premier Comfort with Top Carrier Routes to Premium USA Hubs',
    editorial: 'Domestic travel doesn\'t mean compromising on luxury. Sourced daily, our domestic flight deals bring you the absolute lowest premium first-class and lie-flat seat rates across key carriers. We analyze direct routes from New York, Chicago, Atlanta, and Los Angeles to destinations like Savannah, Miami, Charleston, and Aspen. Benefit from complimentary lounge access, priority boarding, and dedicated concierge luggage tracking for an effortless door-to-gate journey.',
    table: [
      { item: 'New York (JFK) to Miami (MIA) First Class', standardRate: 850, bundleRate: 650, savings: '23%', perk: 'Complimentary Flagship Lounge Access' },
      { item: 'Chicago (ORD) to Aspen (ASE) Business', standardRate: 750, bundleRate: 580, savings: '22%', perk: 'Priority Ski Equipment Loading' },
      { item: 'Los Angeles (LAX) to Savannah (SAV) First Class', standardRate: 920, bundleRate: 710, savings: '22%', perk: 'Complimentary Gate-to-Gate Car Transfer' },
      { item: 'Atlanta (ATL) to Honolulu (HNL) First Class', standardRate: 1650, bundleRate: 1350, savings: '18%', perk: 'Lie-Flat Cabin Suite Guaranteed' }
    ],
    expertTips: [
      'Tuesday and Wednesday departures consistently offer 15-20% lower premium-cabin seat pricing.',
      'Always double check carrier aircraft types. Choose routes operated by wide-body jets (A350 or B777/B787) for the most spacious domestic lie-flat configurations.'
    ],
    filterCategory: 'flight'
  },
  'flights-international': {
    key: 'flights-international',
    title: 'Top International Lie-Flat Business & First Class Flights',
    subtitle: 'Elite Long-Haul Aviation Suites to Tokyo, Paris, Rome, and Beyond',
    editorial: 'Embark on international journeys with elite long-haul airline products. We curate the world\'s most prestigious business-class and first-class cabins, including the legendary Emirates First Class Shower Suites, Singapore Airlines A380 Double Suites, and Qatar Airways Qsuites. Enjoy gourmet dining on demand, prestigious champagne menus, luxurious pajama amenities, and expansive private airport lounges globally. Save significantly on direct commercial fares by packaging with our luxury resort stays.',
    table: [
      { item: 'New York (JFK) to Paris (CDG) Business Class', standardRate: 3400, bundleRate: 2500, savings: '26%', perk: 'Michelin-Curated In-Flight Dining' },
      { item: 'Los Angeles (LAX) to Tokyo (HND) First Class Suite', standardRate: 4100, bundleRate: 3100, savings: '24%', perk: 'Private Chauffeur Airport Pickup' },
      { item: 'Boston (BOS) to London (LHR) Business Suite', standardRate: 2800, bundleRate: 2100, savings: '25%', perk: 'Elite Arrivals Lounge Spa Pass' },
      { item: 'Miami (MIA) to Rome (FCO) Business Class', standardRate: 3100, bundleRate: 2300, savings: '25%', perk: 'Complimentary 5-Star Hotel Transfer' }
    ],
    expertTips: [
      'Use the Planviry app to automatically monitor aircraft tail numbers. If a carrier swaps an aircraft to a non-lie-flat cabin, our concierge automatically triggers a rerouting request.',
      'Book international long-haul flights exactly 120 days out for optimal luxury seat inventory release.'
    ],
    filterCategory: 'flight'
  },
  'packages-deals': {
    key: 'packages-deals',
    title: 'Save Today on Curated Vacation Packages',
    subtitle: 'Consolidated Lodging & Elite Flights with Guaranteed 15% Savings',
    editorial: 'Save immediately by bundling flights and luxury hotels into a single, unified itinerary. Sourced by our expert travel coordinators, our curated vacation packages offer significant cost reductions over booking separate components. We handle all logistics, from flight check-ins and gate transfers to hotel welcome amenities and late check-outs. Best of all, group travelers can split the total consolidated invoice instantly using our interactive payment slider.',
    table: [
      { item: 'Bermuda Historic Golf & Pink Beach Escape', standardRate: 2820, bundleRate: 2390, savings: '15%', perk: 'Complimentary Round of 18-Hole Golf' },
      { item: 'Anguilla Beachfront Villa & First Class Package', standardRate: 3650, bundleRate: 3100, savings: '15%', perk: 'Private Beach Dinner with Wine Pairing' },
      { item: 'Lake Como Grand Hotel & Flight Experience', standardRate: 4350, bundleRate: 3690, savings: '15%', perk: 'VIP Seaplane Sightseeing Excursion' },
      { item: 'Savannah Southern Charm Historic Package', standardRate: 1450, bundleRate: 1230, savings: '15%', perk: 'Private Historic Carriage Dining Tour' }
    ],
    expertTips: [
      'Our combined package savings are fixed at 15% year-round. This is particularly valuable during high-peak holidays (Thanksgiving, Christmas) when individual rates spike.',
      'Select the custom bundle option in our package creator to swap out individual components and maintain the exact same discount tier.'
    ],
    filterCategory: 'package'
  },
  'flights-hotels-together': {
    key: 'flights-hotels-together',
    title: 'Book International Flights & Hotels Together to Save',
    subtitle: 'The Ultimate Consolidated Sourcing Engine for Seamless Global Escapes',
    editorial: 'Coordination is the key to effortless global travel. By booking your international flights and luxury hotels together, you unlock access to unpublished bulk inventory and elite group rates. Our platform automatically synchronizes your flight arrival times with private resort transfers, ensuring you never wait at baggage claim. Your dedicated butler will have your suite prepared, complete with custom pre-arrival stocking and a chilled bottle of champagne.',
    table: [
      { item: 'Cap Juluca Resort + JFK First Class Flight (Anguilla)', standardRate: 3750, bundleRate: 3180, savings: '15%', perk: 'Pre-arrival Premium Bar Stocking' },
      { item: 'Villa d\'Este Resort + Milan Yacht Shuttle (Lake Como)', standardRate: 4500, bundleRate: 3820, savings: '15%', perk: 'Complimentary Vintage Wooden Riva Cruise' },
      { item: 'Jumby Bay Private Island + Antigua Private Air Shuttle', standardRate: 5900, bundleRate: 5015, savings: '15%', perk: 'Dedicated Island Butler & Chef Service' },
      { item: 'Aman Resort Tokyo + Premium HND lie-flat flight (Japan)', standardRate: 5370, bundleRate: 4560, savings: '15%', perk: 'Private Helicopter Transfer to Tokyo Heliport' }
    ],
    expertTips: [
      'When traveling in a group of 4 or more, booking international flights and hotels together enables custom baggage routing where luggage is sent directly to your villa via courier.',
      'Combine airport lounge passes and airport fast-track customs clearance directly within the booking engine.'
    ],
    filterCategory: 'package'
  },
  'domestic-favorites': {
    key: 'domestic-favorites',
    title: 'Domestic Destinations Travelers Love',
    subtitle: 'Sought-After Hotspots and Elite Local Hoteliers Across the USA',
    editorial: 'Discover the best of the United States. Our curated selection of domestic favorites highlights cities and states that offer exceptional luxury, historical significance, and scenic beauty. Explore Savannah\'s moss-draped historic squares, Miami\'s vibrant Art Deco culinary lounges, Charleston\'s pastel-hued harbors, and Aspen\'s elite ski reserves. Every property in our directory is verified to meet our highest standards of service and design.',
    table: [
      { item: 'Savannah, Georgia (Perry Lane Hotel)', standardRate: 550, bundleRate: 450, savings: '18%', perk: 'Peregrin Rooftop Lounge VIP Access' },
      { item: 'Miami, Florida (Faena Hotel Miami Beach)', standardRate: 850, bundleRate: 690, savings: '19%', perk: 'Oceanfront Private Cabana Day Pass' },
      { item: 'Aspen, Colorado (The Little Nell)', standardRate: 1100, bundleRate: 890, savings: '19%', perk: 'Guaranteed Ski-in/Ski-out Gondola Access' },
      { item: 'Honolulu, Hawaii (Halekulani Resort)', standardRate: 780, bundleRate: 640, savings: '18%', perk: 'Traditional Hawaiian Sunrise Canoe Paddle' }
    ],
    expertTips: [
      'Avoid holiday weekends for domestic destinations to experience a more personalized, slow-paced concierge experience.',
      'Ask our local curators for \'under-the-radar\' neighborhood guides, curated weekly to avoid commercial tourist zones.'
    ],
    filterCategory: 'hotel'
  },
  'international-favorites': {
    key: 'international-favorites',
    title: 'International Destinations Travelers Love',
    subtitle: 'Global Iconic Hideaways Curated by Our Sourcing Experts',
    editorial: 'Sought after by discerning global citizens, our international favorites represent the absolute pinnacle of luxury and culture. Experience the romantic canals and haute couture fashion of Paris, the futuristic neon streets and historic Shinto shrines of Tokyo, the timeless architectural beauty and cobblestone piazzas of Rome, and the serene, ultra-exclusive overwater villas of the Maldives. Sourced with direct-booking advantages and local concierge privileges.',
    table: [
      { item: 'Paris, France (Le Bristol Paris)', standardRate: 1950, bundleRate: 1650, savings: '15%', perk: 'Michelin 3-Star Epicure Reservation Guarantee' },
      { item: 'Tokyo, Japan (The Ritz-Carlton Tokyo)', standardRate: 1450, bundleRate: 1220, savings: '16%', perk: 'Suntory Whiskey VIP Tasting Flight' },
      { item: 'The Maldives (Soneva Jani Overwater Villa)', standardRate: 3500, bundleRate: 2950, savings: '16%', perk: 'Private Lagoon In-Villa Slide & Floating Breakfast' },
      { item: 'Rome, Italy (Hotel de Russie)', standardRate: 1150, bundleRate: 980, savings: '15%', perk: 'Private Vatican Gardens Sunset Tour' }
    ],
    expertTips: [
      'International favorites are best experienced with custom local curators. Our desk provides multi-lingual, certified local guides for private excursions.',
      'Keep a digital copy of your custom flight itinerary and passport inside your Planviry Occasion dashboard for seamless check-in transitions.'
    ],
    filterCategory: 'hotel'
  },
  'car-rentals-deals': {
    key: 'car-rentals-deals',
    title: 'Airport Exotic & Luxury Car Rental Deals',
    subtitle: 'Drive High-End Convertibles, Sports Cars, and Elite SUVs',
    editorial: 'An elevated travel experience requires the perfect vehicle. Our luxury car rental network provides high-end convertibles, exotic sports cars, and spacious premium SUVs directly at your destination airport. Choose from the iconic Mustang GT Convertible, executive Range Rovers, Porsche 911s, or elite Tesla Models. Benefit from expedited paperless pick-ups, direct tarmac delivery, and unlimited miles, all with our signature group booking advantages.',
    table: [
      { item: 'Mustang GT Convertible (AXA / Miami)', standardRate: 150, bundleRate: 110, savings: '26%', perk: 'Unlimited Miles & Zero Deductible' },
      { item: 'Range Rover Sport HSE (JFK / LAX)', standardRate: 280, bundleRate: 210, savings: '25%', perk: 'Tarmac Delivery & Pre-Paid Toll Pass' },
      { item: 'Porsche 911 Carrera S (MIA / LAS)', standardRate: 450, bundleRate: 350, savings: '22%', perk: 'Complimentary Track Day Pass & Delivery' },
      { item: 'Tesla Model S Plaid (SFO / LAX)', standardRate: 210, bundleRate: 160, savings: '24%', perk: 'Complimentary Supercharging & Autopilot' }
    ],
    expertTips: [
      'Always select \'tarmac delivery\' when flying private or first class. The vehicle will be waiting directly next to the aircraft or customs exit.',
      'Add an extra driver to your car rental at no cost by booking with your Planviry premium account status.'
    ],
    filterCategory: 'car'
  },
  'car-rentals-international': {
    key: 'car-rentals-international',
    title: 'Curated International Airport Car Rentals',
    subtitle: 'Secure Premium Fleets Globally with Direct Airport Handover',
    editorial: 'Navigating international roads is an absolute pleasure when driving a meticulously maintained premium vehicle. We curate international car rentals at major airports in Europe, the UK, and the Caribbean. From luxury Mercedes-Benz sedans in Paris to classic convertibles in Anguilla, we offer flat-rate pricing, comprehensive international insurance, and seamless handovers. Skip the rental counter lines and get on the scenic coastal route immediately.',
    table: [
      { item: 'Mercedes-Benz E-Class Sedan (Paris CDG)', standardRate: 190, bundleRate: 145, savings: '23%', perk: 'Built-in GPS & Euro Highway Pass' },
      { item: 'Land Rover Defender 110 (London LHR)', standardRate: 240, bundleRate: 185, savings: '22%', perk: 'Unlimited Mileage & Congestion Charge Covered' },
      { item: 'Jeep Wrangler Rubicon 4x4 (St. Maarten SXM)', standardRate: 110, bundleRate: 85, savings: '22%', perk: 'Sand Protection & Beach Cooler Inclusions' },
      { item: 'BMW 8 Series Convertible (Milan MXP)', standardRate: 320, bundleRate: 250, savings: '21%', perk: 'Scenic Alpine Route Map & Toll Transponder' }
    ],
    expertTips: [
      'Ensure you obtain an International Driving Permit (IDP) before departing. It is legally required in Italy and highly recommended throughout Europe.',
      'Our international fleets consist strictly of vehicles under 12 months old, complete with advanced driver assistance and local navigation systems.'
    ],
    filterCategory: 'car'
  },
  'vacation-rentals': {
    key: 'vacation-rentals',
    title: 'Top Deals on Private Luxury Vacation Rentals',
    subtitle: 'Multi-Million Dollar Private Villas, Penthouses, and Historic Estates',
    editorial: 'For ultimate privacy and group space, our luxury vacation rentals offer an unmatched alternative to traditional hotels. We provide exclusive access to curated private beach villas in Anguilla, historic townhouse estates in Savannah, and cliffside penthouses in Malibu. Every property includes high-end private pools, fully equipped chef kitchens, dedicated estate hosts, and customizable daily services like a private chef or yoga instructor.',
    table: [
      { item: 'Meads Bay 5-Bedroom Oceanfront Villa (Anguilla)', standardRate: 2400, bundleRate: 1950, savings: '18%', perk: 'Dedicated Chef & Butler Service' },
      { item: 'Historic 4-Story Estate Townhouse (Savannah)', standardRate: 950, bundleRate: 780, savings: '17%', perk: 'Curated Wine Cellar Stocking' },
      { item: 'Malibu Coastal Cliff Penthouse (Los Angeles)', standardRate: 1800, bundleRate: 1490, savings: '17%', perk: 'Private Beach Key & Surf Instructor' },
      { item: 'Lake Como Botanical Garden Estate (Italy)', standardRate: 3200, bundleRate: 2650, savings: '17%', perk: 'Private Speedboat Dock Access' }
    ],
    expertTips: [
      'Vacation rentals are perfect for group events. Contact our concierge to orchestrate catering, decorators, and high-end security detail.',
      'Request the \'all-inclusive\' option to cover daily food provisioning, airport luggage shuttle, and mid-stay professional cleaning.'
    ],
    filterCategory: 'rental'
  },
  'cruises-popular': {
    key: 'cruises-popular',
    title: 'Popular Cruise Destinations & Ultra-Luxury Yacht Liners',
    subtitle: 'Sail the Oceans in Extraordinary Grand Style & Sophisticated Comfort',
    editorial: 'Experience the world\'s most breathtaking coastlines from the water. We partner exclusively with ultra-luxury yacht liners, including the Ritz-Carlton Yacht Collection, Silversea, and Seabourn, to deliver an intimate cruise experience. Enjoy all-suite accommodations, private balconies, Michelin-quality dining, and open-bar privileges. Our destinations cover the pristine waters of the Caribbean, the historic ports of the Mediterranean, and scenic Alaskan passages.',
    table: [
      { item: 'Ritz-Carlton Yacht Collection - Caribbean Sail', standardRate: 4500, bundleRate: 3800, savings: '15%', perk: '$300 Shipboard Credit & Premium Champagne' },
      { item: 'Silversea Mediterranean Historic Harbor Cruise', standardRate: 3900, bundleRate: 3300, savings: '15%', perk: 'Private Shore Excursion Guides Included' },
      { item: 'Seabourn Ultimate Glacier Passage Alaska', standardRate: 4200, bundleRate: 3570, savings: '15%', perk: 'Complimentary Expedition Gear & Park Ranger Guide' },
      { item: 'Windstar Amalfi Coast Yacht Cruise', standardRate: 3200, bundleRate: 2720, savings: '15%', perk: 'Scenic Deck Suite Upgrade' }
    ],
    expertTips: [
      'Book cruise staterooms on the \'mid-ship\' upper decks to experience the smoothest sailing and quickest access to elite lounges.',
      'Yacht liner capacities are under 300 passengers, allowing entry into small, exclusive harbors larger ships can never access.'
    ],
    filterCategory: 'cruise'
  },
  'cruise-ports': {
    key: 'cruise-ports',
    title: 'Nearby Cruise Departure Ports & Transit Guides',
    subtitle: 'Effortless Logistics & Direct transfers to Key Luxury Terminals',
    editorial: 'Begin your maritime journey with complete peace of mind. Our cruise departure port guides offer direct transit coordinates, nearby luxury hotel recommendations for pre-cruise stays, and private transfers to major cruise terminals. Whether you are departing from PortMiami, Port Everglades, or Cape Liberty, we ensure your arrival is seamless, including priority luggage handovers and VIP boarding access.',
    table: [
      { item: 'PortMiami Premium Transfer (Miami, FL)', standardRate: 120, bundleRate: 95, savings: '20%', perk: 'Priority Pier Express Boarding Pass' },
      { item: 'Port Everglades Luxury Chauffeur (Fort Lauderdale)', standardRate: 110, bundleRate: 85, savings: '22%', perk: 'Luggage Handover Directly to Cabin' },
      { item: 'Cape Liberty Private Sprinter Transfer (NJ / NY)', standardRate: 180, bundleRate: 140, savings: '22%', perk: 'Pre-cruise Historic Lounge Access' },
      { item: 'Port of Venice Water Taxi Shuttle (Italy)', standardRate: 150, bundleRate: 115, savings: '23%', perk: 'Grand Canal Scenic Route Included' }
    ],
    expertTips: [
      'Arrive at your departure port city at least one day in advance. We offer custom pre-cruise hotel packages with early morning terminal transfers.',
      'Use the Planviry app to check your terminal gates. Our coordinators send live updates regarding boarding window changes.'
    ],
    filterCategory: 'cruise'
  },
  'travel-tips': {
    key: 'travel-tips',
    title: 'Travel Tips & Concierge Sourced Inspiration',
    subtitle: 'Insider Advice, Packing Blueprints, and Destination Masterplans',
    editorial: 'Read curated travel guides, custom packing lists, and hidden gems sourced directly from our global network of elite concierges. Learn the fine art of traveling effortlessly, from securing reservations at exclusive private member clubs to navigating international customs with ease. We provide you with the exact blueprints used by industry professionals to elevate every single aspect of your next bespoke occasion.',
    table: [
      { item: 'Anguilla Beachfront Dinner Reservation Blueprint', standardRate: 50, bundleRate: 0, savings: '100%', perk: 'Reserved Front-Row Meads Bay Sunset Table' },
      { item: 'Bermuda Hidden Cove & Limestone Tunnel Guide', standardRate: 40, bundleRate: 0, savings: '100%', perk: 'GPS Coordinates to Secret Pink Sand Valleys' },
      { item: 'Yacht Packing Masterclass & Luggage Logistics', standardRate: 60, bundleRate: 0, savings: '100%', perk: 'Interactive Smart Packing Checklists' },
      { item: 'Group Cost Splitting Dashboard Masterclass', standardRate: 30, bundleRate: 0, savings: '100%', perk: 'Excel Concierge Cost Template Download' }
    ],
    expertTips: [
      'Enable push notifications inside your Occasion Cart to receive instant concierge updates while on the move.',
      'Download our offline destination maps directly to your device before departing for the Caribbean islands.'
    ],
    filterCategory: 'tips'
  }
};
