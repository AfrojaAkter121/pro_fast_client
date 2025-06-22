import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";


// // Fix marker icons
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
//   shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
// });

// Sample data
import coverageData from "../../../public/coverageData.json"; // Adjust the path as necessary
const Coverage = () => {

    const [search, setSearch] = useState("");

    const filteredData = coverageData.filter((item) =>
      item.district.toLowerCase().includes(search.toLowerCase()) ||
      item.city.toLowerCase().includes(search.toLowerCase()) ||
      item.region.toLowerCase().includes(search.toLowerCase())
    );

    return (
    <div className="max-w-7xl mx-auto bg-white p-20 my-10 rounded-2xl">
      <h2 className="text-3xl font-bold text-center mb-6">
        Bangladesh Delivery Coverage Map
      </h2>

      <input
        type="text"
        placeholder="Search by district or city..."
        className="w-full max-w-xl mx-auto block px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 mb-6"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="h-[400px] min-w-[1000px] mx-auto rounded-xl overflow-hidden border shadow">
        <MapContainer
          center={[23.685, 90.3563]}
          zoom={7}
          scrollWheelZoom={true}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {filteredData.map((location, index) => (
            <Marker
              key={index}
              position={[location.latitude, location.longitude]}
            >
              <Popup>
                <strong>{location.city}</strong>, {location.district}
                <br />
                Areas: {location.covered_area.join(", ")}
                <br />
                <a
                  href={location.flowchart}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  View Flowchart
                </a>
                <img
    src={location.flowchart}
    alt={`${location.city} Flowchart`}
    className="mt-2 w-full h-28 object-cover rounded"
  />
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;