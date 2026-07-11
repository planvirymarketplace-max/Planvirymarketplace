'use client';

import React from 'react';
import { useNavigate, Link } from '@/planviry/router';
import { useApp } from '../../context/AppContext';

export function SiteFooter() {
  const navigate = useNavigate();
  const { setActiveCategory } = useApp();

  const handleFooterLink = (label: string) => {
    const map: Record<string, { path: string; category: any }> = {
      "Concierge": { path: "/concierge", category: "concierge" },
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
    {
      heading: "Book",
      links: ["Concierge", "Plan", "Things to Do", "Food & Drink", "Live Shows", "Travel", "Party", "Spaces", "Partners"],
    },
    {
      heading: "Platform",
      links: ["Marketplace", "Plan Your Event", "Itinerary", "Unified Cart", "Search Partners", "How it Works"],
    },
    {
      heading: "For Partners",
      links: ["Partner Hub", "List Your Business", "Partner Dashboard", "Marketing Tools", "Safety & Security"],
    },
    {
      heading: "Company",
      links: ["About Us", "Our Vision", "Careers", "Press Office", "Privacy Policy", "Contact"],
    },
    {
      heading: "Discover",
      links: ["Popular Cities", "Popular Destinations", "By Category", "By Occasion", "By Activity", "Find by Country"],
    },
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
