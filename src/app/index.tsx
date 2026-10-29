import { StyleSheet, View } from "react-native";

import { StartGameScreen } from "@/screens/start-game-screen";
import { Colors } from "@/constants/colors";

export default function App() {
  function pickedNumberHandler(pickedNumber: number) {
    console.log(pickedNumber);
  }

  return (
    <View style={styles.rootScreen}>
      <StartGameScreen onPickNumber={pickedNumberHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
    backgroundColor: Colors.primary700,
  },
});
