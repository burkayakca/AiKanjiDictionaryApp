import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, ScrollView } from 'react-native';
import PrimaryButton from '../ui/PrimaryButton';
import SecondaryButton from "../ui/SecondaryButton";
import colors from '../ui/CustomColors';
import Title from '../ui/Title';
import getKanji from '../genai/getKanji';
import XButton from '../ui/XButton';

function SubmitKanji() {
    const [enteredKanji, setEnteredKanji] = useState("");
    const [json, setJsonfile] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [language, setLanguage] = useState("en");

    const handleFetchKanji = async () => {
        try {
            setIsLoading(true);
            const data = await getKanji(enteredKanji, language);
            console.log('Fetched data:', data);
            if (data.isValid) {
                setJsonfile(data);
            } else if (data.isValid === false) {
                setJsonfile("");
                Alert.alert(
                    language === "en" ? "Error" : "Hata",
                    language === "en" ? "Invalid Query. Please try again with a valid query." : "Geçersiz Sorgu. Lütfen tekrar deneyiniz",
                    [{ text: language === "en" ? "OK" : "Tamam", style: "destructive" }]
                );
            }
        } catch (error) {
            console.error('Error fetching the Kanji data:', error);
            Alert.alert(
                language === "en" ? "Error" : "Hata",
                String(error),
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

                <View style={[styles.inputContainer, { alignItems: json ? "left" : "center" }]}>
                    <View>
                        {json
                            ?
                            <View>
                                <XButton onPress={resetKanji} />
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
                                    <SecondaryButton disabled={isLoading} onPress={languageSetting}>{language === "en" ? "Türkçe" : "English"}</SecondaryButton>
                                </View>
                            </View>}
                    </View>
                    <ScrollView style={{ maxHeight: 600, minWidth: 300, maxWidth: "100%" }}>
                        {json && (
                            <View>
                                <View>
                                    <Text style={styles.kanji}>{json.kanji}</Text>
                                    <Text style={styles.kanjiText}>
                                        <Text style={styles.boldText}>{language === "en" ? "Meaning(s):" : "Anlam(lar)ı:"}</Text> {json.meaning}
                                    </Text>
                                    <Text style={styles.kanjiText}>
                                        <Text style={styles.boldText}>{language === "en" ? "Onyomi:" : "Onyomi:"}</Text> {json.onyomi.join(", ")}
                                    </Text>
                                    <Text style={styles.kanjiText}>
                                        <Text style={styles.boldText}>{language === "en" ? "Kunyomi:" : "Kunyomi:"}</Text> {json.kunyomi.join(", ")}
                                    </Text>
                                    <Text style={styles.kanjiText}>
                                        <Text style={styles.boldText}>{language === "en" ? "Stroke Count:" : "Çizgi Sayısı:"}</Text> {json.strokeNumber}
                                    </Text>
                                    <Text style={styles.kanjiText}>
                                        <Text style={styles.boldText}>{language === "en" ? "Component(s):" : "Bileşen(ler)i:"}</Text> {json.components.join(", ")}
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
                                            <Text style={styles.tableCellKanji}>{row.word}</Text>
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
    boldText: {
        fontWeight: "bold"
    },
    kanji: {
        fontSize: 50,
        color: colors.bs.info,
        textAlign: "center"
    },
    kanjiText: {
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
        justifyContent: "center",
        marginVertical: 10
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
        fontSize: 18,
        padding: 10,
        textAlign: "center",
    },
    tableCellKanji: {
        flex: 1,
        fontSize: 18,
        padding: 10,
        textAlign: "center",
    }
});

export default SubmitKanji;