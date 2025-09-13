import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BreadCrumb } from "primereact/breadcrumb";
import pathConstants from "components/DashboardUtility/Constants/pathConstants";

const Breadcrumbs = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Get the navigate function from useNavigate
  const activePath = location.pathname; // Get the current path

  // Define a base breadcrumb item for home
  const home = {
    url: "/",
    className: "font-bold text-cyan-800",
    icon: "pi pi-home",
  };

  // Define breadcrumbs based on the active path
  const breadcrumbs = {
    [pathConstants.KYC]: [
      { label: "CSI For Government", url: "/government" },
      { label: "Know Your City", isSelected: true },
    ],
    [pathConstants.CRC]: [
      { label: "CSI For Government", url: "/government" },
      { label: "City Report Card", isSelected: true },
    ],
    [pathConstants.NATURE]: [
      { label: "CSI For Government", url: "/government" },
      { label: "Nature", isSelected: true },
    ],
    [pathConstants.SOCIETY]: [
      { label: "CSI For Government", url: "/government" },
      { label: "Society", isSelected: true },
    ],
    [pathConstants.ADMIN]: [
      { label: "CSI For Government", url: "/government" },
      { label: "Administration", isSelected: true },
    ],
    [pathConstants.AQI]: [
      { label: "CSI For Government", url: "/government" },
      { label: "Nature", url: pathConstants.NATURE },
      { label: "Air Quality Index", isSelected: true },
    ],
    [pathConstants.TEMP]: [
      { label: "CSI For Government", url: "/government" },
      { label: "Nature", url: pathConstants.NATURE },
      { label: "Temperature", isSelected: true },
    ],
    [pathConstants.RAIN]: [
      { label: "CSI For Government", url: "/government" },
      { label: "Nature", url: pathConstants.NATURE },
      { label: "Rainfall", isSelected: true },
    ],
    [pathConstants.LAND]: [
      { label: "CSI For Government", url: "/government" },
      { label: "Nature", url: pathConstants.NATURE },
      { label: "Land Usage", isSelected: true },
    ],
    [pathConstants.WATER]: [
      { label: "CSI For Government", url: "/government" },
      { label: "Nature", url: pathConstants.NATURE },
      { label: "Water Management", isSelected: true },
    ],
    [pathConstants.WASTE]: [
      { label: "CSI For Government", url: "/government" },
      { label: "Nature", url: pathConstants.NATURE },
      { label: "Waste Management", isSelected: true },
    ],
    [pathConstants.TRANSPORT]: [
      { label: "CSI For Government", url: "/government" },
      { label: "Society", url: pathConstants.SOCIETY },
      { label: "Public Transport", isSelected: true },
    ],
    [pathConstants.HEALTHCARE]: [
      { label: "CSI For Government", url: "/government" },
      { label: "Society", url: pathConstants.SOCIETY },
      { label: "Healthcare", isSelected: true },
    ],
    [pathConstants.EDUCATION]: [
      { label: "CSI For Government", url: "/government" },
      { label: "Society", url: pathConstants.SOCIETY },
      { label: "Education", isSelected: true },
    ],
    [pathConstants.EMPLOYMENT]: [
      { label: "CSI For Government", url: "/government" },
      { label: "Society", url: pathConstants.SOCIETY },
      { label: "Employment Opportunity", isSelected: true },
    ],
    [pathConstants.CULTURE]: [
      { label: "CSI For Government", url: "/government" },
      { label: "Society", url: pathConstants.SOCIETY },
      { label: "Cultural Preservation", isSelected: true },
    ],
    [pathConstants.COMMUNITY]: [
      { label: "CSI For Government", url: "/government" },
      { label: "Society", url: pathConstants.SOCIETY },
      {
        label: "Community Engagement & Holistic Well-Being",
        isSelected: true,
      },
    ],
    [pathConstants.DISASTER]: [
      { label: "CSI For Government", url: "/government" },
      { label: "Administration", url: pathConstants.ADMIN },
      { label: "Disaster Management", isSelected: true },
    ],
  };

  // Get breadcrumb items based on active path
  const breadcrumbItems = breadcrumbs[activePath] || [];

  const onBreadcrumbClick = (url) => {
    navigate(url); // Navigate to the URL when breadcrumb is clicked
  };

  return (
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
      style={{
        position: "sticky", // Make it sticky
        top: 0, // Stick to the top
        backgroundColor: "#f3f5f5",
        zIndex: 1000,
      }}
    />
  );
};

export default Breadcrumbs;
