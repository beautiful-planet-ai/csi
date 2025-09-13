import React, { useState, useEffect } from "react";
import TemperatureTrend from "./TemperatureTrend";
import TemperatureHumidityTrend from "./TemperatureHumidityTrend";
import { Card } from "primereact/card";

const Temperature = ({
  enviroDate,
  envirotime,
  temperature,
  humidity,
  enviroco2,
  startDate,
}) => {
  const [selectedMonth, setSelectedMonth] = useState("01");
  const [selectedDate, setSelectedDate] = useState("2024-01-01");
  const [chartData, setChartData] = useState([]);
  const [weeklyAverages, setWeeklyAverages] = useState(null);
  const [dailyAverage, setDailyAverage] = useState(null);
  const [dailyData, setDailyData] = useState(null);
  const [dailyAverageco2, setDailyAverageco2] = useState(null);
  const [dailyDataco2, setDailyDataco2] = useState(null);
  const [dailyAveragehumidity, setDailyAveragehumidity] = useState(null);
  const [dailyDatahumidity, setDailyDatahumidity] = useState(null);
  const [fifteenDaysData, setFifteenDaysData] = useState(null);
  const [dailyFeelsLike, setDailyFeelsLike] = useState(null);
  const [dailyFeelsLikeData, setDailyFeelsLikeData] = useState(null);

  // Helper to convert Celsius to Fahrenheit
  const celsiusToFahrenheit = (celsius) => (celsius * 9) / 5 + 32;

  // Helper to convert Fahrenheit to Celsius
  const fahrenheitToCelsius = (fahrenheit) => ((fahrenheit - 32) * 5) / 9;

  // Function to calculate Feels Like temperature using Heat Index Formula
  const calculateFeelsLikeTemp = (tempF, rh) => {
    // Constants from the Heat Index formula
    const C1 = -42.379;
    const C2 = 2.04901523;
    const C3 = 10.14333127;
    const C4 = -0.22475541;
    const C5 = -6.83783 * Math.pow(10, -3);
    const C6 = -5.481717 * Math.pow(10, -2);
    const C7 = 1.22874 * Math.pow(10, -3);
    const C8 = 8.5282 * Math.pow(10, -4);
    const C9 = -1.99 * Math.pow(10, -6);

    // Calculate heat index without correction factor
    let HI =
      C1 +
      C2 * tempF +
      C3 * rh +
      C4 * tempF * rh +
      C5 * tempF ** 2 +
      C6 * rh ** 2 +
      C7 * tempF ** 2 * rh +
      C8 * tempF * rh ** 2 +
      C9 * tempF ** 2 * rh ** 2;

    // Apply correction factor if necessary
    let CF = 0;
    if (tempF >= 80 && tempF <= 112 && rh <= 13) {
      CF = -((13 - rh) / 4) * Math.sqrt((17 - Math.abs(tempF - 95)) / 17);
    } else if (tempF >= 80 && tempF <= 87 && rh > 85) {
      CF = 0.02 * (rh - 85) * (87 - tempF);
    }

    HI += CF;

    // Convert back to Celsius
    return fahrenheitToCelsius(HI);
  };

  // Calculate daily feels like temperature averages
  const calculateDailyFeelsLikeAverages = () => {
    if (!enviroDate || !temperature || !humidity) {
      return null;
    }

    const dailyFeelsLikeData = {};

    enviroDate.forEach((date, index) => {
      const tempC = temperature[index];
      const rh = humidity[index];
      const tempF = celsiusToFahrenheit(tempC);
      const feelsLikeC = calculateFeelsLikeTemp(tempF, rh);

      if (!dailyFeelsLikeData[date]) {
        dailyFeelsLikeData[date] = [];
      }
      dailyFeelsLikeData[date].push(feelsLikeC);
    });

    const dailyAverages = {};
    for (const date in dailyFeelsLikeData) {
      const dailyTemps = dailyFeelsLikeData[date];
      const sum = dailyTemps.reduce((acc, temp) => acc + temp, 0);
      const average = sum / dailyTemps.length;
      dailyAverages[date] = parseFloat(average.toFixed(2));
    }
    return dailyAverages;
  };

  // Get daily feels like data for selected date
  const getDailyFeelsLikeData = () => {
    if (!enviroDate || !temperature || !humidity || !envirotime) {
      return [];
    }

    const selectedDateData = enviroDate.reduce((acc, date, index) => {
      const time = envirotime[index];
      const tempC = temperature[index];
      const rh = humidity[index];
      const tempF = celsiusToFahrenheit(tempC);
      const feelsLikeC = calculateFeelsLikeTemp(tempF, rh);

      if (date === selectedDate) {
        acc.push({ time, feelsLikeC });
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
  console.log(getDailyFeelsLikeData());

  const getSelectedYear = () => {
    return selectedDate.split("-")[0]; // Extract year from selectedDate
  };

  const calculateDailyAverages = () => {
    if (!enviroDate || !temperature) {
      return null;
    }

    const dailyAveragesData = {};

    enviroDate.forEach((date, index) => {
      const temp = temperature[index];
      if (!dailyAveragesData[date]) {
        dailyAveragesData[date] = [];
      }
      dailyAveragesData[date].push(temp);
    });

    const dailyAverages = {};
    for (const date in dailyAveragesData) {
      const dailytemp = dailyAveragesData[date];
      const sum = dailytemp.reduce((acc, temp) => acc + temp, 0);
      const average = sum / dailytemp.length;
      dailyAverages[date] = parseFloat(average.toFixed(2));
    }
    console.log(dailyAverage);
    return dailyAverages;
  };
  const calculateDailyAveragesco2 = () => {
    if (!enviroDate || !enviroco2) {
      return null;
    }

    const dailyAveragesData = {};

    enviroDate.forEach((date, index) => {
      const co2 = enviroco2[index];
      if (!dailyAveragesData[date]) {
        dailyAveragesData[date] = [];
      }
      dailyAveragesData[date].push(co2);
    });

    const dailyAverages = {};
    for (const date in dailyAveragesData) {
      const dailytemp = dailyAveragesData[date];
      const sum = dailytemp.reduce((acc, temp) => acc + temp, 0);
      const average = sum / dailytemp.length;
      dailyAverages[date] = parseFloat(average.toFixed(2));
    }
    return dailyAverages;
  };
  const calculateDailyAverageshumidity = () => {
    if (!enviroDate || !humidity) {
      return null;
    }

    const dailyAveragesData = {};

    enviroDate.forEach((date, index) => {
      const humid = humidity[index];
      if (!dailyAveragesData[date]) {
        dailyAveragesData[date] = [];
      }
      dailyAveragesData[date].push(humid);
    });

    const dailyAverages = {};
    for (const date in dailyAveragesData) {
      const dailytemp = dailyAveragesData[date];
      const sum = dailytemp.reduce((acc, temp) => acc + temp, 0);
      const average = sum / dailytemp.length;
      dailyAverages[date] = parseFloat(average.toFixed(2));
    }
    return dailyAverages;
  };

  const getDailyData = () => {
    if (!enviroDate || !temperature || !envirotime) {
      return [];
    }

    const selectedDateData = enviroDate.reduce((acc, date, index) => {
      const time = envirotime[index];
      const temp = temperature[index];
      if (date === selectedDate) {
        acc.push({ time, temp });
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
  const getDailyDataco2 = () => {
    if (!enviroDate || !enviroco2 || !envirotime) {
      return [];
    }

    const selectedDateData = enviroDate.reduce((acc, date, index) => {
      const time = envirotime[index];
      const co2 = enviroco2[index];
      if (date === selectedDate) {
        acc.push({ time, co2 });
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
  const getDailyDatahumidity = () => {
    if (!enviroDate || !humidity || !envirotime) {
      return [];
    }

    const selectedDateData = enviroDate.reduce((acc, date, index) => {
      const time = envirotime[index];
      const humid = humidity[index];
      if (date === selectedDate) {
        acc.push({ time, humid });
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
    if (!enviroDate || !temperature || !envirotime) {
      return [];
    }

    const selectedDateParts = selectedDate.split("-").map(Number);
    const selectedDateObj = new Date(
      selectedDateParts[0],
      selectedDateParts[1] - 1,
      selectedDateParts[2]
    );

    // Calculate date 15 days ago
    const fifteenDaysAgo = new Date(selectedDateObj);

    fifteenDaysAgo.setDate(selectedDateObj.getDate() - 15);
    console.log(selectedDateObj.getDate() - 15);

    // Filter data for the last 15 days
    const filteredData = enviroDate.reduce((acc, date, index) => {
      const dateObj = new Date(date);
      if (dateObj >= fifteenDaysAgo && dateObj <= selectedDateObj) {
        acc.push({
          date,
          time: envirotime[index],
          temp: temperature[index],
          humidity: humidity[index],
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

  const calculateWeeklyAverages = () => {
    if (!enviroDate || !temperature) {
      return null;
    }

    const selectedYear = getSelectedYear(); // Define selectedYear
    const sortedData = sortDataByDate(); // Ensure data is sorted by date

    const filteredData = sortedData.filter((item) =>
      item.date.startsWith(`${selectedYear}-${selectedMonth}`)
    );

    const weeklyAveragesData = Array.from({ length: 4 }, () => []);

    filteredData.forEach((item) => {
      const date = new Date(item.date);
      const week = Math.ceil(date.getDate() / 7);
      const temp = item.temp;
      if (week <= 4) {
        weeklyAveragesData[week - 1].push(temp);
      }
    });

    for (let i = 0; i < weeklyAveragesData.length; i++) {
      if (weeklyAveragesData[i].length > 0) {
        const sum = weeklyAveragesData[i].reduce((acc, temp) => acc + temp, 0);
        const average = sum / weeklyAveragesData[i].length;
        weeklyAveragesData[i] = parseFloat(average.toFixed(2));
      } else {
        weeklyAveragesData[i] = null;
      }
    }
    return { weeklyAveragesData };
  };

  const sortDataByDate = () => {
    if (!enviroDate || !temperature) {
      return [];
    }

    const combinedData = enviroDate.map((date, index) => ({
      date,
      time: envirotime[index],
      temp: temperature[index],
      humidity: humidity[index],
      co2: enviroco2[index],
    }));

    return combinedData.sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  useEffect(() => {
    fetchYearlyData();
    setWeeklyAverages(calculateWeeklyAverages());
    setDailyAverage(calculateDailyAverages());
    setDailyAveragehumidity(calculateDailyAverageshumidity());
    setDailyData(getDailyData());
    setDailyAverageco2(calculateDailyAveragesco2());
    setDailyDataco2(getDailyDataco2());
    setDailyDatahumidity(getDailyDatahumidity());
    setFifteenDaysData(getFifteenDaysData());
    setDailyFeelsLike(calculateDailyFeelsLikeAverages());
    setDailyFeelsLikeData(getDailyFeelsLikeData());
  }, [
    selectedMonth,
    selectedDate,
    enviroDate,
    temperature,
    humidity,
    enviroco2,
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

        yearlyData[year][month].push(temperature[index]);
      });
    }

    const newChartData = Object.keys(yearlyData).map((year) => ({
      year,
      months: Object.keys(yearlyData[year]).map((month) => {
        const monthKey = month;
        const monthlyData = yearlyData[year][monthKey];
        const average =
          monthlyData.reduce((acc, temp) => acc + temp, 0) / monthlyData.length;
        return {
          month: `${month < 10 ? "0" : ""}${month}`,
          average: parseFloat(average.toFixed(2)),
        };
      }),
    }));

    setChartData(newChartData);
  };

  return (
    <div className="flex flex-column align-items-center justify-content-center w-full gap-2">
      {chartData.length > 0 && (
        <>
          <div className="flex w-full bg-white border-round p-4">
            <TemperatureTrend
              selectedDate={selectedDate}
              dailyAverageTemp={dailyAverage}
              dailyAverageCo2={dailyAverageco2}
              dailyDataTemp={dailyData}
              dailyDataCo2={dailyDataco2}
              setSelectedDate={setSelectedDate}
              fifteenDaysData={fifteenDaysData}
              startDate={startDate}
            />
          </div>
          <div className="flex w-full bg-white border-round p-4">
            <TemperatureHumidityTrend
              selectedDate={selectedDate}
              dailyAverageTemp={dailyAverage}
              dailyAveragehumidity={dailyAveragehumidity}
              dailyDataTemp={dailyData}
              dailyDatahumidity={dailyDatahumidity}
              setSelectedDate={setSelectedDate}
              fifteenDaysData={fifteenDaysData}
              startDate={startDate}
              dailyAverageFeelsLike={dailyFeelsLike}
              dailyDataFeelsLike={dailyFeelsLikeData}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Temperature;
