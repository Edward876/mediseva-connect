
import { Message } from "../types";
import { symptoms } from "../data/symptoms";

export const processInput = (userInput: string, messagesLength: number): Message => {
  const lowercaseInput = userInput.toLowerCase();
  
  // Check for emergency keywords
  const emergencyKeywords = ["emergency", "urgent", "severe", "critical", "can't breathe", "heart attack", "stroke"];
  if (emergencyKeywords.some(keyword => lowercaseInput.includes(keyword))) {
    return {
      id: messagesLength + 2,
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
      id: messagesLength + 2,
      content: `Based on your symptoms, you might need to consult a specialist in ${specialties.join(", ")}. Would you like me to help you find a doctor in ${specialties[0]}?`,
      sender: "bot",
      timestamp: new Date(),
    };
  } else if (lowercaseInput.includes("yes") || lowercaseInput.includes("find") || lowercaseInput.includes("doctor")) {
    return {
      id: messagesLength + 2,
      content: "Great! You can find doctors by specialty on our 'Find Doctors' page. Would you like me to direct you there?",
      sender: "bot",
      timestamp: new Date(),
    };
  } else if (lowercaseInput.includes("thank")) {
    return {
      id: messagesLength + 2,
      content: "You're welcome! I'm here to help. Is there anything else you'd like to know about your health concerns?",
      sender: "bot",
      timestamp: new Date(),
    };
  } else {
    return {
      id: messagesLength + 2,
      content: "I'm not sure I understand your symptoms. Could you please describe what you're experiencing in more detail? For example, do you have pain, fever, cough, etc.?",
      sender: "bot",
      timestamp: new Date(),
    };
  }
};

// Initial welcome message with proper typing
export const initialMessages: Message[] = [
  {
    id: 1,
    content: "Hello, I'm MediBot! I can help you identify which specialist you might need based on your symptoms. What symptoms are you experiencing?",
    sender: "bot",
    timestamp: new Date(),
  },
];
