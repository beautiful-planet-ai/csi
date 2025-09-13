import React, { useState, useEffect } from "react";
import { Calendar } from "primereact/calendar";
import axios from "axios";
import { Dropdown } from "primereact/dropdown";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "../../../DashboardUtility/Dash.css";
import sunny from "assets/dashboard/Temperature- Below 40.svg";
import warm from "assets/dashboard/Temperature- Above 40.svg";
import { Button } from "primereact/button";
import TableSkeleton from "../../../DashboardUtility/skeletons/TableSkeleton";
import TempMap from "./TempMap";
import Temperature from "./Temperature";
import { Tag } from "primereact/tag";
import { Dialog } from "primereact/dialog";
import TempRecommendations from "./TempRecommendations";
import ReportPrint from "components/DashboardUtility/ReportPrint";
import RecommendationPanel from "components/DashboardUtility/RecommendationPanel";
import { ProgressSpinner } from "primereact/progressspinner";
import { OverlayPanel } from "primereact/overlaypanel";
import { useRef } from "react";
import { Divider } from "primereact/divider";
import score from "components/DashboardUtility/Constants/score";
import DataNotFound from "pages/error pages/ServerDown";

const TempDashboard = ({ show }) => {
  const [startDate, setStartDate] = useState(new Date("2025-01-01"));
  const [endDate, setEndDate] = useState(new Date("2025-01-24"));
  const [selectedLocation, setSelectedLocation] = useState(
    "Ayodhya - Civil line,Tiny tots"
  );
  const [tempValue, setTempValue] = useState(null);
  const [humidityValue, setHumidityvalue] = useState(null);
  const [tempStatus, setTempStatus] = useState({
    status: "",
    color: "",
    textColor: "",
    image: null,
  });
  const [dataTableData, setDataTableData] = useState([]);
  const [locations, setLocations] = useState([]);
  const [envirotime, setEnviroTime] = useState([]);
  const [envirodate, setEnviroDate] = useState([]);
  const [enviroco2, setEnviroco2] = useState([]);
  const [temperature, setTemp] = useState([]);
  const [humidity, setHumidity] = useState([]);

  const [loading, setLoading] = useState(true);
  const [serverDown, setServerDown] = useState(false);

  const [ReportVisible, setReportVisible] = useState(false);
  const overlayRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const locationsResponse = await axios.get(
          `https://api-csi.arahas.com/data/locations`
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
      // overlayRef.current.hide();
      const start = new Date(startDate).toDateString("en-CA");
      const end = new Date(endDate).toDateString("en-CA");

      const response = await axios.get(
        `https://api-csi.arahas.com/data/environment?location=${selectedLocation}&startDate=${start}&endDate=${end}`
      );
      const filteredData = response.data.data;

      const formattedDate = [];
      const formattedTime = [];
      const co2 = [];
      const temperature = [];
      const humidity = [];

      filteredData.forEach((item) => {
        const dateObj = new Date(item.date_time).toLocaleDateString("en-CA", {
          timeZone: "Asia/Kolkata",
        });
        formattedDate.push(dateObj);

        const timeObj = new Date(item.date_time).toLocaleTimeString("en-IN", {
          hourCycle: "h24",
        });
        formattedTime.push(timeObj);
        co2.push(item.co2);
        temperature.push(item.temp);
        humidity.push(item.humidity);
      });
      setEnviroTime(formattedTime);
      setEnviroDate(formattedDate);
      setEnviroco2(co2);
      setTemp(temperature);
      setHumidity(humidity);

      if (filteredData.length > 0) {
        const averageTemp = (
          filteredData.reduce((sum, item) => sum + item.temp, 0) /
          filteredData.length
        ).toFixed(2);
        const averageHumidity = (
          filteredData.reduce((sum, item) => sum + item.humidity, 0) /
          filteredData.length
        ).toFixed(2);

        setTempValue(averageTemp);
        setHumidityvalue(averageHumidity);
        setTempStatus(getTempStatus(averageTemp));
      } else {
        setTempValue(null);
        setTempStatus({ status: "", color: "", textColor: "", image: null });
      }
      const filteredDataWithDeviation = filteredData
        .filter((item) => item.temp > 40)
        .map((item) => ({
          date: formatDate(new Date(item.date_time)),
          time: formatTimeToHHMMSS(new Date(item.date_time)),
          temp: item.temp + ` °C`,
          deviationPercentage: (((item.temp - 40) / 40) * 100).toFixed(2) + "%",
        }));

      const uniqueDataTableData = Array.from(
        new Set(filteredDataWithDeviation.map(JSON.stringify))
      ).map(JSON.parse);
      console.log(uniqueDataTableData);
      setDataTableData(uniqueDataTableData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setServerDown(true);
      setLoading(false);
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
    return new Date(date).toLocaleDateString("en-CA");
  };

  const getTempStatus = (temp) => {
    if (temp > 0 && temp <= 40) {
      return {
        status: "MODERATE",
        color: "#E78F81",
        textColor: "black",
        image: sunny,
        bg_color: "#F8EDE3",
      };
    } else if (temp > 40) {
      return {
        status: "VERY HOT",
        color: "rgba(230, 34, 37, 1)",
        textColor: "white",
        image: warm,
        bg_color: "#EBC49F",
      };
    }
  };

  const { status: tempStatusText, image: tempImage } = tempStatus;

  const rowClassName = (data) => {
    return parseFloat(data.deviationPercentage) > 2 ? "red-row" : "";
  };

  const renderRecommendations = () => {
    return (
      <TempRecommendations temperature={tempValue} humidity={humidityValue} />
    );
  };

  const renderDashboard = () => {
    return <TempDashboard show={false} />;
  };

  const scoreTEMP = score.TEMP;

  const getScoreColor = (scoreTEMP) => {
    if (scoreTEMP >= 81 && scoreTEMP <= 100) {
      return "#0C9D61"; // Green for good
    } else if (scoreTEMP >= 41 && scoreTEMP <= 80) {
      return "#FFAD0D"; // Yellow for moderate
    } else if (scoreTEMP >= 0 && scoreTEMP <= 40) {
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
    <div className="flex flex-column gap-3 w-full p-4">
      {show && (
        <div className="flex align-items-center justify-content-between gap-3">
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
                  backgroundColor: getScoreColor(scoreTEMP), // Replace with your desired color
                  clipPath:
                    "polygon(100% 0%, 87% 51%, 100% 100%, 0 100%, 0% 50%, 0 0)",
                }}
              >
                <h1
                  className="m-0 p-0 text-white text-2xl font-semibold"
                  style={{ zIndex: 1500 }}
                >
                  Temperature
                </h1>
                <p
                  className="m-0 p-2 text-primary1 text-xl font-bold border-circle bg-white mr-7"
                  style={{ zIndex: 1500 }}
                >
                  {scoreTEMP}
                </p>
              </div>
            </div>
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
          <div className="flex align-items-center justify-content-end gap-2">
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
              <ReportPrint
                renderDashboard={renderDashboard}
                renderRecommendations={renderRecommendations}
                parameter={"temperature"}
                heading={"Temperature"}
              />
            </Dialog>
          </div>
        </div>
      )}
      {/* <Dialog
        header="Recommendations"
        visible={RecommendationVisible}
        style={{ width: "70rem" }}
        onHide={() => {
          if (!RecommendationVisible) return;
          setRecommendationsVisible(false);
        }}
      >
        <TempRecommendations temperature={tempValue} humidity={humidityValue} />
      </Dialog> */}
      {/* <TempReportPrint
          show={true}
          selectedLocation={selectedLocation}
          startDate={startDate}
          endDate={endDate}
        /> */}
      <div className="flex flex-wrap md:flex-nowrap align-items-center w-full gap-3">
        {selectedLocation && (
          <div
            className="flex border-round-xl p-2"
            style={{
              backgroundColor: tempStatus.bg_color,
              border: `1px solid ${tempStatus.color}`,
              flex: "15%",
            }}
          >
            <div className="flex flex-column align-items-center justify-content-between">
              <h1 className="card-title m-0 p-0">Temperature</h1>
              <h1
                className="text-2xl font-medium p-0 m-0"
                style={{ color: tempStatus.color }}
              >
                {tempValue !== null ? `${tempValue} °C` : "No Data Found."}
              </h1>
              <Tag
                className="border-round-3xl"
                style={{ backgroundColor: tempStatus.color, color: "white" }}
              >
                <span className="text-xs">
                  {tempStatus.status || "No Status"}{" "}
                </span>
              </Tag>
            </div>
            {tempImage && (
              <img src={tempImage} alt={tempStatusText} className="h-14rem" />
            )}
            {/* <h1
                          className={`border-round-xs p-1 text-xs text-white w-6rem`}
                          style={{ backgroundColor: tempStatus.color }}
                        >
                          {tempStatus.status || "No Status"}
                        </h1> */}
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
                field="date"
                header="Date"
                className="text-sm font-semibold text-left"
                headerStyle={{
                  fontSize: "0.6rem",
                  backgroundColor: "#166c7d",
                  color: "white",
                  padding: 4,
                }}
              ></Column>
              <Column
                field="time"
                header="Time"
                className="text-sm text-left"
                headerStyle={{
                  fontSize: "0.6rem",
                  backgroundColor: "#166c7d",
                  color: "white",
                  padding: 4,
                }}
              />
              <Column
                field="temp"
                header="Temperature > 40°C"
                className="text-left"
                headerStyle={{
                  fontSize: "0.6rem",
                  backgroundColor: "#166c7d",
                  color: "white",
                  padding: 4,
                }}
              ></Column>
              <Column
                field="deviationPercentage"
                header="Outlier %"
                className="font-semibold text-left"
                headerStyle={{
                  fontSize: "0.6rem",
                  backgroundColor: "#166c7d",
                  color: "white",
                  padding: 4,
                }}
              ></Column>
            </DataTable>
          )}
        </div>
        <div className="border-round-2xl flex bg-white" style={{ flex: "28%" }}>
          <TempMap
            averageTemp={tempValue}
            selectedLocation={selectedLocation}
          />
        </div>
        <div
          className="flex flex-column p-3 border-round bg-white gap-2 overflow-y-auto h-15rem"
          style={{ flex: "27%" }}
        >
          <p className="card-text p-0 m-0">Insights:</p>
          <li className="p-0 m-0 text-primary1 font-medium text-sm">
            The temperature shows significant spikes during May-June and again
            in September 2024, reaching above 40°C on multiple occasions. These
            extreme heat patterns indicate a need for heat adaptation strategies
            in the region.
          </li>
          <li className="p-0 m-0 text-primary1 font-medium text-sm">
            The “Feels Like” temperature consistently tracks above the actual
            temperature throughout the year, peaking in summer months. This
            indicates the potential effect of humidity or wind speed on
            perceived heat, requiring better urban heat management strategies,
            especially for vulnerable populations.
          </li>
          <li className="p-0 m-0 text-primary1 font-medium text-sm">
            CO₂ levels sharply increase during September, likely due to specific
            activities (industrial, agricultural burning, or transportation).
            Addressing these seasonal spikes could significantly reduce overall
            emissions.
          </li>
          <li className="p-0 m-0 text-primary1 font-medium text-sm">
            There appears to be a visible correlation between increasing
            temperatures and higher CO₂ levels. This suggests that local
            emissions or environmental conditions might be influencing both
            metrics simultaneously.
          </li>
          <li className="p-0 m-0 text-primary1 font-medium text-sm">
            A cooling trend is observed toward the end of the year
            (December-January), with temperatures dropping closer to 20°C,
            showing a distinct seasonal climate variation. This period could be
            utilized for public events or maintenance activities.
          </li>
          <li className="p-0 m-0 text-primary1 font-medium text-sm">
            A recurring pattern of outliers above 40°C is visible, particularly
            between May and September. These extreme temperature days are likely
            to strain energy resources (cooling demands) and public health
            systems, requiring targeted heat wave preparedness plans.
          </li>
        </div>
      </div>
      <div className="flex align-items-center justify-content-between w-full">
        <Temperature
          enviroDate={envirodate}
          envirotime={envirotime}
          temperature={temperature}
          humidity={humidity}
          enviroco2={enviroco2}
          startDate={startDate}
        />
      </div>
      {/* <div className="w-100 flex align-items-center justify-content-center gap-1">
              <Card className="h-15rem w-17rem">
                <PollutantChart
                  envirolocation={envirolocation}
                  envirodate={envirodate}
                  envirotime={envirotime}
                  pollutantData={enviropm25}
                  selectedLocation={selectedLocation}
                  pollutantName="PM2.5"
                  baseChartColor="#FF5722"
                  drilldownChartColor="#FFC107"
                  height={200}
                  width={220}
                  safeLimit={60}
                />
              </Card>
              <Card className="h-15rem w-17rem ">
                <PollutantChart
                  envirolocation={envirolocation}
                  envirodate={envirodate}
                  envirotime={envirotime}
                  pollutantData={enviropm10}
                  selectedLocation={selectedLocation}
                  pollutantName="PM10"
                  baseChartColor="#4DB6AC"
                  drilldownChartColor="#80CBC4"
                  height={200}
                  width={220}
                  safeLimit={100}
                />
              </Card>
              <Card className="h-15rem w-17rem">
                <PollutantChart
                  envirolocation={envirolocation}
                  envirodate={envirodate}
                  envirotime={envirotime}
                  pollutantData={enviroNO2}
                  selectedLocation={selectedLocation}
                  pollutantName="NO2"
                  baseChartColor="#F44336"
                  drilldownChartColor="#E57373"
                  height={200}
                  width={220}
                  safeLimit={80}
                />
              </Card>
              <Card className="h-15rem w-17rem">
                <PollutantChart
                  envirolocation={envirolocation}
                  envirodate={envirodate}
                  envirotime={envirotime}
                  pollutantData={enviroso2}
                  selectedLocation={selectedLocation}
                  pollutantName="SO2"
                  baseChartColor="#FFEB3B"
                  drilldownChartColor="#FFF176"
                  height={200}
                  width={220}
                  safeLimit={80}
                />
              </Card>
            </div> */}
      {/* {show && (
            <>
              <div className="flex align-items-center justify-content-start mt-2">
                <Card className="h-15rem w-6">
                  <CustomBarChart
                    title="Human Loss by Age Group and Gender"
                    categories={categories}
                    series={series}
                    height={200}
                    width={500}
                    xtitle="Age Group"
                    ytitle="Number of Losses"
                  />
                </Card>
                <Card className="h-15rem w-6 ml-1 ">
                  <DonutChart
                    title={"Health Impact of NO2"}
                    labels={NO2impactlabels}
                    series={NO2Impactseries}
                    height={200}
                    width={300}
                  />
                </Card>
              </div>
            </>
          )} */}
      <RecommendationPanel
        show={true}
        renderRecommendations={renderRecommendations}
      />
    </div>
  );
};

export default TempDashboard;
