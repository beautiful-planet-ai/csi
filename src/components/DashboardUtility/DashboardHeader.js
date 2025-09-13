import React, { useState, useRef } from "react";
import ReportPrint from "./ReportPrint";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import WaterModify from "components/Dashboards/Environment/Water/WaterModify";
import Upload from "./Popups/Upload";
import { Menu } from "primereact/menu";
import { Dropdown } from "primereact/dropdown";
import { OverlayPanel } from "primereact/overlaypanel";
import { Divider } from "primereact/divider";
import { getScoreColor } from "./scoreColor";

const DashboardHeader = ({
  score,
  selectedValues,
  monthNames,
  zones,
  years,
  tempZone,
  setTempZone,
  tempYear,
  setTempYear,
  tempMonth,
  setTempMonth,
  resetFilters,
  handleApply,
  username,
  data,
  setData,
  renderDashboard,
  renderRecommendations,
}) => {
  const bgColor = getScoreColor(score);
  const [ReportVisible, setReportVisible] = useState(false);
  const [uploadDialogVisible, setUploadDialogVisible] = useState(false);
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
  const overlayRef = useRef(null); // Reference for OverlayPanel
  const menu = useRef(null); // Create a ref for the Menu component
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
  return (
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
              Water Management
            </h1>
            <p
              className="m-0 p-2 text-primary1 text-xl font-bold border-circle bg-white mr-7"
              style={{ zIndex: 1500 }}
            >
              {score}
            </p>
          </div>
        </div>
        {/* Selected  location & Date */}
        <div className="flex align-items-start flex-column gap-1">
          {/* location */}
          <div className="flex align-items-center gap-1">
            <i className="pi pi-map-marker text-primary1 font-medium text-sm"></i>
            <p className="m-0 p-0 text-primary1 font-medium text-sm">
              {selectedValues.zone}
            </p>
          </div>
          <Divider className="m-0 p-0" />
          {/* Date Range */}
          <div className="flex align-items-center justify-content-start gap-1">
            <i className="pi pi-calendar text-primary1 font-medium text-sm"></i>
            <p className="m-0 p-0 text-primary1 font-medium text-sm">
              {monthNames[selectedValues.month - 1]}, {selectedValues.year}
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
            <div className="flex flex-column align-items-center justify-content-center gap-2 ">
              <Dropdown
                value={tempZone}
                onChange={(e) => setTempZone(e.value)}
                options={[
                  { label: "All Zones", value: "All Zones" }, // Use null or a specific value to indicate 'All Zones'
                  ...zones.map((div) => ({ label: div, value: div })),
                ]}
                placeholder="Select Zones"
                className="w-full"
              />
              <Dropdown
                value={tempYear}
                onChange={(e) => setTempYear(e.value)}
                options={years.map((year) => ({
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
                  label: name, // Display month name
                  value: index + 1, // Store month number (1-12)
                }))}
                placeholder="Select Month"
                className="w-full"
              />
            </div>
            <div className="flex justify-content-between">
              <Button
                className="bg-white text-secondary2"
                label="Reset"
                // icon="pi pi-undo"
                onClick={resetFilters}
                raised
              />
              <Button
                className="bg-primary1"
                label="Apply"
                // icon="pi pi-search"
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
              parameter={"water"}
            />
            <WaterModify
              waterData={data}
              waterSetData={setData}
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
            parameter={"water"}
            heading={"Water Management"}
          />
        </Dialog>
      </div>
    </div>
  );
};

export default DashboardHeader;
