
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
    <form onSubmit={handleSendMessage} className="flex w-full space-x-2">
      <Input
        ref={inputRef}
        type="text"
        placeholder="Type your symptoms..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-grow"
      />
      <Button type="submit" size="icon" disabled={input.trim() === ""}>
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
};
