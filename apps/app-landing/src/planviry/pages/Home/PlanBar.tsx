import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from '@/planviry/router';
import { useApp } from '../../context/AppContext';
import { searchZipCodes, ZipSuggestion } from '../../lib/zipSearch';
import { searchTaxonomy, TaxonomySuggestion } from '../../lib/taxonomySearch';

interface PlanBarProps {
  variant?: 'hero' | 'default';
}

export const PlanBar: React.FC<PlanBarProps> = ({ variant = 'default' }) => {
  const navigate = useNavigate();
  const {
    searchWhat,
    setSearchWhat,
    searchWhere,
    setSearchWhere,
    searchWhen,
    setSearchWhen,
    searchAttendees,
    setSearchAttendees,
    showToast,
    setActiveCategory
  } = useApp();

  const [localWhat, setLocalWhat] = useState(searchWhat || '');
  const [localWhere, setLocalWhere] = useState(searchWhere || '');
  const [localWhen, setLocalWhen] = useState(searchWhen || '');
  const [localAttendees, setLocalAttendees] = useState(searchAttendees || '4 Guests');

  // Autocomplete dropdown UI states
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

  // Filter taxonomy recommendations based on "What" typing using the full taxonomy library
  const filteredWhatSuggestions = useMemo(() => {
    return searchTaxonomy(localWhat);
  }, [localWhat]);

  // Filter cities list based on "Where" typing using the 44k US cities library (async API)
  const [filteredWhereSuggestions, setFilteredWhereSuggestions] = useState<ZipSuggestion[]>([]);
  useEffect(() => {
    let active = true;
    searchZipCodes(localWhere).then((results) => {
      if (active) setFilteredWhereSuggestions(results);
    });
    return () => { active = false; };
  }, [localWhere]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!localWhere.trim()) {
      showToast('Please specify a location');
      return;
    }

    setSearchWhat(localWhat);
    setSearchWhere(localWhere);
    setSearchWhen(localWhen);
    setSearchAttendees(localAttendees);

    // Carry intent intelligently to correct category if we can match the search text
    const matchedTaxonomy = filteredWhatSuggestions.find(
      item => item.name.toLowerCase() === localWhat.trim().toLowerCase()
    ) || filteredWhatSuggestions[0];

    const targetRoute = matchedTaxonomy?.route || '/services';
    const cleanCategory = targetRoute.replace('/', '');

    showToast(`✨ Plan set: ${localWhat || 'All Events'} in ${localWhere}`);
    
    // Set active category tab globally and navigate
    setActiveCategory(cleanCategory as any);
    navigate(`${targetRoute}?location=${encodeURIComponent(localWhere)}&q=${encodeURIComponent(localWhat)}`);
  };

  return (
    <div className={`w-full bg-white/75 backdrop-blur-md border border-midnight-slate/10 p-6 md:p-4 rounded-3xl md:rounded-full shadow-lg transition-all ${
      variant === 'hero' ? 'shadow-[0_12px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)]' : ''
    }`}>
      <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-2 divide-y md:divide-y-0 md:divide-x divide-midnight-slate/10 text-left items-center">
        
        {/* Field 1: What (Taxonomy Autocomplete) */}
        <div ref={whatRef} className="py-2 md:py-0 md:pr-4 pl-2 relative">
          <label className="block text-[9px] font-bold uppercase tracking-wider text-midnight-slate/40 font-mono mb-1">What is the occasion?</label>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#009689] shrink-0 text-base">celebration</span>
            <input
              type="text"
              placeholder="e.g. Wedding Reception"
              value={localWhat}
              onChange={(e) => {
                setLocalWhat(e.target.value);
                setShowWhatDropdown(true);
              }}
              onFocus={() => setShowWhatDropdown(true)}
              className="bg-transparent border-none p-0 focus:ring-0 text-xs font-semibold w-full text-midnight-slate outline-none placeholder:text-midnight-slate/30"
            />
          </div>

          {/* Taxonomy Suggestions Dropdown Overlay */}
          {showWhatDropdown && (
            <div className="absolute left-0 right-0 top-full mt-3 bg-white border border-neutral-200 rounded-2xl shadow-xl z-50 max-h-60 overflow-y-auto py-2 divide-y divide-neutral-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                {localWhat.trim() ? "Matching Taxonomies" : "Popular Occasions"}
              </div>
              {filteredWhatSuggestions.map((suggestion) => (
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
                    <span className="font-semibold text-neutral-800">{suggestion.name}</span>
                    <span className="text-[9px] text-neutral-400 font-normal">Category: {suggestion.route?.replace('/', '') || 'services'}</span>
                  </div>
                  <span className="text-[9px] text-champagne-gold font-mono font-medium bg-champagne-gold/5 border border-champagne-gold/15 px-1.5 py-0.5 rounded uppercase tracking-wider">{suggestion.type}</span>
                </button>
              ))}
              {filteredWhatSuggestions.length === 0 && (
                <div className="px-4 py-3 text-xs text-neutral-400 italic">No exact taxonomy matches. Press Enter to search custom.</div>
              )}
            </div>
          )}
        </div>

        {/* Field 2: Where (Cities, States, and ZIP Autocomplete) */}
        <div ref={whereRef} className="py-2 md:py-0 md:px-4 relative">
          <label className="block text-[9px] font-bold uppercase tracking-wider text-midnight-slate/40 font-mono mb-1">Where is it located?</label>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#009689] shrink-0 text-base">location_on</span>
            <input
              type="text"
              placeholder="Search city, state, or ZIP..."
              value={localWhere}
              onChange={(e) => {
                setLocalWhere(e.target.value);
                setShowWhereDropdown(true);
              }}
              onFocus={() => setShowWhereDropdown(true)}
              className="bg-transparent border-none p-0 focus:ring-0 text-xs font-semibold w-full text-midnight-slate outline-none placeholder:text-midnight-slate/30"
            />
          </div>

          {/* Cities / States / ZIP Suggestions Dropdown Overlay */}
          {showWhereDropdown && (
            <div className="absolute left-0 right-0 top-full mt-3 bg-white border border-neutral-200 rounded-2xl shadow-xl z-50 max-h-60 overflow-y-auto py-2 divide-y divide-neutral-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                {localWhere.trim() ? "Search Results" : "Featured US Cities"}
              </div>
              {filteredWhereSuggestions.map((city) => (
                <button
                  key={`${city.city}-${city.zip}`}
                  type="button"
                  onClick={() => {
                    setLocalWhere(`${city.city}, ${city.state}`);
                    setShowWhereDropdown(false);
                  }}
                  className="w-full text-left px-4 py-2.5 hover:bg-neutral-50 text-xs font-semibold text-neutral-800 transition-colors cursor-pointer flex items-center justify-between border-none bg-transparent"
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-neutral-400 text-sm">location_on</span>
                    <span>{city.city}, {city.state}</span>
                  </div>
                  <span className="text-[9px] font-mono font-medium text-neutral-400 bg-neutral-100 px-1.5 py-0.5 rounded">{city.zip}</span>
                </button>
              ))}
              {filteredWhereSuggestions.length === 0 && (
                <div className="px-4 py-3 text-xs text-neutral-400 italic">No cities found matching "{localWhere}". You can type any location.</div>
              )}
            </div>
          )}
        </div>

        {/* Field 3: When */}
        <div className="py-2 md:py-0 md:px-4">
          <label className="block text-[9px] font-bold uppercase tracking-wider text-midnight-slate/40 font-mono mb-1">When does it start?</label>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#009689] shrink-0 text-base">calendar_month</span>
            <input
              type="text"
              placeholder="e.g. Oct 18 - Oct 20"
              value={localWhen}
              onChange={(e) => setLocalWhen(e.target.value)}
              className="bg-transparent border-none p-0 focus:ring-0 text-xs font-semibold w-full text-midnight-slate outline-none placeholder:text-midnight-slate/30"
            />
          </div>
        </div>

        {/* Field 4: Attendees & Submit */}
        <div className="py-2 md:py-0 md:pl-4 pr-2 flex items-center justify-between gap-2">
          <div className="flex-grow">
            <label className="block text-[9px] font-bold uppercase tracking-wider text-midnight-slate/40 font-mono mb-1">Attendees / Guests</label>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#009689] shrink-0 text-base">groups</span>
              <select
                value={localAttendees}
                onChange={(e) => setLocalAttendees(e.target.value)}
                className="bg-transparent border-none p-0 focus:ring-0 text-xs font-semibold w-full text-midnight-slate outline-none cursor-pointer"
              >
                <option value="4 Guests">1-5 Guests</option>
                <option value="15 Guests">6-15 Guests</option>
                <option value="50 Guests">16-75 Guests</option>
                <option value="150 Guests">76+ Guests</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-10 h-10 rounded-full bg-midnight-slate hover:bg-midnight-slate/80 text-white flex items-center justify-center transition-all cursor-pointer shadow-md shrink-0 active:scale-95"
          >
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </button>
        </div>
      </form>
    </div>
  );
};
