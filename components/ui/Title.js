import { Text, StyleSheet } from "react-native";
import colors from "./CustomColors";
function Title({children}) {
    return <Text style={styles.title}>{children}</Text>
}

export default Title;

const styles = StyleSheet.create({
    title : {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        color: colors.bs.dark,}
})