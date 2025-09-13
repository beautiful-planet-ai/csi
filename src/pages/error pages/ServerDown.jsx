import React from "react";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import animation from "assets/animations/DataNotFound";

export default function ServerDown() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-column align-items-center justify-content-center">
      <p className="text-5xl font-bold" style={{ marginBottom: -80 }}>
        Data Not Found
      </p>
      <Lottie
        animationData={animation}
        loop={true}
        className="h-30rem m-0 p-0"
      />
      <p className="font-medium text-xl">
        Oops! Looks like the server is down. We'll be back shortly.
      </p>
      <Button
        label="Go to Home"
        onClick={() => navigate("/")}
        className="bg-primary1"
        raised
      />
    </div>
  );
}
