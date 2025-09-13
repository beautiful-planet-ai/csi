import React, { useEffect, useState } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import "../AQI/AqiReport.css";
import HeatMap from "./HeatMap";
import { Button } from "primereact/button";
import { commonChartOptions } from "Layout/chartOptions";
import { classNames } from "primereact/utils";
import colors from "components/DashboardUtility/Constants/colorConstants";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const DailyTrend = ({
  selectedDate,
  dailyAverage,
  dailyData,
  setSelectedDate,
  fifteenDaysData,
  startDate,
  onShowTableChange,
}) => {
  const [chartData, setChartData] = useState({});
  const [isDrilldown, setIsDrilldown] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [drilldownChartData, setDrilldownChartData] = useState([]);
  useEffect(() => {
    if (
      drilldownChartData &&
      drilldownChartData[0] &&
      drilldownChartData[0].dataPoints
    ) {
      const peakHours = calculatePeakHours(drilldownChartData[0].dataPoints);

      const updatedDataPoints = drilldownChartData[0].dataPoints.map(
        (dataPoint) => {
          const hour = parseInt(dataPoint.label.split(":")[0]);
          const isDaytime = hour >= 6 && hour <= 17;

          let markerColor = null;
          if (peakHours.daytime.includes(dataPoint.label) && isDaytime) {
            markerColor = "#F7A47A"; // Highlight day peak hours with red
          } else if (
            peakHours.nighttime.includes(dataPoint.label) &&
            !isDaytime
          ) {
            markerColor = "#4D7479"; // Highlight night peak hours with purple
          }

          return {
            ...dataPoint,
            markerColor: markerColor,
            markerSize: markerColor ? 10 : 8, // Increase marker size for highlighted points
          };
        }
      );

      setDrilldownChartData([
        {
          ...drilldownChartData[0],
          dataPoints: updatedDataPoints,
        },
      ]);
    }
  }, [drilldownChartData]);
  // Helper function to determine day or night based on time
  const isDayTime = (hour) => {
    return hour >= 6 && hour <= 17;
  };

  // Function to calculate peak hours for daytime and nighttime
  const calculatePeakHours = (data) => {
    const daytimeData = data.filter((item) => {
      const hour = parseInt(item.label.split(":")[0]);
      return isDayTime(hour);
    });
    const nighttimeData = data.filter((item) => {
      const hour = parseInt(item.label.split(":")[0]);
      return !isDayTime(hour);
    });

    const findPeakHours = (timeData) => {
      if (timeData.length === 0) return [];

      // Find the maximum AQI value
      let maxAQI = Math.max(...timeData.map((item) => item.y));

      // Get all hours with the maximum AQI
      let peakHours = timeData
        .filter((item) => item.y === maxAQI)
        .map((item) => item.label);

      return peakHours;
    };

    const peakDaytimeHours = findPeakHours(daytimeData);
    const peakNighttimeHours = findPeakHours(nighttimeData);

    return {
      daytime: peakDaytimeHours,
      nighttime: peakNighttimeHours,
    };
  };

  useEffect(() => {
    const dataPoints = Object.entries(dailyAverage).map(([date, value]) => ({
      label: date,
      x: new Date(date.split("-").join("-")),
      y: parseFloat(value),
    }));
    dataPoints.sort((a, b) => a.x - b.x);
    const newChartData = {
      BaseChart: [
        {
          click: baseChartDrilldownHandler,
          cursor: "pointer",
          explodeOnClick: false,
          name: "BaseChart",
          type: "column",
          dataPoints: dataPoints,
          color: "#0F4B57",
        },
      ],
    };

    setChartData(newChartData);
  }, [dailyAverage]);

  useEffect(() => {
    const selectedDateData = dailyData
      .map(({ time, aqi }) => ({
        label: time,
        y: parseFloat(aqi),
      }))
      .sort((a, b) => {
        const timeA =
          parseInt(a.label.split(":")[0]) * 60 +
          parseInt(a.label.split(":")[1]);
        const timeB =
          parseInt(b.label.split(":")[0]) * 60 +
          parseInt(b.label.split(":")[1]);
        return timeA - timeB;
      });
    setDrilldownChartData([
      {
        color: "#98C6CF",
        name: selectedDate,
        type: "area",
        dataPoints: selectedDateData,
      },
    ]);
  }, [selectedDate, dailyData]);

  const baseChartDrilldownHandler = (e) => {
    setSelectedDate(e.dataPoint.label);
    setIsDrilldown(true);
  };

  const backButtonClickHandler = () => {
    setIsDrilldown(false);
    onShowTableChange(false);
    setShowTable(false);
  };
  const lastFifteenClickHandler = () => {
    onShowTableChange(true);
    setShowTable(true);
  };
  const backButtonClassName = classNames({
    invisible: !isDrilldown,
  });

  const baseChartOptions = {
    animationEnabled: true,
    height: 300,
    backgroundColor: "transparent",
    legend: {
      ...commonChartOptions.legend,
    },
    // title: {
    //   text: "Daywise Trend",
    //   ...commonChartOptions.title,
    // },
    axisX: {
      labelFontColor: "#717171",
      lineColor: "#a2a2a2",
      tickColor: "#a2a2a2",
      labelFontFamily: "Montserrat",
      labelFontSize: 8,
    },
    axisY: {
      gridThickness: 0,
      includeZero: false,
      labelFontColor: "#717171",
      lineColor: "#a2a2a2",
      tickColor: "#a2a2a2",
      labelFontFamily: "Montserrat",
      lineThickness: 1,
      stripLines: [
        {
          value: 400,
          thickness: 1,
          color: "rgb(93, 92, 92)",
          lineDashType: "dash",
          label: "Critical Threshold (400)",
        },
      ],
    },
    data: chartData["BaseChart"],
    toolTip: {
      position: "bottom",
      contentFormatter: function (e) {
        // Set the selectedDate to the hovered date
        setSelectedDate(e.entries[0].dataPoint.label);
        const selectedDataForDate = dailyData
          .map(({ time, aqi }) => ({
            label: time,
            y: parseFloat(aqi),
          }))
          .sort((a, b) => {
            const timeA =
              parseInt(a.label.split(":")[0]) * 60 +
              parseInt(a.label.split(":")[1]);
            const timeB =
              parseInt(b.label.split(":")[0]) * 60 +
              parseInt(b.label.split(":")[1]);
            return timeA - timeB;
          });

        const uniqueSelectedDateData = selectedDataForDate.filter(
          (entry, index, self) =>
            index ===
            self.findIndex((t) => t.label === entry.label && t.y === entry.y)
        );

        // Calculate peak hours for the selected date
        const peakHours = calculatePeakHours(uniqueSelectedDateData);

        // Split data into daytime and nighttime
        const daytimeData = uniqueSelectedDateData.filter((entry) => {
          const hour = parseInt(entry.label.split(":")[0]);
          return hour >= 6 && hour < 18; // Assuming daytime is 6 AM to 6 PM
        });

        const nighttimeData = uniqueSelectedDateData.filter((entry) => {
          const hour = parseInt(entry.label.split(":")[0]);
          return hour < 6 || hour >= 18; // Assuming nighttime is 6 PM to 6 AM
        });

        let content = "";

        //Main Container
        content += `<div style="font-family: Montserrat, sans-serif; padding: 5px;  display: flex; flex-direction: column; width :"50rem">`; // Increased width and added flex display

        // Header Section: Date and Average AQI
        content += `<div style="display: block; width:auto;">`;
        content += `<div style="font-size: 0.8rem; font-weight: bold; text-align: center; margin-bottom: 5px; color: #333;">`; // Reduced margin-bottom
        content += `AQI Data for ${selectedDate}`;
        content += "</div>";
        content += `<div style="font-size: 0.8em; text-align: center; margin-bottom: 5px; color: #666;">`; // Reduced margin-bottom
        content += `Average AQI: ${dailyAverage[selectedDate]}`;
        content += "</div>";
        content += `<div style="margin-bottom: 5px; padding-left: 5px; display:flex; flex-direction:row; gap:10px">`; // Reduced margin-bottom
        content += `<div style="font-size: 0.8rem; font-weight: bold; color: #333;">Peak Hours:</div>`;
        content += `<div style="font-size: 0.8rem; color: #666;">Day: ${
          peakHours.daytime || "N/A"
        }</div>`;
        content += `<div style="font-size: 0.8rem; color: #666;">Night: ${
          peakHours.nighttime || "N/A"
        }</div>`;
        content += `</div>`;
        content += `</div>`;
        content += `<div style="font-family: Montserrat, sans-serif; padding: 5px;  display: flex; flex-direction: row;">`; // Reduced padding
        //Daytime Container
        content += `<div style = "width: 50%; padding-right: 5px; box-sizing: border-box;">`;
        // Daytime Table Section
        content += `<div style="font-size: 0.8rem; font-weight: bold; color: #333; margin-bottom: 2px;">Day AQI (06:00 - 18:00):</div>`; // Reduced margin-bottom
        content += `<table style="width: 100%; border-collapse: collapse; margin-top: 2px;">`; // Reduced margin-top
        content += `<tr style="font-size: 0.8rem; font-weight: bold; background-color: #e0e0e0;">
              <th style="padding: 2px; font-size:0.8rem;; text-align: left;">Time</th>
              <th style="padding: 2px; font-size:0.8rem;; text-align: left;">AQI</th>
              </tr>`;

        daytimeData.forEach((entry) => {
          const colorClass = getColorClass(entry.y);
          content += `<tr style="padding: 0px;">
                  <td style="padding: 2px; font-size:0.7rem;background-color :${colorClass}; color:#FEF9E1; font-weight:600" >${entry.label}</td>
                  <td style="padding: 2px;font-size:0.7rem;background-color :${colorClass}; color:#FEF9E1; font-weight:600" >${entry.y}</td>
                  </tr>`;
        });

        content += `</table>`;
        content += `</div>`;

        // Nighttime Container
        content += `<div style = "width: 50%; padding-left: 5px; box-sizing: border-box;">`;
        // Nighttime Table Section
        content += `<div style="font-size: 0.8em; font-weight: bold; color: #333; margin-bottom: 2px;">Night AQI (18:00 - 06:00):</div>`; // Reduced margin-bottom
        content += `<table style="width: 100%; border-collapse: collapse; margin-top: 2px;">`; // Reduced margin-top
        content += `<tr style="font-size: 0.8rem; font-weight: bold; background-color: #e0e0e0;">
              <th style="padding: 2px;font-size:0.8rem; text-align: left;">Time</th>
              <th style="padding: 2px;font-size:0.8rem; text-align: left;">AQI</th>
              </tr>`;

        nighttimeData.forEach((entry) => {
          const colorClass = getColorClass(entry.y);
          content += `<tr style="padding: 0px;">
                  <td style="padding: 2px;font-size:0.7rem; background-color :${colorClass}; color:#FEF9E1; font-weight:600" >${entry.label}</td>
                  <td style="padding: 2px;font-size:0.7rem; background-color :${colorClass}; color:#FEF9E1; font-weight:600" >${entry.y}</td>
                  </tr>`;
        });

        content += `</table>`;
        content += `</div>`;
        content += `</div>`;

        //Legend Section
        content += `<div style="display: flex; flex-direction: row; gap: 5px; justify-content: end; width: 100%;">`;
        content += `<div style="display: flex; align-items: center; gap: 1px;">
                <i class="pi pi-circle-fill" style="font-size: 0.5rem; color:${colors.good};"></i>
                <p style="margin: 0; " class="insight-text">0-50</p>
              </div>`;
        content += `<div style="display: flex; align-items: center; gap: 1px;">
                <i class="pi pi-circle-fill" style="font-size: 0.5rem; color:${colors.moderate};"></i>
                <p style="margin: 0; "  class="insight-text">51-100</p>
              </div>`;
        content += `<div style="display: flex; align-items: center; gap: 1px;">
                <i class="pi pi-circle-fill" style="font-size: 0.5rem; color:${colors.yellow}"></i>
                <p style="margin: 0; " class="insight-text">101-200</p>
              </div>`;
        content += `<div style="display: flex; align-items: center; gap: 1px;">
                <i class="pi pi-circle-fill" style="font-size: 0.5rem; color:${colors.warning};"></i>
                <p style="margin: 0; "  class="insight-text">201-300</p>
              </div>`;
        content += `<div style="display: flex; align-items: center; gap: 1px;">
                <i class="pi pi-circle-fill" style="font-size: 0.5rem; color:${colors.poor};"></i>
                <p style="margin: 0; " class="insight-text">301-400</p>
              </div>`;
        content += `<div style="display: flex; align-items: center; gap: 1px;">
                <i class="pi pi-circle-fill" style="font-size: 0.5rem; color:${colors.veryPoor};"></i>
                <p style="margin: 0; " class="insight-text">400 and above</p>
              </div>`;
        content += `</div>`; // Legend end
        content += `</div>`; //Closing Main Container

        return content;
      },
    },
  };
  function getColorClass(aqi) {
    if (aqi >= 0 && aqi <= 50) {
      return colors.good;
    } else if (aqi >= 51 && aqi <= 100) {
      return colors.moderate;
    } else if (aqi >= 101 && aqi <= 200) {
      return colors.yellow;
    } else if (aqi >= 201 && aqi <= 300) {
      return colors.warning;
    } else if (aqi >= 301 && aqi <= 400) {
      return colors.poor;
    } else if (aqi >= 401) {
      return colors.veryPoor;
    } else {
      return "";
    }
  }

  const drilldownChartOptions = {
    animationEnabled: true,
    title: {
      text: "AQI Level for " + selectedDate,
      ...commonChartOptions.title,
    },
    height: 250,
    backgroundColor: "transparent",
    axisX: {
      labelFontColor: "#717171",
      lineColor: "#a2a2a2",
      tickColor: "#a2a2a2",
      labelFontFamily: "Montserrat",
    },
    axisY: {
      gridThickness: 0,
      includeZero: false,
      labelFontColor: "black",
      lineColor: "#a2a2a2",
      tickColor: "#a2a2a2",
      labelFontFamily: "Montserrat",
      lineThickness: 1,
      stripLines: [
        {
          value: 400,
          thickness: 1,
          color: "rgb(93, 92, 92)",
          lineDashType: "dash",
          label: "Critical Threshold (400)",
        },
      ],
    },
    data: drilldownChartData,
    toolTip: {
      shared: true,
      contentFormatter: function (e) {
        let content = "";
        content +=
          "AQI Level at " +
          e.entries[0].dataPoint.label +
          " is " +
          e.entries[0].dataPoint.y;
        return content;
      },
    },
  };
  return (
    <div className="flex flex-column gap-3 w-full">
      <div className="flex flex-column" style={{ flex: "70%" }}>
        <div className="flex align-items-start justify-content-start gap-2">
          <Button
            className={`${backButtonClassName} bg-primary1  text-white text-xs`}
            onClick={backButtonClickHandler}
            label="Back"
            raised
            size="small"
          />
          {fifteenDaysData.length > 0 && (
            <Button
              className={`${backButtonClassName} bg-primary1  text-white text-xs`}
              onClick={lastFifteenClickHandler}
              label="View Previous Days Trend"
              raised
              size="small"
            />
          )}
        </div>
        <CanvasJSChart
          options={isDrilldown ? drilldownChartOptions : baseChartOptions}
          containerProps={{ width: "100%" }}
        />
        {isDrilldown && (
          <div className="flex w-full gap-4">
            <div className="flex align-items-center gap-1">
              <i
                className="pi pi-circle-fill"
                style={{ fontSize: "0.8em", color: "#F7A47A" }}
              ></i>
              <p style={{ fontSize: "0.8em", margin: 0 }} className="card-text">
                Day Peak Hour
              </p>
            </div>
            <div className="flex align-items-center gap-1">
              <i
                className="pi pi-circle-fill"
                style={{ fontSize: "0.8em", color: "#4D7479" }}
              ></i>
              <p style={{ fontSize: "0.8em", margin: 0 }} className="card-text">
                Night Peak Hour
              </p>
            </div>
          </div>
        )}
      </div>

      {showTable === true && fifteenDaysData.length > 0 && (
        <HeatMap data={fifteenDaysData} startDate={startDate} />
      )}
    </div>
  );
};

export default DailyTrend;
