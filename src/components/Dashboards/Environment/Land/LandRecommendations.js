import React from "react";
import { Fieldset } from "primereact/fieldset";
import { Badge } from "primereact/badge";
import recom from "assets/recommendations.svg";

const LandRecommendations = () => {
  const getRecommendationLand = () => {
    return (
      <div className="flex flex-column">
        <li className="font-medium text p-0 m-0">
          Prioritize high-density, mixed-use development to maximize space
          efficiency and reduce urban sprawl. Encourage vertical expansion over
          horizontal to conserve land.
        </li>

        <li className="font-medium text p-0 m-0">
          Identify underutilized or vacant lands within the existing urban
          fabric for redevelopment, including brownfield sites, abandoned
          structures, and underdeveloped areas. Promote infill development to
          optimize land use.
        </li>

        <li className="font-medium text p-0 m-0">
          Protect existing green spaces from encroachment and degradation.
          Develop new green zones in areas with low tree cover or those
          identified as urban heat islands.
        </li>

        <li className="font-medium text p-0 m-0">
          Designate specific zones for urban afforestation and reforestation
          efforts. Encourage the creation of green roofs, community gardens, and
          vertical gardens in both residential and commercial areas.
        </li>

        <li className="font-medium text p-0 m-0">
          Protect prime agricultural land from conversion to non-agricultural
          uses. Promote sustainable agricultural practices and agroforestry.
        </li>

        <li className="font-medium text">
          Develop policies to prevent urban encroachment into agricultural
          zones. Support small-scale urban farming initiatives and
          community-supported agriculture (CSA).
        </li>

        <p className="text-lg text-primary1 font-semibold">
          Sustainable Urban Expansion:
        </p>
        <li className="font-medium text ml-4">
          Direct new development towards designated growth corridors and areas
          that have existing infrastructure to support it. Avoid expansion into
          ecologically sensitive areas such as wetlands, forests, and
          agricultural zones.
        </li>

        <p className="text-lg text-primary1 font-semibold">
          {" "}
          Smart Zoning Policies:
        </p>
        <li className="font-medium text ml-4">
          Use smart zoning to create mixed-use neighborhoods that combine
          residential, commercial, and recreational spaces, reducing the need
          for long commutes and improving quality of life.
        </li>

        <p className="text-lg text-primary1 font-semibold">
          Urban Renewal Projects:
        </p>
        <li className="font-medium text ml-4">
          Prioritize the redevelopment of dilapidated or underutilized areas.
          Encourage private-public partnerships (PPP) for urban renewal
          initiatives to revitalize older parts of the city.
        </li>

        <li className="font-medium text ml-4">
          Use Geographic Information Systems (GIS) and other data analytics
          tools to monitor land use patterns, assess environmental impact, and
          make informed decisions on land allocation and development.
        </li>
      </div>
    );
  };

  const getBadge = () => {
    return (
      <Badge
        value="Measures for Land Usage"
        //severity="Good"
        style={{ backgroundColor: "#1F8297" }}
      />
    );
  };

  return (
    <div className="flex align-items-center justify-content-around px-5 py-2">
      {/* <h1 className="text-left text-xl">Recommendations</h1> */}
      {/* <Fieldset legend={getBadge()}> */}
      {getRecommendationLand()}
      {/* </Fieldset> */}
      <img src={recom} alt="recommendations"/>
    </div>
  );
};

export default LandRecommendations;
