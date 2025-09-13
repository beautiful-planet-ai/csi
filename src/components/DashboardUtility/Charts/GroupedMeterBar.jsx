import React from "react";
import { MeterGroup } from "primereact/metergroup";
import { scoreColors } from "../Constants/colorConstants";

const GroupedMeterBar = () => {
  const scoreRanges = [
    { label: "GOOD", value: 50, color: scoreColors[0] },
    { label: "SATISFACTORY", value: 100, color: scoreColors[1] },
    { label: "MODERATELY POLLUTED", value: 200, color: scoreColors[2] },
    { label: "POOR", value: 300, color: scoreColors[3] },
    { label: "VERY POOR", value: 400, color: scoreColors[4] },
    { label: "SEVERE", value: 500, color: scoreColors[5] },
  ];
  // Custom label template to hide percentage
  const labelTemplate = (item) => {
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ marginRight: "8px" }}>{item.label}</span>
        <span
          className="p-mr-2"
          style={{
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            backgroundColor: item.color,
          }}
        ></span>
      </div>
    );
  };

  return (
    <MeterGroup
      values={scoreRanges}
      // labelTemplate={labelTemplate} // Use custom label template
    />
  );
};

export default GroupedMeterBar;
