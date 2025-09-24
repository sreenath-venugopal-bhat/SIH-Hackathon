import React from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import logo from "../assets/lg1.png"; // ✅ your logo

const Footer = () => {
  return (
    <footer className="bg-green-700 text-green-50 py-10 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Branding */}
        <div>
          <div className="flex items-center space-x-3">
            <img
              src={logo}
              alt="Ecodesh Logo"
              className="h-12 w-12 object-contain rounded-full"
            />
            <h2 className="text-2xl font-bold">EcoDesh</h2>
          </div>
          <p className="mt-3 text-sm text-green-100 max-w-sm">
            Building a cleaner, smarter, and greener world through waste
            management innovation.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/bin-locator" className="hover:underline">
                Bin Locator
              </a>
            </li>
            <li>
              <a href="/awareness" className="hover:underline">
                Awareness
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Connect with us</h3>
          <div className="flex space-x-4">
            <a
              href="#"
              className="p-2 rounded-full bg-green-600 hover:bg-green-500 transition"
            >
              <Facebook size={20} />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-green-600 hover:bg-green-500 transition"
            >
              <Twitter size={20} />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-green-600 hover:bg-green-500 transition"
            >
              <Instagram size={20} />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-green-600 hover:bg-green-500 transition"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-green-600 mt-10 pt-6 text-center text-sm text-green-200">
        © {new Date().getFullYear()} Ecodesh. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;