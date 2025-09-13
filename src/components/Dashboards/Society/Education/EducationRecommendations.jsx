import React from "react";
import { Fieldset } from "primereact/fieldset";
import { Badge } from "primereact/badge";
import recom from "assets/recommendations.svg";

const EducationRecommendations = () => {
  const getRecommendation = () => {
    return (
      <div className="flex flex-column">
          <li className="font-medium text p-0 m-0">
            Build more grade-wise (primary, secondary, higher, university)
            educational institutions in underserved areas to ensure access to
            education for all students.
          </li>{" "}
          <li className="font-medium text p-0 m-0">
            Increase funding for institutes focused on research and innovation
            to foster a research-driven culture in universities and colleges.
          </li>{" "}
          <li className="font-medium text p-0 m-0">
            Provide more scholarships and financial aid for economically
            disadvantaged students to improve access to higher education and
            post-graduate studies.
          </li>
          <li className="font-medium text p-0 m-0">
            Regularly update and revise the curriculum across all grades to
            reflect global best practices and to include technology and
            entrepreneurship.
          </li>{" "}
          <li className="font-medium text p-0 m-0">
            Develop infrastructure and resources for students with special
            needs, ensuring inclusivity at all levels of education.
          </li>
          <li className="font-medium text p-0 m-0">
            Provide research fellowships and grants to post-graduate and PhD
            students, focusing on local and global challenges like
            sustainability, technology, and health.
          </li>
          <li className="font-medium text p-0 m-0">
            Establish comprehensive student counseling services in all schools
            and colleges, focusing on career guidance, mental health support,
            and academic advising.
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

export default EducationRecommendations;
