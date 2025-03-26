import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessagesSquare, X, Bot, Send, RefreshCw } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// Define Message type directly
interface Message {
  id: number;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

// Add global type for runtime-loaded gradio client
declare global {
  interface Window {
    gradioClient: any;
  }
}

// Initial welcome message
const initialMessages: Message[] = [
  {
    id: 1,
    content: "Hello! I'm MediBot, your medical assistant. How can I help you today?",
    sender: "bot",
    timestamp: new Date(),
  },
];

// Fallback response when API is not available
const fallbackResponse = "I'm currently having trouble connecting to my medical database. Your query has been received, and I'll respond properly once the connection is restored. In the meantime, if you're experiencing medical concerns, please consult with a healthcare professional.";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [connectionStatus, setConnectionStatus] = useState("connecting"); // connecting, connected, failed
  const gradioClientRef = useRef<any>(null);
  const [retryCount, setRetryCount] = useState(0);

  // Load the Gradio client at runtime
  useEffect(() => {
    // Don't try to reconnect if already connected or connecting
    if (connectionStatus === "connected") return;
    
    console.log(`Connection attempt #${retryCount + 1}, status: ${connectionStatus}`);
    
    const loadGradioClient = async () => {
      try {
        console.log("Starting to load Gradio client...");
        
        // Create script element if not already loaded
        if (!window.gradioClient) {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/npm/@gradio/client@2.10.0/dist/index.min.js';
          script.async = true;
          
          // Create a promise to wait for script to load
          const scriptLoadPromise = new Promise((resolve, reject) => {
            script.onload = resolve;
            script.onerror = (e) => {
              console.error("Script load error:", e);
              reject(new Error("Failed to load Gradio client script"));
            };
          });
          
          // Add script to document
          document.body.appendChild(script);
          
          // Wait for script to load
          await scriptLoadPromise;
          console.log('Gradio client script loaded successfully');
        } else {
          console.log('Gradio client script already loaded');
        }
        
        // Wait a bit to ensure the script is fully initialized
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Initialize the client
        if (window.gradioClient) {
          console.log("Attempting to connect to Gradio API...");
          try {
            const client = await window.gradioClient.Client.connect("Shinichi876/Medical-bot", {
              hf_token: null, // Set to your token if it's a private space
              status_callback: (status) => {
                console.log("Connection status:", status);
              }
            });
            
            gradioClientRef.current = client;
            setConnectionStatus("connected");
            console.log('Successfully connected to Gradio API');
          } catch (connectionError) {
            console.error("Failed to connect to API:", connectionError);
            setConnectionStatus("failed");
          }
        } else {
          console.error("window.gradioClient is not available after script load");
          setConnectionStatus("failed");
        }
      } catch (error) {
        console.error('Error in loadGradioClient:', error);
        setConnectionStatus("failed");
      }
    };
    
    loadGradioClient();
  }, [connectionStatus, retryCount]);

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

  const handleRetryConnection = () => {
    setConnectionStatus("connecting");
    setRetryCount(prev => prev + 1);
  };

  const analyzeSymptomsWithAPI = async (symptoms: string): Promise<string> => {
    if (connectionStatus !== "connected" || !gradioClientRef.current) {
      console.log(`Cannot analyze symptoms. Connection status: ${connectionStatus}`);
      return fallbackResponse;
    }
    
    try {
      console.log("Sending symptoms to API:", symptoms);
      
      // Make API call
      const result = await gradioClientRef.current.predict("/analyze", { 
        symptoms: symptoms 
      });
      
      console.log("API response:", result);
      
      if (!result.data) {
        throw new Error("API returned empty response");
      }
      
      return result.data;
    } catch (error) {
      console.error("Error analyzing symptoms:", error);
      
      // If we get an error, try reconnecting for future requests
      setConnectionStatus("failed");
      
      return fallbackResponse;
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
      // Use the API or fallback
      const response = await analyzeSymptomsWithAPI(input);
      
      const botResponse: Message = {
        id: messages.length + 2,
        content: response,
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      const errorMessage: Message = {
        id: messages.length + 2,
        content: "I'm sorry, I couldn't process your message. Please try again.",
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

  // Get connection status indicator
  const getStatusDisplay = () => {
    switch (connectionStatus) {
      case "connected":
        return <span className="flex items-center"><span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>Connected</span>;
      case "connecting":
        return <span className="flex items-center"><span className="h-2 w-2 bg-yellow-500 rounded-full mr-2 animate-pulse"></span>Connecting...</span>;
      case "failed":
        return <span className="flex items-center"><span className="h-2 w-2 bg-red-500 rounded-full mr-2"></span>Connection failed</span>;
      default:
        return null;
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
          <CardHeader className="bg-mediseva-600 dark:bg-mediseva-700 text-white p-4 flex flex-row items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="h-6 w-6" />
              <div>
                <h3 className="font-semibold">MediBot</h3>
                <p className="text-xs text-mediseva-100">
                  Symptom checker assistant
                </p>
              </div>
            </div>
            
            <div className="text-xs text-mediseva-100">
              {getStatusDisplay()}
              {connectionStatus === "failed" && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleRetryConnection}
                  className="ml-2 h-6 text-xs text-mediseva-100 hover:text-white hover:bg-mediseva-500"
                >
                  Retry
                </Button>
              )}
            </div>
          </CardHeader>
          
          {/* Message list */}
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
          
          {/* Message input */}
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
