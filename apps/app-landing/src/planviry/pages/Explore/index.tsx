import React, { useMemo, useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from '@/planviry/router';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { getCategoryForService } from '../../data';
import { searchZipCodes, ZipSuggestion } from '../../lib/zipSearch';
import { searchTaxonomy } from '../../lib/taxonomySearch';

// =========================================================================
// 1. EXHAUSTIVE UNIFIED TAXONOMY (20 Top-Level Parents with Mapped Subcategories)
// =========================================================================
interface ExploreCategory {
  id: string;
  name: string;
  desc: string;
  icon: keyof typeof Icons;
  route: string; // The active feed route to link to
  subcategories: string[];
}

const TAXONOMY_CATEGORIES: ExploreCategory[] = [
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

export interface SurfaceGroup {
  groupName: string;
  desc: string;
  icon: keyof typeof Icons;
  items: ExploreCategory[];
}

export const SURFACES_TAXONOMY_GROUPS: SurfaceGroup[] = [
  {
    groupName: "Exclusive Spaces",
    desc: "Verified venues, historic estates, and luxury rental blocks.",
    icon: "Building",
    items: [
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
      }
    ]
  },
  {
    groupName: "Travel & Stay",
    desc: "Boutique hotels, private villas, and travel coordination.",
    icon: "Plane",
    items: [
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
      }
    ]
  },
  {
    groupName: "Food & Drink",
    desc: "Gourmet caterers, private chefs, and wine pairings.",
    icon: "Utensils",
    items: [
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
      }
    ]
  },
  {
    groupName: "Live Shows",
    desc: "Concerts, stand-up comedy, sports spectator packages, and theater.",
    icon: "Music",
    items: [
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
      }
    ]
  },
  {
    groupName: "Things to Do",
    desc: "Classes, festivals, outdoor adventures, and community culture.",
    icon: "Compass",
    items: [
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
      }
    ]
  },
  {
    groupName: "Party & Social",
    desc: "Nightlife mixers, gaming tournaments, and festive holiday parties.",
    icon: "Sparkles",
    items: [
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
      }
    ]
  },
  {
    groupName: "Private Services",
    desc: "Wellness retreats, beauty stylists, and bespoke private services.",
    icon: "Heart",
    items: [
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
      }
    ]
  },
  {
    groupName: "Premium Vendors",
    desc: "Professional photographers, custom transport, and event supplies.",
    icon: "Store",
    items: [
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
      }
    ]
  },
  {
    groupName: "Planning & Concierge",
    desc: "Full-service planners, coordinators, and corporate designers.",
    icon: "Briefcase",
    items: [
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
      }
    ]
  }
];

// =========================================================================
// 2. EXHAUSTIVE OCCASION MAPPINGS (Over 30+ Mapped Occasions from PDF Pages 5-28)
// =========================================================================
export interface OccasionSubtype {
  name: string;
  services: string[];
}

export interface OccasionType {
  id: string;
  name: string;
  desc: string;
  subtypes: OccasionSubtype[];
}

export interface OccasionGroup {
  groupName: string;
  desc: string;
  icon: keyof typeof Icons;
  items: OccasionType[];
}

