import React from "react";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import ADA_Boundary from "../Maps/ADA_Boundary.json";

const TempMap = ({ averageTemp, selectedLocation }) => {
  const markers = [
    {
      location: "Ayodhya - Civil line,Tiny tots",
      lat: 26.774794,
      lon: 82.134539,
      message: "Civil line, Tiny tots school",
    },
    {
      location: "Ayodhya - Shahadat Ganj",
      lat: 26.767421,
      lon: 82.09535,
      message: "Shahadat Ganj",
    },
    {
      location: "Ayodhya-Bank colony",
      lat: 26.764028,
      lon: 82.133778,
      message: "Bank Colony Near Railway Station",
    },
    {
      location: "Ayodhya-near Airport",
      lat: 26.735415,
      lon: 82.140133,
      message: "Near Airport",
    },
    {
      location: "Ayodhya-Ranopali",
      lat: 26.777265,
      lon: 82.185866,
      message: "Ranopali Near Kila Ayodhya",
    },
  ];
  const getAqiIconColor = (aqi) => {
    if (aqi <= 100) return "green";
    if (aqi <= 200) return "yellow";
    if (aqi <= 300) return "orange";
    if (aqi <= 400) return "red";
    return "purple";
  };

  const markerIcon = L.divIcon({
    className: "custom-marker-icon", // Add a class for styling
    html: `
    <div style="
      position: relative;
      width: 18px;
      height: 18px;
      background-color: ${getAqiIconColor(averageTemp)};
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      border: 2px solid white;
    ">
      <div style="
        position: absolute;
        bottom: -6px;
        left: 6px;
        width: 4px;
        height: 4px;
        background-color: white;
        border-radius: 50%;
      "></div>
    </div>
  `,
    iconSize: [18, 18],
    iconAnchor: [9, 18], // Adjust anchor to bottom of the pin
  });

  const filteredMarker = markers.find(
    (marker) => marker.location === selectedLocation
  );

  const boundaryStyle = {
    color: "#166c7d",
    weight: 2,
    opacity: 0.6,
  };
  return (
    <MapContainer
      center={[26.783869, 82.144132]}
      zoom={10}
      style={{ height: "15rem", width: "100%" }}
    >
      <TileLayer url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png" />

      {/* Render ADA Boundary */}
      <GeoJSON data={ADA_Boundary} style={boundaryStyle} />

      {/* Display selected marker */}
      {filteredMarker && (
        <Marker
          position={[filteredMarker.lat, filteredMarker.lon]}
          icon={markerIcon}
        >
          <Popup>
            <div>
              <strong>{filteredMarker.message}</strong>
              <br />
              Tempertaure: {averageTemp}°C
            </div>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default TempMap;
