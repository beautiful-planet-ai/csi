import Logo from "assets/logo.svg";
import pathConstants from "components/DashboardUtility/Constants/pathConstants";
import {
  Building,
  FileChartPie,
  Landmark,
  LogOut,
  Sprout,
  Users,
} from "lucide-react";
import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../components/landingPage/Landing.css";
import menuItems from "./menuItems";

const GovernmentSidebar = () => {
  const location = useLocation();
  const activePath = location.pathname;
  const [visible, setVisible] = useState(false);
  const [activeSections, setActiveSections] = useState({
    Nature: false,
    "Know Your City": false,
    "City Report Card": false,
    Society: false,
    Administration: false,
  });
  const navigate = useNavigate(); // For navigation
  const toggleSection = (section) => {
    setActiveSections((prev) => ({ ...prev, [section]: !prev[section] }));
    // setActiveTab(section);
  };

  // Update active tab based on the current route

  const handleTabClick = (url) => {
    navigate(url); // Set the clicked tab as active
    setVisible(false);
  };

  const handleActions = (url) => {
    console.log("🚀 ~ handleActions ~ url:", url);
    setVisible(true); // Set visibility to true
    navigate(url); // Set the active tab
  };

  const getTabStyle = (url) => ({
    backgroundColor: activePath === url ? "#69ABB9" : "#003940",
    borderRight: activePath === url ? "5px solid #F9C849" : "none",
  });

  const activeTabStyle = (url) => ({
    backgroundColor: activePath === url ? "#69ABB9" : "#003940",
    border: activePath === url ? "#F9C849" : "none",
  });

  const buttons = [
    {
      icon: <Building size={18} />,
      onClick: () => handleTabClick(pathConstants.KYC),
      tooltip: "Know your city",
      style: activeTabStyle(pathConstants.KYC),
    },
    {
      icon: <FileChartPie size={18} />,
      onClick: () => handleTabClick(pathConstants.CRC),
      tooltip: "City Report Card",
      style: activeTabStyle(pathConstants.CRC),
    },
    {
      icon: <Sprout size={18} />,
      onClick: () => handleActions(pathConstants.NATURE),
      tooltip: "Nature",
      style: activeTabStyle(pathConstants.NATURE),
    },
    {
      icon: <Users size={18} />,
      onClick: () => handleActions(pathConstants.SOCIETY),
      tooltip: "Society",
      style: activeTabStyle(pathConstants.SOCIETY),
    },
    {
      icon: <Landmark size={20} />,
      onClick: () => handleActions(pathConstants.ADMIN),
      tooltip: "Administration",
      style: activeTabStyle(pathConstants.ADMIN),
    },
  ];

  return (
    <div>
      {/* Display icons in the collapsed sidebar */}
      {!visible && (
        <div
          className="flex flex-column align-items-center w-5rem pt-3"
          style={{
            // width: "5rem", // Adjust the width for the collapsed sidebar
            backgroundColor: "#003940",
            height: "100%",
          }}
        >
          <img src={Logo} alt="Beautiful Planet.AI" className="w-4rem mb-4" />
          {buttons.map((buttonProps, index) => (
            <Button
              key={index}
              icon={buttonProps.icon}
              onClick={buttonProps.onClick}
              tooltip={buttonProps.tooltip}
              style={buttonProps.style}
              className="border-none border-round-lg mb-2"
            />
          ))}
          {/* <Divider /> */}
          <Button
            icon={<LogOut size={20} />}
            onClick={() => navigate("/")}
            className="border-none border-round-lg"
            style={{
              backgroundColor: "transparent",
              position: "fixed",
              bottom: "5rem",
              left: "1.5rem",
            }}
            tooltip="Logout"
          />

          {/* Bottom-right toggle button */}
          <i
            className="pi pi-angle-double-right"
            onClick={() => setVisible(true)}
            style={{
              color: "white",
              position: "fixed",
              bottom: "20px",
              left: "3rem",
              fontSize: "1rem",
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
        header={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#003940",
            }}
          ></div>
        }
        style={{
          backgroundColor: "#003940",
          overflowY: "auto", // Hide vertical scrollbar
        }}
      >
        <div
          style={{
            backgroundColor: "#003940",
            padding: "1rem",
            height: "100vh", // For positioning the toggle button
          }}
        >
          <img
            src={Logo}
            alt="Beautiful Planet.AI"
            className="w-9rem"
            style={{ position: "fixed", top: "1rem" }}
          />

          <ul
            className="list-none"
            style={{
              paddingTop: "2rem", // Add some padding to avoid overlapping the icon
              textDecoration: "none",
              overflowY: "auto", // Enable scrolling for the list items
              height: "calc(100vh - 8rem)", // Adjust the height to leave space for the toggle button
              scrollbarWidth: "none", // For Firefox
              // msOverflowStyle: "none", // For Internet Explorer and Edge
            }}
          >
            {menuItems.map((item, index) => (
              <li key={index}>
                {item.nestedItems ? (
                  <>
                    <Link
                      to={item.path}
                      style={getTabStyle(item.path)}
                      className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 no-underline hover:bg-cyan-600 transition-duration-150 transition-colors w-full"
                    >
                      <div
                        onClick={() => toggleSection(item.label)}
                        className="p-ripple flex align-items-center cursor-pointer w-full"
                      >
                        {item.icon}
                        <span className="font-medium text-white">
                          {item.label}
                        </span>
                        <i
                          className={`pi pi-chevron-${
                            activeSections[item.label] ? "up" : "down"
                          } ml-auto text-white`}
                        ></i>
                      </div>
                    </Link>
                    {activeSections[item.label] && (
                      <ul className="list-none py-0 pl-3 pr-0 m-0 mt-2">
                        {item.nestedItems.map((nestedItem, nestedIndex) => (
                          <li key={nestedIndex}>
                            <Link
                              to={nestedItem.path}
                              className="p-ripple flex align-items-center cursor-pointer p-2 ml-2 border-round text-700 no-underline hover:bg-cyan-600 transition-duration-150 transition-colors"
                              style={getTabStyle(nestedItem.path)}
                            >
                              {nestedItem.icon}
                              <span className="font-medium text-sm text-white">
                                {nestedItem.label}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.path}
                    style={getTabStyle(item.path)}
                    className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 no-underline hover:bg-cyan-600 transition-duration-150 transition-colors w-full"
                  >
                    {item.icon}
                    <span className="font-medium text-white">{item.label}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Bottom-right toggle button for the full sidebar */}
          <i
            className="pi pi-angle-double-left"
            onClick={() => setVisible(false)}
            style={{
              color: "white",
              cursor: "pointer",
              fontSize: "1rem",
              position: "fixed",
              bottom: "1.5rem",
              // left: "17rem",
            }}
          />
        </div>
      </Sidebar>
    </div>
  );
};

export default GovernmentSidebar;
