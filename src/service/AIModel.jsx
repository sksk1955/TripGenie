import { GoogleGenerativeAI } from "@google/generative-ai";

if (!import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY) {
  throw new Error("Missing Gemini API key");
}

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY);

const model = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash",
});

// Utility to extract JSON from a string (handles markdown/code blocks)
function extractJson(text) {
  // Remove JS-style comments
  text = text.replace(/\/\/.*$/gm, "");
  // Try to match code block
  const codeBlockMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  if (codeBlockMatch) {
    text = codeBlockMatch[1];
  }
  // Find first { and last }
  const firstBrace = text.indexOf('{');
  const lastBrace = text.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    return text.substring(firstBrace, lastBrace + 1);
  }
  return text;
}

// Utility to sanitize geo_coordinates
function sanitizeGeoCoordinates(obj) {
  if (Array.isArray(obj)) {
    return obj.map(sanitizeGeoCoordinates);
  }
  if (typeof obj === "object" && obj !== null) {
    for (const key in obj) {
      if (key === "geo_coordinates") {
        // Remove N/A or invalid coordinates
        if (
          !obj[key] ||
          obj[key] === "N/A" ||
          obj[key].toLowerCase().trim() === "na" ||
          obj[key].trim() === ""
        ) {
          delete obj[key];
        }
      } else {
        sanitizeGeoCoordinates(obj[key]);
      }
    }
  }
  return obj;
}

export const generateAIResponse = async (prompt) => {
  try {
    const result = await model.generateContent({
      contents: [{ 
        role: "user",
        parts: [{ text: prompt }]
      }]
    });

    const response = await result.response;
    let text = response.text();

    // Extract JSON from the response
    text = extractJson(text);

    try {
      const parsedJson = JSON.parse(text);
      if (!parsedJson.hotel_options || !parsedJson.daily_itinerary) {
        throw new Error('Invalid response format');
      }
      return text;
    } catch (parseError) {
      console.error("Invalid JSON response:", parseError, text);
      throw new Error("AI response was not in valid JSON format");
    }
  } catch (error) {
    console.error("AI Model Error:", error);
    throw error;
  }
};

// For backward compatibility
export const chatSession = {
  sendMessage: async (prompt) => {
    try {
      const text = await generateAIResponse(prompt);
      return {
        response: {
          text: () => text
        }
      };
    } catch (error) {
      console.error("Chat session error:", error);
      throw error;
    }
  }
};