import React from "react";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import ADA_Boundary from "../Maps/ADA_Boundary.json";
import colors from "components/DashboardUtility/Constants/colorConstants";

const AqiMap = ({ averageAQI, selectedLocation, locationWiseAQI }) => {
  const markers = [
    {
      location: "Ayodhya - Civil line,Tiny tots school",
      lat: 26.774794,
      lon: 82.134539,
      message: "Civil Lines",
      id: 12218,
    },
    {
      location: "Ayodhya - Shahadat Ganj",
      lat: 26.767421,
      lon: 82.09535,
      message: "Shahadat Ganj",
      id: 12220,
    },
    {
      location: "Ayodhya-Bank colony near Railway station",
      lat: 26.764028,
      lon: 82.133778,
      message: "Bank Colony",
      id: 12414,
    },
    {
      location: "Ayodhya-near Airport",
      lat: 26.735415,
      lon: 82.140133,
      message: "Near Airport",
      id: 12415,
    },
    {
      location: "Ayodhya-Ranopali near Sugriv Kila ayodhya",
      lat: 26.777265,
      lon: 82.185866,
      message: "Ranopali Near Sugriv Kila",
      id: 12416,
    },
  ];

  const getAqiIconColor = (aqi) => {
    if (aqi > 0 && aqi <= 50) return colors.good;
    else if (aqi > 50 && aqi <= 100) return colors.moderate;
    else if (aqi > 100 && aqi <= 200) return colors.yellow;
    else if (aqi > 200 && aqi <= 300) return colors.warning;
    else if (aqi > 300 && aqi <= 400) return colors.poor;
    else if (aqi > 400) return colors.veryPoor;
    else return "#000"
  };

  const markerIcon = L.divIcon({
    className: "custom-marker-icon", // Add a class for styling
    html: `
      <div style="
        position: relative;
        width: 18px;
        height: 18px;
        background-color: ${getAqiIconColor(averageAQI)};
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

  const boundaryStyle = {
    color: "#166c7d",
    weight: 2,
    opacity: 0.6,
  };

  return (
    <MapContainer
      center={[26.783869, 82.144132]}
      zoom={11}
      style={{ height: "18rem", width: "100%" }}
      attributionControl={false}
    >
      <TileLayer url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png" />

      {/* Render ADA Boundary */}
      <GeoJSON data={ADA_Boundary} style={boundaryStyle} />

      {/* Display markers based on selection */}
      {selectedLocation === "All Locations"
        ? markers.map((marker) => {
            const aqiValue = locationWiseAQI[marker.id]; // Use location-specific AQI or default
            return (
              <Marker
                key={marker.location}
                position={[marker.lat, marker.lon]}
                icon={L.divIcon({
                  className: "custom-marker-icon",
                  html: `
                    <div style="
                      position: relative;
                      width: 18px;
                      height: 18px;
                      background-color: ${getAqiIconColor(aqiValue)};
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
                  iconAnchor: [9, 18],
                })}
              >
                <Popup>
                  <div>
                    <strong>{marker.message}</strong>
                    <br />
                    AQI Level: {aqiValue}
                  </div>
                </Popup>
              </Marker>
            );
          })
        : markers
            .filter((marker) => marker.location === selectedLocation)
            .map((marker) => (
              <Marker
                key={marker.location}
                position={[marker.lat, marker.lon]}
                icon={markerIcon}
              >
                <Popup>
                  <div>
                    <strong>{marker.message}</strong>
                    <br />
                    AQI Level: {averageAQI}
                  </div>
                </Popup>
              </Marker>
            ))}
    </MapContainer>
  );
};

export default AqiMap;
