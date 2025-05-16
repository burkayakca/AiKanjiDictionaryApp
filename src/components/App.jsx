import React, { useState } from "react";
import Entry from './Entry'; 
import getKanji from "./getKanji.jsx";
import XButton from "./XButton.jsx";

function App() {
    const [jsonfile, setJsonfile] = useState(null);
    const [inputKanji, setInputKanji] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false); 
    const [language, setLanguage] = useState("en")

    function languageSetting() {
      if (language == "en") {
        setLanguage("tr")
      } else {
        setLanguage("en")
      }
      console.log(language)
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
          language = {language}
        />
      );
    }

    function resetKanji() {
      setJsonfile("")
    }

    const handleFetchKanji = async () => {
        setIsLoading(true); 
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
    };

    return (
      <div className="main">
      {jsonfile 
          ? 
          <XButton
            onClick={resetKanji}
            className={"close-svg"}
          />
          : <div className=" input center-container">
          <h2 className="np">{language === "en" ? "AI Kanji Dictionary" : "YZ Kanji Sözlüğü"}</h2>
          <input
          className="form-control-md np"
          type="text"
          value={inputKanji}
          onChange={(e) => setInputKanji(e.target.value)}
          placeholder={language === "en" ? "Enter Kanji" : "Kanci giriniz"}
          />
          <div>
            <button
              className="btn btn-primary btn-sm text-nowrap np"
              type="submit"
              onClick={handleFetchKanji}
              disabled={isLoading}
              > {language === "en" ? 
                (isLoading ? "Loading..." : "Submit")
                : (isLoading ? "Yükleniyor..." : "Gönder")
                }
            </button>
            <button
              className="btn btn-danger btn-sm text-nowrap np lang_btn"
              type="submit"
              onClick={languageSetting}
              disabled={isLoading || jsonfile}
              >
              {language === "en" ? "Türkçe" : "English"}
            </button>
          </div>

        </div>}


        <dl className="dictionary">
          {jsonfile ? createEntry(jsonfile, 0) : ""}
        </dl>
      </div>
    );
}

export default App;