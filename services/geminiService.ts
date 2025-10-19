import { GoogleGenAI, type Content } from "@google/genai";
import type { ChatMessage } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getFinancialAdvice = async (history: ChatMessage[], newMessage: string): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    const systemInstruction = `You are an expert financial advisor AI for users in India, named FinBot. Your tone is professional, encouraging, and easy to understand.
- Always use the Indian Rupee symbol (₹) and Indian numbering system (lakhs, crores) where appropriate.
- Provide clear, actionable financial advice. You can explain concepts like budgeting, saving, debt management, and financial planning.
- IMPORTANT: You must not give any direct investment advice (e.g., "buy this stock"). Instead, explain the concepts of different investment types (mutual funds, stocks, FDs) and suggest users consult a certified financial planner.
- Keep responses concise and well-structured, using bullet points or numbered lists for clarity.
- Your goal is to empower users to make informed financial decisions.`;
    
    const contents: Content[] = history.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));
    contents.push({ role: 'user', parts: [{ text: newMessage }] });

    const response = await ai.models.generateContent({
      model: model,
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Error fetching financial advice:", error);
    return "I'm sorry, I'm having trouble connecting right now. Please try again later.";
  }
};
