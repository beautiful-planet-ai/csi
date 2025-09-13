import React from "react";
import { Carousel } from "primereact/carousel"; // Import Carousel from PrimeReact
import Questions from "./Questions"; // Adjust the import path as necessary
import { useState } from "react";

const QuestionsCarousel = () => {
  const [autoplay, setAutoplay] = useState(true);
  const questionsData = [
    {
      textColor: "white",
      bgColor: "var(--theme-primary-color)",
      question: "What is City Sustainability Index (CSI)?",
      points: [
        {
          subheading: "Comprehensive evaluation tool",
          content:
            "The CSI is designed to assess the overall sustainability performance of cities by monitoring various indicators across key sustainability dimensions.",
        },
        {
          subheading: "Integration of NSA dimensions",
          content:
            "The index incorporates three core dimensions—Nature, Society, and Administration (NSA) —which are critical to determining the overall sustainability of a city.",
        },
        {
          subheading: "Benchmarking performance",
          content:
            "Cities can use the CSI to compare their performance against other cities and global standards, allowing them to identify strengths and areas for improvement.",
        },
        {
          subheading: "Actionable insights",
          content:
            "By providing a cumulative sustainability score, the CSI offers city leaders, policymakers, and planners valuable data to support decision-making, enhance urban resilience, and drive sustainable growth.",
        },
        {
          subheading: "Encouraging continuous improvement",
          content:
            "The CSI not only evaluates current performance but also motivates cities to adopt long-term sustainable practices by highlighting progress over time and rewarding improvements.",
        },
      ],
    },
    {
      textColor: "black",
      bgColor: "var(--theme-secondary)",
      question:
        "Why is CSI important for cities, and who benefits from it?",
      points: [
        {
          subheading: "Standardized sustainability measurement",
          content:
            "The CSI offers cities a uniform framework to measure and evaluate their sustainability efforts, aligning them with global benchmarks such as the United Nations’ 17 Sustainable Development Goals (SDGs).",
        },
        {
          subheading: "Progress tracking and action planning",
          content:
            "With detailed insights into their sustainability performance, cities can monitor progress, identify gaps, and develop informed action plans to create resilient, inclusive, and sustainable urban environments.",
        },
        {
          subheading: "Fostering healthy competition",
          content:
            "By enabling cities to compare their sustainability performance with peers, the CSI promotes healthy competition, motivating cities to improve and meet higher sustainability standards.",
        },
        {
          subheading: "Encouraging knowledge exchange and innovation",
          content:
            "The competitive environment fosters collaboration among cities, allowing them to share best practices and innovative solutions to common urban challenges, ultimately driving more sustainable urban development globally.",
        },
        {
          subheading: "Beneficiaries of the CSI",
          content:
            "City leaders, policymakers, urban planners, and citizens all gain valuable insights from the CSI, empowering them to address sustainability challenges and seize opportunities to enhance quality of life and environmental stewardship in their urban areas.",
        },
      ],
    },
    {
      textColor: "white",
      bgColor: "var(--theme-primary-color)",
      question:
        "How can cities leverage CSI to enhance their sustainability efforts?",
      points: [
        {
          subheading: "Pinpoint areas for improvement",
          content:
            "Cities can utilize the CSI platform to identify specific gaps in their sustainability performance across the nature, society, and administration (NSA) dimensions, allowing for precise interventions.",
        },
        {
          subheading: "Gain in-depth insights",
          content:
            "The CSI provides detailed analyses for each dimension, equipping city leaders with a clear understanding of the root causes behind their scores and highlighting priority areas for action.",
        },
        {
          subheading: "Create targeted action plans",
          content:
            "With insights derived from the CSI, cities can develop focused strategies and policies that effectively address identified gaps, leading to a more systematic approach to sustainability enhancement.",
        },
        {
          subheading: "Monitor performance near real-time",
          content:
            "The platform’s real-time dashboards enable cities to track performance trends continuously, ensuring timely adjustments and demonstrating progress over time.",
        },
        {
          subheading: "Implement tailored recommendations",
          content:
            "Cities can take advantage of customized, actionable recommendations provided by the CSI to improve their sustainability scores, fostering a culture of ongoing improvement and commitment to long-term sustainability goals.",
        },
      ],
    },
  ];

  // Template function for rendering each item
  const itemTemplate = (data) => (
    <Questions
      question={data.question}
      points={data.points}
      textTheme={data.textColor}
      bgTheme={data.bgColor}
    />
  );

  return (
    <div
      onMouseEnter={() => setAutoplay(false)}
      onMouseLeave={() => setAutoplay(true)}
    >
      <Carousel
        value={questionsData}
        itemTemplate={itemTemplate}
        numVisible={1}
        numScroll={1}
        circular
        autoplay={autoplay}
        autoplayInterval={5000} // Adjust as needed
      />
      {/* {questionsData.map((data, index) => (
          <div key={index}>
            <Questions
              question={data.question}
              points={data.points}
              textTheme="white" // Adjust if needed
            />
          </div>
        ))}
      </Carousel> */}
    </div>
  );
};

export default QuestionsCarousel;
