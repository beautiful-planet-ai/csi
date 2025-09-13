import React from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Marker,
  Tooltip,
} from "react-leaflet";
import L from "leaflet";
import markerIcon from "./location.svg";
import colors, {
  scoreColors,
} from "components/DashboardUtility/Constants/colorConstants";
import { TabPanel, TabView } from "primereact/tabview";
import { Tag } from "primereact/tag";
import unhealthy from "assets/dashboard/unhealthy-aqi-level.svg";
import severe from "assets/dashboard/severe-aqi-level.svg";
import good from "assets/dashboard/good-aqi-level.svg";
import moderate from "assets/dashboard/moderate-aqi-level.svg";
import poor from "assets/dashboard/poor-aqi-level.svg";
import hazardous from "assets/dashboard/hazardous-aqi-level.svg";
import ColorScaleBar from "components/DashboardUtility/Charts/ColorScaleBar";

const WQI = ({
  selectedValues,
  zoneWQIValues,
  divisionsWithLocations,
  displayValues,
  geoData,
}) => {
  function style(value) {
    return {
      fillColor: getColor(value),
      weight: 1,
      opacity: 1,
      color: "black",
      fillOpacity: 0.7,
    };
  }
  const getColor = (WQI) => {
    if (WQI >= 91 && WQI <= 100) return scoreColors[4];
    if (WQI >= 71 && WQI <= 90) return scoreColors[3];
    if (WQI >= 51 && WQI <= 70) return scoreColors[2];
    if (WQI >= 26 && WQI <= 50) return scoreColors[1];
    if (WQI >= 0 && WQI <= 25) return scoreColors[0];
    else return scoreColors[5]; // Poor (0-25)
  };

  const customIcon = L.icon({
    iconUrl: markerIcon, // Path to your custom marker image
    iconSize: [20, 30], // Size of the icon
    iconAnchor: [18, 41], // Point of the icon which will correspond to marker's location
    popupAnchor: [1, -34], // Point from which the popup should open relative to the iconAnchor
  });

  const getWQIStatus = (wqi) => {
    if (wqi >= 0 && wqi < 25) {
      return {
        status: "EXCELLENT",
        image: good,
        color: colors.good,
        textColor: "white",
      };
    } else if (wqi >= 25 && wqi < 50) {
      return {
        status: "GOOD",
        image: moderate,
        color: colors.moderate,
        textColor: "black",
      };
    } else if (wqi >= 50 && wqi < 75) {
      return {
        status: "FAIR",
        image: poor,
        color: colors.yellow,
        textColor: "black",
      };
    } else if (wqi >= 75 && wqi < 90) {
      return {
        status: "POOR",
        image: unhealthy,
        color: colors.warning,
        textColor: "white",
      };
    } else if (wqi >= 90 && wqi < 100) {
      return {
        status: "HAZARDOUS",
        image: severe,
        color: colors.poor,
        textColor: "white",
      };
    } else {
      return {
        status: "HAZARDOUS",
        image: hazardous,
        color: colors.veryPoor,
        textColor: "white",
      };
    }
  };

  const labels = ["25", "50", "70", "90", "100", "100+"];

  return (
    <div
      className="flex flex-column bg-white border-round align-items-start justify-content-between p-3"
      style={{ flex: "30%" }}
    >
      <p className="card-title p-0 m-0">Water Quality Index</p>
      <TabView panelContainerStyle={{ width: "100%" }}>
        {/* Map Tab */}
        <TabPanel leftIcon="pi pi-map-marker">
          <MapContainer
            center={[26.8, 82.2]}
            zoom={10}
            style={{ height: "15rem", width: "24rem" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {selectedValues.zone === "All Zones" &&
              Object.keys(zoneWQIValues).map((zone) => (
                <GeoJSON
                  key={zone}
                  data={divisionsWithLocations[zone]}
                  style={style(zoneWQIValues[zone].Calculated_WQI)}
                  onEachFeature={(feature, layer) => {
                    layer.bindTooltip(`
                      <strong>Zone:</strong> ${zone}<br/>
                      <strong>WQI:</strong> ${zoneWQIValues[zone].Calculated_WQI}<br/>
                  `);
                  }}
                />
              ))}

            {selectedValues.zone !== "All Zones" && (
              <GeoJSON
                key={selectedValues.zone}
                data={geoData}
                style={style(displayValues.Calculated_WQI)}
                onEachFeature={(feature, layer) => {
                  layer.bindTooltip(`
                    <strong>Zone:</strong> ${displayValues.Divisions}<br/>
                    <strong>WQI:</strong> ${displayValues.Calculated_WQI}<br/>
                `);
                }}
              />
            )}
            <Marker position={[26.779664, 82.224486]} icon={customIcon}>
              <Tooltip>
                <span>
                  Ramghat Sewage Treatment Plant
                  <br />
                  Capacity: 12 MLD
                </span>
              </Tooltip>
            </Marker>
          </MapContainer>
        </TabPanel>

        {/* WQI Information Tab */}
        {selectedValues.zone !== "All Zones" && (
          <TabPanel leftIcon="pi pi-clipboard">
            <div className="flex flex-column border-round-xl p-2 bg-white w-full gap-3">
              <div className="flex justify-content-around align-items-center w-full">
                <div className="flex flex-column align-items-center">
                  <h1 className="text-xl font-bold p-0 m-0 text-primary1">
                    {displayValues.Calculated_WQI}
                  </h1>
                  <Tag
                    className="border-round-3xl"
                    style={{
                      backgroundColor: getWQIStatus(
                        displayValues.Calculated_WQI
                      ).color,
                      color: getWQIStatus(displayValues.Calculated_WQI)
                        .textColor,
                    }}
                  >
                    <span className="text-xs">
                      {getWQIStatus(displayValues.Calculated_WQI).status}
                    </span>
                  </Tag>
                </div>
                {/* WQI Status Image */}
                <img
                  src={getWQIStatus(displayValues.Calculated_WQI).image}
                  alt={getWQIStatus(displayValues.Calculated_WQI).text}
                  className="h-8rem"
                />
              </div>
              <div className="flex flex-column gap-2">
                <div className="flex gap-4 justify-content-center w-full">
                  <div className="flex flex-column shadow-1 border-round p-2">
                    <p className="p-0 m-0 card-text">pH</p>
                    <p className="font-semibold p-0 m-0 text-primary1">
                      {displayValues.pH}
                    </p>
                  </div>
                  <div className="flex flex-column shadow-1 border-round p-2">
                    <p className="p-0 m-0 card-text">TDS</p>
                    <p className="font-semibold p-0 m-0 text-primary1">
                      {displayValues["Total Dissolved Solids, TDS (mg/L)"]} mg/L
                    </p>
                  </div>
                  <div className="flex flex-column shadow-1 border-round p-2">
                    <p className="p-0 m-0 card-text">Hardness</p>
                    <p className="font-semibold p-0 m-0 text-primary1">
                      {displayValues["Total Hardness as CaCO3 (mg/L)"]} mg/L
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <p className="p-0 m-0 font-italic text-sm">Last Updated:</p>

                  <p className="text-secondary2 font-medium p-0 m-0 font-italic text-sm">
                    {displayValues.Last_Updated_Date}
                  </p>
                </div>
              </div>
            </div>
          </TabPanel>
        )}
      </TabView>

      <ColorScaleBar labels={labels} />
    </div>
  );
};

export default WQI;
