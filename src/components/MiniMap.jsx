/* --- IMPORTANT INSTALLATION NOTE ---
  This component requires the 'react-leaflet' and 'leaflet' libraries. If you are seeing 
  a compilation error, it means these packages are missing from your project.
  
  Please run the following command in your project's terminal to install them:
  npm install react-leaflet leaflet

  Then, you MUST add the following line to your main `src/index.js` or `src/App.js` file
  to ensure the map displays correctly:
  import 'leaflet/dist/leaflet.css';
*/

import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// --- FIX for Marker Icons ---
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});
// ----------------------------

export default function MiniMap({ center, locationName }) {
  if (!center || !center.lat || !center.lng) {
    return (
      <div className="text-center p-4 bg-gray-100 rounded-lg">
        Location data not available.
      </div>
    );
  }

  const position = [center.lat, center.lng];

  return (
    <div className="h-64 w-full rounded-lg overflow-hidden shadow-md border">
      <MapContainer
        center={position}
        zoom={15}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>{locationName || "Complaint Location"}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
