
import React, { useState } from "react";
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
  const [renderingErrors, setRenderingErrors] = useState<Record<number, boolean>>({});
  
  const getScrollAreaHeight = () => {
    if (isMinimized) return "h-[70px]";
    return isExpanded ? "h-[calc(70vh-100px)]" : "h-[400px]";
  };

  // Function to safely render markdown content
  const renderMarkdown = (content: string, messageId: number) => {
    // If we've already had an error with this message, use fallback
    if (renderingErrors[messageId]) {
      return <div className="whitespace-pre-wrap text-sm">{content}</div>;
    }
    
    try {
      return (
        <ReactMarkdown
          className="markdown-content"
          components={{
            h1: ({node, ...props}) => <h3 className="text-lg font-bold my-3" {...props} />,
            h2: ({node, ...props}) => <h4 className="text-base font-bold my-2" {...props} />,
            h3: ({node, ...props}) => <h5 className="text-sm font-bold my-2" {...props} />,
            h4: ({node, ...props}) => <h6 className="text-sm font-semibold my-1" {...props} />,
            h5: ({node, ...props}) => <p className="text-sm font-semibold my-1" {...props} />,
            h6: ({node, ...props}) => <p className="text-sm font-semibold my-1" {...props} />,
            p: ({node, ...props}) => <p className="text-sm mb-2" {...props} />,
            ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-2 text-sm" {...props} />,
            ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-2 text-sm" {...props} />,
            li: ({node, ...props}) => <li className="mb-1" {...props} />,
            strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
            em: ({node, ...props}) => <em className="italic" {...props} />,
            hr: () => <hr className="my-3 border-t border-gray-300" />,
            blockquote: ({node, ...props}) => (
              <blockquote className="border-l-4 border-gray-300 pl-2 italic my-2" {...props} />
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      );
    } catch (error) {
      console.error("Error rendering markdown for message", messageId, ":", error);
      
      // Record this message ID as having a rendering error
      setRenderingErrors(prev => ({...prev, [messageId]: true}));
      
      // Show toast only once
      toast({
        title: "Display issue",
        description: "Had trouble displaying formatted content. Showing plain text instead.",
        variant: "destructive",
      });
      
      // Fallback to plain text
      return <div className="whitespace-pre-wrap text-sm">{content}</div>;
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
                "max-w-[90%] rounded-lg p-3",
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
              
              <div className={cn(
                message.sender === "bot" ? "prose prose-sm dark:prose-invert max-w-none" : ""
              )}>
                {message.sender === "bot" 
                  ? renderMarkdown(message.content, message.id)
                  : <p className="whitespace-pre-wrap text-sm">{message.content}</p>
                }
              </div>
              
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
