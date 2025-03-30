
import React from "react";
import { cn } from "@/lib/utils";
import { Message } from "../types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ReactMarkdown from "react-markdown";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  isExpanded: boolean;
  isMinimized: boolean;
}

export const MessageList: React.FC<MessageListProps> = ({ 
  messages, 
  isTyping, 
  messagesEndRef,
  isExpanded,
  isMinimized
}) => {
  const getScrollAreaHeight = () => {
    if (isMinimized) return "h-[70px]";
    return isExpanded ? "h-[70vh]" : "h-auto";
  };

  // Function to safely render markdown content
  const renderMessageContent = (content: string) => {
    try {
      // Check if content contains complex markdown that might cause issues
      if (content.includes('###') || content.includes('####')) {
        // For complex markdown, fallback to simpler rendering
        return <div className="whitespace-pre-wrap">{content}</div>;
      } else {
        // For simple markdown, use ReactMarkdown
        return <ReactMarkdown>{content}</ReactMarkdown>;
      }
    } catch (error) {
      console.error("Error rendering markdown:", error);
      // Fallback to plain text if ReactMarkdown fails
      return <div className="whitespace-pre-wrap">{content}</div>;
    }
  };

  return (
    <ScrollArea className={cn("p-4", getScrollAreaHeight())}>
      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex",
              message.sender === "user" ? "justify-end" : "justify-start"
            )}
          >
            <div
              className={cn(
                "max-w-[80%] rounded-lg p-3",
                message.sender === "user"
                  ? "bg-mediseva-600 text-white rounded-tr-none"
                  : "bg-muted rounded-tl-none"
              )}
            >
              {message.sender === "bot" && (
                <div className="flex items-start space-x-2 mb-1">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/bot-avatar.png" />
                    <AvatarFallback className="bg-mediseva-200 text-mediseva-600 text-xs">MB</AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-xs">MediBot</span>
                </div>
              )}
              
              {message.sender === "bot" ? (
                <div className="text-sm markdown-content">
                  {renderMessageContent(message.content)}
                </div>
              ) : (
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              )}
              
              <p className="text-[10px] opacity-70 mt-1 text-right">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-lg rounded-tl-none p-3 max-w-[80%]">
              <div className="flex space-x-1 items-center h-6">
                <div className="w-2 h-2 rounded-full bg-mediseva-400 animate-bounce" style={{ animationDelay: "0s" }}></div>
                <div className="w-2 h-2 rounded-full bg-mediseva-400 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                <div className="w-2 h-2 rounded-full bg-mediseva-400 animate-bounce" style={{ animationDelay: "0.4s" }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
};
