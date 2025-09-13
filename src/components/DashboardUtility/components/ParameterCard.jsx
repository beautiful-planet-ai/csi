import React from "react";
import { useNavigate } from "react-router-dom";
import { legendColors } from "components/DashboardUtility/Constants/colorConstants";

const ParameterCard = ({ metrics }) => {
  const navigate = useNavigate();
  // Function to determine background color based on score
  const getScoreBackgroundColor = (score) => {
    if (score >= 80 && score <= 100) {
      return legendColors[0]; // Green for good
    } else if (score >= 40 && score < 80) {
      return legendColors[1]; // Light green for moderate
    } else if (score >= 0 && score < 40) {
      return legendColors[2]; // Yellow for moderate
    }
    return "#000"; // Fallback color if no condition is met
  };
  const handleCardClick = (path) => {
    navigate(path);
  };
  return (
    <>
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="cardMetric flex bg-white border-round-2xl shadow-2"
          onClick={() => handleCardClick(metric.path)} // Set active dashboard on click
          style={{ cursor: "pointer" }} // Change cursor to pointer for better UX
        >
          <div className="flex flex-column gap-3 align-items-center justify-content-between">
            <img src={metric.img} alt={metric.title} className="w-11rem" />
            <div>
              <p className="text-sm font-semibold text-secondary2 pb-4 m-0 text-center w-10rem">
                {metric.title}
              </p>
            </div>
          </div>
          <div
            className="flex border-round-right-2xl px-2 flex-column gap-8 py-2"
            style={{
              backgroundColor: getScoreBackgroundColor(metric.score),
              // padding: "1.6rem",
            }}
          >
            <p className="font-medium p-0 m-0 text-white text-sm text-left">
              SCORE
            </p>
            <p className="text-3xl font-semibold text-white p-0 m-0 text-center">
              {metric.score}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default ParameterCard;
