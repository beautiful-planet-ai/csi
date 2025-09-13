import React, { useState, useEffect } from "react";
import MyChatBot from "react-chatbotify";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import chatIcon from "../../assets/Chatbot/Chatbot.svg";
import "../landingPage/Landing.css";
import axios from "axios";
import { useUser } from "components/context/UserContext";

const CitizenChatbot = () => {
  const { setCitizenDetails } = useUser();
  const [form, setForm] = useState({});
  const [states, setStates] = useState([]); // Ensure states is initialized as an empty array
  const [cities, setCities] = useState([]);

  const navigate = useNavigate(); // Initialize useNavigate
  const submitFormData = async (formData) => {
    try {
      const response = await axios.post(
        "https://api-csi.arahas.com/new/register",
        formData
      );

      if (response.status === 201) {
        console("User Registration Successful");
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
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

  const fetchStates = async () => {
    const headers = new Headers();
    headers.append(
      "X-CSCAPI-KEY",
      "ZHhIQXNCQ21lTGhub0J4Mk9wRHVNS1FNVWVLNmhkajIyRjdHOWJJSA=="
    );

    try {
      const response = await fetch(
        "https://api.countrystatecity.in/v1/countries/IN/states",
        { headers }
      );
      const data = await response.json();

      if (Array.isArray(data)) {
        setStates(data);
      } else {
        console.error("Unexpected response format for states:", data);
      }
    } catch (error) {
      console.log("Error fetching states:", error);
    }
  };

  const fetchCities = async (stateCode) => {
    const headers = new Headers();
    headers.append(
      "X-CSCAPI-KEY",
      "ZHhIQXNCQ21lTGhub0J4Mk9wRHVNS1FNVWVLNmhkajIyRjdHOWJJSA=="
    );

    try {
      const response = await fetch(
        `https://api.countrystatecity.in/v1/countries/IN/states/${stateCode}/cities`,
        { headers }
      );

      const data = await response.json();
      if (Array.isArray(data)) {
        setCities(data);
      } else {
        console.error("Unexpected response format for cities:", data);
      }
    } catch (error) {
      console.log("Error fetching cities:", error);
    }
  };

  useEffect(() => {
    fetchStates();
  }, []);

  const flow = {
    start: {
      message: "Hello there! What is your name?",
      function: (params) => setForm({ ...form, name: params.userInput }),
      path: "ask_email",
    },
    ask_email: {
      message: (params) =>
        `Nice to meet you ${params.userInput}! \nPlease enter your email address.`,
      function: (params) => setForm({ ...form, email: params.userInput }),
      path: async (params) => {
        const emailRegex = /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
        // /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const email = params.userInput;

        if (!emailRegex.test(email)) {
          await params.injectMessage("Please enter a valid email address.");
          return "ask_email"; // Reask the email question
        }

        return "ask_phone"; // Proceed to the next step if email is valid
      },
    },
    ask_phone: {
      message: "Please enter your phone number (10 digits):",
      function: (params) => setForm({ ...form, phone: params.userInput }),
      path: async (params) => {
        const phone = params.userInput;
        const phoneRegex =
          /^(?:(?:\+|0{0,2})91(\s*|[-])?|[0]?)?([6789]\d{2}([-]?)\d{3}([-]?)\d{4})$/;
        // /^\d{10}$/;

        if (!phoneRegex.test(phone)) {
          await params.injectMessage(
            "Invalid phone number! Please enter a valid 10-digit phone number."
          );
          return "ask_phone"; // Reask the phone number question
        }

        return "ask_state"; // Proceed to the next step if the phone number is valid
      },
    },
    ask_state: {
      message: "Which state are you in?",
      options: states.map((state) => state.name), // Display states as options
      function: async (params) => {
        const selectedState = states.find(
          (state) => state.name === params.userInput
        );
        if (selectedState) {
          await fetchCities(selectedState.iso2);

          setForm({ ...form, state: selectedState.name });
        }
      },
      path: async (params) => "ask_city",
    },
    ask_city: {
      message: "Which city are you in?",
      options: cities.map((city) => city.name), // Display cities if available
      function: (params) => {
        setForm({ ...form, city: params.userInput });
      },
      path: "kyc",
    },
    kyc: {
      message: "Want to know more about your city?",
      options: ["Yes", "No"],
      function: async (params) => {
        console.log(form);
        // Save user details in context
        setCitizenDetails(form);
        await submitFormData(form);
        if (params.userInput.toLowerCase() === "yes") {
          navigate("/citizen/kyc"); // Redirect to KYC page if user says Yes
        }
      },
      path: (params) => {
        if (params.userInput.toLowerCase() === "no") {
          return "thank_you"; // Proceed to Thank You message if No
        }
      },
    },
    thank_you: {
      message: "Thank you for providing your details.",
      path: "start", // Reset the flow if needed
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

export default CitizenChatbot;
