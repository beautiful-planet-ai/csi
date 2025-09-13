import { Panel } from "primereact/panel";
import React from "react";
import { useState } from "react";

const RecommendationPanel = ({ renderRecommendations }) => {
  const [recommendationsVisible, setRecommendationsVisible] = useState(false);

  const handleToggleRecommendations = () => {
    setRecommendationsVisible(!recommendationsVisible);
  };

  // console.log(
  //   "🚀 ~ RecommendationPanel ~ recommendationsVisible:",
  //   recommendationsVisible
  // );
  // console.log(show);

  return (
    <div>
      <Panel
        toggleable
        onToggle={handleToggleRecommendations}
        headerTemplate={(options) => {
          const toggleIcon = recommendationsVisible
            ? "pi pi-chevron-up"
            : "pi pi-chevron-down";

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
        {recommendationsVisible && renderRecommendations()}
      </Panel>
    </div>
  );
};

export default RecommendationPanel;
