import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/lg1.png"; // make sure you have your logo here

export default function Navbar() {
  return (
    <nav className="w-full py-4 px-6 flex justify-between items-center shadow-md bg-white">
      {/* Logo + Brand */}
      <Link to="/" className="flex items-center space-x-3">
        <img
          src={logo}
          alt="Ecodesh Logo"
          className="h-10 w-10 rounded-full object-cover"
        />
        <h1 className="text-2xl font-bold tracking-wide text-[#669D31]">
          EcoDesh
        </h1>
      </Link>

      {/* Login Button */}
      <div className="flex items-center gap-[1rem]">
        <Link
          to="/find-bins"
          className="font-semibold text-[#0F5257] transition text-[1.1rem]"
        >
          Locate Bin
        </Link>
        <Link
          to="/login"
          className="bg-[#0F5257] text-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-[#127077] transition"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}
