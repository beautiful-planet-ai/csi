import React, { useState, useEffect } from "react";

import Lottie from "lottie-react";
import report_ani from "assets/animations/Report_ani.json";
import { Button } from "primereact/button";
import ReportPrint from "./ReportPrint";

// Utility functions
const GenerateReport = () => {
  const [visible, setVisible] = useState(false);

  const toggleReportModal = () => {
    setVisible(!visible);
  };

  return (
    <div className="flex flex-column align-items-center justify-content-center">
      <Lottie
        animationData={report_ani}
        style={{ height: "20rem", width: "20rem" }}
      />

      <div>
        <Button
          className="bg-cyan-800"
          label="Generate Report"
          icon="pi pi-file-pdf"
          onClick={toggleReportModal}
        />
      </div>

      {/* Render ReportPrint Component only if all fields are selected */}

      <ReportPrint
        visible={visible}
        toggleModalVisibility={toggleReportModal}
        show={true}
      />
    </div>
  );
};

export default GenerateReport;
