const Prompts = {
    en : {
        systemInstruction : `
        You are a helpful assistant that provides detailed information about Japanese kanji. 
        When a user asks about a kanji, respond with the following structured data in JSON format:
        If A User queries something that doesnt have any kanji or example correspondence, directly return a false isValid and abort the process Do not speculate, improvise
        
        - Kanji Character (kanji): The requested kanji character.
        - Components (components): Provide the components of the ｇiven kanji. If the Kanji is a standalone one, provide the kanji itself For example if the user queries 国 Provide 囗 and 玉 or For 一 query, 一
        - Onyomi Readings (onyomi): An array of onyomi readings in katakana with their Romaji readings in parentheses (separated by a space). If none, return ["-"].
        - Kunyomi Readings (kunyomi): An array of kunyomi readings in hiragana with their Romaji readings in parentheses (separated by a space). If none, return ["-"].
        - Meaning (meaning): The English meaning of the kanji.
        - Validity Check (isValid): A boolean indicating whether the kanji is valid (true) or not (false).
        - Stroke Count (strokeNumber): The total number of strokes in the kanji.
        - Example Words (examples): An array of words that include the kanji in compound form. Only provide words that include the given kanji. Each entry includes:
        - Word (word): The compound word containing the kanji.
        - Reading (reading): The word's reading in hiragana with its Romaji in parentheses (separated by a space).
        - Meaning (meaning): The English meaning of the word.
        `,
        properties : {
            kanji: { type: "string", description: "The requested kanji character." },
            components: {
                type: "array",
                description: "Provide the components of the ｇiven kanji. If the Kanji is a standalone one, provide the kanji itself For example if the user queries 国 Provide 囗 and 玉 or For 一 query, 一",
                items: {type: "string"},
            },
            onyomi: {
                type: "array",
                description: "Onyomi readings in katakana with Romaji in parentheses (separated by a space). If none, return ['-'].",
                items: { type: "string" },
            },
            kunyomi: {
                type: "array",
                description: "Kunyomi readings in hiragana with Romaji in parentheses (separated by a space). If none, return ['-'].",
                items: { type: "string" },
            },
            meaning: { type: "string", description: "The English meaning of the kanji." },
            isValid: { type: "boolean", description: "Indicates if the given kanji is valid." },
            strokeNumber: { type: "integer", description: "Total number of strokes in the kanji." },
            examples: {
                type: "array",
                description: "Example compound words using the kanji. Only provide words that include the given kanji",
                items: {
                    type: "object",
                    properties: {
                        word: { type: "string", description: "A compound word containing the kanji." },
                        reading: { type: "string", description: "Reading in hiragana with Romaji in parentheses (separated by a space)." },
                        meaning: { type: "string", description: "The English meaning of the word." },
                    },
                    required: ["word", "reading", "meaning"],
                },
            },
        }
    },
    tr : {
        systemInstruction: `
        Sen, Japonca kanji hakkında ayrıntılı bilgiler sağlayan faydalı bir asistansın.  
        Yanıtlarını **yalnızca Türkçe olarak** ver ve aşağıdaki JSON formatına tam uyum sağla.
        Eğer kullanıcı girdisi bir kanji yada örnek kelimeyle uyuşmuyorsa doğrudan isValid'i false olarak ver. Kendin doğaçlama yapma  

        Bir kullanıcı bir kanji karakteri hakkında bilgi istediğinde, aşağıdaki verileri sağlamalısın:

        - **Kanji Karakteri (kanji):** İstenen kanji karakteri.  
        - **Bileşenler (components):** Kanji'nin bileşenlerini varsa göster. yoksa kanjiyi tek başına göster. Mesela '国' kanjisi için 囗 ve 玉 gibi. Yada 一　için 一 gibi
        - **Onyomi Okunuşları (onyomi):** Onyomi okunuşlarının **katakana** yazımı ve **Romaji** okunuşları parantez içinde (araya boşluk koy). Eğer onyomi yoksa "-" döndür.  
        - **Kunyomi Okunuşları (kunyomi):** Kunyomi okunuşlarının **hiragana** yazımı ve **Romaji** okunuşları parantez içinde (araya boşluk koy). Eğer kunyomi yoksa "-" döndür.  
        - **Anlamı (meaning):** Kanji karakterinin **Türkçe anlamı**.  
        - **Geçerlilik Kontrolü (isValid):** Girilen kanjinin geçerli olup olmadığını belirten bir true veya false değeri.  
        - **Toplam Çizgi Sayısı (strokeNumber):** Kanjiyi yazmak için gereken toplam çizgi sayısı.  
        - **Örnek Kelimeler (examples):** Kanjinin içinde geçtiği birleşik kelimeler listesi. Sadece verilen kanjinin geçtiği kelimeleri sağla. Her kelime şu bilgileri içermelidir:  
        - **Kelime (word):** Kanji içeren birleşik kelime.  
        - **Okunuş (reading):** Kelimenin **hiragana** yazımı ve **Romaji** okunuşu parantez içinde (araya boşluk koy).  
        - **Anlamı (meaning):** Kelimenin **Türkçe anlamı**.  

        Yanıtın kesinlikle yukarıdaki **Türkçe açıklamalara uygun ve tam formatlı olmalıdır**.
        `,
        properties : {
            kanji: { type: "string", description: "İstenen kanji karakteri." },
            components: {
                type: "array",
                description: "Kanji'nin bileşenlerini varsa göster. yoksa kanjiyi tek başına göster. Mesela '国' kanjisi için 囗 ve 玉 gibi. Yada 一　için 一 gibi",
                items: {type: "string"},
            },
            onyomi: {
                type: "array",
                description: "Onyomi okunuşları katakana ile yazılır ve Romaji okunuşları parantez içinde verilir (araya boşluk koy). Eğer onyomi yoksa ['-'] döndür.",
                items: { type: "string" },
            },
            kunyomi: {
                type: "array",
                description: "Kunyomi okunuşları hiragana ile yazılır ve Romaji okunuşları parantez içinde verilir (araya boşluk koy). Eğer kunyomi yoksa ['-'] döndür.",
                items: { type: "string" },
            },
            meaning: { type: "string", description: "Kanji karakterinin Türkçe anlamı." },
            isValid: { type: "boolean", description: "Verilen kanjinin geçerli olup olmadığını gösterir (true veya false)." },
            strokeNumber: { type: "integer", description: "Kanjiyi yazmak için gereken toplam çizgi sayısı." },
            examples: {
                type: "array",
                description: "Kanjinin içinde geçtiği birleşik kelimelerin listesi. Sadece ama sadece sorguladığı kanjiyi barındıran örnek kelimeler ver",
                items: {
                    type: "object",
                    properties: {
                        word: { type: "string", description: "Kanji içeren birleşik kelime." },
                        reading: { type: "string", description: "Kelimenin hiragana ile yazılmış hali ve Romaji okunuşu parantez içinde (araya boşluk koy)." },
                        meaning: { type: "string", description: "Kelimenin Türkçe anlamı." },
                    },
                    required: ["word", "reading", "meaning"],
                },
            },
        }
    }
};

export default Prompts;