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

const Healthcare = ({ show }) => {
  const [ReportVisible, setReportVisible] = useState(false);

  // const hospitalData = [51, 129];
  // const laboratoriesData = [133, 47];
  const Labels = ["Government", "Private"];

  const bedsTarget = 20;
  const bedsCurrent = 5;

  const ratioTarget = 20;
  const ratioCurrent = 45;

  const years = ["2020", "2021", "2022", "2023", "2024"];
  const doctorsData = [4000, 6300, 7000, 7600, 9000];

  const [activeIndex, setActiveIndex] = useState(0); // State for active tab

  const chronicData = [
    [10, 3, 6, 1, 0],
    [28, 1, 2, 39, 0],
    [7, 5, 23, 14, 0],
    [22, 2, 29, 25, 0],
    [26, 3, 19, 226, 0],
  ];
  const chronicDiseases = ["Malaria", "J.E.", "A.E.S", "Dengue", "Chikengunia"];

  // Map the data into a format suitable for the DataTable
  const tableData = chronicDiseases.map((disease, index) => {
    const rowData = { disease }; // Add the disease name
    years.forEach((year, yearIndex) => {
      rowData[year] = chronicData[yearIndex][index]; // Add values for each year
    });
    return rowData;
  });
  // const chronicDataWithDiseases = [
  //   {
  //     name: "Malaria",
  //     data: [10, 28, 7, 22, 26], // Yearly data for Malaria
  //   },
  //   {
  //     name: "J.E.",
  //     data: [3, 1, 5, 2, 3], // Yearly data for J.E.
  //   },
  //   {
  //     name: "A.E.S",
  //     data: [6, 2, 23, 29, 19], // Yearly data for A.E.S.
  //   },
  //   {
  //     name: "Dengue",
  //     data: [1, 39, 14, 25, 226], // Yearly data for Dengue
  //   },
  //   {
  //     name: "Chikengunia",
  //     data: [0, 0, 0, 0, 0], // Yearly data for Chikengunia
  //   },
  // ];

  const institutionsAnalysisData = [
    { name: "Target by 2031", data: [250, 300] },
    { name: "Current", data: [146, 198] },
  ];

  const mortalityData = [
    { name: "Infants", data: [10, 20, 30, 25, 32] },
    { name: "Pregnant Ladies", data: [45, 38, 25, 47, 55] },
  ];

  const vaccinationData = [150, 80, 60];
  const vaccinationLabels = [
    "Newborn Baby Immunization",
    "Flu Vaccinations",
    "Cervical Cancer Screenings",
  ];

  // const ageGroup = ["0-18", "19-35", "36-60", "61+"];
  const suicideData = [270, 328, 232, 150, 450];

  // const mentalPatientsLabels = [
  //   "Addiction",
  //   "Depression",
  //   "Anxiety",
  //   "Schizophrenia",
  // ];
  // const mentalPatientsData = [270, 328, 232, 150];

  const renderRecommendations = () => {
    return <HealthcareRecommendations />;
  };

  const renderDashboard = () => {
    return <Healthcare show={false} />;
  };

  return (
    <div className="flex gap-3 flex-column p-4">
      {show && (
        <div className="flex align-items-center justify-content-between w-full">
          <h1 className="m-0 p-0 text-primary1 text-2xl font-medium">
            Healthcare
          </h1>
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
      )}
      <div className="flex gap-3">
        <div className="flex flex-column gap-3" style={{ flex: "75%" }}>
          <div className="flex w-full gap-3">
            <div
              className="flex bg-white border-round justify-content-between"
              style={{ flex: "65%" }}
            >
              <img src={healthcare} alt="Healthcare" />
              <div className="flex py-6 w-full">
                <div className="flex flex-column w-full p-2 align-items-center justify-content-center gap-1">
                  <p className="text-3xl font-semibold m-0 text-secondary2 p-0">
                    754
                  </p>
                  <p className="p-0 m-0 card-text">Doctors</p>
                </div>
                <Divider layout="vertical" />
                <div className="flex flex-column w-full p-2 align-items-center justify-content-center gap-1">
                  <p className="text-3xl font-semibold m-0 text-secondary2 p-0">
                    1375
                  </p>
                  <p className="p-0 m-0 card-text">Nurses</p>
                </div>
                <Divider layout="vertical" />
                <div className="flex flex-column w-full p-2 align-items-center justify-content-center gap-1">
                  <p className="text-3xl font-semibold m-0 text-primary2 p-0">
                    124
                  </p>
                  <p className="p-0 m-0 card-text">Medical Staff</p>
                </div>
              </div>
            </div>

            <div
              className="flex justify-content-between align-items-center bg-white border-round py-6"
              style={{ flex: "35%" }}
            >
              <div className="flex flex-column w-full p-0 align-items-center gap-1">
                <p className="text-3xl font-semibold m-0 text-secondary2 p-0">
                  344
                </p>
                <p className="p-0 m-0 card-text">Healthcare Institutes</p>
              </div>
              <Divider layout="vertical" />
              <div className="flex flex-column w-full p-2 align-items-center gap-1">
                <p className="text-3xl font-semibold m-0 text-primary2 p-0">
                  78
                </p>
                <p className="tp-0 m-0 card-text">Laboratories</p>
              </div>
            </div>
          </div>

          <div className="flex w-full gap-3">
            {/* Registered Patients */}
            <div
              className="flex flex-column justify-content-center align-items-center bg-white border-round p-2 gap-3"
              style={{ flex: "15%" }}
            >
              <p className="text-3xl font-semibold m-0 text-secondary2 p-0">
                33,900
              </p>
              <p className="p-0 m-0 card-title text-center">
                Registered Patients
              </p>
            </div>
            {/* Patient Doctor Ratio */}
            <div
              className="flex flex-column bg-white border-round p-3 justify-content-center"
              style={{ flex: "28%" }}
            >
              <p className="card-title p-0 m-0">Patient Doctor Ratio</p>
              <div className="flex my-3">
                <div className="flex flex-column w-full p-2 align-items-center gap-1">
                  <p className="text-2xl font-semibold m-0 text-secondary2 p-0">
                    {ratioCurrent}
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
                value={((ratioCurrent - ratioTarget) / ratioCurrent) * 100}
                style={{ height: "0.75rem" }} // Adjust the height
                className="w-full" // Full width of its container
                color="#FFAD0D"
                displayValueTemplate={() => null} // Hide the displayed value
              />
              <p className="text-tertiary3 p-0 m-0 mt-1 font-semibold">
                Gap:{" "}
                <span className="text-primary1">
                  {(
                    ((ratioCurrent - ratioTarget) / ratioCurrent) *
                    100
                  ).toFixed(2)}
                  %
                </span>
              </p>
            </div>
            {/* People Having Health Insurance */}
            <div
              className="flex justify-content-center align-items-center bg-white border-round p-3"
              style={{ flex: "27%" }}
            >
              <div className="flex flex-column">
                <p className="card-title p-0 m-0 ">Health Insurance Coverage</p>
                <div className="flex align-items-center justify-content-around">
                  <p className="text-3xl font-semibold m-0 text-secondary2 p-0 text-center">
                    12500
                  </p>
                  <img src={insurance} alt="insurance" className="h-8rem" />
                </div>
              </div>
            </div>
            {/* No. of Beds Available */}
            <div
              className="flex flex-column bg-white border-round p-3 justify-content-center"
              style={{ flex: "40%" }}
            >
              <p className="card-title p-0 m-0">Hospital Beds</p>
              <div className="flex my-3">
                <div className="flex flex-column w-full p-2 align-items-center gap-1">
                  <p className="text-2xl font-semibold m-0 text-secondary2 p-0">
                    {bedsCurrent}
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
                value={((bedsTarget - bedsCurrent) / bedsTarget) * 100}
                style={{ height: "0.75rem" }} // Adjust the height
                className="w-full" // Full width of its container
                color="#E62225"
                displayValueTemplate={() => null} // Hide the displayed value
              />
              <p className="text-tertiary3 p-0 m-0 mt-1 font-semibold">
                Gap:{" "}
                <span className="text-primary1">
                  {" "}
                  {((bedsTarget - bedsCurrent) / bedsTarget) * 100}%
                </span>
              </p>
            </div>
          </div>
        </div>
        {/* Healthcare Institutes Analysis */}
        <div className="flex bg-white border-round p-4" style={{ flex: "25%" }}>
          <GroupedColumnChart
            title="Healthcare Institutes Analysis"
            labels={Labels}
            dataSeries={institutionsAnalysisData}
            dataPointWidth={25}
            height={260}
            fontSize={10}
          />
        </div>
      </div>

      <div className="flex align-items-center justify-content-center gap-3 w-full">
        {/* PatientsRegisteredChart */}
        <div className="flex bg-white border-round p-3" style={{ flex: "50%" }}>
          <PatientsRegisteredChart categories={years} series={doctorsData} />
        </div>

        {/* <div className="flex flex-column gap-3" style={{ flex: "14%" }}>
          <div className="flex flex-column bg-white border-round p-4 gap-2">
            <p className="text p-0 m-0 text-sm font-medium text-lg">
              Total New Borns
            </p>
            <p className="text-4xl font-semibold m-0 text-secondary2 p-3 text-center">
              1234
            </p>
          </div>
          <div className="flex flex-column bg-white border-round p-4 gap-2">
            <p className="text p-0 m-0 text-sm font-medium text-lg">
              Rehab Centers
            </p>
            <p className="text-4xl font-semibold m-0 text-secondary2 p-3 text-center">
              12
            </p>
          </div>
        </div> */}

        {/* Vaccination Facilities */}
        <div className="flex bg-white border-round p-3" style={{ flex: "18%" }}>
          <PieChartColumn
            categories={vaccinationLabels}
            series={vaccinationData}
            height={160}
            title="Vaccination Facilities"
            fontSize={8}
          />
        </div>

        {/* "Mortality Rate" */}
        <div
          className="flex flex-column bg-white border-round p-3"
          style={{ flex: "35%" }}
        >
          <GroupedBarChart
            title="Mortality Rate"
            labels={years}
            dataSeries={mortalityData}
            dataPointWidth={8}
            height={200}
          />
        </div>
      </div>

      <div className="flex align-items-center justify-content-center gap-3 w-full">
        {/* Chronic Diseases*/}
        {/* <GroupedColumnChart
            title="Prevailing Chronic Diseases"
            labels={years}
            dataSeries={chronicDataWithDiseases}
            dataPointWidth={10}
            height={200}
            /> */}
        <div
          className="flex bg-white border-round-xl p-3 flex-column"
          style={{ flex: "51%" }}
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

          {activeIndex === 1 && (
            <DataTable
              value={tableData}
              className="p-datatable-sm"
              // stripedRows
              responsiveLayout="scroll"
              rowStyle={{ backgroundColor: "#f3f5f5" }}
              style={{
                width: "100%",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              <Column
                field="disease"
                header="Disease"
                className="text-sm font-semibold text-primary1"
                headerStyle={{
                  fontWeight: 500,
                  backgroundColor: "#166c7d",
                  color: "white",
                }}
              ></Column>
              {years.map((year) => (
                <Column
                  key={year}
                  field={year}
                  header={year}
                  className="font-medium text-primary1"
                  headerStyle={{
                    fontWeight: 500,
                    backgroundColor: "#166c7d",
                    color: "white",
                    textAlign: "center",
                  }}
                ></Column>
              ))}
            </DataTable>
          )}
        </div>

        {/* SuicideCasesChart */}
        <div
          className="flex bg-white border-round-xl p-3"
          style={{ flex: "32%" }}
        >
          <SuicideCasesChart categories={years} series={suicideData} />
        </div>

        <div className="flex flex-column" style={{ flex: "22%" }}>
          {/* Rehab Centers */}
          <div className="flex flex-column bg-white p-3 border-round-top-xl">
            <p className="card-title p-0 m-0">Rehab Centers</p>
            <div className="flex align-items-center justify-content-around">
              <p className="text-3xl font-semibold m-0 text-secondary2 p-0 text-center">
                2
              </p>
              <img src={rehab} alt="rehab" />
            </div>
          </div>
          <div className="flex flex-column sec-theme p-3 border-round-bottom-xl">
            <p className="p-0 m-0 text font-medium">Rehab Center 1</p>
            <p className="p-0 m-0 text-tertiary3 font-medium mb-3">
              Capacity: <span className="text-primary1 font-semibold">200</span>
            </p>
            <p className="p-0 m-0 text font-medium">Rehab Center 2</p>
            <p className="p-0 m-0 text-tertiary3 font-medium">
              Capacity: <span className="text-primary1 font-semibold">200</span>
            </p>
          </div>
        </div>

        {/* Patients of Mental Illness */}
        {/* <div className="flex bg-white border-round p-3" style={{ flex: "22%" }}>
          <Doughnut
            title="Patients of Mental Illness"
            labels={mentalPatientsLabels}
            series={mentalPatientsData}
            height={200}
            showNo={true}
          />
        </div> */}
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
