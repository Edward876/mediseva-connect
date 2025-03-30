
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
  private sanitizeMarkdown(markdown: string): string {
    try {
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
      return markdown.replace(/[#*_`~]/g, '');
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
      
      // Sanitize the markdown before returning it
      return this.sanitizeMarkdown(result.data);
    } catch (error) {
      console.error("Error analyzing symptoms:", error);
      throw error;
    }
  }
}

// Create a singleton instance
export const gradioService = new GradioService();
