import React from "react";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import animation from "assets/animations/No Data Found";

export default function NoData() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-column align-items-center gap-2">
      <Lottie
        animationData={animation}
        loop={true}
        className="h-30rem m-0 p-0"
      />
      <p className="font-medium text-xl" style={{marginTop: -20}}>
        Oops! No Data Found. Please upload data first.
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
