import React, {useState,useEffect} from 'react';
import './style.css'; 
import HanziWriter from 'hanzi-writer';

function Entry({ kanji, components, meaning, kunyomi, onyomi, examples, strokeNumber,language}) {
    const [isSupported, setIsSupported] = useState(true);

    if (!kanji) {
        return <p>No Kanji data available. Please fetch data first.</p>;
    }


    useEffect(() => {
        if (!kanji) return;
      
        setIsSupported(true);
      
        var writer = HanziWriter.create("kanjiRender-div", kanji, {
          width: 120,
          height: 120,
          padding: 5,
          strokeColor: "#DC4C64",
          onLoadCharDataError() {
            setIsSupported(false); 
          },
          delayBetweenLoops: 3000,
        });

        writer.loopCharacterAnimation();
      
        return () => writer?.dispose?.();
      }, [kanji]);
      


    return (
        <div className="container-md kanji-container noto-sans-jp">
                    <div className='kanji-info col'>
                        {isSupported ? <div className="kanji-box" id="kanjiRender-div"></div>
                        : <h1 className='kanji-box'>{kanji}</h1>
                        }
                            <p className='kanji-p notoSans'><strong>{language == "en" ? "Meaning(s):" : "Anlam(lar)ı:"}</strong>　{meaning}</p> 
                            <p className='kanji-p '><strong>Onyomi:</strong> {onyomi ? onyomi.join(', ') : '-'}</p> 
                            <p className='kanji-p '><strong>Kunyomi:</strong> {kunyomi ? kunyomi.join(', ') : '-'}</p> 
                            <p className='kanji-p notoSans'><strong>{language == "en" ? "Stroke Count:" : "Çizgi Sayısı:"}</strong> {strokeNumber}</p>
                            <p className='kanji-p notoSans'><strong>{language == "en" ? "Component(s):" : "Bileşen(ler)i:"}</strong> {components ? components.join(", ") : "-"}</p>
                    </div> 

                    <div className="kanji-examples">
                        <h4 className='notoSans'><span className='emoji'>📚</span>{language == "en" ? "Example Words" : "Örnek Kelimeler"}</h4>
                            <table className="table">
                            <thead>
                            <tr className='notoSans'>    
                                <th scope="col">{language == "en" ? "Word" : "Kelime"}</th>    
                                <th scope="col">{language == "en" ? "Reading" : "Okunuş"}</th>    
                                <th scope="col">{language == "en" ? "Meaning" : "Anlam"}</th>    
                            </tr>    
                            </thead>
                            <tbody>
                            {examples.map((example, index) => (    
                            <tr key={index}>    
                                <td>{example.word}</td>
                                <td>{example.reading}</td>    
                                <td className='notoSans'>{example.meaning}</td>        
                            </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
        </div>    
    );
}

export default Entry;
