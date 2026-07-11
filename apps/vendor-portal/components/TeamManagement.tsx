'use client';

import { useState } from 'react';
import { PersonAdd, TrendingUp, Group, Edit, Close, Search, Notifications, Apps, Settings, HelpOutline, Dashboard, Inbox, Badge } from 'lucide-react';

export function TeamManagement() {
  const [showInviteModal, setShowInviteModal] = useState(false);

  const staff = [
    {
      id: 1,
      name: 'Elena Rodriguez',
      email: 'elena.r@vendorsuite.io',
      role: 'Owner',
      locations: 'Global Access',
      locationCount: 'All 14 Properties',
      lastActive: 'Just now',
      status: 'Online',
      statusColor: 'text-green-600',
      vertical: 'lodging',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80'
    },
    {
      id: 2,
      name: 'Marcus Chen',
      email: 'm.chen@logistics.com',
      role: 'Manager',
      locations: 'Downtown Hub, North Terminal',
      locationCount: '2 Locations',
      lastActive: '2h ago',
      status: 'Away',
      statusColor: 'text-on-surface-variant',
      vertical: 'transport',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80'
    },
    {
      id: 3,
      name: 'Sarah Jenkins',
      email: 's.jenkins@dining.co',
      role: 'Staff',
      locations: 'Bistro 77',
      locationCount: '1 Location',
      lastActive: 'Oct 12, 2023',
      status: 'Inactive',
      statusColor: 'text-error',
      vertical: 'dining',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&q=80'
    }
  ];

  const getRoleColor = (role: string) => {
    const colors = {
      Owner: 'bg-primary/10 text-primary',
      Manager: 'bg-secondary/10 text-secondary',
      Staff: 'bg-outline/10 text-outline'
    };
    return colors[role as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  const getVerticalIndicator = (vertical: string) => {
    const indicators = {
      lodging: 'vertical-indicator-lodging',
      transport: 'vertical-indicator-transport',
      dining: 'vertical-indicator-dining'
    };
    return indicators[vertical as keyof typeof indicators] || '';
  };

  return (
    <div className="ml-[240px] pt-16 min-h-screen p-spacing-section-margin">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex items-end justify-between border-b border-outline-variant pb-6">
          <div>
            <h2 className="font-display text-display text-primary">Team Management</h2>
            <p className="text-on-surface-variant mt-1">Manage staff access, permissions, and regional assignments across your vendor network.</p>
          </div>
          <button
            className="flex items-center space-x-2 bg-secondary text-on-secondary px-6 py-3 rounded-lg font-headline-md hover:shadow-lg transition-all active:scale-95"
            onClick={() => setShowInviteModal(true)}
          >
            <PersonAdd className="w-5 h-5" />
            <span>+ Invite Staff</span>
          </button>
        </div>

        {/* Team Overview Stats (Bento Grid Style) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-spacing-card-gap">
          <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl flex flex-col justify-between h-32 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-10">
              <Group className="w-16 h-16" />
            </div>
            <span className="font-label-caps text-on-surface-variant">TOTAL STAFF</span>
            <span className="font-headline-lg text-primary">24 Active</span>
            <div className="text-body-sm text-green-600 flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              +2 this month
            </div>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl flex flex-col justify-between h-32">
            <span className="font-label-caps text-on-surface-variant">ACTIVE NOW</span>
            <span className="font-headline-lg text-primary">12 Members</span>
            <div className="flex -space-x-2">
              <div className="h-6 w-6 rounded-full border-2 border-white bg-blue-100"></div>
              <div className="h-6 w-6 rounded-full border-2 border-white bg-green-100"></div>
              <div className="h-6 w-6 rounded-full border-2 border-white bg-amber-100"></div>
              <div className="h-6 w-6 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[8px] font-bold">+9</div>
            </div>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl flex flex-col justify-between h-32">
            <span className="font-label-caps text-on-surface-variant">AVG. ACTIVITY</span>
            <span className="font-headline-lg text-primary">84%</span>
            <div className="w-full bg-surface-container rounded-full h-1.5">
              <div className="bg-secondary h-1.5 rounded-full" style={{ width: '84%' }}></div>
            </div>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl flex flex-col justify-between h-32">
            <span className="font-label-caps text-on-surface-variant">SYSTEM HEALTH</span>
            <span className="font-headline-lg text-primary">Stable</span>
            <span className="text-body-sm text-on-surface-variant">Permissions Audited 2d ago</span>
          </div>
        </div>

        {/* Staff List Table */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-container-low border-b border-outline-variant sticky top-0">
              <tr>
                <th className="px-6 py-4 font-label-caps text-on-surface-variant">Staff Member</th>
                <th className="px-6 py-4 font-label-caps text-on-surface-variant">Role</th>
                <th className="px-6 py-4 font-label-caps text-on-surface-variant">Locations Assigned</th>
                <th className="px-6 py-4 font-label-caps text-on-surface-variant">Last Active</th>
                <th className="px-6 py-4 font-label-caps text-on-surface-variant text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {staff.map((member) => (
                <tr key={member.id} className={`staff-table-row hover:bg-surface-container transition-colors ${getVerticalIndicator(member.vertical)}`}>
                  <td className="px-6 py-5">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-full bg-primary-container overflow-hidden">
                        <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-headline-md text-primary">{member.name}</p>
                        <p className="text-body-sm text-on-surface-variant">{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${getRoleColor(member.role)}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current mr-2"></span>
                      {member.role}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-body-md text-primary">{member.locations}</p>
                    <p className="text-body-sm text-on-surface-variant">{member.locationCount}</p>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-body-md font-data-mono text-primary">{member.lastActive}</p>
                    <p className={`text-[10px] font-bold uppercase ${member.statusColor}`}>{member.status}</p>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="row-actions opacity-0 transition-opacity space-x-2">
                      <button className="text-secondary font-bold text-body-sm hover:underline">Edit Permissions</button>
                      <button className="text-error font-bold text-body-sm hover:underline">Remove</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-6 bg-surface-container-low flex justify-between items-center">
            <div className="flex items-center space-x-2 text-on-surface-variant">
              <span className="text-lg">history</span>
              <a className="font-body-md font-bold text-secondary hover:underline" href="#">View team activity log</a>
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-outline-variant rounded bg-white text-body-sm hover:bg-surface-container transition-colors disabled:opacity-50" disabled>
                Previous
              </button>
              <button className="px-3 py-1 border border-outline-variant rounded bg-white text-body-sm hover:bg-surface-container transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Invite Staff Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/40 backdrop-blur-sm" onClick={(e) => {
          if (e.target === e.currentTarget) setShowInviteModal(false);
        }}>
          <div className="bg-surface-container-lowest w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-outline-variant scale-100 transition-transform">
            <div className="px-8 py-6 border-b border-outline-variant flex justify-between items-center bg-surface">
              <h3 className="font-headline-lg text-primary">Invite New Staff</h3>
              <button className="text-on-surface-variant hover:text-error transition-colors" onClick={() => setShowInviteModal(false)}>
                <Close className="w-5 h-5" />
              </button>
            </div>
            <form className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="font-label-caps text-on-surface-variant">Work Email Address</label>
                <input
                  className="w-full px-4 py-3 rounded-lg border border-outline-variant focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-all"
                  placeholder="name@company.com"
                  type="email"
                />
              </div>
              <div className="space-y-2">
                <label className="font-label-caps text-on-surface-variant">Assigned Role</label>
                <select className="w-full px-4 py-3 rounded-lg border border-outline-variant focus:ring-2 focus:ring-secondary outline-none appearance-none bg-no-repeat bg-[right_1rem_center]">
                  <option>Staff (Basic Access)</option>
                  <option>Manager (Operational Control)</option>
                  <option>Owner (Full Control)</option>
                </select>
              </div>
              <div className="space-y-3">
                <label className="font-label-caps text-on-surface-variant">Location Access</label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex items-center space-x-3 p-3 border border-outline-variant rounded-lg hover:bg-surface-container cursor-pointer transition-colors">
                    <input className="rounded text-secondary focus:ring-secondary" type="checkbox" />
                    <span className="text-body-md">Downtown Hub</span>
                  </label>
                  <label className="flex items-center space-x-3 p-3 border border-outline-variant rounded-lg hover:bg-surface-container cursor-pointer transition-colors">
                    <input className="rounded text-secondary focus:ring-secondary" type="checkbox" />
                    <span className="text-body-md">North Terminal</span>
                  </label>
                  <label className="flex items-center space-x-3 p-3 border border-outline-variant rounded-lg hover:bg-surface-container cursor-pointer transition-colors">
                    <input className="rounded text-secondary focus:ring-secondary" type="checkbox" />
                    <span className="text-body-md">South Shore</span>
                  </label>
                  <label className="flex items-center space-x-3 p-3 border border-outline-variant rounded-lg hover:bg-surface-container cursor-pointer transition-colors">
                    <input className="rounded text-secondary focus:ring-secondary" type="checkbox" />
                    <span className="text-body-md">Westside Annex</span>
                  </label>
                </div>
              </div>
              <div className="pt-4 flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="flex-1 px-6 py-3 border border-outline-variant rounded-lg font-bold text-on-surface-variant hover:bg-surface-container transition-colors"
                >
                  Cancel
                </button>
                <button type="submit" className="flex-1 px-6 py-3 bg-secondary text-white rounded-lg font-bold hover:shadow-lg active:scale-95 transition-all">
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
