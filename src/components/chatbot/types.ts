
export interface Message {
  id: number;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export interface Symptom {
  id: number;
  text: string;
  specialty: string;
}
