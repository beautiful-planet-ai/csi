import React, { useEffect, useRef } from "react";
import "ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import GeoJSON from "ol/format/GeoJSON";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Style, Fill, Stroke, Icon } from "ol/style";
import { Feature } from "ol";
import Point from "ol/geom/Point";
import Overlay from "ol/Overlay";
import airport from "../aqi/airport.webp";
import railway from "../aqi/railway.avif";
import school from "../aqi/tiny-school.jpg";
import temple from "../../assets/KYC/ram.jpg";
import Shahadat from "../aqi/shahadat.jpeg";
import ADABoundary from "components/Dashboards/Environment/Maps/ADA_Boundary.json";

const AqiMap = ({ averageAQI, selectedLocation }) => {
  const mapRef = useRef();

  const getAqiIconColor = (aqi) => {
    if (aqi > 0 && aqi <= 100) return "green"; // Green
    if (aqi > 100 && aqi <= 200) return "yellow"; // Yellow
    if (aqi > 200 && aqi <= 300) return "orange"; // Red
    if (aqi > 300 && aqi <= 400) return "red"; // Orange
    if (aqi > 400) return "purple"; // Purple
    return "black";
  };

  const getAqiBackgroundColor = (aqi) => {
    if (aqi > 0 && aqi <= 100) return "rgba(0, 255, 0, 0.8)"; // Green
    if (aqi > 100 && aqi <= 200) return "rgba(255, 255, 0, 0.8)"; // Yellow
    if (aqi > 200 && aqi <= 300) return "rgba(255, 0, 0, 0.8)"; // Red
    if (aqi > 300 && aqi <= 400) return "rgba(255, 165, 0, 0.8)"; // Orange
    if (aqi > 400) return "rgba(128, 0, 128, 0.8)"; // Purple
    return "white"; // Default color
  };

  useEffect(() => {
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      attribution: false,
      view: new View({
        center: fromLonLat([82.144132, 26.783869]),
        zoom: 10,
      }),
    });

    const geojsonSource = new VectorSource({
      features: new GeoJSON().readFeatures(ADABoundary, {
        featureProjection: "EPSG:3857",
      }),
    });

    const geojsonLayer = new VectorLayer({
      source: geojsonSource,
      style: new Style({
        stroke: new Stroke({
          color: "#00a269",
          width: 2,
        }),
        fill: new Fill({
          color: "rgba(169, 243, 224, 0.3)",
        }),
      }),
    });

    map.addLayer(geojsonLayer);

    const markers = [
      {
        location: "Ayodhya - Civil line,Tiny tots",
        lat: 26.774794,
        lon: 82.134539,
        default_message: "Civil line, Tiny tots school",
      },
      {
        location: "Ayodhya - Shahadat Ganj",
        lat: 26.767421,
        lon: 82.09535,
        default_message: "Shahadat Ganj",
      },
      {
        location: "Ayodhya-Bank colony",
        lat: 26.764028,
        lon: 82.133778,
        default_message: "Bank Colony Near Railway Station",
      },
      {
        location: " Ayodhya-near Airport",
        lat: 26.735415,
        lon: 82.140133,
        default_message: "Near Airport",
      },
      {
        location: "Ayodhya-Ranopali",
        lat: 26.777265,
        lon: 82.185866,
        default_message: "Ranopali Near Kila Ayodhya",
      },
    ];

    const filteredMarker = markers.find(
      (marker) => marker.location === selectedLocation
    );

    const markerSource = new VectorSource();
    if (filteredMarker) {
      const aqi = averageAQI; // Directly use the averageAQI for the selected location
      const iconColor = getAqiIconColor(aqi);
      const backgroundColor = getAqiBackgroundColor(aqi);

      const feature = new Feature({
        geometry: new Point(
          fromLonLat([filteredMarker.lon, filteredMarker.lat])
        ),
        name: filteredMarker.default_message,
        aqi,
        backgroundColor,
        location: filteredMarker.location,
      });

      feature.setStyle(
        new Style({
          image: new Icon({
            src: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="${iconColor}" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5 14.5 7.62 14.5 9s-1.12 2.5-2.5 2.5z"/></svg>`,
            scale: 1,
          }),
        })
      );

      markerSource.addFeature(feature);
    }

    const markerLayer = new VectorLayer({
      source: markerSource,
    });

    map.addLayer(markerLayer);

    const overlayContainerElement = document.createElement("div");
    overlayContainerElement.className = "popup-overlay";
    document.body.appendChild(overlayContainerElement);

    const popupContent = document.createElement("div");
    popupContent.className = "custom-popup";

    const popupBody = document.createElement("div");
    popupBody.className = "popup-body";

    popupContent.appendChild(popupBody);

    const overlay = new Overlay({
      element: popupContent,
      positioning: "bottom-center",
      stopEvent: false,
      offset: [100, 20],
    });

    map.addOverlay(overlay);

    popupContent.style.padding = "0.3vw";
    popupContent.style.fontSize = "0.7vw";

    map.on("pointermove", function (event) {
      const feature = map.getFeaturesAtPixel(event.pixel)[0];
      if (feature && feature.get("name")) {
        const coordinate = feature.getGeometry().getCoordinates();
        overlay.setPosition(coordinate);

        const name = feature.get("name") || "";
        const aqi = feature.get("aqi") || "";
        const backgroundColor = feature.get("backgroundColor") || "";
        const location = feature.get("location") || "";

        let popupHTML = `
          <div>
            ${
              location === "Ayodhya - Civil line,Tiny tots"
                ? `<img src="${school}" alt="School" style="width: 100%; height: 5vw;"/>`
                : ""
            }
            ${
              location === "Ayodhya - Shahadat Ganj"
                ? `<img src="${Shahadat}" alt="Shahadat" style="width: 100%; height: 5vw;"/>`
                : ""
            }
            ${
              location === "Ayodhya-Bank colony"
                ? `<img src="${railway}" alt="Railway" style="width: 100%; height: 5vw;"/>`
                : ""
            }
            ${
              location === " Ayodhya-near Airport"
                ? `<img src="${airport}" alt="Airport" style="width: 100%; height: 6vw;"/>`
                : ""
            }
            ${
              location === "Ayodhya-Ranopali"
                ? `<img src="${temple}" alt="Temple" style="width: 100%; height: 5vw;"/>`
                : ""
            }
            <p><strong>${location}</strong></p>
            <p><strong>AQI Level:</strong> ${aqi}</p>
          </div>
        `;

        popupBody.innerHTML = popupHTML;
        popupContent.style.backgroundColor = backgroundColor;
        popupContent.style.display = "block";
      } else {
        popupContent.style.display = "none";
      }
    });

    return () => {
      map.setTarget(null);
      document.body.removeChild(overlayContainerElement);
    };
  }, [averageAQI]);

  return (
    <div className="w-full">
      <div
        ref={mapRef}
        style={{
          width: "25rem",
          height: "10rem",
          overflow: "hidden",
        }}
      />
    </div>
  );
};

export default AqiMap;
