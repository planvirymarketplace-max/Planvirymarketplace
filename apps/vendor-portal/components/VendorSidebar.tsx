'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Dashboard,
  Inbox,
  CalendarMonth,
  ListAlt,
  EventAvailable,
  Group,
  Payments,
  Settings,
  HelpOutline,
  Business,
  AccountCircle,
  AccountBalance,
  NotificationsActive,
  Policy,
  LocationOn,
  Badge
} from 'lucide-react';

export function VendorSidebar() {
  const pathname = usePathname();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Dashboard, href: '/' },
    { id: 'inbox', label: 'Inbox', icon: Inbox, href: '/inbox' },
    { id: 'calendar', label: 'Calendar', icon: CalendarMonth, href: '/calendar' },
    { id: 'listings', label: 'Listings', icon: ListAlt, href: '/listings' },
    { id: 'bookings', label: 'Bookings', icon: EventAvailable, href: '/bookings' },
    { id: 'guests', label: 'Guests', icon: Group, href: '/guests' },
    { id: 'payouts', label: 'Payouts', icon: Payments, href: '/payouts' },
  ];

  const settingsItems = [
    { id: 'settings-business', label: 'Business Profile', icon: Business, href: '/settings-business' },
    { id: 'settings-personal', label: 'Personal Account', icon: AccountCircle, href: '/settings-personal' },
    { id: 'settings-payout', label: 'Payout Account', icon: AccountBalance, href: '/settings-payout' },
    { id: 'settings-notifications', label: 'Notifications', icon: NotificationsActive, href: '/settings-notifications' },
    { id: 'settings-policy', label: 'Cancellation Policy', icon: Policy, href: '/settings-policy' },
    { id: 'settings-locations', label: 'Locations', icon: LocationOn, href: '/settings-locations' },
    { id: 'settings-team', label: 'Team & Roles', icon: Badge, href: '/settings-team' },
  ];

  const isSettings = pathname.startsWith('/settings');

  return (
    <aside className="fixed left-0 top-0 h-full w-[240px] z-40 bg-surface-container-lowest border-r border-outline-variant flex flex-col py-8">
      <div className="px-6 mb-10">
        <h1 className="font-display text-headline-md font-bold text-primary">Vendor Suite</h1>
        <p className="font-body-sm text-on-primary-container">Precision Trust</p>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center px-6 py-3 space-x-3 transition-colors ${
                isActive
                  ? 'text-secondary font-bold border-r-4 border-secondary bg-surface-container'
                  : 'text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-body-md">{item.label}</span>
            </Link>
          );
        })}

        {isSettings && (
          <div className="pt-4 border-t border-outline-variant">
            {settingsItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`flex items-center px-6 py-3 space-x-3 transition-colors ${
                    isActive
                      ? 'text-secondary font-bold border-r-4 border-secondary bg-surface-container'
                      : 'text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-body-md">{item.label}</span>
                </Link>
              );
            })}
          </div>
        )}
      </nav>

      <div className="px-6 mt-auto space-y-1">
        <Link
          href="/settings-business"
          className={`flex items-center px-6 py-3 space-x-3 transition-colors ${
            pathname.startsWith('/settings')
              ? 'text-secondary font-bold border-r-4 border-secondary bg-surface-container'
              : 'text-on-surface-variant hover:bg-surface-container-high'
          }`}
        >
          <Settings className="w-5 h-5" />
          <span className="font-body-md">Settings</span>
        </Link>
        <Link href="/help" className="flex items-center px-6 py-3 space-x-3 text-on-surface-variant hover:bg-surface-container-high transition-colors">
          <HelpOutline className="w-5 h-5" />
          <span className="font-body-md">Help Center</span>
        </Link>
      </div>
    </aside>
  );
}
