import { GoogleGenerativeAI } from "@google/generative-ai";
import Prompts from "./Prompts";
import { REACT_APP_GEMINI_API_KEY } from "@env";

function getKanji(character, language) {
    let systemInstruction;
    let properties;

    if (language === "en") {
        systemInstruction = Prompts.en.systemInstruction;
        properties = Prompts.en.properties;
    } else {
        systemInstruction = Prompts.tr.systemInstruction;
        properties = Prompts.tr.properties;
    };

    const genAI = new GoogleGenerativeAI(REACT_APP_GEMINI_API_KEY); // Use environment variable
    const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
        systemInstruction: systemInstruction,
    });

    const generationConfig = {
        temperature: 0,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
        responseMimeType: "application/json",
        responseSchema: {
            type: "object",
            properties: properties,
            required: ["kanji","onyomi", "kunyomi", "meaning", "isValid", "strokeNumber", "examples"],
        },
    };
    
    return new Promise(async (resolve, reject) => {
        try {
            const chatSession = model.startChat({ generationConfig });
            const result = await chatSession.sendMessage(character);
            const responseText = await result.response.text();
            const responseJson = JSON.parse(responseText);
            resolve(responseJson);
        } catch (error) {
            console.error("Error fetching Kanji data:", error?.message || "Unknown error", error); // Improved error logging
            reject(error);
        }
    });
}

export default getKanji;