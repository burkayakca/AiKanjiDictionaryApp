import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, ScrollView } from 'react-native';
import PrimaryButton from '../ui/PrimaryButton';
import SecondaryButton from "../ui/SecondaryButton";
import colors from '../ui/CustomColors';
import Title from '../ui/Title';
import getKanji from '../genai/getKanji';

function SubmitKanji() {
    const [enteredKanji, setEnteredKanji] = useState("");
    const [json, setJsonfile] = useState("");
    const [isLoading, setIsLoading] = useState(false); // Fixed missing assignment
    const [error, setError] = useState(""); // Fixed typo from "cosnt" to "const"
    const [language, setLanguage] = useState("en");

    const handleFetchKanji = async () => {
        try {
            setIsLoading(true);
            const data = await getKanji(enteredKanji, language);
            console.log('Fetched data:', data); 
            if (data.isValid) {
                setJsonfile(data);
                setError(""); 
            } else if (data.isValid === false) {
                setJsonfile(null);
                setError(language === "en" ? "Invalid Query. Please try again with a valid query." : "Geçersiz Sorgu. Lütfen tekrar deneyiniz");
                Alert.alert(
                    language === "en" ? "Error" : "Hata",
                    error,
                    [{ text: language === "en" ? "OK" : "Tamam", style: "destructive" }]
                );
            }
        } catch (error) {
            console.error('Error fetching the Kanji data:', error);
            setError(language === "en" ? "An error occurred while fetching the Kanji data. Please try again." : "Bir hata meydana geldi. Lütfen tekrar deneyin.");
            Alert.alert(
                language === "en" ? "Error" : "Hata",
                error,
                [{ text: language === "en" ? "OK" : "Tamam", style: "destructive" }]
            );
        } finally {
            setIsLoading(false); 
        }
    };

    function resetKanji() {
        setJsonfile("")
        setEnteredKanji("")
    }

    function languageSetting() {
        if (language == "en") {
            setLanguage("tr")
        } else {
            setLanguage("en")
        }
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.main}>
                <View style={styles.inputContainer}>
                    <View>
                        {json 
                        ? 
                        <View>
                            <PrimaryButton onPress={resetKanji}>New Query</PrimaryButton>
                        </View> 
                        : 
                        <View>
                            <View>
                                <Title>Enter A Kanji</Title>
                                <TextInput textAlign={"center"} style={styles.kanjiInput} onChangeText={setEnteredKanji} value={enteredKanji} />
                            </View>
                            <View style={styles.buttonsContainer}>
                                <PrimaryButton onPress={handleFetchKanji}>
                                    {language === "en" ?
                                    (isLoading ? "Loading..." : "Submit")
                                    : (isLoading ? "Yükleniyor..." : "Gönder")}
                                </PrimaryButton>
                                <SecondaryButton onPress={languageSetting}>{language === "en" ? "Türkçe" : "English"}</SecondaryButton>
                            </View>
                        </View>}
                    </View>
                    <ScrollView style={{ maxHeight: 600, minWidth: 300, maxWidth: "100%" }}>
                        {json && (
                            <View>
                                <View>
                                <Text style={styles.kanji}>{json.kanji}</Text>
                                <Text style={styles.kanjiText}>
                                    {language === "en" ? "Meaning(s):" : "Anlam(lar)ı:"} {json.meaning}
                                </Text>
                                <Text style={styles.kanjiText}>
                                    {language === "en" ? "Onyomi:" : "Onyomi:"} {json.onyomi.join(", ")}
                                </Text>
                                <Text style={styles.kanjiText}>
                                    {language === "en" ? "Kunyomi:" : "Kunyomi:"} {json.kunyomi.join(", ")}
                                </Text>
                                <Text style={styles.kanjiText}>
                                    {language === "en" ? "Stroke Count:" : "Çizgi Sayısı:"} {json.strokeNumber}
                                </Text>
                                <Text style={styles.kanjiText}>
                                    {language === "en" ? "Component(s):" : "Bileşen(ler)i:"} {json.components.join(", ")}
                                </Text>
                                </View>
                                <View style={styles.table}>
                                    <View style={styles.tableRowHeader}>
                                        <Text style={styles.tableHeader}>Kelime</Text>
                                        <Text style={styles.tableHeader}>Okunuş</Text>
                                        <Text style={styles.tableHeader}>Anlam</Text>
                                    </View>
                                    
                                    {json.examples.map((row, idx) => (
                                        <View style={styles.tableRow} key={idx}>
                                            <Text style={styles.tableCell}>{row.word}</Text>
                                            <Text style={styles.tableCell}>{row.reading}</Text>
                                            <Text style={styles.tableCell}>{row.meaning}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                            
                        )}
                    </ScrollView>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    kanji : { 
        fontSize: 50,
        color: colors.bs.info, 
        textAlign: "center" },
    kanjiText :  { 
        fontSize: 18,
         marginVertical: 5 
    },
    kanjiInput: {
        borderBottomWidth: 2,
        borderBottomColor: "black",
        paddingHorizontal: 50,
        paddingVertical: 10,
        marginVertical: 10,
        margin: 10,
        fontSize: 30,
        width: 200,
        height: 60
    },
    inputContainer: {
        alignItems: "center",
        marginTop: 100,
        marginHorizontal: 24,
        padding: 16,
        backgroundColor: colors.bs.white,
        borderRadius: 8,
        elevation: 8,  
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.25,
    },
    buttonsContainer: {
        flexDirection: "row",
        marginBottom: 25
    },
    table: {
        marginTop: 24,
        borderWidth: 1,
        borderColor: "#222",
        borderRadius: 6,
        overflow: "hidden",
    },
    tableRowHeader: {
        flexDirection: "row",
        backgroundColor: "#e0556a",
    },
    tableHeader: {
        flex: 1,
        color: "#fff",
        fontWeight: "bold",
        fontSize: 18,
        padding: 10,
        textAlign: "center",
    },
    tableRow: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#b2dfdb",
    },
    tableCell: {
        flex: 1,
        fontSize: 16,
        padding: 10,
        textAlign: "center",
    },
});

export default SubmitKanji;