import { CategoryLens } from '../types';

export interface Level3Item {
  name: string;
  count?: number;
  level4?: string[];
}

export interface Level2Item {
  id: string;
  title: string;
  icon: string;
  desc: string;
  image: string;
  subcategories: Level3Item[];
}

export interface SurfaceCategory {
  id: string;
  title: string;
  desc: string;
  icon: string;
  color: string; // e.g., 'text-amber-500 bg-amber-50'
  category: CategoryLens;
  level2: Level2Item[];
}

export const OCCASIONS_TAXONOMY = [
  {
    title: "CELEBRATE",
    items: [
      {
        id: "occ-social",
        title: "Social & Casual Parties",
        desc: "Milestone birthdays, intimate dinners, game nights, and backyard BBQs.",
        image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=400&q=80",
        category: "party" as CategoryLens,
        subcategories: [
          { name: "Birthday party" },
          { name: "Dinner parties" },
          { name: "Karaoke nights" },
          { name: "Happy hours" }
        ]
      },
      {
        id: "occ-life",
        title: "Milestone Life Celebrations",
        desc: "Celebrate the grand chapters of life — wedding receptions, baby showers, anniversaries.",
        image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=400&q=80",
        category: "plan" as CategoryLens,
        subcategories: [
          { name: "Wedding reception" },
          { name: "Anniversary party" },
          { name: "Baby showers" },
          { name: "Graduation party" },
          { name: "Bridal shower" }
        ]
      },
      {
        id: "occ-seasonal",
        title: "Holiday & Theme Parties",
        desc: "Festive gatherings, costume nights, Halloween, Christmas markets, and NYE.",
        image: "https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&w=400&q=80",
        category: "party" as CategoryLens,
        subcategories: [
          { name: "Holiday Parties" },
          { name: "New Year's Eve Party" },
          { name: "Thanksgiving Party" },
          { name: "Elopement Party" }
        ]
      }
    ]
  },
  {
    title: "PROFESSIONAL & PUBLIC",
    items: [
      {
        id: "occ-corporate",
        title: "Business & Corporate Events",
        desc: "Conferences, team-building sessions, corporate galas, and professional seminars.",
        image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=400&q=80",
        category: "services" as CategoryLens,
        subcategories: [
          { name: "Corporate occasion" },
          { name: "Team Building Activity" },
          { name: "Exhibition and Trade Centers" },
          { name: "Business seminars" }
        ]
      },
      {
        id: "occ-festivals",
        title: "Festivals, Fairs & Expos",
        desc: "Mass public events, cultural fairs, film festivals, and music expo gatherings.",
        image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=400&q=80",
        category: "plan" as CategoryLens,
        subcategories: [
          { name: "Festivals" },
          { name: "Fairs" },
          { name: "Music Festivals" },
          { name: "Film Festivals" }
        ]
      },
      {
        id: "occ-charity",
        title: "Charity & Fundraising",
        desc: "Donor banquets, silent auctions, charity walks, and benefit concert galas.",
        image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=400&q=80",
        category: "services" as CategoryLens,
        subcategories: [
          { name: "Gala Occasion Planners" },
          { name: "Occasion Staffing" },
          { name: "Fundraising dinners" }
        ]
      }
    ]
  }
];

