import React from "react";
import society from "assets/Report/Society.svg";
import { Divider } from "primereact/divider";
import { PieChart } from "Layout/GraphVisuals";
import healthcare from "assets/illustration/Healthcare Management.svg";
import education from "assets/illustration/education.svg";
import transport from "assets/illustration/Public Transport.svg";
import employment from "assets/illustration/Employment Opportunity.svg";
import culture from "assets/illustration/Cultural Sites.svg";
import community from "assets/illustration/community.svg";
import pathConstants from "components/DashboardUtility/Constants/pathConstants";
import score from "components/DashboardUtility/Constants/score";
import Legends from "../components/DashboardUtility/components/Legends";
import ParameterCard from "../components/DashboardUtility/components/ParameterCard";
import { useUser } from "components/context/UserContext";

const Society = () => {
  const societyLables = [
    "City Planning",
    "Citizen Services",
    "Employment Opportunity",
    "Cultural Preservation",
    "Community Enagagement & Holistic Well-Being",
    // "Healthcare",
    // "Education",
    // "Public Transport",
  ];
  const societyData = [15, 40, 20, 15, 10];
  const { transportScore } = useUser();
  const metrics = [
    {
      img: healthcare,
      title: "Healthcare",
      score: score.HEALTHCARE,
      path: pathConstants.HEALTHCARE,
    },
    {
      img: education,
      title: "Education",
      score: score.EDUCATION,
      path: pathConstants.EDUCATION,
    },
    {
      img: transport,
      title: "Public Transport",
      score: transportScore,
      path: pathConstants.TRANSPORT,
    },
    {
      img: employment,
      title: "Employment Opportunity",
      score: score.EMPLOYMENT,
      path: pathConstants.EMPLOYMENT,
    },
    {
      img: culture,
      title: "Cultural Preservation",
      score: score.CULTURE,
      path: pathConstants.CULTURE,
    },
    {
      img: community,
      title: "Community Enagagement & Holistic Well-Being",
      score: score.COMMUNITY,
      path: pathConstants.COMMUNITY,
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
              <p className="card-title p-0 m-0 text-xl">Society</p>
              <p className="text-5xl font-semibold text-secondary2 p-0 m-0">
                {score.SOCIETY}
              </p>
            </div>
            <img src={society} alt="society" className="w-4rem" />
          </div>
          <p className="text-tertiary3">
            Empowering sustainable changes, enriching diverse lives.
          </p>
          <Divider />
        </div>
        <div
          className="flex flex-column bg-white border-round-2xl shadow-2 align-items-start justify-content-between p-4"
          style={{ flex: "28%" }}
        >
          <p className="card-title p-0 m-0 text-xl">Indicator Contribution</p>
          <PieChart
            categories={societyLables}
            series={societyData}
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
            The score {score.SOCIETY} reflects the combined performance of the
            key societal indicators.
          </p>
          <Divider />
          <p className="p-0 m-0">
            Society's outstanding performance showcase remarkable efforts
            towards enhancing quality of life and well-being.
          </p>
          <Divider />
          <p className="card-title p-0 mt-0 text-xl">Indicator Highlights:</p>
          <p className="p-0 m-0">
            1. Achiever indicators:{" "}
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
              {" "}
              {needHigherAttention
                .map((indicator) => indicator.title)
                .join(", ")}
            </span>
          </p>
        </div>
      </div>
      <div className="flex gap-2 justify-content-between w-full sm:flex-wrap">
        <ParameterCard metrics={metrics} />
      </div>
      <Legends />
    </div>
  );
};

export default Society;
