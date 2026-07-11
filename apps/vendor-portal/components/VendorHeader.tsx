'use client';

import { Search, Bell, User } from 'lucide-react';

interface VendorHeaderProps {
  title: string;
  subtitle?: string;
}

export function VendorHeader({ title, subtitle }: VendorHeaderProps) {
  return (
    <header className="fixed top-0 right-0 w-[calc(100%-240px)] z-30 bg-surface border-b border-outline-variant h-16 px-container-padding flex items-center justify-between">
      <div className="flex items-center bg-surface-container-low px-4 py-2 rounded-lg border border-outline-variant w-96">
        <Search className="w-5 h-5 text-on-surface-variant mr-2" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent border-none focus:ring-0 text-body-md w-full placeholder-on-surface-variant outline-none"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="text-on-surface-variant hover:text-secondary transition-colors p-2 rounded-full hover:bg-surface-container-high">
          <Bell className="w-5 h-5" />
        </button>
        <button className="px-4 py-2 rounded-lg bg-secondary text-white font-semibold text-body-sm transition-transform active:scale-95 shadow-sm">
          Quick Action
        </button>
        <div className="w-8 h-8 rounded-full bg-surface-container-highest overflow-hidden border border-outline-variant">
          <User className="w-full h-full p-1 text-on-surface-variant" />
        </div>
      </div>
    </header>
  );
}
