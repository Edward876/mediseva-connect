
import React, { useState } from "react";
import { useChatbot } from "./hooks/useChatbot";
import { ChatbotToggle } from "./components/ChatbotToggle";
import { ChatWindow } from "./components/ChatWindow";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  
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
    // Reset expanded and minimized state when closing
    if (isOpen) {
      setTimeout(() => {
        setIsExpanded(false);
        setIsMinimized(false);
      }, 300); // Match transition duration
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    // Reset minimized state when expanding/collapsing
    setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      <ChatbotToggle 
        isOpen={isOpen} 
        toggleChatbot={toggleChatbot} 
        isExpanded={isExpanded}
        toggleExpand={toggleExpand}
        isMinimized={isMinimized}
        toggleMinimize={toggleMinimize}
      />
      
      <ChatWindow
        isOpen={isOpen}
        isExpanded={isExpanded}
        isMinimized={isMinimized}
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
