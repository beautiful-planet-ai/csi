import React, { useState, useEffect } from "react";
import { ColumnChart } from "Layout/GraphVisuals";

const TimeBasedAQITrend = ({
  enviroDate,
  envirotime,
  enviroAQI,
  timePeriod,
  location,
}) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (enviroDate && envirotime && enviroAQI && timePeriod) {
      const transformedData = transformData(
        timePeriod,
        enviroDate,
        envirotime,
        enviroAQI
      );
      setChartData(transformedData);
    }
  }, [timePeriod, enviroDate, envirotime, enviroAQI]);

  const transformData = (timePeriod, enviroDate, envirotime, enviroAQI) => {
    switch (timePeriod) {
      case "weekly":
        return weeklyDataTransformation(enviroDate, envirotime, enviroAQI);
      case "monthly":
        return monthlyDataTransformation(enviroDate, envirotime, enviroAQI);
      case "half-yearly":
        return sixMonthDataTransformation(enviroDate, envirotime, enviroAQI);
      case "yearly":
        return yearlyDataTransformation(enviroDate, envirotime, enviroAQI);
      default:
        return { categories: [], series: [] };
    }
  };

  const weeklyDataTransformation = (enviroDate, envirotime, enviroAQI) => {
    const weeklyData = {};
    enviroDate.forEach((date, index) => {
      const day = new Date(date).toLocaleDateString("en-US", {
        weekday: "long",
      });
      if (!weeklyData[day]) {
        weeklyData[day] = { sum: 0, count: 0 };
      }
      weeklyData[day].sum += parseFloat(enviroAQI[index]);
      weeklyData[day].count++;
    });
    const categories = Object.keys(weeklyData);
    const series = Object.values(weeklyData).map(
      (values) => Math.round(values.sum / values.count)
    );
    return { categories, series };
  };

  const monthlyDataTransformation = (enviroDate, envirotime, enviroAQI) => {
    const monthlyData = {};
    enviroDate.forEach((date, index) => {
      const weekOfMonth = Math.ceil(new Date(date).getDate() / 7);
      const weekLabel = `Week ${weekOfMonth}`;
      if (!monthlyData[weekLabel]) {
        monthlyData[weekLabel] = { sum: 0, count: 0 };
      }
      monthlyData[weekLabel].sum += parseFloat(enviroAQI[index]);
      monthlyData[weekLabel].count++;
    });
    const categories = Object.keys(monthlyData);
    const series = Object.values(monthlyData).map(
      (values) => Math.round(values.sum / values.count)
    );
    return { categories, series };
  };

  const sixMonthDataTransformation = (enviroDate, envirotime, enviroAQI) => {
    const sixMonthData = {};
    enviroDate.forEach((date, index) => {
      const month = new Date(date).toLocaleDateString("en-US", {
        month: "long",
      });
      if (!sixMonthData[month]) {
        sixMonthData[month] = { sum: 0, count: 0 };
      }
      sixMonthData[month].sum += parseFloat(enviroAQI[index]);
      sixMonthData[month].count++;
    });
    const categories = Object.keys(sixMonthData);
    const series = Object.values(sixMonthData).map(
      (values) => Math.round(values.sum / values.count)
    );
    return { categories, series };
  };

  const yearlyDataTransformation = (enviroDate, envirotime, enviroAQI) => {
    const yearlyData = {};
    enviroDate.forEach((date, index) => {
      const month = new Date(date).toLocaleDateString("en-US", {
        month: "long",
      });
      if (!yearlyData[month]) {
        yearlyData[month] = { sum: 0, count: 0 };
      }
      yearlyData[month].sum += parseFloat(enviroAQI[index]);
      yearlyData[month].count++;
    });
    const categories = Object.keys(yearlyData);
    const series = Object.values(yearlyData).map(
      (values) => Math.round(values.sum / values.count)
    );
    return { categories, series };
  };

  return (
    <div className="flex flex-column gap-3 w-full">
      <div className="flex flex-column bg-white border-round p-2 gap-2">
        <div className="flex justify-content-between">
          {chartData ? (
            <ColumnChart
              title={`AQI Analysis ${timePeriod}`}
              categories={chartData.categories}
              series={chartData.series}
              height={300}
              dataPointWidth={40}
            />
          ) : (
            <p>Loading chart...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimeBasedAQITrend;