export const OCCASIONS_TAXONOMY_GROUPS: OccasionGroup[] = [
  {
    groupName: "Milestone & Life Occasions",
    desc: "Celebrate the personal and grand chapters of life with loved ones.",
    icon: "Sparkles",
    items: [
      {
        id: "occ-birthday",
        name: "Birthday Party",
        desc: "From kids themed events to milestone adult celebrations.",
        subtypes: [
          {
            name: "Kids Birthday (1-12)",
            services: ["Venue and Occasion Space", "Caterer", "Bakery", "DJ Service", "Party Supply", "Party Character", "Party Equipment Rental", "Photo Booth Rental", "Face Painting", "Balloon Services"]
          },
          {
            name: "Teen Birthday (13-17)",
            services: ["Venue and Occasion Space", "Caterer", "Bakery", "DJ Service", "Party Supply", "Photo Booth Rental", "Occasion Technology Service"]
          },
          {
            name: "Adult Birthday (21+)",
            services: ["Venue and Occasion Space", "Caterer", "Bakery", "DJ Service", "Bartender", "Party Supply", "Photo Booth Rental", "Limo Services / Party Bus Rental"]
          },
          {
            name: "Milestone Birthday (30/40/50/60+)",
            services: ["Venue and Occasion Space", "Caterer", "Bakery", "DJ Service", "Bartender", "Party Supply", "Photographer", "Photo Booth Rental", "Limo Services / Town Car Service", "Flower and Gift Shop"]
          }
        ]
      },
      {
        id: "occ-house",
        name: "House Party",
        desc: "Intimate and cozy residential social mixers.",
        subtypes: [
          { name: "Casual Gathering", services: ["Holiday Rental Home / Cabin", "Caterer", "Bartender", "Party Supply"] },
          { name: "Themed House Party", services: ["Holiday Rental Home / Cabin", "Party Supply", "Caterer", "Bartender", "DJ Service", "Photo Booth Rental"] },
          { name: "Game Night", services: ["Holiday Rental Home / Cabin", "Caterer", "Bartender", "Party Equipment Rental", "Party Supply"] }
        ]
      },
      {
        id: "occ-dinner",
        name: "Dinner Party",
        desc: "Private culinary pairings and banquets.",
        subtypes: [
          { name: "Casual Dinner", services: ["Venue and Occasion Space", "Caterer", "Bartender", "Flower and Gift Shop", "Calligraphy / Graphic Designer"] },
          { name: "Formal Dinner", services: ["Venue and Occasion Space", "Personal Chef", "Bartender", "Flower and Gift Shop", "Calligraphy / Graphic Designer", "Party Supply", "Furniture Rental"] },
          { name: "Themed Dinner", services: ["Venue and Occasion Space", "Caterer", "Party Supply", "Bartender", "Flower and Gift Shop", "Calligraphy / Graphic Designer"] }
        ]
      },
      {
        id: "occ-cocktail",
        name: "Cocktail Party",
        desc: "Lively standalone drink and networking hours.",
        subtypes: [
          { name: "Networking Cocktail Hour", services: ["Venue and Occasion Space", "Bartender", "Caterer", "DJ Service", "Party Supply", "Furniture Rental"] },
          { name: "Birthday Cocktail Party", services: ["Venue and Occasion Space", "Bartender", "Caterer", "DJ Service", "Party Supply", "Photographer", "Photo Booth Rental"] },
          { name: "Holiday Cocktail Party", services: ["Venue and Occasion Space", "Bartender", "Caterer", "DJ Service", "Party Supply", "Flower and Gift Shop", "Photographer"] }
        ]
      },
      {
        id: "occ-bbq",
        name: "BBQ / Cookout",
        desc: "Casual, outdoor smokeouts and corporate picnics.",
        subtypes: [
          { name: "Backyard BBQ", services: ["Venue and Occasion Space / Campground", "Caterer", "Party Equipment Rental", "Furniture Rental", "Bartender", "DJ Service"] },
          { name: "Pool Party BBQ", services: ["Venue and Occasion Space", "Caterer", "Party Equipment Rental", "Furniture Rental", "Bartender", "DJ Service"] },
          { name: "Corporate BBQ", services: ["Venue and Occasion Space / Resort", "Caterer", "Party Equipment Rental", "Furniture Rental", "Bartender", "DJ Service", "Photographer"] }
        ]
      },
      {
        id: "occ-pool",
        name: "Pool Party",
        desc: "Splashing warm-weather coordinate plans.",
        subtypes: [
          { name: "Kids Pool Party", services: ["Venue and Occasion Space", "Caterer", "Party Supply", "Party Equipment Rental", "Furniture Rental", "DJ Service"] },
          { name: "Adult Pool Party", services: ["Venue and Occasion Space / Resort", "Caterer", "Party Equipment Rental", "Furniture Rental", "Bartender", "DJ Service", "Photographer"] },
          { name: "Birthday Pool Party", services: ["Venue and Occasion Space", "Caterer", "Bakery", "Party Equipment Rental", "Furniture Rental", "Bartender", "DJ Service", "Photographer"] }
        ]
      },
      {
        id: "occ-dance",
        name: "Dance Party",
        desc: "Beat-pumping sound and tech solutions.",
        subtypes: [
          { name: "Birthday Dance Party", services: ["Venue and Occasion Space / Dance Club", "DJ Service", "Occasion Technology Service", "Bartender", "Caterer", "Photo Booth Rental", "Bakery"] },
          { name: "Private Dance Party", services: ["Venue and Occasion Space", "DJ Service", "Occasion Technology Service", "Bartender", "Caterer"] },
          { name: "Themed Dance Party", services: ["Venue and Occasion Space", "DJ Service", "Occasion Technology Service", "Party Supply", "Bartender", "Caterer", "Photo Booth Rental"] }
        ]
      },
      {
        id: "occ-karaoke",
        name: "Karaoke Party",
        desc: "Microphone setups and lively pub supplies.",
        subtypes: [
          { name: "Birthday Karaoke", services: ["Venue and Occasion Space / Karaoke", "Bartender", "Caterer", "Bakery", "Party Supply"] },
          { name: "Corporate Karaoke", services: ["Venue and Occasion Space / Karaoke", "Bartender", "Caterer", "Photographer"] },
          { name: "Private Karaoke", services: ["Venue and Occasion Space / Karaoke", "Bartender", "Caterer", "Party Supply"] }
        ]
      },
      {
        id: "occ-baby",
        name: "Baby Shower",
        desc: "Welcoming the newest members with floral elegance.",
        subtypes: [
          { name: "Traditional", services: ["Venue and Occasion Space", "Caterer", "Bakery", "Party Supply", "Balloon Services", "Flower and Gift Shop", "Calligraphy", "Photographer"] },
          { name: "Co-ed", services: ["Venue and Occasion Space", "Caterer", "Bakery", "Bartender", "Party Supply", "Balloon Services", "Flower and Gift Shop", "Calligraphy", "Photographer"] },
          { name: "Virtual", services: ["Occasion Technology Service", "Calligraphy", "Party Supply"] }
        ]
      },
      {
        id: "occ-bridal",
        name: "Bridal Shower",
        desc: "Elegant coordinates for the bride-to-be.",
        subtypes: [
          { name: "Traditional", services: ["Venue and Occasion Space", "Caterer", "Bakery", "Party Supply", "Balloon Services", "Flower and Gift Shop", "Calligraphy", "Photographer", "Bartender"] },
          { name: "Brunch", services: ["Venue and Occasion Space", "Caterer", "Bakery", "Bartender", "Party Supply", "Balloon Services", "Flower and Gift Shop", "Calligraphy", "Photographer"] },
          { name: "Destination", services: ["Venue and Occasion Space", "Caterer", "Bakery", "Bartender", "Party Supply", "Flower and Gift Shop", "Calligraphy", "Photographer", "Limo Services", "Travel Services"] }
        ]
      },
      {
        id: "occ-bachelor",
        name: "Bachelorette / Bachelor",
        desc: "Bespoke weekend plans, bar crawls, and spa retreats.",
        subtypes: [
          { name: "Bachelorette Weekend", services: ["Resort / Holiday Rental Home", "Limo Services / Party Bus Rental", "Bartender", "Caterer", "DJ Service", "Party Supply", "Photo Booth Rental", "Day Spa / Spas / Nail Salon"] },
          { name: "Bachelor Bar Crawl", services: ["Venue and Occasion Space", "Limo Services / Party Bus Rental", "Bartender", "Caterer", "Party Supply"] },
          { name: "Co-ed Party", services: ["Venue and Occasion Space", "Limo Services / Party Bus Rental", "Bartender", "Caterer", "DJ Service", "Party Supply", "Photo Booth Rental"] }
        ]
      },
      {
        id: "occ-engagement",
        name: "Engagement Party",
        desc: "Toasting to love with curated dinners and photography.",
        subtypes: [
          { name: "Casual", services: ["Venue and Occasion Space", "Caterer", "Bartender", "Party Supply", "Photographer", "Calligraphy"] },
          { name: "Formal Dinner", services: ["Venue and Occasion Space", "Caterer", "Bartender", "Flower and Gift Shop", "Party Supply", "Photographer", "Calligraphy", "Bakery"] },
          { name: "Backyard", services: ["Venue and Occasion Space", "Caterer", "Bartender", "Party Equipment Rental", "Party Supply", "Photographer", "Calligraphy"] }
        ]
      },
      {
        id: "occ-graduation",
        name: "Graduation Party",
        desc: "Commemorating academic milestones from high school to graduate studies.",
        subtypes: [
          { name: "High School", services: ["Venue and Occasion Space", "Caterer", "Bakery", "Party Supply", "Balloon Services", "Photographer", "DJ Service", "Photo Booth Rental", "Calligraphy", "Bartender"] },
          { name: "College", services: ["Venue and Occasion Space", "Caterer", "Bakery", "Party Supply", "Balloon Services", "Photographer", "DJ Service", "Photo Booth Rental", "Calligraphy", "Bartender"] },
          { name: "Graduate School", services: ["Venue and Occasion Space", "Caterer", "Bakery", "Party Supply", "Photographer", "Calligraphy", "Bartender"] }
        ]
      },
      {
        id: "occ-retirement",
        name: "Retirement Party",
        desc: "Dignified corporate and cozy family celebrations.",
        subtypes: [
          { name: "Office Retirement", services: ["Venue and Occasion Space", "Caterer", "Bakery", "Party Supply", "Photographer", "DJ Service", "Photo Booth Rental", "Calligraphy", "Bartender"] },
          { name: "Family Celebration", services: ["Venue and Occasion Space", "Caterer", "Bakery", "Party Supply", "Photographer", "DJ Service", "Photo Booth Rental", "Calligraphy", "Bartender", "Flower and Gift Shop"] },
          { name: "Surprise Retirement", services: ["Venue and Occasion Space", "Caterer", "Bakery", "Party Supply", "Photographer", "Videographer", "DJ Service", "Photo Booth Rental", "Calligraphy", "Bartender", "Flower and Gift Shop"] }
        ]
      },
      {
        id: "occ-sweet16",
        name: "Sweet 16 / Quinceañera",
        desc: "Grand tradition milestones with elaborate rentals, sound, and tailoring.",
        subtypes: [
          { name: "Sweet 16 Traditional", services: ["Venue and Occasion Space", "Caterer", "DJ Service", "Photographer", "Bakery", "Party Supply", "Photo Booth Rental", "Occasion Technology Service", "Bridal Shop / Sewing & Alterations", "Makeup Artist", "Hair Stylist", "Flower and Gift Shop", "Videographer", "Limo Services"] },
          { name: "Quinceañera Traditional", services: ["Venue and Occasion Space", "Caterer", "DJ Service", "Photographer", "Videographer", "Flower and Gift Shop", "Bakery", "Party Supply", "Bridal Shop / Sewing & Alterations", "Makeup Artist", "Hair Stylist", "Furniture Rental", "Photo Booth Rental", "Occasion Technology Service", "Limo Services"] },
          { name: "Quinceañera Religious", services: ["Venue and Occasion Space", "Caterer", "DJ Service", "Photographer", "Videographer", "Flower and Gift Shop", "Bakery", "Party Supply", "Bridal Shop / Sewing & Alterations", "Makeup Artist", "Hair Stylist", "Furniture Rental", "Photo Booth Rental", "Occasion Technology Service", "Limo Services", "Officiating Services"] }
        ]
      },
      {
        id: "occ-bar-mitzvah",
        name: "Bar / Bat Mitzvah",
        desc: "Traditional, reform, and modern family celebrations.",
        subtypes: [
          { name: "Traditional Mitzvah", services: ["Venue and Occasion Space", "Caterer", "DJ Service", "Photographer", "Videographer", "Bakery", "Party Supply", "Flower and Gift Shop", "Photo Booth Rental", "Occasion Technology Service", "Calligraphy", "Furniture Rental", "Party and Occasion Planning"] },
          { name: "Modern Mitzvah", services: ["Venue and Occasion Space", "Caterer", "DJ Service", "Photographer", "Videographer", "Bakery", "Party Supply", "Flower and Gift Shop", "Photo Booth Rental", "Occasion Technology Service", "Calligraphy", "Party and Occasion Planning"] }
        ]
      },
      {
        id: "occ-anniversary",
        name: "Anniversary Party",
        desc: "Milestone renewals from paper to gold years.",
        subtypes: [
          { name: "1st Anniversary", services: ["Venue and Occasion Space", "Caterer", "Bakery", "DJ Service", "Photographer", "Flower and Gift Shop", "Party Supply", "Bartender", "Calligraphy"] },
          { name: "25th Silver Anniversary", services: ["Venue and Occasion Space", "Caterer", "Bakery", "DJ Service", "Photographer", "Videographer", "Flower and Gift Shop", "Party Supply", "Bartender", "Photo Booth Rental", "Calligraphy", "Officiating Services"] },
          { name: "50th Golden Anniversary", services: ["Venue and Occasion Space", "Caterer", "Bakery", "DJ Service", "Photographer", "Videographer", "Flower and Gift Shop", "Party Supply", "Bartender", "Photo Booth Rental", "Calligraphy", "Officiating Services", "Limo Services / Town Car Service"] }
        ]
      }
    ]
  },
  {
    groupName: "Home, Seasonal & Social",
    desc: "Embrace the outdoors, holiday periods, and neighborhood life.",
    icon: "Trees",
    items: [
      {
        id: "occ-holiday",
        name: "Holiday Party",
        desc: "Christmas markets, Halloween costumed events, and NYE counts.",
        subtypes: [
          { name: "Christmas", services: ["Venue and Occasion Space / Holiday Rental Home", "Caterer", "Bartender", "DJ Service", "Party Supply", "Flower and Gift Shop", "Bakery", "Photo Booth Rental", "Photographer"] },
          { name: "Halloween", services: ["Venue and Occasion Space", "Caterer", "Bartender", "DJ Service", "Party Supply", "Photo Booth Rental", "Occasion Technology Service"] },
          { name: "Thanksgiving Dinner", services: ["Venue and Occasion Space / Holiday Rental Home", "Caterer", "Bartender", "Party Supply", "Flower and Gift Shop", "Furniture Rental / Party Equipment Rental"] },
          { name: "New Year's Eve", services: ["Venue and Occasion Space", "Caterer", "Bartender", "DJ Service", "Party Supply", "Photo Booth Rental", "Photographer", "Occasion Technology Service"] }
        ]
      },
      {
        id: "occ-garden",
        name: "Garden & Cottage Party",
        desc: "Refined afternoon teas, botanical bridal showers, and boutique picnics.",
        subtypes: [
          { name: "Afternoon Cottage Party", services: ["Venue and Occasion Space / Cottage", "Party Equipment Rental", "Flower and Gift Shop", "Caterer", "Bartender", "Furniture Rental", "DJ Service", "Photographer", "Calligraphy"] },
          { name: "Bridal Botanical Garden", services: ["Venue and Occasion Space / Botanical Garden", "Party Equipment Rental", "Flower and Gift Shop", "Caterer", "Bartender", "Furniture Rental", "DJ Service", "Photographer", "Calligraphy", "Bakery"] }
        ]
      },
      {
        id: "occ-block",
        name: "Block Party & Street Festivals",
        desc: "Neighborhood food trucks, community block stages, and band rentals.",
        subtypes: [
          { name: "Neighborhood Block", services: ["Venue and Occasion Space", "Caterer / Food Truck", "Party Equipment Rental", "Furniture Rental", "DJ Service", "Bartender", "Party Supply"] },
          { name: "Street Festival Stages", services: ["Venue and Occasion Space", "Caterer / Food Truck", "Party Equipment Rental", "Furniture Rental", "DJ Service", "Bartender", "Party Supply", "Musical Band Orchestras and Symphonies"] }
        ]
      },
      {
        id: "occ-rooftop",
        name: "Rooftop Party",
        desc: "Skylight views, corporate mixers, and wedding after-parties.",
        subtypes: [
          { name: "Birthday Rooftop", services: ["Venue and Occasion Space", "Caterer", "Bartender", "DJ Service", "Occasion Technology Service", "Furniture Rental", "Photographer", "Photo Booth Rental", "Bakery"] },
          { name: "Corporate Mixer", services: ["Venue and Occasion Space", "Caterer", "Bartender", "DJ Service", "Occasion Technology Service", "Furniture Rental", "Photographer"] }
        ]
      },
      {
        id: "occ-beach",
        name: "Beach Party",
        desc: "Sandy coastal activities, summer sports, and beach rentals.",
        subtypes: [
          { name: "Summer Beach Picnic", services: ["Beach", "Beach Equipment Rentals / Party Equipment Rental", "Furniture Rental", "Caterer / Food Truck", "Bartender", "DJ Service", "Party Supply", "Photographer"] },
          { name: "Beach Corporate Team Building", services: ["Beach", "Beach Equipment Rentals / Party Equipment Rental", "Furniture Rental", "Caterer", "Bartender", "DJ Service", "Party Supply", "Photographer", "Team Building Activity"] }
        ]
      }
    ]
  },
  {
    groupName: "Professional & Corporate",
    desc: "Execute flawless commercial summits, pitch days, and corporate galas.",
    icon: "Briefcase",
    items: [
      {
        id: "occ-conference",
        name: "Conference & Seminars",
        desc: "Large scale auditorium summits, tech panels, and trade exhibits.",
        subtypes: [
          { name: "Industry Conference", services: ["Exhibition and Trade Center / Auditorium", "Occasion Technology Service", "Caterer", "Photographer", "Videographer", "Furniture Rental", "Calligraphy / Graphic Designer", "Party and Occasion Planning", "Valet Service / Coach Bus"] },
          { name: "Annual Summit", services: ["Exhibition and Trade Center / Auditorium", "Occasion Technology Service", "Caterer", "Photographer", "Videographer", "Furniture Rental", "Calligraphy / Graphic Designer", "Party and Occasion Planning", "Valet Service / Coach Bus"] },
          { name: "Leadership Conference", services: ["Venue and Occasion Space / Auditorium", "Occasion Technology Service", "Caterer", "Photographer", "Videographer", "Furniture Rental", "Calligraphy / Graphic Designer", "Party and Occasion Planning"] }
        ]
      },
      {
        id: "occ-retreat",
        name: "Corporate Retreat",
        desc: "Strategic planning board sessions and offsite team building.",
        subtypes: [
          { name: "Leadership Retreat", services: ["Resort / Lodge", "Caterer", "Team Building Activity", "Occasion Technology Service", "Photographer", "Limo Services / Coach Bus", "Party and Occasion Planning"] },
          { name: "Team Offsite", services: ["Venue and Occasion Space / Lodge", "Caterer", "Team Building Activity", "Occasion Technology Service", "Photographer", "Limo Services / Coach Bus", "Party and Occasion Planning"] }
        ]
      },
      {
        id: "occ-launch",
        name: "Launch Party",
        desc: "Exhibition centers, app launches, and book signing spaces.",
        subtypes: [
          { name: "Product Launch", services: ["Venue and Occasion Space / Exhibition and Trade Center", "Caterer", "Bartender", "DJ Service", "Occasion Technology Service", "Photographer", "Videographer", "Party Supply", "Photo Booth Rental", "Calligraphy / Graphic Designer"] },
          { name: "App Launch Event", services: ["Venue and Occasion Space / Exhibition and Trade Center", "Caterer", "Bartender", "DJ Service", "Occasion Technology Service", "Photographer", "Videographer", "Party Supply", "Photo Booth Rental", "Calligraphy / Graphic Designer"] }
        ]
      },
      {
        id: "occ-gala",
        name: "Industry Gala & Awards",
        desc: "Bespoke annual banquets, hall of fame induction, and orchestral stages.",
        subtypes: [
          { name: "Annual Gala", services: ["Venue and Occasion Space / Exhibition and Trade Center", "Caterer", "Bartender", "Musical Band Orchestras and Symphonies", "Photographer", "Videographer", "Flower and Gift Shop", "Occasion Technology Service", "Calligraphy / Graphic Designer", "Party Supply", "Party Equipment Rental", "Limo Services / Coach Bus"] },
          { name: "Awards Ceremony", services: ["Venue and Occasion Space / Auditorium", "Caterer", "Bartender", "Musical Band Orchestras and Symphonies", "Photographer", "Videographer", "Flower and Gift Shop", "Occasion Technology Service", "Calligraphy / Graphic Designer", "Party Supply", "Party Equipment Rental"] }
        ]
      }
    ]
  },
  {
    groupName: "Weddings & Ceremonies",
    desc: "Uncompromising elegance for traditional, micro, and destination vows.",
    icon: "Heart",
    items: [
      {
        id: "occ-wedding-ceremony",
        name: "Wedding Ceremony + Reception",
        desc: "Complete planning, jewelry, custom flowers, and catering.",
        subtypes: [
          { name: "Traditional Wedding", services: ["Wedding Chapel / Venue and Occasion Space", "Officiating Services", "Caterer", "DJ Service", "Photographer", "Videographer", "Flower and Gift Shop", "Bakery", "Bartender", "Party Supply", "Bridal Shop / Sewing & Alterations", "Makeup Artist / Hair Stylist", "Jewelry Store", "Calligraphy", "Limo Services", "Photo Booth Rental", "Occasion Technology Service", "Furniture Rental", "Wedding Planning", "Resort / Bed and Breakfast"] },
          { name: "Micro-Wedding", services: ["Wedding Chapel / Venue and Occasion Space", "Officiating Services", "Caterer", "DJ Service", "Photographer", "Flower and Gift Shop", "Bakery", "Bartender", "Party Supply", "Bridal Shop", "Makeup Artist / Hair Stylist", "Calligraphy"] },
          { name: "Destination Wedding", services: ["Resort / Castle", "Travel Services", "Holiday Rental Home", "Limo Services", "Wedding Planning", "Officiating Services", "Caterer", "DJ Service", "Photographer", "Videographer", "Flower and Gift Shop", "Bakery", "Bartender", "Makeup Artist / Hair Stylist", "Calligraphy", "Bridal Shop"] }
        ]
      },
      {
        id: "occ-vow",
        name: "Vow Renewal",
        desc: "Anniversary ceremonies, elopements, and intimate gatherings.",
        subtypes: [
          { name: "Anniversary Renewal", services: ["Wedding Chapel / Venue and Occasion Space", "Officiating Services", "Photographer", "Videographer", "Flower and Gift Shop", "Bakery", "Caterer", "Bridal Shop / Sewing & Alterations", "Makeup Artist / Hair Stylist", "DJ Service", "Calligraphy"] },
          { name: "Intimate Renewal", services: ["Wedding Chapel / Holiday Rental Home", "Officiating Services", "Photographer", "Flower and Gift Shop", "Bakery", "Bridal Shop", "Makeup Artist / Hair Stylist"] }
        ]
      },
      {
        id: "occ-christening",
        name: "Baby Naming / Christening",
        desc: "Religious and baby naming celebration receptions.",
        subtypes: [
          { name: "Christening", services: ["Venue and Occasion Space / Wedding Chapel", "Officiating Services", "Caterer", "Bakery", "Party Supply", "Photographer", "Calligraphy", "Corporate Gift Supplier"] },
          { name: "Baby Naming Celebration", services: ["Venue and Occasion Space", "Officiating Services / Mohel", "Caterer", "Bakery", "Party Supply", "Photographer", "Calligraphy", "Corporate Gift Supplier"] }
        ]
      }
    ]
  }
];

