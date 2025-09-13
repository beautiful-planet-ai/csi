import React, { useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { LineChart, GroupedColumnChart } from "Layout/GraphVisuals";
import { primaryData } from "./PrimaryData";
import { secondaryData } from "./SecondaryData";
import { higherEducationData } from "./HigherEducationData";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Dialog } from "primereact/dialog";
import { ProgressBar } from "primereact/progressbar";
import { Panel } from "primereact/panel";
import institutions from "assets/institutions.svg";
import gender from "assets/gender.svg";
import EducationRecommendations from "./EducationRecommendations";
import ReportPrint from "components/DashboardUtility/ReportPrint";
import RecommendationPanel from "components/DashboardUtility/RecommendationPanel";

const EducationDashboard = ({ show }) => {
  const [selectedLevel, setSelectedLevel] = useState(0); // Use index for selected level (0 = Primary, 1 = Secondary, 2 = Higher)
  const educationDataMap = {
    Primary: primaryData,
    Secondary: secondaryData,
    Higher: higherEducationData,
  };
  const levels = [
    "Primary Education",
    "Secondary Education",
    "Higher Education",
  ];
  const educationData = Object.values(educationDataMap)[selectedLevel];
  const [ReportVisible, setReportVisible] = useState(false);
  const [recommendationsVisible, setRecommendationsVisible] = useState(false);

  const handleToggleRecommendations = () => {
    setRecommendationsVisible(!recommendationsVisible);
  };

  const years = ["2021", "2022", "2023", "2024"];

  const renderRecommendations = () => {
    return <EducationRecommendations />;
  };

  const renderDashboard = () => {
    return <EducationDashboard show={false} />;
  };

  return (
    <div className="flex flex-column">
      {/* Tab Panel for selecting education level */}
      <TabView
        activeIndex={selectedLevel}
        onTabChange={(e) => setSelectedLevel(e.index)}
      >
        {levels.map((level, index) => (
          <TabPanel header={level} key={index}>
            {/* <h1 className="text-3xl text-theme font-semibold text-center mt-0 p-0 mb-2">
              {level} Level Education
            </h1> */}
            {show && (
              <div className="flex align-items-center justify-content-end w-full">
                {/* <h1 className="m-0 p-0 text-primary1 text-2xl font-semibold">Education</h1> */}

                <Button
                  label="Generate Report"
                  icon="pi pi-file"
                  onClick={() => setReportVisible(true)}
                  className="bg-primary1 text-white mr-3"
                  style={{ marginTop: -80 }}
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
                    parameter={"education"}
                    heading={"Education"}
                  />
                </Dialog>
              </div>
            )}
            <div className="flex gap-3">
              <div className="flex flex-column gap-3" style={{ flex: "30%" }}>
                {/* Institutions */}
                <div className="flex justify-content-between align-items-center bg-white border-round p-4 w-full">
                  <div className="flex flex-column gap-3">
                    <p className="card-title p-0 m-0">Institutions</p>
                    <p className="text-4xl font-semibold m-0 text-secondary2 p-0 text-right">
                      {educationData.institutions}
                    </p>
                  </div>
                  <img
                    src={institutions}
                    alt="institutions"
                    className="w-12rem"
                  />
                </div>

                {/* Institution Gap Analysis */}
                <div className="flex bg-white border-round p-3 w-full">
                  <GroupedColumnChart
                    title="Institution Gap Analysis"
                    labels={educationData.institutionsAnalysisLabels}
                    dataSeries={educationData.institutionsAnalysisData}
                    dataPointWidth={25}
                    height={200}
                    fontSize={7}
                  />
                </div>

                {/* Teacher vs Student Ratio */}
                <div className="flex flex-column bg-white border-round p-3 justify-content-between w-full">
                  <p className="card-title p-0 m-0">Teacher vs Student Ratio</p>
                  <div className="flex my-2 py-2">
                    <div className="flex flex-column w-full p-2 align-items-center gap-1">
                      <p className="text-2xl font-semibold m-0 text-primary2 p-0">
                        {educationData.teacherStudentRatioCurrent}
                      </p>
                      <p className="p-0 m-0 card-text">Current</p>
                    </div>
                    <Divider layout="vertical" />
                    <div className="flex flex-column w-full p-2 align-items-center gap-1">
                      <p className="text-2xl font-semibold m-0 text-secondary2 p-0">
                        {educationData.teacherStudentRatioTarget}
                      </p>
                      <p className="p-0 m-0 card-text">Target</p>
                    </div>
                  </div>
                  <ProgressBar
                    value={(
                      ((educationData.teacherStudentRatioTargetValue -
                        educationData.teacherStudentRatioCurrentValue) /
                        educationData.teacherStudentRatioTargetValue) *
                      100
                    ).toFixed(2)}
                    style={{ height: "0.75rem" }} // Adjust the height
                    className="w-full" // Full width of its container
                    color="#FFAD0D"
                    displayValueTemplate={() => null} // Hide the displayed value
                  />
                  <p className="text-tertiary3 p-0 m-0 font-semibold mt-2">
                    Gap:{" "}
                    <span className="text-primary1">
                      {" "}
                      {(
                        ((educationData.teacherStudentRatioTargetValue -
                          educationData.teacherStudentRatioCurrentValue) /
                          educationData.teacherStudentRatioTargetValue) *
                        100
                      ).toFixed(2)}
                      %
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex flex-column gap-3" style={{ flex: "40%" }}>
                <div className="flex gap-3 w-full">
                  <div className="flex flex-column gap-3 w-full">
                    {/* Students Enrolled */}
                    <div className="flex flex-column bg-white border-round p-3 w-full">
                      <div className="flex flex-column gap-2">
                        <p className="card-title text-left p-0 m-0">
                          Students Enrolled
                        </p>

                        {/* Outer Circle */}
                        <div
                          className="flex flex-column align-items-center justify-content-center"
                          style={{
                            width: "14rem",
                            height: "14rem",
                            borderRadius: "50%",
                            backgroundColor: "#E9F3F5", // Replace with your secondary theme color
                            position: "relative",
                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                          }}
                        >
                          {/* Total Students */}
                          <p className="text-4xl font-semibold m-0 text-secondary2">
                            {educationData.enrollment}
                          </p>

                          {/* Inner Circles - Positioned Inside */}
                          <div
                            className="flex justify-content-between position-absolute"
                            style={{
                              // bottom: "15%", // Position closer to the bottom of the outer circle
                              width: "80%",
                              transform: "translateY(20%)",
                            }}
                          >
                            {/* Inner Circle - Male */}
                            <div
                              className="flex flex-column align-items-center justify-content-center"
                              style={{
                                width: "7rem",
                                height: "6rem",
                                borderRadius: "50%",
                                backgroundColor: "#F7A47A",
                                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                transform: "translateX(10%)", // Slight overlap towards the center
                              }}
                            >
                              <p className="text-lg font-semibold m-0 text-secondary3">
                                {educationData.genderData[0]}
                              </p>
                              <p className="font-semibold m-0 text text-sm">
                                Male
                              </p>
                            </div>

                            {/* Inner Circle - Female */}
                            <div
                              className="flex flex-column align-items-center justify-content-center"
                              style={{
                                width: "7rem",
                                height: "6rem",
                                borderRadius: "50%",
                                backgroundColor: "#FFDD82",
                                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                transform: "translateX(-5%)", // Slight overlap towards the center
                              }}
                            >
                              <p className="text-lg font-semibold m-0 text-secondary3">
                                {educationData.genderData[1]}
                              </p>
                              <p className="font-semibold m-0 text text-sm">
                                Female
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Gender Parity Index */}
                    <div className="flex flex-column w-full justify-content-center bg-white border-round p-3 gap-2">
                      <p className="card-title p-0 m-0 text-left">
                        Gender Parity Index
                      </p>
                      <div className="flex justify-content-around align-items-center gap-4">
                        <img src={gender} alt="gender" />
                        <p className="text-3xl font-semibold m-0 text-secondary2 p-0 text-center">
                          {educationData.parityIndex}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-column gap-3 w-full">
                    {/* Adjusted Net Enrollment Rate */}
                    <div className="flex flex-column bg-white border-round p-4 justify-content-between w-full">
                      <p className="card-title p-0 m-0">
                        Adjusted Net Enrollment Rate
                      </p>
                      <div className="flex my-2 py-2">
                        <div className="flex flex-column w-full p-2 align-items-center gap-1">
                          <p className="text-2xl font-semibold m-0 text-primary2 p-0">
                            {educationData.enrollmentCurrent}
                          </p>
                          <p className="p-0 m-0 card-text">Current</p>
                        </div>
                        <Divider layout="vertical" />
                        <div className="flex flex-column w-full p-2 align-items-center gap-1">
                          <p className="text-2xl font-semibold m-0 text-secondary2 p-0">
                            {educationData.enrollmentTarget}
                          </p>
                          <p className="p-0 m-0 card-text">Target</p>
                        </div>
                      </div>
                      <ProgressBar
                        value={(
                          educationData.enrollmentTarget -
                          educationData.enrollmentCurrent
                        ).toFixed(2)}
                        style={{ height: "0.75rem" }} // Adjust the height
                        className="w-full" // Full width of its container
                        color="#FFAD0D"
                        displayValueTemplate={() => null} // Hide the displayed value
                      />
                      <p className="text-tertiary3 p-0 m-0 font-semibold mt-2">
                        Gap:{" "}
                        <span className="text-primary1">
                          {" "}
                          {(
                            educationData.enrollmentTarget -
                            educationData.enrollmentCurrent
                          ).toFixed(2)}
                          %
                        </span>
                      </p>
                    </div>
                    {/* Dropout Rate */}
                    <div className="flex flex-column w-full bg-white border-round p-4 justify-content-between">
                      <p className="card-title p-0 m-0">Dropout Rate</p>
                      <div className="flex my-2 py-2">
                        <div className="flex flex-column w-full p-2 align-items-center gap-1">
                          <p className="text-2xl font-semibold m-0 text-primary2 p-0">
                            {educationData.dropoutRatioCurrentValue}
                          </p>
                          <p className="p-0 m-0 card-text">Current</p>
                        </div>
                        <Divider layout="vertical" />
                        <div className="flex flex-column w-full p-2 align-items-center gap-1">
                          <p className="text-2xl font-semibold m-0 text-secondary2 p-0">
                            {educationData.dropoutRatioTargetValue}
                          </p>
                          <p className="p-0 m-0 card-text">Target</p>
                        </div>
                      </div>
                      <ProgressBar
                        value={(
                          ((educationData.dropoutRatioCurrentValue -
                            educationData.dropoutRatioTargetValue) /
                            educationData.dropoutRatioTargetValue) *
                          100
                        ).toFixed(2)}
                        style={{ height: "0.75rem" }} // Adjust the height
                        className="w-full" // Full width of its container
                        color="#FFAD0D"
                        displayValueTemplate={() => null} // Hide the displayed value
                      />
                      <p className="text-tertiary3 p-0 m-0 font-semibold mt-2">
                        Gap:{" "}
                        <span className="text-primary1">
                          {(
                            ((educationData.dropoutRatioCurrentValue -
                              educationData.dropoutRatioTargetValue) /
                              educationData.dropoutRatioTargetValue) *
                            100
                          ).toFixed(2)}
                          %
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* No. of Students per Teacher */}
                <div className="flex bg-white border-round p-3 w-full">
                  <LineChart
                    title="No. of Students per Teacher"
                    categories={educationData.years}
                    data={educationData.teacherStudentRatioTrend}
                    height={130}
                  />
                </div>
              </div>

              <div className="flex flex-column gap-3" style={{ flex: "30%" }}>
                {/* Enrollment Rate Trend */}
                <div className="flex w-full bg-white border-round p-3">
                  <GroupedColumnChart
                    title="Enrollment Rate Trend"
                    labels={educationData.years}
                    dataSeries={educationData.enrollmentTrendData}
                    years={years}
                    dataPointWidth={25}
                    height={225}
                    fontSize={10}
                  />
                </div>
                {/* Dropout Rate Trend */}
                <div className="flex w-full bg-white border-round p-3">
                  <GroupedColumnChart
                    title="Dropout Rate Trend"
                    labels={educationData.years}
                    dataSeries={educationData.dropoutTrendData}
                    years={years}
                    dataPointWidth={25}
                    height={225}
                    fontSize={10}
                  />
                </div>
              </div>
            </div>

            <div className="">
              <p className="p-0 m-0 border-top-1 surface-border text-right text-sm text-700 font-italic my-3">
                *Data updated till 2020. These numbers are subject to variation.
              </p>
              <RecommendationPanel
                show={true}
                renderRecommendations={renderRecommendations}
              />
            </div>
          </TabPanel>
        ))}
      </TabView>
    </div>
  );
};

export default EducationDashboard;
