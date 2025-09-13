import axios from "axios";
import { ProgressSpinner } from "primereact/progressspinner";
import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import AQIRecommendations from "./AQIRecommendations";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";
import ReportPrint from "components/DashboardUtility/ReportPrint";
import unhealthy from "assets/dashboard/unhealthy-aqi-level.svg";
import severe from "assets/dashboard/severe-aqi-level.svg";
import good from "assets/dashboard/good-aqi-level.svg";
import moderate from "assets/dashboard/moderate-aqi-level.svg";
import poor from "assets/dashboard/poor-aqi-level.svg";
import hazardous from "assets/dashboard/hazardous-aqi-level.svg";
import colors, {
  scoreRangeColor,
} from "components/DashboardUtility/Constants/colorConstants";
import { Tag } from "primereact/tag";
import AQIChart from "./AQIChart";
import { Radio } from "lucide-react";
import GaugeChart from "react-gauge-chart";
import LiveAqiScore from "./LiveAqiScore";
import ColorScaleBar from "components/DashboardUtility/Charts/ColorScaleBar";
import AqiMap from "./AqiMap";
import TimeBasedAQITrend from "./TimeBasedAQITrend";

const LiveAQI = ({ show }) => {
  const [timeArrayData, setTimeArrayData] = useState([]);
  const [dateArrayData, setDateArrayData] = useState([]);
  const [dayArrayData, setDayArrayData] = useState([]);
  const [weekArrayData, setWeekArrayData] = useState([]);
  const [pm25ArrayData, setPM25ArrayData] = useState([]);
  const [pm10ArrayData, setPM10ArrayData] = useState([]);
  const [SO2ArrayData, setSO2ArrayData] = useState([]);
  const [NO2ArrayData, setNO2ArrayData] = useState([]);
  const [AQIArrayData, setAQIArrayData] = useState([]);
  const [dataTableData, setDataTableData] = useState([]);
  const [aqiIDs, setAQIIDs] = useState();
  const [aqiStatus, setAqiStatus] = useState();
  const [aqiValue, setAqiValue] = useState(null);
  const [yesterdayAQI, setYesterdayAQI] = useState();
  const [currentPM25, setCurrentPM25] = useState();
  const [currentPM10, setCurrentPM10] = useState();
  const [currentNO2, setCurrentNO2] = useState();
  const [currentSO2, setCurrentSO2] = useState();

  const [maxAqiValue, setMaxAqiValue] = useState();
  const [maxAqiTime, setMaxAqiTime] = useState();
  const [minAqiValue, setMinAqiValue] = useState();
  const [minAqiTime, setMinAqiTime] = useState();
  const [maxAqiLocation, setMaxAqiLocation] = useState();
  const [minAqiLocation, setMinAqiLocation] = useState();
  const [ReportVisible, setReportVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedLocationId, setSelectedLocationId] = useState("");
  const [locations, setLocations] = useState([]);
  const [locationWiseAQI, setLocationWiseAQI] = useState([]);

  const currentDate = new Date();
  const sevenDaysAgo = new Date(new Date().setDate(new Date().getDate() - 7));

  const [selectedValues, setSelectedValues] = useState({
    location: "All Locations",
    liveStartDate: sevenDaysAgo,
    liveEndDate: new Date(currentDate),
  });

  const [score, setScore] = useState(null);
  const [aqiStats, setAqiStats] = useState("");

  const [startMonthYearScore, setStartMonthYearScore] = useState("");
  const [endMonthYearScore, setEndMonthYearScore] = useState("");
  let currentHour = currentDate.getHours();
  currentHour = (currentHour - 1 + 24) % 24;
  const adjustedDate = new Date(currentDate);
  adjustedDate.setHours(currentHour, 0, 0, 0);
  const [dateLive, timeLive] = convertDateString(adjustedDate);
  const yesterday = new Date(currentDate);
  yesterday.setDate(yesterday.getDate() - 1);
  const [yesterdayDate, yesterdayTime] = convertDateString(yesterday);
  const minDate = new Date("2023-12-22"); // December 22, 2023
  const pollutantData = [
    { name: "PM2.5", value: currentPM25, unit: "µg/m³" },
    { name: "PM10", value: currentPM10, unit: "µg/m³" },
    // { name: "NO2", value: currentNO2, unit: "ppb" },
    // { name: "SO2", value: currentSO2, unit: "ppb" },
  ];

  const renderRecommendations = () => {
    return (
      <AQIRecommendations
      //   aqi={aqiValue} pm25={pm25Value} pm10={pm10Value}
      />
    );
  };

  const renderDashboard = () => {
    return <LiveAQI show={false} />;
  };

  function convertDateString(date) {
    const formattedDate = new Date(date).toLocaleDateString("en-CA");
    const formattedTime = new Date(date).toLocaleTimeString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });

    return [formattedDate, formattedTime];
  }

  const getAQI = async (locationID, from_time, upto_time) => {
    try {
      const response = await axios.post(
        "https://app.aurassure.com/-/api/iot-platform/v1.1.0/clients/10565/applications/16/things/data",
        {
          data_type: "aggregate",
          aggregation_period: 3600,
          parameters: ["pm10", "pm2.5", "no2", "so2", "aqi"],
          parameter_attributes: ["value", "avg", "max", "min"],
          things: [locationID],
          from_time: from_time,
          upto_time: upto_time,
        },
        {
          headers: {
            "Access-Id": "WYDAeaT0kA7kKVyg",
            "Access-Key":
              "H0RkamVKJ2jiGda9tx2i20kykwCGkRhn2P3bXwDgxP8dAKxLp1CM65DYKg0oYCV2",
          },
        }
      );
      const api_response = response.data.data;
      console.log("🚀 ~ getAQI ~ api_response:", api_response);
      const dateArray = [];
      const timeArray = [];
      const dayArray = [];
      const weekArray = [];
      const so2Array = [];
      const no2Array = [];
      const pm25Array = [];
      const pm10Array = [];
      const aqiArrayAPI = [];
      let maxAqi = -Infinity;
      let minAqi = Infinity;
      let maxAqiTime = "";
      let minAqiTime = "";
      let aqiValueSet = false; // Flag to ensure we only set AQI once

      const calculateAqiStats = (api_response) => {
        if (api_response.length === 0) return {};

        const aqiValues = api_response.map(
          (item) => item.parameter_values.aqi.value
        );
        const pm25Values = api_response.map(
          (item) => item.parameter_values["pm2.5"].avg
        );
        const pm10Values = api_response.map(
          (item) => item.parameter_values.pm10.avg
        );
        const dateTimeValues = api_response.map(
          (item) => new Date(item.time * 1000)
        );

        const maxAqi = Math.max(...aqiValues);
        const minAqi = Math.min(...aqiValues);

        const maxAqiIndex = aqiValues.indexOf(maxAqi);
        const minAqiIndex = aqiValues.indexOf(minAqi);

        return {
          max: {
            value: maxAqi,
            dateTime: dateTimeValues[maxAqiIndex].toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata",
            }),
            pm25: pm25Values[maxAqiIndex],
            pm10: pm10Values[maxAqiIndex],
          },
          min: {
            value: minAqi,
            dateTime: dateTimeValues[minAqiIndex].toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata",
            }),
            pm25: pm25Values[minAqiIndex],
            pm10: pm10Values[minAqiIndex],
          },
        };
      };
      setAqiStats(calculateAqiStats(api_response));

      let liveDataFound = false; // Flag to track if live data is found
      if (api_response) {
        api_response.forEach((item) => {
          const newDate = new Date(item.time * 1000);
          const day = newDate.getDay();
          const week = getWeek(newDate);
          const [date, time] = convertDateString(newDate);

          if (
            item.thing_id === getThingID(selectedValues.location) &&
            date === dateLive &&
            time === timeLive
          ) {
            // Live data found
            liveDataFound = true;
            setSelectedLocationId(item.thing_id);
            setAqiValue(item.parameter_values.aqi.value);

            setAqiStatus(getAqiStatus(item.parameter_values.aqi.value));
            setCurrentPM10(item.parameter_values.pm10.avg);
            setCurrentPM25(item.parameter_values["pm2.5"].avg);
            setCurrentNO2(item.parameter_values.no2.avg);
            setCurrentSO2(item.parameter_values.so2.avg);
          }

          if (
            item.thing_id === getThingID(selectedValues.location) &&
            date === dateLive
          ) {
            const aqi = item.parameter_values.aqi.value;
            if (aqi >= maxAqi) {
              maxAqi = aqi;
              maxAqiTime = time;
            }
            if (aqi <= minAqi) {
              minAqi = aqi;
              minAqiTime = time;
            }
            setMaxAqiValue(maxAqi);
            setMaxAqiTime(maxAqiTime);
            setMinAqiValue(minAqi);
            setMinAqiTime(minAqiTime);
          }
          if (
            item.thing_id === getThingID(selectedValues.location) &&
            date === yesterdayDate &&
            time === timeLive
          ) {
            setYesterdayAQI(item.parameter_values.aqi.value);
          }

          aqiArrayAPI.push(item.parameter_values.aqi.value);
          dateArray.push(date);
          timeArray.push(time);
          weekArray.push(week);
          dayArray.push(day);
          so2Array.push(item.parameter_values.so2.avg);
          no2Array.push(item.parameter_values.no2.avg);
          pm25Array.push(item.parameter_values["pm2.5"].avg);
          pm10Array.push(item.parameter_values.pm10.avg);
        });

        // After the loop, check if live data was found
        if (!liveDataFound) {
          setSelectedLocationId(null);
          setAqiValue("N/A");
          setAqiStatus("N/A");
          setCurrentPM10("N/A");
          setCurrentPM25("N/A");
          setCurrentNO2("N/A");
          setCurrentSO2("N/A");
        }

        setAQIArrayData(aqiArrayAPI);
        setDateArrayData(dateArray);
        setTimeArrayData(timeArray);
        setDayArrayData(dayArray);
        setWeekArrayData(weekArray);
        setSO2ArrayData(so2Array);
        setNO2ArrayData(no2Array);
        setPM10ArrayData(pm10Array);
        setPM25ArrayData(pm25Array);

        const filteredDataWithDeviation = api_response
          .filter((item) => item.parameter_values.aqi.value > 400)
          .map((item) => {
            const newDate = new Date(item.time * 1000);
            const [date, time] = convertDateString(newDate);
            return {
              date: date,
              time: time,
              aqi: item.parameter_values.aqi.value,
              deviationPercentage:
                (((item.parameter_values.aqi.value - 400) / 400) * 100).toFixed(
                  2
                ) + "%",
            };
          });

        const uniqueDataTableData = Array.from(
          new Set(filteredDataWithDeviation.map(JSON.stringify))
        ).map(JSON.parse);
        setDataTableData(uniqueDataTableData);
      }
      return 0;
    } catch (error) {
      console.error("Error fetching AQI data:", error);
      return 0;
    }
  };
  const getAllLocationAQIAverage = async (
    locationIDs,
    from_time,
    upto_time
  ) => {
    try {
      const response = await axios.post(
        "https://app.aurassure.com/-/api/iot-platform/v1.1.0/clients/10565/applications/16/things/data",
        {
          data_type: "aggregate",
          aggregation_period: 3600,
          parameters: ["pm10", "pm2.5", "no2", "so2", "aqi"],
          parameter_attributes: ["value", "avg", "max", "min"],
          things: locationIDs,
          from_time: from_time,
          upto_time: upto_time,
        },
        {
          headers: {
            "Access-Id": "WYDAeaT0kA7kKVyg",
            "Access-Key":
              "H0RkamVKJ2jiGda9tx2i20kykwCGkRhn2P3bXwDgxP8dAKxLp1CM65DYKg0oYCV2",
          },
        }
      );
      const api_response = response.data.data;

      // Initialize an object to store AQI values for each location
      const locationWiseAQIValues = {};

      // Variables to store sums and counts for live data
      let liveAqiSum = 0;
      let livePm10Sum = 0;
      let livePm25Sum = 0;
      let liveReadingsCount = 0;
      let yesterdayAQISum = 0;
      let yesterdayReadingsCount = 0;

      // Array to store the processed data
      const processedData = [];
      let maxAqi = -Infinity;
      let minAqi = Infinity;
      let maxAqiTime = "";
      let maxAqiLocation = "";
      let minAqiLocation = "";
      let minAqiTime = "";

      if (api_response) {
        api_response.forEach((item) => {
          const newDate = new Date(item.time * 1000);
          const [date, time] = convertDateString(newDate);
          const locationId = item.thing_id; // Get the location ID
          // Condition to check if it's live data
          if (date === dateLive && time === timeLive) {
            // Check if the AQI value exists; if not, assign "N/A"
            const aqiValue =
              item.parameter_values.aqi.value !== null &&
              item.parameter_values.aqi.value !== undefined
                ? item.parameter_values.aqi.value
                : "N/A";

            locationWiseAQIValues[locationId] = aqiValue; // Store the AQI value or "N/A"
            liveAqiSum += item.parameter_values.aqi.value;
            livePm10Sum += item.parameter_values.pm10.avg;
            livePm25Sum += item.parameter_values["pm2.5"].avg;
            liveReadingsCount++;
          }

          setLocationWiseAQI(locationWiseAQIValues);

          if (date === dateLive) {
            const aqi = item.parameter_values.aqi.value;
            if (aqi >= maxAqi) {
              maxAqi = aqi;
              maxAqiTime = time;
              maxAqiLocation = getLocationName(item.thing_id);
            }
            if (aqi <= minAqi) {
              minAqi = aqi;
              minAqiTime = time;
              minAqiLocation = getLocationName(item.thing_id);
            }
            setMaxAqiLocation(maxAqiLocation);
            setMinAqiLocation(minAqiLocation);
            setMaxAqiValue(maxAqi);
            setMaxAqiTime(maxAqiTime);
            setMinAqiValue(minAqi);
            setMinAqiTime(minAqiTime);
          }

          if (date === yesterdayDate && time === timeLive) {
            yesterdayAQISum += item.parameter_values.aqi.value;
            yesterdayReadingsCount++;
          }
          const aqi = item.parameter_values.aqi.value;
          const pm10 = item.parameter_values.pm10.avg;
          const pm25 = item.parameter_values["pm2.5"].avg;
          const no2 = item.parameter_values.no2.avg;
          const so2 = item.parameter_values.so2.avg;

          if (
            aqi !== null &&
            aqi !== undefined &&
            pm10 !== null &&
            pm10 !== undefined &&
            pm25 !== null &&
            pm25 !== undefined &&
            no2 !== null &&
            no2 !== undefined &&
            so2 !== null &&
            so2 !== undefined
          ) {
            // Create a data object
            const dataObject = {
              date: date,
              time: time,
              aqiSum: aqi,
              pm10Sum: pm10,
              pm25Sum: pm25,
              no2Sum: no2,
              so2Sum: so2,
              count: 1, // Initialize count to 1 for each reading
            };

            processedData.push(dataObject);
          }
        });
        // Calculate averages for live data
        const averageLiveAqi =
          liveReadingsCount > 0 ? liveAqiSum / liveReadingsCount : 0;
        const averageLivePm10 =
          liveReadingsCount > 0 ? livePm10Sum / liveReadingsCount : 0;
        const averageLivePm25 =
          liveReadingsCount > 0 ? livePm25Sum / liveReadingsCount : 0;
        const averageYesterdayAqi =
          yesterdayReadingsCount > 0
            ? yesterdayAQISum / yesterdayReadingsCount
            : 0;

        setAqiValue(Math.round(averageLiveAqi));
        setAqiStatus(getAqiStatus(Math.round(averageLiveAqi)));
        setCurrentPM10(averageLivePm10);
        setCurrentPM25(averageLivePm25);
        setCurrentNO2(api_response[0].parameter_values.no2.avg);
        setCurrentSO2(api_response[0].parameter_values.so2.avg);
        setYesterdayAQI(Math.round(averageYesterdayAqi));

        // Aggregate data by date and time
        const aggregatedData = {};

        processedData.forEach((item) => {
          const dateTimeKey = `${item.date}-${item.time}`;
          if (!aggregatedData[dateTimeKey]) {
            aggregatedData[dateTimeKey] = { ...item }; // Copy the initial data
          } else {
            aggregatedData[dateTimeKey].aqiSum += item.aqiSum;
            aggregatedData[dateTimeKey].pm10Sum += item.pm10Sum;
            aggregatedData[dateTimeKey].pm25Sum += item.pm25Sum;
            aggregatedData[dateTimeKey].no2Sum += item.no2Sum;
            aggregatedData[dateTimeKey].so2Sum += item.so2Sum;
            aggregatedData[dateTimeKey].count += item.count;
          }
        });

        const finalData = Object.values(aggregatedData).map((item) => ({
          date: item.date,
          time: item.time,
          aqiAvg: item.aqiSum / item.count,
          pm10Avg: item.pm10Sum / item.count,
          pm25Avg: item.pm25Sum / item.count,
          no2Avg: item.no2Sum / item.count,
          so2Avg: item.so2Sum / item.count,
          count: item.count,
        }));

        const dateArray = [];
        const timeArray = [];
        const aqiArray = [];
        const pm25Array = [];
        const pm10Array = [];
        const so2Array = [];
        const no2Array = [];

        finalData.forEach((item) => {
          dateArray.push(item.date);
          timeArray.push(item.time);
          aqiArray.push(Math.round(item.aqiAvg));
          pm25Array.push(Math.round(item.pm25Avg));
          pm10Array.push(Math.round(item.pm10Avg));
          so2Array.push(Math.round(item.so2Avg));
          no2Array.push(Math.round(item.no2Avg));
        });

        setDateArrayData(dateArray);
        setTimeArrayData(timeArray);
        setAQIArrayData(aqiArray);
        setPM25ArrayData(pm25Array);
        setPM10ArrayData(pm10Array);
        setSO2ArrayData(so2Array);
        setNO2ArrayData(no2Array);
      }

      const calculateAqiStats = (api_response) => {
        if (api_response.length === 0) return {};

        const aqiValues = api_response.map(
          (item) => item.parameter_values.aqi.value
        );
        const pm25Values = api_response.map(
          (item) => item.parameter_values["pm2.5"].avg
        );
        const pm10Values = api_response.map(
          (item) => item.parameter_values.pm10.avg
        );
        const dateTimeValues = api_response.map(
          (item) => new Date(item.time * 1000)
        );
        const locationValues = api_response.map((item) =>
          getLocationName(item.thing_id)
        );

        const maxAqi = Math.max(...aqiValues);
        const minAqi = Math.min(...aqiValues);

        const maxAqiIndex = aqiValues.indexOf(maxAqi);
        const minAqiIndex = aqiValues.indexOf(minAqi);

        return {
          max: {
            value: maxAqi,
            dateTime: dateTimeValues[maxAqiIndex].toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata",
            }),
            pm25: pm25Values[maxAqiIndex],
            pm10: pm10Values[maxAqiIndex],
            location: locationValues[maxAqiIndex], // Added location for max AQI
          },
          min: {
            value: minAqi,
            dateTime: dateTimeValues[minAqiIndex].toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata",
            }),
            pm25: pm25Values[minAqiIndex],
            pm10: pm10Values[minAqiIndex],
            location: locationValues[minAqiIndex], // Added location for min AQI
          },
        };
      };

      setAqiStats(calculateAqiStats(api_response));

      const filteredDataWithDeviation = api_response
        .filter((item) => item.parameter_values.aqi.value > 400)
        .map((item) => {
          const newDate = new Date(item.time * 1000);
          const [date, time] = convertDateString(newDate);
          return {
            date: date,
            time: time,
            location: getLocationName(item.thing_id),
            aqi: item.parameter_values.aqi.value,
            deviationPercentage:
              (((item.parameter_values.aqi.value - 400) / 400) * 100).toFixed(
                2
              ) + "%",
          };
        });

      const uniqueDataTableData = Array.from(
        new Set(filteredDataWithDeviation.map(JSON.stringify))
      ).map(JSON.parse);
      setDataTableData(uniqueDataTableData);
      return 0;
    } catch (error) {
      console.error("Error fetching AQI data:", error);
      return 0;
    }
  };

  const getThingID = (selectedLocation) => {
    if (selectedLocation === "Ayodhya - Civil line,Tiny tots school") {
      return 12218;
    }
    if (selectedLocation === "Ayodhya - Shahadat Ganj") {
      return 12220;
    }
    if (selectedLocation === "Ayodhya-Bank colony near Railway station") {
      return 12414;
    }
    if (selectedLocation === "Ayodhya-near Airport") {
      return 12415;
    }
    if (selectedLocation === "Ayodhya-Ranopali near Sugriv Kila ayodhya") {
      return 12416;
    }
  };

  useEffect(() => {
    const fetchAQIData = async () => {
      setLoading(true);
      if (selectedValues.location === "All Locations") {
        const locationIDs = locations
          .map((loc) => getThingID(loc.value))
          .filter(Boolean);

        const start = new Date(selectedValues.liveStartDate);
        const end = new Date(selectedValues.liveEndDate);
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 59);
        const fromTime = Math.floor(start.getTime() / 1000);
        const uptoTime = Math.floor(end.getTime() / 1000);
        await getAllLocationAQIAverage(locationIDs, fromTime, uptoTime);
      } else {
        // Fetch data for the selected location
        const promises = aqiIDs.map((aqiID) => {
          return aqiID.thingID === getThingID(selectedValues.location)
            ? getAQI(aqiID.thingID, aqiID.from_time, aqiID.upto_time)
            : null;
        });
        // Wait for all promises to resolve
        await Promise.all(promises.filter((promise) => !promise));
      }
      setLoading(false);
    };

    fetchAQIData();
  }, [
    aqiIDs,
    locations,
    selectedValues.liveEndDate,
    selectedValues.liveStartDate,
    selectedValues.location,
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://app.aurassure.com/-/api/iot-platform/v1.1.0/clients/10565/applications/16/things/list",
          {
            headers: {
              "Access-Id": "WYDAeaT0kA7kKVyg",
              "Access-Key":
                "H0RkamVKJ2jiGda9tx2i20kykwCGkRhn2P3bXwDgxP8dAKxLp1CM65DYKg0oYCV2",
            },
          }
        );

        if (response.status === 200) {
          // Convert startDate and endDate to Unix timestamps
          const start = new Date(selectedValues.liveStartDate);
          const end = new Date(selectedValues.liveEndDate);
          start.setHours(0, 0, 0, 0);
          end.setHours(23, 59, 59, 59);

          const fromTime = Math.floor(start.getTime() / 1000);
          const uptoTime = Math.floor(end.getTime() / 1000);
          let thingsID = [];
          let uniqueLocations = new Set();
          response.data?.things?.forEach((thing) => {
            thingsID.push({
              thingID: thing.id,
              name: thing.name,
              from_time: fromTime,
              upto_time: uptoTime,
            });
            uniqueLocations.add(thing.name); // Add the location name to the Set
          });
          const locationOptions = Array.from(uniqueLocations).map(
            (location) => ({
              label: location,
              value: location,
            })
          );
          // Add "All Locations" option
          locationOptions.unshift({
            label: "All Locations",
            value: "All Locations",
          });
          setLocations(locationOptions);
          setAQIIDs(thingsID);
        }
      } catch (error) {
        console.error("Error fetching Aurrasure Data:", error);
      } finally {
      }
    };

    fetchData();
  }, [
    selectedValues.location,
    selectedValues.liveStartDate,
    selectedValues.liveEndDate,
  ]);

  const getLocationName = (thingID) => {
    if (thingID === 12218) {
      return "Ayodhya - Civil line,Tiny tots school";
    }

    if (thingID === 12220) {
      return "Ayodhya - Shahadat Ganj";
    }

    if (thingID === 12414) {
      return "Ayodhya-Bank colony near Railway station";
    }

    if (thingID === 12415) {
      return "Ayodhya-near Airport";
    }

    if (thingID === 12416) {
      return "Ayodhya-Ranopali near Sugriv Kila ayodhya";
    }

    return undefined; // Or any default value you want to return if the ID is not found
  };

  const getAqiStatus = (aqi) => {
    if (aqi > 0 && aqi <= 50) {
      return {
        status: "GOOD",
        // color: "#086d43",
        textColor: "white",
        image: good,
        color: colors.good,
      };
    } else if (aqi > 50 && aqi <= 100) {
      return {
        status: "SATISFACTORY",
        // color: "#669138",
        textColor: "black",
        image: moderate,
        color: colors.moderate,
      };
    } else if (aqi > 100 && aqi <= 200) {
      return {
        status: "MODERATELY POLLUTED",
        // color: "#b27909",
        textColor: "black",
        image: poor,
        color: colors.yellow,
      };
    } else if (aqi > 200 && aqi <= 300) {
      return {
        status: "POOR",
        // color: "#C7253E",
        textColor: "white",
        image: unhealthy,
        color: colors.warning,
      };
    } else if (aqi > 300 && aqi <= 400) {
      return {
        status: "VERY POOR",
        // color: "#b81b1d",
        textColor: "white",
        image: severe,
        color: colors.poor,
      };
    } else if (aqi > 400) {
      return {
        status: "SEVERE",
        // color: "#600e0f",
        textColor: "white",
        image: hazardous,
        color: colors.veryPoor,
      };
    }
  };

  const getWeek = (date) => {
    const d = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  };

  const rowClassName = (data) => {
    return parseFloat(data.deviationPercentage) > 10 ? "red-row" : "";
  };

  const handleScoreCalculated = (calculatedScore, startDate, endDate) => {
    // Convert startDate and endDate to Date objects if they are not already
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Extract month and year
    const startMonth = start.toLocaleString("default", { month: "long" }); // e.g., "November"
    const startYear = start.getFullYear(); // e.g., 2024

    const endMonth = end.toLocaleString("default", { month: "long" }); // e.g., "January"
    const endYear = end.getFullYear(); // e.g., 2025

    // Set state variables to store month and year
    setStartMonthYearScore(`${startMonth} ${startYear}`);
    setEndMonthYearScore(`${endMonth} ${endYear}`);
    setScore(calculatedScore);
  };

  const labels = ["50", "100", "200", "300", "400", "400+"];

  // Date Range Dropdown Options
  const dateRangeOptions = [
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
    { label: "Half-Yearly", value: "half-yearly" },
    // { label: "Yearly", value: "yearly" },
  ];

  const [selectedDateRange, setSelectedDateRange] = useState("weekly");

  const calculateDateRange = (range) => {
    const endDate = new Date(); // Current date as end date
    let startDate;

    switch (range) {
      case "weekly":
        startDate = new Date(new Date().setDate(new Date().getDate() - 7)); // 7 days ago
        break;
      case "monthly":
        startDate = new Date(new Date().setDate(new Date().getDate() - 30)); // 30 days ago
        break;
      case "half-yearly":
        startDate = new Date(new Date().setDate(new Date().getDate() - 180)); // 180 days ago
        break;
      case "yearly":
        startDate = new Date(new Date().setDate(new Date().getDate() - 365)); // 365 days ago
        break;
      default:
        startDate = new Date(new Date().setDate(new Date().getDate() - 7)); // Default to weekly
        break;
    }

    return { startDate, endDate };
  };

  const onDateRangeChange = (e) => {
    const range = e.value;
    setSelectedDateRange(range);
    const { startDate, endDate } = calculateDateRange(range);
    setSelectedValues((prevValues) => ({
      ...prevValues,
      liveStartDate: startDate,
      liveEndDate: endDate,
    }));
  };
  useEffect(() => {
    const { startDate, endDate } = calculateDateRange(selectedDateRange);
    setSelectedValues((prevValues) => ({
      ...prevValues,
      liveStartDate: startDate,
      liveEndDate: endDate,
    }));
  }, []);

  return loading ? (
    <div className="flex align-items-center justify-content-center flex-column">
      <ProgressSpinner />
      <p className="font-medium text-lg">Please Wait, Fetching Data...</p>
    </div>
  ) : (
    <div className="flex flex-column gap-3 w-full p-2">
      {show && (
        <div className="flex flex-column w-full gap-2">
          <div
            className="flex justify-content-between align-items-start p-4"
            style={{
              backgroundColor: " #003940",
              // background: "linear-gradient(180deg , #166C7D, #003940)",
            }}
          >
            <div className="flex flex-column gap-2">
              <h1 className="text-6xl font-semibold text-white p-0 m-0">
                Air Quality Report
              </h1>
              <p className="text-tertiary p-0 m-0">
                Fresh air, bright future: Elevating sustainability with every
                breath
              </p>
            </div>
            <LiveAqiScore onAQIScoreCalculated={handleScoreCalculated} />
            {score && (
              <div>
                <p className="text-primary1 font-medium p-0 m-0 text-white text-center">
                  Score: <span className="text-xl font-semibold">{score}</span>
                </p>
                <GaugeChart
                  id="gauge-chart"
                  // nrOfLevels={3}
                  percent={score / 100}
                  colors={scoreRangeColor}
                  // formatTextValue={formatTextValue}
                  style={{ width: 150 }}
                  needleColor="#fff"
                  needleBaseColor="#fff"
                  // textColor="#000"
                  hideText={true}
                />
                <p className="p-0 m-0 text-white font-medium p-0 m-0 font-italic text-xs text-right">
                  *{startMonthYearScore} - {endMonthYearScore}{" "}
                </p>
              </div>
            )}
          </div>
          <div className="flex align-items-center justify-content-between gap-3">
            {/* Selected  location & Date */}
            <div className="flex align-items-start flex-column gap-1">
              {/* location */}
              <div className="flex align-items-center gap-1">
                <i className="pi pi-map-marker text-primary1 font-medium text-sm"></i>
                <p className="m-0 p-0 text-primary1 font-medium text-sm">
                  {selectedValues.location || "Select a location"}
                </p>
              </div>
              <Divider className="m-0 p-0" />
              {/* Date Range */}
              <div className="flex align-items-center justify-content-start gap-1">
                <i className="pi pi-calendar text-primary1 font-medium text-sm"></i>
                <p className="m-0 p-0 text-primary1 font-medium text-sm">
                  {selectedValues.liveStartDate
                    ? selectedValues.liveStartDate.toLocaleDateString()
                    : "Start Date"}{" "}
                  -{" "}
                  {selectedValues.liveEndDate
                    ? selectedValues.liveEndDate.toLocaleDateString()
                    : "End Date"}
                </p>
              </div>
            </div>

            <div className="flex align-ites-center justify-content-end gap-2">
              <Dropdown
                value={selectedValues.location}
                options={locations}
                optionLabel="label"
                optionValue="value"
                onChange={(e) =>
                  setSelectedValues({
                    ...selectedValues,
                    location: e.target.value,
                  })
                }
                placeholder="Select Location"
              />

              <Button
                tooltip="Generate Report"
                tooltipOptions={{
                  position: "bottom",
                }}
                icon="pi pi-file"
                onClick={() => setReportVisible(true)}
                // className="bg-white text-cyan-800 border-1 border-cyan-800"
                className="bg-primary1 text-white"
                raised
              />
              <Dialog
                visible={ReportVisible}
                style={{ width: "100rem" }}
                onHide={() => {
                  if (!ReportVisible) return;
                  setReportVisible(false);
                }}
              >
                {/* <AQIReportPrint
          show={false}
          selectedLocation={selectedLocation}
          startDate={startDate}
          endDate={endDate}
        /> */}
                <ReportPrint
                  renderDashboard={renderDashboard}
                  renderRecommendations={renderRecommendations}
                  parameter={"aqi"}
                  heading={"Air Quality Index"}
                />
              </Dialog>
            </div>
          </div>
        </div>
      )}

      <div className="flex w-full gap-3">
        <div
          className="flex flex-column border-round-xl p-2 bg-white w-full gap-3"
          style={{
            border: `2px solid ${aqiStatus?.color}`,
          }}
        >
          <div className="flex justify-content-between">
            <div className="flex flex-column justify-content-between">
              <div className="flex gap-2 align-items-center">
                <Radio size={15} className="danger-text" />
                <p className="card-text m-0 p-0">Air Quality Index</p>
              </div>
              <div className="flex flex-column align-items-center">
                <h1 className="text-6xl font-semibold p-0 m-0 text-primary1">
                  {aqiValue !== null ? `${aqiValue}` : "No Data Found."}
                </h1>
                <Tag
                  className="border-round-3xl"
                  style={{ backgroundColor: aqiStatus?.color, color: "white" }}
                >
                  <span className="text-xs">
                    {aqiStatus?.status || "No Status"}
                  </span>
                </Tag>
              </div>

              {pollutantData && (
                <div className="flex gap-4 justify-content-center w-full">
                  {pollutantData.map((pollutant) => (
                    <div
                      key={pollutant.name}
                      className="flex flex-column shadow-1 border-round p-2"
                    >
                      <p className="p-0 m-0 card-text">{pollutant.name}</p>
                      <p className="font-semibold p-0 m-0 text-primary1">
                        {typeof pollutant.value === "number"
                          ? pollutant.value.toFixed(2)
                          : "N/A"}{" "}
                        <span className="font-medium text-sm">
                          {pollutant.unit}
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Last Updated Information */}
              <div className="flex gap-2">
                <p className="p-0 m-0 font-italic text-sm">Last updated:</p>

                <p className="text-secondary2 font-medium p-0 m-0 font-italic text-sm">
                  {dateLive}
                </p>
                <p className="text-secondary2 font-medium p-0 m-0 font-italic text-sm">
                  {timeLive}
                </p>
              </div>

              {/* AQI Change Percentage */}
              <div className="flex gap-2">
                {(() => {
                  const changePercentage =
                    ((aqiValue - yesterdayAQI) / yesterdayAQI) * 100;
                  const formattedChange = Math.abs(changePercentage).toFixed(2);
                  const isPositive = changePercentage > 0;

                  return (
                    <>
                      <i
                        className={`pi ${
                          isPositive ? "pi-arrow-up" : "pi-arrow-down"
                        }`}
                        style={{ color: isPositive ? "red" : "green" }}
                      ></i>
                      <p className="card-text p-0 m-0 text-xs">
                        <span style={{ color: isPositive ? "red" : "green" }}>
                          {formattedChange}%
                        </span>{" "}
                        from AQI measured at this time yesterday.
                      </p>
                    </>
                  );
                })()}
              </div>
            </div>

            {/* AQI Status Image */}
            <img
              src={aqiStatus?.image}
              alt={aqiStatus?.text}
              className="h-15rem"
            />

            {/* Minimum and Maximum AQI Values */}
            <div className="flex flex-column gap-4 justify-content-center">
              {[
                {
                  label: "Minimum",
                  value: minAqiValue,
                  time: minAqiTime,
                  location: minAqiLocation,
                },
                {
                  label: "Maximum",
                  value: maxAqiValue,
                  time: maxAqiTime,
                  location: maxAqiLocation,
                },
              ].map(({ label, value, time, location }) => (
                <div
                  key={label}
                  className="flex flex-column shadow-1 border-round p-3 gap-2"
                >
                  {value && (
                    <>
                      <p className="card-text p-0 m-0 text-lg">
                        {label}:{" "}
                        <span
                          className="text-white font-semibold p-2 border-round m-0"
                          style={{
                            backgroundColor: `${getAqiStatus(value)?.color}`,
                            minWidth: "4rem",
                          }}
                        >
                          {value}
                        </span>
                      </p>
                      <p className="card-text p-0 m-0 font-italic text-xs w-10rem ">
                        Recorded at{" "}
                        {selectedValues.location === "All Locations" ? (
                          <>
                            <span className="text-primary1 font-medium text-xs">
                              {time}
                            </span>{" "}
                            in <span className="text-xs">{location}</span>
                          </>
                        ) : (
                          <span className="text-primary1 font-medium text-xs">
                            {time}
                          </span>
                        )}
                      </p>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
          <ColorScaleBar labels={labels}/>
        </div>
        <div className="flex w-full bg-white border-round p-2">
          <AqiMap
            selectedLocation={selectedValues.location}
            averageAQI={aqiValue}
            locationWiseAQI={locationWiseAQI}
          />
        </div>
      </div>

      <div className="flex justify-content-end">
        <Dropdown
          id="dateRange"
          value={selectedDateRange}
          options={dateRangeOptions}
          onChange={onDateRangeChange}
          placeholder="Select a range"
        />
      </div>

      <AQIChart
        tableData={dataTableData}
        rowClassName={rowClassName}
        location={selectedValues.location}
        enviroDate={dateArrayData}
        envirotime={timeArrayData}
        enviroAQI={AQIArrayData}
        startDate={selectedValues.liveStartDate}
        enviroDay={dayArrayData}
        enviroWeek={weekArrayData}
        pm25ArrayData={pm25ArrayData}
        pm10ArrayData={pm10ArrayData}
        NO2ArrayData={NO2ArrayData}
        SO2ArrayData={SO2ArrayData}
        aqiStats={aqiStats}
      />
    </div>
  );
};

export default LiveAQI;
