import React, { useRef, useState } from "react";
import { Button } from "primereact/button";
import "primeflex/primeflex.css";
import CSISteps from "../components/landingPage/CSISteps";
import Testimonials from "../components/landingPage/Testimonials";
import Footer from "../components/landingPage/Footer";
import CSIVideo from "../components/landingPage/CSIVideo";
import UserDialog from "../components/landingPage/UserDialog";
import Header from "../Layout/Header";
import FAQChatbot from "../components/landingPage/FAQChatbot";
import { ScrollTop } from "primereact/scrolltop";
import FloatingSidebar from "components/landingPage/FloatingSidebar";
import QuestionsCarousel from "components/landingPage/QuestionsCarousel";
import LandingCarousel from "components/landingPage/LandingCarousel";
import LandingVideo from "components/landingPage/LandingVideo";
import Parameters from "components/landingPage/Parameters";

// Main LandingScreen component
const LandingScreen = () => {
  // Create a reference for the target div
  const csiStepsRef = useRef(null);

  const userDialogRef = useRef(null);
  const [successMessage, setSuccessMessage] = useState("");

  // Function to scroll to CSI Steps
  const scrollToCSISteps = () => {
    if (csiStepsRef.current) {
      csiStepsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleGetInTouchClick = () => {
    if (userDialogRef.current) {
      userDialogRef.current.openDialog();
    }
  };

  // Callback to set the success message from the dialog component
  const handleSuccess = (message) => {
    setSuccessMessage(message);
  };

  const sections = [
    // { id: "header", label: "Header" },
    { id: "csi-steps", label: "CSI Steps" },
    { id: "csi-video", label: "CSI Video" },
    { id: "parameters", label: "Parameters" },
    { id: "questions", label: "FAQs" },
    { id: "testimonials", label: "Testimonials" },
    // { id: "footer", label: "Footer" },
  ];

  return (
    <div className="flex flex-column w-full">
      {/* Header */}
      <Header />

      {/* Add top padding to avoid overlap with fixed header */}
      <div className="View bg-white flex flex-column">
        {/* <LandingCarousel /> */}
        <LandingVideo/>
        <FAQChatbot />
        <div
          ref={csiStepsRef} // Set the ref here
          className="flex justify-content-center gap-6 flex-nowrap w-full overflow-auto  block"
          id="csi-steps"
        >
          <CSISteps />
        </div>

        {/* <div className="flex sec-theme block" id="csi-video">
          <CSIVideo />
        </div> */}

        <div
          className="flex justify-content-center w-full overflow-auto p-5 block"
          id="parameters"
        >
          <Parameters />
        </div>

        <div className="flex flex-column block" id="questions">
          <QuestionsCarousel />
        </div>
        <ScrollTop />
        <div className="flex sec-theme p-8 block" id="testimonials">
          <Testimonials />
        </div>
        {/* <iframe
          title="Temp. Dashboard"
          width="1240"
          height="541.25"
          src="https://app.powerbi.com/reportEmbed?reportId=c681af69-5780-4ecc-af1f-48049fb683cb&autoAuth=true&ctid=e25b7a25-9cae-4302-a16e-1fa1d5211fae"
          frameborder="0"
          allowFullScreen="true"
        ></iframe> */}
        <div
          className="px-8 block"
          style={{
            background: "linear-gradient(to bottom, #E9F3F5 50%, #166c7d 50%)",
          }}
        >
          <div className="border-round bg-white p-6 align-items-center justify-content-center">
            <h3 className="text-center text-3xl mb-5 text-primary1">
              Still have questions?
            </h3>
            <p className="text-lg text-center mb-5" style={{ marginTop: -10 }}>
              Can’t find the answer you’re looking for? Please connect with our
              team.
            </p>
            <div className="flex justify-content-center">
              {successMessage ? (
                <div className="text-green-400 font-semibold text-xl text-center mb-2">
                  {successMessage}
                </div>
              ) : (
                <Button
                  label="Get in Touch"
                  className="w-12rem bg-primary1"
                  raised
                  onClick={handleGetInTouchClick}
                />
              )}
            </div>
          </div>

          {/* Pass handleSuccess as a prop to UserDialog */}
          <UserDialog ref={userDialogRef} onSuccess={handleSuccess} />
        </div>
        <Footer />
      </div>
      {/* <FloatingSidebar sections={sections} /> */}
    </div>
  );
};

export default LandingScreen;
