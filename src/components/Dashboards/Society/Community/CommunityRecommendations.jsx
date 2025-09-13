import React from "react";
import { Fieldset } from "primereact/fieldset";
import { Badge } from "primereact/badge";
import recom from "assets/recommendations.svg";

const CommunityRecommendations = () => {
  const getRecommendation = () => {
    return (
      <div className="flex flex-column">
        <li className="font-medium text p-0 m-0">
          Organize regular public forums and town hall meetings to encourage
          citizen participation in local decision-making processes.
        </li>
        <li className="font-medium text p-0 m-0">
          Involve residents in the budget allocation process for local projects,
          enabling them to have a direct say in how resources are distributed.
        </li>
        <li className="font-medium text p-0 m-0">
          Organize workshops on topics like mindfulness, stress management, and
          mental well-being, integrating traditional and modern practices.
        </li>
        <li className="font-medium text p-0 m-0">
          Launch city-wide fitness initiatives such as walkathons, marathons, or
          cycling events to promote physical health and foster social bonding.
        </li>
        <li className="font-medium text p-0 m-0">
          Implement mobile health services to increase access to healthcare in
          underserved areas of the city, especially for mental health support.
        </li>
        <li className="font-medium text p-0 m-0">
          Run awareness campaigns and training programs to empower residents
          with the knowledge and skills needed to actively engage in civic life.
        </li>
      </div>
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
      <img src={recom} alt="recommendations" className="h-18rem py-2" />
    </div>
  );
};

export default CommunityRecommendations;
