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

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [connectionStatus, setConnectionStatus] = useState("disconnected"); // disconnected, connecting, connected, failed
  const gradioClientRef = useRef<any>(null);
  const [retryCount, setRetryCount] = useState(0);

  // Load the Gradio client at runtime
  useEffect(() => {
    if (typeof window === 'undefined' || connectionStatus === "connected" || connectionStatus === "connecting") return;
    
    const loadGradioClient = async () => {
      setConnectionStatus("connecting");
      
      try {
        console.log("Starting to load Gradio client...");
        
        // Check if script is already loaded
        if (!window.gradioClient) {
          // Create script element
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
        await new Promise(resolve => setTimeout(resolve, 300));
        
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
            
            // Test the connection with a simple query
            try {
              const testResult = await client.predict("/analyze", { 
                symptoms: "Test connection" 
              });
              console.log("Test query result:", testResult);
            } catch (testError) {
              console.error("Test query failed:", testError);
            }
          } catch (connectionError) {
            console.error("Failed to connect to API:", connectionError);
            setConnectionStatus("failed");
            throw connectionError;
          }
        } else {
          console.error("window.gradioClient is not available after script load");
          setConnectionStatus("failed");
          throw new Error("Gradio client not available");
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
    setConnectionStatus("disconnected");
    setRetryCount(prev => prev + 1);
  };

  const analyzeSymptomsWithAPI = async (symptoms: string): Promise<string> => {
    if (connectionStatus !== "connected") {
      // If not connected, try to connect again
      if (connectionStatus !== "connecting") {
        handleRetryConnection();
        return "I'm still connecting to my medical knowledge base. Please try again in a moment.";
      }
      return "I'm connecting to my medical knowledge base. Please try again in a moment.";
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
      setConnectionStatus("disconnected");
      
      return "I'm sorry, I couldn't analyze your symptoms properly. This might be due to a connection issue. Please try again in a moment.";
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
      // Use the API
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
          <CardHeader className="bg-mediseva-600 dark:bg-mediseva-700 text-white p-4 flex flex-row items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="h-6 w-6" />
              <div>
                <h3 className="font-semibold">MediBot</h3>
                <p className="text-xs text-mediseva-100">
                  {connectionStatus === "connected" && "Symptom checker assistant"}
                  {connectionStatus === "connecting" && "Connecting to medical database..."}
                  {connectionStatus === "failed" && "Connection failed"}
                  {connectionStatus === "disconnected" && "Initializing..."}
                </p>
              </div>
            </div>
            
            {connectionStatus === "failed" && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleRetryConnection}
                title="Retry connection"
                className="h-8 w-8 rounded-full text-mediseva-100 hover:text-white hover:bg-mediseva-500"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            )}
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
              
              {connectionStatus === "failed" && (
                <div className="flex items-center justify-center p-3">
                  <div className="text-center text-muted-foreground">
                    <p>Connection to medical database failed</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleRetryConnection} 
                      className="mt-2"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Retry Connection
                    </Button>
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
                disabled={connectionStatus === "failed"}
              />
              <Button 
                type="submit" 
                size="icon" 
                disabled={input.trim() === "" || connectionStatus === "failed"}
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
