import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useSearchParams } from '@/planviry/router';
import { useApp } from '../context/AppContext';
import { SURFACE_DATA } from '../lib/surface-data';
import { searchZipCodes, ZipSuggestion } from '../lib/zipSearch';
import { searchTaxonomy } from '../lib/taxonomySearch';
import { SUB_CATEGORIES } from '../data';
import { CategoryLens } from '../types';
import { MarketplaceFeed } from '../pages/MarketplaceFeed';
import { MapPin, Search, Calendar, ChevronRight, Compass, Sparkles, CheckCircle, ShieldCheck } from 'lucide-react';

interface GatedSurfacePageProps {
  category: CategoryLens;
}

export const GatedSurfacePage: React.FC<GatedSurfacePageProps> = ({ category }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    searchWhat,
    setSearchWhat,
    searchWhere,
    setSearchWhere,
    searchAttendees,
    setSearchAttendees,
    searchBudget,
    setSearchBudget,
    showToast
  } = useApp();

  // Parse URL parameters for initial intent (including subcategory from Explore directory)
  const urlWhat = searchParams.get('q') || searchParams.get('sub') || searchParams.get('service') || '';
  const urlWhere = searchParams.get('location') || '';

  // Synchronize URL params to AppContext on mount or when URL params change
  useEffect(() => {
    if (urlWhat) {
      setSearchWhat(urlWhat);
    }
    if (urlWhere) {
      setSearchWhere(urlWhere);
    }
  }, [urlWhat, urlWhere, setSearchWhat, setSearchWhere]);

  const surfaceInfo = useMemo(() => {
    return SURFACE_DATA[category] || {
      title: category.toUpperCase(),
      copy: "Explore verified listings and top-tier local experts.",
      heroImage: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80",
      whatOptions: []
    };
  }, [category]);

  // Determine which pieces of intent are present — use ONLY URL params for
  // gate detection, NOT global context. Global context can hold stale intent
  // from a previous page visit (e.g. "Technology & Science" from Things to Do),
  // which would wrongly pre-fill the gate and skip it. The gate should only
  // skip if intent was explicitly passed via ?q= and ?location= for THIS visit.
  const hasWhat = useMemo(() => {
    return !!urlWhat.trim();
  }, [urlWhat]);

  const hasWhere = useMemo(() => {
    return !!urlWhere.trim();
  }, [urlWhere]);

  // Identify state classification
  const missingState = useMemo<'both' | 'what' | 'where' | 'none'>(() => {
    if (!hasWhat && !hasWhere) return 'both';
    if (hasWhat && !hasWhere) return 'where';
    if (!hasWhat && hasWhere) return 'what';
    return 'none';
  }, [hasWhat, hasWhere]);

  // Handle local state form inputs
  const [localWhat, setLocalWhat] = useState('');
  const [localWhere, setLocalWhere] = useState('');
  const [showWhatDropdown, setShowWhatDropdown] = useState(false);
  const [showWhereDropdown, setShowWhereDropdown] = useState(false);
  const whatRef = useRef<HTMLDivElement>(null);
  const whereRef = useRef<HTMLDivElement>(null);

  // Synchronize local form state when global context intent changes
  // (render-time adjustment — avoids setState-in-effect cascades).
  const [prevSearchWhat, setPrevSearchWhat] = useState(searchWhat);
  const [prevSearchWhere, setPrevSearchWhere] = useState(searchWhere);
  if (searchWhat !== prevSearchWhat) {
    setPrevSearchWhat(searchWhat);
    if (searchWhat) setLocalWhat(searchWhat);
  }
  if (searchWhere !== prevSearchWhere) {
    setPrevSearchWhere(searchWhere);
    if (searchWhere) setLocalWhere(searchWhere);
  }

  // Close selector dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (whereRef.current && !whereRef.current.contains(event.target as Node)) {
        setShowWhereDropdown(false);
      }
      if (whatRef.current && !whatRef.current.contains(event.target as Node)) {
        setShowWhatDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter taxonomy for autocomplete using the full 449+ taxonomy library
  const filteredWhatSuggestions = useMemo(() => {
    return searchTaxonomy(localWhat);
  }, [localWhat]);

  // Filter cities for autocomplete using the 44k US cities library (async API)
  const [filteredCities, setFilteredCities] = useState<ZipSuggestion[]>([]);
  useEffect(() => {
    let active = true;
    searchZipCodes(localWhere).then((results) => {
      if (active) setFilteredCities(results);
    });
    return () => { active = false; };
  }, [localWhere]);

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();

    const finalWhat = missingState === 'where' ? urlWhat : localWhat;
    const finalWhere = missingState === 'what' ? urlWhere : localWhere;

    if ((missingState === 'both' || missingState === 'what') && !finalWhat.trim()) {
      showToast('Please select what you are looking for');
      return;
    }

    if ((missingState === 'both' || missingState === 'where') && !finalWhere.trim()) {
      showToast('Please select your target location');
      return;
    }

    // Save intent to global application state
    setSearchWhat(finalWhat);
    setSearchWhere(finalWhere);

    // Sync to URL search params to ensure shareable state
    const params = new URLSearchParams(searchParams);
    if (finalWhat) params.set('q', finalWhat);
    if (finalWhere) params.set('location', finalWhere);
    setSearchParams(params);

    showToast(`✨ Intent locked: ${finalWhat} in ${finalWhere}`);
  };

  // State 4: Both are set -> Render the Marketplace feed
  if (missingState === 'none') {
    return (
      <div className="min-h-screen bg-refined-offwhite pb-16">
        <MarketplaceFeed category={category} />
      </div>
    );
  }

  // States 1, 2, 3: Gated -> Render 2-column Intent Gate
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white animate-in fade-in duration-500">
      
      {/* Column 1: Immersive Left Branding Hero (No Phone, Clean Editorial) */}
      <div className="lg:w-1/2 relative bg-neutral-900 min-h-[300px] lg:min-h-screen flex flex-col justify-end p-8 lg:p-16 text-left overflow-hidden">
        {/* Full-bleed background image with modern luxury gold/black gradient */}
        <div className="absolute inset-0 z-0">
          <img
            src={surfaceInfo.heroImage}
            alt={surfaceInfo.title}
            className="w-full h-full object-cover opacity-55 scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-900/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/80 via-transparent to-transparent"></div>
        </div>

        {/* Brand-aligned left content */}
        <div className="relative z-10 max-w-lg space-y-6">
          <div className="w-12 h-[2px] bg-white"></div>
          <span className="font-sans text-[11px] font-bold tracking-[0.25em] text-white uppercase block">
            Exclusive Directory
          </span>
          <h1 className="font-display-lg text-4xl lg:text-6xl text-white tracking-tighter leading-none uppercase">
            {surfaceInfo.title}
          </h1>
          <p className="font-body-md text-sm lg:text-base text-neutral-300 leading-relaxed font-light">
            {surfaceInfo.copy}
          </p>
        </div>
      </div>

      {/* Column 2: Minimalist Intent Form Collection Panel */}
      <div className="lg:w-1/2 flex flex-col justify-center px-6 py-12 lg:p-20 bg-neutral-50/50">
        <div className="max-w-md w-full mx-auto space-y-8">
          
          {/* Section Heading dynamically adjustments */}
          <div className="space-y-3 text-left">
            <h2 className="font-display-lg text-2xl lg:text-3xl text-neutral-900 tracking-tight leading-tight uppercase font-medium">
              {missingState === 'both' && `Tell us your ${surfaceInfo.title.toLowerCase()} and where`}
              {missingState === 'what' && `What ${surfaceInfo.title.toLowerCase()} are you looking for?`}
              {missingState === 'where' && "Where are you going?"}
            </h2>
            <p className="font-body-sm text-neutral-500 text-xs">
              To browse our curated inventory and secure premium rates, please unlock this directory by selecting your requirements.
            </p>
          </div>

          <form onSubmit={handleContinue} className="space-y-6">
            
            {/* Show WHAT Autocomplete input if missing 'both' or 'what' */}
            {(missingState === 'both' || missingState === 'what') && (
              <div ref={whatRef} className="space-y-2 text-left relative">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 font-mono">
                  Search Specialty or Occasion
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. Wedding Planner, Hotels, Caterers..."
                    value={localWhat}
                    onChange={(e) => {
                      setLocalWhat(e.target.value);
                      setShowWhatDropdown(true);
                    }}
                    onFocus={() => setShowWhatDropdown(true)}
                    className="w-full bg-white border border-neutral-200 hover:border-neutral-300 rounded-xl pl-11 pr-4 py-3.5 text-xs font-semibold text-neutral-800 focus:ring-2 focus:ring-[white]/30 outline-none transition-all"
                  />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <Search className="w-4 h-4 text-neutral-400" />
                  </div>
                </div>

                {/* Autocomplete Suggestions */}
                {showWhatDropdown && (
                  <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-neutral-200 rounded-xl shadow-xl z-50 max-h-48 overflow-y-auto py-1.5 divide-y divide-neutral-50 animate-in fade-in slide-in-from-top-1 duration-200">
                    <div className="px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-neutral-400">
                      {localWhat.trim() ? "Matching Specialties" : "Curated Recommendations"}
                    </div>
                    {/* First render default surface options if search is empty */}
                    {!localWhat.trim() && surfaceInfo.whatOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => {
                          setLocalWhat(opt);
                          setShowWhatDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2.5 hover:bg-neutral-50 text-xs font-semibold text-neutral-800 transition-colors cursor-pointer flex items-center justify-between border-none bg-transparent"
                      >
                        <span className="flex items-center gap-2">
                          <Compass className="w-3.5 h-3.5 text-neutral-400" />
                          {opt}
                        </span>
                        <span className="text-[8px] text-neutral-400 font-mono bg-neutral-100 px-1 py-0.5 rounded uppercase font-normal">Preselected</span>
                      </button>
                    ))}
                    {/* Otherwise render filtered taxonomy suggestions */}
                    {localWhat.trim() && filteredWhatSuggestions.map((suggestion) => (
                      <button
                        key={suggestion.name}
                        type="button"
                        onClick={() => {
                          setLocalWhat(suggestion.name);
                          setShowWhatDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2.5 hover:bg-neutral-50 text-xs font-semibold text-neutral-800 transition-colors cursor-pointer flex items-center justify-between border-none bg-transparent"
                      >
                        <div className="flex flex-col text-left">
                          <span>{suggestion.name}</span>
                          <span className="text-[9px] text-neutral-400 font-normal">Category: {suggestion.route?.replace('/', '') || 'services'}</span>
                        </div>
                        <span className="text-[9px] text-champagne-gold font-mono font-medium bg-champagne-gold/5 border border-champagne-gold/15 px-1.5 py-0.5 rounded uppercase tracking-wider">{suggestion.type}</span>
                      </button>
                    ))}
                    {localWhat.trim() && filteredWhatSuggestions.length === 0 && (
                      <div className="px-4 py-2.5 text-xs text-neutral-400 italic">No matching options. Press enter to set custom.</div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Subcategory dropdown — structured drill-down from the category's full taxonomy */}
            {(missingState === 'both' || missingState === 'what') && (SUB_CATEGORIES[category] || []).length > 0 && (
              <div className="space-y-2 text-left">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 font-mono">
                  Or pick a {surfaceInfo.title.toLowerCase()} type
                </label>
                <div className="relative">
                  <select
                    value={localWhat && (SUB_CATEGORIES[category] || []).includes(localWhat) ? localWhat : ''}
                    onChange={(e) => {
                      setLocalWhat(e.target.value);
                      setShowWhatDropdown(false);
                    }}
                    className="w-full appearance-none bg-white border border-neutral-200 hover:border-neutral-300 rounded-xl pl-11 pr-4 py-3.5 text-xs font-semibold text-neutral-800 focus:ring-2 focus:ring-brand-teal/30 outline-none transition-all cursor-pointer"
                  >
                    <option value="">— Browse all {surfaceInfo.title.toLowerCase()} types —</option>
                    {(SUB_CATEGORIES[category] || []).map((sub) => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))}
                  </select>
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <span className="material-symbols-outlined text-neutral-400 text-base">category</span>
                  </div>
                </div>
                <p className="text-[9px] text-neutral-400 font-mono">
                  {(SUB_CATEGORIES[category] || []).length} verified specialties available
                </p>
              </div>
            )}

            {/* Show WHERE Autocomplete input if missing 'both' or 'where' */}
            {(missingState === 'both' || missingState === 'where') && (
              <div ref={whereRef} className="space-y-2 text-left relative">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 font-mono">
                  Target Destination
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search city, state, or ZIP code..."
                    value={localWhere}
                    onChange={(e) => {
                      setLocalWhere(e.target.value);
                      setShowWhereDropdown(true);
                    }}
                    onFocus={() => setShowWhereDropdown(true)}
                    className="w-full bg-white border border-neutral-200 hover:border-neutral-300 rounded-xl pl-11 pr-4 py-3.5 text-xs font-semibold text-neutral-800 focus:ring-2 focus:ring-[white]/30 outline-none transition-all"
                  />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <MapPin className="w-4 h-4 text-neutral-400" />
                  </div>
                </div>

                {/* Autocomplete Suggestions */}
                {showWhereDropdown && (
                  <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-neutral-200 rounded-xl shadow-xl z-50 max-h-48 overflow-y-auto py-1.5 divide-y divide-neutral-50 animate-in fade-in slide-in-from-top-1 duration-200">
                    <div className="px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-neutral-400">
                      {localWhere.trim() ? "Search Results" : "Featured US Destinations"}
                    </div>
                    {filteredCities.map((city) => (
                      <button
                        key={`${city.city}-${city.zip}`}
                        type="button"
                        onClick={() => {
                          setLocalWhere(`${city.city}, ${city.state}`);
                          setShowWhereDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2.5 hover:bg-neutral-50 text-xs font-semibold text-neutral-800 transition-colors cursor-pointer flex items-center justify-between border-none bg-transparent"
                      >
                        <span className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                          {city.city}, {city.state}
                        </span>
                        <span className="text-[9px] font-mono font-medium text-neutral-400 bg-neutral-100 px-1.5 py-0.5 rounded">{city.zip}</span>
                      </button>
                    ))}
                    {filteredCities.length === 0 && (
                      <div className="px-4 py-2.5 text-xs text-neutral-400 italic">No matching cities found. Press enter to set.</div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Display pre-filled info for UX context */}
            {missingState === 'where' && hasWhat && (
              <div className="p-3.5 bg-neutral-100 rounded-xl border border-neutral-200/40 flex items-center gap-3 text-left">
                <Compass className="w-4 h-4 text-[white] shrink-0" />
                <div>
                  <span className="block text-[8px] font-bold uppercase tracking-wider text-neutral-400">Pre-selected Category</span>
                  <span className="text-xs font-semibold text-neutral-700">{urlWhat}</span>
                </div>
              </div>
            )}

            {missingState === 'what' && hasWhere && (
              <div className="p-3.5 bg-neutral-100 rounded-xl border border-neutral-200/40 flex items-center gap-3 text-left">
                <MapPin className="w-4 h-4 text-[white] shrink-0" />
                <div>
                  <span className="block text-[8px] font-bold uppercase tracking-wider text-neutral-400">Pre-selected Destination</span>
                  <span className="text-xs font-semibold text-neutral-700">{urlWhere}</span>
                </div>
              </div>
            )}

            {/* Guest Count + Budget dropdowns (always visible) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 font-mono">
                  Guest Count
                </label>
                <div className="relative">
                  <select
                    value={searchAttendees}
                    onChange={(e) => setSearchAttendees(e.target.value)}
                    className="w-full appearance-none bg-white border border-neutral-200 hover:border-neutral-300 rounded-xl pl-11 pr-4 py-3.5 text-xs font-semibold text-neutral-800 focus:ring-2 focus:ring-[white]/30 outline-none transition-all cursor-pointer"
                  >
                    <option value="1-5 Guests">1-5 Guests</option>
                    <option value="6-15 Guests">6-15 Guests</option>
                    <option value="16-50 Guests">16-50 Guests</option>
                    <option value="51-100 Guests">51-100 Guests</option>
                    <option value="101-250 Guests">101-250 Guests</option>
                    <option value="250+ Guests">250+ Guests</option>
                  </select>
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <span className="material-symbols-outlined text-neutral-400 text-base">groups</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 font-mono">
                  Budget
                </label>
                <div className="relative">
                  <select
                    value={searchBudget}
                    onChange={(e) => setSearchBudget(e.target.value)}
                    className="w-full appearance-none bg-white border border-neutral-200 hover:border-neutral-300 rounded-xl pl-11 pr-4 py-3.5 text-xs font-semibold text-neutral-800 focus:ring-2 focus:ring-[white]/30 outline-none transition-all cursor-pointer"
                  >
                    <option value="Any Budget">Any Budget</option>
                    <option value="Under $1,000">Under $1,000</option>
                    <option value="$1,000 - $5,000">$1,000 - $5,000</option>
                    <option value="$5,000 - $15,000">$5,000 - $15,000</option>
                    <option value="$15,000 - $50,000">$15,000 - $50,000</option>
                    <option value="$50,000+">$50,000+</option>
                  </select>
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <span className="material-symbols-outlined text-neutral-400 text-base">payments</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-neutral-900 hover:bg-neutral-800 active:scale-98 text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all cursor-pointer shadow-lg hover:shadow-xl mt-4 flex items-center justify-center gap-2"
            >
              Unlock Directory
              <ChevronRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

