import React from "react";
import { useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import "primereact/resources/themes/saga-blue/theme.css"; // Choose your theme
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import TempDashboard from "./TempDashboard";
import TempRecommendations from "./TempRecommendations";
import GenerateTempReport from "../../../../../extra/GenerateTempReport";

const TempMain = () => {
  const [tempValue, setTempValue] = useState(null);
  const [humidityValue, setHumidityValue] = useState(null);
  const handleTempData = (data) => {
    setTempValue(data.tempValue);
    setHumidityValue(data.humidityValue);
  };
  return (
    <div className="p-2">
      <TabView>
        <TabPanel header="Performance">
          <TempDashboard onDataChange={handleTempData} show={true} />
        </TabPanel>
        <TabPanel header="Recommendations">
          <TempRecommendations
            temperature={tempValue}
            humidity={humidityValue}
          />
        </TabPanel>
        <TabPanel header="Report">
          <GenerateTempReport />
        </TabPanel>
      </TabView>
    </div>
  );
};

export default TempMain;
