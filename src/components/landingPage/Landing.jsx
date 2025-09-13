import React from "react";
import MySvgImage from "assets/Landing Page revised illustration 1.svg";
import { Button } from "primereact/button";

const Landing = () => {
  return (
    <div
      className="flex flex-column align-items-center md:flex-wrap"
      style={{ marginTop: 80 }}
    >
      <p className="text-4xl text-primary1 m-0 p-0 font-bold textAni">
        City Sustainability Index
      </p>
      <p className="text-4xl text-primary1 m-0 p-0 font-medium">
        Measuring and Boosting Urban Sustainability
      </p>
      <p className="text-xl text font-medium">
        Empowering governments, businesses and citizens to track and improve
        urban sustainability for a greener future.
      </p>

      {/* <Button
          label="Explore More"
          icon="pi pi-globe"
          className="bg-primary1 mb-3"
          raised
          // onClick={scrollToCSISteps} // Add onClick handler
        /> */}

      <img className="w-full" src={MySvgImage} alt="Landing Illustration" />
    </div>
  );
};

export default Landing;
