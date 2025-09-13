import React from "react";
import { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import {
  GroupedColumnChart,
  GroupedBarChart,
  ModifiedLineChart,
  PieChartColumn,
} from "Layout/GraphVisuals";
import { Divider } from "primereact/divider";
import { PatientsRegisteredChart } from "./PatientsRegisteredChart";
import { SuicideCasesChart } from "./SuicideCasesChart";
import healthcare from "assets/healthcare.svg";
import insurance from "assets/insurance.svg";
import rehab from "assets/rehab.svg";
import { ProgressBar } from "primereact/progressbar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import HealthcareRecommendations from "./HealthcareRecommendations";
import ReportPrint from "components/DashboardUtility/ReportPrint";
import RecommendationPanel from "components/DashboardUtility/RecommendationPanel";
import { ProgressSpinner } from "primereact/progressspinner";
import { useUser } from "components/context/UserContext";
import { useEffect } from "react";
import { useRef } from "react";
import axios from "axios";
import score from "components/DashboardUtility/Constants/score";
import { getScoreColor } from "components/DashboardUtility/scoreColor";
import { Menu } from "primereact/menu";
import Upload from "components/DashboardUtility/Popups/Upload";
import HealthcareModify from "./HealthcareModify";

const Healthcare = ({ show }) => {
  const [ReportVisible, setReportVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadDialogVisible, setUploadDialogVisible] = useState(false);
  const [serverDown, setServerDown] = useState(false);
  const [data, setData] = useState([]);
  const [latestData, setLatestData] = useState(null);
  const [allData, setAllData] = useState([]);
  const { username } = useUser();
  const menu = useRef(null); // Create a ref for the Menu component
  const showUploadDialog = () => {
    setUploadDialogVisible(true);
  };

  const hideUploadDialog = () => {
    setUploadDialogVisible(false);
  };
  const [modifyDialogVisible, setModifyDialogVisible] = useState(false);

  const handleModify = () => {
    setModifyDialogVisible(true); // Set state to true when button is clicked
  };

  const handleCloseModifyDialog = () => {
    setModifyDialogVisible(false);
  };

  const [years, setYears] = useState([]);
  const [healthcareInstitutes, setHealthcareInstitutes] = useState([]);
  const [vaccinationFacilities, setVaccinationFacilities] = useState([]);
  const [infantMortalityRates, setInfantMortalityRates] = useState([]);
  const [pregnantMortalityRates, setPregnantMortalityRates] = useState([]);
  const [patientByAgeGroup, setPatientByAgeGroup] = useState([]);
  const [totalPatientsByYear, setTotalPatientsByYear] = useState([]);
  const [suicideByAgeGroup, setSuicideByAgeGroup] = useState([]);
  const [totalSuicidesByYear, setTotalSuicidesByYear] = useState([]);

  const [malariaData, setMalariaData] = useState([]);
  const [japaneseEncephalitisData, setJapaneseEncephalitisData] = useState([]);
  const [acuteEncephalitisSyndromeData, setAcuteEncephalitisSyndromeData] =
    useState([]);
  const [dengueData, setDengueData] = useState([]);
  const [chikungunyaData, setChikungunyaData] = useState([]);
  const [tbData, setTbData] = useState([]);
  const [heartDiseaseData, setHeartDiseaseData] = useState([]);
  const [diabetesData, setDiabetesData] = useState([]);
  const [respiratoryIllnessData, setRespiratoryIllnessData] = useState([]);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://api-csi.arahas.com/data/healthcare"
        );
        if (response) {
          const responseData = response.data.data;
          console.log("🚀 ~ fetchData ~ responseData:", responseData);

          setAllData(responseData);
          const years = responseData.map((data) => data.Year);
          setYears(years);
          const latestYear = Math.max(...years); // Get the maximum year

          // Find the row for the latest year
          const latestYearData = responseData.find(
            (data) => data.Year === latestYear
          );
          if (latestYearData) {
            setLatestData(latestYearData);
            // Prepare healthcareInstitutes data for chart
            const healthcareInstitutesData = [
              latestYearData.Government_Institutes,
              latestYearData.Private_Institutes,
            ];
            setHealthcareInstitutes(healthcareInstitutesData);

            const vaccinationFacilitiesData = [
              latestYearData.Vaccination_Newborn_Baby_Immunization,
              latestYearData.Flu_Vaccinations,
              latestYearData.Cervical_Cancer_Vaccinations,
            ];
            setVaccinationFacilities(vaccinationFacilitiesData);
          }
          setLatestData(latestYearData);
          // Map the Mortality_Rate_Infants into an array
          const infantMortalityRates = responseData.map(
            (data) => data.Mortality_Rate_Infants
          );
          setInfantMortalityRates(infantMortalityRates);

          // Map the Mortality_Rate_Pregnant_Ladies into an array
          const pregnantMortalityRates = responseData.map(
            (data) => data.Mortality_Rate_Pregnant_Ladies
          );
          setPregnantMortalityRates(pregnantMortalityRates);

          // Map chronic disease data into separate arrays
          const malariaCounts = responseData.map((data) => data.Malaria);
          const japaneseEncephalitisCounts = responseData.map(
            (data) => data.Japanese_encephalitis
          );
          const acuteEncephalitisSyndromeCounts = responseData.map(
            (data) => data.Acute_Encephalitis_Syndrome
          );
          const dengueCounts = responseData.map((data) => data.Dengue);
          const chikungunyaCounts = responseData.map(
            (data) => data.Chikungunia
          );
          const tbCounts = responseData.map((data) => data.TB);
          const heartDiseaseCounts = responseData.map(
            (data) => data.Heart_Disease
          );
          const diabetesCounts = responseData.map((data) => data.Diabetes);
          const respiratoryIllnessCounts = responseData.map(
            (data) => data.Respiratory_Illness
          );

          // Set state for each chronic disease group
          setMalariaData(malariaCounts);
          setJapaneseEncephalitisData(japaneseEncephalitisCounts);
          setAcuteEncephalitisSyndromeData(acuteEncephalitisSyndromeCounts);
          setDengueData(dengueCounts);
          setChikungunyaData(chikungunyaCounts);
          setTbData(tbCounts);
          setHeartDiseaseData(heartDiseaseCounts);
          setDiabetesData(diabetesCounts);
          setRespiratoryIllnessData(respiratoryIllnessCounts);

          // Calculate total patients for each year
          const totalRegPat = responseData.map(
            (data) =>
              data.Patients_0_18 +
              data.Patients_19_35 +
              data.Patients_36_60 +
              data.Patients_61_above
          );

          setTotalPatientsByYear(totalRegPat);
          // Prepare age group data
          const patientByAge = {};

          responseData.forEach((data) => {
            const year = data.Year;
            patientByAge[year] = [
              { ageGroup: "0-18", count: data.Patients_0_18 },
              { ageGroup: "19-35", count: data.Patients_19_35 },
              { ageGroup: "36-60", count: data.Patients_36_60 },
              { ageGroup: "61+", count: data.Patients_61_above },
            ];
          });

          // Set the state with the prepared age group data
          setPatientByAgeGroup(patientByAge);

          // Calculate total suicides for each year
          const totalSuicides = responseData.map(
            (data) =>
              data.Suicide_Cases_10_24 +
              data.Suicide_Cases_25_44 +
              data.Suicide_Cases_44_64 +
              data.Suicide_Cases_64_above
          );

          setTotalSuicidesByYear(totalSuicides);
          // Prepare age group data
          const suicideByAge = {};

          responseData.forEach((data) => {
            const year = data.Year;
            suicideByAge[year] = [
              { ageGroup: "0-18", count: data.Suicide_Cases_10_24 },
              { ageGroup: "19-35", count: data.Suicide_Cases_25_44 },
              { ageGroup: "36-60", count: data.Suicide_Cases_44_64 },
              { ageGroup: "61+", count: data.Suicide_Cases_64_above },
            ];
          });

          // Set the state with the prepared age group data
          setSuicideByAgeGroup(suicideByAge);

          setData(response.data.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setServerDown(true);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const bedsTarget = 5;
  const ratioTarget = 5;

  const [activeIndex, setActiveIndex] = useState(0); // State for active tab

  const chronicData = [
    malariaData,
    japaneseEncephalitisData,
    acuteEncephalitisSyndromeData,
    dengueData,
    chikungunyaData,
    tbData,
    heartDiseaseData,
    diabetesData,
    respiratoryIllnessData,
  ];
  console.log("🚀 ~ Healthcare ~ chronicData:", chronicData);
  const chronicDiseases = [
    "Malaria",
    "J.E.",
    "A.E.S",
    "Dengue",
    "Chikengunia",
    "TB",
    "Heart Disease",
    "Diabetes",
    "Respiratory Illness",
  ];

  // Map the data into a format suitable for the DataTable
  const tableData = chronicDiseases.map((disease, index) => {
    const rowData = { disease }; // Add the disease name
    years.forEach((year, yearIndex) => {
      rowData[year] = chronicData[yearIndex][index]; // Add values for each year
    });
    return rowData;
  });

  const Labels = ["Government", "Private"];
  const institutionsAnalysisData = [
    { name: "Target by 2031", data: [25, 30] },
    { name: "Current", data: healthcareInstitutes },
  ];

  const mortalityData = [
    { name: "Infants", data: infantMortalityRates },
    { name: "Pregnant Ladies", data: pregnantMortalityRates },
  ];

  const vaccinationLabels = [
    "Newborn Baby Immunization",
    "Flu Vaccinations",
    "Cervical Cancer Screenings",
  ];

  const renderRecommendations = () => {
    return <HealthcareRecommendations />;
  };

  const renderDashboard = () => {
    return <Healthcare show={false} />;
  };

  const bgColor = getScoreColor(score.HEALTHCARE);

  return loading ? (
    <div className="flex h-screen align-items-center justify-content-center flex-column">
      <ProgressSpinner />
      <p className="font-medium text-lg">Please Wait, Fetching Data...</p>
    </div>
  ) : (
    <div className="flex gap-3 flex-column p-3">
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
                backgroundColor: bgColor, // Replace with your desired color
                clipPath:
                  "polygon(100% 0%, 87% 51%, 100% 100%, 0 100%, 0% 50%, 0 0)",
              }}
            >
              <h1
                className="m-0 p-0 text-white text-2xl font-semibold"
                style={{ zIndex: 1500 }}
              >
                Healthcare
              </h1>
              <p
                className="m-0 p-2 text-primary1 text-xl font-bold border-circle bg-white mr-7"
                style={{ zIndex: 1500 }}
              >
                {score.HEALTHCARE}
              </p>
            </div>
          </div>
          <div className="flex align-items-center justify-content-end gap-2">
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
                  parameter={"healthcare"}
                />
                <HealthcareModify
                  healthData={data}
                  healthSetData={setData}
                  isOpen={modifyDialogVisible}
                  onClose={handleCloseModifyDialog}
                />
              </>
            )}
            <Button
              label="Generate Report"
              icon="pi pi-file"
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
                parameter={"healthcare"}
                heading={"Healthcare"}
              />
            </Dialog>
          </div>
        </div>
      )}

      <div className="flex gap-3">
        {latestData && (
          <div className="flex flex-column gap-3" style={{ flex: "55%" }}>
            <div className="flex w-full gap-3">
              <div
                className="flex bg-white border-round justify-content-between align-items-start"
                style={{ flex: "65%" }}
              >
                <img src={healthcare} alt="Healthcare" />
                <div className="flex py-6 w-full">
                  <div className="flex flex-column w-full align-items-center justify-content-center gap-1">
                    <p className="text-2xl font-semibold m-0 text-secondary2 p-0">
                      {latestData.Doctors}
                    </p>
                    <p className="p-0 m-0 card-text">Doctors</p>
                  </div>
                  <Divider layout="vertical" />
                  <div className="flex flex-column w-full align-items-center justify-content-center gap-1">
                    <p className="text-2xl font-semibold m-0 text-secondary2 p-0">
                      {latestData.Nurses}
                    </p>
                    <p className="p-0 m-0 card-text">Nurses</p>
                  </div>
                  <Divider layout="vertical" />
                  <div className="flex flex-column w-full align-items-center justify-content-center gap-1">
                    <p className="text-2xl font-semibold m-0 text-primary2 p-0">
                      {latestData.Medical_Staff}
                    </p>
                    <p className="p-0 m-0 card-text">Medical Staff</p>
                  </div>
                </div>
              </div>

              <div
                className="flex align-items-center bg-white border-round py-6"
                style={{ flex: "35%" }}
              >
                <div className="flex flex-column w-full align-items-center justify-content-center gap-1">
                  <p className="text-2xl font-semibold m-0 text-secondary2 p-0">
                    {latestData.Government_Institutes +
                      latestData.Private_Institutes}
                  </p>
                  <p className="p-0 m-0 card-text">Healthcare Institutes</p>
                </div>
                <Divider layout="vertical" />
                <div className="flex flex-column w-full align-items-center justify-content-center gap-1">
                  <p className="text-2xl font-semibold m-0 text-primary2 p-0">
                    {latestData.Laboratories}
                  </p>
                  <p className="p-0 m-0 card-text">Laboratories</p>
                </div>
              </div>
            </div>

            <div className="flex w-full gap-3">
              {/* Patient Doctor Ratio */}
              <div
                className="flex flex-column border-round p-3 justify-content-center sec-theme"
                style={{ flex: "35%" }}
              >
                <p className="card-title p-0 m-0">Patient Doctor Ratio</p>
                <div className="flex my-2">
                  <div className="flex flex-column w-full p-2 align-items-center gap-1">
                    <p className="text-2xl font-semibold m-0 text-secondary2 p-0">
                      {latestData.Patient_Doctor_Ratio}
                    </p>
                    <p className="p-0 m-0 card-text">Available</p>
                  </div>
                  <Divider layout="vertical" />
                  <div className="flex flex-column w-full p-2 align-items-center gap-1">
                    <p className="text-2xl font-semibold m-0 text-primary2 p-0">
                      {ratioTarget}
                    </p>
                    <p className="p-0 m-0 card-text">Target</p>
                  </div>
                </div>
                <ProgressBar
                  value={
                    ((latestData.Patient_Doctor_Ratio - ratioTarget) /
                      latestData.Patient_Doctor_Ratio) *
                    100
                  }
                  style={{ height: "0.5rem" }} // Adjust the height
                  className="w-full" // Full width of its container
                  color="#FFAD0D"
                  displayValueTemplate={() => null} // Hide the displayed value
                />
                <p className="text-tertiary3 p-0 m-0 mt-1 font-semibold">
                  Gap:{" "}
                  <span className="text-primary1">
                    {(
                      ((latestData.Patient_Doctor_Ratio - ratioTarget) /
                        latestData.Patient_Doctor_Ratio) *
                      100
                    ).toFixed(2)}
                    %
                  </span>
                </p>
              </div>
              {/* People Having Health Insurance */}
              <div
                className="flex justify-content-center align-items-center bg-white border-round p-3"
                style={{ flex: "30%" }}
              >
                <div className="flex flex-column">
                  <p className="card-title p-0 m-0 ">
                    Health Insurance Coverage
                  </p>
                  <div className="flex align-items-center justify-content-around">
                    <p className="text-2xl font-semibold m-0 text-secondary2 p-0 text-center">
                      {latestData.Health_Insurance_Coverage}
                    </p>
                    <img src={insurance} alt="insurance" className="h-6rem" />
                  </div>
                </div>
              </div>
              {/* No. of Beds Available */}
              <div
                className="flex flex-column border-round p-3 justify-content-center sec-theme"
                style={{ flex: "35%" }}
              >
                <p className="card-title p-0 m-0">Hospital Beds</p>
                <div className="flex my-2">
                  <div className="flex flex-column w-full p-2 align-items-center gap-1">
                    <p className="text-2xl font-semibold m-0 text-secondary2 p-0">
                      {latestData.Hospital_Beds}
                    </p>
                    <p className="p-0 m-0 card-text">Available</p>
                  </div>
                  <Divider layout="vertical" />
                  <div className="flex flex-column w-full p-2 align-items-center gap-1">
                    <p className="text-2xl font-semibold m-0 text-primary2 p-0">
                      {bedsTarget}
                    </p>
                    <p className="p-0 m-0 card-text">Target</p>
                  </div>
                </div>
                <ProgressBar
                  value={
                    ((bedsTarget - latestData.Hospital_Beds) / bedsTarget) * 100
                  }
                  style={{ height: "0.5rem" }} // Adjust the height
                  className="w-full" // Full width of its container
                  color="#E62225"
                  displayValueTemplate={() => null} // Hide the displayed value
                />
                <p className="text-tertiary3 p-0 m-0 mt-1 font-semibold">
                  Gap:{" "}
                  <span className="text-primary1">
                    {" "}
                    {((bedsTarget - latestData.Hospital_Beds) / bedsTarget) *
                      100}
                    %
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}
        {/* Healthcare Institutes Analysis */}
        <div className="flex bg-white border-round p-3" style={{ flex: "20%" }}>
          <GroupedColumnChart
            title="Healthcare Institutes Analysis"
            labels={Labels}
            dataSeries={institutionsAnalysisData}
            dataPointWidth={25}
            height={250}
            fontSize={10}
          />
        </div>
        {/* Insights */}
        <div
          className="flex flex-column bg-white border-round p-3 gap-3 h-23rem overflow-y-auto"
          style={{ flex: "25%" }}
        >
          <p className="card-title p-0 m-0">Insights</p>
          <div className="flex flex-column align-items-start justify-content-start gap-2"></div>
        </div>
      </div>

      <div className="flex align-items-center justify-content-center gap-3 w-full">
        {/* PatientsRegisteredChart */}
        <div className="flex bg-white border-round p-3" style={{ flex: "30%" }}>
          <PatientsRegisteredChart
            categories={years}
            series={totalPatientsByYear}
            drillDownData={patientByAgeGroup}
          />
        </div>

        {/* Vaccination Facilities */}
        <div className="flex bg-white border-round p-3" style={{ flex: "20%" }}>
          <PieChartColumn
            categories={vaccinationLabels}
            series={vaccinationFacilities}
            height={160}
            title="Vaccination Facilities"
            fontSize={8}
          />
        </div>
        {/* Chronic Diseases*/}
        <div
          className="flex bg-white border-round-xl p-3 flex-column"
          style={{ flex: "45%" }}
        >
          {/* Header Row */}
          <div className="flex justify-content-between align-items-center mb-2">
            {/* Constant Title on the Left */}
            <p className="card-title p-0 m-0">Chronic Disease Distribution</p>

            {/* Icons for Tab Switching on the Right */}
            <div className="flex gap-1">
              <i
                className={`pi pi-chart-line cursor-pointer text-xl p-2 ${
                  activeIndex === 0
                    ? "text-prime font-medium"
                    : "text-tertiary3"
                }`}
                title="Line Chart"
                style={{
                  // fontSize: "1.125rem",
                  // padding: 2,
                  backgroundColor:
                    activeIndex === 0 ? "#e9f3f5" : "transparent",
                  borderBottom:
                    activeIndex === 0 ? "2px solid #166c7d" : "none",
                }}
                onClick={() => setActiveIndex(0)} // Switch to Line Chart tab
              ></i>
              <i
                className={`pi pi-table cursor-pointer  text-xl p-2 ${
                  activeIndex === 1 ? "text-prime" : "text-tertiary3"
                }`}
                title="Data Table"
                style={{
                  backgroundColor:
                    activeIndex === 1 ? "#e9f3f5" : "transparent",
                  borderBottom:
                    activeIndex === 1 ? "2px solid #166c7d" : "none",
                }}
                onClick={() => setActiveIndex(1)} // Switch to Data Table tab
              ></i>
            </div>
          </div>

          {activeIndex === 0 && (
            <ModifiedLineChart
              // title="Chronic Disease Distribution"
              categories={chronicDiseases}
              series={chronicData}
              labels={years}
              height={165}
            />
          )}
        </div>
      </div>

      <div className="flex align-items-center justify-content-center gap-3 w-full">
        {/* "Mortality Rate" */}
        <div
          className="flex flex-column bg-white border-round p-3"
          style={{ flex: "51%" }}
        >
          <GroupedBarChart
            title="Mortality Rate"
            labels={years}
            dataSeries={mortalityData}
            dataPointWidth={8}
            height={200}
          />
        </div>

        {/* SuicideCasesChart */}
        <div
          className="flex bg-white border-round-xl p-3"
          style={{ flex: "32%" }}
        >
          <SuicideCasesChart
            categories={years}
            series={totalSuicidesByYear}
            drillDownData={suicideByAgeGroup}
          />
        </div>

        {/* Rehab Centers */}
        {latestData && (
          <div className="flex flex-column" style={{ flex: "22%" }}>
            <div className="flex flex-column bg-white p-3 border-round-top-xl">
              <p className="card-title p-0 m-0">Rehab Centers</p>
              <div className="flex align-items-center justify-content-around">
                <p className="text-3xl font-semibold m-0 text-secondary2 p-0 text-center">
                  {latestData.Rehab_Centres}
                </p>
                <img src={rehab} alt="rehab" />
              </div>
            </div>
            <div className="flex flex-column sec-theme p-3 border-round-bottom-xl">
              <p className="p-0 m-0 card-text">Average Capacity</p>
              <p className="p-0 text-primary1 font-semibold text-center text-2xl">
                {latestData.Avg_Capacity}
              </p>
            </div>
          </div>
        )}
      </div>

      <p className="p-0 m-0 border-top-1 surface-border text-right text-sm text-700 font-italic">
        *Data updated till 2020. These numbers are subject to variation.
      </p>

      <RecommendationPanel
        show={true}
        renderRecommendations={renderRecommendations}
      />
    </div>
  );
};

export default Healthcare;
