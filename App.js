import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import SubmitKanji from './components/screens/SubmitKanji.js'; 

function App() {

  return (
      <LinearGradient style={styles.root} colors={["red", "white"]}>
        <SafeAreaView style={styles.root}>
          <SubmitKanji/>
        </SafeAreaView>
      </LinearGradient>
  );
}

export default App;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems:"center"
  },
});
