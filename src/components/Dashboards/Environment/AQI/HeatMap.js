import colors from "components/DashboardUtility/Constants/colorConstants";
import React from "react";

const HeatMap = ({ data }) => {

  // Extract unique dates
  const dates = [...new Set(data.map((entry) => entry.date))].reverse();

  // Generate time slots from 00:00:00 to 23:00:00
  const timeSlots = Array.from({ length: 24 }, (_, index) => {
    const hours = index < 10 ? `0${index}` : `${index}`;
    return `${hours}:00`;
  });

  // Prepare data for heatmap
  const heatmapData = dates.map((date) => {
    return timeSlots.map((time) => {
      const entry = data.find(
        (item) => item.date === date && item.time === time
      );
      return entry
        ? { date: date, time: time, value: entry.aqi }
        : { date: date, time: time, value: "-" };
    });
  });

  // Function to get color class based on AQI
  const getColorClass = (aqi) => {
    if (aqi === "-") return "";
    if (aqi >= 0 && aqi <= 50) return colors.good;
    if (aqi >= 51 && aqi <= 100) return colors.moderate;
    if (aqi >= 101 && aqi <= 200) return colors.yellow;
    if (aqi >= 201 && aqi <= 300) return colors.warning;
    if (aqi >= 301 && aqi <= 400) return colors.poor;
    if (aqi >= 401) return colors.veryPoor;
    return "";
  };

  // Function to format time for display
  const formatTime = (time) => {
    // Expecting time in 'hh:mm:ss' format
    return time.slice(0, 5);
  };

  return (
    <div
      className="flex w-full flex-column p-4 border-round bg-white"
      style={{ flex: "40%" }}
    >
      <p className="card-title">Previous Trend</p>
      {data.length > 0 && (
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-sm card-text">Date</th>
              {timeSlots.map((time, index) => (
                <td key={index} className="text-xs card-text">
                  {formatTime(time)}
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {heatmapData.map((rowData, rowIndex) => (
              <tr key={rowIndex}>
                <td className="p-0 text-xs text-center card-text">
                  {dates[rowIndex]}
                </td>
                {rowData.map((entry, colIndex) => (
                  <td
                    key={colIndex}
                    className={` text-sm text-center p-1 text-white`}
                    style={{ backgroundColor: getColorClass(entry.value) }}
                  >
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

export default HeatMap;
