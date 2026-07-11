// Custom data for the Planviry majestic Z-Pattern Grid and Dynamic Preview Overlay
import React from 'react';

export interface LedgerItem {
  name: string;
  cost: string;
  category: string;
}

export interface ItineraryItem {
  time: string;
  activity: string;
  vendor: string;
}

export interface ZCardData {
  id: string;
  title: string;
  location?: string;
  badge: string;
  category: string;
  description: string;
  imageUrl: string;
  totalCost: string;
  iconName: string;
  ledgerItems: LedgerItem[];
  itinerary: ItineraryItem[];
  moatHighlight?: string;
}

export const EVENT_ARCHETYPES: ZCardData[] = [
  {
    id: 'PV-EVT-01',
    title: 'Destination Wedding',
    location: 'Tuscany, Italy',
    badge: 'LUXURY SCOUTED',
    category: 'Spaces',
    description: 'A romantic wedding block in an ancient Florentine vineyard, incorporating group air blocks, local Michelin catering, and DMCA-vetted cinematography.',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    totalCost: '$12,900',
    iconName: 'Heart',
    ledgerItems: [
      { name: 'Florentine Vineyard Villa Block', cost: '$4,800', category: 'Spaces' },
      { name: 'Alitalia Group Air Travel Blocks', cost: '$3,400', category: 'Travel' },
      { name: 'Certified Organic Tuscan Banquet', cost: '$2,700', category: 'Vendors' },
      { name: 'High-Fidelity Cinema & Photography', cost: '$2,000', category: 'Vendors' }
    ],
    itinerary: [
      { time: '11:00 AM', activity: 'Private Charter Arrival & Check-in', vendor: 'Florentine Estates' },
      { time: '04:30 PM', activity: 'Vineyard Sunset Exchange', vendor: 'Certified Officiants' },
      { time: '07:30 PM', activity: 'Candelabra Courtyard Dinner', vendor: 'Michelin Star Catering' }
    ],
    moatHighlight: 'One Unified Booking: Combine historical lodging with group flights & catering contracts on a single escrow ledger.'
  },
  {
    id: 'PV-EVT-02',
    title: 'Corporate Retreat',
    location: 'Uluwatu, Bali',
    badge: 'ENTERPRISE VETTED',
    category: 'Travel',
    description: 'An intensive alignment retreat overlooking the Indian Ocean. Features cliffside accommodation, premium group excursions, and private airport logistics.',
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    totalCost: '$9,450',
    iconName: 'Briefcase',
    ledgerItems: [
      { name: 'Cliffside Infinity Pool Resort Block', cost: '$5,200', category: 'Spaces' },
      { name: 'Premium Airport Group Logistics', cost: '$1,250', category: 'Travel' },
      { name: 'Guided Team Canyoning Excursion', cost: '$1,800', category: 'Things to Do' },
      { name: 'Local Seafood Beachfront Banquet', cost: '$1,200', category: 'Food & Drink' }
    ],
    itinerary: [
      { time: '09:00 AM', activity: 'State of the Union Summit', vendor: 'Conference Pavilion' },
      { time: '02:00 PM', activity: 'Uluwatu River Gorge Canyoning', vendor: 'Adventure Bali' },
      { time: '07:30 PM', activity: 'Sunset Beachfront Networking', vendor: 'Jimbaran Catering' }
    ],
    moatHighlight: 'Consolidated Billing: Issue one single invoice to corporate accounts for air, hotel, and team workshops combined.'
  },
  {
    id: 'PV-EVT-03',
    title: 'Milestone 40th Birthday',
    location: 'Paris, France',
    badge: 'CURATED PLATINUM',
    category: 'Food & Drink',
    description: 'A weekend of artistic and culinary indulgence in the heart of Paris, spanning a boutique hotel block, private Seine cruise, and premium cabaret seating.',
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
    totalCost: '$7,800',
    iconName: 'Utensils',
    ledgerItems: [
      { name: 'Haussmann Boutique Suite Blocks', cost: '$3,800', category: 'Spaces' },
      { name: 'Private Yacht Seine Tasting Dinner', cost: '$2,200', category: 'Food & Drink' },
      { name: 'VIP Cabaret Front-Row Experience', cost: '$1,800', category: 'Live Shows' }
    ],
    itinerary: [
      { time: '03:00 PM', activity: 'Private Louvre Gallery Curated Tour', vendor: 'Louvre Guides' },
      { time: '07:00 PM', activity: 'Seine Yacht Tasting Boarding', vendor: 'Seine Charters' },
      { time: '10:15 PM', activity: 'Champagne Front-Row Cabaret', vendor: 'Lido Paris' }
    ],
    moatHighlight: 'Connected Schedules: Flight arrivals, hotel room keys, and yacht boarding times sync instantly onto the group timeline.'
  },
  {
    id: 'PV-EVT-04',
    title: 'VIP Concert Weekend',
    location: 'Las Vegas, USA',
    badge: 'HIGH-ROLLER VIP',
    category: 'Live Shows',
    description: 'An electric luxury weekend with front-row concert access, premier penthouse lodging, and private luxury limousine transit.',
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    totalCost: '$5,950',
    iconName: 'Music',
    ledgerItems: [
      { name: 'Skylofts at MGM Grand Penthouse', cost: '$3,100', category: 'Spaces' },
      { name: 'VIP Front-Row Concert Passes', cost: '$1,600', category: 'Live Shows' },
      { name: 'Private Airport Limo & Transit', cost: '$1,250', category: 'Travel' }
    ],
    itinerary: [
      { time: '01:00 PM', activity: 'High-Roller Check-In Reception', vendor: 'MGM Skylofts' },
      { time: '07:30 PM', activity: 'Arena Concert Escorted Entry', vendor: 'Live Nation VIP' },
      { time: '11:30 PM', activity: 'VIP Nightclub Table Placement', vendor: 'XS Las Vegas' }
    ],
    moatHighlight: 'Real-Time Sync: Concert ticket barcode and hotel check-in triggers merge onto co-planning interfaces.'
  },
  {
    id: 'PV-EVT-05',
    title: 'Enterprise Conference',
    location: 'London, UK',
    badge: 'GLOBAL CONVENTION',
    category: 'Spaces',
    description: 'A fully consolidated enterprise seminar hosting 120 guests, bringing together an iconic glass venue loft, premium catering, and high-fidelity AV.',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    totalCost: '$18,500',
    iconName: 'Compass',
    ledgerItems: [
      { name: 'The Shard Glass Landmark Loft', cost: '$9,500', category: 'Spaces' },
      { name: 'High-Fidelity 8K AV Production Rig', cost: '$4,200', category: 'Vendors' },
      { name: 'Artisanal Organic Lunch & Espresso', cost: '$4,800', category: 'Food & Drink' }
    ],
    itinerary: [
      { time: '08:00 AM', activity: 'Attendee Registration & Espresso', vendor: 'Barista Group' },
      { time: '10:00 AM', activity: 'Keynote & Interactive Panel', vendor: 'Shard AV Crew' },
      { time: '01:00 PM', activity: 'Networking Buffet & Live Violinist', vendor: 'London Catering' }
    ],
    moatHighlight: 'SLA Escrow Protection: Funds disbursed to AV technicians and caterers only after milestones are verified.'
  },
  {
    id: 'PV-EVT-06',
    title: 'Riviera Family Reunion',
    location: 'Cancun, Mexico',
    badge: 'FAMILY FAVORITE',
    category: 'Travel',
    description: 'A multi-generational reunion spanning beachfront private villa blocks, chartered snorkeling catamarans, and sunset beachside catering.',
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    totalCost: '$8,200',
    iconName: 'Users',
    ledgerItems: [
      { name: 'Mayan Riviera Beach Villa Blocks', cost: '$4,500', category: 'Spaces' },
      { name: 'Private Catamaran Snorkel Charter', cost: '$2,200', category: 'Things to Do' },
      { name: 'Traditional Beachside Taco Station', cost: '$1,500', category: 'Food & Drink' }
    ],
    itinerary: [
      { time: '10:00 AM', activity: 'Snorkeling Catamaran Sailing', vendor: 'Cancun Yachting' },
      { time: '03:00 PM', activity: 'Family Poolside Gathering', vendor: 'Mayan Estates' },
      { time: '06:30 PM', activity: 'Beachfront Candlelit Taco Fiesta', vendor: 'Chef de Cuisine' }
    ],
    moatHighlight: 'Transparent Cost-Splitting: Family members opt in to pay their portion of lodging and yachting directly in-app.'
  },
  {
    id: 'PV-EVT-07',
    title: 'Elite Bachelorette Weekend',
    location: 'Las Vegas, NV',
    badge: 'EXCLUSIVE BRIDE',
    category: 'Party',
    description: 'A glamorous, high-energy weekend featuring a custom 3-bedroom luxury terrace suite, VIP lounge bottle service, and private SUV transfers.',
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
    totalCost: '$6,800',
    iconName: 'Sparkles',
    ledgerItems: [
      { name: 'Boutique Luxury Penthouse Suites', cost: '$3,200', category: 'Spaces' },
      { name: 'VIP Ultra-Lounge Bottle Service', cost: '$2,400', category: 'Party' },
      { name: 'Luxury Stretch SUV Chauffeur', cost: '$1,200', category: 'Travel' }
    ],
    itinerary: [
      { time: '04:00 PM', activity: 'Cocktail Toast & Masterclass', vendor: 'Terrace Penthouse' },
      { time: '08:30 PM', activity: 'Fine Dining Pan-Asian Banquet', vendor: 'TAO Las Vegas' },
      { time: '11:00 PM', activity: 'VIP Nightclub Escorted Admission', vendor: 'Omnia Club' }
    ],
    moatHighlight: 'Shared Co-planning: The wedding party votes on menus, dates, and VIP tables collaboratively.'
  },
  {
    id: 'PV-EVT-08',
    title: 'Aspen Luxury Ski Summit',
    location: 'Aspen, CO',
    badge: 'ALPINE PRESTIGE',
    category: 'Travel',
    description: 'A pristine alpine excursion combining a ski-in/ski-out timber chalet, professional private ski guides, and exclusive après-ski catering.',
    imageUrl: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=800&q=80',
    totalCost: '$11,600',
    iconName: 'Compass',
    ledgerItems: [
      { name: 'Timberland Alpine Chalet Block', cost: '$6,800', category: 'Spaces' },
      { name: 'Private Elite Mountain Ski Guides', cost: '$2,400', category: 'Things to Do' },
      { name: 'Après-Ski Fireplace Craft Buffet', cost: '$2,400', category: 'Food & Drink' }
    ],
    itinerary: [
      { time: '08:30 AM', activity: 'First-Track Mountain Escort', vendor: 'Aspen Guides' },
      { time: '03:00 PM', activity: 'S’mores & Hot Toddy Gathering', vendor: 'Chalet Concierge' },
      { time: '07:30 PM', activity: 'Private Chef Fireside Feast', vendor: 'Chef’s Table Co.' }
    ],
    moatHighlight: 'All-inclusive escrow handles gear delivery, lift cards, and mountain chalets on one ticket.'
  },
  {
    id: 'PV-EVT-09',
    title: 'Island Yacht Charter',
    location: 'Exuma, Bahamas',
    badge: 'YACHTING PREMIER',
    category: 'Things to Do',
    description: 'A completely customized yacht charter sailing crystal waters, with a professional maritime crew, and a dedicated marine biologist guide.',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    totalCost: '$14,500',
    iconName: 'Zap',
    ledgerItems: [
      { name: '75ft Luxury Sailing Catamaran', cost: '$9,800', category: 'Things to Do' },
      { name: 'Licensed Skipper & Private Crew', cost: '$2,700', category: 'Vendors' },
      { name: 'Bahamian Reef Marine Biologist Tour', cost: '$2,000', category: 'Things to Do' }
    ],
    itinerary: [
      { time: '09:00 AM', activity: 'Rigging Brief & Sail Setting', vendor: 'Exuma Yacht Club' },
      { time: '01:00 PM', activity: 'Sandbar Seafood Picnic Lunch', vendor: 'Yacht Crew' },
      { time: '04:30 PM', activity: 'Snorkeling Coral Conservation Area', vendor: 'Eco-Adventures' }
    ],
    moatHighlight: 'Certified Maritime Escrow: Fully legal contracts protecting yacht rentals and staff disbursements.'
  },
  {
    id: 'PV-EVT-10',
    title: 'Historic Savannah Gala',
    location: 'Savannah, GA',
    badge: 'HISTORIC REVERIE',
    category: 'Party',
    description: 'An elegant soirée under Spanish moss, coordinating an antebellum private estate, a live jazz sextet, and high-end Southern dining.',
    imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
    totalCost: '$8,900',
    iconName: 'Sparkles',
    ledgerItems: [
      { name: 'Antebellum Manor Private Rental', cost: '$4,200', category: 'Spaces' },
      { name: 'Live Jazz Sextet Orchestration', cost: '$2,200', category: 'Vendors' },
      { name: 'Elevated Southern Fusion Banquet', cost: '$2,500', category: 'Food & Drink' }
    ],
    itinerary: [
      { time: '05:30 PM', activity: 'Stained Glass Cocktail Hour', vendor: 'Manor Staff' },
      { time: '07:00 PM', activity: 'Live Jazz & Dinner Presentation', vendor: 'Savannah Strings' },
      { time: '10:00 PM', activity: 'Starlight Veranda Digestif Service', vendor: 'Boutique Bar' }
    ],
    moatHighlight: 'Single-SLA Execution: Vendor setups and property clearance criteria consolidated under a unified platform agreement.'
  }
];

