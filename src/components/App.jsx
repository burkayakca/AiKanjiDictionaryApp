import React, { useState, Text } from "react";
import Store from "./Store.js"

import getKanji from "./api/getKanji.jsx";

import Entry from './ui/Entry.jsx';
import XButton from "./ui/buttons/XButton.jsx";
import SButton from "./ui/buttons/SButton.jsx";
import Settings from "./ui/Settings.jsx"
import MainFooter from "./ui/footers/mainFooter.jsx";

function App() {
  const [jsonfile, setJsonfile] = useState(null);
  const [inputKanji, setInputKanji] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [language, toggleLanguage] = [
    Store((state) => state.language),
    Store((state) => state.toggleLanguage)
  ];

  const [isSettingsOpen,toggleSettings] = [
    Store((state) => state.settingsScreenOpen), 
    Store((state) => state.toggleSettingsScreen)
  ];

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
      />
    );
  }

  function reset() {
    setJsonfile("")
    setInputKanji("")
  }

  const handleFetchKanji = async () => {
    setIsLoading(true);
    if (!localStorage.getItem("GEMINI_API_KEY")) {
      alert(language == "en" ? "API Key could not be found. Please set a Gemini API Key from the settings section" : "API Anahtarı bulunamadı. Lütfen Ayarlar kısmından Gemini API Anahtarı tanımlayınız");
      setIsLoading(false);
    } else {
      try {
        const data = await getKanji(inputKanji,language);
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
      {isSettingsOpen ? (<Settings/>)
      : (
        <>
          {jsonfile
            ?
            <XButton
              onClick={reset}
              className={"close-svg np"}
            />
            : 
            <div className="input-container">
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
                  onClick={toggleLanguage}
                  disabled={isLoading}
                >
                  {language === "en" ? "Türkçe" : "English"}
                </button>
                <SButton
                  className={"settings-svg"}
                  onClick={toggleSettings}
                  disabled={isLoading}
                />
              </div>
              <MainFooter/>
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