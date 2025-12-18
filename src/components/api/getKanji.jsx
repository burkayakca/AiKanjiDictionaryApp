import { GoogleGenerativeAI } from "@google/generative-ai";
import Prompts from "./prompts";

function getKanji(character,language) {
    let systemInstruction;
    let properties;

    if (language == "en") {
        systemInstruction = Prompts.en.systemInstruction;
        properties = Prompts.en.properties;
    } else {
        systemInstruction = Prompts.tr.systemInstruction;
        properties = Prompts.tr.properties;
    };
    
    const GEMINI_API_KEY = localStorage.getItem("GEMINI_API_KEY")
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
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
            console.log(responseJson);
            resolve(responseJson);
        } catch (error) {
            alert(error);
            console.error("Error fetching Kanji data:", error);
            reject(error);
        }
    });
}

export default getKanji;
