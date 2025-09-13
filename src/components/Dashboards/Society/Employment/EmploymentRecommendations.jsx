import React from "react";
import { Fieldset } from "primereact/fieldset";
import { Badge } from "primereact/badge";
import recom from "assets/recommendations.svg";

const EmploymentRecommendations = () => {
  const getRecommendation = () => {
    return (
      <div className="flex flex-column">
          <li className="font-medium text p-0 m-0">
            Ensure that job advertisements are accessible to all, including
            individuals with disabilities, and promote equal opportunity
            employment.
          </li>
          <li className="font-medium text p-0 m-0">
            Organize job fairs that connect local employers with job seekers,
            facilitating direct engagement and networking.
          </li>
          <li className="font-medium text p-0 m-0">
            Implement programs that support and formalize informal businesses,
            providing them with access to financing and legal resources.
          </li>
          <li className="font-medium text p-0 m-0">
            Develop apprenticeship programs in partnership with local industries
            to provide hands-on experience and facilitate job placements.
          </li>
          <li className="font-medium text p-0 m-0">
            Encourage companies to adopt diverse hiring practices, promoting
            representation of various groups in the workforce.
          </li>
          <li className="font-medium text p-0 m-0">
            Establish vocational training centers that focus on high-demand
            skills, ensuring alignment with local job market needs.
          </li>
          <li className="font-medium text p-0 m-0">
            Provide tax breaks or grants to companies that create jobs in
            high-unemployment areas, encouraging local hiring.
          </li>
          <li className="font-medium text p-0 m-0">
            Create incubation centers that offer resources and mentorship to new
            businesses, fostering entrepreneurship and job creation.
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
      <img src={recom} alt="recommendations" className="h-18rem py-2"/>
    </div>
  );
};

export default EmploymentRecommendations;
