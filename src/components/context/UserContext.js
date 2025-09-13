// UserContext.js
import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [citizenDetails, setCitizenDetails] = useState({});
  const [waterScore, setWaterScore] = useState(0);
  const [transportScore, setTransportScore] = useState(0);

  return (
    <UserContext.Provider
      value={{
        username,
        setUsername,
        citizenDetails,
        setCitizenDetails,
        waterScore,
        setWaterScore,
        transportScore,
        setTransportScore,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
