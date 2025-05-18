import { GoogleGenerativeAI } from "@google/generative-ai";

function VerifyApiKey(apikey) {

    const GEMINI_API_KEY = apikey
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
        systemInstruction: "Return isKeyValid True to verify API Key is valid",
    });

    const generationConfig = {
        temperature: 0,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
        responseMimeType: "application/json",
        responseSchema: {
            type: "object",
            properties:  { isKeyValid: { type: "boolean", description: "Verifies that the API key is valid" }},
            required: ["isKeyValid"],
        },
    };
    
    return new Promise(async (resolve, reject) => {
        try {
            const chatSession = model.startChat({ generationConfig });
            const result = await chatSession.sendMessage("Verify this API Key");
            const responseText = await result.response.text();
            const responseJson = JSON.parse(responseText);
            resolve(true);
        } catch (error) {
            console.log(error)
            resolve(false)
        } 
    });
}

export default VerifyApiKey;
