import React, { useState, useEffect } from "react";
import MyChatBot from "react-chatbotify";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import chatIcon from "../../assets/Chatbot/Chatbot.svg";
import "../landingPage/Landing.css";
import axios from "axios";
import { useUser } from "components/context/UserContext";

const Chatbot = () => {
  const { setCitizenDetails } = useUser();
  const [form, setForm] = useState({});
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();

  const submitFormData = async (formData) => {
    try {
      const response = await axios.post(
        "https://api-csi.arahas.com/new/register",
        formData
      );

      if (response.status === 201) {
        console.log("User Registration Successful");
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };

  const checkEmailExists = async (email) => {
    try {
      const response = await axios.get(
        `https://api-csi.arahas.com/check-email?email=${email}`
      );
      return response.data.exists;
    } catch (error) {
      console.error("Error checking email existence:", error);
      return false;
    }
  };

  const checkPhoneExists = async (phone) => {
    try {
      const response = await axios.get(
        `https://api-csi.arahas.com/check-phone?phone=${phone}`
      );
      console.log(response.data.exists);
      return response.data.exists;
    } catch (error) {
      console.error("Error checking Phone number existence:", error);
      return false;
    }
  };

  const settings = {
    isOpen: false,
    tooltip: {
      mode: "CLOSE",
      text: "New User? Register Here!",
    },
    botBubble: { showAvatar: false },
    general: {
      primaryColor: "#166c7d",
      secondaryColor: "#166c7d",
      fontFamily: "DM Sans",
      embedded: false,
      desktopEnabled: true,
    },
    header: {
      title: "Beautiful Planet.AI Ecobot",
      avatar: chatIcon,
      fontFamily: "DM Sans",
    },
    userBubble: {
      animate: true,
    },
    chatHistory: {
      storageKey: "concepts_settings",
      disabled: true,
    },
  };

  const styles = {
    headerStyle: {
      background: "#166c7d",
      color: "#ffffff",
      fontSize: "2rem",
    },
    chatWindowStyle: {
      backgroundColor: "#f2f2f2",
      fontFamily: "DM Sans",
      fontSize: "0.5rem",
    },
    chatInput: {
      allowNewline: true,
    },
  };
  const flow = {
    start: {
      message: "Hello there! What is your name?",
      function: (params) => setForm({ ...form, name: params.userInput }),
      path: "ask_email",
    },

    ask_email: {
      message: (params) => `Please enter your email address.`,
      function: (params) => setForm({ ...form, email: params.userInput }),
      path: async (params) => {
        const emailRegex = /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        const email = params.userInput;

        if (!emailRegex.test(email)) {
          await params.injectMessage("Invalid Email Address!");
          return "ask_email"; // Reask the email question
        }

        const exists = await checkEmailExists(email);
        if (exists) {
          await params.injectMessage("User already exists! Please Sign in.");
          return "thank_you"; // End flow
        }

        return "ask_phone"; // Proceed to phone number input
      },
    },

    ask_phone: {
      message: "Please enter your phone number (10 digits):",
      function: (params) => setForm({ ...form, phone: params.userInput }),
      path: async (params) => {
        const phone = params.userInput;
        const phoneRegex =
          /^(?:(?:\+|0{0,2})91(\s*|[-])?|[0]?)?([6789]\d{2}([-]?)\d{3}([-]?)\d{4})$/;

        if (!phoneRegex.test(phone)) {
          await params.injectMessage("Invalid phone number!");
          return "ask_phone"; // Reask the phone number question
        }

        const exists = await checkPhoneExists(phone);
        if (exists) {
          await params.injectMessage("User already exists! Please Sign in. ");
          return "thank_you"; // End flow or redirect to sign-in
        }

        return "ask_state"; // Proceed to state selection
      },
    },

    ask_state: {
      message: "Which state are you in?",
      options: ["Uttar Pradesh", "Uttarakhand"],
      function: async (params) => {
        const selectedState = params.userInput;
        setForm({ ...form, state: selectedState });
      },
      path: "ask_city",
    },
    ask_city: {
      message: "Select your city from the following options:",
      options: (params) => {
        const selectedState = form.state; // Get the selected state from form
        if (selectedState === "Uttar Pradesh") {
          return ["Ayodhya", "Kanpur", "Varanasi"]; // List of cities in Uttar Pradesh
        } else if (selectedState === "Uttarakhand") {
          return ["Dehradun", "Haridwar"]; // List of cities in Uttarakhand
        }
        return ["No cities available"]; // Fallback if no state is selected
      },
      function: async (params) => {
        setForm({ ...form, city: params.userInput });
      },
      path: "kyc",
    },

    kyc: {
      message: "Want to know more about your city?",
      options: ["Yes", "No"],
      function: async (params) => {
        console.log(form);
        setCitizenDetails(form);
        await submitFormData(form);

        if (params.userInput.toLowerCase() === "yes") {
          navigate("/citizen/kyc"); // Redirect to KYC page if user says Yes
        }
      },
      path: "thank_you", // Proceed to Thank You message if No or after KYC.
    },

    thank_you: {
      message: "Have a great day ahead.",
      chatDisabled: true,
    },
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        zIndex: 1000,
        fontSize: "2rem",
      }}
    >
      <MyChatBot settings={settings} flow={flow} styles={styles} />
    </div>
  );
};

export default Chatbot;
