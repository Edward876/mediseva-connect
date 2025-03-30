
import React, { useRef, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import { ConnectionStatusDisplay } from "./ConnectionStatus";
import { Message } from "../types";
import { ConnectionStatus } from "../hooks/useChatbot";

interface ChatWindowProps {
  isOpen: boolean;
  messages: Message[];
  input: string;
  setInput: (value: string) => void;
  handleSendMessage: (e: React.FormEvent) => void;
  isTyping: boolean;
  connectionStatus: ConnectionStatus;
  handleRetryConnection: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ 
  isOpen, 
  messages, 
  input, 
  setInput, 
  handleSendMessage, 
  isTyping, 
  connectionStatus,
  handleRetryConnection
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);
  
  return (
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
            <ConnectionStatusDisplay 
              status={connectionStatus} 
              onRetry={handleRetryConnection} 
            />
          </div>
        </CardHeader>
        
        {/* Message list */}
        <CardContent className="flex-grow p-0 overflow-y-auto">
          <MessageList 
            messages={messages}
            isTyping={isTyping}
            messagesEndRef={messagesEndRef}
          />
        </CardContent>
        
        {/* Message input */}
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
  );
};