export const PLANVIRY_MODULES: ZCardData[] = [
  {
    id: 'PV-MOD-01',
    title: 'Event Planning & Coordination',
    badge: 'CORE MODULE 1',
    category: 'Coordination',
    description: 'Dynamic digital co-planning space with live voting polls, budgeting sheets, and real-time coordinator access for high-stakes events.',
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
    totalCost: 'PLATFORM ACCESS',
    iconName: 'Briefcase',
    ledgerItems: [
      { name: 'Interactive Workspace Engine', cost: 'Included', category: 'Core' },
      { name: 'Group Voting & Decisions Tracker', cost: 'Active', category: 'Core' },
      { name: 'Live Coordinator Liaison Assist', cost: 'On-Demand', category: 'Core' }
    ],
    itinerary: [
      { time: 'Phase 1', activity: 'Assemble group, set dates & key targets', vendor: 'Planviry Workspace' },
      { time: 'Phase 2', activity: 'Launch co-planning surveys & choices', vendor: 'Planviry Engine' }
    ],
    moatHighlight: 'Eliminates separate spreadsheets and disconnected chats. Groups co-curate everything in real-time.'
  },
  {
    id: 'PV-MOD-02',
    title: 'Venue & Accommodation Rentals',
    badge: 'CORE MODULE 2',
    category: 'Spaces',
    description: 'Direct bookings for luxury hotel blocks, historical estates, private villas, and modern brutalist spaces with guaranteed group rates.',
    imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    totalCost: 'DIRECT ACCOUNT',
    iconName: 'MapPin',
    ledgerItems: [
      { name: 'Global Certified Property Directory', cost: 'Guaranteed', category: 'Spaces' },
      { name: 'Bespoke Host Insurance Cover', cost: 'Complimentary', category: 'Spaces' }
    ],
    itinerary: [
      { time: 'Daily', activity: 'Automated guest rooming allocations', vendor: 'Host Interface' }
    ],
    moatHighlight: 'Vetted properties with verified registry filings and insurance checks before being listed.'
  },
  {
    id: 'PV-MOD-03',
    title: 'Destination Travel & Logistics',
    badge: 'CORE MODULE 3',
    category: 'Travel',
    description: 'Seamless group flights, black-car transfers, luxury limousine fleets, and private air charters integrated into your primary billing ledger.',
    imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80',
    totalCost: 'CONNECTED API',
    iconName: 'Plane',
    ledgerItems: [
      { name: 'Group Flight Coordination Router', cost: 'Active', category: 'Travel' },
      { name: 'Certified Chauffeur Escort Lines', cost: 'Active', category: 'Travel' }
    ],
    itinerary: [
      { time: 'Ongoing', activity: 'Real-time delay tracking & routing updates', vendor: 'Logistics Center' }
    ],
    moatHighlight: 'No more juggling external travel agency tabs. Group transport is part of your unified bill.'
  },
  {
    id: 'PV-MOD-04',
    title: 'Ticketing & Experiences',
    badge: 'CORE MODULE 4',
    category: 'Experiences',
    description: 'Instant ticket procurement for concerts, sporting events, VIP hospitality lounges, and highly restricted regional tours.',
    imageUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=800&q=80',
    totalCost: 'VERIFIED INVENTORY',
    iconName: 'Music',
    ledgerItems: [
      { name: 'Verified Seat Inventory Block', cost: 'Secured', category: 'Live Shows' },
      { name: 'Backstage & Hospitality Lounge Passes', cost: 'Upgraded', category: 'Live Shows' }
    ],
    itinerary: [
      { time: 'Entry', activity: 'Barcode generation and digital gate pass', vendor: 'Platform Pass' }
    ],
    moatHighlight: '100% authenticity guarantee with real-time seat locks synced to your schedule.'
  },
  {
    id: 'PV-MOD-05',
    title: 'Certified Boutique Vendors',
    badge: 'CORE MODULE 5',
    category: 'Vendors',
    description: 'Direct communication and binding contracts with vetted local planners, private chefs, decor artists, and professional live performers.',
    imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80',
    totalCost: 'SLA COMPLIANT',
    iconName: 'Utensils',
    ledgerItems: [
      { name: 'Background-Scrutinized Vendor Network', cost: 'Verified', category: 'Vendors' },
      { name: 'Uniform Service Level Agreement (SLA)', cost: 'Enforced', category: 'Vendors' }
    ],
    itinerary: [
      { time: 'Contract', activity: 'Signature tracking & escrow hold', vendor: 'Legal Escrow' }
    ],
    moatHighlight: 'Rigorous background check pipelines reject poor-quality stock listings instantly.'
  },
  {
    id: 'PV-MOD-06',
    title: 'Membership & Loyalty Multipliers',
    badge: 'CORE MODULE 6',
    category: 'Membership',
    description: 'High-status tier programs offering VIP lounge entry, premium concierge advisors, and unified cashback multipliers for larger group bills.',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    totalCost: 'CASHBACK ACTIVE',
    iconName: 'Award',
    ledgerItems: [
      { name: 'Tier-Multiplier Cash Reward Program', cost: 'Active', category: 'Loyalty' },
      { name: 'Priority Advisor Concierge Line', cost: '24/7 Live', category: 'Loyalty' }
    ],
    itinerary: [
      { time: 'Checkout', activity: 'Points credited & split applied', vendor: 'Loyalty Desk' }
    ],
    moatHighlight: 'Unified group spend earns points across all verticals—flights, villas, and catering.'
  },
  {
    id: 'PV-MOD-07',
    title: 'High-Stakes Travel Insurance',
    badge: 'CORE MODULE 7',
    category: 'Insurance',
    description: 'Dynamic event cancellation hedging and comprehensive international traveler coverages integrated directly at checkout.',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    totalCost: 'SECURED PROTECTION',
    iconName: 'ShieldCheck',
    ledgerItems: [
      { name: 'Unified Event Interruption Protection', cost: 'Premium Cover', category: 'Insurance' },
      { name: 'Group Flight Medical & Interruption Hedges', cost: 'Complimentary', category: 'Insurance' }
    ],
    itinerary: [
      { time: 'Active', activity: '24-hour weather/force majeure monitoring', vendor: 'Insurance Desk' }
    ],
    moatHighlight: 'Provides event interruption hedges linked directly to vendor booking statuses.'
  },
  {
    id: 'PV-MOAT-01',
    title: 'The Unified Checkout Cart',
    badge: 'OUR COVETED MOAT',
    category: 'Moat',
    description: 'Our proprietary multi-vendor transaction routing system, enabling you to check out with multiple independent partners on a single charge.',
    imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1d704d3?auto=format&fit=crop&w=800&q=80',
    totalCost: 'ONE PAYMENT',
    iconName: 'CreditCard',
    ledgerItems: [
      { name: 'Split-Escrow Smart Routing Fee', cost: 'No Markup', category: 'Moat' },
      { name: 'Stripe Secure Merchant Interface', cost: 'Active', category: 'Moat' }
    ],
    itinerary: [
      { time: 'Checkout', activity: 'One click purchases flights, villas & catering', vendor: 'Unified Escrow' }
    ],
    moatHighlight: 'Unlike other systems, users execute separate agreements with certified partners with just a single checkout.'
  },
  {
    id: 'PV-MOAT-02',
    title: 'The Connected Live Itinerary',
    badge: 'OUR COVETED MOAT',
    category: 'Moat',
    description: 'No more disconnected spreadsheets. Every reservation—from flights to dinner to cabaret—is automatically mapped onto a shared timeline.',
    imageUrl: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=800&q=80',
    totalCost: 'CONNECTED TIMELINE',
    iconName: 'Clock',
    ledgerItems: [
      { name: 'Live Collaborative Group Schedule', cost: 'Synchronized', category: 'Moat' },
      { name: 'Push-Based Reservation Update Lines', cost: 'Active', category: 'Moat' }
    ],
    itinerary: [
      { time: 'Live', activity: 'Co-planners track real-time calendar updates', vendor: 'Sync Engine' }
    ],
    moatHighlight: 'Instantly alerts co-planning participants of any schedule modifications via web push.'
  },
  {
    id: 'PV-MOAT-03',
    title: 'Escrow Multi-Routing Payment',
    badge: 'OUR COVETED MOAT',
    category: 'Moat',
    description: 'We hold and distribute your planning funds safely to verified providers based on performance SLAs, protecting you from fraud and failures.',
    imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
    totalCost: 'SECURE ESCROW',
    iconName: 'Zap',
    ledgerItems: [
      { name: 'SLA-Linked Escrow Payment Holding', cost: 'Active', category: 'Moat' },
      { name: 'Stripe Connect Multi-Party Account Routing', cost: 'Active', category: 'Moat' }
    ],
    itinerary: [
      { time: 'Post-Event', activity: 'Escrow disbursement upon certified delivery', vendor: 'Payment Router' }
    ],
    moatHighlight: 'Funds stay secure until the event concludes, safeguarding both consumer capital and vendor execution.'
  }
];
