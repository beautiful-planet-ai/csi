import React, { useState, useEffect } from "react";
import "../AQI/AqiReport.css";
import DailyTrend from "./DailyTrendNEW";

const AQIChartNEW = ({
  enviroDate,
  envirotime,
  enviroPM25,
  enviroPM10,
  enviroSO2,
  enviroAQI,
  enviroNO2,
  enviroco2,
  startDate,
  aqiAPI,
  dateAPI,
  timeAPI,
}) => {
  const [selectedMonth, setSelectedMonth] = useState("01");
  const [selectedDate, setSelectedDate] = useState("2024-12-01");
  const [chartData, setChartData] = useState([]);
  // const [weeklyAverages, setWeeklyAverages] = useState(null);
  const [dailyAverage, setDailyAverage] = useState(null);
  const [dailyData, setDailyData] = useState(null);
  const [dailyAverageAPI, setDailyAverageAPI] = useState(null);
  const [dailyDataAPI, setDailyDataAPI] = useState(null);
  const [fifteenDaysData, setFifteenDaysData] = useState(null);

  const getSelectedYear = () => {
    return new Date(selectedDate).getFullYear(); // Extract year from selectedDate
  };

  const calculateDailyAverages = () => {
    if (!enviroDate || !enviroAQI) {
      return null;
    }

    const dailyAveragesData = {};

    enviroDate.forEach((date, index) => {
      const aqi = enviroAQI[index];
      if (!dailyAveragesData[date]) {
        dailyAveragesData[date] = [];
      }
      dailyAveragesData[date].push(aqi);
    });

    const dailyAverages = {};
    for (const date in dailyAveragesData) {
      const dailyAQI = dailyAveragesData[date];
      const sum = dailyAQI.reduce((acc, aqi) => acc + aqi, 0);
      const average = sum / dailyAQI.length;
      dailyAverages[date] = parseFloat(average.toFixed(2));
    }
    return dailyAverages;
  };
  const calculateDailyAveragesAPI = () => {
    if (!dateAPI || !aqiAPI) {
      return null;
    }

    const dailyAveragesData = {};

    dateAPI.forEach((date, index) => {
      const aqi = aqiAPI[index];
      if (!dailyAveragesData[date]) {
        dailyAveragesData[date] = [];
      }
      dailyAveragesData[date].push(aqi);
    });

    const dailyAverages = {};
    for (const date in dailyAveragesData) {
      const dailyAQI = dailyAveragesData[date];
      const sum = dailyAQI.reduce((acc, aqi) => acc + aqi, 0);
      const average = sum / dailyAQI.length;
      dailyAverages[date] = parseFloat(average.toFixed(2));
    }
    return dailyAverages;
  };

  const getDailyData = () => {
    if (!enviroDate || !enviroAQI || !envirotime) {
      return [];
    }

    const selectedDateData = enviroDate.reduce((acc, date, index) => {
      const time = envirotime[index];
      const aqi = enviroAQI[index];
      if (date === selectedDate) {
        acc.push({ time, aqi });
      }
      return acc;
    }, []);

    // Remove duplicates and sort by time
    const uniqueData = Array.from(
      new Set(selectedDateData.map((item) => item.time))
    ).map((time) => {
      return selectedDateData.find((item) => item.time === time);
    });

    return uniqueData.sort((a, b) => a.time.localeCompare(b.time));
  };
  const getDailyDataAPI = () => {
    if (!dateAPI || !aqiAPI || !timeAPI) {
      return [];
    }

    const selectedDateData = dateAPI.reduce((acc, date, index) => {
      const time = timeAPI[index];
      const aqi = aqiAPI[index];
      if (date === selectedDate) {
        acc.push({ time, aqi });
      }
      return acc;
    }, []);

    // Remove duplicates and sort by time
    const uniqueData = Array.from(
      new Set(selectedDateData.map((item) => item.time))
    ).map((time) => {
      return selectedDateData.find((item) => item.time === time);
    });

    return uniqueData.sort((a, b) => a.time.localeCompare(b.time));
  };
  const getFifteenDaysData = () => {
    if (!enviroDate || !enviroAQI || !envirotime) {
      return [];
    }

    // Calculate date 15 days ago
    const fifteenDaysAgo = new Date(selectedDate);

    fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);

    // Filter data for the last 15 days
    const filteredData = enviroDate.reduce((acc, date, index) => {
      const dateObj = new Date(date);
      const selectedDateVal = new Date(selectedDate);
      if (dateObj >= fifteenDaysAgo && dateObj <= selectedDateVal) {
        acc.push({
          date,
          time: envirotime[index],
          aqi: enviroAQI[index],
          pm25: enviroPM25[index],
          pm10: enviroPM10[index],
          so2: enviroSO2[index],
          no2: enviroNO2[index],
          co2: enviroco2[index],
        });
      }
      return acc;
    }, []);

    // Remove duplicates and sort by date and time
    const uniqueData = Array.from(
      new Map(
        filteredData.map((item) => [`${item.date}_${item.time}`, item])
      ).values()
    );
    uniqueData.sort(
      (a, b) =>
        new Date(`${a.date} ${a.time}`) - new Date(`${b.date} ${b.time}`)
    );
    return uniqueData;
  };

  // const calculateWeeklyAverages = () => {
  //   if (!enviroDate || !enviroAQI) {
  //     return null;
  //   }

  //   const selectedYear = getSelectedYear(); // Define selectedYear
  //   const sortedData = sortDataByDate(); // Ensure data is sorted by date

  //   const filteredData = sortedData.filter((item) =>
  //     item.date.startsWith(`${selectedYear}-${selectedMonth}`)
  //   );

  //   const weeklyAveragesData = Array.from({ length: 4 }, () => []);

  //   filteredData.forEach((item) => {
  //     const date = new Date(item.date);
  //     const week = Math.ceil(date.getDate() / 7);
  //     const aqi = item.aqi;
  //     if (week <= 4) {
  //       weeklyAveragesData[week - 1].push(aqi);
  //     }
  //   });

  //   for (let i = 0; i < weeklyAveragesData.length; i++) {
  //     if (weeklyAveragesData[i].length > 0) {
  //       const sum = weeklyAveragesData[i].reduce((acc, aqi) => acc + aqi, 0);
  //       const average = sum / weeklyAveragesData[i].length;
  //       weeklyAveragesData[i] = parseFloat(average.toFixed(2));
  //     } else {
  //       weeklyAveragesData[i] = null;
  //     }
  //   }
  //   return { weeklyAveragesData };
  // };

  const sortDataByDate = () => {
    if (!enviroDate || !enviroAQI) {
      return [];
    }

    const combinedData = enviroDate.map((date, index) => ({
      date,
      time: envirotime[index],
      aqi: enviroAQI[index],
      pm25: enviroPM25[index],
      pm10: enviroPM10[index],
      so2: enviroSO2[index],
      no2: enviroNO2[index],
      co2: enviroco2[index],
    }));

    return combinedData.sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  useEffect(() => {
    fetchYearlyData();
    setDailyAverageAPI(calculateDailyAveragesAPI());
    setDailyDataAPI(getDailyDataAPI());
    // setWeeklyAverages(calculateWeeklyAverages());
    setDailyAverage(calculateDailyAverages());
    setDailyData(getDailyData());
    setFifteenDaysData(getFifteenDaysData());
  }, [
    selectedMonth,
    selectedDate,
    enviroDate,
    enviroAQI,
    enviroPM25,
    enviroPM10,
    enviroSO2,
    enviroNO2,
    enviroco2,
    aqiAPI,
  ]);

  const fetchYearlyData = () => {
    const yearlyData = {};
    if (enviroDate.length > 0) {
      enviroDate.forEach((date, index) => {
        const year = date.split("-")[0];
        const month = date.split("-")[1];

        if (!yearlyData[year]) {
          yearlyData[year] = {};
        }

        if (!yearlyData[year][month]) {
          yearlyData[year][month] = [];
        }

        yearlyData[year][month].push(enviroAQI[index]);
      });
    }

    const newChartData = Object.keys(yearlyData).map((year) => ({
      year,
      months: Object.keys(yearlyData[year]).map((month) => {
        const monthKey = month;
        const monthlyData = yearlyData[year][monthKey];
        const average =
          monthlyData.reduce((acc, aqi) => acc + aqi, 0) / monthlyData.length;
        return {
          month: `${month < 10 ? "0" : ""}${month}`,
          average: parseFloat(average.toFixed(2)),
        };
      }),
    }));

    setChartData(newChartData);
  };

  return (
    chartData.length > 0 && (
      <DailyTrend
        selectedDate={selectedDate}
        dailyAverage={dailyAverage}
        dailyAverageAPI={dailyAverageAPI}
        dailyDataAPI={dailyDataAPI}
        dailyData={dailyData}
        setSelectedDate={setSelectedDate}
        fifteenDaysData={fifteenDaysData}
        startDate={startDate}
      />
    )
  );
};

export default AQIChartNEW;
