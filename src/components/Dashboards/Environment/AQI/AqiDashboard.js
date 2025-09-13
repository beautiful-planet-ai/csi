import React, { useState, useEffect } from "react";
import { Calendar } from "primereact/calendar";
import axios from "axios";
import { Dropdown } from "primereact/dropdown";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "../../../DashboardUtility/Dash.css";
import PollutantChart from "./PollutantChart";
import { Button } from "primereact/button";
import TableSkeleton from "../../../DashboardUtility/skeletons/TableSkeleton";
import AQIChart from "./AQIChart";
import AqiMap from "./AqiMap";
import AQIRecommendations from "./AQIRecommendations";
import ReportPrint from "components/DashboardUtility/ReportPrint";
import RecommendationPanel from "components/DashboardUtility/RecommendationPanel";
import Upload from "components/DashboardUtility/Popups/Upload";
import { Dialog } from "primereact/dialog";
import { Tag } from "primereact/tag";
import { ProgressSpinner } from "primereact/progressspinner";
import { Divider } from "primereact/divider";
import { OverlayPanel } from "primereact/overlaypanel";
import { useRef } from "react";
import DataNotFound from "pages/error pages/ServerDown";
import AqiScoreCalculator from "components/Dashboards/Environment/AQI/AqiScoreCalculator";
import unhealthy from "assets/dashboard/unhealthy-aqi-level.svg";
import severe from "assets/dashboard/severe-aqi-level.svg";
import good from "assets/dashboard/good-aqi-level.svg";
import moderate from "assets/dashboard/moderate-aqi-level.svg";
import poor from "assets/dashboard/poor-aqi-level.svg";
import hazardous from "assets/dashboard/hazardous-aqi-level.svg";
import colors from "components/DashboardUtility/Constants/colorConstants";

