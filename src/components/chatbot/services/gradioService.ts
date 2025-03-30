
import { Client } from "@gradio/client";

// Create a service for Gradio API interactions
export class GradioService {
  private client: any = null;
  private connectionPromise: Promise<any> | null = null;
  
  // Connect to the Gradio API
  async connect(): Promise<any> {
    if (this.client) {
      return this.client;
    }
    
    if (!this.connectionPromise) {
      this.connectionPromise = this.initializeClient();
    }
    
    try {
      this.client = await this.connectionPromise;
      return this.client;
    } catch (error) {
      this.connectionPromise = null;
      throw error;
    }
  }
  
  private async initializeClient(): Promise<any> {
    try {
      console.log("Connecting to Gradio API...");
      return await Client.connect("Shinichi876/Medical-bot", {
        hf_token: null // Set to your token if it's a private space
      });
    } catch (error) {
      console.error("Failed to connect to Gradio API:", error);
      throw error;
    }
  }
  
  // Sanitize markdown content to ensure it's safe for rendering
  private sanitizeMarkdown(markdown: string | any): string {
    try {
      // Check if the response is an array and get the first item
      if (Array.isArray(markdown)) {
        markdown = markdown[0];
      }
      
      // Ensure markdown is a string
      if (typeof markdown !== 'string') {
        console.error("Non-string response received:", markdown);
        return "The response format was unexpected. Please try again later.";
      }
      
      // Replace problematic markdown patterns with simpler versions
      let sanitized = markdown;
      
      // Convert ### headings to bold text
      sanitized = sanitized.replace(/### #{1,2} (.*?)$/gm, '**$1**');
      
      // Convert #### headings to bold text
      sanitized = sanitized.replace(/#### (.*?)$/gm, '**$1:**');
      
      // Remove any HTML-like tags that might be in the content
      sanitized = sanitized.replace(/<[^>]*>/g, '');
      
      return sanitized;
    } catch (error) {
      console.error("Error sanitizing markdown:", error);
      // If sanitization fails, return plain text without markdown
      if (typeof markdown === 'string') {
        return markdown.replace(/[#*_`~]/g, '');
      }
      return "Failed to process the response. Please try again later.";
    }
  }
  
  // Analyze symptoms through the API
  async analyzeSymptoms(symptoms: string): Promise<string> {
    try {
      const client = await this.connect();
      const result = await client.predict("/analyze", { 
        symptoms 
      });
      
      console.log("API response:", result);
      
      if (!result.data) {
        throw new Error("API returned empty response");
      }
      
      // Handle the specific structure of the API response
      // The response is typically an array with the first element being the markdown content
      return this.sanitizeMarkdown(result.data);
    } catch (error) {
      console.error("Error analyzing symptoms:", error);
      throw error;
    }
  }
}

// Create a singleton instance
export const gradioService = new GradioService();
