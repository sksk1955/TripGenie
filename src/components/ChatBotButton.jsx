import React, { useState } from "react";
import { FaRobot } from "react-icons/fa";

function ChatBotButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        className="fixed bottom-8 right-8 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-secondary transition"
        onClick={() => setOpen(o => !o)}
        aria-label="Open AI Chat"
      >
        <FaRobot size={28} />
      </button>
      {open && (
        <div className="fixed bottom-24 right-8 bg-white border rounded-xl shadow-xl w-80 p-4 z-50">
          <h3 className="font-bold mb-2 text-primary">AI Travel Assistant</h3>
          <div className="text-gray-500 text-sm mb-2">Ask me anything about your trip!</div>
          {/* Integrate your AI chat logic here */}
          <input className="w-full border rounded p-2" placeholder="Type your question..." />
        </div>
      )}
    </>
  );
}

export default ChatBotButton;