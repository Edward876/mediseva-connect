
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MessagesSquare, X } from "lucide-react";

interface ChatbotToggleProps {
  isOpen: boolean;
  toggleChatbot: () => void;
}

export const ChatbotToggle: React.FC<ChatbotToggleProps> = ({ 
  isOpen, 
  toggleChatbot 
}) => {
  return (
    <Button
      onClick={toggleChatbot}
      className={cn(
        "fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg z-50 transition-all duration-300 p-0",
        isOpen ? "bg-red-500 hover:bg-red-600" : "bg-mediseva-600 hover:bg-mediseva-700"
      )}
    >
      {isOpen ? <X className="h-6 w-6" /> : <MessagesSquare className="h-6 w-6" />}
    </Button>
  );
};
