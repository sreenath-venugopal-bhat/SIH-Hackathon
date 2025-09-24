import React from 'react';
import { NavLink } from 'react-router-dom';
import { ListBulletIcon, MapPinIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid';

export default function Sidebar() {
  // Common style for NavLink
  const navLinkClass = `
    flex items-center p-3 my-1 rounded-lg text-gray-200 
    transition-colors duration-200 hover:bg-emerald-700
  `;

  // Style for the active NavLink
  const activeNavLinkClass = 'bg-emerald-800 font-semibold';

  return (
    <div className="flex flex-col h-screen w-64 bg-emerald-900 text-white">
      {/* Header */}
      <div className="flex items-center justify-center h-20 border-b border-emerald-800">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-4 py-4">
        <NavLink
          to="/admin/complaints"
          className={({ isActive }) => `${navLinkClass} ${isActive ? activeNavLinkClass : ''}`}
        >
          <ListBulletIcon className="h-6 w-6 mr-3" />
          View Complaints
        </NavLink>
        
        <NavLink
          to="/admin/set-bins"
          className={({ isActive }) => `${navLinkClass} ${isActive ? activeNavLinkClass : ''}`}
        >
          <MapPinIcon className="h-6 w-6 mr-3" />
          Set Bin Locations
        </NavLink>
      </nav>

      {/* Footer / Logout */}
      <div className="px-4 py-4 border-t border-emerald-800">
        <button className={`${navLinkClass} w-full`}>
          <ArrowLeftOnRectangleIcon className="h-6 w-6 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
}