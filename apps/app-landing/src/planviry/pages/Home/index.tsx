import React, { useEffect, useState, useRef, useMemo } from "react";
import { Link, useNavigate } from "@/planviry/router";
import { useApp } from "../../context/AppContext";
import { searchZipCodes, type ZipSuggestion } from "../../lib/zipSearch";
import { searchTaxonomy } from "../../lib/taxonomySearch";
import {
  ArrowUpRight,
  ArrowRight,
  Bell,
  CalendarDays,
  Compass,
  UtensilsCrossed,
  Ticket,
  Plane,
  PartyPopper,
  Building2,
  Store,
  MapPin,
  PenLine,
  ShoppingBag,
  CalendarCheck,
  Search,
  ChevronDown,
  ChevronRight,
  Wallet,
  Users,
} from "lucide-react";
import { EVENT_ARCHETYPES } from "./home-data";
import { AtlasHero } from "./AtlasHero";
import { Composition } from "./Composition";
import { Strata } from "./Strata";
import { Corpus } from "./Corpus";
import { Tabula } from "./Tabula";
import { Regimen } from "./Regimen";
import { Modus, Enterprise, Civitas } from "./UnfoldSections";

const catWedding = "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80";
const catRetreat = "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80";
const catConcert = "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=800&q=80";
const catCity = "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80";
const heroEvent = "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1600&q=80";

const TILES = [
  { n: "01", title: "Concierge", desc: "White-glove personal service", tags: ["24/7 Support", "VIP"], Icon: Bell, path: "concierge" },
  { n: "02", title: "Plan", desc: "Itineraries, schedules & timelines", tags: ["Timeline", "RSVP"], Icon: CalendarDays, path: "plan" },
  { n: "03", title: "Things to Do", desc: "Curated experiences & activities", tags: ["Tours", "Local"], Icon: Compass, path: "things-to-do" },
  { n: "04", title: "Food & Drink", desc: "Dining, bars & exclusive tables", tags: ["Catering", "Chefs"], Icon: UtensilsCrossed, path: "food-drink" },
  { n: "05", title: "Live Shows", desc: "Concerts, theatre & performances", tags: ["Tickets", "VIP"], Icon: Ticket, path: "live-shows" },
  { n: "06", title: "Travel", desc: "Flights, transfers & packages", tags: ["Flights", "Transfers"], Icon: Plane, path: "travel" },
  { n: "07", title: "Party", desc: "Events, celebrations & VIP access", tags: ["Nightlife", "Tables"], Icon: PartyPopper, path: "party" },
  { n: "08", title: "Spaces", desc: "Venues, rooms & private settings", tags: ["Villas", "Estates"], Icon: Building2, path: "spaces" },
  { n: "09", title: "Partners", desc: "Photographers, caterers & more", tags: ["Categories"], Icon: Store, path: "vendors" },
];

const DIRECTORY = [
  { heading: "By Occasion", links: ["Weddings", "Retreats", "Birthdays", "Reunions", "Conferences", "Bachelor / Bachelorette"] },
  { heading: "By Service", links: ["Venues", "Partners", "Travel", "Food & Drink", "Live Shows", "Concierge"] },
  { heading: "By Region", links: ["Europe", "North America", "Asia", "Middle East", "Latin America", "Africa"] },
];

const CITIES = [
  "Tuscany", "Bali", "Paris", "New York", "Marrakech", "Lisbon",
  "Ibiza", "Tulum", "Kyoto", "Reykjavík", "Cape Town", "Dubai",
  "Cartagena", "Santorini", "Mexico City", "Mumbai",
];

const popularCities = [
  { city: "Tuscany",    country: "Italy"      },
  { city: "Bali",       country: "Indonesia"  },
  { city: "Paris",      country: "France"     },
  { city: "New York",   country: "USA"        },
  { city: "Cancún",     country: "Mexico"     },
  { city: "Marrakech",  country: "Morocco"    },
  { city: "Tokyo",      country: "Japan"      },
  { city: "Lisbon",     country: "Portugal"   },
  { city: "Cape Town",  country: "S. Africa"  },
  { city: "Santorini",  country: "Greece"     },
  { city: "Dubai",      country: "UAE"        },
  { city: "London",     country: "UK"         },
  { city: "Los Angeles", country: "USA"       },
  { city: "Chicago",    country: "USA"        },
  { city: "Miami",      country: "USA"        },
  { city: "Nashville",  country: "USA"        },
  { city: "Atlanta",    country: "USA"        },
  { city: "Denver",     country: "USA"        },
  { city: "Dallas",     country: "USA"        },
  { city: "San Francisco", country: "USA"     },
  { city: "Phoenix",    country: "USA"        },
  { city: "Seattle",    country: "USA"        },
  { city: "Boston",     country: "USA"        },
  { city: "Las Vegas",  country: "USA"        },
  { city: "Houston",    country: "USA"        },
  { city: "Orlando",    country: "USA"        },
  { city: "Detroit",    country: "USA"        }
];

