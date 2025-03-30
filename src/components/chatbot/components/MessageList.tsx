import React from "react";
import { cn } from "@/lib/utils";
import { Message } from "../types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ReactMarkdown from "react-markdown";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/use-toast";

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
      // Simple check if content is very complex - just show as plain text
      if (
        content.includes('###') || 
        content.includes('####') ||
        (content.match(/\*\*/g) || []).length > 10 ||  // Too many bold elements
        content.length > 1000  // Very long content
      ) {
        // For complex content, use plain text with preserved whitespace
        return (
          <div className="whitespace-pre-wrap text-sm">
            {content}
          </div>
        );
      }
      
      // For simpler markdown, use ReactMarkdown with careful components
      return (
        <ReactMarkdown
          components={{
            // Disable potentially problematic elements
            h1: ({node, ...props}) => <strong className="text-base" {...props} />,
            h2: ({node, ...props}) => <strong className="text-base" {...props} />,
            h3: ({node, ...props}) => <strong className="text-base" {...props} />,
            h4: ({node, ...props}) => <strong className="text-sm" {...props} />,
            h5: ({node, ...props}) => <strong className="text-sm" {...props} />,
            h6: ({node, ...props}) => <strong className="text-sm" {...props} />,
            // Keep paragraphs simple
            p: ({node, ...props}) => <p className="mb-2" {...props} />
          }}
        >
          {content}
        </ReactMarkdown>
      );
    } catch (error) {
      console.error("Error rendering markdown:", error);
      
      // Show an error toast once (but don't overwhelm the user)
      toast({
        title: "Display issue",
        description: "Had trouble displaying formatted content. Showing plain text instead.",
        variant: "destructive",
      });
      
      // Always provide a reliable fallback
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
