import React from "react";
import { Fieldset } from "primereact/fieldset";
import { Badge } from "primereact/badge";
import recom from "assets/recommendations.svg";

const HealthcareRecommendations = () => {
  const getRecommendation = () => {
    return (
      <div className="flex flex-column">
          <li className="font-medium text p-0 m-0">
            Expand the number of registered (NABH accredited) private and
            government hospitals and dispensaries across the city.
          </li>{" "}
          <li className="font-medium text p-0 m-0">
            Ensure all healthcare facilities, nursing homes, and private
            hospitals are NABH accredited to guarantee safety and quality
            standards.
          </li>{" "}
          <li className="font-medium text p-0 m-0">
            Enhance access to vaccination centers, especially for newborns and
            high-risk groups (e.g., flu, cervical cancer).
          </li>
          {""}
          <li className="font-medium text p-0 m-0">
            Establish mobile health clinics to serve underserved and remote
            areas, especially for vulnerable populations.
          </li>{" "}
          <li className="font-medium text p-0 m-0">
            Create 24/7 helplines and digital platforms for mental health
            support, addressing issues like addiction, depression, and
            professional/social stress.
          </li>
          <li className="font-medium text p-0 m-0">
            Increase health insurance coverage per capita by promoting
            affordable public health insurance schemes.
          </li>
          <li className="font-medium text p-0 m-0">
            Enhance the number and quality of rehabilitation centers for
            addiction recovery and mental health support.
          </li>
          <li className="font-medium text p-0 m-0">
            Implement city-wide digital health record systems to track patient
            history, which can be accessed by certified doctors for better
            diagnosis and treatment.
          </li>
          <li className="font-medium text p-0 m-0">
            Run public campaigns to educate residents on preventative care,
            mental health awareness, and the importance of regular health
            checkups.
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
      <img src={recom} alt="recommendations" className="h-20rem py-2" />
    </div>
  );
};

export default HealthcareRecommendations;
