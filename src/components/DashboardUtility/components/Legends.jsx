import { legendColors } from "components/DashboardUtility/Constants/colorConstants";
import React from "react";

const Legends = () => {
  return (
    <div className="flex gap-4 justify-content-end border-top-1 surface-border">
      {legendColors.map((color, index) => (
        <div className="flex align-items-center" key={index}>
          <div
            className="mr-2 border-circle"
            style={{
              width: "0.75rem",
              height: "0.75rem",
              backgroundColor: color,
              borderRadius: "50%", // Ensure it's circular
            }}
          ></div>
          <p className="m-0 p-0 font-medium card-text">
            {index === 0
              ? "80-100"
              : index === 1
              ? "40-80"
              : index === 2
              ? "0-40"
              : "Unknown Score Range"}{" "}
            {/* Fallback for unexpected indices */}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Legends;
