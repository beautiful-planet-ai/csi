import React from "react";
import "./App.css";
import "primereact/resources/themes/lara-light-teal/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { Route, Routes } from "react-router-dom";
import LandingScreen from "./pages/LandingScreen";
import Citizen from "./pages/Citizen";
import Government from "./pages/Government";
import CitizenSidebar from "Layout/CitizenSidebar";
import ChangeDetection from "extra/ChangeDetection";
import Animation from "extra/Animation";
import Layout from "Layout/Layout";
import KnowYourCity from "pages/KnowYourCity";
import AqiDashboard from "components/Dashboards/Environment/AQI/AqiDashboard";
import TempDashboard from "components/Dashboards/Environment/Temperature/TempDashboard";
import RainDashboard from "components/Dashboards/Environment/Rain/RainDashboard";
import Land from "components/Dashboards/Environment/Land/Land";
import WaterDashboard from "components/Dashboards/Environment/Water/WaterDashboard";
import WasteDashboard from "components/Dashboards/Environment/Waste/WasteDashboard";
import Nature from "pages/Nature";
import Society from "pages/Society";
import Healthcare from "components/Dashboards/Society/Healthcare/Healthcare";
import Employment from "components/Dashboards/Society/Employment/Employment";
import EducationDashboard from "components/Dashboards/Society/Education/EducationDashboard";
import Transport from "components/Dashboards/Society/Transport/Transport";
import Community from "components/Dashboards/Society/Community/Community";
import Culture from "components/Dashboards/Society/Culture/Culture";
import Administration from "pages/Administration";
import Disaster from "components/Dashboards/Administration/Disaster Management/Disaster";
import pathConstants from "components/DashboardUtility/Constants/pathConstants";
import CityReportCard from "pages/CityReportCard";
import ScoreCalculator from "components/Dashboards/Environment/AQI/AqiScoreCalculator";
import LiveAQI from "components/Dashboards/Environment/AQI/LiveAQI";
import NoData from "pages/error pages/NoData";
import CompareAQI from "components/Dashboards/Environment/AQI/ComapreAQI";
import AqiNEW from "components/Dashboards/Environment/AqiNew/AqiNEW";

function App() {
  const routes = [
    {
      path: pathConstants.KYC,
      element: <KnowYourCity />,
    },
    {
      path: pathConstants.CRC,
      element: <CityReportCard show={true} />,
    },
    {
      path: pathConstants.NATURE,
      element: <Nature />,
    },
    {
      path: pathConstants.AQI,
      element: <AqiDashboard show={true} />,
    },
    {
      path: pathConstants.CompareAQI,
      element: <CompareAQI show={true} />,
    },
    {
      path: pathConstants.AqiNew,
      element: <AqiNEW show={true} />,
    },
    {
      path: pathConstants.LiveAQI,
      element: <LiveAQI show={true} />,
    },
    {
      path: pathConstants.TEMP,
      element: <TempDashboard show={true} />,
    },
    {
      path: pathConstants.RAIN,
      element: <RainDashboard show={true} />,
    },
    {
      path: pathConstants.LAND,
      element: <Land show={true} />,
    },
    {
      path: pathConstants.WATER,
      element: <WaterDashboard show={true} />,
    },
    {
      path: pathConstants.WASTE,
      element: <WasteDashboard show={true} />,
    },
    {
      path: pathConstants.SOCIETY,
      element: <Society />,
    },
    {
      path: pathConstants.HEALTHCARE,
      element: <Healthcare show={true} />,
    },
    {
      path: pathConstants.EMPLOYMENT,
      element: <Employment show={true} />,
    },
    {
      path: pathConstants.EDUCATION,
      element: <EducationDashboard show={true} />,
    },
    {
      path: pathConstants.TRANSPORT,
      element: <Transport show={true} />,
    },
    {
      path: pathConstants.COMMUNITY,
      element: <Community show={true} />,
    },
    {
      path: pathConstants.CULTURE,
      element: <Culture show={true} />,
    },
    {
      path: pathConstants.ADMIN,
      element: <Administration />,
    },
    {
      path: pathConstants.DISASTER,
      element: <Disaster show={true} />,
    },
  ];

  return (
    <Routes>
      <Route path="/" element={<LandingScreen />} />
      <Route path="/citizen" element={<Citizen />} />
      <Route path="/government" element={<Government />} />
      <Route path="/csi/" element={<Layout />}>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Route>
      <Route path="/citizen/kyc" element={<CitizenSidebar />} />
      {/* <Route path="/error" element={<DataNotFound />} /> */}
      <Route path="/nodata" element={<NoData />} />
      {/* <Route path="/change" element={<ChangeDetection />} /> */}
      {/* <Route path="/animations" element={<Animation />} /> */}
      <Route path="/score" element={<ScoreCalculator />} />
    </Routes>
  );
}

export default App;
