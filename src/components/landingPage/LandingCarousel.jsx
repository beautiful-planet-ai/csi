import { Carousel } from "primereact/carousel";
import React from "react";
import Landing from "./Landing";
import Parameters from "./Parameters";
import LandingVideo from "./LandingVideo";

const LandingCarousel = () => {
  const componentsData = [
    { content: <Parameters /> },
    { content: <LandingVideo /> },
    // { content: <Landing /> },
  ];

  // Template function for rendering each item
  const itemTemplate = (data) => (
    <div className="custom-carousel">{data.content}</div>
  );

  return (
    <Carousel
      // page={0}
      value={componentsData}
      itemTemplate={itemTemplate}
      numVisible={1}
      numScroll={1}
      circular
      autoplay
      autoplayInterval={7000}
    />
  );
};

export default LandingCarousel;
