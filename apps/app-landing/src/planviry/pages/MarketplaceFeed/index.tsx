import React, { useMemo, useState } from 'react';
import { useSearchParams, useNavigate } from '@/planviry/router';
import { useApp } from '../../context/AppContext';
import {
  Search,
  ArrowLeft,
  ChevronRight,
  ArrowRight,
  Star,
  Phone,
  MapPin,
  AlertCircle,
} from 'lucide-react';
import { SUB_CATEGORIES, isItemMatchingService } from '../../data';
import { ALL_MARKETPLACE_ITEMS } from '../../lib/vendorCatalog';
import { CategoryLens } from '../../types';

interface MarketplaceFeedProps {
  category: CategoryLens;
}

export const MarketplaceFeed: React.FC<MarketplaceFeedProps> = ({ category }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Search Param Filters
  const subParam = searchParams.get('sub') || '';
  const origin = searchParams.get('origin') || '';
  const originId = searchParams.get('originId') || '';
  const originName = searchParams.get('originName') || '';
  const subtypeParam = searchParams.get('subtype') || '';
  const selectedService = searchParams.get('service') || '';

  const {
    searchWhat,
    setSearchWhat,
    searchWhere,
    setSearchWhere,
    searchWhen,
    setSearchWhen,
    searchAttendees,
    setSearchAttendees,
    selectedSubcategory,
    setSelectedSubcategory,
    setItinerary,
    showToast
  } = useApp();

  // Keep track of active category lens
  const currentCategory = useMemo(() => {
    return category || 'vendors';
  }, [category]);

  const formatCategory = (catStr: string) => {
    if (!catStr) return '';
    return catStr.replace('-', ' ');
  };

  const allRecommendedServices = useMemo(() => {
    if (subtypeParam) {
      return SUB_CATEGORIES[category] || [];
    }
    return [];
  }, [category, subtypeParam]);

  const pageTitle = useMemo(() => {
    if (subtypeParam) {
      return `${subtypeParam} Essentials`;
    }
    if (originName) {
      return `${originName} Experience`;
    }
    if (subParam) {
      return `Premium ${subParam} Providers`;
    }
    return `${formatCategory(category)}`;
  }, [category, subParam, originName, subtypeParam]);

  const pageSubtitle = useMemo(() => {
    if (subtypeParam) {
      return `Browse and coordinate every service for your ${subtypeParam.toLowerCase()} with curated local specialists.`;
    }
    if (originName) {
      return `Browse and coordinate every service for your ${originName.toLowerCase()} with vetted local specialists.`;
    }
    return `Hand-selected local professionals and premium spaces for a memorable, split-payment celebration.`;
  }, [originName, subtypeParam, category]);

  React.useEffect(() => {
    if (subParam) {
      setSelectedSubcategory(subParam);
    } else {
      setSelectedSubcategory('all');
    }
  }, [subParam, setSelectedSubcategory]);

  // Filtered Marketplace Items (Single Sleek Search)
  const filteredMarketplaceItems = useMemo(() => {
    const results = ALL_MARKETPLACE_ITEMS.filter((item) => {
      // 1. Category check
      if (item.category !== currentCategory) return false;

      // 2. Subcategory or Service filter
      if (selectedService) {
        if (!isItemMatchingService(item, selectedService)) {
          return false;
        }
      } else if (selectedSubcategory && selectedSubcategory !== 'all') {
        if (!item.subcategory || item.subcategory.toLowerCase() !== selectedSubcategory.toLowerCase()) {
          return false;
        }
      }

      // 3. Search query check (What) - Name, description, subcategory, location, tags
      if (searchWhat.trim()) {
        const query = searchWhat.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesDesc = (item.description || '').toLowerCase().includes(query);
        const matchesSubcat = (item.subcategory || '').toLowerCase().includes(query);
        const matchesLocation = item.location.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesSubcat && !matchesLocation) return false;
      }

      return true;
    });

    // Fallback: if filters produce zero results, show all items for this category
    // so the page is never blank.
    if (results.length === 0) {
      return ALL_MARKETPLACE_ITEMS.filter((item) => item.category === currentCategory);
    }
    return results;
  }, [currentCategory, selectedService, selectedSubcategory, searchWhat]);

  return (
    <div className="animate-in fade-in duration-500">

      {/* 1. Sleek Search and Navigation Header */}
      <section className="bg-white border-b border-neutral-200/50 py-5 px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Breadcrumbs and Sleek Single Search Input (Not Enterprise) */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-3.5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
            
            {/* Left side: Back Button and Breadcrumbs */}
            <div className="flex items-center gap-3 shrink-0 text-xs text-neutral-500">
              <button
                onClick={() => {
                  if (origin === 'occasions' && originId) {
                    navigate(`/explore?tab=occasions&id=${originId}`);
                  } else if (origin === 'categories' && originId) {
                    navigate(`/explore?tab=categories&id=${originId}`);
                  } else {
                    navigate('/explore');
                  }
                }}
                className="flex items-center gap-1.5 text-neutral-700 hover:text-champagne-gold font-sans font-bold uppercase tracking-wider text-[10px] transition-all bg-neutral-100 hover:bg-neutral-200/70 px-3.5 py-2 rounded-xl cursor-pointer border-none"
              >
                <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
                Back
              </button>
              
              <div className="flex items-center gap-2 text-neutral-400 font-sans text-[11px] font-medium">
                <span className="hover:text-neutral-700 cursor-pointer" onClick={() => navigate('/explore')}>Explore</span>
                <ChevronRight className="w-2.5 h-2.5" />
                {originName ? (
                  <>
                    <span 
                      className="hover:text-neutral-700 cursor-pointer text-neutral-500" 
                      onClick={() => navigate(`/explore?tab=${origin}&id=${originId}`)}
                    >
                      {originName}
                    </span>
                    <ChevronRight className="w-2.5 h-2.5" />
                  </>
                ) : (
                  <>
                    <span className="hover:text-neutral-700 cursor-pointer" onClick={() => navigate('/explore')}>All Categories</span>
                    <ChevronRight className="w-2.5 h-2.5" />
                  </>
                )}
                <span className="text-neutral-900 font-semibold">{subParam || formatCategory(category)}</span>
              </div>
            </div>

            {/* Right side: Inline search fields (What/Where/When/Guests + Search) */}
            <div className="flex flex-wrap items-center gap-1.5 bg-neutral-50/80 p-1.5 rounded-xl border border-neutral-200/40 w-full">
              {/* What */}
              <div className="flex flex-col px-3 py-1 min-w-[100px] flex-1 relative">
                <span className="text-[8px] font-bold uppercase text-neutral-400 tracking-wider">What</span>
                <input
                  type="text"
                  value={searchWhat}
                  onChange={(e) => {
                    setSearchWhat(e.target.value);
                    setSelectedSubcategory('all');
                  }}
                  placeholder="What are we planning?"
                  className="bg-transparent border-none p-0 text-xs font-semibold text-neutral-800 focus:ring-0 outline-none w-full placeholder-neutral-400"
                />
              </div>

              <div className="h-6 w-px bg-neutral-200 hidden md:block" />

              {/* Where */}
              <div className="flex flex-col px-3 py-1 min-w-[100px] flex-1 relative">
                <span className="text-[8px] font-bold uppercase text-neutral-400 tracking-wider">Where</span>
                <input
                  type="text"
                  value={searchWhere}
                  onChange={(e) => setSearchWhere(e.target.value)}
                  placeholder="Location"
                  className="bg-transparent border-none p-0 text-xs font-semibold text-neutral-800 focus:ring-0 outline-none w-full placeholder-neutral-400"
                />
              </div>

              <div className="h-6 w-px bg-neutral-200 hidden md:block" />

              {/* When */}
              <div className="flex flex-col px-3 py-1 min-w-[90px] flex-1">
                <span className="text-[8px] font-bold uppercase text-neutral-400 tracking-wider">When</span>
                <input
                  type="text"
                  value={searchWhen}
                  onChange={(e) => setSearchWhen(e.target.value)}
                  placeholder="Dates"
                  className="bg-transparent border-none p-0 text-xs font-semibold text-neutral-800 focus:ring-0 outline-none w-full placeholder-neutral-400"
                />
              </div>

              <div className="h-6 w-px bg-neutral-200 hidden md:block" />

              {/* Guests */}
              <div className="flex flex-col px-3 py-1 min-w-[80px] flex-1">
                <span className="text-[8px] font-bold uppercase text-neutral-400 tracking-wider">Guests</span>
                <select
                  value={searchAttendees}
                  onChange={(e) => setSearchAttendees(e.target.value)}
                  className="bg-transparent border-none p-0 text-xs font-semibold text-neutral-800 focus:ring-0 outline-none w-full cursor-pointer"
                >
                  <option value="1-5 Guests">1-5</option>
                  <option value="6-15 Guests">6-15</option>
                  <option value="16-50 Guests">16-50</option>
                  <option value="51-100 Guests">51-100</option>
                  <option value="101-250 Guests">101-250</option>
                  <option value="250+ Guests">250+</option>
                </select>
              </div>

              {/* Clear */}
              {searchWhat && (
                <button
                  onClick={() => { setSearchWhat(''); setSelectedSubcategory('all'); }}
                  className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 hover:text-neutral-900 cursor-pointer bg-transparent border-none px-2 py-1 shrink-0"
                >
                  Clear
                </button>
              )}

              {/* Search CTA */}
              <button
                type="button"
                onClick={() => {
                  // Re-route to this category with the updated search params
                  const params = new URLSearchParams();
                  if (searchWhat) params.set('q', searchWhat);
                  if (searchWhere) params.set('location', searchWhere);
                  if (subParam) params.set('sub', subParam);
                  navigate(`/${category}?${params.toString()}`);
                }}
                className="bg-neutral-900 text-white px-4 py-2.5 rounded-xl flex items-center justify-center gap-1.5 hover:bg-champagne-gold hover:text-black transition-colors shrink-0 cursor-pointer border-none font-bold text-xs uppercase tracking-wider w-full sm:w-auto order-last sm:order-none"
              >
                <Search className="w-3.5 h-3.5" />
                Search
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Listings Feed Grid */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-8 gap-4 text-left">
          <div>
            <h1 className="font-serif text-3xl md:text-4xl text-midnight-slate font-bold capitalize tracking-tight">
              {pageTitle}
            </h1>
            <p className="text-midnight-slate/60 text-sm mt-1">
              {pageSubtitle}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-midnight-slate/40">Sort:</span>
            <select className="bg-transparent border-none text-sm font-bold text-midnight-slate focus:ring-0 cursor-pointer outline-none">
              <option>Most Exclusive</option>
              <option>New Arrivals</option>
              <option>Highly Rated</option>
            </select>
          </div>
        </div>

        {/* Unified Pills Bar */}
        {allRecommendedServices.length > 0 && (
          <div className="mb-10 flex flex-wrap items-center gap-2 text-left">
            {allRecommendedServices.map((sub) => {
              const isActive = selectedService === sub;
              return (
                <button
                  key={sub}
                  onClick={() => {
                    navigate(`?service=${sub}&subtype=${subtypeParam}&origin=${origin}&originId=${originId}&originName=${originName}`);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-sans font-bold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-midnight-slate text-white shadow-sm'
                      : 'bg-white border border-neutral-200 hover:border-champagne-gold/60 text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  {sub}
                </button>
              );
            })}
          </div>
        )}

        {/* Standard Subcategory Pills */}
        {allRecommendedServices.length === 0 && (SUB_CATEGORIES[category] || []).length > 0 && (
          <div className="mb-8 flex flex-wrap items-center gap-2 text-left">
            <button
              onClick={() => setSelectedSubcategory('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-sans font-bold transition-all duration-200 cursor-pointer ${
                selectedSubcategory === 'all'
                  ? 'bg-midnight-slate text-white'
                  : 'bg-white border border-neutral-200 text-neutral-600 hover:border-champagne-gold'
              }`}
            >
              All {formatCategory(category)}
            </button>
            {(SUB_CATEGORIES[category] || []).map((sub) => {
              const isActive = selectedSubcategory.toLowerCase() === sub.toLowerCase();
              return (
                <button
                  key={sub}
                  onClick={() => setSelectedSubcategory(sub)}
                  className={`px-4 py-1.5 rounded-full text-xs font-sans font-bold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-midnight-slate text-white'
                      : 'bg-white border border-neutral-200 text-neutral-600 hover:border-champagne-gold'
                  }`}
                >
                  {sub}
                </button>
              );
            })}
          </div>
        )}

        {/* Redesigned Grid of Cards */}
        {filteredMarketplaceItems.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {filteredMarketplaceItems.map((item) => {
              const isClaimed = item.claimed !== false;
              return (
              <div
                key={item.id}
                onClick={() => navigate(`/vendor/${item.id}`)}
                className="group bg-white rounded-3xl overflow-hidden shadow-xs hover:shadow-md hover:border-champagne-gold/40 border border-neutral-200/50 transition-all duration-300 flex flex-col cursor-pointer"
              >
                {/* Image Section — or "not claimed" notice */}
                {isClaimed ? (
                  <div className="relative h-64 overflow-hidden bg-neutral-100">
                    <div
                      className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-103"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                    {item.badge && (
                      <div className="absolute top-4 left-4 bg-black text-white text-[10px] font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-lg">
                        {item.badge}
                      </div>
                    )}
                    {item.isTicketmaster && (
                      <div className="absolute top-4 left-4 bg-[#026cdf]/90 text-white text-[10px] font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-lg flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> Ticketmaster Verified
                      </div>
                    )}
                    {item.rating && (
                      <div className="absolute top-4 right-4 bg-white text-black text-xs font-bold px-3 py-1 rounded-lg flex items-center gap-1 shadow-xs">
                        <Star className="w-3.5 h-3.5 fill-champagne-gold text-champagne-gold" />
                        {item.rating}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="relative h-64 overflow-hidden bg-neutral-800 flex flex-col items-center justify-center text-center px-6">
                    <AlertCircle className="w-10 h-10 text-champagne-gold/70 mb-3" />
                    <p className="text-white font-bold text-sm uppercase tracking-widest mb-1">Instant Book Unavailable</p>
                    <p className="text-neutral-400 text-xs leading-relaxed">This listing has not been claimed by the vendor.</p>
                  </div>
                )}

                {/* Text Details Section */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-[#F47245] uppercase tracking-[0.2em] block mb-2">
                      {item.subcategory || formatCategory(item.category)}
                    </span>
                    <h3 className="font-serif text-2xl text-neutral-900 font-bold mb-2 group-hover:text-champagne-gold transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-neutral-500 text-sm leading-relaxed mb-3 line-clamp-2">{item.description}</p>

                    {/* Phone */}
                    {item.phone && (
                      <p className="text-neutral-600 text-xs mb-1.5 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-champagne-gold shrink-0" />
                        {item.phone}
                      </p>
                    )}
                    {/* Address */}
                    {item.address && (
                      <p className="text-neutral-500 text-xs flex items-start gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-champagne-gold shrink-0 mt-0.5" />
                        {item.address}
                      </p>
                    )}
                  </div>

                  {/* Subtle divider line */}
                  <hr className="border-neutral-100/80 my-5" />

                  {/* Side-by-Side CTAs */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/vendor/${item.id}`);
                      }}
                      className="flex-1 bg-white border border-black hover:bg-neutral-50 text-neutral-900 font-sans text-xs font-bold px-4 py-2.5 rounded-lg cursor-pointer transition-colors"
                    >
                      See Details
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const newEvent = {
                          id: `iti-added-${item.id}-${Date.now()}`,
                          title: item.title,
                          category: item.category,
                          time: 'Flexible',
                          location: item.location,
                          status: 'Confirmed' as const,
                          price: item.price,
                          date: 'Saturday',
                          description: item.description || '',
                          image: item.image,
                        };
                        setItinerary((prev) => [...prev, newEvent]);
                        showToast(`Successfully added "${item.title}" directly to your Saturday Itinerary!`);
                      }}
                      className="flex-1 bg-black hover:bg-neutral-800 text-white font-sans text-xs font-bold px-4 py-2.5 rounded-lg cursor-pointer transition-colors"
                    >
                      Add to Plan
                    </button>
                  </div>
                </div>
              </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};
