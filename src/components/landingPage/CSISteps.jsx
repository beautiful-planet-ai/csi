import React, { useState, useEffect } from "react";
import { Divider } from "primereact/divider";
import { Card } from "primereact/card";
import "./Landing.css"; // You can place the styles here

// CardItem Component
const CardItem = ({ number, title, content }) => {
  const [fadeInClass, setFadeInClass] = useState("fade-in");

  useEffect(() => {
    // Reset the fade-in class whenever content changes
    setFadeInClass(""); // Remove class
    setTimeout(() => setFadeInClass("fade-in"), 100); // Reapply class after a small delay
  }, [number, title, content]);

  return (
    <div className="flex w-full h-full card-animation">
      <Card
        className="flex justify-content-center w-full card-bg"
        style={{
          background: "linear-gradient(to left, #1F8297, #166C7D, #003940)",
        }}
      >
        <div className="flex flex-column justify-content-between w-full">
          <h3
            className={`text-5xl font-bold text-white m-0 p-0 w-full text-right ${fadeInClass}`}
            style={{ marginTop: -10 }}
          >
            {number}
          </h3>
          <h3
            className={`text-2xl font-semibold text-white text-left ${fadeInClass}`}
          >
            {title}
          </h3>
          <p
            className={`text-white text-left ${fadeInClass}`}
            style={{ textAlign: "center" }}
          >
            {content}
          </p>
        </div>
      </Card>
    </div>
  );
};