const AqiDashboard = ({ show }) => {
  const [startDate, setStartDate] = useState(new Date("2024-12-01"));
  const [endDate, setEndDate] = useState(new Date("2024-12-31"));
  const [selectedLocation, setSelectedLocation] = useState(
    "Ayodhya- Civil Lines"
  );
  const [aqiValue, setAqiValue] = useState(null);
  const [pm25Value, setPM25value] = useState(null);
  const [pm10Value, setPM10value] = useState(null);
  const [aqiStatus, setAqiStatus] = useState({
    status: "",
    color: "",
    textColor: "",
    image: null,
  });

  const overlayRef = useRef(null);

  const [dataTableData, setDataTableData] = useState([]);
  const [locations, setLocations] = useState([]);
  const [enviroDay, setEnviroDay] = useState([]);
  const [envirotime, setEnviroTime] = useState([]);
  const [envirodate, setEnviroDate] = useState([]);
  const [enviropm25, setEnviroPM25] = useState([]);
  const [enviropm10, setEnviroPM10] = useState([]);
  const [enviroso2, setEnviroSO2] = useState([]);
  const [enviroAQI, setEnviroAQI] = useState([]);
  const [enviroNO2, setEnviroNO2] = useState([]);

  const [loading, setLoading] = useState(true);
  const [serverDown, setServerDown] = useState(false);
  const [ReportVisible, setReportVisible] = useState(false);
  const [uploadDialogVisible, setUploadDialogVisible] = useState(false);

  const [aqiStats, setAqiStats] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const locationsResponse = await axios.get(
          `https://api-csi.arahas.com/aqi/locations`
        );
        if (locationsResponse.data) {
          const locationOptions = locationsResponse.data.data.map((data) => ({
            label: data,
            value: data,
          }));
          setLocations(locationOptions);
        } else {
          setLocations([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const start = new Date(startDate).toDateString("en-CA");
      const end = new Date(endDate).toDateString("en-CA");

      const response = await axios.get(
        `https://api-csi.arahas.com/aqi?location=${selectedLocation}&startDate=${start}&endDate=${end}`
      );
      console.log("🚀 ~ handleSearch ~ response:", response);
      const filteredData = response.data.data;

      const formattedDate = [];
      const formattedTime = [];
      const dayArray = [];
      const pm25 = [];
      const pm10 = [];
      const SO2 = [];
      const AQI = [];
      const NO2 = [];

      filteredData.forEach((item) => {
        const dateObj = new Date(item.Date_time); // No toLocaleDateString here

        // const days = [
        //   "Sunday",
        //   "Monday",
        //   "Tuesday",
        //   "Wednesday",
        //   "Thursday",
        //   "Friday",
        //   "Saturday",
        // ];
        // const dayOfWeek = days[dateObj.getDay()];
        const dayOfWeekNumber = dateObj.getDay();
        dayArray.push(dayOfWeekNumber);
        formattedDate.push(
          dateObj.toLocaleDateString("en-CA", {
            timeZone: "Asia/Kolkata",
          })
        );

        const timeObj = new Date(item.Date_time).toLocaleTimeString("en-IN", {
          hour12: false,
        });
        formattedTime.push(timeObj);

        pm25.push(item.pm25);
        pm10.push(item.pm10);
        SO2.push(item.SO2);
        AQI.push(item.CalculatedAqi);
        NO2.push(item.NO2);
      });
      setEnviroTime(formattedTime);
      setEnviroDate(formattedDate);
      setEnviroDay(dayArray);
      setEnviroPM25(pm25);
      setEnviroPM10(pm10);
      setEnviroSO2(SO2);
      setEnviroNO2(NO2);
      setEnviroAQI(AQI);

      if (filteredData.length > 0) {
        const averageAqi = Math.round(
          filteredData.reduce((sum, item) => sum + item.CalculatedAqi, 0) /
            filteredData.length
        );
        const averagepm25 = (
          filteredData.reduce((sum, item) => sum + item.pm25, 0) /
          filteredData.length
        ).toFixed(2);
        const averagepm10 = (
          filteredData.reduce((sum, item) => sum + item.pm10, 0) /
          filteredData.length
        ).toFixed(2);
        setPM25value(averagepm25);
        setPM10value(averagepm10);
        setAqiValue(averageAqi);

        setAqiStatus(getAqiStatus(averageAqi));
      } else {
        setAqiValue(null);
        setAqiStatus({ status: "", color: "", textColor: "", image: null });
      }

      const calculateAqiStats = (filteredData) => {
        if (filteredData.length === 0) return {};

        const aqiValues = filteredData.map((item) => item.CalculatedAqi);
        const pm25Values = filteredData.map((item) => item.pm25);
        const pm10Values = filteredData.map((item) => item.pm10);
        const dateTimeValues = filteredData.map(
          (item) => new Date(item.Date_time)
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
      setAqiStats(calculateAqiStats(filteredData));

      const filteredDataWithDeviation = filteredData
        .filter((item) => item.CalculatedAqi > 400)
        .map((item) => ({
          date: formatDate(new Date(item.Date_time)),
          time: formatTimeToHHMMSS(new Date(item.Date_time)),
          aqi: item.CalculatedAqi,
          deviationPercentage:
            (((item.CalculatedAqi - 400) / 400) * 100).toFixed(2) + "%",
        }));

      const uniqueDataTableData = Array.from(
        new Set(filteredDataWithDeviation.map(JSON.stringify))
      ).map(JSON.parse);
      setDataTableData(uniqueDataTableData);
    } catch (error) {
      console.log("🚀 ~ handleSearch ~ error:", error);
      setLoading(false);
      setServerDown(true);
    } finally {
      setLoading(false);
    }
  };

  const resetFilters = () => {
    setSelectedLocation(null);
    setStartDate(null);
    setEndDate(null);
  };

  function formatTimeToHHMMSS(isoDateString) {
    const dateObj = new Date(isoDateString).toLocaleTimeString();
    return dateObj;
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-CA", {
      timeZone: "Asia/Kolkata",
    });
  };

  const getAqiStatus = (aqi) => {
    if (aqi > 0 && aqi <= 50) {
      return {
        status: "GOOD",
        color: "#086d43",
        textColor: "white",
        image: good,
        bg_color: colors.good,
      };
    } else if (aqi > 50 && aqi <= 100) {
      return {
        status: "SATISFACTORY",
        color: "#669138",
        textColor: "black",
        image: moderate,
        bg_color: colors.moderate,
      };
    } else if (aqi > 100 && aqi <= 200) {
      return {
        status: "MODERATELY POLLUTED",
        color: "#b27909",
        textColor: "black",
        image: poor,
        bg_color: colors.yellow,
      };
    } else if (aqi > 200 && aqi <= 300) {
      return {
        status: "POOR",
        color: "#C7253E",
        textColor: "white",
        image: unhealthy,
        bg_color: colors.warning,
      };
    } else if (aqi > 300 && aqi <= 400) {
      return {
        status: "VERY POOR",
        color: "#b81b1d",
        textColor: "white",
        image: severe,
        bg_color: colors.poor,
      };
    } else if (aqi > 400) {
      return {
        status: "SEVERE",
        color: "#600e0f",
        textColor: "white",
        image: hazardous,
        bg_color: colors.veryPoor,
      };
    }
  };

  const { status: aqiStatusText, image: aqiImage } = aqiStatus;

  const rowClassName = (data) => {
    return parseFloat(data.deviationPercentage) > 10 ? "red-row" : "";
  };
  const showUploadDialog = () => {
    setUploadDialogVisible(true);
  };

  const hideUploadDialog = () => {
    setUploadDialogVisible(false);
  };

  const renderRecommendations = () => {
    return (
      <AQIRecommendations aqi={aqiValue} pm25={pm25Value} pm10={pm10Value} />
    );
  };

  const renderDashboard = () => {
    return <AqiDashboard show={false} />;
  };
  const [score, setScore] = useState(null);
  const [scoreColor, setScoreColor] = useState("#000");

  const handleScoreCalculated = (calculatedScore) => {
    setScore(calculatedScore);
    // console.log("Calculated Score received in Dashboard:", calculatedScore);
    // Update the score color based on the calculated score
    const color = getScoreColor(calculatedScore);
    setScoreColor(color);
    // You can also perform additional actions with the score here
  };

  const getScoreColor = (aqiScore) => {
    if (aqiScore === 100) {
      return colors.good; // Green for Excellent
    } else if (aqiScore === 80) {
      return colors.moderate; //  Green for good
    } else if (aqiScore === 60) {
      return colors.yellow; // Yellow for moderate
    } else if (aqiScore === 40) {
      return colors.warning; // Yellow for below moderate
    } else if (aqiScore === 20) {
      return colors.poor; // Red for poor
    } else if (aqiScore === 0) {
      return colors.veryPoor; // Red for Severe
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
    <div className="flex flex-column gap-3 w-full p-4">
      {show && (
        <div className="flex align-items-center justify-content-between gap-3">
          <div className="flex align-items-center justify-content-between w-full">
            {/* Title & Score */}
            <AqiScoreCalculator onAQIScoreCalculated={handleScoreCalculated} />
            {score !== null && (
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
                    backgroundColor: scoreColor,
                    clipPath:
                      "polygon(100% 0%, 87% 51%, 100% 100%, 0 100%, 0% 50%, 0 0)",
                  }}
                >
                  <h1
                    className="m-0 p-0 text-white text-2xl font-semibold"
                    style={{ zIndex: 1500 }}
                  >
                    Air Quality Index
                  </h1>
                  <p
                    className="m-0 p-2 text-primary1 text-xl font-bold border-circle bg-white mr-7"
                    style={{ zIndex: 1500 }}
                  >
                    {score}
                  </p>
                </div>
              </div>
            )}
            {/* Selected  location & Date */}
            <div className="flex align-items-start flex-column gap-1">
              {/* location */}
              <div className="flex align-items-center gap-1">
                <i className="pi pi-map-marker text-primary1 font-medium text-sm"></i>
                <p className="m-0 p-0 text-primary1 font-medium text-sm">
                  {selectedLocation || "Select a location"}
                </p>
              </div>
              <Divider className="m-0 p-0" />
              {/* Date Range */}
              <div className="flex align-items-center justify-content-start gap-1">
                <i className="pi pi-calendar text-primary1 font-medium text-sm"></i>
                <p className="m-0 p-0 text-primary1 font-medium text-sm">
                  {startDate ? startDate.toLocaleDateString() : "Start Date"} -{" "}
                  {endDate ? endDate.toLocaleDateString() : "End Date"}
                </p>
              </div>
            </div>
          </div>
          <div className="flex align-ites-center justify-content-end gap-2">
            <Button
              tooltip="Filters"
              tooltipOptions={{
                position: "bottom",
              }}
              icon="pi pi-filter"
              onClick={(e) => overlayRef.current.toggle(e)}
              className="bg-white text-secondary2"
              raised
            />
            <OverlayPanel
              ref={overlayRef}
              style={{ width: "20rem" }}
              className="p-overlay-panel"
            >
              <div className="flex flex-column gap-3">
                <div className="flex flex-column">
                  <label htmlFor="location" className="font-semibold text">
                    Location
                  </label>
                  <Dropdown
                    value={selectedLocation}
                    options={locations}
                    optionLabel="label"
                    optionValue="value"
                    onChange={(e) => setSelectedLocation(e.value)}
                    placeholder="Select Location"
                  />
                </div>
                <div className="p-field text-sm flex flex-column">
                  <label htmlFor="dateRange" className="font-semibold text">
                    Select Date Range
                  </label>
                  <Calendar
                    id="dateRange"
                    value={[startDate, endDate]} // Pass selected date range as an array
                    onChange={(e) => {
                      const [newStartDate, newEndDate] = e.value; // Destructure range
                      setStartDate(newStartDate);
                      setEndDate(newEndDate);
                    }}
                    selectionMode="range"
                    showIcon
                    dateFormat="dd-mm-yy"
                    placeholder="Select date range"
                    showButtonBar
                    hideOnRangeSelection
                  />
                </div>
                <div className="flex justify-content-between">
                  <Button
                    className="bg-white text-secondary2"
                    label="Reset"
                    // icon="pi pi-search"
                    onClick={resetFilters}
                    raised
                  />
                  <Button
                    className="bg-primary1"
                    label="Apply"
                    // icon="pi pi-search"
                    onClick={handleSearch}
                    raised
                  />
                </div>
              </div>
            </OverlayPanel>
            <Button
              icon="pi pi-plus"
              className="bg-white text-secondary2"
              onClick={showUploadDialog}
              raised
              tooltip="Upload Data"
              tooltipOptions={{
                position: "bottom",
              }}
            />
            <Upload
              visible={uploadDialogVisible}
              onHide={hideUploadDialog}
              parameter={"aqinew"}
            />
            <Button
              tooltip="Generate Report"
              tooltipOptions={{
                position: "bottom",
              }}
              icon="pi pi-file"
              onClick={() => setReportVisible(true)}
              // className="bg-white text-cyan-800 border-1 border-cyan-800"
              className=" bg-primary1 text-white"
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
      )}
      <div className="flex flex-wrap md:flex-nowrap align-items-end w-full gap-4">
        {selectedLocation && (
          <div
            className="flex border-round-xl p-2 justify-content-between"
            style={{
              backgroundColor: aqiStatus.bg_color,
              border: `1px solid ${aqiStatus.color}`,
              flex: "20%",
            }}
          >
            <div className="flex flex-column align-items-center justify-content-between">
              <h1 className="card-title text-white m-0 p-0">AQI</h1>
              <h1
                className="text-3xl font-medium p-0 m-0 text-white"
                // style={{ color: aqiStatus.color }}
              >
                {/* <p className="p-0 m-0 text-sm">{selectedLocation}</p> */}
                {aqiValue !== null ? `${aqiValue}` : "No Data Found."}
              </h1>
              <Tag
                className="border-round-3xl"
                style={{ backgroundColor: aqiStatus.color, color: "white" }}
              >
                <span className="text-xs">
                  {aqiStatus.status || "No Status"}{" "}
                </span>
              </Tag>
            </div>
            {/* <h1
                  className={`border-round-2xl py-2 px-3 text-xs text-white text-left`}
                  style={{ backgroundColor: aqiStatus.color }}
                >
                  {aqiStatus.status || "No Status"}
                </h1> */}

            {aqiImage && (
              <img src={aqiImage} alt={aqiStatusText} className="h-14rem" />
            )}
          </div>
        )}
        <div style={{ flex: "30%" }}>
          {loading ? (
            <div className="w-full">
              <TableSkeleton />
            </div>
          ) : (
            <DataTable
              value={dataTableData}
              rowClassName={rowClassName}
              className="custom-row"
              scrollable
              scrollHeight="15rem"
              style={{
                width: "100%",
                borderRadius: "15px",
                overflow: "hidden",
                // scrollbarWidth: "none",
                padding: 2,
              }}
              emptyMessage="No Outlier Days Found."
            >
              <Column
                field="aqi"
                header="AQI"
                className="font-semibold text-left text-lg"
                headerStyle={{
                  fontSize: "0.6rem",
                  backgroundColor: "#166c7d",
                  color: "white",
                  padding: 3,
                }}
              ></Column>
              <Column
                field="date"
                header="Date"
                className="text-left"
                headerStyle={{
                  fontSize: "0.2rem",
                  backgroundColor: "#166c7d",
                  color: "white",
                  padding: 3,
                }}
              ></Column>
              <Column
                field="time"
                header="Time"
                className="text-left"
                headerStyle={{
                  fontSize: "0.6rem",
                  backgroundColor: "#166c7d",
                  color: "white",
                  padding: 3,
                }}
              />

              <Column
                field="deviationPercentage"
                header="Outlier %"
                className="text-lg font-semibold text-left"
                style={{ width: "20%" }}
                headerStyle={{
                  fontSize: "0.6rem",
                  backgroundColor: "#166c7d",
                  color: "white",
                  padding: 3,
                }}
              ></Column>
            </DataTable>
          )}
        </div>

        <div className="flex bg-white border-round-2xl" style={{ flex: "25%" }}>
          <AqiMap averageAQI={aqiValue} selectedLocation={selectedLocation} />
        </div>
        <div
          className="flex flex-column bg-white border-round p-3 gap-3 overflow-y-auto "
          style={{ flex: "30%" }}
        >
          {/* Insights */}
          {aqiStats && (
            <div className="flex flex-column bg-white border-round h-13rem p-3 gap-3 overflow-y-auto">
              <p className="card-title p-0 m-0">Insights</p>
              <div className="flex flex-column align-items-start justify-content-start gap-2">
                <li className="p-0 m-0 text-primary1 font-medium text-sm">
                  A total of{" "}
                  <span className="m-0 p-0 font-semibold text-sm text-red-500">
                    {dataTableData.length}
                  </span>{" "}
                  outlier readings have been recorded, indicating that the AQI
                  exceeds the safe limit of 400.
                </li>
              </div>

              <div className="flex flex-column align-items-start justify-content-start gap-2">
                <li className="p-0 m-0 text-primary1 font-medium text-sm">
                  During the selected period, the highest recorded AQI was{" "}
                  <span className="m-0 p-0 font-semibold text-sm text-red-500">
                    {aqiStats.max.value}
                  </span>{" "}
                  on{" "}
                  <span className="m-0 p-0 font-semibold text-sm ">
                    {aqiStats.max.dateTime}
                  </span>{" "}
                  . This spike in AQI was primarily driven by elevated levels of
                  PM2.5, which measured{" "}
                  <span className="m-0 p-0 font-semibold text-sm">
                    {aqiStats.max.pm25}
                  </span>{" "}
                  µg/m³, and PM10 at{" "}
                  <span className="m-0 p-0 font-semibold text-sm">
                    {aqiStats.max.pm10}
                  </span>{" "}
                  µg/m³. These high concentrations of particulate matter
                  significantly contributed to the poor air quality observed.
                </li>
              </div>
              <div className="flex flex-column align-items-start justify-content-start gap-2">
                <li className="p-0 m-0 text-primary1 font-medium text-sm">
                  Conversely, the lowest AQI recorded was{" "}
                  <span className="m-0 p-0 font-semibold text-sm text-green-500">
                    {aqiStats.min.value}
                  </span>{" "}
                  on{" "}
                  <span className="m-0 p-0 font-semibold text-sm ">
                    {aqiStats.min.dateTime}
                  </span>{" "}
                  . During this time, both PM2.5 and PM10 levels were notably
                  lower, with PM2.5 at{" "}
                  <span className="m-0 p-0 font-semibold text-sm">
                    {aqiStats.min.pm25}
                  </span>{" "}
                  µg/m³ and PM10 at{" "}
                  <span className="m-0 p-0 font-semibold text-sm">
                    {aqiStats.min.pm10}
                  </span>{" "}
                  µg/m³. The reduced presence of these pollutants resulted in a
                  significant improvement in air quality.
                </li>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-3 w-full">
        {" "}
        <AQIChart
          enviroDate={envirodate}
          envirotime={envirotime}
          enviroAQI={enviroAQI}
          startDate={startDate}
          enviroDay={enviroDay}
        />
      </div>

      <div className="flex align-items-center justify-content-center flex-wrap md:flex-nowrap w-full gap-3">
        <div className="flex gap-3 w-full bg-white border-round p-4">
          <PollutantChart
            envirodate={envirodate}
            envirotime={envirotime}
            pollutantData={enviropm25}
            pollutantName="PM2.5"
            baseChartColor="#F7A47A"
            drilldownChartColor="#FFC107"
            height={200}
            safeLimit={60}
          />
        </div>
        <div className="flex gap-3 w-full bg-white border-round p-4">
          <PollutantChart
            envirodate={envirodate}
            envirotime={envirotime}
            pollutantData={enviropm10}
            pollutantName="PM10"
            baseChartColor="#47B881"
            drilldownChartColor="#80CBC4"
            height={200}
            safeLimit={100}
          />
        </div>
        <div className="flex gap-3 w-full bg-white border-round p-4">
          <PollutantChart
            envirodate={envirodate}
            envirotime={envirotime}
            pollutantData={enviroNO2}
            pollutantName="NO2"
            baseChartColor="#FFDD82"
            drilldownChartColor="#E57373"
            height={200}
            safeLimit={80}
          />
        </div>
        <div className="flex gap-3 w-full bg-white border-round p-4">
          <PollutantChart
            envirodate={envirodate}
            envirotime={envirotime}
            pollutantData={enviroso2}
            pollutantName="SO2"
            baseChartColor="#C68FE6"
            drilldownChartColor="#FFF176"
            height={200}
            safeLimit={80}
          />
        </div>
      </div>
      <RecommendationPanel
        show={true}
        renderRecommendations={renderRecommendations}
        // selectedLocation={selectedLocation}
      />
    </div>
  );
};

export default AqiDashboard;