// Helper function to map occasion IDs to elegant consumer icons
const mapLucideToMaterial = (lucideIcon: string): string => {
  const mapping: Record<string, string> = {
    "Music": "music_note",
    "Trophy": "trophy",
    "Drama": "theater_comedy",
    "Compass": "explore",
    "GraduationCap": "school",
    "Users": "groups",
    "Briefcase": "business_center",
    "GlassWater": "local_bar",
    "Heart": "spa",
    "Trees": "forest",
    "Plane": "flight",
    "Gamepad": "sports_esports",
    "HeartHandshake": "volunteer_activism",
    "Cpu": "memory",
    "BookOpen": "menu_book",
    "Home": "home",
    "Palette": "brush",
    "Milestone": "self_improvement",
    "CalendarRange": "celebration",
    "Building": "domain",
    "Sparkles": "celebration",
    "Utensils": "restaurant",
    "Store": "storefront",
    "Gift": "card_giftcard"
  };
  return mapping[lucideIcon] || "celebration";
};

const getOccasionIcon = (id: string): string => {
  const iconMap: Record<string, string> = {
    "occ-birthday": "cake",
    "occ-house": "home",
    "occ-dinner": "dinner_dining",
    "occ-cocktail": "local_bar",
    "occ-bbq": "outdoor_grill",
    "occ-pool": "pool",
    "occ-dance": "nightlife",
    "occ-karaoke": "mic",
    "occ-baby": "child_care",
    "occ-bridal": "diamond",
    "occ-bachelor": "sports_bar",
    "occ-engagement": "favorite",
    "occ-graduation": "school",
    "occ-retirement": "work_off",
    "occ-sweet16": "cake",
    "occ-bar-mitzvah": "celebration",
    "occ-anniversary": "favorite",
    "occ-holiday": "card_giftcard",
    "occ-garden": "yard",
    "occ-block": "groups",
    "occ-rooftop": "domain",
    "occ-beach": "beach_access",
    "occ-conference": "co_present",
    "occ-retreat": "self_improvement",
    "occ-launch": "rocket_launch",
    "occ-gala": "celebration",
    "occ-wedding-ceremony": "favorite",
    "occ-vow": "favorite",
    "occ-christening": "child_care"
  };
  return iconMap[id] || "celebration";
};