// CSISteps Component
const CSISteps = () => {
  const [hoveredTile, setHoveredTile] = useState(0); // Set first card to be visible by default

  // Data for the cards
  const cardData = [
    {
      number: "01",
      title: "Framework Architecture Construction",
      content:
        "CSI is developed within a constructive framework where comprehensive parameters are defined for each key indicator. These parameters provide a detailed understanding of various aspects of sustainability.",
    },
    {
      number: "02",
      title: "Data Collection and Processing",
      content:
        "Systematic data collection forms a fundamental aspect of the CSI framework. Relevant and accurate datasets are collected to support the evaluation of each parameter. These datasets are then refined to enhance accuracy and processed for improved representation.",
    },
    {
      number: "03",
      title: "Benchmarking and Calculating Score",
      content:
        "Benchmarking is utilized to set standards for specific parameters. The CSI framework calculates a cumulative score or index by aggregating the performance across all defined parameters.",
    },
    {
      number: "04",
      title: "Evaluation Engine-Sustainability and Insights",
      content:
        "By incorporating NSA dimensions, the CSI framework ensures that sustainability is evaluated in a balanced and integrated manner, addressing environmental impact, social responsibility, and governance practices. Thus, actionable insights are generated.",
    },
    {
      number: "05",
      title: "Generating Reports and Recommendations",
      content:
        "Delivering comprehensive city progress reports, meticulously crafted to capture detailed insights and trends. Each report is enriched with tailored recommendations designed to address unique challenges, ensuring actionable strategies that drive sustainable development and continuous improvement.",
    },
  ];

  return (
    <div className="flex align-items-center justify-content-center flex-column gap-3 px-5">
      {/* Heading */}
      <h1 className="text-4xl text-primary1">
        Understanding City Sustainability Index in Simple Steps
      </h1>

      <div className="flex align-items-center justify-content-between gap-2 w-full p-4">
        {/* Cards */}
        <CardItem
          number={cardData[hoveredTile].number}
          title={cardData[hoveredTile].title}
          content={cardData[hoveredTile].content}
        />

        <Divider
          type="solid"
          layout="vertical"
          className="w-0.0625rem h-20rem surface-100 ml-8 mr-8"
        />

        {/* Steps */}
        <div className="flex align-items-start justify-content-center flex-column gap-8 w-full relative">
          {cardData.map((data, index) => {
            const isHovered = hoveredTile === index;
            return (
              <div
                key={index}
                className="flex align-items-center justify-content-between w-full"
                onMouseEnter={() => setHoveredTile(index)}
                onMouseLeave={() => setHoveredTile(0)} // Set back to default card on mouse leave
              >
                {/* Change tile color based on hover state */}
                {index === 0 && (
                  <div
                    className="flex align-items-center justify-content-start flex-row"
                    style={{
                      zIndex: isHovered ? 2 : 1,
                    }}
                  >
                    {/* Container for the number and title with background color */}
                    <div
                      className="flex align-items-center justify-content-start w-15rem border-round-lg p-2"
                      style={{
                        backgroundColor: "#E9F3F5", // Background color
                      }}
                    >
                      {/* Number in a circle */}
                      <div
                        className="flex align-items-center justify-content-center border-circle"
                        style={{
                          backgroundColor: "#1F8297",
                          color: "#fff",
                          //  width: "2.5rem",
                          //  height: "2.5rem",
                          padding: "0.6rem",
                          paddingRight: "0.72rem",
                          paddingLeft: "0.72rem",
                          textAlign: "center",
                          marginRight: "1rem",
                        }}
                      >
                        {data.number}
                      </div>

                      {/* Title left-aligned */}
                      <p
                        className="text-sm m-0"
                        style={{
                          textAlign: "left", // Left-align the text
                          color: "#003940", // Darker text color
                          fontWeight: "500", // Bold font for better emphasis
                        }}
                      >
                        {data.title}
                      </p>
                    </div>

                    <Divider type="solid" className="w-5rem" />
                    <svg
                      width="260"
                      height="99"
                      viewBox="0 0 260 99"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.95">
                        <path
                          d="M260 43.2L130 86.3L0 43.2L130 0L260 43.2Z"
                          fill={isHovered ? "#1F8297" : "#F1F1F1"} // teal when hovered, grey when not
                        ></path>
                        <path
                          d="M0 43.2002V55.0002L130 98.1002V86.3002L0 43.2002Z"
                          fill={isHovered ? "#166C7D" : "#E6E6E9"} // teal shades when hovered
                        ></path>
                        <path
                          d="M260 43.2002V55.0002L130 98.1002V86.3002L260 43.2002Z"
                          fill={isHovered ? "#003940" : "#D1D1DA"} // teal shades when hovered
                        ></path>
                      </g>
                    </svg>
                  </div>
                )}
                {index === 1 && (
                  <div
                    className="flex align-items-center justify-content-center flex-row"
                    style={{
                      marginTop: "-10rem",
                      marginLeft: "20rem",
                      zIndex: isHovered ? 3 : 1,
                    }}
                  >
                    <svg
                      width="260"
                      height="99"
                      viewBox="0 0 260 99"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.95">
                        <path
                          d="M260 43.2L130 86.3L0 43.2L130 0L260 43.2Z"
                          fill={isHovered ? "#1F8297" : "#F1F1F1"} // teal when hovered, grey when not
                        ></path>
                        <path
                          d="M0 43.2002V55.0002L130 98.1002V86.3002L0 43.2002Z"
                          fill={isHovered ? "#166C7D" : "#E6E6E9"} // teal shades when hovered
                        ></path>
                        <path
                          d="M260 43.2002V55.0002L130 98.1002V86.3002L260 43.2002Z"
                          fill={isHovered ? "#003940" : "#D1D1DA"} // teal shades when hovered
                        ></path>
                      </g>
                    </svg>
                    <Divider type="solid" className="w-5rem" />
                    {/* Container for the number and title with background color */}
                    <div
                      className="flex align-items-center justify-content-start w-13rem border-round-lg p-2"
                      style={{
                        backgroundColor: "#E9F3F5", // Background color
                      }}
                    >
                      {/* Number in a circle */}
                      <div
                        className="flex align-items-center justify-content-center border-circle"
                        style={{
                          backgroundColor: "#1F8297", // Circle background
                          color: "#fff", // Text color
                          // width: "2.5rem", // Circle width and height
                          // height: "2.5rem",
                          padding: "0.6rem", // Padding inside the circle
                          textAlign: "center",
                          marginRight: "1rem", // Space between number and title
                        }}
                      >
                        {data.number}
                      </div>

                      {/* Title left-aligned */}
                      <p
                        className="text-sm m-0"
                        style={{
                          textAlign: "left", // Left-align the text
                          color: "#003940", // Darker text color
                          fontWeight: "500", // Bold font for better emphasis
                        }}
                      >
                        {data.title}
                      </p>
                    </div>
                  </div>
                )}
                {index === 2 && (
                  <div
                    className="flex align-items-center justify-content-center flex-row"
                    style={{ marginTop: "-10rem", zIndex: isHovered ? 4 : 1 }}
                  >
                    {/* Container for the number and title with background color */}
                    <div
                      className="flex align-items-center justify-content-start w-15rem border-round-lg p-2"
                      style={{
                        backgroundColor: "#E9F3F5", // Background color
                      }}
                    >
                      {/* Number in a circle */}
                      <div
                        className="flex align-items-center justify-content-center border-circle"
                        style={{
                          backgroundColor: "#1F8297", // Circle background
                          color: "#fff", // Text color
                          // width: "2.5rem", // Circle width and height
                          // height: "2.5rem",
                          padding: "0.6rem", // Padding inside the circle
                          textAlign: "center",
                          marginRight: "1rem", // Space between number and title
                        }}
                      >
                        {data.number}
                      </div>

                      {/* Title left-aligned */}
                      <p
                        className="text-sm m-0"
                        style={{
                          textAlign: "left", // Left-align the text
                          color: "#003940", // Darker text color
                          fontWeight: "500", // Bold font for better emphasis
                        }}
                      >
                        {data.title}
                      </p>
                    </div>

                    <Divider type="solid" className="w-5rem" />
                    <svg
                      width="260"
                      height="99"
                      viewBox="0 0 260 99"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.95">
                        <path
                          d="M260 43.2L130 86.3L0 43.2L130 0L260 43.2Z"
                          fill={isHovered ? "#1F8297" : "#F1F1F1"} // teal when hovered, grey when not
                        ></path>
                        <path
                          d="M0 43.2002V55.0002L130 98.1002V86.3002L0 43.2002Z"
                          fill={isHovered ? "#166C7D" : "#E6E6E9"} // teal shades when hovered
                        ></path>
                        <path
                          d="M260 43.2002V55.0002L130 98.1002V86.3002L260 43.2002Z"
                          fill={isHovered ? "#003940" : "#D1D1DA"} // teal shades when hovered
                        ></path>
                      </g>
                    </svg>
                  </div>
                )}
                {index === 3 && (
                  <div
                    className="flex align-items-center justify-content-center flex-row"
                    style={{
                      marginTop: "-10rem",
                      marginLeft: "20rem",
                      zIndex: isHovered ? 5 : 1,
                    }}
                  >
                    <svg
                      width="260"
                      height="99"
                      viewBox="0 0 260 99"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.95">
                        <path
                          d="M260 43.2L130 86.3L0 43.2L130 0L260 43.2Z"
                          fill={isHovered ? "#1F8297" : "#F1F1F1"} // teal when hovered, grey when not
                        ></path>
                        <path
                          d="M0 43.2002V55.0002L130 98.1002V86.3002L0 43.2002Z"
                          fill={isHovered ? "#166C7D" : "#E6E6E9"} // teal shades when hovered
                        ></path>
                        <path
                          d="M260 43.2002V55.0002L130 98.1002V86.3002L260 43.2002Z"
                          fill={isHovered ? "#003940" : "#D1D1DA"} // teal shades when hovered
                        ></path>
                      </g>
                    </svg>
                    <Divider type="solid" className="w-5rem" />
                    {/* Container for the number and title with background color */}
                    <div
                      className="flex align-items-center justify-content-start w-13rem border-round-lg p-2"
                      style={{
                        backgroundColor: "#E9F3F5", // Background color
                      }}
                    >
                      {/* Number in a circle */}
                      <div
                        className="flex align-items-center justify-content-center border-circle"
                        style={{
                          backgroundColor: "#1F8297", // Circle background
                          color: "#fff", // Text color
                          // width: "2.5rem", // Circle width and height
                          // height: "2.5rem",
                          padding: "0.6rem", // Padding inside the circle
                          textAlign: "center",
                          marginRight: "1rem", // Space between number and title
                        }}
                      >
                        {data.number}
                      </div>

                      {/* Title left-aligned */}
                      <p
                        className="text-sm m-0"
                        style={{
                          textAlign: "left", // Left-align the text
                          color: "#003940", // Darker text color
                          fontWeight: "500", // Bold font for better emphasis
                        }}
                      >
                        {data.title}
                      </p>
                    </div>
                  </div>
                )}
                {index === 4 && (
                  <div
                    className="flex align-items-center justify-content-center flex-row"
                    style={{ marginTop: "-10rem", zIndex: isHovered ? 6 : 1 }}
                  >
                    {/* Container for the number and title with background color */}
                    <div
                      className="flex align-items-center justify-content-start w-15rem border-round-lg p-2"
                      style={{
                        backgroundColor: "#E9F3F5", // Background color
                      }}
                    >
                      {/* Number in a circle */}
                      <div
                        className="flex align-items-center justify-content-center border-circle"
                        style={{
                          backgroundColor: "#1F8297", // Circle background
                          color: "#fff", // Text color
                          // width: "2.5rem", // Circle width and height
                          // height: "2.5rem",
                          padding: "0.6rem", // Padding inside the circle
                          textAlign: "center",
                          marginRight: "1rem", // Space between number and title
                        }}
                      >
                        {data.number}
                      </div>

                      {/* Title left-aligned */}
                      <p
                        className="text-sm m-0"
                        style={{
                          textAlign: "left", // Left-align the text
                          color: "#003940", // Darker text color
                          fontWeight: "500", // Bold font for better emphasis
                        }}
                      >
                        {data.title}
                      </p>
                    </div>

                    <Divider type="solid" className="w-5rem" />
                    <svg
                      width="260"
                      height="99"
                      viewBox="0 0 260 99"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.95">
                        <path
                          d="M260 43.2L130 86.3L0 43.2L130 0L260 43.2Z"
                          fill={isHovered ? "#1F8297" : "#F1F1F1"} // teal when hovered, grey when not
                        ></path>
                        <path
                          d="M0 43.2002V55.0002L130 98.1002V86.3002L0 43.2002Z"
                          fill={isHovered ? "#166C7D" : "#E6E6E9"} // teal shades when hovered
                        ></path>
                        <path
                          d="M260 43.2002V55.0002L130 98.1002V86.3002L260 43.2002Z"
                          fill={isHovered ? "#003940" : "#D1D1DA"} // teal shades when hovered
                        ></path>
                      </g>
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CSISteps;
