import React, { useState, useEffect } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import "../AQI/AqiReport.css";
import TempMap from "./TempMap";

const TempReport = () => {
  const [latestDate, setLatestDate] = useState("");
  const [filteredData, setFilteredData] = useState({});
  const [averageData, setAverageData] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const temp_response = await axios.get(
        "https://arahas-data-upload-back.onrender.com/data/environment/temperature"
      );
      const data = temp_response.data.data;

      // Format date and time
      const formattedData = data.map((item) => {
        const dateObj = new Date(item.date);
        const year = dateObj.getFullYear();
        const month = dateObj.getMonth() + 1;
        const day = dateObj.getDate();
        const formattedDate = `${day < 10 ? "0" + day : day}-${
          month < 10 ? "0" + month : month
        }-${year}`;

        const localDateObj = new Date(
          dateObj.getTime() + dateObj.getTimezoneOffset() * 60000
        );
        const hours = localDateObj.getHours();
        const minutes = localDateObj.getMinutes();
        const formattedTimeStr = `${hours}:${
          minutes < 10 ? "0" + minutes : minutes
        }`;

        return {
          ...item,
          formattedDate,
          formattedTimeStr,
        };
      });

      // Calculate the latest date
      const latestDateObj = new Date(
        Math.max(
          ...formattedData.map((item) => {
            const [day, month, year] = item.formattedDate.split("-");
            return new Date(`${year}-${month}-${day}`).getTime();
          })
        )
      );
      const latestDay = latestDateObj.getDate();
      const latestMonth = latestDateObj.getMonth() + 1;
      const latestYear = latestDateObj.getFullYear();
      const formattedLatestDate = `${
        latestDay < 10 ? "0" + latestDay : latestDay
      }-${latestMonth < 10 ? "0" + latestMonth : latestMonth}-${latestYear}`;

      setLatestDate(formattedLatestDate);

      // Filter data by the latest date and group by location
      const latestData = formattedData.filter(
        (item) => item.formattedDate === formattedLatestDate
      );

      const groupedData = latestData.reduce((acc, item) => {
        if (!acc[item.location]) {
          acc[item.location] = [];
        }
        acc[item.location].push(item);
        return acc;
      }, {});

      setFilteredData(groupedData);

      // Calculate the average temperature and humidity for each location
      const averageData = Object.entries(groupedData).reduce(
        (acc, [location, data]) => {
          const totalTemp = data.reduce((sum, item) => sum + item.temperature, 0);
          const totalHumidity = data.reduce((sum, item) => sum + item.humidity, 0);
          const count = data.length;

          acc[location] = {
            avgTemp: (totalTemp / count).toFixed(2),
            avgHumidity: (totalHumidity / count).toFixed(2),
          };

          return acc;
        },
        {}
      );

      console.log("Average Data:", averageData);  // Debug log
      setAverageData(averageData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="Aqi-zone-map">
      {averageData && Object.keys(averageData).length > 0 ? (
        <TempMap averageData={averageData} latestDate={latestDate} />
      ) : (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "25vw" }}>
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default TempReport;
