import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { MARKETPLACE_ITEMS } from '../../data';
import { CartItem } from '../../types';

export const GlobalAdminPage: React.FC = () => {
  const {
    bookingRequests,
    handleUpdateBookingStatus,
    itinerary,
    tasks,
    collaborators,
    activities,
    setActivities,
    showToast
  } = useApp();

  // Selected administrative tab
  const [adminTab, setAdminTab] = useState<'dashboard' | 'vendors' | 'catalog' | 'settings'>('dashboard');

  // Search in catalog manager
  const [catalogSearch, setCatalogSearch] = useState('');
  const [catalogFilter, setCatalogFilter] = useState('all');

  // Local state for administrative catalog list to support additions/deletions in prototype
  const [localCatalog, setLocalCatalog] = useState<CartItem[]>(MARKETPLACE_ITEMS);

  // New Vendor Form State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newVendorName, setNewVendorName] = useState('');
  const [newVendorCategory, setNewVendorCategory] = useState('vendors');
  const [newVendorSub, setNewVendorSub] = useState('Photographer');
  const [newVendorPrice, setNewVendorPrice] = useState('2000');
  const [newVendorLocation, setNewVendorLocation] = useState('Savannah, GA');
  const [newVendorDesc, setNewVendorDesc] = useState('');
  const [newVendorBadge, setNewVendorBadge] = useState('Featured');

  // Administrative Platform Settings
  const [autoApprove, setAutoApprove] = useState(false);
  const [disbursementFee, setDisbursementFee] = useState(1.5);
  const [stripeConnectStatus, setStripeConnectStatus] = useState('Active');
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  // Calculate global statistics
  const totalBookedValue = useMemo(() => {
    return itinerary.reduce((sum, item) => sum + (item.price || 0), 0);
  }, [itinerary]);

  const totalMarketplaceItems = localCatalog.length;
  
  const pendingApprovalsCount = useMemo(() => {
    return bookingRequests.filter(b => b.status === 'Pending').length;
  }, [bookingRequests]);

  // Filter catalog items
  const filteredCatalog = useMemo(() => {
    return localCatalog.filter(item => {
      const matchSearch = item.title.toLowerCase().includes(catalogSearch.toLowerCase()) ||
                          item.location.toLowerCase().includes(catalogSearch.toLowerCase()) ||
                          (item.subcategory && item.subcategory.toLowerCase().includes(catalogSearch.toLowerCase()));
      const matchFilter = catalogFilter === 'all' ? true : item.category === catalogFilter;
      return matchSearch && matchFilter;
    });
  }, [localCatalog, catalogSearch, catalogFilter]);

  // Handle addition of a mock listing
  const handleAddListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVendorName.trim()) return;

    const newItem: CartItem = {
      id: `mock-vendor-${Date.now()}`,
      title: newVendorName,
      category: newVendorCategory as any,
      subcategory: newVendorSub,
      price: parseFloat(newVendorPrice) || 1200,
      location: newVendorLocation,
      image: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=800&q=80',
      badge: newVendorBadge,
      rating: 4.8,
      description: newVendorDesc || 'Premium listing onboarded by platform admin.'
    };

    setLocalCatalog(prev => [newItem, ...prev]);
    showToast(`Added listing: "${newVendorName}" successfully!`);
    
    // Add activity log
    const newAct = {
      id: `act-${Date.now()}`,
      user: 'Platform Admin',
      action: `onboarded new partner listing: "${newVendorName}"`,
      time: 'Just now',
      icon: 'add_business',
    };
    setActivities(prev => [newAct, ...prev]);

    // Reset Form
    setNewVendorName('');
    setNewVendorDesc('');
    setShowAddModal(false);
  };

  // Handle delete listing
  const handleDeleteListing = (id: string, name: string) => {
    setLocalCatalog(prev => prev.filter(item => item.id !== id));
    showToast(`Removed listing: "${name}"`);
    
    const newAct = {
      id: `act-${Date.now()}`,
      user: 'Platform Admin',
      action: `removed listing: "${name}"`,
      time: 'Just now',
      icon: 'delete',
    };
    setActivities(prev => [newAct, ...prev]);
  };

  return (
    <div className="animate-in fade-in duration-500 max-w-7xl mx-auto px-4 md:px-8 py-10">
      
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-200/50 pb-8 mb-8 gap-4">
        <div>
          <span className="text-[10px] font-bold tracking-[0.25em] text-champagne-gold uppercase flex items-center gap-1.5 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Global Operations Portal
          </span>
          <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-neutral-900">Platform Admin</h1>
          <p className="text-neutral-500 text-xs mt-1">Real-time marketplace curation, global itinerary bookkeeping, and vendor service configuration.</p>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex bg-neutral-100 p-1.5 rounded-2xl gap-1 shrink-0 border border-neutral-200/20">
          {[
            { id: 'dashboard', label: 'Overview', icon: 'dashboard' },
            { id: 'vendors', label: 'Booking Requests', icon: 'handshake' },
            { id: 'catalog', label: 'Curation Catalog', icon: 'storefront' },
            { id: 'settings', label: 'Settings', icon: 'tune' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setAdminTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all border-none cursor-pointer ${
                adminTab === tab.id
                  ? 'bg-white text-neutral-900 shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-900 bg-transparent'
              }`}
            >
              <span className="material-symbols-outlined text-base select-none">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Board (Always Visible) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div className="bg-white border border-neutral-200/60 p-6 rounded-3xl shadow-xs hover:border-neutral-300 transition-all">
          <div className="flex justify-between items-start mb-3 text-neutral-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">Estimated Gross Volume</span>
            <span className="material-symbols-outlined text-xl text-champagne-gold select-none">payments</span>
          </div>
          <p className="font-serif text-3xl font-bold text-neutral-900">${(totalBookedValue * 1.05 + 14850).toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
          <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
            <span className="material-symbols-outlined text-xs">trending_up</span> +12.4% this week
          </span>
        </div>

        <div className="bg-white border border-neutral-200/60 p-6 rounded-3xl shadow-xs hover:border-neutral-300 transition-all">
          <div className="flex justify-between items-start mb-3 text-neutral-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">Active Guest Planners</span>
            <span className="material-symbols-outlined text-xl text-neutral-500 select-none">groups</span>
          </div>
          <p className="font-serif text-3xl font-bold text-neutral-900">48</p>
          <span className="text-[10px] text-neutral-500 font-medium block mt-1">
            Across 14 luxury travel events
          </span>
        </div>

        <div className="bg-white border border-neutral-200/60 p-6 rounded-3xl shadow-xs hover:border-neutral-300 transition-all">
          <div className="flex justify-between items-start mb-3 text-neutral-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">Total Curation Items</span>
            <span className="material-symbols-outlined text-xl text-neutral-500 select-none">inventory_2</span>
          </div>
          <p className="font-serif text-3xl font-bold text-neutral-900">{totalMarketplaceItems}</p>
          <span className="text-[10px] text-neutral-500 font-medium block mt-1">
            Across 9 bento-categories
          </span>
        </div>

        <div className="bg-white border border-neutral-200/60 p-6 rounded-3xl shadow-xs hover:border-neutral-300 transition-all">
          <div className="flex justify-between items-start mb-3 text-neutral-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">Needs Platform Sync</span>
            <span className="material-symbols-outlined text-xl text-amber-500 select-none">gavel</span>
          </div>
          <p className="font-serif text-3xl font-bold text-neutral-900">{pendingApprovalsCount}</p>
          <span className={`text-[10px] font-semibold block mt-1 ${pendingApprovalsCount > 0 ? 'text-amber-600' : 'text-neutral-500'}`}>
            {pendingApprovalsCount > 0 ? 'Urgent vendor attention' : 'All clear & fully synchronized'}
          </span>
        </div>
      </div>

      {/* TAB CONTENTS */}

      {/* TAB 1: OVERVIEW & SYSTEM AUDITING */}
      {adminTab === 'dashboard' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Active Bookings Ledger */}
          <div className="lg:col-span-2 bg-white border border-neutral-200/60 rounded-3xl p-6 shadow-xs space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-neutral-100">
              <div>
                <h3 className="font-serif text-lg font-bold text-neutral-900">Current Client Itinerary Bookings</h3>
                <p className="text-neutral-500 text-xs mt-0.5">Live items booked by guests for testing & event design.</p>
              </div>
              <span className="text-[10px] bg-neutral-100 text-neutral-600 font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {itinerary.length} Booked Items
              </span>
            </div>

            {itinerary.length === 0 ? (
              <div className="py-12 text-center text-neutral-400">
                <span className="material-symbols-outlined text-4xl block mb-2 text-neutral-300">receipt_long</span>
                <p className="text-xs font-semibold">No Bookings in Itinerary</p>
                <p className="text-[10px] text-neutral-400 max-w-xs mx-auto mt-1">Go to any of the directory pages (Spaces, Vendors, Food) and select/book items to populate this ledger.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-neutral-400 uppercase tracking-wider font-bold text-[10px] border-b border-neutral-100 pb-3">
                      <th className="py-3">Event / Service</th>
                      <th>Category</th>
                      <th>Scheduled Date</th>
                      <th>Price</th>
                      <th>Client Split</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {itinerary.map((event) => (
                      <tr key={event.id} className="hover:bg-neutral-50/50 transition-colors">
                        <td className="py-3.5 pr-4">
                          <p className="font-bold text-neutral-900">{event.title}</p>
                          <p className="text-[10px] text-neutral-400">{event.location}</p>
                        </td>
                        <td>
                          <span className="bg-neutral-100 text-neutral-700 px-2.5 py-0.5 rounded-lg text-[9px] font-bold uppercase tracking-wide">
                            {event.category}
                          </span>
                        </td>
                        <td className="text-neutral-500">
                          <p className="font-medium">{event.date || 'TBD'}</p>
                          <p className="text-[10px] text-neutral-400">{event.time || 'All-Day'}</p>
                        </td>
                        <td className="font-serif font-bold text-neutral-900">
                          ${event.price?.toLocaleString()}
                        </td>
                        <td>
                          <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Verified Shared
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Audit Logs and Collaborators */}
          <div className="space-y-6">
            <div className="bg-white border border-neutral-200/60 rounded-3xl p-6 shadow-xs">
              <h3 className="font-serif text-lg font-bold text-neutral-900 mb-4 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-xl text-neutral-500">assignment</span>
                Security &amp; Action Log
              </h3>
              <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1 hide-scrollbar">
                {activities.map((act) => (
                  <div key={act.id} className="flex gap-3 text-xs pb-3.5 border-b border-neutral-100 last:border-none last:pb-0">
                    <span className="material-symbols-outlined text-neutral-400 bg-neutral-100 p-1.5 rounded-xl text-base h-fit shrink-0 select-none">
                      {act.icon || 'history'}
                    </span>
                    <div>
                      <p className="text-neutral-900 font-medium">
                        <span className="font-bold text-neutral-900">{act.user}</span> {act.action}
                      </p>
                      <span className="text-[10px] text-neutral-400 block mt-1">{act.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: VENDOR APPROVAL REQUESTS */}
      {adminTab === 'vendors' && (
        <div className="bg-white border border-neutral-200/60 rounded-3xl p-6 shadow-xs space-y-6">
          <div className="pb-4 border-b border-neutral-100">
            <h3 className="font-serif text-lg font-bold text-neutral-900">Merchant Service Approvals</h3>
            <p className="text-neutral-500 text-xs mt-0.5">Approve, decline, or renegotiate pending bento reservation contracts submitted by vendors.</p>
          </div>

          {bookingRequests.length === 0 ? (
            <p className="text-xs text-neutral-400 text-center py-10">No contract requests submitted yet.</p>
          ) : (
            <div className="space-y-4">
              {bookingRequests.map((req) => (
                <div 
                  key={req.id} 
                  className={`border rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-5 transition-all ${
                    req.status === 'Approved' ? 'border-emerald-200/70 bg-emerald-50/20' :
                    req.status === 'Declined' ? 'border-rose-200/70 bg-rose-50/20' : 'border-neutral-200/50 bg-white shadow-xs'
                  }`}
                >
                  <div className="space-y-2 max-w-xl">
                    <div className="flex items-center gap-2">
                      <span className="bg-neutral-100 text-neutral-700 font-bold text-[9px] px-2.5 py-1 rounded uppercase tracking-wider">
                        {req.serviceCategory}
                      </span>
                      <span className="text-neutral-400 text-xs">•</span>
                      <span className="text-xs font-semibold text-neutral-600">{req.clientName}</span>
                    </div>
                    <h4 className="font-serif text-base font-bold text-neutral-900">{req.serviceTitle}</h4>
                    <p className="text-neutral-500 text-xs line-clamp-2">{req.description || 'No additional details provided with contract request.'}</p>
                    
                    <div className="flex flex-wrap gap-4 text-[10px] text-neutral-400 font-medium">
                      <span>📅 Requested: Oct 19, 2026</span>
                      <span>💰 Base Price: ${req.amount.toLocaleString()}</span>
                      <span>🤵 Party: {req.partySize || '4-6 Guests'}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end md:self-auto">
                    {req.status === 'Pending' ? (
                      <>
                        <button
                          onClick={() => {
                            handleUpdateBookingStatus(req.id, 'Declined');
                            showToast(`Declined booking: "${req.serviceTitle}"`);
                          }}
                          className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200/70 text-neutral-700 text-xs font-bold uppercase tracking-widest rounded-xl transition-all border-none cursor-pointer"
                        >
                          Decline
                        </button>
                        <button
                          onClick={() => {
                            handleUpdateBookingStatus(req.id, 'Approved');
                            showToast(`Approved contract for: "${req.serviceTitle}"`);
                            const newAct = {
                              id: `act-${Date.now()}`,
                              user: 'Platform Admin',
                              action: `approved contract request for "${req.serviceTitle}"`,
                              time: 'Just now',
                              icon: 'verified_user',
                            };
                            setActivities(prev => [newAct, ...prev]);
                          }}
                          className="px-4.5 py-2.5 bg-primary text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-neutral-800 transition-all border-none cursor-pointer"
                        >
                          Approve Request
                        </button>
                      </>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className={`material-symbols-outlined text-xl select-none ${req.status === 'Approved' ? 'text-emerald-500' : 'text-rose-500'}`}>
                          {req.status === 'Approved' ? 'check_circle' : 'cancel'}
                        </span>
                        <span className={`text-xs font-bold uppercase tracking-wider ${req.status === 'Approved' ? 'text-emerald-700' : 'text-rose-700'}`}>
                          {req.status}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: CATALOG & CURATION MANAGER */}
      {adminTab === 'catalog' && (
        <div className="bg-white border border-neutral-200/60 rounded-3xl p-6 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-neutral-100 pb-5 gap-4">
            <div>
              <h3 className="font-serif text-lg font-bold text-neutral-900">Marketplace Curation Manager</h3>
              <p className="text-neutral-500 text-xs mt-0.5">Search, adjust prices, tag quality badges, onboard mock vendors, or remove obsolete items.</p>
            </div>
            
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-1.5 px-4.5 py-2.5 bg-primary text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-neutral-800 transition-all border-none cursor-pointer shrink-0"
            >
              <span className="material-symbols-outlined text-sm select-none">add</span>
              Onboard Vendor
            </button>
          </div>

          {/* Search/Filters bar */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex items-center gap-2.5 bg-neutral-50 px-3.5 py-2.5 rounded-xl border border-neutral-200/40 flex-grow">
              <span className="material-symbols-outlined text-base text-neutral-400 shrink-0 select-none">search</span>
              <input
                type="text"
                placeholder="Search listing name, category, or location..."
                value={catalogSearch}
                onChange={(e) => setCatalogSearch(e.target.value)}
                className="bg-transparent border-none text-xs w-full focus:outline-none focus:ring-0 text-neutral-800"
              />
            </div>

            <select
              value={catalogFilter}
              onChange={(e) => setCatalogFilter(e.target.value)}
              className="px-4 py-2 bg-neutral-50 border border-neutral-200/40 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-primary/20 text-neutral-700 cursor-pointer h-10"
            >
              <option value="all">All Categories</option>
              <option value="vendors">Vendors</option>
              <option value="services">Services</option>
              <option value="plan">Plan</option>
              <option value="things-to-do">Things To Do</option>
              <option value="food-drink">Food &amp; Drink</option>
              <option value="live-shows">Live Shows</option>
              <option value="travel">Travel</option>
              <option value="party">Party Supplies</option>
              <option value="spaces">Spaces</option>
            </select>
          </div>

          {/* Listings List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCatalog.map((item) => (
              <div key={item.id} className="border border-neutral-100 rounded-2xl overflow-hidden hover:shadow-xs transition-all flex flex-col justify-between group bg-neutral-50/20">
                <div className="p-4 space-y-3">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <span className="text-[8px] bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded uppercase font-bold tracking-wider">
                        {item.category}
                      </span>
                      {item.subcategory && (
                        <span className="text-[9px] text-neutral-400 font-bold ml-1.5 uppercase">
                          {item.subcategory}
                        </span>
                      )}
                    </div>
                    {item.badge && (
                      <span className="bg-amber-50 text-amber-800 text-[8px] font-extrabold uppercase px-2 py-0.5 rounded border border-amber-100 tracking-wider">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  <h4 className="font-serif text-sm font-bold text-neutral-900 group-hover:text-primary transition-colors leading-snug">{item.title}</h4>
                  <p className="text-neutral-500 text-[11px] leading-relaxed line-clamp-2">{item.description}</p>
                  
                  <div className="flex justify-between items-center text-[10px] text-neutral-400 pt-1">
                    <span className="flex items-center gap-1">📍 {item.location}</span>
                    <span className="font-serif font-bold text-neutral-900 text-sm">${item.price.toLocaleString()}</span>
                  </div>
                </div>

                <div className="p-3 bg-neutral-50/60 border-t border-neutral-100/50 flex gap-2">
                  <button
                    onClick={() => {
                      const newPrice = prompt(`Enter new pricing for ${item.title}:`, item.price.toString());
                      if (newPrice && !isNaN(parseFloat(newPrice))) {
                        setLocalCatalog(prev => prev.map(c => c.id === item.id ? { ...c, price: parseFloat(newPrice) } : c));
                        showToast(`Pricing updated for ${item.title}`);
                      }
                    }}
                    className="flex-grow py-1.5 bg-white border border-neutral-200/60 hover:bg-neutral-100 text-neutral-700 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer"
                  >
                    Adjust Price
                  </button>
                  <button
                    onClick={() => handleDeleteListing(item.id, item.title)}
                    className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 text-[10px] font-bold uppercase tracking-wider rounded-lg border-none transition-all cursor-pointer flex items-center justify-center"
                    title="Remove item"
                  >
                    <span className="material-symbols-outlined text-sm select-none">delete</span>
                  </button>
                </div>
              </div>
            ))}

            {filteredCatalog.length === 0 && (
              <div className="col-span-full py-12 text-center text-neutral-400">
                <span className="material-symbols-outlined text-4xl block mb-2 text-neutral-300">search_off</span>
                <p className="text-xs font-semibold">No Listings Match Filters</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: SYSTEM CONFIGURE SETTINGS */}
      {adminTab === 'settings' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-300">
          
          {/* General Policies */}
          <div className="bg-white border border-neutral-200/60 rounded-3xl p-6 shadow-xs space-y-5">
            <h3 className="font-serif text-lg font-bold text-neutral-900 pb-3 border-b border-neutral-100">Marketplace Service Settings</h3>
            
            <div className="flex items-center justify-between py-2 border-b border-neutral-50">
              <div>
                <h4 className="font-bold text-xs text-neutral-800">Automatic Vendor Approvals</h4>
                <p className="text-[10px] text-neutral-400 mt-0.5">Instantly approve merchant itineraries without admin mediation.</p>
              </div>
              <input 
                type="checkbox" 
                checked={autoApprove}
                onChange={() => {
                  setAutoApprove(!autoApprove);
                  showToast(`Automatic approvals turned ${!autoApprove ? 'ON' : 'OFF'}`);
                }}
                className="w-4 h-4 text-primary rounded focus:ring-primary cursor-pointer" 
              />
            </div>

            <div className="flex items-center justify-between py-2 border-b border-neutral-50">
              <div>
                <h4 className="font-bold text-xs text-neutral-800">Undergoing System Maintenance</h4>
                <p className="text-[10px] text-neutral-400 mt-0.5">Gracefully reject client payment processing and warn vendor partners.</p>
              </div>
              <input 
                type="checkbox" 
                checked={maintenanceMode}
                onChange={() => {
                  setMaintenanceMode(!maintenanceMode);
                  showToast(`Maintenance mode turned ${!maintenanceMode ? 'ON' : 'OFF'}`);
                }}
                className="w-4 h-4 text-primary rounded focus:ring-primary cursor-pointer" 
              />
            </div>

            <div className="space-y-2 py-2">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-xs text-neutral-800">Global Service Surcharge fee</h4>
                <span className="text-xs font-bold text-primary">{disbursementFee}%</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="5.0"
                step="0.5"
                value={disbursementFee}
                onChange={(e) => setDisbursementFee(parseFloat(e.target.value))}
                className="w-full accent-primary bg-neutral-100 h-1.5 rounded-lg appearance-none cursor-pointer"
              />
              <p className="text-[9px] text-neutral-400">Processing markup added to group splits to cover platform Stripe escrow costs.</p>
            </div>
          </div>

          {/* Connected Infrastructures */}
          <div className="bg-white border border-neutral-200/60 rounded-3xl p-6 shadow-xs space-y-5">
            <h3 className="font-serif text-lg font-bold text-neutral-900 pb-3 border-b border-neutral-100">Gateway Integrations</h3>

            <div className="p-4 bg-neutral-50 rounded-2xl flex items-center justify-between border border-neutral-100">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-2xl text-[#635BFF] select-none">account_balance</span>
                <div>
                  <h4 className="text-xs font-bold text-neutral-800">Stripe Connect Engine</h4>
                  <p className="text-[9px] text-neutral-400">Handles dynamic multi-split credit routing.</p>
                </div>
              </div>
              <button 
                onClick={() => {
                  const states = ['Active', 'Suspended'];
                  const next = states[(states.indexOf(stripeConnectStatus) + 1) % 2];
                  setStripeConnectStatus(next);
                  showToast(`Stripe Connect gateway state toggled to ${next}`);
                }}
                className={`px-3 py-1.5 text-[9px] font-bold uppercase rounded-lg border-none cursor-pointer transition-all ${
                  stripeConnectStatus === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                }`}
              >
                {stripeConnectStatus}
              </button>
            </div>

            <div className="p-4 bg-neutral-50 rounded-2xl flex items-center justify-between border border-neutral-100">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-2xl text-[#004C97] select-none">confirmation_number</span>
                <div>
                  <h4 className="text-xs font-bold text-neutral-800">Ticketmaster API Curation</h4>
                  <p className="text-[9px] text-neutral-400">Provides verified live show inventory feed.</p>
                </div>
              </div>
              <span className="bg-emerald-50 text-emerald-700 text-[9px] font-bold px-2.5 py-1.5 rounded-lg">ONLINE</span>
            </div>

            <div className="p-4 bg-neutral-50 rounded-2xl flex items-center justify-between border border-neutral-100">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-2xl text-neutral-600 select-none">distance</span>
                <div>
                  <h4 className="text-xs font-bold text-neutral-800">Google Maps Platform</h4>
                  <p className="text-[9px] text-neutral-400">Route guidance &amp; venue distances.</p>
                </div>
              </div>
              <span className="bg-emerald-50 text-emerald-700 text-[9px] font-bold px-2.5 py-1.5 rounded-lg">CONNECTED</span>
            </div>
          </div>

        </div>
      )}

      {/* ADD VENDOR MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-neutral-900/40 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-neutral-200/50 flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-neutral-100 flex justify-between items-center">
              <h3 className="font-serif text-lg font-bold text-neutral-900">Onboard New Curation Vendor</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="p-1.5 hover:bg-neutral-100 rounded-full border-none cursor-pointer bg-transparent"
              >
                <span className="material-symbols-outlined text-neutral-500 text-lg select-none">close</span>
              </button>
            </div>

            <form onSubmit={handleAddListing} className="p-6 space-y-4 overflow-y-auto shrink select-none">
              <div className="space-y-1.5">
                <label className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 block">Vendor Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Forsyth Carriage Service"
                  value={newVendorName}
                  onChange={(e) => setNewVendorName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:border-primary focus:outline-none focus:ring-0 text-xs text-neutral-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 block">Category</label>
                  <select
                    value={newVendorCategory}
                    onChange={(e) => setNewVendorCategory(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 focus:border-primary text-xs text-neutral-700 cursor-pointer"
                  >
                    <option value="vendors">Vendors</option>
                    <option value="services">Services</option>
                    <option value="plan">Plan</option>
                    <option value="things-to-do">Things To Do</option>
                    <option value="food-drink">Food &amp; Drink</option>
                    <option value="live-shows">Live Shows</option>
                    <option value="travel">Travel</option>
                    <option value="party">Party Supplies</option>
                    <option value="spaces">Spaces</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 block">Subcategory Type</label>
                  <input
                    type="text"
                    placeholder="e.g. Transportation"
                    value={newVendorSub}
                    onChange={(e) => setNewVendorSub(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:border-primary focus:outline-none focus:ring-0 text-xs text-neutral-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 block">Start Cost ($ USD)</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 1500"
                    value={newVendorPrice}
                    onChange={(e) => setNewVendorPrice(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:border-primary focus:outline-none focus:ring-0 text-xs text-neutral-800"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 block">Location</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Savannah, GA"
                    value={newVendorLocation}
                    onChange={(e) => setNewVendorLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:border-primary focus:outline-none focus:ring-0 text-xs text-neutral-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5 col-span-2">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 block">Default Badge / Tag</label>
                  <input
                    type="text"
                    placeholder="e.g. Featured partner, Certified"
                    value={newVendorBadge}
                    onChange={(e) => setNewVendorBadge(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:border-primary focus:outline-none focus:ring-0 text-xs text-neutral-800"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 block">Description Summary</label>
                <textarea
                  rows={3}
                  placeholder="Summarize the luxury bento service portfolio..."
                  value={newVendorDesc}
                  onChange={(e) => setNewVendorDesc(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:border-primary focus:outline-none focus:ring-0 text-xs text-neutral-800 resize-none"
                />
              </div>

              <div className="pt-4 border-t border-neutral-100 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="w-1/2 py-2.5 bg-neutral-100 hover:bg-neutral-200/70 text-neutral-700 text-xs font-bold uppercase tracking-wider rounded-xl transition-all border-none cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-neutral-800 transition-all border-none cursor-pointer"
                >
                  Complete Onboarding
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
