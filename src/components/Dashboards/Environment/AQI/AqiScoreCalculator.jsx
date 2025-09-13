import axios from "axios";
import React, { useEffect } from "react";

const AqiScoreCalculator = ({ onAQIScoreCalculated }) => {
  useEffect(() => {
    const fetchScore = async () => {
      try {
        const response = await axios.get(
          "https://api-csi.arahas.com/aqinew/avg"
        );
        const averageAQI = response.data.data.averageAQI;
        // console.log("🚀 ~ fetchScore ~ averageAQI:", averageAQI);
        // Calculate score based on average AQI
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
          calculatedScore = null; // Handle cases outside the expected range
        }

        // Call the callback function with the calculated score
        onAQIScoreCalculated(calculatedScore);
        // console.log("🚀 ~ fetchScore ~ calculatedScore:", calculatedScore);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchScore();
  }, [onAQIScoreCalculated]);
  // Return null or an empty fragment since we don't want to render anything
  return null;
};

export default AqiScoreCalculator;
