import React from "react";
import recom from "assets/recommendations.svg";
import { Divider } from "primereact/divider";
const Recommendations = () => {
  //   console.log(temperature, humidity);

  const getRecommendation = () => {
    return (
      <ul className="font-medium text p-0 m-0">
        <li>
          1. Extremely high levels of PM2.5 and PM10 were recorded in areas like
          Ranopali Kila Road and near the airport in Ayodhya on January 29,
          2024. These levels exceeded 900 for PM2.5 and touched 1000 for PM10,
          indicating an "extremely hazardous" air quality condition. Limit
          outdoor activities as much as possible, especially for sensitive
          groups like children and elderly. Such concentrations of particulate
          matter pose immediate health risks to vulnerable group exacerbating
          respiratory conditions such as asthma and bronchitis.
        </li>

        <li>
          2. Invest in alternative water sources such as rainwater harvesting,
          desalination, and wastewater recycling. Implement stringent
          regulations to prevent industrial, agricultural, and domestic
          pollution of water sources.
        </li>

        <li>
          3. Develop a Digital Waste Tracking System. Maintain a current
          inventory of hazardous materials employed within work areas.
        </li>
      </ul>
    );
  };

  //   const getBadge = () => {
  //     return (
  //       <Badge
  //         value="Measures to be taken for Water Treatment & Preservation"
  //         severity="Good"
  //       />
  //     );
  //   };

  return (
    <div className="flex align-items-center justify-content-around px-5">
      {getRecommendation()}
      <img src={recom} alt="recommendations" className="h-16rem py-2" />
    </div>
  );
};

export default Recommendations;
