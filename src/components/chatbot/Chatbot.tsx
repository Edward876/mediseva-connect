import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessagesSquare, X, Bot, Send } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { initialMessages } from "./utils/messageProcessor";

// Define Message type directly
interface Message {
  id: number;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

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
      // Dynamically import the client only when needed
      const { Client } = await import('@gradio/client');
      
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

  // Format the timestamp for display
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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
          
          {/* Message list - Directly implemented */}
          <CardContent className="flex-grow p-4 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={cn(
                    "flex flex-col",
                    message.sender === "user" ? "items-end" : "items-start"
                  )}
                >
                  <div 
                    className={cn(
                      "max-w-[80%] rounded-lg p-3",
                      message.sender === "user" 
                        ? "bg-mediseva-600 dark:bg-mediseva-700 text-white" 
                        : "bg-muted text-foreground dark:bg-muted/70"
                    )}
                  >
                    <p className="whitespace-pre-wrap break-words">{message.content}</p>
                  </div>
                  <span className="text-xs text-muted-foreground mt-1">
                    {formatTime(message.timestamp)}
                  </span>
                </div>
              ))}
              
              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-start">
                  <div className="bg-muted text-foreground dark:bg-muted/70 rounded-lg p-3 max-w-[80%]">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 rounded-full bg-mediseva-600 animate-bounce"></div>
                      <div className="w-2 h-2 rounded-full bg-mediseva-600 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 rounded-full bg-mediseva-600 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Empty div for auto-scrolling */}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          
          {/* Message input - Directly implemented */}
          <CardFooter className="p-3 border-t dark:border-border">
            <form onSubmit={handleSendMessage} className="flex w-full gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your symptoms here..."
                className="flex-grow focus-visible:ring-mediseva-500"
                ref={inputRef}
              />
              <Button 
                type="submit" 
                size="icon" 
                disabled={input.trim() === ""}
                className="shrink-0 bg-mediseva-600 hover:bg-mediseva-700"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
