import React from "react";
import { Card } from "primereact/card"; // Assuming you're using PrimeReact's Card component

const CSIVideo = () => {
  return (
    <div className="relative w-full h-auto flex justify-content-center align-items-center px-10 m-6">
      {/* Video Section */}
      <video
        src="https://res.cloudinary.com/dsuflgnfi/video/upload/v1727949657/video/ebvtch3zeba4rcsywsrk.mp4"
        controls
        style={{
          width: "100%",
          height: "auto",
          borderRadius: "1rem",
        }}
        loop
      />

      {/* Heading Card (Top Left Corner) */}
      <Card
        className="absolute top-0 left-0"
        style={{
          background: "linear-gradient(to left, #1F8297, #166C7D, #003940)",
          //padding: "1rem",
          width: "18rem",
          height: "6rem",
          borderRadius: "1rem",
          transform: "translate(10%, 40%)",
        }}
      >
        <div style={{ marginTop: -30 }}>
          <h1 className="text-xl font-semibold text-white text-center">
            City Sustainability Index (CSI)
          </h1>
        </div>
      </Card>

      {/* Text Card (Bottom Right Corner) */}
      <Card
        className="absolute bottom-0 right-0 align-items-center"
        style={{
          backgroundColor: "#fff",
          //  padding: "1rem",
          width: "18rem",
          borderRadius: "1rem",
          height: "8rem",
          transform: "translate(-10%, -20%)",
        }}
      >
        <div style={{ marginTop: -30 }}>
          <p className="text-center">
            A groundbreaking tool designed to help governments, businesses, and
            citizens create smarter, more sustainable cities.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default CSIVideo;
