import React, { useState } from "react";
import nature from "assets/Report/Nature.svg";
import { PieChart } from "Layout/GraphVisuals";
import { Divider } from "primereact/divider";
import aqi from "assets/illustration/aqi1.svg";
import water from "assets/illustration/water1.svg";
import land from "assets/illustration/land1.svg";
import waste from "assets/illustration/waste1.svg";
import Rainfall from "assets/illustration/Rainfall1.svg";
import Temperature from "assets/illustration/temperature1.svg";
import pathConstants from "components/DashboardUtility/Constants/pathConstants";
import score from "components/DashboardUtility/Constants/score";
import AqiScoreCalculator from "components/Dashboards/Environment/AQI/AqiScoreCalculator";
import { useUser } from "components/context/UserContext";
import Legends from "../components/DashboardUtility/components/Legends";
import ParameterCard from "../components/DashboardUtility/components/ParameterCard";
import LiveAqiScore from "components/Dashboards/Environment/AQI/LiveAqiScore";
import { useEffect } from "react";
import { fetchScore } from "components/Dashboards/Environment/Water/FetchWQIandScore";
import fetchWasteScore from "components/Dashboards/Environment/Waste/FetchScore";

const Nature = () => {
  const natureLables = [
    "AQI",
    "Water Management",
    "Land Usage",
    "Waste Management",
    "Green Coverage",
    "Fire & Energy",
    "GHG Emission",
  ];
  const natureData = [20, 15, 10, 10, 15, 10, 20];
  const [aqiScore, setAqiScore] = useState(null);
  const handleScoreCalculated = (calculatedScore) => {
    setAqiScore(calculatedScore);
    console.log("Calculated Score received in Dashboard:", calculatedScore);
    // You can also perform additional actions with the score here
  };
  const [waterScore, setWaterScore] = useState(0);
  const [wasteScore, setWasteScore] = useState(0);

  useEffect(() => {
    fetchScore().then((score) => setWaterScore(score));
    fetchWasteScore().then((score) => setWasteScore(score));
  }, []);

  const metrics = [
    {
      img: aqi,
      title: "Air Quality",
      score: aqiScore,
      path: pathConstants.LiveAQI,
    },
    {
      img: water,
      title: "Water Management",
      score: waterScore,
      path: pathConstants.WATER,
    },
    {
      img: waste,
      title: "Waste Management",
      score: wasteScore,
      path: pathConstants.WASTE,
    },
    {
      img: land,
      title: "Land Usage",
      score: score.LAND,
      path: pathConstants.LAND,
    },
    {
      img: Temperature,
      title: "Temperature",
      score: score.TEMP,
      path: pathConstants.TEMP,
    },
    {
      img: Rainfall,
      title: "Rainfall",
      score: score.RAIN,
      path: pathConstants.RAIN,
    },
  ];

  const achieverIndicators = metrics.filter((metric) => metric.score >= 80);
  const areasOfImprovement = metrics.filter(
    (metric) => metric.score >= 40 && metric.score < 80
  );
  const needHigherAttention = metrics.filter((metric) => metric.score < 40);

  return (
    <div className="flex flex-column p-4 gap-4">
      <div className="flex gap-4">
        <div
          className="flex flex-column bg-white border-round-2xl shadow-2 justify-content-around p-4"
          style={{ flex: "22%" }}
        >
          <div className="flex justify-content-between">
            <div className="flex flex-column gap-4">
              <p className="card-title p-0 m-0 text-xl">Nature</p>
              <p className="text-5xl font-semibold text-secondary2 p-0 m-0">
                {score.NATURE}
              </p>
            </div>
            <img src={nature} alt="nature" className="w-4rem" />
          </div>
          <p className="text-tertiary3">
            Sustaining our planets for future generations.
          </p>
          <Divider />
        </div>
        <div
          className="flex flex-column bg-white border-round-2xl shadow-2 align-items-start justify-content-between p-4"
          style={{ flex: "28%" }}
        >
          <p className="card-title p-0 m-0 text-xl">Indicator Contribution</p>
          <PieChart
            categories={natureLables}
            series={natureData}
            height={160}
            fontSize={8}
          />
        </div>
        <div
          className="flex flex-column border-round-2xl bg-white px-4"
          style={{ flex: "50%" }}
        >
          <p className="card-title p-0 text-xl">Summary</p>
          <p className="p-0 m-0">
            The score {score.NATURE} reflects the combined performance of the
            key environmental indicators.
          </p>
          <Divider />
          <p className="p-0 m-0">
            Nature's outstanding performance showcase exceptional efforts
            towards ensuring a sustainable future.
          </p>
          <Divider />
          <p className="card-title p-0 mt-0 text-xl">Indicator Highlights:</p>
          <p className="p-0 m-0">
            1. Achiever indicator:{" "}
            <span className="font-medium">
              {" "}
              {achieverIndicators
                .map((indicator) => indicator.title)
                .join(", ")}
            </span>
          </p>
          <p className="p-0 m-0">
            2. Areas of Improvement:{" "}
            <span className="font-medium">
              {areasOfImprovement
                .map((indicator) => indicator.title)
                .join(", ")}
            </span>
          </p>
          <p className="p-0 m-0">
            3. Need higher attention:{" "}
            <span className="font-medium">
              {needHigherAttention
                .map((indicator) => indicator.title)
                .join(", ")}
            </span>
          </p>
        </div>
      </div>
      <LiveAqiScore onAQIScoreCalculated={handleScoreCalculated} />
      <div className="flex gap-2 justify-content-between w-full sm:flex-wrap">
        <ParameterCard metrics={metrics} />
      </div>
      <Legends />
    </div>
  );
};

export default Nature;
