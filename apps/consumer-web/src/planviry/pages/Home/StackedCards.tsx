"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "@/planviry/router";
import { ArrowUpRight } from "lucide-react";

interface DeckCard {
  id: number;
  title: string;
  category: string;
  desc: string;
  image: string;
  route: string;
  tag: string;
}

const DECK_CARDS: DeckCard[] = [
  { id: 1, title: "Destination Wedding", category: "Weddings", desc: "Villa Cetinale · 180 guests · vineyard ceremony", image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80", route: "/concierge", tag: "PRIVATE" },
  { id: 2, title: "Corporate Retreat", category: "Retreats", desc: "Bambu compound · 45 executives · Ubud", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80", route: "/concierge", tag: "CORPORATE" },
  { id: 3, title: "Concert Experience", category: "Live Shows", desc: "Front row · VIP access · backstage pass", image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=800&q=80", route: "/live-shows", tag: "LIVE" },
  { id: 4, title: "City Celebration", category: "Party", desc: "Paris rooftop · champagne tower · midnight", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80", route: "/party", tag: "CELEBRATE" },
  { id: 5, title: "Luxury Villa Block", category: "Spaces", desc: "Tuscan estate · 12 suites · infinity pool", image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80", route: "/spaces", tag: "VENUE" },
  { id: 6, title: "Private Charter", category: "Travel", desc: "Embraer 1000E · LCY → VCE · Sat departure", image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80", route: "/travel", tag: "MOVEMENT" },
  { id: 7, title: "Michelin Catering", category: "Food & Drink", desc: "L'Effervescence · tasting menu · 42 covers", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80", route: "/food-drink", tag: "CUISINE" },
  { id: 8, title: "Theatre & Opera", category: "Live Shows", desc: "Teatro La Fenice · Palco Reale · Puccini", image: "https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=800&q=80", route: "/live-shows", tag: "CULTURE" },
  { id: 9, title: "Bachelor Suite", category: "Party", desc: "Nobu Vegas · penthouse · 3 nights", image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80", route: "/party", tag: "BACHELOR" },
  { id: 10, title: "Gala Occasion", category: "Services", desc: "Black-tie · 500 guests · awards dinner", image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80", route: "/concierge", tag: "GALA" },
  { id: 11, title: "Beach Concert", category: "Live Shows", desc: "Ipanema · 30k capacity · sunset set", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80", route: "/live-shows", tag: "CONCERT" },
  { id: 12, title: "Riad Weekend", category: "Travel", desc: "Marrakech · 24 guests · private courtyard", image: "https://images.unsplash.com/photo-1539020140153-e479b8c5d1e6?auto=format&fit=crop&w=800&q=80", route: "/travel", tag: "GETAWAY" },
  { id: 13, title: "Product Launch", category: "Services", desc: "Aoyama · 400 press · reveal staging", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80", route: "/concierge", tag: "LAUNCH" },
  { id: 14, title: "Hot Air Balloon", category: "Things to Do", desc: "Cappadocia · sunrise · 20 baskets", image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80", route: "/things-to-do", tag: "EXPERIENCE" },
  { id: 15, title: "Wine Tasting", category: "Food & Drink", desc: "Bordeaux · 5 estates · private cellar", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80", route: "/food-drink", tag: "TASTING" },
  { id: 16, title: "Yacht Charter", category: "Travel", desc: "Amalfi · 120ft · 4 cabins · crewed", image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=800&q=80", route: "/travel", tag: "CHARTER" },
  { id: 17, title: "Photography Team", category: "Partners", desc: "Cinema + stills · same-day edit · DMCA", image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=80", route: "/vendors", tag: "VENDOR" },
  { id: 18, title: "DJ & Sound", category: "Partners", desc: "Funktion-One · 6hr set · lighting rig", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80", route: "/vendors", tag: "SOUND" },
  { id: 19, title: "Floral Design", category: "Partners", desc: "Seasonal installations · arches · centerpieces", image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=800&q=80", route: "/vendors", tag: "FLORAL" },
  { id: 20, title: "Officiant Services", category: "Services", desc: "Multi-faith · custom vows · bilingual", image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80", route: "/concierge", tag: "CEREMONY" },
  { id: 21, title: "Ski Chalet", category: "Spaces", desc: "Verbier · 8 beds · ski-in · private chef", image: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80", route: "/spaces", tag: "MOUNTAIN" },
  { id: 22, title: "Rooftop Soirée", category: "Spaces", desc: "Manhattan · 80 guests · sunset cocktails", image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80", route: "/spaces", tag: "ROOFTOP" },
  { id: 23, title: "Cultural Tour", category: "Things to Do", desc: "Kyoto · temples · tea ceremony · private guide", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80", route: "/things-to-do", tag: "CULTURE" },
  { id: 24, title: "Comedy Night", category: "Live Shows", desc: "Intimate club · 5 comics · open bar", image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=800&q=80", route: "/live-shows", tag: "COMEDY" },
  { id: 25, title: "Anniversary Dinner", category: "Food & Drink", desc: "Private room · 12 course · sommelier", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80", route: "/food-drink", tag: "MILESTONE" },
  { id: 26, title: "Group Safari", category: "Things to Do", desc: "Serengeti · 6 lodges · guided migration", image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80", route: "/things-to-do", tag: "ADVENTURE" },
  { id: 27, title: "Spa & Wellness", category: "Services", desc: "On-site therapists · couples · half-day", image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80", route: "/concierge", tag: "WELLNESS" },
  { id: 28, title: "IPO Dinner", category: "Services", desc: "Manhattan · boardroom · 40 investors", image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80", route: "/concierge", tag: "ENTERPRISE" },
];

export function StackedCards() {
  const navigate = useNavigate();
  const [cards, setCards] = useState<DeckCard[]>(DECK_CARDS);

  const handleCardClick = () => {
    if (cards.length <= 1) {
      // Reset the stack when reaching the end
      setCards(DECK_CARDS);
      return;
    }
    setCards((prev) => prev.slice(1));
  };

  const handleNavigate = (route: string) => {
    navigate(route);
  };

  return (
    <div className="relative w-full">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Manifesto text — left column (verbatim from eventsphere-global) */}
        <div>
          <div className="text-[10px] tracking-[0.35em] uppercase text-[#010000] mb-8">Manifesto · 01 of 01</div>
          <p className="font-serif text-4xl md:text-6xl italic leading-[1.05] text-balance text-[#010000]">
            Weddings were not built to be booked in tabs. Summits were not written
            to be forwarded in threads. Concerts were not staged by seven separate
            partners pretending not to know each other.
          </p>
          <p className="font-serif text-4xl md:text-6xl leading-[1.05] mt-8 text-balance text-[#010000]">
            Every event is <span className="italic text-[#010000]/50">one movement</span>.
            Planviry conducts it.
          </p>
        </div>

        {/* Card stack — right column, fills column width */}
        <div className="flex justify-center lg:justify-end w-full">
          <div
            className="relative w-full aspect-[4/5] cursor-pointer"
            onClick={handleCardClick}
          >
            <AnimatePresence mode="popLayout">
              {cards.map((card, index) => {
                if (index > 2) return null;
                const isTopCard = index === 0;

                return (
                  <motion.div
                    key={card.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{
                      opacity: 1,
                      scale: 1 - index * 0.05,
                      y: index * 12,
                      zIndex: cards.length - index,
                    }}
                    exit={{
                      x: 300,
                      opacity: 0,
                      rotate: 15,
                      transition: { duration: 0.3 }
                    }}
                    className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden shadow-xl origin-bottom"
                    style={{
                      pointerEvents: isTopCard ? "auto" : "none",
                    }}
                  >
                    {/* Image */}
                    <img
                      src={card.image}
                      alt={card.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                    {/* Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col justify-between p-6 text-white">
                      <div className="flex items-start justify-between">
                        <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#F47245] bg-black/40 backdrop-blur px-2 py-1 rounded">
                          {card.tag}
                        </span>
                        {isTopCard && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleNavigate(card.route);
                            }}
                            className="flex items-center gap-1 text-[10px] tracking-[0.2em] uppercase text-white bg-white/15 backdrop-blur px-3 py-1.5 rounded-full hover:bg-[#F47245] transition-colors cursor-pointer border-none"
                          >
                            Plan <ArrowUpRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>

                      <div>
                        <div className="text-[10px] tracking-[0.25em] uppercase text-white/60 mb-1">
                          {card.category}
                        </div>
                        <h3 className="font-serif text-2xl font-semibold tracking-tight leading-tight">
                          {card.title}
                        </h3>
                        <p className="mt-2 text-xs text-white/70 leading-relaxed">
                          {card.desc}
                        </p>
                      </div>

                      {isTopCard && (
                        <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-center text-white/50 animate-pulse">
                          Click to next →
                        </span>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
