import React from 'react';
import '../style.css'; 

function Entry({ kanji, meaning, kunyomi, onyomi, examples, strokeNumber,language}) {
    if (!kanji) {
        return <p>No Kanji data available. Please fetch data first.</p>;
    }

    return (
        <div className="main container-md kanji-container noto-sans-jp">
                    <div className='kanji-info col'>
                        <h1 className="kanji-box">{kanji}</h1>
                            <p className='kanji-p notoSans'><strong><span className='emoji'>📝</span>{language == "en" ? "Meaning(s):" : "Anlam(lar)ı:"}</strong> {meaning}</p> 
                            <p className='kanji-p '><strong><span className='emoji'>🔤</span> Onyomi:</strong> {onyomi ? onyomi.join(', ') : 'N/A'}</p> 
                            <p className='kanji-p '><strong><span className='emoji'>🗣️</span> Kunyomi:</strong> {kunyomi ? kunyomi.join(', ') : 'N/A'}</p> 
                            <p className='kanji-p notoSans'><strong><span className='emoji'>✍️</span>{language == "en" ? "Stroke Count:" : "Çizgi Sayısı:"}</strong> {strokeNumber}</p>
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
