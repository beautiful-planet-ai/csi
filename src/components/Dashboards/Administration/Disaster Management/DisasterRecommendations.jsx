import React from "react";
import { Fieldset } from "primereact/fieldset";
import { Badge } from "primereact/badge";
import recom from "assets/recommendations.svg";

const DisasterRecommendations = () => {
  const getRecommendation = () => {
    return (
      <>
        <ul className="font-medium text p-0 m-0">
            <li>
              1. Evacuation of Affected Areas: Safe and timely relocation of
              people from high-risk zones.
            </li>{" "}
            <li>
              {" "}
              2. Search and Rescue Operations: Deployment of rescue teams to
              find and assist trapped or missing individuals.
            </li>{" "}
            <li>
              3. Medical Aid and Emergency Services: Setting up medical camps
              and providing first aid to injured victims.
            </li>
            {""}
            <li>
              4. Shelter and Relief Camps: Establishment of temporary shelters
              for displaced individuals with access to food, water, and basic
              amenities.
            </li>{" "}
            <li>
              5. Disaster Response Teams Deployment: Mobilization of National
              Disaster Response Force (NDRF) and other emergency units.
            </li>
          </ul>
      </>
    );
  };

  const getBadge = () => {
    return (
      <Badge
        value="Measures for Disaster Management"
        //severity="Good"
        style={{ backgroundColor: "#1F8297" }}
      />
    );
  };

  return (
     <div className="flex align-items-center justify-content-around px-5">
     {/* <h1 className="text-left text-xl">Recommendations</h1> */}
     {/* <Fieldset legend={getBadge()}> */}
     {getRecommendation()}
     {/* </Fieldset> */}
     <img src={recom} alt="recommendations" className="h-16rem py-2"/>
   </div>
  );
};

export default DisasterRecommendations;
