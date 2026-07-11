export interface ExploreCategory {
  id: string;
  name: string;
  desc: string;
  icon: string;
  route: string;
  subcategories: string[];
}

export interface SurfaceGroup {
  groupName: string;
  desc: string;
  icon: string;
  items: ExploreCategory[];
}

export const TAXONOMY_CATEGORIES: ExploreCategory[] = [
  {
    id: "cat-concerts",
    name: "Concerts",
    desc: "All live music performances, global stadium tours, and local original sets.",
    icon: "Music",
    route: "/live-shows",
    subcategories: [
      "Concerts (National Tours)",
      "Concerts (Regional Bands)",
      "Music Festivals (Multi-Day)",
      "Open Mic Nights",
      "Tribute & Cover Bands",
      "Battle of the Bands",
      "Record Store Listening Parties"
    ]
  },
  {
    id: "cat-sports",
    name: "Sports",
    desc: "Major league spectator faceoffs and participatory athletic activities.",
    icon: "Trophy",
    route: "/live-shows",
    subcategories: [
      "NFL Games & Tailgates",
      "NBA Regular Season",
      "MLB Matchups",
      "NHL Ice Hockey",
      "MLS Soccer Tournaments",
      "WNBA Games",
      "Minor League Baseball (MiLB)",
      "G League Basketball",
      "eSports (Spectator)",
      "Professional Golf Tournaments",
      "Recreational Leagues",
      "Marathons & Road Races (5K, 10K)",
      "Triathlons & Ironman",
      "Tennis & Pickleball Clinics"
    ]
  },
  {
    id: "cat-arts",
    name: "Arts, Theater & Comedy",
    desc: "Musicals, plays, dance showcases, operas, and stand-up comedy specials.",
    icon: "Drama",
    route: "/live-shows",
    subcategories: [
      "Musicals",
      "Plays & Dramatic Theatre",
      "Dance Performances",
      "Opera",
      "Stand-Up Comedy",
      "Improv & Sketch Comedy",
      "Spoken Word & Poetry Slams",
      "Puppet Shows",
      "Circus & Aerial Arts",
      "Burlesque & Cabaret",
      "Variety Shows"
    ]
  },
  {
    id: "cat-festivals",
    name: "Festivals, Fairs & Expos",
    desc: "Cultural heritage celebrations, seasonal holiday markets, and trade fairs.",
    icon: "Compass",
    route: "/things-to-do",
    subcategories: [
      "Music Festivals",
      "Food & Drink Festivals",
      "Cultural Heritage Festivals",
      "County & State Fairs",
      "Comic-Cons & Pop Culture Expos",
      "Industry & Trade Expos",
      "Art & Craft Fairs",
      "Holiday Festivals & Markets",
      "Film Festivals",
      "Renaissance & Medieval Faires"
    ]
  },
  {
    id: "cat-classes",
    name: "Classes & Workshops",
    desc: "Interactive educational events, art pairings, and professional workshops.",
    icon: "GraduationCap",
    route: "/things-to-do",
    subcategories: [
      "Cooking & Baking Classes",
      "Art & Painting Classes (Paint & Sip)",
      "Dance & Movement Classes",
      "Photography & Video Classes",
      "Coding & Software Development",
      "Language & ESL Classes",
      "Fitness & Yoga Workshops",
      "Music & Instrument Lessons",
      "Pottery & Sculpture Classes",
      "DIY & Home Improvement",
      "Writing & Creative Workshops",
      "Gardening & Landscaping Classes"
    ]
  },
  {
    id: "cat-community",
    name: "Community & Culture",
    desc: "Neighborhood block socials, historic tours, and open municipal gatherings.",
    icon: "Users",
    route: "/things-to-do",
    subcategories: [
      "Neighborhood Block Parties",
      "Cultural Heritage Events",
      "LGBTQ+ Pride Events",
      "Historical Tours & Reenactments",
      "Library Events & Book Signings",
      "Book Clubs (In-Person)",
      "Senior Citizen Socials",
      "Newcomer / Expat Welcome Drinks",
      "Memorial & Remembrance Ceremonies",
      "Town Hall Meetings"
    ]
  },
  {
    id: "cat-business",
    name: "Business & Professional",
    desc: "Industry conferences, executive seminars, and professional mixers.",
    icon: "Briefcase",
    route: "/services",
    subcategories: [
      "Conferences & Industry Summits",
      "Professional Networking Mixers",
      "Speed Networking Events",
      "Career Fairs & Job Expos",
      "Startup Pitch Nights & Demo Days",
      "Real Estate Investment Seminars",
      "Finance & Wealth Management",
      "Women in Business Roundtables",
      "Young Professionals (YP) Socials",
      "Entrepreneurship & Small Business",
      "Franchise & Business Expos",
      "Leadership & Management Seminars"
    ]
  },
  {
    id: "food-drink",
    name: "Food & Drink",
    desc: "Gourmet tastings, vineyard wine tours, and pop-up dinners.",
    icon: "GlassWater",
    route: "/food-drink",
    subcategories: [
      "Food Truck Rallies",
      "Wine Tastings & Vineyard Tours",
      "Beer Festivals & Brewery Tours",
      "Spirits & Cocktail Tastings",
      "Cooking Classes & Chef Demos",
      "Multi-Course Pop-Up Dinners",
      "BBQ Competitions & Cook-Offs",
      "Chili Cook-Offs",
      "Dessert & Chocolate Expos",
      "Restaurant Week Special Events",
      "Farmers' Markets",
      "Food & Wine Pairing Dinners"
    ]
  },
  {
    id: "health-wellness",
    name: "Health & Wellness",
    desc: "Yoga retreats, meditation workshops, and premium spa days.",
    icon: "Heart",
    route: "/services",
    subcategories: [
      "Yoga, Pilates & Meditation Workshops",
      "Wellness Retreats (Day / Weekend)",
      "Health Fairs & Screenings",
      "Mental Health Awareness Seminars",
      "Nutrition & Diet Planning Seminars",
      "Gym Openings & Fitness Challenges",
      "Reiki, Energy Healing & Holistic Circles",
      "Spa Days & Self-Care Events",
      "Addiction Recovery & Support Groups",
      "Women's / Men's Health Expos"
    ]
  },
  {
    id: "outdoor-recreation",
    name: "Outdoor & Recreation",
    desc: "Group treks, glamping meetups, and water activities.",
    icon: "Trees",
    route: "/things-to-do",
    subcategories: [
      "Hiking & Backpacking Group Treks",
      "Camping & Glamping Meetups",
      "Kayaking, Rafting & Paddleboarding",
      "Skiing & Snowboarding Trips",
      "Travel Expos & Adventure Shows",
      "RV & Vanlife Gatherings",
      "National Park Guided Tours",
      "Wildlife Watching & Safaris",
      "Geocaching & Treasure Hunts",
      "Fishing Tournaments & Derbies",
      "Equestrian & Horseback Riding"
    ]
  },
  {
    id: "auto-boat-air",
    name: "Auto, Boat & Air",
    desc: "Elite classic car shows, yacht exhibitions, and airshows.",
    icon: "Plane",
    route: "/vendors",
    subcategories: [
      "Car & Truck Shows (Classic / Modern)",
      "Motorsports & Racing Events",
      "Auto Expos & Launches",
      "Cars & Coffee Meetups",
      "Boat & Yacht Shows",
      "Airshows & Aviation Expos",
      "Drone Racing & Tech Meetups",
      "Motorcycle Rallies & Bike Nights",
      "Off-Road & 4x4 Adventures",
      "RC Car Competitions",
      "Collector Car Auctions"
    ]
  },
  {
    id: "gaming-esports",
    name: "Gaming & Esports",
    desc: "Tabletop meetups, trading card tournaments, and LAN parties.",
    icon: "Gamepad",
    route: "/party",
    subcategories: [
      "Tabletop Gaming (Board Games, D&D, RPGs)",
      "Trading Card Game Tournaments (MTG, Pokémon)",
      "Video Gaming Tournaments (Esports)",
      "LAN Parties & Gaming Lounge Events",
      "Arcade & Retro Gaming Expos",
      "Game Development Meetups & Playtesting",
      "Mobile Gaming & Watch Parties"
    ]
  },
  {
    id: "nightlife-social",
    name: "Nightlife & Social",
    desc: "Singles mixers, rooftop happy hours, and karaoke.",
    icon: "GlassWater",
    route: "/party",
    subcategories: [
      "Singles Events & Speed Dating",
      "Happy Hours & Rooftop Socials",
      "Alumni Association Mixers",
      "General Social Mixers & Meetups",
      "Trivia Nights & Pub Quizzes",
      "Rooftop Parties & Socials",
      "New in Town / Expat Welcome Drinks",
      "Themed Costume Socials",
      "Karaoke Nights",
      "Dance Parties & Club Nights"
    ]
  },
  {
    id: "charity-fundraising",
    name: "Charity & Fundraising",
    desc: "Benefit galas, community food drives, and silent auctions.",
    icon: "HeartHandshake",
    route: "/services",
    subcategories: [
      "Benefit Galas & Charity Balls",
      "Charity 5K Runs & Fun Runs",
      "Fundraising Dinners & Auctions",
      "Awareness Rallies & Marches",
      "Community Clean-Ups & Restorations",
      "Blood Drives & Health Screenings",
      "Toy Drives & Food Drives",
      "Non-Profit Networking & Workshops",
      "Disaster Relief Fundraisers"
    ]
  },
  {
    id: "tech-science",
    name: "Technology & Science",
    desc: "Developer hackathons, expert AI panels, and space events.",
    icon: "Cpu",
    route: "/things-to-do",
    subcategories: [
      "Tech Expos & Product Launches",
      "Hackathons & Coding Competitions",
      "Robotics Competitions",
      "AI & Machine Learning Panels",
      "Cybersecurity Summits",
      "Cloud Computing & DevOps Meetups",
      "Software Development & Coding Workshops",
      "Data Science & Analytics Conferences",
      "Biotech & Life Sciences Symposia",
      "Space & Astronomy Events",
      "Environmental Science & Climate Tech",
      "Maker Faires & 3D Printing Expos"
    ]
  },
  {
    id: "education-academics",
    name: "Education & Academics",
    desc: "University open houses, language cafes, and exam workshops.",
    icon: "BookOpen",
    route: "/things-to-do",
    subcategories: [
      "College Fairs & University Open Houses",
      "Adult Education & Continuing Ed Classes",
      "Language Exchange & ESL Meetups",
      "STEM Camps & Robotics Demos",
      "Test Prep Workshops (SAT, ACT, GRE)",
      "Homeschool Co-op Meetups",
      "Tutoring & Homework Help Sessions",
      "Literacy & Reading Programs",
      "Coding Bootcamps (Info Sessions)"
    ]
  },
  {
    id: "home-garden-pets",
    name: "Home, Garden & Pets",
    desc: "DIY renovation classes, interior design clinics, and pet adoptions.",
    icon: "Home",
    route: "/services",
    subcategories: [
      "Home & Garden Shows",
      "DIY Home Improvement Workshops",
      "Interior Design Seminars",
      "Real Estate Open House Crawls",
      "Organizing & Decluttering Classes",
      "Pet Adoption Events & Animal Rescue Fairs",
      "Dog Shows & Agility Competitions",
      "Sustainable Living & Zero-Waste Workshops",
      "Gardening & Landscaping Classes",
      "Moving & Relocation Expos"
    ]
  },
  {
    id: "fashion-beauty",
    name: "Fashion & Beauty",
    desc: "Runway shows, custom makeup masterclasses, and designer pop-ups.",
    icon: "Palette",
    route: "/services",
    subcategories: [
      "Runway Fashion Shows",
      "Trunk Shows (Designer Showcases)",
      "Pop-up Shops & Sample Sales",
      "Beauty Expos & Makeup Masterclasses",
      "Hair Shows & Barber Battles",
      "Bridal Expos & Wedding Fairs",
      "Sustainable Fashion Swaps",
      "Glam & Photoshoot Experiences",
      "Modeling Auditions & Casting Calls"
    ]
  },
  {
    id: "religion-spirituality",
    name: "Religion & Spirituality",
    desc: "Spiritual retreats, quiet meditation groups, and choir concerts.",
    icon: "Milestone",
    route: "/things-to-do",
    subcategories: [
      "Church Services & Revivals",
      "Religious Holiday Celebrations",
      "Spiritual Retreats & Silent Meditation",
      "Interfaith Dialogues & Panels",
      "Gospel Choir Concerts",
      "Baptisms, Communions & Confirmations",
      "Crystal, Reiki & Energy Healing Fairs",
      "Bible Study & Torah Study Groups"
    ]
  },
  {
    id: "seasonal-holiday",
    name: "Seasonal & Holiday",
    desc: "Festive Christmas markets, Halloween balls, and 4th of July BBQs.",
    icon: "CalendarRange",
    route: "/party",
    subcategories: [
      "New Year's Eve Galas & Fireworks",
      "Valentine's Day Dinners & Events",
      "St. Patrick's Day Pub Crawls",
      "Easter Egg Hunts & Brunch",
      "4th of July BBQs & Fireworks",
      "Halloween Haunted Houses",
      "Thanksgiving Community Dinners",
      "Christmas Tree Lightings & Holiday Markets",
      "Hanukkah & Kwanzaa Celebrations",
      "Mother's Day / Father's Day Brunches",
      "Memorial Day / Labor Day Weekend BBQs"
    ]
  },
  {
    id: "cat-spaces",
    name: "Bespoke Event Spaces",
    desc: "Banquet halls, lofts, historical estates, and private galleries.",
    icon: "Building",
    route: "/spaces",
    subcategories: [
      "Banquet Halls",
      "Rooftops & Patios",
      "Art Galleries & Museums",
      "Industrial Lofts",
      "Historic Estates",
      "Waterfront Venues"
    ]
  },
  {
    id: "cat-travel",
    name: "Luxury Accommodations",
    desc: "Boutique hotels, private villas, and group stay coordination.",
    icon: "Plane",
    route: "/travel",
    subcategories: [
      "Boutique Hotels",
      "Private Villas",
      "Glamping Resorts",
      "Historical Lodges",
      "Group Cabin Blocks"
    ]
  },
  {
    id: "cat-planning",
    name: "Event Design & Planning",
    desc: "Full service coordinators, design consultants, and tech integrations.",
    icon: "Sparkles",
    route: "/plan",
    subcategories: [
      "Full Service Planners",
      "Day-Of Coordinators",
      "Design Consultants",
      "Corporate Event Producers",
      "Budget Managers"
    ]
  }
];
