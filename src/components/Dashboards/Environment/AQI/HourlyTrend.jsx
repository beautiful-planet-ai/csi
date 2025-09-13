import React, { useState } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import { commonChartOptions } from "Layout/chartOptions";
import { chartColors } from "components/DashboardUtility/Constants/colorConstants";
import { Button } from "primereact/button";

const HourlyTrend = ({
  averageDaytimeAqi,
  averageNighttimeAqi,
  hourlyAverages,
}) => {
  const [selectedChart, setSelectedChart] = useState(null);
  const CanvasJSChart = CanvasJSReact.CanvasJSChart;

  const handlePointClick = (e) => {
    const chartType = e.dataPoint.name;
    setSelectedChart(chartType);
  };

  const overallOptions = {
    animationEnabled: true,
    title: {
      text: "Day vs Night Trend",
      ...commonChartOptions.title,
    },
    axisY: {
      ...commonChartOptions.axisY,
    },
    axisX: {
      ...commonChartOptions.axisX,
    },
    height: 200,
    backgroundColor: "transparent",
    dataPointWidth: 30,
    data: [
      {
        type: "column",
        name: "Overall",
        click: handlePointClick,
        dataPoints: [
          {
            label: "Day",
            y: averageDaytimeAqi,
            name: "Day",
            color: chartColors[3],
          },
          {
            label: "Night",
            y: averageNighttimeAqi,
            name: "Night",
            color: chartColors[4],
          },
        ],
      },
    ],
  };

  const daytimeOptions = {
    animationEnabled: true,
    theme: "light2",
    title: {
      ...commonChartOptions.title,
    },
    axisY: {
      ...commonChartOptions.axisY,
    },
    axisX: {
      ...commonChartOptions.axisX,
    },
    height: 150,
    backgroundColor: "transparent",
    dataPointWidth: 10,
    data: [
      {
        type: "column",
        name: "DaytimeDetail",
        dataPoints: [
          {
            label: "6:00",
            y: hourlyAverages["06:00"],
            color: chartColors[0],
          },
          {
            label: "7:00",
            y: hourlyAverages["07:00"],
            color: chartColors[1],
          },
          {
            label: "8:00",
            y: hourlyAverages["08:00"],
            color: chartColors[2],
          },
          {
            label: "9:00",
            y: hourlyAverages["09:00"],
            color: chartColors[3],
          },
          {
            label: "10:00",
            y: hourlyAverages["10:00"],
            color: chartColors[4],
          },
          {
            label: "11:00",
            y: hourlyAverages["11:00"],
            color: chartColors[5],
          },
          {
            label: "12:00",
            y: hourlyAverages["12:00"],
            color: chartColors[6],
          },
          {
            label: "13:00",
            y: hourlyAverages["13:00"],
            color: chartColors[7],
          },
          {
            label: "14:00",
            y: hourlyAverages["14:00"],
            color: chartColors[8],
          },
          {
            label: "15:00",
            y: hourlyAverages["15:00"],
            color: chartColors[9],
          },
          {
            label: "16:00",
            y: hourlyAverages["16:00"],
            color: chartColors[10],
          },
          {
            label: "17:00",
            y: hourlyAverages["17:00"],
            color: chartColors[11],
          },
        ],
      },
    ],
  };

  const nighttimeOptions = {
    animationEnabled: true,
    theme: "light2",
    title: {
      ...commonChartOptions.title,
    },
    axisY: {
      ...commonChartOptions.axisY,
    },
    axisX: {
      ...commonChartOptions.axisX,
    },
    height: 150,
    backgroundColor: "transparent",
    dataPointWidth: 10,
    data: [
      {
        type: "column",
        name: "NighttimeDetail",
        dataPoints: [
          {
            label: "18:00",
            y: hourlyAverages["18:00"],
            color: chartColors[11],
          },
          {
            label: "19:00",
            y: hourlyAverages["19:00"],
            color: chartColors[10],
          },
          {
            label: "20:00",
            y: hourlyAverages["20:00"],
            color: chartColors[9],
          },
          {
            label: "21:00",
            y: hourlyAverages["21:00"],
            color: chartColors[8],
          },
          {
            label: "22:00",
            y: hourlyAverages["22:00"],
            color: chartColors[7],
          },
          {
            label: "23:00",
            y: hourlyAverages["23:00"],
            color: chartColors[6],
          },
          {
            label: "00",
            y: hourlyAverages["00:00"],
            color: chartColors[0],
          },
          {
            label: "01:00",
            y: hourlyAverages["01:00"],
            color: chartColors[1],
          },
          {
            label: "02:00",
            y: hourlyAverages["02:00"],
            color: chartColors[2],
          },
          {
            label: "03:00",
            y: hourlyAverages["03:00"],
            color: chartColors[3],
          },
          {
            label: "04:00",
            y: hourlyAverages["04:00"],
            color: chartColors[4],
          },
          {
            label: "05:00",
            y: hourlyAverages["05:00"],
            color: chartColors[5],
          },
        ],
      },
    ],
  };

  let chartOptions;
  if (selectedChart === "Day") {
    chartOptions = daytimeOptions;
  } else if (selectedChart === "Night") {
    chartOptions = nighttimeOptions;
  } else {
    chartOptions = overallOptions;
  }

  return (
    <div className="w-full flex flex-column bg-white border-round p-4">
      {selectedChart && (
        <Button
          onClick={() => setSelectedChart(null)}
          icon="pi pi-arrow-left"
          className="bg-primary1  text-white text-xs"
          raised
        />
      )}
      <CanvasJSChart
        options={chartOptions}
        containerProps={{ width: "100%" }}
      />
    </div>
  );
};

export default HourlyTrend;
