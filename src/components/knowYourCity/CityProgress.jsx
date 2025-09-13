import React from "react";
import "primeflex/primeflex.css";
import { DonutChart } from "Layout/GraphVisuals";
import water from "assets/KYC/water.svg";
import waste from "assets/KYC/waste.svg";
import { Divider } from "primereact/divider";

const CityProgress = () => {
  const wasteGenerationData = {
    // title: "Waste Generation",
    labels: ["Residential", "Commercial", "Institutional"],
    series: [238800, 119400, 59700],
    height: 100,
    horizontal: "right",
    vertical: "center",
    fontColor: "white",
    colorArray: ["#FFDD82", "#47B881", "#F7A47A"],
  };

  const solidWasteProcessedData = {
    // title: "Solid Waste Processed (in TPD)",
    labels: ["Wet", "Dry", "Sanitary", "Domestic"],
    series: [99.53, 72.39, 3.62, 5.43],
    height: 100,
    horizontal: "right",
    vertical: "center",
    fontColor: "white",
    colorArray: ["#FFDD82", "#47B881", "#F7A47A", "#4D7479"],
  };

  const electricityConsumptionData = {
    // title: "Power Consumption (kWH)",
    labels: [
      "Residential",
      "Commercial",
      "Industrial",
      "Agricultural",
      "Others",
    ],
    series: [15343985, 2541529, 144440, 4675, 2100829],
    height: 110,
    horizontal: "right",
    vertical: "center",
    fontColor: "white",
    colorArray: ["#FFDD82", "#47B881", "#F7A47A", "#4D7479", "#98C6CF"],
  };

  return (
    <div className="flex gap-3">
      <div className="flex flex-column gap-3 w-full">
        {/* Water Management */}
        <div
          className="flex flex-column border-round-2xl w-full h-auto p-2"
          style={{
            background: "linear-gradient(-135deg , #1F8297, #166C7D, #003940)",
          }}
        >
          <div className="flex justify-content-between w-full p-2">
            <div className="flex flex-column align-items-center p-2 w-full">
              <p className="text-lg font-medium mt-1 text-white">
                Water Management
              </p>
              <img src={water} alt="overall" className="w-6" />
            </div>
            <div className="flex flex-column w-full gap-2 align-items-center justify-content-center">
              <div
                className="border-round-2xl mb-2 w-full shadow p-2"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                }}
              >
                <div className="flex flex-column">
                  <div className="flex justify-content-between">
                    <p className="text-lg font-medium mt-1 text-white">
                      State Category Rank
                    </p>
                    <div className="flex flex-column">
                      <p
                        className="m-0 text-center text-4xl font-medium"
                        style={{ color: "#F9C849" }}
                      >
                        26
                      </p>
                      <p className="mt-0 text-sm text-tertiary">out of 75</p>
                    </div>
                  </div>
                  <p className="m-0 text-xs text-tertiary-2 font-medium">
                    Source:
                  </p>
                  <p className="m-0 text-sm text-tertiary">
                    Jal Jeevan Mission
                  </p>
                </div>
              </div>
              <div
                className="border-round-2xl w-full p-2"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
              >
                <div className="flex justify-content-between">
                  <p className="text-lg font-medium mt-1 text-white">
                    Water Supply
                  </p>

                  <div className="flex gap-1">
                    <p
                      className="m-0 text-center text-4xl font-medium"
                      style={{ color: "#F9C849" }}
                    >
                      39.5
                    </p>
                    <p className="mt-3 ml-0 text-sm text-tertiary">MLD</p>
                  </div>
                </div>
                <p className="m-0 text-xs text-tertiary-2 font-medium">
                  Source:
                </p>
                <p className="m-0 text-sm text-tertiary">Jal Kal Vibhag</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          {/* Housing */}
          <div
            className="border-round-2xl w-full p-3"
            style={{
              background:
                "linear-gradient(-135deg , #1F8297, #166C7D, #003940)",
            }}
          >
            <p className="text-lg font-medium mt-1 text-center text-white">
              Housing
            </p>
            <div
              className="p-2 border-round-2xl"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
            >
              <div className="flex gap-4 py-4 justify-content-center">
                <div className="flex flex-column justify-content-end">
                  <p
                    className="m-0 text-center text-4xl font-medium"
                    style={{ color: "#F9C849" }}
                  >
                    262
                  </p>
                  <p className="mt-1 text-sm text-tertiary">Houses allocated</p>
                </div>
                <Divider layout="vertical" />
                <div className="flex flex-column justify-content-end">
                  <p className="m-0 text-center text-4xl text-white">284</p>
                  <p className="mt-1 text-sm text-tertiary">Houses built</p>
                </div>
              </div>
              <p className="m-0 text-xs mt-4 text-tertiary-2 font-medium">
                Source:
              </p>
              <p className="m-0 text-sm text-tertiary">
                Ministry of Housing & Urban Affairs
              </p>
            </div>
          </div>

          {/* Power Consumption */}
          <div
            className="flex flex-column border-round-2xl w-full p-3 justify-content-between"
            style={{
              background:
                "linear-gradient(-135deg , #1F8297, #166C7D, #003940)",
            }}
          >
            <p className="text-lg font-medium text-white p-0 m-0">
              Power Consumption (kWH)
            </p>
            {DonutChart(electricityConsumptionData)}
            <div className="flex flex-column">
              <p className="m-0 text-xs text-tertiary-2 font-medium">Source:</p>
              <p className="m-0 text-sm text-tertiary">Vidyut Vibhag Ayodhya</p>
            </div>
          </div>
        </div>
      </div>

      {/* Waste Management */}
      <div
        className="w-full border-round-2xl flex align-items-center justify-content-center gap-3 p-3"
        style={{
          background: "linear-gradient(-135deg , #1F8297, #166C7D, #003940)",
        }}
      >
        <div className="flex flex-column gap-3 w-full">
          <div className="flex flex-column align-items-center gap-2">
            <p className="text-lg font-medium m-0 text-center text-white">
              Waste Management
            </p>
            <img src={waste} alt="overall" className="w-5" />
          </div>
          <div
            className="border-round-2xl w-full"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
          >
            <div className="flex flex-column p-2">
              <div className="flex justify-content-between">
                <p className="text-lg font-medium mt-1 text-white">
                  Garbage Free City
                </p>
                <div className="flex flex-column justify-content-end">
                  {/* <p
                      className="m-0 text-center text-4xl"
                      style={{ color: "#F9C849", marginTop: -20 }}
                    > */}
                  <i
                    className="pi pi-star-fill mt-1 ml-3 font-medium"
                    style={{ color: "#F9C849" }}
                  />
                  {/* </p> */}
                  <p className="mt-1 text-sm text-tertiary-2">Rating</p>
                </div>
              </div>
              <p className="m-0 text-xs text-tertiary-2 font-medium">Source:</p>
              <p className="m-0 text-sm text-tertiary">
                Ministry of Housing and Urban Affairs
              </p>
            </div>
          </div>

          <div
            className="flex flex-column border-round-2xl w-full p-2 gap-2"
            style={{
              background: "rgba(255, 255, 255, 0.2)",
            }}
          >
            <p className="text-lg font-medium text-white p-0 m-0">
              Waste Generation
            </p>
            {DonutChart(wasteGenerationData)}
            <div className="flex flex-column">
              <p className="m-0 text-xs text-tertiary-2 font-medium">Source:</p>
              <p className="m-0 text-sm text-tertiary">
                Ayodhya Industrial Dept 2020
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-column gap-3 w-full">
          <div
            className="border-round-2xl w-full p-2"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
          >
            <div className="flex flex-column">
              <div className="flex justify-content-between">
                <p className="text-lg font-medium mt-1 text-white">
                  Swachh Survekshan
                </p>
                <div className="flex flex-column justify-content-end">
                  <p
                    className="m-0 text-center text-4xl font-medium "
                    style={{ color: "#F9C849" }}
                  >
                    389
                  </p>
                  <p className="mt-1 text-sm text-tertiary">Absolute Rank</p>
                </div>
              </div>
              <p className="m-0 text-xs text-tertiary-2 font-medium">Source:</p>
              <p className="m-0 text-sm text-tertiary">
                Swachh Survekshan Mission
              </p>
            </div>
          </div>
          <div
            className="flex flex-column border-round-2xl w-full p-2 gap-2"
            style={{
              background: "rgba(255, 255, 255, 0.2)",
            }}
          >
            <p className="text-lg font-medium text-white p-0 m-0">
              Solid Waste Processed (in TPD)
            </p>
            {DonutChart(solidWasteProcessedData)}
            <div className="flex flex-column">
              <p className="m-0 text-xs text-tertiary-2 font-medium">Source:</p>
              <p className="m-0 text-sm text-tertiary">Swachh Bharat Mission</p>
            </div>
          </div>
          <div
            className="border-round-2xl w-full p-2"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
          >
            <div className="flex flex-column">
              <div className="flex justify-content-between">
                <p className="text-lg font-medium mt-1 text-white">CT/PT</p>
                <p className="text-lg font-medium mt-1 text-white">62/62</p>
              </div>
              <div className="flex flex-column justify-content-end">
                <p
                  className="m-0 text-center text-3xl font-medium"
                  style={{ color: "#F9C849" }}
                >
                  100%
                </p>
                <p className="mt-1 text-sm text-center text-tertiary">
                  Functional
                </p>
              </div>
              <p className="m-0 text-xs text-tertiary-2 font-medium">Source:</p>
              <p className="m-0 text-sm text-tertiary">Swachh Bharat Mission</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityProgress;
