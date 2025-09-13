import React, { useEffect, useState } from "react";
import "primeflex/primeflex.css";

const FloatingSidebar = ({ sections }) => {
  const [activeSection, setActiveSection] = useState("");

  const handleScroll = () => {
    let currentActiveSection = "";
    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (
          rect.top <= window.innerHeight / 2 &&
          rect.bottom >= window.innerHeight / 2
        ) {
          currentActiveSection = section.id;
        }
      }
    });
    setActiveSection(currentActiveSection);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sections]);

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: 0,
        transform: "translateY(-50%)",
        backgroundColor: "#fff",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        padding: "1rem",
        borderRadius: "0 5px 5px 0",
        zIndex: 1000,
        maxHeight: "90vh",
        overflowY: "auto",
      }}
      className="floating-sidebar flex flex-column p-3 shadow-2 surface-card"
    >
      <p className="card-title p-0 m-0 font-semibold mb-3">Table of Contents</p>
      <ul className="list-none p-0 m-0">
        {sections.map((section, index) => {
          console.log(section, index, activeSection);
          return (
            <li key={index} className="mb-2">
              <a
                href={`#${section.id}`}
                className={`no-underline text-xl ${
                  activeSection === section.id ? "active" : ""
                }`}
                style={{
                  textDecoration: "none",
                  color: activeSection === section.id ? "#003940" : "#B0BABA",
                  fontWeight: activeSection === section.id ? "bold" : "normal",
                }}
              >
                {section.label}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FloatingSidebar;
