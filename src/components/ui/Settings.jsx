import {useState,React} from "react";
import Store from "../Store";
import VerifyApiKey from "../api/VerifyApiKey";
import SettingsFooter from "./footers/settingsFooter.jsx"


function Settings() {
    
    const [apikeyInput, setApikeyInput] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const toggleSettings = Store((state) => state.toggleSettingsScreen)
    const language = Store((state) => state.language)

    
    
    async function saveApikey() {
        setIsLoading(true)
        const apiVerification = await VerifyApiKey(apikeyInput)
        console.log(apiVerification)
        if (apiVerification == true) {
          localStorage.setItem('GEMINI_API_KEY', apikeyInput)
          alert(language === "en" ? "API Key verified and saved to Local Storage." : "API Anahtarı Tarayıcı hafızasına kaydedildi.")
          setApikeyInput("")
          setIsLoading(false)
          toggleSettings()
        } else {
          alert(language == "en" ? "API Key could not be verified. Please re-enter your API Key or try again later" : "API Anahtarı doğrulanamadı. Lütfen Anahtarınızı tekrar giriniz yada daha sonra tekrar deneyiniz. ")
          setIsLoading(false)
          setApikeyInput("")
        }
    }

    return (
        <div className="input-container settings">
            <h2>{language == "en" ? "Settings" : "Ayarlar"}</h2>
            <input
                className="form-control-md"
                type="password"
                value={apikeyInput}
                onChange={(e) => setApikeyInput(e.target.value)}
                placeholder={language === "en" ? "Enter Gemini API Key" : "Gemini API Anahtarı giriniz"}
            />
            <div>
                <button
                    className="btn btn-primary btn-sm text-nowrap"
                    type="submit"
                    onClick={saveApikey}
                    disabled={isLoading}
                > {language === "en" ?
                    (isLoading ? "Verifying Key..." : "Verify & Save")
                    : (isLoading ? "Doğrulanıyor" : "Doğrula & Kaydet")
                    }
                </button>
                <button
                    className="btn btn-danger btn-sm text-nowrap lang_btn"
                    type="submit"
                    onClick={toggleSettings}
                >
                    {language === "en" ? "Cancel" : "İptal"}
                </button>
            </div>
            <SettingsFooter/>
        </div>
    )
}

export default Settings;