import React from "react";
import { scoreColors } from "../Constants/colorConstants";

const ColorScaleBar = ({ labels }) => {
  const segments = labels.map((label, index) => ({
    label,
    color: scoreColors[index % scoreColors.length], // Ensure color index stays within bounds
  }));

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "15px",
        borderRadius: "5px",
        overflow: "hidden", // Ensure rounded corners work correctly
      }}
    >
      {segments.map((segment, index) => (
        <div
          key={index}
          style={{
            flex: 1,
            backgroundColor: segment.color,
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "12px",
          }}
        >
          {segment.label}
        </div>
      ))}
    </div>
  );
};

export default ColorScaleBar;
