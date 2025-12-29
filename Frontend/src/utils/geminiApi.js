/**
 * Gemini API Utility
 * Handles AI content generation using Google's Gemini API
 */

export const generateGeminiContent = async (prompt) => {
  const apiKey = ""; // Add your API key here or use environment variable
  
  if (!apiKey) {
    console.warn("Gemini API key not configured");
    return "AI features require API key configuration.";
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "Could not generate content.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error connecting to AI service.";
  }
};
