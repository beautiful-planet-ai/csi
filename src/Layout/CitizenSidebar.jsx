import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Ripple } from "primereact/ripple";
import { Button } from "primereact/button";
import "../components/landingPage/Landing.css";
import KnowYourCity from "../pages/KnowYourCity";
import Logo from "assets/logo.svg";
import { Building, FileChartPie, LogOut } from "lucide-react";
import { BreadCrumb } from "primereact/breadcrumb";
import { useNavigate } from "react-router-dom";
import CityReportCard from "pages/CityReportCard";

const CitizenSidebar = () => {
  const [activeTab, setActiveTab] = useState("kyc"); // State for active tab
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate(); // For navigation

  const handleTabClick = (tab) => {
    setActiveTab(tab); // Set the clicked tab as active
    setVisible(false); // Hide the sidebar when a tab is clicked
  };

  const getTabStyle = (tab) => ({
    backgroundColor: activeTab === tab ? "#166c7d" : "#003940",
    borderRight: activeTab === tab ? "5px solid orange" : "none",
  });

  // Dynamically assign breadcrumb items based on the active tab
  const breadcrumbItems =
    activeTab === "kyc"
      ? [
          { label: "CSI For Citizen", url: "/citizen", isSelected: false },
          { label: "Know Your City", isSelected: "true" },
        ]
      : [
          { label: "CSI For Citizen", url: "/citizen", isSelected: false },
          { label: "City Report Card", isSelected: "true" },
        ];

  const home = {
    icon: "pi pi-home",
    url: "/",
    className: "font-bold text-cyan-800",
  };

  const onBreadcrumbClick = (url) => {
    navigate(url); // Navigate to the URL when breadcrumb is clicked
  };

  return (
    <div className="">
      {/* Display icons in the collapsed sidebar */}
      {!visible && (
        <div
          style={{
            width: "5rem",
            backgroundColor: "#003940",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "1rem",
            position: "fixed",
          }}
        >
          <img src={Logo} alt="Beautiful Planet.AI" className="w-4rem mb-4" />
          <Button
            icon={<Building size={18} />}
            onClick={() => handleTabClick("kyc")}
            style={{ backgroundColor: "#69ABB9", marginBottom: "1rem" }}
            tooltip="Know Your City"
            className="border-none border-round-lg"
          />
          <Button
            icon={<FileChartPie size={18} />}
            onClick={() => handleTabClick("cityReportCard")}
            style={{ backgroundColor: "#69ABB9", marginBottom: "1rem" }}
            tooltip="City Report Card"
            className="border-none border-round-lg"
          />
          <Button
            icon={<LogOut size={18} />}
            onClick={() => navigate("/")}
            className="border-none border-round-lg"
            style={{
              backgroundColor: "#69ABB9",
              position: "fixed",
              bottom: "5rem",
              left: "1rem",
            }}
            tooltip="Logout"
          />
          <i
            className="pi pi-angle-double-right text-white"
            onClick={() => setVisible(true)}
            style={{
              position: "fixed",
              bottom: "20px",
              left: "3rem",
              cursor: "pointer",
            }}
          />
        </div>
      )}

      {/* Full Sidebar */}
      <Sidebar
        visible={visible}
        onHide={() => setVisible(false)}
        position="left"
        header={<div style={{ backgroundColor: "#000" }}></div>}
      >
        <div
          style={{
            backgroundColor: "#003940",
            padding: "1rem",
            height: "100vh",
            position: "relative",
          }}
        >
          <img src={Logo} alt="Beautiful Planet.AI" className="w-7rem mb-4" />
          <ul className="list-none p-0 m-0">
            <li>
              <div
                style={getTabStyle("kyc")}
                onClick={() => handleTabClick("kyc")}
                className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 no-underline hover:bg-cyan-600 transition-duration-150 transition-colors w-full"
              >
                <Building className="text-white mr-2" size={20} />
                <span className="font-medium text-white">Know Your City</span>
                <Ripple />
              </div>
            </li>
            <li>
              <div
                style={getTabStyle("cityReportCard")}
                onClick={() => handleTabClick("cityReportCard")}
                className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 no-underline hover:bg-cyan-600 transition-duration-150 transition-colors w-full"
              >
                <FileChartPie className="text-white mr-2" size={20} />
                <span className="font-medium text-white">City Report Card</span>
                <Ripple />
              </div>
            </li>
          </ul>
          <i
            className="pi pi-angle-double-left text-white"
            onClick={() => setVisible(false)}
            style={{
              position: "fixed",
              bottom: "20px",
              left: "17rem",
              cursor: "pointer",
            }}
          />
        </div>
      </Sidebar>

      {/* Breadcrumb */}
      <BreadCrumb
        model={breadcrumbItems.map((item) => ({
          ...item,
          command: () => onBreadcrumbClick(item.url),
          style: {
            color: item.isSelected ? "#69ABB9" : "inherit",
            fontWeight: item.isSelected ? "bold" : "normal",
          },
        }))}
        home={home}
        style={{ marginLeft: "5rem" }}
      />

      {/* Render components based on activeTab */}
      <div className="content" style={{ marginLeft: "5rem" }}>
        {activeTab === "kyc" && <KnowYourCity show={true} />}
        {activeTab === "cityReportCard" && <CityReportCard />}
      </div>
    </div>
  );
};

export default CitizenSidebar;
