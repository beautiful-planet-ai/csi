import React from "react";
import { Fieldset } from "primereact/fieldset";
import { Badge } from "primereact/badge";
import recom from "assets/recommendations.svg";

const RainRecommendations = () => {
  //   console.log(temperature, humidity);

  const getRecommendationRain = () => {
    return (
      <div className="flex flex-column">
        <li className="text-lg text-primary1 font-semibold p-0 m-0">
          Urban Greenery and Afforestation:
        </li>
        <p className="font-medium text">
          Plant more trees, especially indigenous and drought-resistant species,
          in and around the city to increase moisture retention in the soil and
          contribute to local microclimatic changes. Green belts and urban
          forests can help retain rainwater, reduce urban heat islands, and
          potentially encourage more localized rainfall.
        </p>

        <li className="text-lg text-primary1 font-semibold p-0 m-0">
          Rainwater Harvesting:
        </li>
        <p className="font-medium text">
          Implement large-scale rainwater harvesting systems in public
          buildings, parks, schools, and residential areas. This can help
          collect rainwater, prevent runoff, recharge groundwater, and ensure
          better utilization of rainfall.
        </p>
        <li className="text-lg text-primary1 font-semibold p-0 m-0">
          Artificial Recharge and Check Dams:
        </li>

        <p className="font-medium text">
          Construct check dams and artificial recharge structures in areas
          surrounding Ayodhya to help retain rainwater and allow it to percolate
          into the ground, enhancing groundwater levels.
        </p>

        <li className="text-lg text-primary1 font-semibold p-0 m-0">
          Awareness Campaigns:
        </li>

        <p className="font-medium text">
          Launch city-wide campaigns to educate residents about water
          conservation, rainwater harvesting, and the importance of maintaining
          local water bodies. Promote community participation in planting trees
          and maintaining green spaces.
        </p>

        <li className="text-lg text-primary1 font-semibold p-0 m-0">
          Water Body Restoration:
        </li>

        <p className="font-medium text">
          Rejuvenate and maintain local water bodies such as ponds, lakes, and
          rivers. Ensure these are free from pollution, encroachment, and
          siltation. Healthy water bodies can help in retaining rainwater and
          support biodiversity.
        </p>

        <li className="text-lg text-primary1 font-semibold p-0 m-0">
          Sustainable Urban Planning:
        </li>

        <p className="font-medium text">
          Integrate sustainable water management practices into urban planning,
          such as permeable pavements, green roofs, and rain gardens, which help
          reduce runoff and increase water absorption.
        </p>

        <li className="text-lg text-primary1 font-semibold p-0 m-0">
          Incentives for Green Practices:
        </li>

        <p className="font-medium text">
          Provide incentives for residents and businesses that adopt green
          practices, such as installing rainwater harvesting systems or using
          water-efficient appliances.
        </p>

        <li className="text-lg text-primary1 font-semibold p-0 m-0">
          Improved Drainage Infrastructure:
        </li>

        <p className="font-medium text">
          Upgrade the city’s drainage infrastructure to prevent waterlogging
          during heavy rains. Efficient drainage systems can help reduce urban
          flooding and ensure that excess rainwater is properly managed.
        </p>

        <li className="text-lg text-primary1 font-semibold p-0 m-0">
          Data Collection and Monitoring:
        </li>

        <p className="font-medium text">
          Establish a robust weather monitoring system to collect data on
          rainfall patterns, water levels, and usage. Use this data to make
          informed decisions on water management and conservation.
        </p>

        <li className="text-lg text-primary1 font-semibold p-0 m-0">
          Collaboration with Meteorological Agencies:
        </li>

        <p className="font-medium text">
          Partner with meteorological and environmental agencies to better
          understand rainfall patterns and plan for extreme weather events. This
          can help the city prepare for both droughts and floods
        </p>
      </div>
    );
  };

  const getBadge = () => {
    return (
      <Badge
        value="Measures to Improve Rainfall Retention and Management"
        style={{ backgroundColor: "#1F8297" }}
        //severity="Good"
      />
    );
  };

  return (
    <div className="flex align-items-start justify-content-around px-5">
      {/* <h1 className="text-left text-xl">Recommendations</h1> */}
      {/* <Fieldset legend={getBadge()}>{getRecommendationRain()}</Fieldset> */}
      {getRecommendationRain()}
      <img src={recom} alt="recommendations" />
    </div>
  );
};

export default RainRecommendations;
