import axios from "axios";
import React, { useEffect } from "react";

const LiveAqiScore = ({ onAQIScoreCalculated }) => {
  const locations = [12218, 12220, 12414, 12415, 12416];
  const getAQIAvg = async (locationID, from_time, upto_time) => {
    try {
      const response = await axios.post(
        "https://app.aurassure.com/-/api/iot-platform/v1.1.0/clients/10565/applications/16/things/data",
        {
          data_type: "aggregate",
          aggregation_period: 86400,
          parameters: ["aqi"],
          parameter_attributes: ["value"],
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

      let totalAqi = 0;
      let validDays = 0;

      if (api_response) {
        api_response.forEach((item) => {
          if (item.parameter_values && item.parameter_values.aqi) {
            totalAqi = +totalAqi + (item.parameter_values.aqi.value ?? 0);
            validDays++;
          }
        });
      } else {
        console.warn(
          `No AQI data found for location ${locationID} during the specified period.`
        );
        return { totalAqi: 0, validDays: 0 };
      }

      return { totalAqi, validDays };
    } catch (error) {
      console.error(
        `Error fetching AQI data for location ${locationID}:`,
        error
      );
      return { totalAqi: 0, validDays: 0 };
    }
  };

  useEffect(() => {
    const fetchScorePreviousThreeMonths = async () => {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();

      const startDate = new Date(currentYear, currentMonth - 3, 1);
      const endDate = new Date(currentYear, currentMonth, 0);
      endDate.setHours(23, 0, 0, 0); // Set to 23:00:00

      const fromTime = Math.floor(startDate.getTime() / 1000);
      const uptoTime = Math.floor(endDate.getTime() / 1000);

      let totalAqiSum = 0;
      let totalValidDays = 0;

      const scoresPromises = locations.map(async (locationID) => {
        try {
          const { totalAqi, validDays } = await getAQIAvg(
            locationID,
            fromTime,
            uptoTime
          );
          totalAqiSum += totalAqi;
          totalValidDays += validDays;
          return { totalAqi, validDays };
        } catch (error) {
          console.error(`Failed to fetch AQI score for ${locationID}:`, error);
          return { totalAqi: 0, validDays: 0 };
        }
      });

      try {
        await Promise.all(scoresPromises);

        const averageAQI =
          totalValidDays > 0 ? totalAqiSum / totalValidDays : 0;
        let calculatedScore;
        if (averageAQI >= 0 && averageAQI <= 100) {
          calculatedScore = 100;
        } else if (averageAQI >= 101 && averageAQI <= 200) {
          calculatedScore = 80;
        } else if (averageAQI >= 201 && averageAQI <= 300) {
          calculatedScore = 60;
        } else if (averageAQI >= 301 && averageAQI <= 400) {
          calculatedScore = 40;
        } else if (averageAQI >= 401 && averageAQI <= 500) {
          calculatedScore = 20;
        } else if (averageAQI > 500) {
          calculatedScore = 0;
        } else {
          calculatedScore = null;
        }

        onAQIScoreCalculated(calculatedScore, startDate, endDate);
      } catch (error) {
        console.error("Failed to fetch all AQI scores:", error);
      }
    };

    fetchScorePreviousThreeMonths();
  }, [onAQIScoreCalculated]);

  return null;
};

export default LiveAqiScore;
