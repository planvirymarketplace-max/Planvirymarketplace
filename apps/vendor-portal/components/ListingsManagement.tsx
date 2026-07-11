'use client';

import { useState } from 'react';
import { Search, Notifications, Apps, FormatListBulleted, GridView, Add, Home, ConfirmationNumber, EventSeat, Handyman, Edit, PauseCircle, Delete, Close, ChevronLeft, ChevronRight, CalendarToday, Restaurant, Group, LocationOn } from 'lucide-react';

export function ListingsManagement() {
  const [view, setView] = useState<'list' | 'grid'>('list');
  const [showPicker, setShowPicker] = useState(false);
  const [selectedCount, setSelectedCount] = useState(0);

  const listings = [
    {
      id: 1,
      title: 'Skyline Penthouse Loft',
      vertical: 'lodging',
      location: 'NYC, Upper West Side',
      price: '$450.00/nt',
      status: true,
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 2,
      title: 'Neon Horizon Music Festival',
      vertical: 'tickets',
      date: 'Aug 15-18',
      price: '$129.00/ea',
      status: true,
      image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 3,
      title: 'The Glass Warehouse Events',
      vertical: 'venue',
      capacity: 'Max 250',
      price: '$2,500.00/day',
      status: false,
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 4,
      title: 'Artisan Tasting Experience',
      vertical: 'dining',
      details: '7 Course Menu',
      price: '$185.00/pp',
      status: true,
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=400&q=80'
    }
  ];

  const getVerticalColor = (vertical: string) => {
    const colors = {
      lodging: 'bg-indigo-50 text-indigo-700',
      tickets: 'bg-pink-50 text-pink-700',
      venue: 'bg-emerald-50 text-emerald-700',
      dining: 'bg-amber-50 text-amber-700',
      transport: 'bg-blue-50 text-blue-700',
      service: 'bg-violet-50 text-violet-700'
    };
    return colors[vertical as keyof typeof colors] || 'bg-gray-50 text-gray-700';
  };

  const getVerticalStrip = (vertical: string) => {
    const strips = {
      lodging: 'vertical-strip-lodging',
      tickets: 'vertical-strip-tickets',
      venue: 'vertical-strip-venue',
      dining: 'vertical-strip-dining',
      transport: 'vertical-strip-transport',
      service: 'vertical-strip-service'
    };
    return strips[vertical as keyof typeof strips] || '';
  };

  return (
    <div className="pt-24 px-container-padding pb-32">
      {/* Page Header Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="font-display text-headline-lg text-primary">Listings Management</h2>
          <p className="text-on-surface-variant text-body-md">Manage and optimize your offerings across all verticals.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-surface-container border border-outline-variant rounded-lg p-1">
            <button
              onClick={() => setView('list')}
              className={`p-2 rounded-md transition-all ${view === 'list' ? 'bg-white shadow-sm text-primary' : 'text-on-surface-variant hover:text-primary'}`}
            >
              <FormatListBulleted className="w-5 h-5" />
            </button>
            <button
              onClick={() => setView('grid')}
              className={`p-2 rounded-md transition-all ${view === 'grid' ? 'bg-white shadow-sm text-primary' : 'text-on-surface-variant hover:text-primary'}`}
            >
              <GridView className="w-5 h-5" />
            </button>
          </div>
          <select className="bg-surface-container border-outline-variant text-on-surface-variant text-body-md rounded-lg px-4 py-2 focus:ring-secondary cursor-pointer">
            <option>All Verticals</option>
            <option>Lodging</option>
            <option>Tickets</option>
            <option>Venue</option>
            <option>Dining</option>
            <option>Transport</option>
            <option>Service</option>
          </select>
          <select className="bg-surface-container border-outline-variant text-on-surface-variant text-body-md rounded-lg px-4 py-2 focus:ring-secondary cursor-pointer">
            <option>All Statuses</option>
            <option>Active</option>
            <option>Paused</option>
            <option>Draft</option>
          </select>
          <button
            onClick={() => setShowPicker(true)}
            className="bg-secondary text-on-secondary px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 hover:opacity-90 transition-opacity active:scale-[0.98] shadow-sm"
          >
            <Add className="w-5 h-5" />
            New Listing
          </button>
        </div>
      </div>

      {/* Main Content: Listings Area */}
      <div data-view={view} className="listing-list flex flex-col gap-3">
        {listings.map((listing) => (
          <div key={listing.id} className={`listing-row relative flex items-center bg-white border border-outline-variant rounded-xl p-4 hover-shadow transition-all ${getVerticalStrip(listing.vertical)}`}>
            <input
              className="listing-row-checkbox w-5 h-5 rounded border-outline-variant text-secondary focus:ring-secondary mr-4 cursor-pointer"
              type="checkbox"
              onChange={(e) => setSelectedCount(e.target.checked ? selectedCount + 1 : selectedCount - 1)}
            />
            <div className="thumbnail-container w-24 h-16 rounded-lg overflow-hidden flex-shrink-0 mr-6">
              <img src={listing.image} alt={listing.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-headline-md text-primary truncate">{listing.title}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className={`${getVerticalColor(listing.vertical)} text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                  {listing.vertical}
                </span>
                {listing.location && (
                  <span className="text-on-surface-variant text-body-sm flex items-center">
                    <LocationOn className="w-4 h-4 mr-1" />
                    {listing.location}
                  </span>
                )}
                {listing.date && (
                  <span className="text-on-surface-variant text-body-sm flex items-center">
                    <CalendarToday className="w-4 h-4 mr-1" />
                    {listing.date}
                  </span>
                )}
                {listing.capacity && (
                  <span className="text-on-surface-variant text-body-sm flex items-center">
                    <Group className="w-4 h-4 mr-1" />
                    {listing.capacity}
                  </span>
                );
                {listing.details && (
                  <span className="text-on-surface-variant text-body-sm flex items-center">
                    <Restaurant className="w-4 h-4 mr-1" />
                    {listing.details}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-12 mr-8">
              <div className="text-right">
                <p className="text-label-caps text-on-surface-variant uppercase">Price</p>
                <p className="font-data-mono font-bold text-headline-md text-primary">{listing.price}</p>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-label-caps text-on-surface-variant uppercase mb-1">Status</p>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only toggle-switch"
                    defaultChecked={listing.status}
                  />
                  <div className="toggle-bg w-11 h-6 bg-surface-container-highest rounded-full transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
            </div>
            <button className="edit-btn opacity-0 text-on-surface-variant hover:text-secondary p-2 transition-opacity">
              <Edit className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      {/* Floating Bulk Action Bar */}
      <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 bg-primary text-white px-8 py-4 rounded-full flex items-center gap-8 shadow-2xl transition-all z-50 ${selectedCount > 0 ? 'translate-y-0 opacity-100' : 'translate-y-32 opacity-0'}`}>
        <div className="flex items-center gap-2">
          <span className="font-bold bg-secondary px-2 rounded">{selectedCount}</span>
          <span className="text-body-md font-medium">Selected</span>
        </div>
        <div className="h-6 w-px bg-on-primary-container opacity-30"></div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 hover:text-secondary-fixed transition-colors">
            <PauseCircle className="w-5 h-5" />
            Pause Selected
          </button>
          <button className="flex items-center gap-2 hover:text-secondary-fixed transition-colors">
            <Edit className="w-5 h-5" />
            Edit Pricing
          </button>
          <button className="flex items-center gap-2 text-error-container hover:opacity-80 transition-opacity">
            <Delete className="w-5 h-5" />
            Delete
          </button>
        </div>
        <button className="text-on-primary-container hover:text-white ml-2" onClick={() => setSelectedCount(0)}>
          <Close className="w-5 h-5" />
        </button>
      </div>

      {/* New Listing Picker Overlay */}
      <div className={`fixed inset-0 bg-primary/40 backdrop-blur-sm z-[60] flex items-center justify-center ${showPicker ? '' : 'modal-hidden'}`} id="listingPicker">
        <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 shadow-2xl">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="font-display text-headline-lg text-primary">Create New Listing</h3>
              <p className="text-on-surface-variant text-body-md">Select a category to begin your setup process.</p>
            </div>
            <button className="text-on-surface-variant hover:text-primary transition-colors" onClick={() => setShowPicker(false)}>
              <Close className="w-5 h-5" />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <button className="flex flex-col items-center p-6 border-2 border-outline-variant rounded-xl hover:border-secondary hover:bg-surface-container transition-all group">
              <div className="w-16 h-16 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Home className="w-8 h-8" />
              </div>
              <span className="font-bold text-primary">Property</span>
            </button>
            <button className="flex flex-col items-center p-6 border-2 border-outline-variant rounded-xl hover:border-secondary hover:bg-surface-container transition-all group">
              <div className="w-16 h-16 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <ConfirmationNumber className="w-8 h-8" />
              </div>
              <span className="font-bold text-primary">Tickets</span>
            </button>
            <button className="flex flex-col items-center p-6 border-2 border-outline-variant rounded-xl hover:border-secondary hover:bg-surface-container transition-all group">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <EventSeat className="w-8 h-8" />
              </div>
              <span className="font-bold text-primary">Venue</span>
            </button>
            <button className="flex flex-col items-center p-6 border-2 border-outline-variant rounded-xl hover:border-secondary hover:bg-surface-container transition-all group">
              <div className="w-16 h-16 rounded-full bg-violet-50 text-violet-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Handyman className="w-8 h-8" />
              </div>
              <span className="font-bold text-primary">Service</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
