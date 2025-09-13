import React from "react";
import admin from "assets/Report/Admin.svg";
import { Divider } from "primereact/divider";
import disaster from "assets/illustration/Disaster Management.svg";
import ethical from "assets/illustration/ethical.svg";
import accountability from "assets/illustration/Transparency and accountability.svg";
import { PieChart } from "Layout/GraphVisuals";
import pathConstants from "components/DashboardUtility/Constants/pathConstants";
import score from "components/DashboardUtility/Constants/score";
import Legends from "../components/DashboardUtility/components/Legends";
import ParameterCard from "../components/DashboardUtility/components/ParameterCard";

const Administration = () => {
  const adminLables = [
    "Disaster Management",
    "Transparency and Accountability",
    "Ethical Leadership",
  ];
  const adminData = [30, 50, 20];

  const metrics = [
    {
      img: disaster,
      title: "Disaster Management",
      score: score.DISASTER,
      path: pathConstants.DISASTER,
    },
    {
      img: ethical,
      title: "Ethical Leadership",
      score: score.ETHICAL,
      path: pathConstants.DISASTER,
    },
    {
      img: accountability,
      title: "Transparency and Accountability",
      score: score.TRANSPARENCY,
      path: pathConstants.DISASTER,
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
              <p className="card-title p-0 m-0 text-xl">Administration</p>
              <p className="text-5xl font-semibold text-secondary2 p-0 m-0">
                {score.ADMIN}
              </p>
            </div>
            <img src={admin} alt="admin" className="w-4rem" />
          </div>
          <p className="text-tertiary3">
            Empowering responsible administration for lasting impact.
          </p>
          <Divider />
        </div>
        <div
          className="flex flex-column bg-white border-round-2xl shadow-2 align-items-start justify-content-between p-4"
          style={{ flex: "28%" }}
        >
          <p className="card-title p-0 m-0 text-xl">Indicator Contribution</p>
          <PieChart
            categories={adminLables}
            series={adminData}
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
            The score {score.ADMIN} reflects the combined performance of the key
            administrative indicators.
          </p>
          <Divider />
          <p className="p-0 m-0">
            Administration's outstanding performance showcase exceptional
            efforts towards empowering responsible governance.
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
            2. Area of Improvement:{" "}
            <span className="font-medium">
              {" "}
              {areasOfImprovement
                .map((indicator) => indicator.title)
                .join(", ")}
            </span>
          </p>
          <p className="p-0 m-0">
            3. Need higher attention:{" "}
            <span className="font-medium">
              {" "}
              {needHigherAttention
                .map((indicator) => indicator.title)
                .join(", ")}
            </span>
          </p>
        </div>
      </div>
      <div className="flex gap-4 sm:flex-wrap w-full">
        <ParameterCard metrics={metrics} />
      </div>
      <Legends />
    </div>
  );
};

export default Administration;
