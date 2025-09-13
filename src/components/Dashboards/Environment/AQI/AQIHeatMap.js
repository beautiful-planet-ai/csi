import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet.heat';

const AQIHeatMap = () => {
  const [heatPoints, setHeatPoints] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api-csi.arahas.com/map?start_date=2024-01-08&end_date=2024-02-28&param=temp');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        // Process data to get heat points
        const heatPointsData = data.map(item => [item.latitude, item.longitude, item.temperature]);
        setHeatPoints(heatPointsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Create the map
    const map = L.map('map').setView([26.7, 82.15], 13);

    // Add a tile layer to the map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Add heatmap layer
    L.heatLayer(heatPoints, { radius: 25 }).addTo(map);

    return () => {
      map.remove();
    };
  }, [heatPoints]);

  return <div id="map" style={{ height: '100vh', width: '100%' }} />;
};

export default AQIHeatMap;
