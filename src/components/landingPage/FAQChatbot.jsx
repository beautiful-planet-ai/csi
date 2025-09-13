import { useCallback, useMemo, useState } from "react";
import MyChatBot from "react-chatbotify";
import chatIcon from "../../assets/Chatbot/Chatbot.svg";
import "./Landing.css";

const FAQChatbot = () => {
  const [form, setForm] = useState({});
  const [unansweredQuestions, setUnansweredQuestions] = useState([
    "What is CSI?",
    "How is the CSI score calculated?",
    "What are the benefits of CSI?",
    "Can you provide me with some recent statistics?",
    "How can I improve my city's CSI score?",
  ]);

  // Mapping of Q → A (so you don’t need switch/case)
  const faqAnswers = useMemo(
    () => ({
      "What is CSI?":
        "CSI is a comprehensive solution designed to empower cities with the tools to evaluate and enhance their sustainability performance while addressing pressing issues.",
      "How is the CSI score calculated?":
        "The CSI score is based on various indicators like air quality, waste management, citizen engagement, transparency and accountability, etc. which come under NSA dimensions.",
      "What are the benefits of CSI?":
        "CSI contributes to improved city planning, promotes sustainability, and enhances quality of life by enabling better resource management.",
      "Can you provide me with some recent statistics?":
        "Recent statistics indicate that cities with higher CSI scores have better environmental management systems.",
      "How can I improve my city's CSI score?":
        "You can participate in local environmental activities, support sustainable policies, and encourage recycling.",
    }),
    []
  );

  // Answering logic
  const handleAnswer = useCallback(
    (userQuestion, injectMessage) => {
      const response =
        faqAnswers[userQuestion] || "I'm sorry, I didn’t get that.";
      injectMessage(response);

      // remove answered question
      setUnansweredQuestions((prev) => prev.filter((q) => q !== userQuestion));
    },
    [faqAnswers]
  );

  const settings = {
    isOpen: true,
    tooltip: { mode: "CLOSE", text: "Hey, How Can I help You Today?" },
    botBubble: { showAvatar: false },
    general: {
      primaryColor: "#166c7d",
      secondaryColor: "#166c7d",
      fontFamily: "Montserrat",
      embedded: false,
      desktopEnabled: true,
    },
    header: {
      title: "Beautiful Planet.AI Ecobot",
      avatar: chatIcon,
      fontFamily: "Montserrat",
    },
    userBubble: { animate: true },
    chatHistory: { storageKey: "faq_settings", disabled: true },
  };

  const styles = {
    headerStyle: { background: "#166c7d", color: "#fff", fontSize: "2rem" },
    chatWindowStyle: { backgroundColor: "#f2f2f2", fontFamily: "Montserrat" },
    chatInput: { allowNewline: true },
  };

  const flow = {
    start: {
      message: "Hello there! What is your name?",
      function: (params) => setForm((f) => ({ ...f, name: params.userInput })),
      path: "greeting",
    },
    greeting: {
      message: (params) =>
        `Nice to meet you ${params.userInput}. Would you like to know about CSI?`,
      options: ["Yes", "No"],
      path: (params) =>
        params.userInput.toLowerCase() === "yes" ? "ask_questions" : "end",
    },
    ask_questions: {
      options: () => unansweredQuestions, // dynamically show remaining Qs
      function: (params) =>
        handleAnswer(params.userInput, params.injectMessage),
      path: () => (unansweredQuestions.length > 0 ? "thank_you" : "end"),
    },
    thank_you: {
      message: "Thank you! Would you like to ask another question?",
      options: () =>
        unansweredQuestions.length > 0 ? ["Continue"] : ["End chat"],
      path: (params) =>
        params.userInput === "Continue" ? "ask_questions" : "end",
    },
    end: {
      message:
        "Thank you for using Beautiful Planet.AI Ecobot. \nHave a great day!",
      chatDisabled: true,
      path: "start",
    },
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 10,
        right: 10,
        zIndex: 1000,
        fontSize: "2rem",
      }}
    >
      <MyChatBot settings={settings} flow={flow} styles={styles} />
    </div>
  );
};

export default FAQChatbot;
