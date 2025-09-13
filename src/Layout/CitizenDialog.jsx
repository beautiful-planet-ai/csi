import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import axios from "axios";
import signin_ani from "assets/animations/signin.json";
import Lottie from "lottie-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { useUser } from "components/context/UserContext";

const CitizenDialog = ({ visible, onHide }) => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [phone, setPhone] = useState(""); // Phone number input state
  const [otp, setOtp] = useState(""); // OTP input state
  const [message, setMessage] = useState(""); // Message to display
  const { setCitizenDetails } = useUser(); // Accessing user details from context

  const checkPhoneNumber = async () => {
    try {
      // Remove the country code (first two characters)
      const formattedPhone = phone.startsWith("91") ? phone.slice(2) : phone;

      console.log(formattedPhone); // Log the formatted phone number without country code
      const response = await axios.post(
        "https://api-csi.arahas.com/check/phone",
        {
          phone: formattedPhone, // Send formatted phone without country code
        }
      );
      console.log(response);
      setMessage(response.data.message);
      // Check if the user is registered
      if (response.data.register) {
        // Open the chatbot for registration
        visible(false); // Close the dialog

        // Logic to open the chatbot
        // You may need to set a state that triggers the chatbot to open here
      } else {
        // User is registered, ask for OTP
        if (otp === "1234") {
          // Store user details in context
          const userData = response.data.user;
          console.log("🚀 ~ checkPhoneNumber ~ userData:", response.data.user);
          setCitizenDetails({
            name: userData.name,
            email: userData.email,
            city: userData.city,
            state: userData.state,
            phone: formattedPhone,
          });
          // Sample OTP check
          navigate("/citizen/kyc"); // Navigate to KYC page
        } else {
          setMessage("Invalid OTP. Please try again.");
        }
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Error checking phone number");
      }
    }
  };

  return (
    <Dialog
      visible={visible}
      style={{ width: "50rem", textAlign: "center" }}
      onHide={onHide}
      //   onHide={() => setVisible(false)}
    >
      <div className="flex align-items-center justify-content-center gap-4 ">
        <Lottie
          animationData={signin_ani}
          loop={true}
          className="h-15rem m-0 p-0"
          style={{ width: "50rem" }}
        />
        {/* Phone input using react-phone-input-2 */}
        <div className="flex align-items-center justify-content-center flex-column">
          <p className="text-2xl m-0 p-0 text-primary1 font-semibold">
            Sign In
          </p>
          <PhoneInput
            placeholder="Enter Phone Number"
            value={phone}
            onChange={setPhone} // Directly use the setter function
            country="in" // Set default country to India
            className="phone-input font-semibold"
            style={{ margin: "1rem ", width: "100%" }} // Style for the input
          />

          <div className="w-full">
            <p className=".text-sec-theme text-base font-semibold text-left mt-2 m-0  p-0">
              Enter OTP
            </p>
            <MuiOtpInput
              value={otp}
              onChange={(newValue) => setOtp(newValue)}
              className="pt-2 mb-4" // Receive value directly
            />
          </div>
          <Button
            label="Submit"
            onClick={checkPhoneNumber}
            className="bg-primary1"
            raised
          />
          {message && <p style={{ color: "#E62225" }}>{message}</p>}
        </div>
      </div>
    </Dialog>
  );
};

export default CitizenDialog;
