import axios from "axios";

const fetchWasteScore = async () => {
  try {
    const response = await axios.get("https://api-csi.arahas.com/waste/score");
    if (response.status === 200) {
      const scoreData = response.data.finalScore;
      return Math.round(scoreData);
    } else {
      console.error("Failed to fetch score data");
    }
  } catch (error) {
    console.error("Error fetching score:", error);
  }
};

export default fetchWasteScore;
