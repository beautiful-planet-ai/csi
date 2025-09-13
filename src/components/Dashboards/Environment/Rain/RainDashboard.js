import React, { useState, useEffect } from "react";
import axios from "axios";
import RainTrend from "./RainTrend";
import "../../../DashboardUtility/Dash.css";
import RainRecommendations from "./RainRecommendations";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import rain from "assets/Rainfall Illustration.svg";
import { Chip } from "primereact/chip";
import ReportPrint from "components/DashboardUtility/ReportPrint";
import RecommendationPanel from "components/DashboardUtility/RecommendationPanel";
import increase from "assets/increase.png";
import { ProgressSpinner } from "primereact/progressspinner";
import Upload from "components/DashboardUtility/Popups/Upload";
import score from "components/DashboardUtility/Constants/score";
import DataNotFound from "pages/error pages/ServerDown";

const RainDashboard = ({ show }) => {
  const [rainData, setRainData] = useState([]);
  const [rainYears, setRainYears] = useState([]);
  const [yearAverageRainActual, setYearAverageRainActual] = useState({});
  const [yearAverageRainExpected, setYearAverageRainExpected] = useState({});
  const [selectedYear, setSelectedYear] = useState(null);
  const [monthRainActual, setMonthRainActual] = useState([]);
  const [monthRainExpected, setMonthRainExpected] = useState([]);
  const [totalRainfall, setTotalRainfall] = useState(0);
  const [totalExpectedRainfall, setTotalExpectedRainfall] = useState(0);
  const [deviationPercentage, setDeviationPercentage] = useState(0);
  const [maxRainfall, setMaxRainfall] = useState(0);
  const [maxRainfallYear, setMaxRainfallYear] = useState(null);
  const [maxRainfallMonth, setMaxRainfallMonth] = useState(null);
  const [ReportVisible, setReportVisible] = useState(false);
  const [uploadDialogVisible, setUploadDialogVisible] = useState(false);

  const [loading, setLoading] = useState(false);
  const [serverDown, setServerDown] = useState(false);

  const hideUploadDialog = () => {
    setUploadDialogVisible(false);
  };
  const showUploadDialog = () => {
    setUploadDialogVisible(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (rainData.length > 0) {
      calculateRainMetrics();
    }
  }, [rainData]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const rain_response = await axios.get(
        "https://api-csi.arahas.com/data/environment/rainfall"
      );
      const rData = rain_response.data.data;
      setRainData(rData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
      setServerDown(true);
    }
  };

  const calculateRainMetrics = () => {
    const sortedRainData = rainData.sort((a, b) => {
      if (a.Year === b.Year) {
        return a.Month - b.Month;
      }
      return a.Year - b.Year;
    });

    const years = [...new Set(sortedRainData.map((data) => data.Year))];
    setRainYears(years);
    setSelectedYear(years[0]); // Default to the first year

    const yearActual = {};
    const yearExpected = {};
    let totalRainfallSum = 0;
    let totalExpectedRainfallSum = 0;
    let maxRain = 0;
    let maxRainYear = null;
    let maxRainMonth = null;

    sortedRainData.forEach((data) => {
      if (data.Total > maxRain) {
        maxRain = data.Total;
        maxRainYear = data.Year;
        maxRainMonth = data.Month;
      }
    });

    years.forEach((year) => {
      const yearlyData = sortedRainData.filter((data) => data.Year === year);
      const totalActual = yearlyData.reduce((sum, data) => sum + data.Total, 0);
      const totalExpected = yearlyData.reduce(
        (sum, data) => sum + data.Normal,
        0
      );
      yearActual[year] = (totalActual / yearlyData.length).toFixed(2);
      yearExpected[year] = (totalExpected / yearlyData.length).toFixed(2);

      totalRainfallSum += totalActual;
      totalExpectedRainfallSum += totalExpected;
    });

    setYearAverageRainActual(yearActual);
    setYearAverageRainExpected(yearExpected);
    setTotalRainfall(totalRainfallSum.toFixed(2));
    setTotalExpectedRainfall(totalExpectedRainfallSum.toFixed(2));
    setMaxRainfall(maxRain.toFixed(2));
    setMaxRainfallYear(maxRainYear);
    setMaxRainfallMonth(maxRainMonth);

    // Calculate deviation percentage
    const deviation = (
      ((totalRainfallSum - totalExpectedRainfallSum) /
        totalExpectedRainfallSum) *
      100
    ).toFixed(2);
    setDeviationPercentage(deviation);

    // Calculate initial month data for the default selected year
    updateMonthData(years[0]);
  };

  const updateMonthData = (year) => {
    const selectedYearData = rainData.filter((data) => data.Year === year);

    setMonthRainActual(
      selectedYearData.map((data) => ({
        month: data.Month,
        actual: data.Total,
      }))
    );

    setMonthRainExpected(
      selectedYearData.map((data) => ({
        month: data.Month,
        expected: data.Normal,
      }))
    );
  };

  // Update month data when the selected year changes
  useEffect(() => {
    if (selectedYear) {
      updateMonthData(selectedYear);
    }
  }, [selectedYear, rainData]);

  const renderRecommendations = () => {
    return <RainRecommendations />;
  };

  const renderDashboard = () => {
    return <RainDashboard show={false} />;
  };

  const scoreRAIN = score.RAIN;

  const getScoreColor = (scoreRAIN) => {
    if (scoreRAIN >= 81 && scoreRAIN <= 100) {
      return "#0C9D61"; // Green for good
    } else if (scoreRAIN >= 41 && scoreRAIN <= 80) {
      return "#FFAD0D"; // Yellow for moderate
    } else if (scoreRAIN >= 0 && scoreRAIN <= 40) {
      return "#E62225"; // Red for poor
    }
  };

  if (serverDown) {
    return <DataNotFound />;
  }

  return loading ? (
    <div className="flex h-screen align-items-center justify-content-center flex-column">
      <ProgressSpinner />
      <p className="font-medium text-lg">Please Wait, Fetching Data...</p>
    </div>
  ) : (
    <div className="flex flex-column gap-3 p-4">
      {show && (
        <div className="flex align-items-center justify-content-between w-full">
          {/* Title & Score */}
          <div
            style={{
              position: "relative",
              width: "340px",
              height: "43px",
              overflow: "hidden", // Hide overflow if needed
            }}
          >
            <div
              className="flex align-items-center justify-content-between p-2"
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                backgroundColor: getScoreColor(scoreRAIN), // Replace with your desired color
                clipPath:
                  "polygon(100% 0%, 87% 51%, 100% 100%, 0 100%, 0% 50%, 0 0)",
              }}
            >
              <h1
                className="m-0 p-0 text-white text-2xl font-semibold"
                style={{ zIndex: 1500 }}
              >
                Rainfall
              </h1>
              <p
                className="m-0 p-2 text-primary1 text-xl font-bold border-circle bg-white mr-7"
                style={{ zIndex: 1500 }}
              >
                {scoreRAIN}
              </p>
            </div>
          </div>
          <div className="flex align-items-center justify-content-end gap-2">
            <Button
              tooltip="Upload File"
              onClick={showUploadDialog}
              raised
              className="bg-white text-secondary2"
              icon="pi pi-file-arrow-up"
              tooltipOptions={{
                position: "bottom",
              }}
            />
            <Upload
              visible={uploadDialogVisible}
              onHide={hideUploadDialog}
              parameter={"environment/Rainfall"}
            />
            <Button
              tooltip="Generate Report"
              icon="pi pi-file"
              onClick={() => setReportVisible(true)}
              className="bg-primary1 text-white"
              tooltipOptions={{
                position: "bottom",
              }}
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
              <ReportPrint
                renderDashboard={renderDashboard}
                renderRecommendations={renderRecommendations}
                parameter={"rain"}
                heading={"Rainfall"}
              />
            </Dialog>
          </div>
        </div>
      )}

      <div className="flex align-items-center justify-content-center w-full gap-3">
        {/* total Rainfall */}
        <div
          className="flex flex-column bg-white border-round gap-4 p-3"
          style={{ flex: "20%" }}
        >
          <p className="card-title p-0 m-0">Total Rainfall</p>
          <div className="flex">
            <div className="flex flex-column align-items-center">
              <p className="text-2xl font-semibold p-1 m-0 text-secondary2 flex align-items-center">
                {totalRainfall} <span className="text-xl"> mm</span>
              </p>
              <p className="p-0 m-0 card-text">Actual</p>
            </div>
            <Divider layout="vertical" />
            <div className="flex flex-column align-items-center">
              <p className="text-2xl font-semibold p-1 m-0 text-secondary2 flex align-items-center">
                {totalExpectedRainfall} <span className="text-xl"> mm</span>
              </p>
              <p className="p-0 m-0 card-text">Expected</p>
            </div>
          </div>
          {/* <ProgressBar
            value={80}
            style={{ height: "0.5rem" }} // Adjust the height
            className="w-full border-round mt-4" // Full width of its container
            color="#FFAD0D"
            displayValueTemplate={() => null} // Hide the displayed value
          /> */}
          <Divider />
          <div className="flex align-items-center justify-content-start">
            <img
              src={increase}
              style={{
                height: "1.5rem",
                width: "1.5rem",
                marginRight: "0.5rem",
              }}
              alt="increase"
            />
            <p className="text-tertiary3 p-0 m-0 font-medium">
              <span style={{ color: "#0C9D61" }}>8.5%</span> Up from last year.
            </p>
          </div>
        </div>

        {/* Deviation from Expected */}
        <div
          className="flex flex-column gap-4 bg-white border-round p-3"
          style={{ flex: "20%" }}
        >
          <p className="card-title p-0 m-0">Deviation from Expected</p>
          <div className="flex align-items-center justify-content-center">
            <div className="w-9rem custom-circular-progress">
              <CircularProgressbar
                value={-deviationPercentage}
                text={`${deviationPercentage}%`}
                counterClockwise="true"
                strokeWidth={8}
                styles={buildStyles({
                  pathColor: "#E62225",
                  textColor: "#001F23",
                  trailColor: "#E7EAEA",
                  textSize: "1.5rem",
                  pathTransition: "stroke-dashoffset 0.5s ease 0s",
                })}
              />
            </div>
          </div>
        </div>

        <div className="flex" style={{ flex: "35%" }}>
          <img
            src={rain}
            alt="rain"
            className="h-14rem"
            style={{ borderRadius: "10px 0 0 10px" }}
          />

          {/* Maximum Rainfall */}
          <div
            className="flex flex-column bg-white p-3 gap-5 w-full"
            style={{ borderRadius: "0 10px 10px 0" }}
          >
            <p className="card-title p-0 m-0">Maximum Rainfall</p>
            <p className="text-2xl font-semibold p-2 m-0 text-secondary2 text-center">
              {maxRainfall} <span className="text-xl">mm</span>
            </p>
            <Chip
              label={`July ${maxRainfallYear}`}
              style={{
                width: "fit-content",
                backgroundColor: "#e9f3f5",
                color: "#001F23",
                fontWeight: 600,
              }}
            />
          </div>
        </div>
        {/* Insights */}
        <div
          className="flex flex-column p-3 border-round bg-white gap-2 overflow-y-auto h-14rem"
          style={{ flex: "30%" }}
        >
          <p className="card-text p-0 m-0">Insights:</p>
          <li className="p-0 m-0 text-primary1 font-medium text-sm">
            The total rainfall recorded is{" "}
            <span className="m-0 p-0 font-semibold text-sm">
              {totalRainfall}
            </span>{" "}
            mm, which is{" "}
            <span className="m-0 p-0 font-semibold text-sm">
              {deviationPercentage}%
            </span>{" "}
            below the expected level of{" "}
            <span className="m-0 p-0 font-semibold text-sm">
              {totalExpectedRainfall}
            </span>{" "}
            mm. This shortfall could have significant impacts on agriculture,
            water supply, and local ecosystems.
          </li>
          <li className="p-0 m-0 text-primary1 font-medium text-sm">
            Despite the deviation from expected levels, rainfall has increased
            by <span className="m-0 p-0 font-semibold text-sm">8.5%</span>{" "}
            compared to the previous year. This indicates some recovery from
            earlier deficits but may still necessitate water conservation
            efforts.
          </li>
          <li className="p-0 m-0 text-primary1 font-medium text-sm">
            The highest recorded rainfall in a single month was{" "}
            <span className="m-0 p-0 font-semibold text-sm">{maxRainfall}</span>{" "}
            mm in{" "}
            <span className="m-0 p-0 font-semibold text-sm">
              July {maxRainfallYear}
            </span>
            . This could indicate a pattern of heavy monsoon activity during
            mid-year, requiring better flood preparedness during this period.
          </li>
          <li className="p-0 m-0 text-primary1 font-medium text-sm">
            The graph suggests that actual rainfall consistently falls short of
            expected levels in recent years, indicating a broader trend of
            variability or decline in rainfall. This deviation could be linked
            to climate change or local environmental factors.
          </li>
          <li className="p-0 m-0 text-primary1 font-medium text-sm">
            The discrepancy in expected versus actual rainfall suggests a need
            for adaptive planning in agriculture (e.g., drought-resistant crops)
            and urban infrastructure (e.g., stormwater management).
          </li>
        </div>
      </div>

      <div className="flex w-full bg-white border-round p-4">
        <RainTrend
          rainYears={rainYears}
          yearAverageRainActual={yearAverageRainActual}
          yearAverageRainExpected={yearAverageRainExpected}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          monthRainActual={monthRainActual}
          monthRainExpected={monthRainExpected}
        />
      </div>
      <p className="p-0 m-0 border-top-1 surface-border text-right text-sm text-700 font-italic">
        *Data updated till 2021. These numbers are subject to variation.
      </p>

      <RecommendationPanel
        show={true}
        renderRecommendations={renderRecommendations}
      />
    </div>
  );
};

export default RainDashboard;
