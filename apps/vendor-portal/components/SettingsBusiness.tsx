'use client';

import { useState } from 'react';
import { Upload, Mail, SupportAgent, Phone, LocationOn, Warning, Verified, OpenInNew, AddBusiness, Business, AccountCircle, AccountBalance, NotificationsActive, Policy, Badge } from 'lucide-react';

export function SettingsBusiness() {
  const [isDirty, setIsDirty] = useState(false);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="mb-10">
        <h2 className="font-display text-headline-lg text-primary mb-1">Global Settings</h2>
        <p className="text-on-surface-variant text-body-md">Manage your business operations, team access, and financial configurations.</p>
      </div>

      <div className="flex gap-10">
        {/* Settings Sub-Navigation (Left Rail) */}
        <aside className="w-64 flex-shrink-0">
          <nav className="space-y-1">
            <a className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white shadow-sm border border-secondary/20 text-secondary font-bold transition-all" href="#">
              <Business className="w-5 h-5" />
              <span className="text-body-md">Business Profile</span>
            </a>
            <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container transition-all" href="#">
              <AccountCircle className="w-5 h-5" />
              <span className="text-body-md">Personal Account</span>
            </a>
            <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container transition-all" href="#">
              <AccountBalance className="w-5 h-5" />
              <span className="text-body-md">Payout Account</span>
            </a>
            <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container transition-all" href="#">
              <NotificationsActive className="w-5 h-5" />
              <span className="text-body-md">Notifications</span>
            </a>
            <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container transition-all" href="#">
              <Policy className="w-5 h-5" />
              <span className="text-body-md">Cancellation Policy</span>
            </a>
            <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container transition-all" href="#">
              <LocationOn className="w-5 h-5" />
              <span className="text-body-md">Locations</span>
            </a>
            <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container transition-all" href="#">
              <Badge className="w-5 h-5" />
              <span className="text-body-md">Team & Roles</span>
            </a>
          </nav>
        </aside>

        {/* Settings Content Area */}
        <div className="flex-1">
          <div className="bg-white border border-outline-variant rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-outline-variant bg-surface">
              <h3 className="font-headline-md text-primary">Business Profile</h3>
              <p className="text-body-sm text-on-surface-variant">Update your public presence and contact information across the platform.</p>
            </div>

            <form className="p-8 space-y-8">
              {/* Section: Identity */}
              <section>
                <div className="flex items-start gap-8">
                  <div className="flex-shrink-0 group relative">
                    <label className="block text-label-caps text-on-surface-variant mb-3 uppercase tracking-wider">Business Logo</label>
                    <div className="w-32 h-32 rounded-xl bg-surface-container-low border-2 border-dashed border-outline-variant flex flex-col items-center justify-center cursor-pointer hover:bg-surface-container transition-all">
                      <Upload className="w-6 h-6 text-outline mb-1" />
                      <span className="text-[10px] text-outline font-semibold">UPLOAD LOGO</span>
                    </div>
                    <p className="mt-2 text-[11px] text-outline max-w-[128px]">PNG, JPG up to 5MB. 400x400px recommended.</p>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <label className="block text-label-caps text-on-surface-variant mb-1.5 uppercase tracking-wider">Business Name</label>
                      <input
                        className="w-full px-4 py-2.5 bg-white border border-outline-variant rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none text-body-md font-semibold"
                        type="text"
                        defaultValue="Luxe Lodging Group"
                      />
                    </div>
                    <div>
                      <label className="block text-label-caps text-on-surface-variant mb-1.5 uppercase tracking-wider">Vertical Category</label>
                      <select className="w-full px-4 py-2.5 bg-white border border-outline-variant rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none text-body-md appearance-none">
                        <option>Lodging & Hospitality</option>
                        <option>Travel & Transport</option>
                        <option>Dining & Services</option>
                        <option>Events & Tickets</option>
                      </select>
                    </div>
                  </div>
                </div>
              </section>

              <hr className="border-outline-variant" />

              {/* Section: Description */}
              <section>
                <label className="block text-label-caps text-on-surface-variant mb-2 uppercase tracking-wider">Public Description</label>
                <textarea
                  className="w-full px-4 py-3 bg-white border border-outline-variant rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none text-body-md"
                  placeholder="Describe your business to potential clients and guests..."
                  rows={4}
                />
                <div className="mt-1 flex justify-end">
                  <span className="text-[11px] text-outline">0 / 500 characters</span>
                </div>
              </section>

              <hr className="border-outline-variant" />

              {/* Section: Contact Info */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-label-caps text-on-surface-variant mb-1.5 uppercase tracking-wider">Business Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-[18px] h-[18px]" />
                    <input
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-outline-variant rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none text-body-md"
                      type="email"
                      defaultValue="admin@luxelodging.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-label-caps text-on-surface-variant mb-1.5 uppercase tracking-wider">Support Email</label>
                  <div className="relative">
                    <SupportAgent className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-[18px] h-[18px]" />
                    <input
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-outline-variant rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none text-body-md"
                      type="email"
                      defaultValue="support@luxelodging.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-label-caps text-on-surface-variant mb-1.5 uppercase tracking-wider">Business Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-[18px] h-[18px]" />
                    <input
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-outline-variant rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none text-body-md"
                      type="tel"
                      defaultValue="+1 (555) 012-3456"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-label-caps text-on-surface-variant mb-1.5 uppercase tracking-wider">Headquarters Address</label>
                  <div className="relative">
                    <LocationOn className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-[18px] h-[18px]" />
                    <input
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-outline-variant rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none text-body-md"
                      placeholder="Start typing address..."
                      type="text"
                    />
                  </div>
                </div>
              </section>

              {/* Footer Actions */}
              <div className="pt-6 border-t border-outline-variant flex items-center justify-between">
                <div className="flex items-center gap-2 text-error">
                  <Warning className="w-[18px] h-[18px]" />
                  <span className="text-body-sm font-semibold">Delete business account</span>
                </div>
                <div className="flex gap-4">
                  <button className="px-6 py-2.5 border border-outline-variant text-on-surface-variant font-semibold rounded-lg hover:bg-surface transition-colors" type="button">
                    Discard
                  </button>
                  <button className="px-8 py-2.5 bg-secondary text-white font-bold rounded-lg hover:shadow-lg transition-all active:scale-95" type="submit">
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Additional Context Card */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-primary-container p-6 rounded-xl text-white">
              <Verified className="w-6 h-6 text-secondary-fixed mb-4" />
              <h4 className="font-headline-md mb-2">Verification Status</h4>
              <p className="text-body-sm text-on-primary-container mb-4">Your business profile is currently verified for high-trust transactions.</p>
              <button className="text-secondary-fixed text-body-sm font-bold flex items-center gap-1">
                View certificate <OpenInNew className="w-[14px] h-[14px]" />
              </button>
            </div>
            <div className="col-span-2 border-4 border-dashed border-outline-variant rounded-xl p-8 flex flex-col items-center justify-center text-center opacity-60">
              <AddBusiness className="w-16 h-16 text-outline mb-3" />
              <h4 className="text-headline-md text-on-surface">Add Multi-Vertical Capability</h4>
              <p className="text-body-sm text-on-surface-variant max-w-sm">Expanding into Transport or Dining? Add secondary vertical indicators to your profile.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
