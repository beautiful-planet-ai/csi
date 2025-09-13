import React from "react";
import "../AQI/AqiReport.css";

const TempHeatMap = ({ data }) => {
  console.log(data);

  // Extract unique dates
  const dates = [...new Set(data.map((entry) => entry.date))].reverse();

  // Generate time slots from 00:00:00 to 23:00:00
  const timeSlots = Array.from({ length: 24 }, (_, index) => {
    const hours = index < 10 ? `0${index}` : `${index}`;
    return `${hours}:00:00`;
  });

  // Prepare data for heatmap
  const heatmapData = dates.map((date) => {
    return timeSlots.map((time) => {
      const entry = data.find(
        (item) => item.date === date && item.time === time
      );
      return entry
        ? { date: date, time: time, value: entry.temp }
        : { date: date, time: time, value: "-" };
    });
  });

  // Function to get color class based on temp
  function getColorClass(temp) {
    if (temp >= 0 && temp <= 10) {
      return "shade-1";
    } else if (temp > 10 && temp <= 20) {
      return "shade-2";
    } else if (temp > 20 && temp <= 30) {
      return "shade-3";
    } else if (temp > 30 && temp <= 35) {
      return "shade-4";
    } else if (temp > 35 && temp <= 40) {
      return "shade-5";
    } else if (temp > 40) {
      return "shade-6";
    } else {
      return "";
    }
  }

  // Function to format time for display
  const formatTime = (time) => {
    // Expecting time in 'hh:mm:ss' format
    return time.slice(0, 5);
  };

  return (
    <div>
      {data.length > 0 && (
        <table className="w-full">
          <thead>
            <tr>
              <th>Date</th>
              {timeSlots.map((time, index) => (
                <th key={index}>{formatTime(time)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {heatmapData.map((rowData, rowIndex) => (
              <tr key={rowIndex}>
                <td>{dates[rowIndex]}</td>
                {rowData.map((entry, colIndex) => (
                  <td key={colIndex} className={getColorClass(entry.value)}>
                    {entry.value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TempHeatMap;
