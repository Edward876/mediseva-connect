
import { useState, useEffect, useCallback, useRef } from 'react';
import { gradioService } from '../services/gradioService';
import { Message } from '../types';
import { initialMessages, sanitizeContent } from '../utils/messageProcessor';
import { toast } from '@/components/ui/use-toast';

// Fallback response when API is not available
const FALLBACK_RESPONSE = "I'm currently having trouble connecting to my medical database. Your query has been received, and I'll respond properly once the connection is restored. In the meantime, if you're experiencing medical concerns, please consult with a healthcare professional.";

export type ConnectionStatus = "connecting" | "connected" | "failed";

export const useChatbot = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>("connecting");
  const [retryCount, setRetryCount] = useState(0);
  
  // Initialize connection
  useEffect(() => {
    if (connectionStatus !== "connected") {
      const initConnection = async () => {
        try {
          setConnectionStatus("connecting");
          await gradioService.connect();
          setConnectionStatus("connected");
          console.log('Successfully connected to Gradio API');
        } catch (error) {
          console.error('Connection failed:', error);
          setConnectionStatus("failed");
        }
      };
      
      initConnection();
    }
  }, [retryCount, connectionStatus]);
  
  // Handle retrying the connection
  const handleRetryConnection = useCallback(() => {
    setConnectionStatus("connecting");
    setRetryCount(prev => prev + 1);
  }, []);
  
  // Send a message to the chatbot
  const sendMessage = useCallback(async (messageText: string) => {
    if (messageText.trim() === "") return;
    
    const userMessage: Message = {
      id: messages.length + 1,
      content: messageText,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    
    try {
      // Use the API or fallback
      let response;
      if (connectionStatus === "connected") {
        try {
          response = await gradioService.analyzeSymptoms(messageText);
        } catch (apiError) {
          console.error("API error:", apiError);
          toast({
            title: "Connection issue",
            description: "There was a problem getting a response. Using fallback mode.",
            variant: "destructive",
          });
          response = FALLBACK_RESPONSE;
          setConnectionStatus("failed");
        }
      } else {
        response = FALLBACK_RESPONSE;
      }
      
      const botResponse: Message = {
        id: messages.length + 2,
        content: response,
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error("Error in sendMessage:", error);
      
      // If we get an API error, set connection status to failed
      if (connectionStatus === "connected") {
        setConnectionStatus("failed");
      }
      
      const errorMessage: Message = {
        id: messages.length + 2,
        content: FALLBACK_RESPONSE,
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  }, [messages, connectionStatus]);
  
  return {
    messages,
    input,
    setInput,
    isTyping,
    connectionStatus,
    sendMessage,
    handleRetryConnection
  };
};
