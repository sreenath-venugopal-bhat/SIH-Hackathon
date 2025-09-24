/* --- INSTALLATION NOTE ---
  This component requires the 'leaflet' library. If you are seeing a compilation error,
  it means the package is missing from your project.
  
  Please run the following command in your project's terminal:
  npm install leaflet

  Then, make sure to add the following line to your main `src/index.js` or `src/App.js` file
  to ensure the map displays correctly:
  import 'leaflet/dist/leaflet.css';
*/

import React, { useEffect, useRef, useState, useCallback } from "react";
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
const initialBins = [
  { id: 101, lat: 9.9676, lng: 76.2844, name: "Bin near Lulu Mall, Edappally" },
  { id: 102, lat: 9.9398, lng: 76.2602, name: "Bin at Fort Kochi Beach" },
  { id: 103, lat: 10.0275, lng: 76.3082, name: "Bin in Infopark, Kakkanad" },
  { id: 104, lat: 9.972, lng: 76.3068, name: "Bin at Palarivattom" },
  { id: 105, lat: 9.691, lng: 76.3335, name: "Bin near Cherthala KSRTC Stand" },
  { id: 106, lat: 9.6825, lng: 76.345, name: "Bin at Cherthala Town Hall" },
];
// ------------------------------------

export default function SetBinLocations() {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const existingBinsLayer = useRef(null);

  const [location, setLocation] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBinInfo, setNewBinInfo] = useState(null);

  // Initialize map and pre-existing bins
  useEffect(() => {
    if (mapRef.current && !mapInstance.current) {
      const map = L.map(mapRef.current).setView([9.9312, 76.2673], 12);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      map.on("click", async (e) => {
        const { lat, lng } = e.latlng;

        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        );
        const data = await response.json();
        const address = data.display_name || "Unknown Location";
        const binName = `Bin near ${address.split(",")[0]}`;

        setNewBinInfo({ lat, lng, name: binName });
        setIsModalOpen(true);
      });

      mapInstance.current = map;

      const markers = initialBins.map((bin) => {
        const marker = L.marker([bin.lat, bin.lng]).bindPopup(
          `<b>${bin.name}</b>`
        );
        marker.on("mouseover", () => marker.openPopup());
        marker.on("mouseout", () => marker.closePopup());
        return marker;
      });
      existingBinsLayer.current = L.layerGroup(markers).addTo(map);
    }
  }, []);

  const handleSearch = async () => {
    if (!location || !mapInstance.current) return;
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        location
      )}`
    );
    const data = await response.json();

    if (data && data.length > 0) {
      const { lat, lon } = data[0];
      mapInstance.current.flyTo([lat, lon], 15);
    } else {
      alert("Location not found.");
    }
  };

  const handleConfirmAddBin = () => {
    if (!newBinInfo || !mapInstance.current) return;
    const { lat, lng, name } = newBinInfo;

    // --- THIS IS THE KEY CHANGE ---
    // Create the HTML content with the new CSS class for the status badge
    const popupContent = `<b>${name}</b><span class="status-badge-new">New</span>`;
    const newMarker = L.marker([lat, lng]).bindPopup(popupContent);
    // --- END OF CHANGE ---

    newMarker.on("mouseover", () => newMarker.openPopup());
    newMarker.on("mouseout", () => newMarker.closePopup());
    existingBinsLayer.current.addLayer(newMarker);

    console.log(
      `🗑️ CONFIRMED: New bin added at ${name}. Coords: ${lat}, ${lng}`
    );

    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewBinInfo(null);
  };

  return (
    <div className="relative w-full h-[calc(100vh-4rem)]">
      {/* Search Controls */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-4 w-[90%] md:w-auto z-[1000]">
        <div className="bg-white/90 backdrop-blur-md p-2 rounded-full shadow-lg flex items-center gap-2">
          <input
            type="text"
            placeholder="Search for a location..."
            className="p-2 bg-transparent w-full focus:outline-none pl-4"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
          />
          <button
            onClick={handleSearch}
            className="bg-emerald-600 text-white p-2 rounded-full hover:bg-emerald-700 transition cursor-pointer"
          >
            <MapPinIcon className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Map Container */}
      <div ref={mapRef} className="absolute inset-0 z-0" />

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="absolute inset-0 z-[2000] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-sm m-4">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Confirm New Bin
            </h2>
            <p className="text-gray-600 mb-4">
              Do you want to add a new bin at this location?
            </p>
            <div className="bg-gray-100 p-3 rounded-md mb-6">
              <p className="font-semibold text-gray-700">{newBinInfo?.name}</p>
              <p className="text-sm text-gray-500">
                Lat: {newBinInfo?.lat.toFixed(5)}, Lng:{" "}
                {newBinInfo?.lng.toFixed(5)}
              </p>
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAddBin}
                className="px-4 py-2 rounded-md text-white bg-emerald-600 hover:bg-emerald-700 transition cursor-pointer"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
