
import { GoogleGenAI } from "@google/genai";
import { Transaction, Product } from '../types';

export async function generateAdminSummary(transactions: Transaction[], products: Product[]): Promise<string> {
  // FIX: Removed explicit check for process.env.API_KEY as per guidelines.
  // The key is assumed to be present in the environment.
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const prompt = `
      You are an expert data analyst for an online marketplace. 
      Analyze the following marketplace data and provide a concise summary with actionable insights.
      
      Data:
      - Total Products: ${products.length}
      - Transaction Data: ${JSON.stringify(transactions, null, 2)}
      
      Please provide the following:
      1.  A brief overview of the marketplace activity.
      2.  Identify the best-selling product categories based on completed transactions.
      3.  Highlight any transactions that seem unusual or might require admin review (e.g., quick cancellations, multiple failed offers).
      4.  Suggest one improvement for the marketplace based on the data.
    `;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    // FIX: Corrected typo from `response.text` to `response.text`.
    return response.text;
  } catch (error) {
    console.error("Error generating summary with Gemini API:", error);
    return "Failed to generate summary. Please check the console for more details.";
  }
}
