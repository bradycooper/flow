import React, { useEffect, useState } from "react";

const LoadingOverlay: React.FC = () => {
  const messages = [
    "Calculating your program...",
    "Checking your persona...",
    "Checking your data...",
    "Consulting with our rewards experts...",
    "Generating your custom program...",
  ];

  const [currentMessage, setCurrentMessage] = useState(messages[0]);
  const [messageIndex, setMessageIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
        setIsFading(false);
      }, 500);
    }, 2000);
    return () => clearInterval(interval);
  }, [messages.length]);

  useEffect(() => {
    setCurrentMessage(messages[messageIndex]);
  }, [messageIndex, messages]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="flex flex-col items-center text-center p-10 bg-white rounded-lg shadow-lg">
        <div className="mb-4 border-t-4 border-b-4 border-bright-yellow rounded-full w-12 h-12 animate-spin"></div>
        <p
          className={`text-xl font-semibold text-dark-grey transition-opacity duration-500 ${
            isFading ? "opacity-30" : "opacity-100"
          }`}
        >
          {currentMessage}
        </p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
