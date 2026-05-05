import { GoogleGenAI, Type } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateMarketingInsight = async (topic: string): Promise<{ text: string, trends: string[] }> => {
  if (!apiKey) {
    return { 
      text: "API Key is missing. Please provide a valid API key to use AI features.",
      trends: ["Error", "Configuration"]
    };
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide a short, punchy marketing insight about "${topic}" for a digital agency named NADAUN COLLECTIVE. Also list 3 related trending keywords.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            insight: { type: Type.STRING },
            trends: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          }
        }
      }
    });

    const jsonText = response.text || "{}";
    const data = JSON.parse(jsonText);
    
    return {
      text: data.insight || "NADAUN drives the future of digital interaction.",
      trends: data.trends || ["Digital", "Future", "Growth"]
    };

  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      text: "Unable to generate insights at this moment. NADAUN remains your steadfast partner.",
      trends: ["Resilience", "Stability", "Focus"]
    };
  }
};
