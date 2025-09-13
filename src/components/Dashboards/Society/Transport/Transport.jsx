import React, { useState } from "react";
import { ColumnChart, Doughnut, LineChart } from "Layout/GraphVisuals";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Dialog } from "primereact/dialog";
import bus from "assets/bus.svg";
import TransportRecommendations from "./TransportRecommendations";
import { Dropdown } from "primereact/dropdown";
import { useEffect } from "react";
import axios from "axios";
import Upload from "../../../DashboardUtility/Popups/Upload";
import buss from "assets/buss.svg";
import rickshaw from "assets/rickshaw.svg";
import bike from "assets/bike.svg";
import ReportPrint from "components/DashboardUtility/ReportPrint";
import RecommendationPanel from "components/DashboardUtility/RecommendationPanel";
import TransportModify from "./TransportModify";
import { ProgressSpinner } from "primereact/progressspinner";
import { useUser } from "components/context/UserContext";
import { OverlayPanel } from "primereact/overlaypanel";
import { useRef } from "react";
import { Menu } from "primereact/menu";
import ServerDown from "pages/error pages/ServerDown";
import { getScoreColor } from "components/DashboardUtility/scoreColor";

const Transport = ({ show }) => {
  const [ReportVisible, setReportVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverDown, setServerDown] = useState(false);
  const [data, setData] = useState([]);
  const [displayValues, setDisplayValues] = useState("");
  const [selectedValues, setSelectedValues] = useState({
    route: "Rikabgunj to Nihawa Road",
    year: 2024,
    month: 1,
  });
  const overlayRef = useRef(null); // Reference for OverlayPanel
  const menu = useRef(null); // Create a ref for the Menu component

  // Define menu items
  const items = [
    {
      label: "Upload",
      icon: "pi pi-upload",
      command: () => showUploadDialog(), // Implement your upload logic here
    },
    {
      label: "Modify",
      icon: "pi pi-pencil",
      command: () => handleModify(), // Implement your modify logic here
    },
  ];
  const [tempRoute, setTempRoute] = useState("Rikabgunj to Nihawa Road");
  const [tempYear, setTempYear] = useState(2024);
  const [tempMonth, setTempMonth] = useState(1);

  // const [busData, setBusData] = useState([]);
  const [busMaint, setBusMaint] = useState([]);
  const [busTypeData, setBusTypeData] = useState([]);

  const vehicleLables = ["Electric", "Hybrid", "Petrol", "Diesel"];

  const labels = ["Q1", "Q2", "Q3", "Q4"];
  const { username, transportScore, setTransportScore } = useUser();
  console.log("🚀 ~ Transport ~ username:", username);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://api-csi.arahas.com/data/transport"
        );

        const responseData = response.data.data;

        const filteredData = responseData.filter(
          (item) =>
            item.Route_Name === selectedValues.route &&
            item.Year === selectedValues.year &&
            item.Month === selectedValues.month
        );
        const totalValues = filteredData.reduce((acc, curr) => {
          return {
            ...acc,
            No_of_Public_Buses:
              (acc.No_of_Public_Buses || 0) + curr.No_of_Public_Buses,
            No_of_Semi_Public_Buses:
              (acc.No_of_Semi_Public_Buses || 0) + curr.No_of_Semi_Public_Buses,
            Total_coaches_on_any_day:
              (acc.Total_coaches_on_any_day || 0) +
              curr.Total_coaches_on_any_day,
            Electric: (acc.Electric || 0) + curr.Electric,
            Hybrid: (acc.Hybrid || 0) + curr.Hybrid,
            Diesel: (acc.Diesel || 0) + curr.Diesel,
            Petrol: (acc.Petrol || 0) + curr.Petrol,
          };
        }, {});

        const indicator1 =
          (totalValues.No_of_Public_Buses /
            (totalValues.No_of_Public_Buses +
              totalValues.No_of_Semi_Public_Buses)) *
          100;

        const indicator2 = totalValues.Total_coaches_on_any_day / 221118;

        const indicator3 =
          (totalValues.Electric /
            (totalValues.Electric +
              totalValues.Hybrid +
              totalValues.Petrol +
              totalValues.Diesel)) *
          100;

        const calculateScore1 = (indicator1) => {
          if (indicator1 < 20) return 25;
          if (indicator1 >= 20 && indicator1 < 40) return 50;
          if (indicator1 >= 40 && indicator1 < 60) return 75;
          if (indicator1 >= 60) return 100;
          return 0;
        };

        const calculateScore2 = (indicator2) => {
          if (indicator2 < 0.2) return 25;
          if (indicator2 >= 0.2 && indicator2 < 0.4) return 50;
          if (indicator2 >= 0.4 && indicator2 < 0.6) return 75;
          if (indicator2 >= 0.6) return 100;
          return 0;
        };

        const calculateScore3 = (indicator3) => {
          if (indicator3 < 25) return 25;
          if (indicator3 >= 25 && indicator3 <= 49) return 50;
          if (indicator3 >= 50 && indicator3 <= 74) return 75;
          if (indicator3 >= 75) return 100;
          return 0;
        };

        const score1 = calculateScore1(indicator1);
        const score2 = calculateScore2(indicator2);
        const score3 = calculateScore3(indicator3);

        const finalScore = ((score1 + score2 + score3) / 3).toFixed(0);
        setTransportScore(finalScore);

        setDisplayValues(filteredData[0]);
        console.log(filteredData);

        if (filteredData.length > 0) {
          setDisplayValues(filteredData[0]);

          // Prepare vehicle data for Doughnut chart
          const vehicleData = [
            filteredData[0].Electric,
            filteredData[0].Hybrid,
            filteredData[0].Diesel,
            filteredData[0].Petrol,
          ];
          setBusTypeData(vehicleData);
          // console.log(vehicleData);
        }

        const filteredBusDataMonthly = responseData.filter(
          (item1) =>
            item1.Route_Name === selectedValues.route &&
            item1.Year === selectedValues.year
        );
        // setBusData(filteredBusDataMonthly);
        const processBusData = (monthlyData) => {
          // Initialize an array to hold quarterly maintenance data
          const quarterlyData = [
            { quarter: 1, Buses_going_for_Maintenance: 0, Electric: 0 },
            { quarter: 2, Buses_going_for_Maintenance: 0, Electric: 0 },
            { quarter: 3, Buses_going_for_Maintenance: 0, Electric: 0 },
            { quarter: 4, Buses_going_for_Maintenance: 0, Electric: 0 },
          ];

          // Iterate through the monthly data
          monthlyData.forEach((item) => {
            const month = item.Month; // Assuming Month is a number from 1 to 12

            // Determine which quarter the month belongs to
            const quarterIndex = Math.floor((month - 1) / 3); // Calculate quarter index (0 for Q1, ..., 3 for Q4)

            // Aggregate the data for the corresponding quarter
            quarterlyData[quarterIndex].Buses_going_for_Maintenance +=
              item.Buses_going_for_Maintenance;
            quarterlyData[quarterIndex].Electric += item.Electric;
          });

          return quarterlyData;
        };
        // Process the monthly data to get quarterly data
        const quarterlyBusData = processBusData(filteredBusDataMonthly);
        setBusMaint(quarterlyBusData);
        setData(responseData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setServerDown(true);
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedValues]);

  const routes = [...new Set(data.map((item) => item.Route_Name))];
  const year = [...new Set(data.map((item) => item.Year))];

  const handleApply = () => {
    setSelectedValues({
      route: tempRoute,
      year: tempYear,
      month: tempMonth,
    });
    // setFilterVisible(false);
    overlayRef.current.hide(); // Hide overlay after applying filters
  };
  const resetFilters = () => {
    setSelectedValues({
      route: "Rikabgunj to Nihawa Road",
      year: 2024,
      month: 1,
    });
  };

  const [modifyDialogVisible, setModifyDialogVisible] = useState(false);

  const handleModify = () => {
    setModifyDialogVisible(true); // Set state to true when button is clicked
  };

  const handleCloseModifyDialog = () => {
    setModifyDialogVisible(false);
  };

  const [uploadDialogVisible, setUploadDialogVisible] = useState(false);

  const showUploadDialog = () => {
    setUploadDialogVisible(true);
  };

  const hideUploadDialog = () => {
    setUploadDialogVisible(false);
  };

  const renderRecommendations = () => {
    return <TransportRecommendations />;
  };

  const renderDashboard = () => {
    return <Transport show={false} />;
  };

  const bgColor = getScoreColor(transportScore);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return loading ? (
    <div className="flex h-screen align-items-center justify-content-center flex-column">
      <ProgressSpinner />
      <p className="font-medium text-lg">Please Wait, Fetching Data...</p>
    </div>
  ) : (
    <div className="gap-3 p-4 flex flex-column">
      {displayValues && (
        <>
          {show && (
            <div className="flex align-items-center justify-content-between w-full gap-3">
              <div className="flex align-items-center justify-content-between w-full ">
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
                      backgroundColor: bgColor, // Replace with your desired color
                      clipPath:
                        "polygon(100% 0%, 87% 51%, 100% 100%, 0 100%, 0% 50%, 0 0)",
                    }}
                  >
                    <h1
                      className="m-0 p-0 text-white text-2xl font-semibold"
                      style={{ zIndex: 1500 }}
                    >
                      Public Transport
                    </h1>
                    <p
                      className="m-0 p-2 text-primary1 text-xl font-bold border-circle bg-white mr-7"
                      style={{ zIndex: 1500 }}
                    >
                      {transportScore}
                    </p>
                  </div>
                </div>
                {/* Selected  location & Date */}
                <div className="flex align-items-start flex-column gap-1">
                  {/* location */}
                  <div className="flex align-items-center gap-1">
                    <i className="pi pi-map-marker text-primary1 font-medium text-sm"></i>
                    <p className="m-0 p-0 text-primary1 font-medium text-sm">
                      {selectedValues.route}
                    </p>
                  </div>
                  <Divider className="m-0 p-0" />
                  {/* Date Range */}
                  <div className="flex align-items-center justify-content-start gap-1">
                    <i className="pi pi-calendar text-primary1 font-medium text-sm"></i>
                    <p className="m-0 p-0 text-primary1 font-medium text-sm">
                      {monthNames[selectedValues.month - 1]},{" "}
                      {selectedValues.year}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex align-items-center justify-content-end gap-2">
                {/* Button to trigger the OverlayPanel */}
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
                    <div className="flex flex-column align-items-center justify-content-center gap-2">
                      <Dropdown
                        value={tempRoute}
                        onChange={(e) => setTempRoute(e.value)}
                        options={routes.map((route) => ({
                          label: route,
                          value: route,
                        }))}
                        placeholder="Select Route"
                        className="w-full"
                      />
                      <Dropdown
                        value={tempYear}
                        onChange={(e) => setTempYear(e.value)}
                        options={year.map((year) => ({
                          label: year,
                          value: year,
                        }))}
                        placeholder="Select Year"
                        className="w-full"
                      />
                      <Dropdown
                        value={tempMonth}
                        onChange={(e) => setTempMonth(e.value)}
                        options={monthNames.map((name, index) => ({
                          label: name,
                          value: index + 1,
                        }))}
                        placeholder="Select Month"
                        className="w-full"
                      />
                    </div>
                    <div className="flex justify-content-between">
                      <Button
                        className="bg-white text-secondary2"
                        label="Reset"
                        onClick={resetFilters}
                        raised
                      />
                      <Button
                        className="bg-primary1"
                        label="Apply"
                        onClick={handleApply}
                        raised
                      />
                    </div>
                  </div>
                </OverlayPanel>

                {username === "admin" && (
                  <>
                    <Button
                      icon="pi pi-ellipsis-v"
                      onClick={(e) => menu.current.toggle(e)}
                      className="bg-primary1"
                      raised
                    />
                    <Menu model={items} ref={menu} popup />
                    <Upload
                      visible={uploadDialogVisible}
                      onHide={hideUploadDialog}
                      parameter={"transport"}
                    />
                    {/* Pass props to TransportModify */}
                    <TransportModify
                      transportData={data}
                      transportSetData={setData}
                      isOpen={modifyDialogVisible}
                      onClose={handleCloseModifyDialog}
                    />
                  </>
                )}
                <Button
                  icon="pi pi-file"
                  tooltip="Generate Report"
                  tooltipOptions={{
                    position: "bottom",
                  }}
                  onClick={() => setReportVisible(true)}
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
                  <ReportPrint
                    renderDashboard={renderDashboard}
                    renderRecommendations={renderRecommendations}
                    parameter={"transport"}
                    heading={"Public Transport"}
                  />
                </Dialog>
              </div>
            </div>
          )}
          <div className="flex gap-3">
            <div
              className="flex flex-column align-items-center justify-content-between bg-white border-round p-3"
              style={{ flex: "25%" }}
            >
              {/* Total Buses in Operation*/}
              <div className="flex justify-content-between align-items-center gap-4">
                <div className="flex flex-column gap-2">
                  <p className="card-title p-0 m-0">Buses in Operation</p>
                  <p className="text-3xl font-semibold m-0 text-secondary2 p-0 text-center">
                    {displayValues.No_of_Public_Buses +
                      displayValues.No_of_Semi_Public_Buses}
                  </p>
                </div>
                <img src={bus} alt="bus" className="w-8rem" />
              </div>
              <Divider />
              {/* Public & Semi Public */}
              <div className="flex justify-content-between align-items-center w-full">
                <div className="flex flex-column w-full align-items-center gap-1">
                  <p className="text-3xl font-semibold m-0 text-secondary2 p-0">
                    {displayValues.No_of_Public_Buses}
                  </p>
                  <p className="p-0 m-0 card-text">Public</p>
                </div>
                <Divider layout="vertical" />
                <div className="flex flex-column w-full align-items-center gap-1">
                  <p className="text-3xl font-semibold m-0 text-primary2 p-0">
                    {displayValues.No_of_Semi_Public_Buses}
                  </p>
                  <p className="p-0 m-0 card-text">Semi Public</p>
                </div>
              </div>
              {/* Types of Vehicles */}
              <div className="flex flex-column sec-theme border-round-xl align-items-start p-3 pr-4 w-full">
                <p className="card-title p-0 m-0">Types of Buses</p>
                <Doughnut
                  // title="Types of Vehicles"
                  labels={vehicleLables}
                  series={busTypeData}
                  // series={busTypeData.map((data) => data)}
                  height={100}
                  colorArray={["#FFDD82", "#F7A47A", "#98C6CF", "#1F8297"]}
                />
              </div>
            </div>

            <div className="flex gap-3 flex-column" style={{ flex: "15%" }}>
              {/* Average Passenger Count */}
              <div className="flex flex-column bg-white border-round p-3 gap-2 w-full">
                <p className="card-title p-0 m-0">
                  Avg. Passenger Count
                  {/* <span className="text-sm text-tertiary3 font-medium">/Day</span> */}
                </p>
                <p className="text-3xl font-semibold m-0 p-2 text-secondary2 text-center">
                  {displayValues.Avg_Passenger_Count}{" "}
                  <span className="text-tertiary3 font-medium">/Day</span>
                </p>
              </div>
              {/* Availability of Bus */}
              <div className="flex flex-column bg-white border-round w-full p-3 gap-2">
                <p className="card-title p-0 m-0">
                  Avg. Availability of Bus
                  {/* <span className="text-sm text-tertiary3 font-medium">/Day</span> */}
                </p>
                <p className="text-3xl font-semibold m-0 p-2 text-secondary2 text-center">
                  {Math.round(
                    displayValues.Total_coaches_on_any_day /
                      displayValues.Avg_Passenger_Count
                  )}{" "}
                  <span className="text-tertiary3 font-medium">/Day</span>
                </p>
              </div>
              {/*  Disable Friendly Buses*/}
              <div className="flex flex-column bg-white border-round p-3 gap-2 w-full">
                <p className="card-title p-0 m-0">
                  Disable-Friendly Buses
                  {/* <span className="text-sm text-tertiary3 font-medium">/Day</span> */}
                </p>
                <p className="text-3xl font-semibold m-0 p-2 text-secondary2 text-center">
                  {displayValues.Disabled_Friendly_Buses}
                </p>
              </div>
            </div>
            {/* Route map */}
            <div
              className="flex flex-column bg-white border-round p-3 gap-3 justify-content-between"
              style={{ flex: "33%" }}
            >
              <div className="flex gap-2">
                <p className="card-text p-0 m-0">Route:</p>
                <p className="text-primary1 font-medium p-0 m-0">
                  {" "}
                  {displayValues.Route_Name}
                </p>
              </div>
              {(() => {
                switch (displayValues.Route_Name) {
                  case "Rikabgunj to Nihawa Road":
                    return (
                      // <img
                      //   src={route1}
                      //   alt="route1"
                      //   className="w-15rem"
                      //   cover
                      // />
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d7123.552577894557!2d82.135948744671!3d26.783400122456417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x399a0610931e5a91%3A0x12ab09ba4ab19c59!2sRikabganj%2C%20Faizabad%2C%20Uttar%20Pradesh%20224001!3m2!1d26.780489199999998!2d82.14280409999999!4m5!1s0x399a0612236be5a9%3A0x830a45760dc29eb0!2sNiyawan%2C%20Faizabad%2C%20Uttar%20Pradesh!3m2!1d26.785497799999998!2d82.1407637!5e0!3m2!1sen!2sin!4v1736782622300!5m2!1sen!2sin"
                        width="350"
                        height="275"
                        // style="border:0;"
                        allowfullscreen=""
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                        title="Rikabgunj to Nihawa Road"
                      ></iframe>
                    );
                  case "Nihawa to Ayodhya":
                    return (
                      // <img src={route2} alt="route2" className="w-15rem" />
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d40296.63045055688!2d82.14408166324695!3d26.784155636454418!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e6!4m5!1s0x399a0612236be5a9%3A0x830a45760dc29eb0!2sNiyawan%2C%20Faizabad%2C%20Uttar%20Pradesh!3m2!1d26.785497799999998!2d82.1407637!4m5!1s0x399a07937e6d2823%3A0x5fc8f683b17f222b!2sAyodhya%2C%20Uttar%20Pradesh!3m2!1d26.792160499999998!2d82.1997954!5e0!3m2!1sen!2sin!4v1736781975065!5m2!1sen!2sin"
                        width="350"
                        height="275"
                        // style="border:0;"
                        allowfullscreen=""
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                        title="Nihawa to Ayodhya"
                      ></iframe>
                    );
                  case "Ram ki Padhi to Hanuman Gadhi":
                    return (
                      // <img src={route3} alt="route3" className="w-15rem" />
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d20145.22349309295!2d82.19667923513448!3d26.801567486661174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e6!4m5!1s0x399a0784e30fab23%3A0x5e14268ebaacbcbf!2sRam%20Ki%20Paidi%2C%20Theri%20Bazar%2C%20Ayodhya%2C%20Uttar%20Pradesh!3m2!1d26.8093486!2d82.2058888!4m5!1s0x399a0792dbf96a15%3A0x68c9050f72e31d9d!2sHanuman%20Garhi%20Mandir%20-%20Ayodhya%20Dhaam%2C%20Sai%20Nagar%2C%20Ayodhya%2C%20Uttar%20Pradesh!3m2!1d26.795172599999997!2d82.2017001!5e0!3m2!1sen!2sin!4v1736782138471!5m2!1sen!2sin"
                        width="350"
                        height="275"
                        // style="border:0;"
                        allowfullscreen=""
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                        title="Ram ki Padhi to Hanuman Gadhi"
                      ></iframe>
                    );
                  case "Fatehgunj to Chauk( Chauk Marg)":
                    return (
                      // <img src={route4} alt="route4" className="w-15rem" />
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d7123.699243459842!2d82.14613376690173!3d26.781063030487847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x399a07396b8354a7%3A0x7a694796c2551940!2sChowk%20mandir%2C%20Gudri%20Bazar%2C%20Faizabad%2C%20Uttar%20Pradesh!3m2!1d26.7831455!2d82.1501236!4m5!1s0x399a061845370843%3A0xd65e1c8d9046fae7!2sFatehganj%20-%20Chowk%20Rd%2C%20Faizabad%2C%20Uttar%20Pradesh%20224001!3m2!1d26.7771091!2d82.1476589!5e0!3m2!1sen!2sin!4v1736831821002!5m2!1sen!2sin"
                        width="350"
                        height="275"
                        // style="border:0;"
                        allowfullscreen=""
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                        title="Fatehgunj to Chauk( Chauk Marg)"
                      ></iframe>
                    );
                  case "SahadatGunj bypass to BUS Adda (CIVIL LINES)":
                    return (
                      // <img src={route5} alt="route5" className="w-15rem" />
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d11358.257279280953!2d82.11975774412873!3d26.77480413729699!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e6!4m5!1s0x399a07fa7589da03%3A0x81bb367b84160de4!2sAyodhya%20Bus%20station%2C%20Faizabad%20Cantt%2C%20Faizabad%2C%20Uttar%20Pradesh!3m2!1d26.7764283!2d82.1314633!4m5!1s0x399a05f5150e8027%3A0xfcffed5424782ca2!2sSahadatganj%2C%20Faizabad%2C%20Uttar%20Pradesh%20224001!3m2!1d26.7672691!2d82.11559419999999!5e0!3m2!1sen!2sin!4v1736830947349!5m2!1sen!2sin"
                        width="350"
                        height="275"
                        // style="border:0;"
                        allowfullscreen=""
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                        title="SahadatGunj bypass to BUS Adda (CIVIL LINES)"
                      ></iframe>
                    );
                  case "Benigunj to Hanumangadhi":
                    return (
                      // <img src={route6} alt="route6" className="w-15rem" />
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d47921.36588714136!2d82.14978094734198!3d26.783382892646742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x399a07d2fb82598f%3A0xb6edd22fc8a2c43e!2sBeniganj%2C%20Faizabad%2C%20Uttar%20Pradesh!3m2!1d26.778499099999998!2d82.169862!4m5!1s0x399a07ec00000001%3A0xeaed37d81d2404dd!2shanuman%20Gari%2C%20Ayodhya%20-%20Faizabad%20Road%2C%20Dharmakata%2C%20Ayodhya%2C%20Uttar%20Pradesh!3m2!1d26.7878908!2d82.19860059999999!5e0!3m2!1sen!2sin!4v1736783225924!5m2!1sen!2sin"
                        width="350"
                        height="275"
                        // style="border:0;"
                        allowfullscreen=""
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                        title="Benigunj to Hanumangadhi"
                      ></iframe>
                    );
                  case "Maqabara Road to Naka Chungi":
                    return (
                      // <img src={route7} alt="route7" className="w-15rem" />
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d3562.1033573772957!2d82.14390800335588!3d26.772975099999993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x399a061dce49d1cf%3A0x54fe9b988bfebe27!2sMaqbara%2C%20Faizabad%2C%20Uttar%20Pradesh!3m2!1d26.769083499999997!2d82.1482448!4m5!1s0x399a090065313407%3A0x8da65fa3ffb6e635!2sNaka%20chungi%20ayodhya%20faizabad%2C%20Naka%20Chungi%20-%20Kanti%20Nagar%20Road%2C%20Gandhinagar%2C%20Durgapuri%20Colony%2C%20Naka%2C%20Faizabad%2C%20Uttar%20Pradesh!3m2!1d26.7615859!2d82.1437471!5e0!3m2!1sen!2sin!4v1736783554252!5m2!1sen!2sin"
                        width="350"
                        height="275"
                        // style="border:0;"
                        allowfullscreen=""
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                        title="Maqabara Road to Naka Chungi"
                      ></iframe>
                    );
                  default:
                    return <p>No image available for this route.</p>;
                }
              })()}
            </div>
            {/* Insights */}
            <div
              className="flex flex-column p-3 border-round bg-white gap-3 overflow-y-auto h-27rem"
              style={{ flex: "27%" }}
            >
              <p className="card-text p-0 m-0">Insights:</p>
              {/* {displayValues.Petrol + displayValues.Diesel >
                displayValues.Electric + displayValues.Hybrid && ( */}
              <li className="p-0 m-0 text-primary1 font-medium text-sm">
                The fleet is moving towards sustainable transportation, as{" "}
                <span className="m-0 p-0 font-semibold text-sm">
                  {displayValues.Electric + displayValues.Hybrid}
                </span>{" "}
                buses are electric or hybrid. {/* (25.4%).  */}
                However, a significant portion{" "}
                <span className="m-0 p-0 font-semibold text-red-500 text-sm">
                  (
                  {(
                    ((displayValues.Petrol + displayValues.Diesel) /
                      (displayValues.Electric +
                        displayValues.Hybrid +
                        displayValues.Petrol +
                        displayValues.Diesel)) *
                    100
                  ).toFixed(2)}
                  %)
                </span>{" "}
                still rely on petrol or diesel. Expanding the number of charging
                stations (currently{" "}
                <span className="m-0 p-0 font-semibold text-sm">
                  {displayValues.Charging_Stations}
                </span>
                ) could support a shift towards a greener fleet.
              </li>
              {/* )} */}
              <li className="p-0 m-0 text-primary1 font-medium text-sm">
                The quarterly increase in buses requiring maintenance checks
                suggests wear and tear is accelerating, likely due to aging
                buses or increased operational intensity.
              </li>
              <li className="p-0 m-0 text-primary1 font-medium text-sm">
                The{" "}
                <span className="m-0 p-0 font-semibold text-sm">
                  {displayValues.Route_Name}
                </span>{" "}
                route is hotspot for passenger demand during peak hours from{" "}
                <span className="m-0 p-0 font-semibold text-sm">
                  {displayValues.Peak_Hour}
                </span>
                . Allocating more buses, especially larger or higher-capacity
                ones, during these times and routes could improve service
                efficiency.
              </li>
              <li className="p-0 m-0 text-primary1 font-medium text-sm">
                During non-peak hours{" "}
                <span className="m-0 p-0 font-semibold text-sm">
                  {displayValues.Non_Peak_Hour}
                </span>
                , the route from{" "}
                <span className="m-0 p-0 font-semibold text-sm">
                  {displayValues.Route_Name}
                </span>{" "}
                may experience underutilization of buses. Strategies like
                reducing the fleet during these hours or offering incentives
                (discounted fares or promotions) could balance demand and
                operational efficiency.
              </li>
              <li className="p-0 m-0 text-primary1 font-medium text-sm">
                Despite having{" "}
                <span className="m-0 p-0 font-semibold text-sm">
                  {displayValues.Disabled_Friendly_Buses}
                </span>{" "}
                disability-friendly buses (
                <span className="m-0 p-0 font-semibold text-sm">
                  {(
                    (displayValues.Disabled_Friendly_Buses /
                      (displayValues.Electric +
                        displayValues.Hybrid +
                        displayValues.Petrol +
                        displayValues.Diesel)) *
                    100
                  ).toFixed(0)}
                  %
                </span>{" "}
                of the fleet), there is room for improvement to ensure
                inclusivity, especially if these buses do not operate on the
                busiest routes or during peak hours.
              </li>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex flex-column gap-3" style={{ flex: "41%" }}>
              <div className="flex gap-3">
                {/*  Charging Stations*/}
                <div className="flex flex-column bg-white border-round w-full p-3 gap-2">
                  <p className="card-title p-0 m-0">
                    Charging Stations
                    {/* <span className="text-sm text-tertiary3 font-medium">/Day</span> */}
                  </p>
                  <p className="text-3xl font-semibold m-0 p-1 text-secondary2 text-center">
                    {displayValues.Charging_Stations}
                  </p>
                </div>
                {/* Accidents*/}
                <div className="flex flex-column bg-white border-round w-full p-3 gap-2">
                  <p className="card-title p-0 m-0">
                    Accidents
                    {/* <span className="text-sm text-tertiary3 font-medium">/Day</span> */}
                  </p>
                  <p className="text-3xl font-semibold m-0 p-1 text-secondary2 text-center">
                    {displayValues.No_of_Accident_Cases}
                  </p>
                </div>
              </div>
              {/* EV Trend */}
              <div className="flex flex-column bg-white border-round p-3 gap-2">
                <div className="flex justify-content-between">
                  <p className="card-title p-0 m-0">EV Bus Deployment Trend</p>
                  <p className="text-sm text-tertiary3 font-medium p-0 m-0">
                    {displayValues.Year}
                  </p>
                </div>
                <LineChart
                  //   title="EV Trend"
                  categories={labels}
                  data={busMaint.map((data) => data.Electric)}
                  fontColor={"#4C4C4C"}
                  height={100}
                />
              </div>
            </div>

            {/* Bus Routes and Traffic analysis */}
            <div
              className="flex flex-column bg-white border-round p-3 justify-content-between"
              style={{ flex: "33%" }}
            >
              {/* <div className="flex justify-content-between">
                <div className="flex flex-column">
                  <p className="card-text p-0 m-0">Frequency</p>
                  <p className="text-primary1 font-medium p-0 m-0">
                    {displayValues.frequency}
                  </p>
                </div>
                <div className="flex flex-column">
                  <p className="card-text p-0 m-0">Coverage Area</p>
                  <p className="text-primary1 font-medium p-0 m-0">
                    {displayValues.area}
                  </p>
                </div>
              </div> */}
              <p className="card-title p-0 m-0">Traffic Analysis</p>
              <div
                className="flex justify-content-around border-round p-3"
                style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)" }}
              >
                <div className="flex flex-column gap-3">
                  <div className="flex flex-column">
                    <p className="card-title p-0 m-0">Peak Hours</p>
                    <p className="text-primary1 font-semibold p-0 m-0">
                      {displayValues.Peak_Hour}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <img src={rickshaw} alt="rickshaw" className="w-2rem" />
                    <div className="flex flex-column">
                      <p className="card-text p-0 m-0">3-Wheeler</p>
                      <p className="text-primary1 font-medium p-0 m-0">
                        {displayValues.Three_Wheeler_P}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <img src={bike} alt="bike" className="w-2rem" />
                    <div className="flex flex-column">
                      <p className="card-text p-0 m-0">2-Wheeler</p>
                      <p className="text-primary1 font-medium p-0 m-0">
                        {displayValues.Two_Wheeler_P}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <img src={buss} alt="bus" className="w-2rem" />
                    <div className="flex flex-column">
                      <p className="card-text p-0 m-0">Bus</p>
                      <p className="text-primary1 font-medium p-0 m-0">
                        {displayValues.Bus_P}
                      </p>
                    </div>
                  </div>
                </div>
                <Divider layout="vertical" />
                <div className="flex flex-column gap-3">
                  <div className="flex flex-column">
                    <p className="card-title p-0 m-0">Non-Peak Hours</p>
                    <p className="text-primary1 font-semibold p-0 m-0">
                      {displayValues.Non_Peak_Hour}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <img src={rickshaw} alt="rickshaw" className="w-2rem" />
                    <div className="flex flex-column">
                      <p className="card-text p-0 m-0">3-Wheeler</p>
                      <p className="text-primary1 font-medium p-0 m-0">
                        {displayValues.Three_Wheeler_NP}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <img src={bike} alt="bike" className="w-2rem" />
                    <div className="flex flex-column">
                      <p className="card-text p-0 m-0">2-Wheeler</p>
                      <p className="text-primary1 font-medium p-0 m-0">
                        {displayValues.Two_Wheeler_NP}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <img src={buss} alt="bus" className="w-2rem" />
                    <div className="flex flex-column">
                      <p className="card-text p-0 m-0">Bus</p>
                      <p className="text-primary1 font-medium p-0 m-0">
                        {displayValues.Bus_NP}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-column gap-3" style={{ flex: "27%" }}>
              {/* Buses older Than */}
              <div className="flex flex-column bg-white border-round p-3 gap-2">
                <p className="card-title p-0 m-0">Buses older Than</p>
                <div className="flex  justify-content-between align-items-center">
                  <div className="flex flex-column w-full align-items-center gap-1">
                    <p className="text-xl font-semibold m-0 text-secondary2 p-0">
                      {displayValues.Buses_older_than_7_years}
                    </p>
                    <p className="p-0 m-0 card-text">7 Years</p>
                  </div>
                  <Divider layout="vertical" />
                  <div className="flex flex-column w-full align-items-center gap-1">
                    <p className="text-xl font-semibold m-0 text-primary2 p-0">
                      {displayValues.Buses_older_than_5_years}
                    </p>
                    <p className="p-0 m-0 card-text">5 Years</p>
                  </div>
                </div>
                {/* <p className="card-text text-xs p-0 m-0 text-right">
                  *Standard values of Years
                </p> */}
              </div>

              {/* Buses going for maintenance */}
              <div className="flex flex-column bg-white border-round p-3">
                <div className="flex justify-content-between align-items-center">
                  <p className="card-title p-0 m-0">
                    Buses going for Maintenance
                  </p>
                  <p className="text-sm text-tertiary3 font-medium p-0 m-0">
                    {displayValues.Year}
                  </p>
                </div>
                {/* <p className="card-title p-0 m-0">Buses going for Maintenance</p> */}
                <ColumnChart
                  // title="Buses going for maintenance"
                  categories={labels}
                  series={busMaint.map(
                    (data) => data.Buses_going_for_Maintenance
                  )}
                  height={100}
                  dataPointWidth={40}
                />
              </div>
            </div>
          </div>

          {show && (
            <RecommendationPanel
              renderRecommendations={renderRecommendations}
            />
          )}
        </>
      )}
      {serverDown && <ServerDown />}
      {/* <p className="p-0 m-0 border-top-1 surface-border text-right text-sm text-700 font-italic">
        *Data updated till 2020. These numbers are subject to variation.
      </p> */}
    </div>
  );
};

export default Transport;
