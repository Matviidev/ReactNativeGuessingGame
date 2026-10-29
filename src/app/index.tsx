import { useState } from "react";
import { StyleSheet, View } from "react-native";

import { GameScreen } from "@/screens/game-screen";
import { StartGameScreen } from "@/screens/start-game-screen";
import { Colors } from "@/constants/colors";

export default function App() {
  const [userNumber, setUserNumber] = useState<number | null>(null);

  function pickedNumberHandler(pickedNumber: number) {
    setUserNumber(pickedNumber);
  }

  function gameOverHandler() {
    setUserNumber(null);
  }

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;

  if (userNumber) {
    screen = (
      <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
    );
  }

  return <View style={styles.rootScreen}>{screen}</View>;
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
    backgroundColor: Colors.primary700,
  },
});