export const ExplorePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    searchWhat,
    setSearchWhat,
    searchWhere,
    setSearchWhere,
    searchWhen,
    setSearchWhen,
    searchPrice,
    setSearchPrice,
    searchAttendees,
    setSearchAttendees,
    showToast
  } = useApp();

  // Helper to update URL search parameters while preserving existing ones (e.g. location, dates)
  const updateSearchParams = (newParams: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    setSearchParams(params);
  };

  // Synchronize URL parameters to AppContext
  const urlWhat = searchParams.get('q') || '';
  const urlWhere = searchParams.get('location') || '';
  const urlWhen = searchParams.get('when') || '';
  const urlPrice = searchParams.get('price') || '';
  const urlGuests = searchParams.get('guests') || '';

  useEffect(() => {
    if (urlWhat) setSearchWhat(urlWhat);
    if (urlWhere) setSearchWhere(urlWhere);
    if (urlWhen) setSearchWhen(urlWhen);
    if (urlPrice) setSearchPrice(urlPrice);
    if (urlGuests) setSearchAttendees(urlGuests);
  }, [urlWhat, urlWhere, urlWhen, urlPrice, urlGuests, setSearchWhat, setSearchWhere, setSearchWhen, setSearchPrice, setSearchAttendees]);

  // Autocomplete dropdown UI states for Explore Page compact bar
  const [showWhatDropdown, setShowWhatDropdown] = useState(false);
  const [showWhereDropdown, setShowWhereDropdown] = useState(false);

  const whatRef = useRef<HTMLDivElement>(null);
  const whereRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (whatRef.current && !whatRef.current.contains(event.target as Node)) {
        setShowWhatDropdown(false);
      }
      if (whereRef.current && !whereRef.current.contains(event.target as Node)) {
        setShowWhereDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Filter taxonomy suggestions dynamically
  const filteredWhatSuggestions = useMemo(() => {
    return searchTaxonomy(searchWhat);
  }, [searchWhat]);

  // Filter zip suggestions dynamically (async API — 44k US cities)
  const [filteredWhereSuggestions, setFilteredWhereSuggestions] = React.useState<ZipSuggestion[]>([]);
  React.useEffect(() => {
    let active = true;
    searchZipCodes(searchWhere).then((results) => {
      if (active) setFilteredWhereSuggestions(results);
    });
    return () => { active = false; };
  }, [searchWhere]);

  // Active tab derived from query param or default to 'categories'
  const activeTab = (searchParams.get('tab') as 'categories' | 'occasions') || 'categories';

  // State for progressive drilldown
  const [step, setStep] = React.useState<1 | 2 | 3>(1);
  const [selectedCategoryId, setSelectedCategoryId] = React.useState<string | null>(null);
  const [selectedOccasionId, setSelectedOccasionId] = React.useState<string | null>(null);
  const [selectedSubtypeName, setSelectedSubtypeName] = React.useState<string | null>(null);

  // Parse URL parameters on load and tab changes
  React.useEffect(() => {
    const tab = searchParams.get('tab') || 'categories';
    const id = searchParams.get('id');
    const subtype = searchParams.get('subtype');

    if (tab === 'categories') {
      if (id) {
        setSelectedCategoryId(id);
        setStep(2);
      } else {
        setSelectedCategoryId(null);
        setStep(1);
      }
      setSelectedOccasionId(null);
      setSelectedSubtypeName(null);
    } else {
      if (id) {
        setSelectedOccasionId(id);
        if (subtype) {
          setSelectedSubtypeName(subtype);
          setStep(3);
        } else {
          setSelectedSubtypeName(null);
          setStep(2);
        }
      } else {
        setSelectedOccasionId(null);
        setSelectedSubtypeName(null);
        setStep(1);
      }
      setSelectedCategoryId(null);
    }
  }, [searchParams]);

  // Find active category
  const activeCategory = useMemo(() => {
    if (!selectedCategoryId) return null;
    return TAXONOMY_CATEGORIES.find(c => c.id === selectedCategoryId) || null;
  }, [selectedCategoryId]);

  // Find active occasion
  const activeOccasion = useMemo(() => {
    if (!selectedOccasionId) return null;
    for (const group of OCCASIONS_TAXONOMY_GROUPS) {
      const found = group.items.find(i => i.id === selectedOccasionId);
      if (found) return found;
    }
    return null;
  }, [selectedOccasionId]);

  // Handle Tab changes
  const handleTabChange = (tab: 'categories' | 'occasions') => {
    updateSearchParams({ tab, id: null, subtype: null });
  };

  // Back button handler
  const handleBack = () => {
    if (activeTab === 'categories') {
      if (step === 2) {
        updateSearchParams({ tab: 'categories', id: null });
      }
    } else {
      if (step === 3) {
        updateSearchParams({ tab: 'occasions', id: selectedOccasionId || '', subtype: null });
      } else if (step === 2) {
        updateSearchParams({ tab: 'occasions', id: null, subtype: null });
      }
    }
  };

  return (
    <div className="w-full text-left pl-6 md:pl-10 lg:pl-12 pr-6 md:pr-12 pt-10 pb-20 select-none bg-neutral-50/40 min-h-screen">
      <div className="space-y-8 w-full">
        
        {/* Header Block: Left-Aligned and Elegant */}
        <div className="space-y-4 max-w-4xl text-left">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-champagne-gold uppercase block">
              Explore Services
            </span>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-neutral-900 tracking-tight">
              Event & Planning Directory
            </h1>
            <p className="text-xs md:text-sm text-neutral-500 font-serif leading-relaxed">
              Browse our directory of verified event specialists, venues, and suppliers by specific category, or select an occasion to view a curated list of services tailored to your next celebration.
            </p>
          </div>

          {/* Toggle buttons for Browse view */}
          <div className="inline-flex bg-neutral-200/50 p-1 rounded-xl border border-neutral-200/80">
            <button
              onClick={() => handleTabChange('categories')}
              className={`px-5 py-2.5 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer border-none ${
                activeTab === 'categories'
                  ? 'bg-neutral-900 text-white shadow-md'
                  : 'text-neutral-600 hover:text-neutral-900 bg-transparent'
              }`}
            >
              Browse by Category
            </button>
            <button
              onClick={() => handleTabChange('occasions')}
              className={`px-5 py-2.5 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer border-none ${
                activeTab === 'occasions'
                  ? 'bg-neutral-900 text-white shadow-md'
                  : 'text-neutral-600 hover:text-neutral-900 bg-transparent'
              }`}
            >
              Browse by Occasion
            </button>
          </div>
        </div>

        {/* Navigation Breadcrumb Tracker */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-3 shadow-sm flex flex-col xl:flex-row xl:items-center justify-between gap-4 w-full">
          <div className="flex items-center gap-3 shrink-0 text-xs font-serif font-medium text-neutral-500 text-left">
            {step > 1 && (
              <button
                onClick={handleBack}
                className="flex items-center gap-1.5 text-neutral-700 hover:text-champagne-gold font-sans font-bold uppercase tracking-wider text-[10px] transition-all bg-neutral-100 hover:bg-neutral-200/70 px-3.5 py-2 rounded-xl cursor-pointer border-none"
              >
                <span className="material-symbols-outlined text-sm font-bold leading-none select-none">arrow_back</span>
                Back
              </button>
            )}
            
            <div className="flex items-center gap-2 text-neutral-400 font-sans text-[11px] font-medium leading-none">
              <span 
                className={`hover:text-neutral-700 cursor-pointer ${step === 1 ? 'text-neutral-950 font-bold' : ''}`}
                onClick={handleBack}
              >
                {activeTab === 'categories' ? 'All Categories' : 'All Occasions'}
              </span>
              
              {activeCategory && (
                <>
                  <span className="material-symbols-outlined text-xs select-none">chevron_right</span>
                  <span className="text-neutral-900 font-semibold">
                    {activeCategory.name}
                  </span>
                </>
              )}

              {activeOccasion && (
                <>
                  <span className="material-symbols-outlined text-xs select-none">chevron_right</span>
                  <span 
                    className={`hover:text-neutral-700 cursor-pointer ${step === 2 ? 'text-neutral-950 font-bold' : 'text-neutral-500 font-semibold'}`}
                    onClick={() => {
                      if (step === 3) {
                        updateSearchParams({ tab: 'occasions', id: activeOccasion.id, subtype: null });
                      }
                    }}
                  >
                    {activeOccasion.name}
                  </span>
                  {selectedSubtypeName && (
                    <>
                      <span className="material-symbols-outlined text-xs select-none">chevron_right</span>
                      <span className="text-neutral-950 font-semibold font-mono text-[10px] uppercase tracking-wide bg-champagne-gold/10 text-champagne-gold px-2.5 py-1 rounded-md border border-champagne-gold/20">
                        {selectedSubtypeName}
                      </span>
                    </>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Compact planning/search bar on directory page */}
          <div className="flex flex-wrap items-center gap-1.5 bg-neutral-50/80 p-1.5 rounded-xl border border-neutral-200/50 w-full">
            {/* What */}
            <div ref={whatRef} className="flex flex-col px-3 py-1 min-w-[100px] flex-1 relative">
              <span className="text-[8px] font-bold uppercase text-neutral-400 tracking-wider">What</span>
              <input
                type="text"
                value={searchWhat}
                onChange={(e) => {
                  setSearchWhat(e.target.value);
                  setShowWhatDropdown(true);
                }}
                onFocus={() => setShowWhatDropdown(true)}
                placeholder="What are we planning?"
                className="bg-transparent border-none p-0 text-xs font-semibold text-neutral-800 focus:ring-0 outline-none w-full"
              />

              {/* Autocomplete Overlay */}
              {showWhatDropdown && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-neutral-200 rounded-xl shadow-xl z-50 max-h-48 overflow-y-auto py-1 divide-y divide-neutral-50 w-64">
                  {filteredWhatSuggestions.map((suggestion) => (
                    <button
                      key={suggestion.name}
                      type="button"
                      onClick={() => {
                        setSearchWhat(suggestion.name);
                        setShowWhatDropdown(false);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-neutral-50 text-[11px] font-semibold text-neutral-800 flex items-center justify-between border-none bg-transparent cursor-pointer"
                    >
                      <div className="flex flex-col text-left">
                        <span>{suggestion.name}</span>
                        <span className="text-[8px] text-neutral-400 font-normal">Category: {suggestion.route?.replace('/', '')}</span>
                      </div>
                      <span className="text-[8px] text-champagne-gold font-mono font-medium bg-champagne-gold/5 px-1 py-0.5 rounded uppercase">{suggestion.type}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="h-6 w-px bg-neutral-200 hidden md:block" />

            {/* Where */}
            <div ref={whereRef} className="flex flex-col px-3 py-1 min-w-[100px] flex-1 relative">
              <span className="text-[8px] font-bold uppercase text-neutral-400 tracking-wider">Where</span>
              <input
                type="text"
                value={searchWhere}
                onChange={(e) => {
                  setSearchWhere(e.target.value);
                  setShowWhereDropdown(true);
                }}
                onFocus={() => setShowWhereDropdown(true)}
                placeholder="Location"
                className="bg-transparent border-none p-0 text-xs font-semibold text-neutral-800 focus:ring-0 outline-none w-full"
              />

              {/* Autocomplete Overlay */}
              {showWhereDropdown && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-neutral-200 rounded-xl shadow-xl z-50 max-h-48 overflow-y-auto py-1 divide-y divide-neutral-50 w-64">
                  {filteredWhereSuggestions.map((city) => (
                    <button
                      key={`${city.city}-${city.zip}`}
                      type="button"
                      onClick={() => {
                        setSearchWhere(`${city.city}, ${city.state}`);
                        setShowWhereDropdown(false);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-neutral-50 text-[11px] font-semibold text-neutral-800 flex items-center justify-between border-none bg-transparent cursor-pointer"
                    >
                      <span className="truncate">{city.city}, {city.state}</span>
                      <span className="text-[8px] font-mono text-neutral-400 bg-neutral-100 px-1 py-0.5 rounded">{city.zip}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="h-6 w-px bg-neutral-200 hidden md:block" />

            {/* When */}
            <div className="flex flex-col px-3 py-1 min-w-[100px] flex-1">
              <span className="text-[8px] font-bold uppercase text-neutral-400 tracking-wider">When</span>
              <input
                type="text"
                value={searchWhen}
                onChange={(e) => setSearchWhen(e.target.value)}
                placeholder="Dates"
                className="bg-transparent border-none p-0 text-xs font-semibold text-neutral-800 focus:ring-0 outline-none w-full"
              />
            </div>

            <div className="h-6 w-px bg-neutral-200 hidden md:block" />

            {/* Price */}
            <div className="flex flex-col px-3 py-1 min-w-[90px] flex-1">
              <span className="text-[8px] font-bold uppercase text-neutral-400 tracking-wider">Price</span>
              <select
                value={searchPrice}
                onChange={(e) => setSearchPrice(e.target.value)}
                className="bg-transparent border-none p-0 text-xs font-semibold text-neutral-800 focus:ring-0 outline-none cursor-pointer w-full appearance-none pr-4"
              >
                <option value="all">Any Price</option>
                <option value="budget">Budget (&lt;$200)</option>
                <option value="mid">Mid ($200-$1000)</option>
                <option value="luxury">Luxury (&gt;$1000)</option>
              </select>
            </div>

            <div className="h-6 w-px bg-neutral-200 hidden md:block" />

            {/* Guests */}
            <div className="flex flex-col px-3 py-1 min-w-[80px] flex-1">
              <span className="text-[8px] font-bold uppercase text-neutral-400 tracking-wider font-mono">Guests</span>
              <input
                type="text"
                value={searchAttendees}
                onChange={(e) => setSearchAttendees(e.target.value)}
                placeholder="Guests"
                className="bg-transparent border-none p-0 text-xs font-semibold text-neutral-800 focus:ring-0 outline-none w-full"
              />
            </div>

            {/* Clear Filter Button */}
            {(searchWhat || searchWhere !== 'Savannah, GA' || searchWhen !== 'Oct 18 - Oct 20' || searchPrice !== 'all' || searchAttendees !== '4 Guests') && (
              <button
                onClick={() => {
                  setSearchWhat('');
                  setSearchWhere('Savannah, GA');
                  setSearchWhen('Oct 18 - Oct 20');
                  setSearchPrice('all');
                  setSearchAttendees('4 Guests');
                }}
                className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer px-2"
                title="Clear All Filters"
              >
                Clear
              </button>
            )}

            {/* Search CTA — routes user to the matching category marketplace.
                If no location is set, show a nudge and stay on the page (no intent gate). */}
            <button
              type="button"
              onClick={() => {
                if (!searchWhat.trim()) {
                  showToast('Please select what you are looking for');
                  return;
                }
                if (!searchWhere.trim()) {
                  showToast('Please set your location to continue');
                  // Focus the Location input so the user can type it
                  const locInput = document.querySelector('input[placeholder="Location"]') as HTMLInputElement | null;
                  if (locInput) locInput.focus();
                  return;
                }
                const matchedTaxonomy = filteredWhatSuggestions.find(
                  item => item.name.toLowerCase() === searchWhat.trim().toLowerCase()
                ) || filteredWhatSuggestions[0];
                const targetRoute = matchedTaxonomy?.route || '/services';
                navigate(`${targetRoute}?location=${encodeURIComponent(searchWhere)}&q=${encodeURIComponent(searchWhat)}`);
              }}
              className="bg-neutral-900 text-white px-4 py-2.5 rounded-xl flex items-center justify-center gap-1.5 hover:bg-champagne-gold hover:text-black transition-colors shrink-0 cursor-pointer border-none font-bold text-xs uppercase tracking-wider w-full sm:w-auto order-last sm:order-none"
            >
              <span className="material-symbols-outlined text-base">search</span>
              Search
            </button>
          </div>
        </div>

        {/* Main Workspace Stage */}
        <div className="w-full relative">
          <AnimatePresence mode="wait">

            {/* TAB 1: CATEGORIES */}
            {activeTab === 'categories' && (
              <React.Fragment>
                {step === 1 ? (
                  <motion.div
                    key="cat-step1"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.15 }}
                    className="space-y-10"
                  >
                    {SURFACES_TAXONOMY_GROUPS.map((group, gIdx) => {
                      return (
                        <div key={gIdx} className="space-y-4 text-left">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-800">
                              <span className="material-symbols-outlined text-lg leading-none select-none">
                                {mapLucideToMaterial(group.icon)}
                              </span>
                            </div>
                            <div>
                              <h2 className="text-base font-serif font-bold text-neutral-900 leading-none">
                                {group.groupName}
                              </h2>
                              <p className="text-[11px] text-neutral-400 font-serif mt-1">
                                {group.desc}
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                            {group.items.map((cat) => {
                              return (
                                <div
                                  key={cat.id}
                                  onClick={() => {
                                    setSearchWhat(cat.name);
                                    updateSearchParams({ tab: 'categories', id: cat.id });
                                  }}
                                  className="group bg-white rounded-2xl border border-neutral-200/80 p-5 flex flex-col justify-between hover:border-champagne-gold/40 hover:shadow-lg transition-all duration-300 cursor-pointer h-[160px] text-left"
                                >
                                  <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                      <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-neutral-100 text-neutral-800 group-hover:bg-champagne-gold/10 group-hover:text-champagne-gold transition-colors shrink-0">
                                        <span className="material-symbols-outlined text-lg leading-none select-none group-hover:text-champagne-gold">
                                          {mapLucideToMaterial(cat.icon)}
                                        </span>
                                      </div>
                                      <h3 className="font-serif font-bold text-sm text-neutral-900 group-hover:text-champagne-gold transition-colors truncate">
                                        {cat.name}
                                      </h3>
                                    </div>
                                    <p className="text-[11px] text-neutral-500 font-serif leading-relaxed line-clamp-2">
                                      {cat.desc}
                                    </p>
                                  </div>
                                  <div className="flex items-center justify-between pt-2.5 border-t border-neutral-100 text-[9px] font-mono text-neutral-400 group-hover:text-neutral-700 transition-colors">
                                    <span>EXPLORE SERVICES</span>
                                    <span className="material-symbols-outlined text-sm leading-none select-none text-neutral-300 group-hover:text-champagne-gold group-hover:translate-x-0.5 transition-all">chevron_right</span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </motion.div>
                ) : (
                  activeCategory && (
                    <motion.div
                      key="cat-step2"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.15 }}
                      className="bg-white rounded-2xl border border-neutral-200/80 p-6 md:p-8 space-y-6 w-full text-left"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-neutral-100">
                        <div>
                          <h3 className="text-lg font-serif font-bold text-neutral-900 flex items-center gap-2">
                            <span className="material-symbols-outlined text-xl leading-none select-none text-champagne-gold">
                              {mapLucideToMaterial(activeCategory.icon)}
                            </span>
                            {activeCategory.name} Services
                          </h3>
                          <p className="text-xs text-neutral-500 font-serif mt-0.5">
                            Browse specific specialties within {activeCategory.name}. Click any specialty to search verified local service partners.
                          </p>
                        </div>
                        
                        <button
                          onClick={() => navigate(`${activeCategory.route}?origin=categories&originId=${activeCategory.id}&originName=${encodeURIComponent(activeCategory.name)}&location=${encodeURIComponent(searchWhere)}&q=${encodeURIComponent(activeCategory.name)}`)}
                          className="px-4 py-2 bg-neutral-900 hover:bg-champagne-gold hover:text-black text-white text-[10px] font-mono font-bold tracking-wider uppercase rounded-xl transition-all duration-200 cursor-pointer shadow-sm border-none self-start"
                        >
                          View Entire Directory →
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {activeCategory.subcategories.map((sub, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              // Populate the PlanBar's What field with the selected subcategory
                              // so the user can review, add location, and click search — no intent gate.
                              setSearchWhat(sub);
                              // Auto-scroll to the top search bar so the user sees their selection
                              if (typeof window !== 'undefined') {
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }
                            }}
                            className="flex items-center justify-between p-4 rounded-xl border border-neutral-100 hover:border-champagne-gold/30 hover:bg-neutral-50/50 text-left transition-all duration-150 cursor-pointer bg-white group w-full"
                          >
                            <span className="text-xs font-serif font-bold text-neutral-700 group-hover:text-champagne-gold transition-colors leading-tight">
                              {sub}
                            </span>
                            <span className="material-symbols-outlined text-sm leading-none select-none text-neutral-300 group-hover:text-champagne-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-2">north_east</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )
                )}
              </React.Fragment>
            )}

            {/* TAB 2: OCCASIONS */}
            {activeTab === 'occasions' && (
              <React.Fragment>
                {step === 1 && (
                  <motion.div
                    key="occ-step1"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.15 }}
                    className="space-y-10"
                  >
                    {OCCASIONS_TAXONOMY_GROUPS.map((group, gIdx) => {
                      return (
                        <div key={gIdx} className="space-y-4 text-left">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-800">
                              <span className="material-symbols-outlined text-lg leading-none select-none">
                                {mapLucideToMaterial(group.icon)}
                              </span>
                            </div>
                            <div>
                              <h2 className="text-base font-serif font-bold text-neutral-900 leading-none">
                                {group.groupName}
                              </h2>
                              <p className="text-[11px] text-neutral-400 font-serif mt-1">
                                {group.desc}
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                            {group.items.map((item) => {
                              return (
                                <div
                                  key={item.id}
                                  onClick={() => {
                                    setSearchWhat(item.name);
                                    updateSearchParams({ tab: 'occasions', id: item.id });
                                  }}
                                  className="group bg-white rounded-2xl border border-neutral-200/80 p-5 flex flex-col justify-between hover:border-champagne-gold/40 hover:shadow-lg transition-all duration-300 cursor-pointer h-[160px] text-left"
                                >
                                  <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                      <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-neutral-100 text-neutral-800 group-hover:bg-champagne-gold/10 group-hover:text-champagne-gold transition-colors shrink-0">
                                        <span className="material-symbols-outlined text-lg leading-none select-none group-hover:text-champagne-gold">
                                          {getOccasionIcon(item.id)}
                                        </span>
                                      </div>
                                      <h3 className="font-serif font-bold text-sm text-neutral-900 group-hover:text-champagne-gold transition-colors truncate">
                                        {item.name}
                                      </h3>
                                    </div>
                                    <p className="text-[11px] text-neutral-500 font-serif leading-relaxed line-clamp-2">
                                      {item.desc}
                                    </p>
                                  </div>
                                  <div className="flex items-center justify-between pt-2.5 border-t border-neutral-100 text-[9px] font-mono text-neutral-400 group-hover:text-neutral-700 transition-colors">
                                    <span>VIEW SERVICES</span>
                                    <span className="material-symbols-outlined text-sm leading-none select-none text-neutral-300 group-hover:text-champagne-gold group-hover:translate-x-0.5 transition-all">chevron_right</span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </motion.div>
                )}

                {step === 2 && activeOccasion && (
                  <motion.div
                    key="occ-step2"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.15 }}
                    className="bg-white rounded-2xl border border-neutral-200/80 p-6 md:p-8 space-y-6 w-full text-left"
                  >
                    <div className="pb-4 border-b border-neutral-100">
                      <h3 className="text-lg font-serif font-bold text-neutral-900 flex items-center gap-2">
                        <span className="material-symbols-outlined text-xl leading-none select-none text-champagne-gold">
                          {getOccasionIcon(activeOccasion.id)}
                        </span>
                        {activeOccasion.name} Planning Guide
                      </h3>
                      <p className="text-xs text-neutral-500 font-serif mt-0.5">
                        Select an event style below to see curated service pairings recommended for your celebration.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {activeOccasion.subtypes.map((sub, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setSearchWhat(sub.name);
                            updateSearchParams({ tab: 'occasions', id: activeOccasion.id, subtype: sub.name });
                          }}
                          className="flex items-center justify-between p-4 rounded-xl border border-neutral-100 hover:border-champagne-gold/30 hover:bg-neutral-50/50 text-left transition-all duration-150 cursor-pointer bg-white group w-full"
                        >
                          <div className="flex flex-col">
                            <span className="text-xs font-serif font-bold text-neutral-700 group-hover:text-champagne-gold transition-colors leading-tight">
                              {sub.name}
                            </span>
                            <span className="text-[9px] font-mono text-neutral-400 mt-1 uppercase">
                              {sub.services.length} services recommended
                            </span>
                          </div>
                          <span className="material-symbols-outlined text-sm leading-none select-none text-neutral-300 group-hover:text-champagne-gold group-hover:translate-x-0.5 transition-all shrink-0 ml-2">chevron_right</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 3 && activeOccasion && selectedSubtypeName && (
                  (() => {
                    const activeSubtype = activeOccasion.subtypes.find(s => s.name === selectedSubtypeName);
                    const routeMap: Record<string, string> = {
                      "spaces": "/spaces",
                      "food-drink": "/food-drink",
                      "live-shows": "/live-shows",
                      "vendors": "/vendors",
                      "plan": "/plan",
                      "services": "/services",
                      "things-to-do": "/things-to-do",
                      "travel": "/travel",
                      "party": "/party"
                    };

                    return (
                      <motion.div
                        key="occ-step3"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.15 }}
                        className="bg-white rounded-2xl border border-neutral-200/80 p-6 md:p-8 space-y-6 w-full text-left"
                      >
                        <div className="pb-4 border-b border-neutral-100">
                          <h3 className="text-lg font-serif font-bold text-neutral-900 flex items-center gap-2">
                            <span className="material-symbols-outlined text-xl leading-none select-none text-champagne-gold">
                              {getOccasionIcon(activeOccasion.id)}
                            </span>
                            {selectedSubtypeName} Services
                          </h3>
                          <p className="text-xs text-neutral-500 font-serif mt-0.5">
                            Browse specific services recommended for a {selectedSubtypeName}. Click any service to find verified local partner listings.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                          {activeSubtype?.services.map((srv, idx) => {
                            const categoryLens = getCategoryForService(srv);

                            return (
                              <button
                                key={idx}
                                onClick={() => {
                                  // Populate the PlanBar's What field with the selected service
                                  // so the user can review, add location, and click search — no intent gate.
                                  setSearchWhat(srv);
                                  if (typeof window !== 'undefined') {
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                  }
                                }}
                                className="flex items-center justify-between p-4 rounded-xl border border-neutral-100 hover:border-champagne-gold/30 hover:bg-neutral-50/50 text-left transition-all duration-150 cursor-pointer bg-white group w-full"
                              >
                                <div className="flex flex-col">
                                  <span className="text-xs font-serif font-bold text-neutral-700 group-hover:text-champagne-gold transition-colors leading-tight">
                                    {srv}
                                  </span>
                                  <span className="text-[9px] font-mono text-neutral-400 mt-1 uppercase">
                                    {categoryLens.replace('-', ' ')} Service
                                  </span>
                                </div>
                                <span className="material-symbols-outlined text-sm leading-none select-none text-neutral-300 group-hover:text-champagne-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-2">north_east</span>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    );
                  })()
                )}
              </React.Fragment>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
