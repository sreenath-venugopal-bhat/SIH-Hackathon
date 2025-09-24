import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  ListBulletIcon,
  MapPinIcon,
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  ChartPieIcon, // <-- New Icon
  UserPlusIcon, // <-- New Icon
} from "@heroicons/react/24/solid";
import Logo from "../assets/lg1-white.png";

export default function ResponsiveNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Common style for NavLink
  const navLinkClass = (isActive) => `
    flex items-center px-4 py-2 mx-1 rounded-lg text-gray-200 
    transition-colors duration-200 hover:bg-emerald-700
    ${isActive ? "bg-emerald-800 font-semibold" : ""}
  `;

  const mobileNavLinkClass = (isActive) => `
    flex items-center w-full text-left px-4 py-3 rounded-lg text-gray-200 
    transition-colors duration-200 hover:bg-emerald-700
    ${isActive ? "bg-emerald-800 font-semibold" : ""}
  `;

  return (
    <nav className="w-full bg-emerald-900 text-white shadow-md relative z-10">
      <div className="mx-auto px-6 h-20 flex items-center justify-between">
        {/* Header */}
        <div className="flex items-center gap-[1rem]">
          <img src={Logo} alt="EcoDesh Logo" className="h-10 w-auto" />
          <h1 className="text-2xl font-bold">EcoDesh</h1>
        </div>

        {/* --- MODIFIED: Desktop Nav Links --- */}
        <div className="hidden md:flex items-center">
          <NavLink
            to="/admin/complaints"
            className={({ isActive }) => navLinkClass(isActive)}
          >
            <ListBulletIcon className="h-5 w-5 mr-2" />
            <span>View Complaints</span>
          </NavLink>
          <NavLink
            to="/admin/set-bins"
            className={({ isActive }) => navLinkClass(isActive)}
          >
            <MapPinIcon className="h-5 w-5 mr-2" />
            <span>Set Bin Locations</span>
          </NavLink>
          {/* --- NEW LINKS --- */}
          <NavLink
            to="/admin/analytics"
            className={({ isActive }) => navLinkClass(isActive)}
          >
            <ChartPieIcon className="h-5 w-5 mr-2" />
            <span>Analytics</span>
          </NavLink>
          <NavLink
            to="/admin/add-admin"
            className={({ isActive }) => navLinkClass(isActive)}
          >
            <UserPlusIcon className="h-5 w-5 mr-2" />
            <span>Add Admin</span>
          </NavLink>
        </div>

        {/* Desktop Logout Button */}
        <div className="hidden md:flex">
          <button className={navLinkClass(false)}>
            <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-2" />
            <span>Logout</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-md hover:bg-emerald-700 focus:outline-none"
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* --- MODIFIED: Mobile Menu Dropdown --- */}
      {isMenuOpen && (
        <div className="md:hidden bg-emerald-900 px-4 pb-4 border-t border-emerald-800">
          <NavLink
            to="/admin/complaints"
            className={({ isActive }) => mobileNavLinkClass(isActive)}
            onClick={() => setIsMenuOpen(false)}
          >
            <ListBulletIcon className="h-5 w-5 mr-3" />
            <span>View Complaints</span>
          </NavLink>
          <NavLink
            to="/admin/set-bins"
            className={({ isActive }) => mobileNavLinkClass(isActive)}
            onClick={() => setIsMenuOpen(false)}
          >
            <MapPinIcon className="h-5 w-5 mr-3" />
            <span>Set Bin Locations</span>
          </NavLink>
          {/* --- NEW LINKS --- */}
          <NavLink
            to="/admin/analytics"
            className={({ isActive }) => mobileNavLinkClass(isActive)}
            onClick={() => setIsMenuOpen(false)}
          >
            <ChartPieIcon className="h-5 w-5 mr-3" />
            <span>Analytics</span>
          </NavLink>
          <NavLink
            to="/admin/add-admin"
            className={({ isActive }) => mobileNavLinkClass(isActive)}
            onClick={() => setIsMenuОpen(false)}
          >
            <UserPlusIcon className="h-5 w-5 mr-3" />
            <span>Add Admin</span>
          </NavLink>
          <div className="mt-2 border-t border-emerald-800 pt-2">
            <button className={mobileNavLinkClass(false) + " w-full"}>
              <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-3" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
