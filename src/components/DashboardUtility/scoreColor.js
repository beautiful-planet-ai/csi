import { scoreColors } from "components/DashboardUtility/Constants/colorConstants";

export const getScoreColor = (score) => {
  if (score >= 90 && score <= 100) {
    return scoreColors[0];
  } else if (score >= 80 && score < 90) {
    return scoreColors[1];
  } else if (score >= 60 && score < 80) {
    return scoreColors[2];
  } else if (score >= 40 && score < 60) {
    return scoreColors[3];
  } else if (score >= 20 && score < 40) {
    return scoreColors[4];
  } else if (score >= 0 && score < 20) {
    return scoreColors[5];
  }
  return "#FFFFFF"; // Default color if no match
};
