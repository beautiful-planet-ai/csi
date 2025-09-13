import React from "react";

const Profile = ({ letter, size = 150 }) => {
  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 25 25"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="50" r="50" fill="#fff" />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        // fontSize="2rem"
        fill="#001F23"
        fontFamily="Montserrat"
        fontWeight="600"
      >
        {letter}
      </text>
    </svg>
  );
};

export default Profile;
