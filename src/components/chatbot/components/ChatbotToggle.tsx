
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
    <div className="fixed bottom-6 right-6 z-[60] flex items-center space-x-2">
      {isOpen && (
        <>
          <Button
            onClick={toggleExpand}
            className="rounded-full w-10 h-10 shadow-lg bg-gray-200 hover:bg-gray-300 text-gray-700 p-0 transition-all duration-300"
            aria-label={isExpanded ? "Minimize chat" : "Maximize chat"}
          >
            {isExpanded ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
          </Button>
          
          {isExpanded && (
            <Button
              onClick={toggleMinimize}
              className="rounded-full w-10 h-10 shadow-lg bg-gray-200 hover:bg-gray-300 text-gray-700 p-0 transition-all duration-300"
              aria-label={isMinimized ? "Restore chat" : "Minimize chat"}
            >
              {isMinimized ? <Maximize2 className="h-5 w-5" /> : <Minimize2 className="h-5 w-5" />}
            </Button>
          )}
        </>
      )}
      
      <Button
        onClick={toggleChatbot}
        className={cn(
          "rounded-full w-14 h-14 shadow-lg p-0 transition-all duration-300",
          isOpen ? "bg-red-500 hover:bg-red-600" : "bg-mediseva-600 hover:bg-mediseva-700"
        )}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessagesSquare className="h-6 w-6" />}
      </Button>
    </div>
  );
};
