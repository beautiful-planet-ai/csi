import React, { useState } from "react";
import { ColumnChart, GroupedBarChart } from "Layout/GraphVisuals";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Panel } from "primereact/panel";
import workshop from "assets/workshop.svg";
import ngo from "assets/ngo.svg";
import survey from "assets/Survey Illustration.svg";
import CommunityRecommendations from "./CommunityRecommendations";
import ReportPrint from "components/DashboardUtility/ReportPrint";
import RecommendationPanel from "components/DashboardUtility/RecommendationPanel";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";

const Community = ({ show }) => {
  const [ReportVisible, setReportVisible] = useState(false);
  const [recommendationsVisible, setRecommendationsVisible] = useState(false);

  const handleToggleRecommendations = () => {
    setRecommendationsVisible(!recommendationsVisible);
  };

  const facilitiesCategories = [
    "Anganwari-Housing Area/Cluster",
    "Community room",
    "Community hall and library",
    "Recreational club",
    "Music, dance and drama center",
    "Meditation and spiritual center",
    "Old-age home",
  ];

  const facilitiesData = [
    {
      name: "Existing",
      data: [48, 77, 29, 4, 12, 7, 1],
    },
    {
      name: "Target",
      data: [120, 150, 73, 10, 20, 15, 5],
    },
  ];

  const categories = ["2020", "2021", "2022", "2023", "2024"];
  const forums = [80, 90, 178, 148, 215]; // Funds allocated for each year (in crores)

  const renderRecommendations = () => {
    return <CommunityRecommendations />;
  };

  const renderDashboard = () => {
    return <Community show={false} />;
  };
  const score = 90; // Example value; this can be "poor", "moderate", or "good"

  const getColor = (score) => {
    if (score >= 81 && score <= 100) {
      return "#0C9D61"; // Green for good
    } else if (score >= 41 && score <= 80) {
      return "#FFAD0D"; // Yellow for moderate
    } else if (score >= 0 && score <= 40) {
      return "#E62225"; // Red for poor
    }
  };

  return (
    <div className="flex gap-3 flex-column p-4">
      {show && (
        <div className="flex align-items-center justify-content-between w-full">
          <div className="flex p-2 w-30rem align-items-center justify-content-between bg-white border-round">
            <h1 className="m-0 p-0 text-primary1 text-2xl font-medium">
              Community Engagement & Holisitic Well-Being
            </h1>
            <div className="flex w-4rem custom-circular-progress">
              <CircularProgressbar
                value={score}
                text={`${score}`}
                strokeWidth={12}
                styles={buildStyles({
                  pathColor: getColor(score),
                  textColor: "#001F23",
                  trailColor: "#E7EAEA",
                  textSize: "2.5rem",
                  pathTransition: "stroke-dashoffset 0.5s ease 0s",
                  transform: "rotate(2.25turn)",
                })}
              />
            </div>
          </div>
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
              parameter={"community"}
              heading={"Community Engagement & Holisitic Well-Being"}
            />
          </Dialog>
        </div>
      )}
      <div className="flex align-items-center justify-content-center gap-3 w-full">
        <div className="flex flex-column gap-3" style={{ flex: "30%" }}>
          {/* NGOs/Forums */}
          <div className="flex bg-white border-round align-items-center justify-content-around w-full">
            <div className="flex flex-column p-4">
              <p className="card-title p-0 m-0">NGOs/Forums</p>
              <p className="text-4xl font-semibold m-0 text-secondary2 p-2 text-center">
                215
              </p>
            </div>
            <img src={ngo} alt="ngo" className="h-7rem" />
            {/* <i className="pi pi-info-circle text-theme w-full text-right ngo text-sm"></i>
            <Tooltip target=".ngo" position="right">
              <div className="flex align-items-start justify-content-start gap-4 p-2 w-full flex-column">
                <h1 className="m-0 p-0 text-lg text-cyan-800 text-center">
                  List of NGOs/Forums
                </h1>
                <ul>
                  <li>NGO1 (Work)</li>
                  <li>NGO2 (Work)</li>
                  <li>NGO3 (Work)</li>
                  <li>NGO4 (Work)</li>
                  <li>NGO5 (Work)</li>
                </ul>
              </div>
            </Tooltip> */}
          </div>

          {/* Feedback Survey Channels */}
          <div className="flex bg-white border-round align-items-center justify-content-around p-3 w-full">
            <div className="flex flex-column">
              <p className="card-title p-0 m-0">Feedback Survey Channels</p>
              <p className="text-4xl font-semibold m-0 text-secondary2 p-2 text-center">
                58
              </p>
            </div>
            <img src={survey} alt="survey" className="h-6rem" />
            {/* <i className="pi pi-info-circle text-theme w-full text-right feedback text-sm"></i>
            <Tooltip target=".feedback" position="bottom">
              <div className="flex align-items-start justify-content-start gap-4 p-2 w-full flex-column">
                <h1 className="m-0 p-0 text-lg text-cyan-800 text-center">
                  List of Feedback Survey Channels
                </h1>
                <ul>
                  <li>Healthcare: 16</li>
                  <li>Education: 26</li>
                  <li>Transport: 16</li>
                </ul>
              </div>
            </Tooltip> */}
          </div>
        </div>

        {/* Number of NGOs/Forums Over Years */}
        <div
          className="flex flex-column bg-white border-round p-3"
          style={{ flex: "42%" }}
        >
          <p className="card-title p-0 m-0">NGOs/Forums Over the Years</p>
          <ColumnChart
            // title="NGOs/Forums Over the Years"
            categories={categories}
            series={forums}
            height={160}
            dataPointWidth={40}
          />
        </div>

        {/* Annual Public Awareness Meetings/Workshops */}
        <div
          className="flex flex-column bg-white border-round align-items-center p-3 gap-2"
          style={{ flex: "20%" }}
        >
          <p className="card-title p-0 m-0">
            Annual Public Awareness Meetings & Workshops
          </p>
          <div className="flex justify-content-around">
            <img src={workshop} alt="workshop" />
            <p className="text-5xl font-semibold m-0 text-secondary2 p-6">26</p>
          </div>
        </div>
      </div>

      <div className="flex align-items-center justify-content-center gap-2 w-full">
        {/* Socio-Cultural Facilities */}
        <div className="flex flex-column bg-white border-round p-4 w-full">
          <p className="card-title p-0 m-0">Socio-Cultural Facilities</p>
          <GroupedBarChart
            // title="Socio-Cultural Facilities"
            labels={facilitiesCategories}
            dataSeries={facilitiesData}
            height={260}
            dataPointWidth={10}
          />
        </div>
      </div>

      {/* <div className="flex justify-content-end">
        <Button
          label={
            recommendationsVisible
              ? "Close Recommendations"
              : "View Recommendations"
          }
          icon={recommendationsVisible ? "pi pi-times" : "pi pi-check-square"}
          onClick={handleToggleRecommendations}
          className="bg-theme text-white"
          raised
        />
      </div> */}

      {/* {recommendationsVisible && (
        <DisasterRecommdations />
      )} */}

      <RecommendationPanel
        show={true}
        renderRecommendations={renderRecommendations}
      />
    </div>
  );
};

export default Community;
