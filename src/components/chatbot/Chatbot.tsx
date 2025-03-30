
import React, { useState } from "react";
import { useChatbot } from "./hooks/useChatbot";
import { ChatbotToggle } from "./components/ChatbotToggle";
import { ChatWindow } from "./components/ChatWindow";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const { 
    messages, 
    input, 
    setInput, 
    isTyping, 
    connectionStatus, 
    sendMessage, 
    handleRetryConnection 
  } = useChatbot();

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    // Reset expanded state when closing
    if (isOpen) {
      setIsExpanded(false);
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Chatbot toggle button */}
      <ChatbotToggle 
        isOpen={isOpen} 
        toggleChatbot={toggleChatbot} 
        isExpanded={isExpanded}
        toggleExpand={toggleExpand}
      />
      
      {/* Chatbot window */}
      <ChatWindow
        isOpen={isOpen}
        isExpanded={isExpanded}
        messages={messages}
        input={input}
        setInput={setInput}
        handleSendMessage={handleSendMessage}
        isTyping={isTyping}
        connectionStatus={connectionStatus}
        handleRetryConnection={handleRetryConnection}
      />
    </>
  );
}
