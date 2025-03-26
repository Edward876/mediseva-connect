
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessagesSquare, X, Send, Bot } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// Medical symptoms dataset
const symptoms = [
  { id: 1, text: "chest pain", specialty: "cardiology" },
  { id: 2, text: "shortness of breath", specialty: "pulmonology" },
  { id: 3, text: "headache", specialty: "neurology" },
  { id: 4, text: "back pain", specialty: "orthopedics" },
  { id: 5, text: "fever", specialty: "general physician" },
  { id: 6, text: "rash", specialty: "dermatology" },
  { id: 7, text: "abdominal pain", specialty: "gastroenterology" },
  { id: 8, text: "fatigue", specialty: "general physician" },
  { id: 9, text: "vision problems", specialty: "ophthalmology" },
  { id: 10, text: "joint pain", specialty: "rheumatology" },
  { id: 11, text: "dizziness", specialty: "neurology" },
  { id: 12, text: "toothache", specialty: "dental" },
  { id: 13, text: "cough", specialty: "pulmonology" },
  { id: 14, text: "ear pain", specialty: "ent" },
  { id: 15, text: "sore throat", specialty: "ent" },
  { id: 16, text: "high blood pressure", specialty: "cardiology" },
  { id: 17, text: "blurred vision", specialty: "ophthalmology" },
  { id: 18, text: "swelling", specialty: "general physician" },
  { id: 19, text: "numbness", specialty: "neurology" },
  { id: 20, text: "bleeding", specialty: "emergency medicine" },
];

// Initial welcome message
const initialMessages = [
  {
    id: 1,
    content: "Hello, I'm MediBot! I can help you identify which specialist you might need based on your symptoms. What symptoms are you experiencing?",
    sender: "bot",
    timestamp: new Date(),
  },
];

interface Message {
  id: number;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

  const handleSendMessage = (e: React.FormEvent) => {
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

    // Simulate bot processing and response
    setTimeout(() => {
      const botResponse = processInput(input);
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const processInput = (userInput: string): Message => {
    const lowercaseInput = userInput.toLowerCase();
    
    // Check for emergency keywords
    const emergencyKeywords = ["emergency", "urgent", "severe", "critical", "can't breathe", "heart attack", "stroke"];
    if (emergencyKeywords.some(keyword => lowercaseInput.includes(keyword))) {
      return {
        id: messages.length + 2,
        content: "This sounds like an emergency situation. Please call emergency services immediately or go to the nearest emergency room. You can also use our Emergency Service feature for immediate assistance.",
        sender: "bot",
        timestamp: new Date(),
      };
    }
    
    // Find matching symptoms
    const matchedSymptoms = symptoms.filter(symptom => 
      lowercaseInput.includes(symptom.text)
    );
    
    if (matchedSymptoms.length > 0) {
      // Group by specialty
      const specialties = [...new Set(matchedSymptoms.map(s => s.specialty))];
      
      return {
        id: messages.length + 2,
        content: `Based on your symptoms, you might need to consult a specialist in ${specialties.join(", ")}. Would you like me to help you find a doctor in ${specialties[0]}?`,
        sender: "bot",
        timestamp: new Date(),
      };
    } else if (lowercaseInput.includes("yes") || lowercaseInput.includes("find") || lowercaseInput.includes("doctor")) {
      return {
        id: messages.length + 2,
        content: "Great! You can find doctors by specialty on our 'Find Doctors' page. Would you like me to direct you there?",
        sender: "bot",
        timestamp: new Date(),
      };
    } else if (lowercaseInput.includes("thank")) {
      return {
        id: messages.length + 2,
        content: "You're welcome! I'm here to help. Is there anything else you'd like to know about your health concerns?",
        sender: "bot",
        timestamp: new Date(),
      };
    } else {
      return {
        id: messages.length + 2,
        content: "I'm not sure I understand your symptoms. Could you please describe what you're experiencing in more detail? For example, do you have pain, fever, cough, etc.?",
        sender: "bot",
        timestamp: new Date(),
      };
    }
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
        <Card className="border-0 shadow-xl overflow-hidden h-[500px] flex flex-col">
          <CardHeader className="bg-mediseva-600 text-white p-4 flex flex-row items-center space-x-2">
            <Bot className="h-6 w-6" />
            <div>
              <h3 className="font-semibold">MediBot</h3>
              <p className="text-xs text-mediseva-100">Symptom checker assistant</p>
            </div>
          </CardHeader>
          
          <CardContent className="flex-grow p-0 overflow-y-auto">
            <div className="p-4 space-y-4">
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
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
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
          </CardContent>
          
          <CardFooter className="p-3 border-t">
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
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
