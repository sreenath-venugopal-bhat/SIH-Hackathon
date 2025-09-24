/* --- INSTALLATION NOTE ---
  This component requires the 'leaflet' library. If you are seeing a compilation error,
  it means the package is missing from your project.
  
  Please run the following command in your project's terminal:
  npm install leaflet

  Then, make sure to add the following line to your main `src/index.js` or `src/App.js` file
  to ensure the map displays correctly:
  import 'leaflet/dist/leaflet.css';
*/

import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import { MapPinIcon } from "@heroicons/react/24/solid";

// --- FIX for Marker Icons with Vite ---
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({ iconRetinaUrl, iconUrl, shadowUrl });
// ------------------------------------

// --- Mock Data: Pre-existing Bins ---
// This is the same data from your admin component. Eventually, both components
// will fetch this list from your database.
const initialBins = [
  { id: 101, lat: 9.9676, lng: 76.2844, name: "Bin near Lulu Mall, Edappally" },
  { id: 102, lat: 9.9398, lng: 76.2602, name: "Bin at Fort Kochi Beach" },
  { id: 103, lat: 10.0275, lng: 76.3082, name: "Bin in Infopark, Kakkanad" },
  { id: 104, lat: 9.972, lng: 76.3068, name: "Bin at Palarivattom" },
  { id: 105, lat: 9.691, lng: 76.3335, name: "Bin near Cherthala KSRTC Stand" },
  { id: 106, lat: 9.6825, lng: 76.345, name: "Bin at Cherthala Town Hall" },
];
// ------------------------------------

export default function FindBins() {
  const mapRef = useRef(null);
  const mapInstance = useRef(null); // Use a ref to hold the map instance

  const [location, setLocation] = useState("");

  // This effect runs only once to initialize the map and markers
  useEffect(() => {
    // Prevent re-initialization
    if (mapRef.current && !mapInstance.current) {
      // Create the map, centered on Kochi
      const map = L.map(mapRef.current).setView([9.9312, 76.2673], 12);

      // Add the base map layer from OpenStreetMap
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Add markers for all the initial bins
      initialBins.forEach((bin) => {
        const marker = L.marker([bin.lat, bin.lng])
          .addTo(map)
          .bindPopup(`<b>${bin.name}</b>`);
        
        // Add hover events to show the bin name
        marker.on("mouseover", () => marker.openPopup());
        marker.on("mouseout", () => marker.closePopup());
      });

      mapInstance.current = map; // Store the map instance
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  // Function to handle the location search
  const handleSearch = async () => {
    if (!location || !mapInstance.current) return;

    // Use the Nominatim API to get coordinates for the searched location
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`
    );
    const data = await response.json();

    if (data && data.length > 0) {
      const { lat, lon } = data[0];
      // Smoothly fly to the new location on the map
      mapInstance.current.flyTo([lat, lon], 15);
    } else {
      alert("Location not found. Please try a more specific search.");
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Find a Bin Near You</h1>
          <p className="mt-2 text-lg text-gray-600">
            Enter a location to search for available waste bins in your area.
          </p>
        </div>

        {/* Responsive Search Controls */}
        <div className="bg-white p-4 rounded-xl shadow-md mb-6 flex flex-col sm:flex-row items-center gap-3">
          <input
            type="text"
            placeholder="Search for a place (e.g., Marine Drive, Kochi)"
            className="p-3 bg-gray-100 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
          />
          <button
            onClick={handleSearch}
            className="w-full sm:w-auto bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition flex items-center justify-center font-semibold"
          >
            <MapPinIcon className="h-5 w-5 mr-2" />
            Search
          </button>
        </div>

        {/* Map Container */}
        <div ref={mapRef} className="w-full h-[65vh] border-2 border-gray-200 rounded-xl shadow-lg" />
      </div>
    </div>
  );
}