export const TAXONOMY_SURFACES: SurfaceCategory[] = [
  {
    id: "planning-coordination",
    title: "Planning & Coordination",
    desc: "Planners, coordinators, wellness, beauty & officiants.",
    icon: "Briefcase",
    color: "text-amber-600 bg-amber-50/70 border-amber-100",
    category: "services",
    level2: [
      {
        id: "planners-coordinators",
        title: "Event Planners & Coordinators",
        icon: "ClipboardCheck",
        desc: "Full-service coordinators, wedding planners, and officiating professionals.",
        image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=400&q=80",
        subcategories: [
          { name: "Wedding Planning", count: 44441 },
          { name: "Party and Event Planning", count: 8316 },
          { name: "Officiating Services", count: 259 },
          { name: "Team Building Activity", count: 173 }
        ]
      },
      {
        id: "beauty-styling-wellness",
        title: "Beauty, Styling & Wellness",
        icon: "Sparkles",
        desc: "Premium hair stylists, professional makeup artists, and relaxing day spas.",
        image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=400&q=80",
        subcategories: [
          { name: "Spas", count: 291737 },
          { name: "Hair Salons", count: 185327 },
          { name: "Nail Salons", count: 97805 },
          { name: "Tattoo & Piercing", count: 165374 },
          { name: "Tanning Studios", count: 34950 },
          { name: "Skin Care & Facials", count: 23896 },
          { name: "Makeup Artists", count: 18854 },
          { name: "Day Spas", count: 11975 },
          { name: "Hair Stylists", count: 9881 },
          { name: "Waxing Services", count: 5045 },
          { name: "Eyelash Services", count: 1202 },
          { name: "Spray Tanning", count: 728 },
          { name: "Sugaring Hair Removal", count: 662 },
          { name: "Eyebrow Grooming", count: 454 },
          { name: "Blow Dry & Blow Out", count: 212 }
        ]
      }
    ]
  },
  {
    id: "venues-event-spaces",
    title: "Venues & Event Spaces",
    desc: "Historic mansions, theaters, bar lounges, and wedding chapels.",
    icon: "Building",
    color: "text-blue-600 bg-blue-50/70 border-blue-100",
    category: "spaces",
    level2: [
      {
        id: "traditional-occasion-spaces",
        title: "Traditional & Occasion Spaces",
        icon: "Home",
        desc: "Churches, chapels, estates, wedding halls, and conference centers.",
        image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=400&q=80",
        subcategories: [
          { name: "Venue and Event Space", count: 14301 },
          { name: "Wedding Chapels", count: 79 },
          { name: "Exhibition and Trade Centers", count: 193 },
          { name: "Estates & Mansions" },
          { name: "Country Clubs" },
          { name: "Banquet Halls" }
        ]
      },
      {
        id: "experiential-wineries-farms",
        title: "Experiential & Scenic Locations",
        icon: "Trees",
        desc: "Countryside wineries, rustic orchards, attraction farms, and distilleries.",
        image: "https://images.unsplash.com/photo-1504270997636-07ddfbd48945?auto=format&fit=crop&w=400&q=80",
        subcategories: [
          { name: "Distilleries", count: 6960 },
          { name: "Art Museums", count: 15740 },
          { name: "Attraction Farms", count: 145 },
          { name: "Orchards", count: 87 },
          { name: "Wineries & Vineyards" }
        ]
      },
      {
        id: "performance-halls-theaters",
        title: "Performance Halls & Theaters",
        icon: "Music",
        desc: "Symphony halls, auditoriums, comedy clubs, and performing theaters.",
        image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=400&q=80",
        subcategories: [
          { name: "Theaters & Performance Venues", count: 75617 },
          { name: "Music Venues", count: 54581 },
          { name: "Auditoriums", count: 19042 }
        ]
      },
      {
        id: "cocktail-bars-lounges",
        title: "Cocktail Bars & Social Lounges",
        icon: "GlassWater",
        desc: "Speakeasies, cigar lounges, microbreweries, and high-density cocktail bars.",
        image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=400&q=80",
        subcategories: [
          { name: "Cocktail Bars", count: 46365 },
          { name: "Sake Bars", count: 12820 },
          { name: "Sports Bars", count: 8615 },
          { name: "Cigar Bars", count: 65 }
        ]
      }
    ]
  },
  {
    id: "festivals-seasonal-events",
    title: "Festivals & Fairs",
    desc: "Multi-day public festivals, block fairs, and seasonal celebrations.",
    icon: "Calendar",
    color: "text-emerald-600 bg-emerald-50/70 border-emerald-100",
    category: "plan",
    level2: [
      {
        id: "public-fairs-celebrations",
        title: "Public Fairs & Celebrations",
        icon: "Compass",
        desc: "Local county fairs, street block parties, circuses, and carnival expos.",
        image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=400&q=80",
        subcategories: [
          { name: "Festivals", count: 11949 },
          { name: "Fairs", count: 10622 },
          { name: "General Festivals", count: 611 },
          { name: "Circuses", count: 3343 }
        ]
      },
      {
        id: "arts-film-festivals",
        title: "Arts & Film Festivals",
        icon: "Tv",
        desc: "Indie film screenings, international music festivals, and community art expos.",
        image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=400&q=80",
        subcategories: [
          { name: "Film Festivals & Orgs", count: 87 },
          { name: "Music Festivals & Orgs", count: 69 }
        ]
      }
    ]
  },
  {
    id: "catering-gastronomy",
    title: "Catering & Gastronomy",
    desc: "Fine dining, mobile bars, private chefs, and custom bakeries.",
    icon: "Utensils",
    color: "text-rose-600 bg-rose-50/70 border-rose-100",
    category: "food-drink",
    level2: [
      {
        id: "fine-dining-caterers",
        title: "Fine Dining & Caterers",
        icon: "ChefHat",
        desc: "Elite wedding catering, bespoke personal chefs, and Michelin-tier menus.",
        image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=400&q=80",
        subcategories: [
          { name: "Caterers", count: 67345 },
          { name: "Personal Chefs", count: 1120 },
          { name: "Food Trucks", count: 37597 },
          { name: "Restaurants" }
        ]
      },
      {
        id: "specialty-drinks-bakeries",
        title: "Specialty Drinks & Bakeries",
        icon: "Cake",
        desc: "Artisanal cake bakers, licensed mixologists, and beverage sommeliers.",
        image: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=400&q=80",
        subcategories: [
          { name: "Bakeries", count: 431989 },
          { name: "Bartenders", count: 3535 },
          { name: "Food & Beverage Consultants", count: 2796 },
          { name: "Sommelier Services", count: 2 }
        ]
      }
    ]
  },
  {
    id: "live-entertainment",
    title: "Live Entertainment",
    desc: "DJs, classical choirs, bands, magicians, and comedy clubs.",
    icon: "Mic",
    color: "text-purple-600 bg-purple-50/70 border-purple-100",
    category: "live-shows",
    level2: [
      {
        id: "bands-djs-orchestras",
        title: "Bands, DJs & Orchestras",
        icon: "Music",
        desc: "Professional wedding DJs, symphonic string orchestras, and jazz/blues bands.",
        image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80",
        subcategories: [
          { name: "DJ Services", count: 3284 },
          { name: "Musicians", count: 1527 },
          { name: "Choirs", count: 2165 },
          { name: "Jazz and Blues", count: 2597 },
          { name: "Bands & Orchestras", count: 49 }
        ]
      },
      {
        id: "novelty-stage-artists",
        title: "Novelty & Stage Artists",
        icon: "Masks",
        desc: "Lively magicians, caricaturists, face painters, and family character artists.",
        image: "https://images.unsplash.com/photo-1461344577544-4e5dc9487184?auto=format&fit=crop&w=400&q=80",
        subcategories: [
          { name: "Magicians", count: 468 },
          { name: "Clowns & Jugglers", count: 34 },
          { name: "Party Characters", count: 18 },
          { name: "Caricature Artists", count: 18 },
          { name: "Face Painting", count: 44 },
          { name: "Henna Artists", count: 61 }
        ]
      },
      {
        id: "clubs-nightlife-socials",
        title: "Clubs & Nightlife Socials",
        icon: "Disc",
        desc: "Vibrant dance clubs, local stand-up comedy rooms, and karaoke bars.",
        image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=400&q=80",
        subcategories: [
          { name: "Dance Clubs", count: 102365 },
          { name: "Karaoke Lounges", count: 25739 },
          { name: "Comedy Clubs", count: 9261 }
        ]
      }
    ]
  },
  {
    id: "amusements-attractions",
    title: "Amusement & Play",
    desc: "Theme parks, escape rooms, planetary domes, and family arcs.",
    icon: "Smile",
    color: "text-teal-600 bg-teal-50/70 border-teal-100",
    category: "things-to-do",
    level2: [
      {
        id: "family-amusement-parks",
        title: "Family Amusement Parks",
        icon: "Gift",
        desc: "Water parks, marine aquariums, drive-in cinemas, and planetary domes.",
        image: "https://images.unsplash.com/photo-1513553404607-988bf2703777?auto=format&fit=crop&w=400&q=80",
        subcategories: [
          { name: "Amusement Parks", count: 36789 },
          { name: "Water Parks", count: 13387 },
          { name: "Aquariums", count: 7501 },
          { name: "Planetariums", count: 1248 },
          { name: "Drive-In Theaters", count: 5204 }
        ]
      },
      {
        id: "quest-adventure-challenges",
        title: "Quest Adventure Challenges",
        icon: "ShieldAlert",
        desc: "Immersive escape rooms, tactical laser tag arenas, and axe throwing.",
        image: "https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?auto=format&fit=crop&w=400&q=80",
        subcategories: [
          { name: "Escape Rooms", count: 8502 },
          { name: "Laser Tag Centers", count: 1936 },
          { name: "Haunted Houses", count: 1746 },
          { name: "Zipline Centers", count: 29 },
          { name: "Challenge Courses", count: 34 },
          { name: "Axe Throwing Spots", count: 20 }
        ]
      }
    ]
  },
  {
    id: "outdoor-adventure",
    title: "Outdoor & Nature",
    desc: "Beaches, hiking trails, lake retreats, and cliff jumping.",
    icon: "Compass",
    color: "text-amber-700 bg-amber-50/60 border-amber-100",
    category: "things-to-do",
    level2: [
      {
        id: "scenic-landscapes",
        title: "Scenic Landscapes",
        icon: "Tent",
        desc: "Sun-drenched sandy beaches, alpine lakes, deep craters, and sand dunes.",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80",
        subcategories: [
          { name: "Beaches", count: 182785 },
          { name: "Lakes", count: 182636 },
          { name: "Waterfalls", count: 6241 },
          { name: "Caves & Caverns", count: 3551 },
          { name: "Trails & Paths", count: 39531 },
          { name: "Craters", count: 37974 },
          { name: "Canyons", count: 11 },
          { name: "Sand Dunes", count: 11 }
        ]
      },
      {
        id: "lookouts-observatories",
        title: "Lookouts & Observatories",
        icon: "Eye",
        desc: "Observation decks, high skyline views, and stargazing lookouts.",
        image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=400&q=80",
        subcategories: [
          { name: "Observatory Decks", count: 2380 },
          { name: "Scenic Lookouts", count: 26 },
          { name: "Skyline Views", count: 1 },
          { name: "Stargazing Areas", count: 1 }
        ]
      },
      {
        id: "wilderness-hiking-adventure",
        title: "Wilderness Adventure",
        icon: "Trees",
        desc: "Hot spring retreats, rugged backpacking trails, and cliff jumping zones.",
        image: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=400&q=80",
        subcategories: [
          { name: "Cliff Jumping Spots", count: 104 },
          { name: "Natural Hot Springs", count: 28 },
          { name: "Backpacking Areas", count: 5 }
        ]
      }
    ]
  },
  {
    id: "sports-active-recreation",
    title: "Sports & Recreation",
    desc: "Bowling alleys, water sports, field courts, and extreme skydiving.",
    icon: "Dribbble",
    color: "text-indigo-600 bg-indigo-50/70 border-indigo-100",
    category: "things-to-do",
    level2: [
      {
        id: "leisure-bowling-sports",
        title: "Leisure & Social Sports",
        icon: "Target",
        desc: "Slick bowling alleys, pool halls, skate parks, and neon mini-golf.",
        image: "https://images.unsplash.com/photo-1538510101211-148c69023131?auto=format&fit=crop&w=400&q=80",
        subcategories: [
          { name: "Bowling Alleys", count: 16244 },
          { name: "Pool Billiards", count: 16129 },
          { name: "Skate Parks", count: 13873 },
          { name: "Skating Rinks", count: 6831 },
          { name: "Mini Golf Courses", count: 4017 },
          { name: "Disc Golf Courses", count: 1867 },
          { name: "Bicycle Paths", count: 11 },
          { name: "Bubble Soccer", count: 1 }
        ]
      },
      {
        id: "court-field-sports",
        title: "Court & Field Sports",
        icon: "Award",
        desc: "Professional tennis courts, baseball fields, hockey fields, and baseball cages.",
        image: "https://images.unsplash.com/photo-1545809074-59472b3f5ecc?auto=format&fit=crop&w=400&q=80",
        subcategories: [
          { name: "Tennis Courts", count: 22794 },
          { name: "Baseball Fields", count: 8059 },
          { name: "Basketball Courts", count: 7184 },
          { name: "Badminton Courts", count: 2959 },
          { name: "Batting Cages", count: 2211 },
          { name: "Volleyball Courts", count: 1573 },
          { name: "Hockey Fields", count: 775 },
          { name: "Squash Courts", count: 744 },
          { name: "Rugby Pitches", count: 416 },
          { name: "Racquetball Courts", count: 312 },
          { name: "Beach Volleyball", count: 25 },
          { name: "Bocce Ball Courts", count: 3 }
        ]
      },
      {
        id: "water-sports-surfing",
        title: "Water Sports & Surfing",
        icon: "Waves",
        desc: "Sub-aquatic diving centers, elite surfing areas, and jet ski rentals.",
        image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=400&q=80",
        subcategories: [
          { name: "Diving Centers", count: 12565 },
          { name: "Surfing Spots", count: 5951 },
          { name: "Jet Ski Rentals", count: 735 },
          { name: "Rafting & Kayaking", count: 437 },
          { name: "Snorkeling Spots", count: 336 },
          { name: "Sailing Areas", count: 162 },
          { name: "Paddleboard Rentals", count: 102 },
          { name: "Snorkeling Equipment Rental", count: 6 },
          { name: "Kiteboarding Instruction", count: 3 }
        ]
      },
      {
        id: "adventure-extreme-sports",
        title: "Adventure & Extreme Sports",
        icon: "Flame",
        desc: "Rock climbing spots, extreme skydiving drops, and trampoline parks.",
        image: "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=400&q=80",
        subcategories: [
          { name: "Rock Climbing Spots", count: 5350 },
          { name: "Skydiving Centers", count: 1678 },
          { name: "Adventure Sports Centers", count: 641 },
          { name: "Rock Climbing Gyms", count: 102 },
          { name: "Paddleboarding Centers", count: 585 },
          { name: "Trampoline Parks", count: 71 },
          { name: "Airsoft Fields", count: 48 },
          { name: "Hang Gliding Centers", count: 68 },
          { name: "Climbing Services", count: 104 },
          { name: "Tubing Providers", count: 13 },
          { name: "Bungee Jumping Centers", count: 2 },
          { name: "Parasailing Rides", count: 13 }
        ]
      }
    ]
  },
  {
    id: "transport-tours",
    title: "Transport & Tours",
    desc: "Private helicopters, town cars, yachts, and sightseeing guides.",
    icon: "Car",
    color: "text-indigo-600 bg-indigo-50/70 border-indigo-100",
    category: "travel",
    level2: [
      {
        id: "sightseeing-air-tours",
        title: "Sightseeing & Air Tours",
        icon: "Plane",
        desc: "Curated city tours, high hot air balloon trips, and scenic aerial flights.",
        image: "https://images.unsplash.com/photo-1501183007986-d0d080b147f9?auto=format&fit=crop&w=400&q=80",
        subcategories: [
          { name: "Sightseeing Tours", count: 150078 },
          { name: "Hot Air Balloon Tours", count: 814 },
          { name: "Aerial Helicopter Tours", count: 72 }
        ]
      },
      {
        id: "chauffeurs-limos",
        title: "Chauffeurs & Limos",
        icon: "CarFront",
        desc: "Luxury limousine fleets, professional town car services, and valet parking.",
        image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=400&q=80",
        subcategories: [
          { name: "Limo Services", count: 9175 },
          { name: "Town Car Services", count: 322 },
          { name: "Private Jet Charters", count: 133 },
          { name: "Valet Services", count: 433 }
        ]
      },
      {
        id: "yachts-marine-charters",
        title: "Yachts & Marine Charters",
        icon: "Ship",
        desc: "Private boat charters, sport fishing charters, and elite boat rentals.",
        image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=400&q=80",
        subcategories: [
          { name: "Fishing Charters", count: 10980 },
          { name: "Boat Hire Services", count: 7078 },
          { name: "Boat Charters", count: 829, level4: ["Boat Hire", "Boat Rental", "Boat Tours"] }
        ]
      },
      {
        id: "transit-travel-logistics",
        title: "Transit & Travel Logistics",
        icon: "MapPin",
        desc: "Full travel agency suites, express passport filings, and coach charters.",
        image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=400&q=80",
        subcategories: [
          { name: "Travel Services", count: 308427 },
          { name: "Passport & Visa Services", count: 12178 },
          { name: "Coach Bus Rentals", count: 338 },
          { name: "Bus Rentals", count: 1287 }
        ]
      }
    ]
  },
  {
    id: "equipment-event-rentals",
    title: "Equipment & Rentals",
    desc: "Bespoke furniture, wedding tents, party buses, and stage setups.",
    icon: "Tent",
    color: "text-orange-600 bg-orange-50/70 border-orange-100",
    category: "party",
    level2: [
      {
        id: "event-production-staging",
        title: "Event Production & Staging",
        icon: "Armchair",
        desc: "High-end furniture rentals, massive wedding tents, and specialty ice supplier.",
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=80",
        subcategories: [
          { name: "Party Equipment Rentals", count: 8832 },
          { name: "Furniture Rentals", count: 565 },
          { name: "Balloon Services & Decor", count: 416 },
          { name: "Ice Suppliers", count: 231 }
        ]
      },
      {
        id: "mobile-leisure-rentals",
        title: "Mobile & Leisure Rentals",
        icon: "Sparkles",
        desc: "Lively party buses, beach shelter rentals, golf carts, and recreational bikes.",
        image: "https://images.unsplash.com/photo-153151233558-d860c5398176?auto=format&fit=crop&w=400&q=80",
        subcategories: [
          { name: "Beach Equipment Rentals", count: 13010 },
          { name: "Scooter Rentals", count: 4478 },
          { name: "Bike Rentals", count: 975 },
          { name: "Golf Cart Rentals", count: 76 },
          { name: "Party Bus Rentals", count: 297 },
          { name: "Sport Equipment Rentals", count: 127 },
          { name: "Game Truck Rentals", count: 16 },
          { name: "Party Bike Rentals", count: 6 }
        ]
      }
    ]
  },
  {
    id: "photography-art-creative",
    title: "Photo, Art & Creative Support",
    desc: "Editorial photographers, florists, dress ateliers, and event technology.",
    icon: "Camera",
    color: "text-pink-600 bg-pink-50/70 border-pink-100",
    category: "vendors",
    level2: [
      {
        id: "photography-videography",
        title: "Photography & Videography",
        icon: "Camera",
        desc: "Fine-art portrait photographers, film videographers, and photo booths.",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&q=80",
        subcategories: [
          { name: "Photographer", count: 74340 },
          { name: "Videographer", count: 3096 },
          { name: "Photo Booth Rental", count: 2686 },
          { name: "Botanical Gardens", count: 8834 },
          { name: "Castle locations", count: 8490 },
          { name: "Palace properties", count: 4497 },
          { name: "Landmarks & Monuments", count: 945233 }
        ]
      },
      {
        id: "creative-art-gift-design",
        title: "Creative Art & Gift Design",
        icon: "Paintbrush",
        desc: "Bespoke calligraphy artists, graphic designers, and image consultants.",
        image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&w=400&q=80",
        subcategories: [
          { name: "Graphic Designers", count: 59635 },
          { name: "Image Consultants", count: 2361 },
          { name: "Commissioned Artists", count: 686 },
          { name: "Corporate Gift Suppliers", count: 77 },
          { name: "Calligraphy & Stationers", count: 26 }
        ]
      },
      {
        id: "retail-craft-services",
        title: "Retail & Craft Services",
        icon: "ShoppingBag",
        desc: "Bridal shops, grand floral florists, jewelry designers, and sign making.",
        image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&w=400&q=80",
        subcategories: [
          { name: "Flower & Gift Shops", count: 436157 },
          { name: "Jewelry Stores", count: 237906 },
          { name: "Bridal Shops", count: 47256 },
          { name: "Sewing & Alterations", count: 41263 },
          { name: "Party Supply Stores", count: 32326 },
          { name: "Sign Making Shops", count: 25804 },
          { name: "Photography Stores", count: 19802 },
          { name: "Film Production Studios", count: 3775 }
        ]
      },
      {
        id: "tech-specialized-services",
        title: "Tech & Specialized Services",
        icon: "Cpu",
        desc: "Symphonic audio visual engineering, silent disco setups, and trivia hosts.",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=400&q=80",
        subcategories: [
          { name: "Event Technology Services", count: 631 },
          { name: "Silent Disco", count: 3 },
          { name: "Trivia Hosts", count: 3 }
        ]
      }
    ]
  },
  {
    id: "travel-lodging",
    title: "Travel & Lodging",
    desc: "Luxury hotels, private villas, mountain chalets, and scenic resorts.",
    icon: "Hotel",
    color: "text-indigo-700 bg-indigo-50/60 border-indigo-100",
    category: "travel",
    level2: [
      {
        id: "luxury-traditional-stays",
        title: "Luxury & Traditional Stays",
        icon: "Hotel",
        desc: "Respected resort grounds, boutique bed & breakfasts, and historic inns.",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80",
        subcategories: [
          { name: "Hotels", count: 1374630 },
          { name: "Bed and Breakfast", count: 97579 },
          { name: "Resorts", count: 97155 },
          { name: "Inns & Taverns", count: 4573 },
          { name: "Guest Houses", count: 4883 },
          { name: "Health Retreats", count: 111 },
          { name: "Service Apartments" },
          { name: "Ryokans" }
        ]
      },
      {
        id: "experiential-wilderness-stays",
        title: "Experiential & Wilderness Stays",
        icon: "Trees",
        desc: "Woodland log cabins, lakeside cottages, premium holiday rentals, and RV parks.",
        image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=400&q=80",
        subcategories: [
          { name: "Holiday Rental Homes", count: 153407 },
          { name: "Campgrounds", count: 96493 },
          { name: "Lodges", count: 46756 },
          { name: "Cabins", count: 24523 },
          { name: "RV Parks", count: 25342 },
          { name: "Cottages & Chalets", count: 19968 },
          { name: "Hostels", count: 48334 },
          { name: "Mountain Huts", count: 60 },
          { name: "Country Houses" },
          { name: "Ski Resorts" }
        ]
      }
    ]
  }
];
