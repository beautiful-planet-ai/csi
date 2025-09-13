import axios from "axios";

const fetchWQI = async () => {
  try {
    const response = await axios.get("https://api-csi.arahas.com/waterNew/wqi");
    if (response.status === 200) {
      const wqiData = response.data.wqiResults;
      console.log("🚀 ~ fetchWQI ~ wqiData:", wqiData)
      return wqiData;
    } else {
      console.error("Failed to fetch WQI data");
    }
  } catch (error) {
    console.error("Error fetching WQI:", error);
  }
};

const fetchScore = async () => {
  try {
    const response = await axios.get(
      "https://api-csi.arahas.com/waterNew/score"
    );
    if (response.status === 200) {
      const scoreData = response.data.finalScore;
      return scoreData;
    } else {
      console.error("Failed to fetch score data");
    }
  } catch (error) {
    console.error("Error fetching score:", error);
  }
};

export { fetchWQI, fetchScore };
