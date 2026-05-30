import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GEMINI_API_KEY
);

export const analyzeEmergency = async (userMessage, selectedLanguage = "English") => {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-flash-latest",
      generationConfig: {
        responseMimeType: "application/json",
      }
    });
    
    const prompt = `
You are HealSync AI, an emergency healthcare assistant.

Respond in the user's selected language.

Supported languages:
- English
- Urdu
- Hindi

IMPORTANT:
- Keep response medically cautious
- Avoid final diagnosis
- Be concise and emergency-focused
- Use easy-to-understand language
- Automatically detect whether the user is speaking English, Urdu, or Hindi and adjust AI response language dynamically if their input differs from the selected language.

Response format EXACTLY as JSON (no markdown):
{
  "severity": "High/Moderate/Critical",
  "summary": "Brief summary of the situation",
  "immediate_actions": ["action 1", "action 2"],
  "warnings": ["do not do this"],
  "seek_help": "When to call emergency services"
}

User language:
${selectedLanguage}

User message:
${userMessage}
`;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};
