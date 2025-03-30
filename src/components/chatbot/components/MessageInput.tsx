
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface MessageInputProps {
  input: string;
  setInput: (value: string) => void;
  handleSendMessage: (e: React.FormEvent) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

export const MessageInput: React.FC<MessageInputProps> = ({ 
  input, 
  setInput, 
  handleSendMessage,
  inputRef
}) => {
  return (
    <form onSubmit={handleSendMessage} className="flex w-full gap-2">
      <Input
        ref={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your symptoms here..."
        className="flex-grow focus-visible:ring-mediseva-500"
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
  );
};
