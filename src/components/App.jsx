import React, { useState } from "react";
import Entry from './Entry';
import getKanji from "./getKanji.jsx";
import XButton from "./XButton.jsx";
import SButton from "./SButton.jsx";
import VerifyApiKey from "./VerifyApiKey.jsx";

function App() {
  const [jsonfile, setJsonfile] = useState(null);
  const [inputKanji, setInputKanji] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState("en")
  const [isSettingsOpen, setSettings] = useState(false)
  const [apikeyInput, setApikeyInput] = useState("")

  function languageSetting() {
    if (language == "en") {
      setLanguage("tr")
    } else {
      setLanguage("en")
    }
  }

  function createEntry(jsonfile, index) {
    return (
      <Entry
        key={index}
        kanji={jsonfile.kanji}
        meaning={jsonfile.meaning}
        kunyomi={jsonfile.kunyomi}
        onyomi={jsonfile.onyomi}
        components={jsonfile.components}
        examples={jsonfile.examples}
        strokeNumber={jsonfile.strokeNumber}
        language={language}
      />
    );
  }

  function SettingsOpen() {
    setSettings(true)
  }

  function SettingsClose() {
    setSettings(false)
  }

  async function saveApikey() {
    const apiVerification = await VerifyApiKey(apikeyInput)
    console.log(apiVerification)
    if (apiVerification == true) {
      localStorage.setItem('GEMINI_API_KEY', apikeyInput)
      alert(language === "en" ? "API Key verified and saved to Local Storage." : "API Anahtarı Tarayıcı hafızasına kaydedildi.")
      setApikeyInput("")
      SettingsClose() 
    }  else {
      alert(language == "en" ? "API Key could not be verified. Please re-enter your API Key or try again later" : "API Anahtarı doğrulanamadı. Lütfen Anahtarınızı tekrar giriniz yada daha sonra tekrar deneyiniz. ")
      setApikeyInput("")
    }
  }

  function resetKanji() {
    setJsonfile("")
  }

  const handleFetchKanji = async () => {
    setIsLoading(true);
    if (!localStorage.getItem("GEMINI_API_KEY")) {
      alert(language == "en" ? "API Key could not be found. Please set a Gemini API Key from the settings section" : "API Anahtarı bulunamadı. Lütfen Ayarlar kısmından Gemini API Anahtarı tanımlayınız");
      setIsLoading(false);
    } else {
      try {
        const data = await getKanji(inputKanji, language);
        console.log('Fetched data:', data);
        if (data.isValid) {
          setJsonfile(data);
          setErrorMessage("");
        } else if (data.isValid == false) {
          setJsonfile(null);
          setErrorMessage(language === "en" ? "Invalid Query. Please try again with a valid query." : "Geçersiz Sorgu. Lütfen tekrar deneyiniz");
          alert(errorMessage)
        }
      } catch (error) {
        alert(error)
        console.error('Error fetching the Kanji data:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="main">
      {isSettingsOpen ? (
        <div className="input-container settings">
          <h2>{language == "en" ? "Settings" : "Ayarlar"}</h2>
          <input
            className="form-control-md"
            type="text"
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
              onClick={SettingsClose}
            >
              {language === "en" ? "Cancel" : "İptal"}
            </button>
          </div>
        </div>
      ) : (
        <>
          {jsonfile
            ?
            <XButton
              onClick={resetKanji}
              className={"close-svg np"}
            />
            : <div className="input-container">
              <h2>{language === "en" ? "AI Kanji Dictionary" : "YZ Kanji Sözlüğü"}</h2>
              <input
                className="form-control-md"
                type="text"
                value={inputKanji}
                onChange={(e) => setInputKanji(e.target.value)}
                placeholder={language === "en" ? "Enter Kanji" : "Kanci giriniz"}
              />
              <div>
                <button
                  className="btn btn-primary btn-sm text-nowrap"
                  type="submit"
                  onClick={handleFetchKanji}
                  disabled={isLoading}
                > {language === "en" ?
                  (isLoading ? "Loading..." : "Submit")
                  : (isLoading ? "Yükleniyor..." : "Gönder")
                  }
                </button>
                <button
                  className="btn btn-danger btn-sm text-nowrap lang_btn"
                  type="submit"
                  onClick={languageSetting}
                  disabled={isLoading || jsonfile}
                >
                  {language === "en" ? "Türkçe" : "English"}
                </button>
                <SButton
                  className={"settings-svg"}
                  onClick={SettingsOpen}
                />
              </div>

            </div>}
          {jsonfile &&
            <dl className="dictionary">
              {createEntry(jsonfile, 0)}
            </dl>}
        </>
      )}
    </div>
  );
}

export default App;