import React, { useState, useEffect } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import AqiMap from "./AqiMap";
import "./AqiReport.css";

const AqiReport = ({ selectedLocation, startDate, endDate, averageAQI }) => {
  const formatDateToDDMMYYYY = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };
  const start = formatDateToDDMMYYYY(startDate);
  const end = formatDateToDDMMYYYY(endDate);

  const [avgAqi, setAvgAqi] = useState([]);
  const [locationData, setLocationData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [startDate, endDate, selectedLocation]); // Re-fetch data when date range or location changes

  const fetchData = async () => {
    try {
      console.log("Fetching data...");
      const response = await axios.get(
        `https://api-csi.arahas.com/data/environment?location=${selectedLocation}`
      );
      const data = response.data.data;
      // console.log(data);

      // Process the data
      const processedData = processAqiData(data);
      // Set the processed data to state
      setLocationData(processedData.locationData);
      // console.log(processedData.averageAQI)
      setAvgAqi(processedData.averageAQI);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const convertDateToDDMMYYYY = (dateTimeString) => {
    // Split the date and time parts
    const [datePart, timePart] = dateTimeString.split(" , ");

    // Split the date part into day, month, and year
    const [day, month, year] = datePart.split(" ");

    // Convert month from name to number
    const monthIndex = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ].indexOf(month);

    // Create a new Date object using the parsed values
    const dateObj = new Date(year, monthIndex, day);

    // Format the date to dd-mm-yyyy
    const formattedDate = newformatDateToDDMMYYYY(dateObj);

    return formattedDate;
  };

  const newformatDateToDDMMYYYY = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };
  const processAqiData = (data) => {
    const locationData = {};

    data.forEach((item) => {
      const itemDateTime = convertDateToDDMMYYYY(item.time);

      // Check if the item date is within the range
      if (itemDateTime >= start && itemDateTime <= end) {
        if (!locationData[item.location]) {
          locationData[item.location] = [];
        }

        locationData[item.location].push({
          AQI: item.AQI,
          temp: item.temp,
          humidity: item.humidity,
          pm25: item.pm25,
          pm10: item.pm10,
          NO2: item.NO2,
          so2: item.so2,
          co2: item.co2,
          tvoc: item.tvoc,
          date: itemDateTime,
        });
        // console.log(locationData)
      }
    });

    const averageAQI = Object.keys(locationData).map((location) => {
      const aqiValues = locationData[location].map((item) => item.AQI);
      const averageAQI =
        aqiValues.reduce((sum, value) => sum + value, 0) / aqiValues.length;

      return {
        location,
        AQI: averageAQI.toFixed(2),
        startDate,
        endDate,
      };
    });

    // console.log(averageAQI);
    return { locationData, averageAQI };
  };

  return (
    <div className="Aqi-zone-map">
      {Array.isArray(avgAqi) && avgAqi.length > 0 ? (
        <AqiMap averageAQI={averageAQI} selectedLocation={selectedLocation} />
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "15rem",
            width: "35rem",
          }}
        >
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default AqiReport;