const STATIO_DESTINATIONS = [
  { id: "s01", numeral: "I",   roman: "Florentia",    latin: "Florentia",    modern: "Florence",     image: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=800&q=80" },
  { id: "s02", numeral: "II",  roman: "Roma",         latin: "Roma",         modern: "Rome",         image: "https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&w=800&q=80" },
  { id: "s03", numeral: "III", roman: "Lutetia",      latin: "Lutetia",      modern: "Paris",        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80" },
  { id: "s04", numeral: "IV",  roman: "Novum Eboracum", latin: "Novum Eboracum", modern: "New York", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80" },
  { id: "s05", numeral: "V",   roman: "Londinium",    latin: "Londinium",    modern: "London",       image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80" },
  { id: "s06", numeral: "VI",  roman: "Byzantium",    latin: "Byzantium",    modern: "Istanbul",     image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=800&q=80" },
  { id: "s07", numeral: "VII", roman: "Alexandria",   latin: "Alexandria",   modern: "Alexandria",   image: "https://images.unsplash.com/photo-1604608672516-f1b9b1d37076?auto=format&fit=crop&w=800&q=80" },
  { id: "s08", numeral: "VIII",roman: "Carthago",     latin: "Carthago",     modern: "Tunis",        image: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=800&q=80" },
  { id: "s09", numeral: "IX",  roman: "Hispalis",     latin: "Hispalis",     modern: "Seville",      image: "https://images.unsplash.com/photo-1559682468-a6a29e7d9517?auto=format&fit=crop&w=800&q=80" },
  { id: "s10", numeral: "X",   roman: "Massilia",     latin: "Massilia",     modern: "Marseille",    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=800&q=80" },
  { id: "s11", numeral: "XI",  roman: "Vindobona",    latin: "Vindobona",    modern: "Vienna",       image: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=800&q=80" },
  { id: "s12", numeral: "XII", roman: "Mediolanum",   latin: "Mediolanum",   modern: "Milan",        image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=800&q=80" },
  { id: "s13", numeral: "XIII",roman: "Ierusalem",    latin: "Ierusalem",    modern: "Jerusalem",    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80" },
  { id: "s14", numeral: "XIV", roman: "Damascus",     latin: "Damascus",     modern: "Damascus",     image: "https://images.unsplash.com/photo-1591025207163-942350e47db2?auto=format&fit=crop&w=800&q=80" },
  { id: "s15", numeral: "XV",  roman: "Corinthus",    latin: "Corinthus",    modern: "Corinth",      image: "https://images.unsplash.com/photo-1599423300746-b62533397364?auto=format&fit=crop&w=800&q=80" },
  { id: "s16", numeral: "XVI", roman: "Syracusae",    latin: "Syracusae",    modern: "Syracuse",     image: "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?auto=format&fit=crop&w=800&q=80" },
];

export function Home() {
  const navigate = useNavigate();
  const {
    searchWhat,
    setSearchWhat,
    searchWhere,
    setSearchWhere,
    setActiveCategory,
    showToast
  } = useApp();

  const [localWhat, setLocalWhat] = useState("");
  const [localWhere, setLocalWhere] = useState("");
  const [localWhen, setLocalWhen] = useState("");
  const [localGuests, setLocalGuests] = useState("");
  const whereRef = useRef<HTMLDivElement>(null);
  const whatRef = useRef<HTMLDivElement>(null);
  const whatInputRef = useRef<HTMLInputElement>(null);
  const whereInputRef = useRef<HTMLInputElement>(null);
  const featuredScrollRef = useRef<HTMLDivElement>(null);

  const whatSuggestions = useMemo(() => searchTaxonomy(localWhat), [localWhat]);

  const whatHint = useMemo(() => {
    if (localWhat.trim().length > 0 && whatSuggestions.length > 0) {
      const first = whatSuggestions[0].name;
      if (first.toLowerCase().startsWith(localWhat.toLowerCase())) {
        return first.substring(localWhat.length);
      }
    }
    return "";
  }, [localWhat, whatSuggestions]);

  const [whereSuggestions, setWhereSuggestions] = useState<ZipSuggestion[]>([]);
  useEffect(() => {
    let cancelled = false;
    if (!localWhere.trim()) {
      setWhereSuggestions([]);
      return;
    }
    searchZipCodes(localWhere).then((results) => {
      if (!cancelled) setWhereSuggestions(results);
    });
    return () => { cancelled = true; };
  }, [localWhere]);

  const whereCanonical = useMemo(() => {
    if (localWhere.trim().length > 0 && whereSuggestions.length > 0) {
      const first = whereSuggestions[0];
      return `${first.city}, ${first.state}`;
    }
    return "";
  }, [localWhere, whereSuggestions]);

  const whereHint = useMemo(() => {
    if (!whereCanonical) return "";
    if (whereCanonical.toLowerCase().startsWith(localWhere.toLowerCase())) {
      return whereCanonical.substring(localWhere.length);
    }
    return `  ${whereCanonical}`;
  }, [localWhere, whereCanonical]);

  const handleWhatKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Tab" && whatHint) {
      e.preventDefault();
      setLocalWhat(localWhat + whatHint);
    }
  };

  const handleWhereKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Tab" && whereCanonical) {
      e.preventDefault();
      setLocalWhere(whereCanonical);
    }
  };

  const scrollFeatured = (dir: "left" | "right") => {
    const el = featuredScrollRef.current;
    if (!el) return;
    const cardWidth = 272;
    const scrollAmount = cardWidth * 2;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (dir === "right") {
      if (el.scrollLeft >= maxScroll - 10) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else if (el.scrollLeft + scrollAmount > maxScroll) {
        el.scrollTo({ left: maxScroll, behavior: "smooth" });
      } else {
        el.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    } else {
      if (el.scrollLeft <= 10) {
        el.scrollTo({ left: maxScroll, behavior: "smooth" });
      } else if (el.scrollLeft - scrollAmount < 0) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      }
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchWhat(localWhat);
    setSearchWhere(localWhere);
    const matched = whatSuggestions.find(s => s.name.toLowerCase() === localWhat.trim().toLowerCase()) || whatSuggestions[0];
    const targetRoute = matched?.route || '/explore';
    const cleanCategory = targetRoute.replace('/', '');
    setActiveCategory(cleanCategory as any);
    navigate(`${targetRoute}?location=${encodeURIComponent(localWhere)}&q=${encodeURIComponent(localWhat)}`);
    showToast(`🔍 Initiated planning search for "${localWhat || 'Everything'}" in ${localWhere || 'Global Locations'}`);
  };

  return (
    <div className="min-h-screen bg-white text-[#010000] font-sans">
      {/* ===================== ATLAS HERO ===================== */}
      <div className="atlas-hero-scope selection:bg-accent/30 selection:text-canvas overflow-x-hidden">
        <AtlasHero />
      </div>

      {/* ===================== SECTIONS BELOW HERO (scoped to Instrument Serif) ===================== */}
      <div className="repo-section-scope">

      {/* ===================== SEARCH BAR (heading + form, no pills) ===================== */}
      <section id="plan" className="bg-white px-8 lg:px-12 pt-12 md:pt-16">
        <div className="flex items-baseline gap-6 mb-12 border-b border-neutral-200 pb-6">
          <span className="text-[10px] font-medium tracking-[0.35em] uppercase text-neutral-400">Forma</span>
        </div>
        <p className="text-lg text-neutral-500 leading-relaxed pb-4">
          Every partner, venue, flight and experience.
        </p>

        <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 gap-px border border-b-0 border-[#010000] bg-[#010000] md:grid-cols-5">
          <div ref={whatRef} className="relative flex items-center gap-3 bg-white px-5 py-4">
            <PartyPopper className="h-4 w-4 text-[#010000]" />
            <div className="relative w-full">
              {whatHint && (
                <span className="absolute inset-0 flex items-center text-sm font-medium text-[#010000]/30 pointer-events-none whitespace-nowrap overflow-hidden p-0">
                  {localWhat}{whatHint}
                </span>
              )}
              <input
                ref={whatInputRef}
                type="text"
                placeholder="What are you planning?"
                value={localWhat}
                onChange={(e) => setLocalWhat(e.target.value)}
                onKeyDown={handleWhatKeyDown}
                className="w-full bg-transparent p-0 text-sm font-medium text-[#010000] placeholder:text-[#010000]/60 outline-none relative"
              />
            </div>
          </div>

          <div ref={whereRef} className="relative flex items-center gap-3 bg-white px-5 py-4">
            <MapPin className="h-4 w-4 text-[#010000]" />
            <div className="relative w-full">
              {whereHint && (
                <span className="absolute inset-0 flex items-center text-sm font-medium text-[#010000]/30 pointer-events-none whitespace-nowrap overflow-hidden p-0">
                  {localWhere}{whereHint}
                </span>
              )}
              <input
                ref={whereInputRef}
                type="text"
                placeholder="Destination — city, region, country"
                value={localWhere}
                onChange={(e) => setLocalWhere(e.target.value)}
                onKeyDown={handleWhereKeyDown}
                className="w-full bg-transparent p-0 text-sm text-[#010000] placeholder:text-[#010000]/60 outline-none font-medium relative"
              />
            </div>
          </div>

          <label className="flex items-center gap-3 bg-white px-5 py-4">
            <CalendarDays className="h-4 w-4 text-[#010000]" />
            <input
              type="text"
              placeholder="When? e.g. Oct 18"
              value={localWhen}
              onChange={(e) => setLocalWhen(e.target.value)}
              className="w-full bg-transparent text-sm font-medium text-[#010000] placeholder:text-[#010000]/60 outline-none"
            />
          </label>

          <label className="flex items-center gap-3 bg-white px-5 py-4">
            <Users className="h-4 w-4 text-[#010000]" />
            <select
              value={localGuests}
              onChange={(e) => setLocalGuests(e.target.value)}
              className="w-full bg-transparent text-sm font-medium text-[#010000] outline-none cursor-pointer"
            >
              <option value="">Guests</option>
              <option value="1-5">1-5 Guests</option>
              <option value="6-15">6-15 Guests</option>
              <option value="16-75">16-75 Guests</option>
              <option value="76+">76+ Guests</option>
            </select>
          </label>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 bg-[#010000] hover:bg-[#333333] px-4 py-4 text-sm font-semibold text-white transition-colors border-none cursor-pointer w-full"
          >
            <Search className="h-4 w-4 text-white" /> Search
          </button>
        </form>
      </section>

      {/* ===================== A-Z WRAP GRID HERO ===================== */}
      <section className="bg-white px-8 lg:px-12">
        <div className="border border-[#010000] overflow-hidden divide-y divide-[#010000]">
          <div className="grid grid-cols-1 lg:grid-cols-5 lg:grid-rows-2 divide-x lg:divide-x divide-[#010000]">
            <Tile tile={TILES[0]} className="lg:col-start-1 lg:row-start-1" intentWhat={localWhat} intentWhere={localWhere} />
            <Tile tile={TILES[1]} className="lg:col-start-1 lg:row-start-2 lg:border-b-0" intentWhat={localWhat} intentWhere={localWhere} />

            <div className="relative lg:col-span-3 lg:col-start-2 lg:row-span-2 lg:row-start-1 min-h-[500px] lg:min-h-[640px] lg:border-b-0 flex flex-col items-center justify-center text-center px-8 sm:px-12 md:px-16">
              <div className="py-12">
                <h2 className="font-serif italic leading-[0.82] tracking-tighter text-[#010000] text-[22vw] md:text-[16rem]">
                  Forma.
                </h2>
                <p className="mt-6 text-sm text-neutral-500 leading-relaxed max-w-md mx-auto">
                  A unified global platform for planning any event, anywhere. Combine lodging, venues, dining, tickets, and professional services into one seamless itinerary.
                </p>
              </div>
            </div>

            <Tile tile={TILES[6]} className="lg:col-start-5 lg:row-start-1" intentWhat={localWhat} intentWhere={localWhere} />
            <Tile tile={TILES[7]} className="lg:col-start-5 lg:row-start-2 lg:border-b-0" intentWhat={localWhat} intentWhere={localWhere} />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-5 divide-x divide-[#010000]">
            <Tile tile={TILES[2]} className="lg:border-b-0" intentWhat={localWhat} intentWhere={localWhere} />
            <Tile tile={TILES[3]} className="lg:border-b-0" intentWhat={localWhat} intentWhere={localWhere} />
            <Tile tile={TILES[4]} className="lg:border-b-0" intentWhat={localWhat} intentWhere={localWhere} />
            <Tile tile={TILES[5]} className="lg:border-b-0" intentWhat={localWhat} intentWhere={localWhere} />
            <Tile tile={TILES[8]} className="col-span-2 lg:col-span-1" intentWhat={localWhat} intentWhere={localWhere} />
          </div>
        </div>
      </section>

      {/* ===================== COMPOSITION — "One score. Every seat." ===================== */}
      <div className="atlas-hero-scope atlas-dark selection:bg-accent/30 selection:text-canvas overflow-x-hidden">
        <Composition />
      </div>

      {/* ===================== STRATA — "The Layers" (imported from eventsphere-global) ===================== */}
      <Strata />

      {/* ===================== STATIO — Destinations ===================== */}
      <section className="bg-white px-6 md:px-10 pt-20">
        <div className="flex items-baseline gap-6 mb-12 border-b border-neutral-200 pb-6">
          <span className="text-[10px] font-medium tracking-[0.35em] uppercase text-neutral-400">§ I</span>
          <span className="font-serif italic text-2xl md:text-3xl text-neutral-400">A place, appointed</span>
          <Link to="/explore" className="text-[10px] font-medium tracking-[0.35em] uppercase text-neutral-400 hover:text-[#F47245] ml-auto no-underline hidden md:block">
            All destinations →
          </Link>
        </div>
        <h2 className="font-serif italic leading-[0.82] tracking-tighter text-[22vw] md:text-[16rem] text-[#010000] mb-8">
          Statio.
        </h2>

        <div ref={featuredScrollRef} className="overflow-x-auto pb-8 no-scrollbar scroll-smooth">
          <div className="flex min-w-max gap-6">
            {STATIO_DESTINATIONS.map((dest) => (
              <div
                key={dest.id}
                onClick={() => {
                  setSearchWhere(dest.modern);
                  navigate("/explore");
                  showToast(`📍 Selected ${dest.modern} for your destination.`);
                }}
                className="group relative flex h-80 w-64 shrink-0 flex-col justify-between overflow-hidden border border-neutral-100 bg-[#010000] text-white transition hover:border-[#F47245] cursor-pointer rounded-2xl shadow-md"
              >
                <img
                  src={dest.image}
                  alt={dest.modern}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover opacity-70 transition-transform duration-[900ms] ease-out group-hover:scale-[1.06] group-hover:opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="relative z-10 p-5">
                  <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/50">Statio</span>
                </div>
                <div className="relative z-10 p-5">
                  <h3 className="font-serif text-2xl font-semibold tracking-tight leading-snug">{dest.modern}</h3>
                  <p className="mt-1 text-[11px] text-white/50 tracking-[0.2em] uppercase">{dest.roman}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end pb-12 px-8 lg:px-12">
          <button
            onClick={() => scrollFeatured("right")}
            aria-label="Scroll destinations"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#010000]/20 bg-white text-[#010000] transition hover:bg-[#010000] hover:text-white hover:border-[#010000] cursor-pointer"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={1.75} />
          </button>
        </div>
      </section>

      {/* ===================== CORPUS — the highlighted vendor body (imported from eventsphere-global) ===================== */}
      <Corpus />

      {/* ===================== TABULA — the board of 7 disciplines (imported from eventsphere-global) ===================== */}
      <Tabula />

      {/* ===================== MODUS — One booking. One payment. One itinerary. (from planviry-unfold) ===================== */}
      <Modus />

      {/* ===================== ENTERPRISE — For the partners, venues and planners (from planviry-unfold) ===================== */}
      <Enterprise />

      </div>{/* end repo-section-scope */}

      {/* ===================== CIVITAS — The cities that host the world (from planviry-unfold) ===================== */}
      <Civitas />

      {/* ===================== REGIMEN — Orchestrate (imported from eventsphere-global) ===================== */}
      <Regimen />

    </div>
  );
}

// ===================== Sub-components =====================

type TileT = (typeof TILES)[number];

function Tile({
  tile,
  active = false,
  className = "",
  intentWhat = "",
  intentWhere = "",
}: {
  tile: TileT;
  active?: boolean;
  className?: string;
  intentWhat?: string;
  intentWhere?: string;
}) {
  const navigate = useNavigate();
  const { setActiveCategory, setSearchWhat, setSearchWhere } = useApp();
  const { Icon, n, title, desc, tags, path } = tile;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (path) {
      const what = intentWhat.trim();
      const where = intentWhere.trim();
      if (what) setSearchWhat(what);
      if (where) setSearchWhere(where);
      if (path !== 'explore') {
        setActiveCategory(path as any);
      }
      const params = new URLSearchParams();
      if (what) params.set('q', what);
      if (where) params.set('location', where);
      const qs = params.toString();
      navigate(`/${path}${qs ? `?${qs}` : ''}`);
    }
  };

  return (
    <a
      href={`/${path}`}
      onClick={handleClick}
      className={
        "group relative flex flex-col p-5 lg:p-6 transition-colors overflow-hidden " +
        (active
          ? "bg-[#010000] text-white "
          : "bg-white text-neutral-900 hover:bg-[#010000] hover:text-white ") +
        className
      }
    >
      <span
        className={
          "absolute top-4 right-4 font-mono text-[10px] tracking-[0.25em] " +
          (active
            ? "text-white/45"
            : "text-neutral-400 group-hover:text-white/45")
        }
      >
        {n}
      </span>
      <div
        className={
          "flex w-10 h-10 items-center justify-center transition-colors " +
          (active
            ? "text-white"
            : "text-[#010000] group-hover:text-white")
        }
      >
        <Icon className="w-4.5 h-4.5" strokeWidth={1.75} />
      </div>
      <div className="mt-5">
        <div className="flex items-center gap-1.5">
          <h3 className="font-serif text-[17px] font-semibold leading-tight tracking-tight">
            {title}
          </h3>
          <ArrowUpRight
            className={
              "w-3.5 h-3.5 -translate-y-0.5 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0 " +
              (active ? "opacity-100 translate-x-0" : "")
            }
            strokeWidth={2}
          />
        </div>
        <p className={"mt-1 text-[12px] " + (active ? "text-white/70" : "text-neutral-500 group-hover:text-white/70")}>
          {desc}
        </p>
        <div className="mt-3">
        </div>
      </div>
    </a>
  );
}

function PlanStep({
  Icon,
  n,
  label,
  desc,
}: {
  Icon: typeof PenLine;
  n: string;
  label: string;
  desc: string;
}) {
  return (
    <div className="group flex flex-1 items-center gap-5 px-8 py-10 bg-[#010000] transition hover:bg-neutral-900">
      <span className="font-mono text-[10px] tracking-[0.28em] text-white/50">{n}</span>
      <div className="flex w-12 h-12 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white">
        <Icon className="w-5 h-5" strokeWidth={1.75} />
      </div>
      <div className="min-w-0">
        <div className="font-serif text-lg font-semibold tracking-tight">{label}</div>
        <div className="text-[13px] text-white/70 mt-0.5">{desc}</div>
      </div>
    </div>
  );
}

function CategoryCard({
  img,
  tag,
  location,
  title,
  category,
  path,
}: {
  img: string;
  tag: string;
  location: string;
  title: string;
  category: string;
  path: string;
}) {
  const navigate = useNavigate();
  const { setActiveCategory, setSearchWhat, showToast } = useApp();
  return (
    <button
      onClick={() => {
        setSearchWhat(title);
        setActiveCategory(category as any);
        navigate(path);
        showToast(`✨ Selected "${title}" category`);
      }}
      className="group relative overflow-hidden rounded-2xl border border-neutral-100 text-left transition hover:border-[#010000] cursor-pointer bg-transparent"
    >
      <div className="aspect-[4/5] overflow-hidden">
        <img src={img} alt={title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute bottom-0 p-5 text-white">
        <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#F47245]">{tag}</span>
        <h3 className="mt-2 font-serif text-2xl font-semibold tracking-tight">{title}</h3>
        <p className="mt-1 text-xs text-white/70">{location}</p>
      </div>
    </button>
  );
}

function PopularDestinations() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="px-8 lg:px-12">
        <div className="mb-12 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-[14vw] md:text-[8vw] leading-[0.82] tracking-[-0.03em] text-[#010000]">
              Cities where<span className="italic text-[#010000]/50"> Planviry moves.</span>
            </h2>
          </div>
          <Link to="/explore" className="hidden text-sm font-semibold text-[#010000] md:inline-flex items-center gap-2 hover:opacity-80 transition-opacity">
            All cities <ArrowRight className="h-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-x-8 gap-y-12 bg-transparent">
          {popularCities.map((c) => (
            <Link
              key={c.city}
              to="/explore"
              className="group flex flex-col justify-between transition-colors"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-serif text-lg font-semibold tracking-tight text-[#010000] group-hover:text-[#F47245] transition-colors leading-none">
                  {c.city}
                </span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-[#010000]/30 group-hover:text-[#F47245] transition-colors" />
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-neutral-400 group-hover:text-[#F47245]/80 transition-colors">
                {c.country}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function SiteHeader() {
  const navigate = useNavigate();
  const [openDir, setOpenDir] = useState(false);
  const { setActiveCategory } = useApp();

  const handleNav = (path: string, category?: any) => {
    if (category) {
      setActiveCategory(category);
    }
    navigate(path);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-100 bg-white/90 backdrop-blur">
      <nav className="flex h-16 items-center justify-between px-8 lg:px-12">
        <div className="flex items-center gap-10">
          <Link to="/" className="font-serif text-xl font-bold tracking-tight text-neutral-900">
            Planviry<span className="text-[#F47245]">.</span>
          </Link>
          <div className="hidden items-center gap-7 lg:flex">
            <button onClick={() => handleNav('/explore', 'vendors')} className="text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer bg-transparent border-none">
              Events
            </button>
            <button onClick={() => handleNav('/spaces', 'spaces')} className="text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer bg-transparent border-none">
              Venues
            </button>
            <button onClick={() => handleNav('/travel', 'travel')} className="text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer bg-transparent border-none">
              Travel
            </button>
            <button onClick={() => handleNav('/vendors', 'vendors')} className="text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer bg-transparent border-none">
              Partners
            </button>

            <div
              className="relative"
              onMouseEnter={() => setOpenDir(true)}
              onMouseLeave={() => setOpenDir(false)}
            >
              <button
                className="inline-flex items-center gap-1 text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer bg-transparent border-none"
                onClick={() => setOpenDir((o) => !o)}
              >
                Directory
                <ChevronDown className={"w-3.5 h-3.5 transition-transform " + (openDir ? "rotate-180" : "")} />
              </button>

              {openDir && (
                <div className="absolute left-1/2 top-full z-50 w-[720px] -translate-x-1/2 border border-neutral-100 bg-white shadow-xl rounded-b-2xl overflow-hidden">
                  <div className="grid grid-cols-3 divide-x divide-neutral-100">
                    {DIRECTORY.map((col) => (
                      <div key={col.heading} className="p-6 text-left">
                        <h4 className="mb-4 font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-[#F47245]">
                          {col.heading}
                        </h4>
                        <ul className="space-y-2.5">
                          {col.links.map((link) => {
                            const catMap: Record<string, string> = {
                              "Weddings": "vendors",
                              "Retreats": "services",
                              "Birthdays": "party",
                              "Reunions": "party",
                              "Conferences": "services",
                              "Bachelor / Bachelorette": "party",
                              "Venues": "spaces",
                              "Partners": "vendors",
                              "Travel": "travel",
                              "Food & Drink": "food-drink",
                              "Live Shows": "live-shows",
                              "Concierge": "services"
                            };
                            const targetCat = catMap[link] || "vendors";
                            const targetPath = link === "Venues" ? "/spaces" : link === "Travel" ? "/travel" : link === "Food & Drink" ? "/food-drink" : link === "Live Shows" ? "/live-shows" : "/explore";
                            return (
                              <li key={link}>
                                <button
                                  onClick={() => handleNav(targetPath, targetCat)}
                                  className="group inline-flex items-center gap-1.5 text-sm text-neutral-700 hover:text-[#F47245] transition-colors cursor-pointer bg-transparent border-none p-0 text-left"
                                >
                                  {link}
                                  <ArrowUpRight className="w-3 h-3 opacity-0 transition group-hover:opacity-100" />
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => handleNav('/explore')}
                    className="w-full flex items-center justify-between border-t border-neutral-100 bg-neutral-50 px-6 py-3 text-xs font-medium text-neutral-900 transition hover:bg-neutral-100 cursor-pointer"
                  >
                    Browse full directory
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            <button onClick={() => handleNav('/vendor-portal')} className="text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer bg-transparent border-none">
              Members
            </button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => handleNav('/vendor-portal')} className="text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer bg-transparent border-none">
            Sign in
          </button>
          <button onClick={() => handleNav('/plan')} className="group inline-flex items-center gap-2 rounded-full bg-[#010000] px-5 py-2 text-sm font-semibold text-white transition hover:bg-neutral-800 cursor-pointer">
            Start Planning
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </nav>
    </header>
  );
}

function SiteFooter() {
  const navigate = useNavigate();
  const { setActiveCategory } = useApp();

  const handleFooterLink = (label: string) => {
    const map: Record<string, { path: string; category: any }> = {
      "Concierge": { path: "/services", category: "services" },
      "Plan": { path: "/plan", category: "plan" },
      "Things to Do": { path: "/things-to-do", category: "things-to-do" },
      "Food & Drink": { path: "/food-drink", category: "food-drink" },
      "Live Shows": { path: "/live-shows", category: "live-shows" },
      "Travel": { path: "/travel", category: "travel" },
      "Party": { path: "/party", category: "party" },
      "Spaces": { path: "/spaces", category: "spaces" },
      "Partners": { path: "/vendors", category: "vendors" },
      "Marketplace": { path: "/explore", category: "vendors" },
      "Plan Your Event": { path: "/plan", category: "plan" },
      "Itinerary": { path: "/itinerary", category: "vendors" },
      "Unified Cart": { path: "/payment", category: "vendors" },
      "Search Partners": { path: "/vendors", category: "vendors" },
      "How it Works": { path: "/explore", category: "vendors" },
      "Partner Hub": { path: "/vendor-portal", category: "vendors" },
      "List Your Business": { path: "/vendor-portal", category: "vendors" },
      "Partner Dashboard": { path: "/vendor-portal", category: "vendors" },
    };
    const target = map[label];
    if (target) {
      setActiveCategory(target.category);
      navigate(target.path);
    } else {
      navigate('/explore');
    }
  };

  const columns: { heading: string; links: string[] }[] = [
    { heading: "Book", links: ["Concierge", "Plan", "Things to Do", "Food & Drink", "Live Shows", "Travel", "Party", "Spaces", "Partners"] },
    { heading: "Platform", links: ["Marketplace", "Plan Your Event", "Itinerary", "Unified Cart", "Search Partners", "How it Works"] },
    { heading: "For Partners", links: ["Partner Hub", "List Your Business", "Partner Dashboard", "Marketing Tools", "Safety & Security"] },
    { heading: "Company", links: ["About Us", "Our Vision", "Careers", "Press Office", "Privacy Policy", "Contact"] },
    { heading: "Discover", links: ["Popular Cities", "Popular Destinations", "By Category", "By Occasion", "By Activity", "Find by Country"] },
  ];

  return (
    <footer className="border-t border-neutral-100 bg-white">
      <div className="px-8 pt-24 pb-12 lg:px-12">
        <div className="grid grid-cols-2 gap-x-8 gap-y-14 sm:grid-cols-3 lg:grid-cols-6 text-left">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <Link to="/" className="font-serif text-2xl font-bold tracking-tight text-neutral-900">
              Planviry<span className="text-[#F47245]">.</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-neutral-500">
              A unified global platform for planning any event, anywhere. One
              booking. One payment. One itinerary.
            </p>
          </div>

          {columns.map((c) => (
            <div key={c.heading}>
              <h4 className="mb-5 font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-[#010000]/60">
                {c.heading}
              </h4>
              <ul className="space-y-3">
                {c.links.map((l) => (
                  <li key={l}>
                    <button
                      onClick={() => handleFooterLink(l)}
                      className="text-sm text-neutral-500 hover:text-[#F47245] transition-colors cursor-pointer bg-transparent border-none p-0 text-left"
                    >
                      {l}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-neutral-100 pt-8 sm:flex-row sm:items-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-400">
            © {new Date().getFullYear()} Planviry Platform. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-6 text-[11px] text-neutral-400">
            <button onClick={() => { navigate('/legal'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#F47245] cursor-pointer bg-transparent border-none p-0">Legal Center</button>
            <button onClick={() => { navigate('/legal'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#F47245] cursor-pointer bg-transparent border-none p-0">Privacy Policy</button>
            <button onClick={() => { navigate('/legal'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#F47245] cursor-pointer bg-transparent border-none p-0">Terms of Service</button>
            <button onClick={() => { navigate('/legal'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#F47245] cursor-pointer bg-transparent border-none p-0">Community Guidelines</button>
            <button onClick={() => { navigate('/legal'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#F47245] cursor-pointer bg-transparent border-none p-0">AI Use Policy</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
