'use client';

import { useState } from 'react';
import { Search, Notifications, Apps, Block, Settings, Print, ChevronLeft, ChevronRight, Sync, ContentCopy, Link, Mail, Edit, Close, CalendarToday, Restaurant, Group, LocationOn, Payments } from 'lucide-react';

export function CalendarManagement() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div className="ml-[240px] pt-16 h-screen flex overflow-hidden">
      {/* Calendar Controls & Filter Sidebar */}
      <aside className="w-72 bg-surface-container-low border-r border-outline-variant p-6 flex flex-col gap-8 custom-scrollbar overflow-y-auto">
        {/* Date Navigator Mini */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="font-headline-md text-primary">October 2024</span>
            <div className="flex gap-1">
              <button className="p-1 hover:bg-surface-container-high rounded transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button className="p-1 hover:bg-surface-container-high rounded transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-label-caps text-on-surface-variant mb-2">
            <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-body-sm">
            <span className="p-1 text-outline">29</span><span className="p-1 text-outline">30</span>
            <span className="p-1">1</span><span className="p-1">2</span><span className="p-1">3</span>
            <span className="p-1 bg-secondary text-on-secondary rounded-full">4</span><span className="p-1">5</span>
            <span className="p-1">6</span><span className="p-1">7</span><span className="p-1">8</span>
            <span className="p-1">9</span><span className="p-1">10</span><span className="p-1">11</span><span className="p-1">12</span>
          </div>
        </div>

        {/* Vertical Filters */}
        <section>
          <h3 className="text-label-caps text-on-surface-variant mb-4 tracking-widest uppercase">Filter by Vertical</h3>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input defaultChecked className="rounded border-outline-variant text-indigo-600 focus:ring-indigo-500" type="checkbox" />
              <div className="w-3 h-3 rounded-full bg-indigo-600"></div>
              <span className="text-body-md group-hover:text-primary transition-colors">Lodging</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input defaultChecked className="rounded border-outline-variant text-purple-600 focus:ring-purple-500" type="checkbox" />
              <div className="w-3 h-3 rounded-full bg-purple-600"></div>
              <span className="text-body-md group-hover:text-primary transition-colors">Tickets</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input defaultChecked className="rounded border-outline-variant text-cyan-600 focus:ring-cyan-500" type="checkbox" />
              <div className="w-3 h-3 rounded-full bg-cyan-600"></div>
              <span className="text-body-md group-hover:text-primary transition-colors">Services</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input defaultChecked className="rounded border-outline-variant text-orange-600 focus:ring-orange-500" type="checkbox" />
              <div className="w-3 h-3 rounded-full bg-orange-600"></div>
              <span className="text-body-md group-hover:text-primary transition-colors">Dining</span>
            </label>
          </div>
        </section>

        {/* Sync Section */}
        <section className="mt-auto pt-6 border-t border-outline-variant">
          <h3 className="text-label-caps text-on-surface-variant mb-4 tracking-widest uppercase">Calendar Sync</h3>
          <div className="space-y-4">
            <div className="p-3 bg-surface rounded-lg border border-outline-variant">
              <div className="flex items-center justify-between mb-2">
                <span className="text-body-sm font-semibold">Google Calendar</span>
                <Sync className="w-4 h-4 text-green-600" />
              </div>
              <button className="w-full py-1.5 px-3 bg-surface-container-high text-body-sm rounded flex items-center justify-center gap-2 hover:bg-outline-variant transition-colors">
                <ContentCopy className="w-4 h-4" />
                Copy Sync URL
              </button>
            </div>
            <div className="p-3 bg-surface rounded-lg border border-outline-variant opacity-60">
              <div className="flex items-center justify-between mb-2">
                <span className="text-body-sm font-semibold">Apple iCal</span>
                <span className="text-body-sm text-outline">Disabled</span>
              </div>
              <button className="w-full py-1.5 px-3 border border-outline-variant text-body-sm rounded flex items-center justify-center gap-2 hover:bg-surface-container transition-colors">
                <Link className="w-4 h-4" />
                Connect iCal
              </button>
            </div>
          </div>
        </section>
      </aside>

      {/* Main Calendar Grid */}
      <section className="flex-1 flex flex-col bg-white overflow-hidden">
        {/* View Toggles */}
        <div className="px-8 py-4 border-b border-outline-variant flex items-center justify-between bg-surface-container-lowest">
          <div className="flex items-center gap-6">
            <h2 className="text-headline-lg font-bold">October 2024</h2>
            <div className="flex bg-surface-container p-1 rounded-lg">
              <button className="px-4 py-1.5 rounded-md text-body-sm font-semibold bg-white shadow-sm">Month</button>
              <button className="px-4 py-1.5 rounded-md text-body-sm text-on-surface-variant hover:text-primary transition-colors">Week</button>
              <button className="px-4 py-1.5 rounded-md text-body-sm text-on-surface-variant hover:text-primary transition-colors">Day</button>
              <button className="px-4 py-1.5 rounded-md text-body-sm text-on-surface-variant hover:text-primary transition-colors">List</button>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="p-2 border border-outline-variant rounded-lg hover:bg-surface-container transition-colors" title="Settings">
              <Settings className="w-5 h-5" />
            </button>
            <button className="p-2 border border-outline-variant rounded-lg hover:bg-surface-container transition-colors" title="Print">
              <Print className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Grid Body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="calendar-grid border-l border-t border-outline-variant">
            {/* Day Headers */}
            <div className="bg-surface-container-low border-r border-b border-outline-variant p-3 text-center text-label-caps text-on-surface-variant">Sunday</div>
            <div className="bg-surface-container-low border-r border-b border-outline-variant p-3 text-center text-label-caps text-on-surface-variant">Monday</div>
            <div className="bg-surface-container-low border-r border-b border-outline-variant p-3 text-center text-label-caps text-on-surface-variant">Tuesday</div>
            <div className="bg-surface-container-low border-r border-b border-outline-variant p-3 text-center text-label-caps text-on-surface-variant">Wednesday</div>
            <div className="bg-surface-container-low border-r border-b border-outline-variant p-3 text-center text-label-caps text-on-surface-variant">Thursday</div>
            <div className="bg-surface-container-low border-r border-b border-outline-variant p-3 text-center text-label-caps text-on-surface-variant">Friday</div>
            <div className="bg-surface-container-low border-r border-b border-outline-variant p-3 text-center text-label-caps text-on-surface-variant">Saturday</div>

            {/* Calendar Days */}
            <div className="border-r border-b border-outline-variant p-2 opacity-40 bg-surface">29</div>
            <div className="border-r border-b border-outline-variant p-2 opacity-40 bg-surface">30</div>
            <div className="border-r border-b border-outline-variant p-2 hover:bg-surface-container-low transition-colors cursor-pointer group">
              <span className="font-bold text-body-sm">1</span>
              <div className="mt-2 space-y-1">
                <div className="vertical-lodging px-2 py-1 rounded text-[11px] font-bold truncate cursor-pointer" onClick={toggleDrawer}>Grand Suite #204</div>
              </div>
            </div>
            <div className="border-r border-b border-outline-variant p-2 hover:bg-surface-container-low transition-colors cursor-pointer">
              <span className="font-bold text-body-sm">2</span>
            </div>
            <div className="border-r border-b border-outline-variant p-2 hover:bg-surface-container-low transition-colors cursor-pointer">
              <span className="font-bold text-body-sm text-secondary">3</span>
              <div className="mt-2 space-y-1">
                <div className="vertical-tickets px-2 py-1 rounded text-[11px] font-bold truncate">VIP Jazz Night</div>
                <div className="vertical-dining px-2 py-1 rounded text-[11px] font-bold truncate">Chef's Table (8)</div>
              </div>
            </div>
            <div className="border-r border-b border-outline-variant p-2 hover:bg-surface-container-low transition-colors cursor-pointer bg-secondary-fixed/20">
              <span className="font-bold text-body-sm text-secondary">4</span>
              <div className="mt-2 space-y-1">
                <div className="vertical-services px-2 py-1 rounded text-[11px] font-bold truncate">Spa Maintenance</div>
              </div>
            </div>
            <div className="border-r border-b border-outline-variant p-2 hover:bg-surface-container-low transition-colors cursor-pointer">
              <span className="font-bold text-body-sm">5</span>
            </div>

            {/* More days... */}
            {Array.from({ length: 26 }, (_, i) => i + 6).map((day) => (
              <div key={day} className="border-r border-b border-outline-variant p-2 hover:bg-surface-container-low transition-colors cursor-pointer">
                <span className="font-bold text-body-sm">{day}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detail Drawer Overlay */}
      <div className={`fixed inset-y-0 right-0 w-[400px] bg-white shadow-2xl z-50 drawer-transition border-l border-outline-variant overflow-hidden flex flex-col ${drawerOpen ? '' : 'translate-x-full'}`}>
        <div className="p-6 border-b border-outline-variant flex items-center justify-between bg-surface-container-lowest">
          <div>
            <span className="text-label-caps text-indigo-600 font-bold mb-1 block">LODGING</span>
            <h3 className="text-headline-md font-bold">Grand Suite #204</h3>
          </div>
          <button className="p-2 hover:bg-surface-container-high rounded-full transition-colors" onClick={toggleDrawer}>
            <Close className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 p-6 overflow-y-auto custom-scrollbar space-y-8">
          <div className="w-full h-48 rounded-xl bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80')" }}></div>
          <section>
            <h4 className="text-label-caps text-on-surface-variant mb-4 tracking-widest uppercase">Booking Details</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-surface rounded-lg">
                <span className="text-body-sm text-on-surface-variant block">Guest Name</span>
                <span className="font-bold">Julianne Sterling</span>
              </div>
              <div className="p-3 bg-surface rounded-lg">
                <span className="text-body-sm text-on-surface-variant block">Status</span>
                <span className="text-green-600 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-600"></span> Confirmed
                </span>
              </div>
              <div className="p-3 bg-surface rounded-lg">
                <span className="text-body-sm text-on-surface-variant block">Check-in</span>
                <span className="font-bold">Oct 1, 14:00</span>
              </div>
              <div className="p-3 bg-surface rounded-lg">
                <span className="text-body-sm text-on-surface-variant block">Check-out</span>
                <span className="font-bold">Oct 3, 11:00</span>
              </div>
            </div>
          </section>
          <section>
            <h4 className="text-label-caps text-on-surface-variant mb-4 tracking-widest uppercase">Quick Actions</h4>
            <div className="flex flex-col gap-3">
              <button className="w-full py-3 bg-primary text-on-primary rounded-lg font-semibold hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                <Mail className="w-5 h-5" />
                Message Guest
              </button>
              <button className="w-full py-3 border border-outline-variant text-on-surface-variant rounded-lg font-semibold hover:bg-surface-container-low transition-all flex items-center justify-center gap-2">
                <Edit className="w-5 h-5" />
                Modify Reservation
              </button>
              <button className="w-full py-3 text-error font-semibold hover:bg-error-container/20 transition-all rounded-lg">
                Cancel Booking
              </button>
            </div>
          </section>
          <section>
            <h4 className="text-label-caps text-on-surface-variant mb-4 tracking-widest uppercase">Recent Activity</h4>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center">
                  <Payments className="w-4 h-4 text-secondary" />
                </div>
                <div>
                  <p className="text-body-sm font-semibold">Deposit Received</p>
                  <p className="text-[11px] text-on-surface-variant">2 hours ago</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center">
                  <Edit className="w-4 h-4 text-outline" />
                </div>
                <div>
                  <p className="text-body-sm font-semibold">Note added by concierge</p>
                  <p className="text-[11px] text-on-surface-variant">Yesterday at 15:45</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Backdrop for Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 bg-black/20 z-40" onClick={toggleDrawer}></div>
      )}
    </div>
  );
}
