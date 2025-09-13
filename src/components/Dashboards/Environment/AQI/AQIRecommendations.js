import React from "react";
import { Fieldset } from "primereact/fieldset";
import { Badge } from "primereact/badge";
import recom from "assets/recommendations.svg";

const AQIRecommendations = ({ aqi, pm25, pm10 }) => {
  const getRecommendation = (aqi) => {
    if (aqi <= 100) {
      return (
        <div className="flex flex-column">
          <li className="font-medium text">
            No special precautions are needed. The air quality is healthy, and
            outdoor activities are safe for everyone.
          </li>
          <li className="font-medium text">
            Most people can continue their outdoor activities as usual. Those
            who are unusually sensitive to air pollution may consider reducing
            prolonged or intense outdoor exertion.
          </li>
          <li className="font-medium text">
            Encourage walking, cycling, and the use of public transport to help
            maintain good air quality. Reducing vehicle emissions and energy
            consumption contributes to sustained good air quality.
          </li>
          <li className="font-medium text">
            Use this time to educate the public about the importance of
            maintaining good air quality and actions that can help prevent
            pollution, such as reducing vehicle use, conserving energy, and
            supporting green initiatives.
          </li>
        </div>
      );
    } else if (aqi > 100 && aqi <= 200) {
      if (pm25 >= pm10) {
        return (
          <div className="flex flex-column">
            <li className="font-medium text">
              While most people can continue with their daily activities, it is
              advisable to limit prolonged or intense outdoor activities,
              especially if you start to feel symptoms like throat irritation,
              coughing, or shortness of breath.
            </li>
            <li className="font-medium text">
              Keep windows and doors closed to prevent outdoor air from entering
              your home or workplace. Use air purifiers with HEPA filters to
              reduce indoor PM2.5 levels.
            </li>
            <li className="font-medium text">
              Consider wearing a high-quality mask, such as an N95, when
              outdoors for extended periods, especially if you are in areas with
              higher pollution levels.
            </li>
            <li className="font-medium text">
              Sensitive Groups (Children, Elderly, Pregnant Women, and People
              with Respiratory or Heart Conditions): Reduce or avoid outdoor
              activities, particularly strenuous ones like jogging, cycling, or
              outdoor sports, as these can increase your exposure to harmful
              PM2.5 particles.
            </li>
            <li className="font-medium text">
              Avoid using vehicles unnecessarily and opt for public transport,
              carpooling, or cycling. Reducing vehicle emissions can help lower
              PM2.5 levels.
            </li>
            <li className="font-medium text">
              Refrain from burning wood, leaves, or other materials, as this can
              contribute to PM2.5 pollution.
            </li>
          </div>
        );
      } else if (pm10 > pm25) {
        return (
          <div className="flex flex-column">
            <li className="font-medium text">
              PM10 particles are typically generated from sources like
              construction sites, road dust, industrial activities, and vehicle
              emissions. Natural sources like wildfires and dust storms can also
              contribute. Those with pre-existing conditions should closely
              monitor symptoms such as coughing, wheezing, or difficulty
              breathing. Consult a healthcare provider if symptoms persist or
              worsen.
            </li>
            <li className="font-medium text">
              People with respiratory or heart conditions, older adults, and
              children should limit prolonged outdoor exertion. Consider
              rescheduling outdoor activities to a time when air quality is
              better.
            </li>
            <li className="font-medium text">
              Workers who spend extended periods outdoors should use protective
              gear such as masks designed to filter out PM10 particles, take
              frequent breaks, and reduce heavy exertion.
            </li>
            <li className="font-medium text">
              Keep windows and doors closed to prevent PM10 from entering
              indoors. Use air purifiers with HEPA filters if available to
              reduce indoor particle levels.
            </li>
            <li className="font-medium text">
              Avoid using exhaust fans that bring in outdoor air. Instead, use
              recirculating air systems to keep indoor air clean.
            </li>
            <li className="font-medium text">
              If driving, keep windows closed and use the recirculate air
              setting in the vehicle to avoid drawing in polluted air.
            </li>
            <li className="font-medium text">
              Drink plenty of fluids to help keep the throat and respiratory
              system clear of irritants.
            </li>
            <li className="font-medium text">
              Authorities should issue advisories to inform the public about the
              current air quality, expected trends, and protective measures.
              Provide guidance on how to reduce exposure, especially for at-risk
              populations.
            </li>
          </div>
        );
      }
    } else if (aqi > 200 && aqi <= 300) {
      if (pm25 >= pm10) {
        return (
          <div className="flex flex-column">
            <li className="font-medium text">
              {" "}
              Stay indoors with windows and doors closed, and avoid any form of
              outdoor exercise or exposure.
            </li>
            <li className="font-medium text">
              Monitor the health of children, elderly, and those with chronic
              conditions closely, and provide immediate medical attention if
              symptoms worsen.
            </li>
            <li className="font-medium text">
              Implement temporary measures to reduce pollution sources, such as
              restricting vehicle use, controlling industrial emissions, and
              banning outdoor burning.
            </li>
            <li className="font-medium text">
              Refrain from outdoor exercise or any activities that increase
              breathing rate.
            </li>
            <li className="font-medium text">
              Consider using air purifiers with HEPA filters to reduce indoor
              air pollution levels.
            </li>
            <li className="font-medium text">
              Regularly check local AQI levels and follow guidance from health
              authorities.
            </li>
          </div>
        );
      } else if (pm10 > pm25) {
        return (
          <div className="flex flex-column">
            <li className="font-medium text">
              {" "}
              When AQI is between 201 and 300 due to high PM10 levels, the
              primary focus should be on minimizing exposure to polluted air,
              especially for sensitive groups. Staying indoors, limiting
              physical exertion, using protective masks, and ensuring clean
              indoor air are key recommendations.
            </li>
            <li className="font-medium text">
              {" "}
              People with respiratory or heart conditions, older adults,
              children, and pregnant women should stay indoors as much as
              possible to avoid exposure.
            </li>
            <li className="font-medium text">
              Schools and workplaces should limit outdoor activities, including
              recess and outdoor physical education for children, and consider
              flexible working arrangements to minimize exposure.
            </li>
            <li className="font-medium text">
              Ensure that HVAC systems are equipped with effective filters to
              reduce indoor pollution levels. Avoid opening windows during
              high-pollution periods.
            </li>
            <li className="font-medium text">
              Authorities should issue public health warnings, especially
              targeting sensitive populations, and provide real-time updates on
              air quality.
            </li>
            <li className="font-medium text">
              Encourage the use of clean energy sources and reduce the reliance
              on fossil fuels in both industrial and residential areas.
            </li>
          </div>
        );
      }
    } else if (aqi > 300 && aqi <= 400) {
      if (pm25 >= pm10) {
        return (
          <div className="flex flex-column">
            <li className="font-medium text">
              {" "}
              Minimize time spent outdoors. If you need to go outside, try to
              limit exposure and reduce the intensity and duration of physical
              activities.
            </li>
            <li className="font-medium text">
              Children and the elderly should be particularly cautious. They
              should stay indoors and avoid any strenuous activities that could
              exacerbate health issues.
            </li>
            <li className="font-medium text">
              Ensure that their indoor environment is as clean and air-tight as
              possible.
            </li>
            <li className="font-medium text">
              People with respiratory conditions (like asthma or chronic
              bronchitis), cardiovascular issues, or other health problems
              should take extra precautions. They should avoid going outside and
              adhere to their prescribed medications and health routines.
            </li>
            <li className="font-medium text">
              Implement measures to reduce traffic congestion and industrial
              emissions, such as limiting vehicle use and controlling industrial
              output, if possible.
            </li>
            <li className="font-medium text">
              Encourage telecommuting and remote work to reduce the number of
              vehicles on the road.
            </li>
            <li className="font-medium text">
              Set up community support services to assist vulnerable individuals
              who may have difficulty staying indoors or managing their health
              conditions.
            </li>
            <li className="font-medium text">
              Invest in long-term infrastructure improvements to reduce
              pollution sources and enhance air quality in the community.{" "}
            </li>
          </div>
        );
      } else if (pm10 > pm25) {
        return (
          <div className="flex flex-column">
            <li className="font-medium text">
              {" "}
              People with pre-existing respiratory or cardiovascular conditions,
              children, the elderly, and pregnant women should take extra
              precautions by staying indoors and avoiding exposure to outdoor
              air.
            </li>
            <li className="font-medium text">
              {" "}
              Those with respiratory conditions like asthma or chronic
              obstructive pulmonary disease (COPD) should closely monitor their
              symptoms and have medications, such as inhalers, readily
              available. If symptoms worsen, seek medical advice promptly.
            </li>
            <li className="font-medium text">
              {" "}
              Exposure to high levels of PM10 has been linked to an increased
              risk of heart attacks, strokes, and other cardiovascular diseases,
              particularly in individuals with pre-existing heart conditions.
            </li>
            <li className="font-medium text">
              {" "}
              Children exposed to high levels of PM10 may experience reduced
              lung development and function, which can have long-term health
              impacts.
            </li>
            <li className="font-medium text">
              {" "}
              Consider regular health check-ups, especially if you have
              pre-existing conditions, to monitor any potential impacts from
              poor air quality.
            </li>
            <li className="font-medium text">
              {" "}
              Authorities should consider implementing measures such as limiting
              vehicle use, restricting industrial activities, and enforcing
              pollution controls to reduce the concentration of PM10 in the air.
            </li>
            <li className="font-medium text">
              {" "}
              Provide resources and support to vulnerable groups, such as
              distributing masks or setting up clean air shelters in community
              centers.{" "}
            </li>
          </div>
        );
      }
    } else if (aqi > 400) {
      if (pm25 >= pm10) {
        return (
          <div className="flex flex-column">
            <li className="font-medium text">
              {" "}
              It indicates that the air quality is hazardous. This level of
              pollution poses a serious risk to the health of the general
              public, particularly when the high AQI is due to elevated levels
              of PM2.5 (fine particulate matter). PM2.5 particles are tiny, can
              penetrate deep into the lungs, and even enter the bloodstream,
              causing significant health issues.
            </li>
            <li className="font-medium text">
              {" "}
              Increased risk of respiratory infections, aggravated asthma, and
              chronic obstructive pulmonary disease (COPD). Increased risk of
              heart attacks, strokes, and other cardiovascular issues due to
              inflammation and oxidative stress. Long-term exposure can lead to
              chronic respiratory diseases, decreased lung function, and
              potentially increased mortality rates from cardiovascular and
              respiratory causes.
            </li>
            <li className="font-medium text">
              Those with chronic respiratory or heart conditions should have a
              clear plan for medication use and emergencies. Ensure that rescue
              inhalers or other medications are readily available.
            </li>
            <li className="font-medium text">
              Vulnerable Groups (Children, Elderly, Pregnant Women, and Those
              with Pre-existing Conditions): These groups should take extra
              precautions to stay indoors and reduce exposure. They are more
              susceptible to the adverse health effects of PM2.5.
            </li>
            <li className="font-medium text">
              Consider using N95 or higher-rated masks that can filter out fine
              particles when going outdoors is unavoidable. Ordinary surgical
              masks are less effective against PM2.5 particles.
            </li>
            <li className="font-medium text">
              Traffic and Industrial Controls: Implement traffic restrictions
              and reduce industrial emissions during severe pollution episodes
              to help reduce PM2.5 levels.
            </li>
          </div>
        );
      } else if (pm10 > pm25) {
        return (
          <div className="flex flex-column">
            <li className="font-medium text">
              {" "}
              Individuals with pre-existing conditions should keep their
              medication handy and consult their healthcare provider for an
              action plan in case of worsening symptoms.
            </li>
            <li className="font-medium text">
              High PM10 levels can exacerbate conditions like asthma,
              bronchitis, and other chronic obstructive pulmonary diseases
              (COPD), leading to increased respiratory distress and decreased
              lung function.
            </li>
            <li className="font-medium text">
              Exposure to high levels of PM10 is associated with an increased
              risk of heart attacks, arrhythmias, and other cardiovascular
              issues, particularly in people with pre-existing heart conditions.
            </li>
            <li className="font-medium text">
              Authorities should consider implementing temporary restrictions on
              vehicle use, promoting carpooling, and encouraging the use of
              public transportation to reduce emissions.
            </li>
            <li className="font-medium text">
              Raise public awareness about the health risks of high AQI and the
              importance of taking precautions.
            </li>
            <li className="font-medium text">
              If going outdoors is necessary, wear an N95 or higher-grade mask
              to filter out fine particles. Standard surgical masks are not
              effective against PM10.
            </li>
            <li className="font-medium text">
              Minimize outdoor activities and stay indoors as much as possible,
              especially in well-sealed and air-conditioned buildings. Limit
              exposure by keeping doors and windows closed.
            </li>
          </div>
        );
      }
    }
  };

  const getBadge = (aqi) => {
    if (aqi <= 100) {
      return <Badge value="Good" severity="success" />;
    } else if (aqi > 100 && aqi <= 200) {
      return <Badge value="Moderate" severity="warning" />;
    } else if (aqi > 200 && aqi <= 300) {
      return <Badge value="Poor" severity="danger" />;
    } else if (aqi > 300 && aqi <= 400) {
      return <Badge value="Very Poor" severity="danger" />;
    } else if (aqi > 400) {
      return <Badge value="Severe" severity="danger" />;
    }
  };

  return (
    <div className="p-2">
      {/* <h1 className="text-left text-xl">Recommendations</h1> */}
      <Fieldset legend={getBadge(aqi)}>
        <div className="flex align-items-center justify-content-around">
          {getRecommendation(aqi)}
          <img src={recom} alt="recommendations" className="h-18rem" />
        </div>
      </Fieldset>
    </div>
  );
};

export default AQIRecommendations;
