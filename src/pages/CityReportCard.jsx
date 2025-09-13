import React, { useState } from "react";
import Report from "../components/CityReportCard/Report";
import Recommendations from "components/CityReportCard/Recommendations";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import ReportPrint from "components/CityReportCard/ReportPrint";
import { Panel } from "primereact/panel";

const CityReportCard = ({ show }) => {
  const [ReportVisible, setReportVisible] = useState(false);
  const [recommendationsVisible, setRecommendationsVisible] = useState(false);

  const handleToggleRecommendations = () => {
    setRecommendationsVisible(!recommendationsVisible);
  };

  return (
    <div className="flex p-4 flex-column sec-theme gap-3">
      <div className="flex align-items-center justify-content-between w-full">
        <h1 className="m-0 p-0 text-primary1 text-3xl font-medium">
          City Report Card
        </h1>
        {show && (
          <Button
            label="Generate Report"
            icon="pi pi-file"
            onClick={() => setReportVisible(true)}
            className="bg-primary1 text-white"
            raised
          />
        )}
      </div>

      <Dialog
        visible={ReportVisible}
        style={{ width: "100rem" }}
        onHide={() => setReportVisible(false)}
      >
        <ReportPrint />
      </Dialog>

      {/* <div className="w-full">
        <h1 className="text-primary1 text-xl text-left text-medium w-full m-0 p-0 ml-3">
          City Report Card
        </h1>
      </div> */}

      <Report />
      {show && (
        <Panel
          toggleable
          onToggle={handleToggleRecommendations} // Optional: if you want to perform an action on toggleheaderTemplate={(options) => {
          headerTemplate={(options) => {
            const toggleIcon = options.collapsed
              ? "pi pi-chevron-right" // Arrow pointing to the right when collapsed
              : "pi pi-chevron-down"; // Arrow pointing down when expanded

            return (
              <div className="flex justify-content-between align-items-center px-4 bg-white border-round">
                <p className="text-primary1 font-semibold text-xl">
                  View Recommendations
                </p>
                <button
                  className={`p-link ${toggleIcon}`}
                  onClick={options.onTogglerClick}
                  style={{
                    background: "none",
                    // border: "none",
                    cursor: "pointer",
                    color: "#001F23",
                  }}
                />
              </div>
            );
          }}
        >
          {recommendationsVisible && <Recommendations />}
        </Panel>
      )}
    </div>
  );
};

export default CityReportCard;
