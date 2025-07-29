import React, { useState } from "react";
import { FaRobot } from "react-icons/fa";
import { X, Send, MessageCircle } from "lucide-react";

function ChatBotButton() {
  const [open, setOpen] = useState(false);
  
  return (
    <>
      {/* Enhanced Floating Action Button */}
      <button
        className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 text-white p-4 rounded-full shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-110 z-50 group"
        onClick={() => setOpen(o => !o)}
        aria-label="Open AI Chat"
      >
        <div className="relative">
          <FaRobot size={28} className="transform group-hover:rotate-12 transition-transform duration-300" />
          {/* Pulse animation ring */}
          <div className="absolute inset-0 rounded-full bg-blue-400/30 animate-ping"></div>
          {/* Notification dot */}
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse border-2 border-white"></div>
        </div>
      </button>

      {/* Enhanced Chat Window */}
      {open && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden" onClick={() => setOpen(false)}></div>
          
          {/* Chat Container */}
          <div className="fixed bottom-24 right-8 bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl w-80 md:w-96 z-50 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <FaRobot size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">AI Travel Assistant</h3>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-blue-100 text-xs">Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-full transition-all duration-200"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat Content */}
            <div className="p-4 space-y-4">
              {/* Welcome Message */}
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageCircle size={16} className="text-white" />
                </div>
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl rounded-tl-sm p-3 max-w-[80%]">
                  <div className="text-gray-300 text-sm leading-relaxed">
                    👋 Hi there! I'm your AI travel assistant. Ask me anything about your trip planning, destinations, or travel tips!
                  </div>
                </div>
              </div>

              {/* Suggested Questions */}
              <div className="space-y-2">
                <div className="text-gray-400 text-xs font-medium uppercase tracking-wide">Quick questions:</div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Best time to visit?",
                    "Local cuisine tips",
                    "Budget breakdown",
                    "Must-see attractions"
                  ].map((question, index) => (
                    <button
                      key={index}
                      className="text-xs bg-slate-800/50 hover:bg-slate-700/50 text-gray-300 hover:text-white px-3 py-2 rounded-full border border-slate-700/50 hover:border-blue-500/50 transition-all duration-200 hover:scale-105"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Input Section */}
            <div className="p-4 border-t border-slate-700/50 bg-slate-800/30">
              <div className="flex gap-2">
                <input 
                  className="flex-1 bg-slate-700/50 border border-slate-600/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200 text-sm"
                  placeholder="Type your question..." 
                />
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-3 rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all duration-200 transform hover:scale-105">
                  <Send size={18} />
                </button>
              </div>
              
              {/* Footer Note */}
              <div className="mt-3 text-center">
                <span className="text-xs text-gray-500">
                  Powered by AI • Always here to help ✨
                </span>
              </div>
            </div>

            {/* Integrate your AI chat logic here */}
          </div>
        </>
      )}
    </>
  );
}

export default ChatBotButton;