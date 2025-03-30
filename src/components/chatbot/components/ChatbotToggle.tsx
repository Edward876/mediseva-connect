
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MessagesSquare, X, Maximize2, Minimize2 } from "lucide-react";

interface ChatbotToggleProps {
  isOpen: boolean;
  toggleChatbot: () => void;
  isExpanded: boolean;
  toggleExpand: () => void;
  isMinimized: boolean;
  toggleMinimize: () => void;
}

export const ChatbotToggle: React.FC<ChatbotToggleProps> = ({ 
  isOpen, 
  toggleChatbot,
  isExpanded,
  toggleExpand,
  isMinimized,
  toggleMinimize
}) => {
  return (
    <>
      <Button
        onClick={toggleChatbot}
        className={cn(
          "fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg z-50 transition-all duration-300 p-0",
          isOpen ? "bg-red-500 hover:bg-red-600" : "bg-mediseva-600 hover:bg-mediseva-700"
        )}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessagesSquare className="h-6 w-6" />}
      </Button>
      
      {isOpen && (
        <div className="fixed bottom-6 right-24 flex space-x-2">
          <Button
            onClick={toggleExpand}
            className="rounded-full w-10 h-10 shadow-lg z-50 bg-gray-200 hover:bg-gray-300 p-0"
            aria-label={isExpanded ? "Minimize chat" : "Maximize chat"}
          >
            {isExpanded ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
          </Button>
          
          {isExpanded && (
            <Button
              onClick={toggleMinimize}
              className="rounded-full w-10 h-10 shadow-lg z-50 bg-gray-200 hover:bg-gray-300 p-0"
              aria-label={isMinimized ? "Restore chat" : "Minimize chat"}
            >
              {isMinimized ? <Maximize2 className="h-5 w-5" /> : <Minimize2 className="h-5 w-5" />}
            </Button>
          )}
        </div>
      )}
    </>
  );
};
