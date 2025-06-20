import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function TripMap({ places }) {
  // Only use places with valid lat/lon
  const validPlaces = Array.isArray(places)
    ? places.filter(
        p =>
          typeof p.lat === "number" &&
          typeof p.lon === "number" &&
          !isNaN(p.lat) &&
          !isNaN(p.lon)
      )
    : [];

  if (!validPlaces.length) return null;
  const center = [validPlaces[0].lat, validPlaces[0].lon];

  return (
    <div className="my-6 rounded-xl overflow-hidden shadow-lg border border-accent">
      <MapContainer center={center} zoom={10} style={{ height: 300, width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {validPlaces.map((p, i) => (
          <Marker key={i} position={[p.lat, p.lon]}>
            <Popup>
              <b>{p.name}</b>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default TripMap;