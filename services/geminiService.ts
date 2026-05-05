import { GoogleGenAI, Type } from "@google/genai";

export const generateMarketingInsight = async (topic: string): Promise<{ text: string, trends: string[] }> => {
  const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY || '';

  if (!apiKey) {
    return {
      text: "NADAUN COLLECTIVE drives the future of digital interaction and brand experience.",
      trends: ["Digital", "Future", "Growth"]
    };
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
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
      text: "NADAUN COLLECTIVE remains your steadfast partner in the digital frontier.",
      trends: ["Resilience", "Stability", "Focus"]
    };
  }
};
