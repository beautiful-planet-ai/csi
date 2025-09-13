import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import WasteBoundary from "assets/GeoJson_Zone/Zone_Boundary_Merge.json";
import colors from "components/DashboardUtility/Constants/colorConstants";

const WasteMap = ({ disposalSites, selectedSite, wasteZoneData }) => {
  // Sample disposal sites data
  const defaultMarkers = [
    {
      id: 1,
      name: "Main Landfill Site",
      lat: 26.774794,
      lon: 82.134539,
      capacity: "85%",
      type: "Landfill",
    },
    {
      id: 2,
      name: "Recycling Center",
      lat: 26.767421,
      lon: 82.09535,
      capacity: "45%",
      type: "Recycling",
    },
    {
      id: 3,
      name: "Compost Facility",
      lat: 26.764028,
      lon: 82.133778,
      capacity: "60%",
      type: "Compost",
    },
    {
      id: 4,
      name: "Disposal Site-1",
      lat: 26.735415,
      lon: 82.140133,
      capacity: "50%",
      type: "Disposal",
    },
    {
      id: 5,
      name: "Disposal Site-2",
      lat: 26.777265,
      lon: 82.185866,
      capacity: "87%",
      type: "Disposal",
    },
  ];

  const [markers, setMarkers] = useState(defaultMarkers);

  // Update markers when prop changes
  useEffect(() => {
    if (disposalSites && disposalSites.length > 0) {
      setMarkers(disposalSites);
    }
  }, [disposalSites]);

  // Get marker color based on waste type
//   const getWasteIconColor = (type) => {
//     switch (type) {
//       case "Landfill":
//         return colors.veryPoor;
//       case "Recycling":
//         return colors.good;
//       case "Compost":
//         return colors.moderate;
//       default:
//         return "#666";
//     }
//   };

  // Custom waste marker icon
  const createWasteIcon = (type) =>
    L.divIcon({
      className: "waste-marker-icon",
      html: `
      <div style="
        position: relative;
        width: 24px;
        height: 24px;
        background: black;
        border-radius: 50%;
        border: 2px solid white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        color: white;
        font-size: 10px;
      ">
        ${type[0]}
      </div>
    `,
      iconSize: [24, 24],
      iconAnchor: [12, 24],
    });

  // Style waste management zones
  const styleWasteZone = (feature) => ({
    fillColor:
      feature.properties.fillLevel > 75
        ? colors.veryPoor
        : feature.properties.fillLevel > 50
        ? colors.poor
        : colors.moderate,
    weight: 2,
    opacity: 1,
    color: "white",
    fillOpacity: 0.7,
  });

  // Handle zone hover
  const onEachZone = (feature, layer) => {
    layer.bindTooltip(`
      <strong>${feature.properties.zoneName}</strong><br>
      Fill Level: ${feature.properties.fillLevel}%<br>
      Last Collection: ${feature.properties.lastCollection}
    `);
  };

  return (
    <div className="flex flex-column bg-white border-round p-2 w-full">
      <MapContainer
        center={[26.783869, 82.144132]}
        zoom={10}
        style={{ height: "14rem", width: "30rem" }}
        attributionControl={false}
      >
        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png" />

        {/* Waste Management Zones */}
        <GeoJSON
          data={WasteBoundary}
          style={styleWasteZone}
          onEachFeature={onEachZone}
        />

        {/* Disposal Site Markers */}
        {markers.map((site) => (
          <Marker
            key={site.id}
            position={[site.lat, site.lon]}
            icon={createWasteIcon(site.type)}
          >
            <Popup>
              <div className="p-2">
                <h4 className="font-bold mb-2">{site.name}</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div>Type:</div>
                  <div>{site.type}</div>
                  <div>Capacity:</div>
                  <div>{site.capacity}</div>
                  <div>Last Updated:</div>
                  <div>{new Date().toLocaleDateString()}</div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Selected Site Highlight */}
        {selectedSite && (
          <Marker
            position={[selectedSite.lat, selectedSite.lon]}
            icon={L.icon({
              iconUrl: "/waste-marker.png",
              iconSize: [32, 32],
              iconAnchor: [16, 32],
            })}
          >
            <Popup>
              <strong>Selected Site:</strong> {selectedSite.name}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default WasteMap;
