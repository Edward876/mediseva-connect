import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessagesSquare, X, Bot } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Message } from "./types";
import { MessageList } from "./components/MessageList";
import { MessageInput } from "./components/MessageInput";
import { initialMessages } from "./utils/messageProcessor";
import { Client } from "@gradio/client";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    if (!isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const analyzeSymptomsWithAPI = async (symptoms: string) => {
    try {
      const client = await Client.connect("Shinichi876/Medical-bot");
      const result = await client.predict("/analyze", { 
        symptoms: symptoms, 
      });
      
      return result.data as string;
    } catch (error) {
      console.error("Error calling Medical-bot API:", error);
      return "I'm sorry, I couldn't analyze your symptoms at the moment. Please try again later or contact a healthcare professional directly.";
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === "") return;
    
    const userMessage: Message = {
      id: messages.length + 1,
      content: input,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    
    try {
      // Call the Medical-bot API
      const response = await analyzeSymptomsWithAPI(input);
      
      const botResponse: Message = {
        id: messages.length + 2,
        content: response,
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      // Handle error gracefully
      const errorMessage: Message = {
        id: messages.length + 2,
        content: "I'm sorry, I couldn't analyze your symptoms at the moment. Please try again later.",
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Chatbot toggle button */}
      <Button
        onClick={toggleChatbot}
        className={cn(
          "fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg z-50 transition-all duration-300 p-0",
          isOpen ? "bg-red-500 hover:bg-red-600" : "bg-mediseva-600 hover:bg-mediseva-700"
        )}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessagesSquare className="h-6 w-6" />}
      </Button>
      
      {/* Chatbot window */}
      <div
        className={cn(
          "fixed bottom-24 right-6 w-[calc(100%-3rem)] sm:w-[400px] z-50 transition-all duration-300 transform origin-bottom-right",
          isOpen
            ? "scale-100 opacity-100"
            : "scale-90 opacity-0 pointer-events-none"
        )}
      >
        <Card className="border-0 shadow-xl overflow-hidden h-[500px] flex flex-col dark:bg-card">
          <CardHeader className="bg-mediseva-600 dark:bg-mediseva-700 text-white p-4 flex flex-row items-center space-x-2">
            <Bot className="h-6 w-6" />
            <div>
              <h3 className="font-semibold">MediBot</h3>
              <p className="text-xs text-mediseva-100">Symptom checker assistant</p>
            </div>
          </CardHeader>
          
          <CardContent className="flex-grow p-0 overflow-y-auto">
            <MessageList 
              messages={messages} 
              isTyping={isTyping} 
              messagesEndRef={messagesEndRef} 
            />
          </CardContent>
          
          <CardFooter className="p-3 border-t dark:border-border">
            <MessageInput 
              input={input}
              setInput={setInput}
              handleSendMessage={handleSendMessage}
              inputRef={inputRef}
            />
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
