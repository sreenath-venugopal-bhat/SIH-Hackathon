import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";

export default function SetBinLocations() {
  const mapRef = useRef(null);
  const [location, setLocation] = useState("");
  const [mapInstance, setMapInstance] = useState(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = L.map(mapRef.current).setView([9.6866, 76.3391], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    map.on("click", function (e) {
      const { lat, lng } = e.latlng;
      L.marker([lat, lng]).addTo(map);
      console.log(`🗑 Bin placed at: Latitude ${lat}, Longitude ${lng}`);
    });

    setMapInstance(map);

    return () => {
      map.remove();
    };
  }, []);

  const handleSearch = async () => {
    if (!location || !mapInstance) return;

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        location
      )}`
    );
    const data = await response.json();

    if (data && data.length > 0) {
      const { lat, lon } = data[0];
      mapInstance.setView([lat, lon], 15);
      console.log(`📍 Map centered at: Latitude ${lat}, Longitude ${lon}`);
    } else {
      alert("Location not found");
    }
  };

  return (
    <div className="relative w-full h-screen">
      {/* Floating Search Box at Top-Right */}
      <div className="absolute top-4 md:right-4 z-[1000] p-4 rounded flex gap-2">
        <input
          type="text"
          placeholder="Enter location (e.g., Cherthala)"
          className="p-2 bg-white w-64 rounded-[1.2rem] pl-[1rem] focus:outline-none"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-[#1c565a] text-white px-4 py-2 rounded-[1.2rem] hover:bg-[#2f6b6f] cursor-pointer"
        >
          Center Map
        </button>
      </div>

      {/* Fullscreen Map Container */}
      <div ref={mapRef} className="absolute inset-0 z-0" />
    </div>
  );
}
