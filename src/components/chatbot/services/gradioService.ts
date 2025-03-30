
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
  
  // Process and prepare markdown for rendering
  private processMarkdown(content: string | any): string {
    try {
      // Handle array responses
      if (Array.isArray(content)) {
        content = content[0];
      }
      
      // Handle non-string responses
      if (typeof content !== 'string') {
        console.error("Non-string response received:", content);
        return "The response format was unexpected. Please try again later.";
      }
      
      // Clean up markdown formatting for better rendering
      let processed = content;
      
      // Fix markdown headings with double hash symbols
      processed = processed.replace(/### ##\s+/g, "## ");
      
      // Replace triple hash headings with double hash for better hierarchy
      processed = processed.replace(/###\s+/g, "## ");
      
      // Convert #### headings to bold text with colon
      processed = processed.replace(/####\s+([^:]+)(?!:)/gm, "**$1:**");
      
      // Remove any invalid HTML-like tags
      processed = processed.replace(/<(?!\/?(strong|em|code|pre|blockquote|ul|ol|li|p))[^>]*>/g, '');
      
      // Ensure proper spacing for list items
      processed = processed.replace(/\n(\s*)-\s+/g, '\n$1- ');
      
      return processed;
    } catch (error) {
      console.error("Error processing markdown:", error);
      if (typeof content === 'string') {
        // Return plain text if processing fails
        return content;
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
      
      // Process the markdown to make it renderable
      return this.processMarkdown(result.data);
    } catch (error) {
      console.error("Error analyzing symptoms:", error);
      throw error;
    }
  }
}

// Create a singleton instance
export const gradioService = new GradioService();
