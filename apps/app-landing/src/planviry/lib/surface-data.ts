import { CategoryLens } from '../types';

export interface SurfaceInfo {
  title: string;
  copy: string;
  heroImage: string;
  whatOptions: string[];
}

export const SURFACE_DATA: Record<CategoryLens, SurfaceInfo> = {
  services: {
    title: "Services",
    copy: "Bespoke planning, consulting, luxury design, and concierge services tailored for your hosts and attendees.",
    heroImage: "/gates/services.jpg",
    whatOptions: [
      "Wedding Planners",
      "Corporate Occasion Planners",
      "Gala Occasion Planners",
      "Destination Occasion Planners",
      "Adult Birthday Party Planners",
      "Kids Birthday Party Planners",
      "Bar & Bat Mitzvah Planners",
      "Baby Shower Planners",
      "Travel Agents",
      "Vacation Rental Agents"
    ]
  },
  plan: {
    title: "Logistics & Planning",
    copy: "Collaboratively map, assign, and track every logistical milestone for your high-stakes occasions.",
    heroImage: "/gates/services.jpg",
    whatOptions: [
      "Photo shoot",
      "Workshop",
      "Meeting",
      "Wedding reception",
      "Birthday party",
      "Live music",
      "Video shoot",
      "Party",
      "Baby shower",
      "Music video",
      "Bridal shower",
      "Pop-up",
      "Occasion",
      "Gala",
      "Engagement party",
      "Film shoot",
      "Corporate occasion",
      "Graduation party",
      "Anniversary"
    ]
  },
  'things-to-do': {
    title: "Things to Do",
    copy: "Curate a rich list of local attractions, dynamic group adventures, and immersive tours for your guests.",
    heroImage: "/gates/travel.jpg",
    whatOptions: [
      "Art Show",
      "Climbing Wall",
      "Happy Hour",
      "Boats & Water Activities"
    ]
  },
  'food-drink': {
    title: "Food & Drink",
    copy: "Partner with premier local caterers and reserve private rooms at award-winning dining establishments.",
    heroImage: "/gates/food-drink.jpg",
    whatOptions: [
      "Restaurants",
      "Catering",
      "Dining"
    ]
  },
  'live-shows': {
    title: "Live Shows",
    copy: "Secure group seating and premium access to local concerts, theatrical productions, and live sporting events.",
    heroImage: "/gates/food-drink.jpg",
    whatOptions: [
      "Concerts",
      "Sports",
      "Theater",
      "Comedy"
    ]
  },
  travel: {
    title: "Travel & Stays",
    copy: "Bespoke travel coordination, flight booking, premium car rentals, and luxury accommodations.",
    heroImage: "/gates/travel.jpg",
    whatOptions: [
      "Places to stay",
      "Flights",
      "Cars",
      "Destinations",
      "Group Trip"
    ]
  },
  party: {
    title: "Party & Celebration",
    copy: "Design a spectacular celebration with dedicated coordinators, party supply rentals, and premium entertainment.",
    heroImage: "/gates/services.jpg",
    whatOptions: [
      "Karaoke Bar",
      "Holiday Parties",
      "Dinner Parties",
      "Bachelorette",
      "Bachelor",
      "Birthday",
      "Group Trip",
      "New Year's Eve Party",
      "Thanksgiving Party",
      "Elopement Party",
      "Engagement Party",
      "Holiday Party",
      "Baby shower",
      "Graduation party"
    ]
  },
  spaces: {
    title: "Bespoke Spaces",
    copy: "Discover and secure breathtaking venues, rooftop terraces, elegant estates, and grand banquet halls.",
    heroImage: "/gates/spaces.jpg",
    whatOptions: [
      "Restaurants",
      "Hotels",
      "Museums",
      "Outdoor",
      "Resorts",
      "Boats",
      "Theaters",
      "Farms",
      "Banquet Hall",
      "Wineries",
      "Occasion Spaces",
      "Country Clubs",
      "Estates",
      "Mansions",
      "Meeting Spaces",
      "Waterfront Venues",
      "Rooftop",
      "Auditorium",
      "Content House",
      "Cottage"
    ]
  },
  vendors: {
    title: "Vetted Partners",
    copy: "Hire top-tier local professionals, from skilled event staff to master photographers and florists.",
    heroImage: "/gates/vendors.jpg",
    whatOptions: [
      "Audio Visual Equipment Rental",
      "Caterer",
      "DJ",
      "Entertainer",
      "Occasion Planner",
      "Occasion Staffing",
      "Florist",
      "Live Music",
      "Officiant",
      "Party Equipment Rental",
      "Photographer",
      "Transportation Provider"
    ]
  },
  compose: {
    title: "Composition",
    copy: "One instrument that composes venue, travel, vendors, tickets and cover into a single, unbreakable score.",
    heroImage: "/gates/compose.jpg",
    whatOptions: [
      "Wedding Composition",
      "Summit Composition",
      "Retreat Composition",
      "Concert Composition",
      "Gala Composition",
      "Bachelor Composition",
      "Product Launch",
      "IPO Dinner"
    ]
  },
  concierge: {
    title: "Concierge",
    copy: "White-glove planners, coordinators, and concierge professionals tailored for your hosts and attendees.",
    heroImage: "/gates/services.jpg",
    whatOptions: [
      "Wedding Planners",
      "Corporate Occasion Planners",
      "Gala Occasion Planners",
      "Destination Occasion Planners",
      "Adult Birthday Party Planners",
      "Kids Birthday Party Planners",
      "Bar & Bat Mitzvah Planners",
      "Baby Shower Planners",
      "Travel Agents",
      "Vacation Rental Agents"
    ]
  }
};
