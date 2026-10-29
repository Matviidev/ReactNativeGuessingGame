import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Colors } from "@/constants/colors";
import { GameOverScreen } from "@/screens/game-over-screen";
import { GameScreen } from "@/screens/game-screen";
import { StartGameScreen } from "@/screens/start-game-screen";

type GameState =
  | { status: "idle" }
  | { status: "playing"; userNumber: number }
  | { status: "over"; userNumber: number; guesses: number[] };

const BACKGROUND_IMAGE_OPACITY = 0.15;

export default function App() {
  const [game, setGame] = useState<GameState>({ status: "idle" });

  function pickNumberHandler(userNumber: number) {
    setGame({ status: "playing", userNumber });
  }

  function gameOverHandler(guesses: number[]) {
    if (game.status !== "playing") {
      return;
    }
    setGame({ status: "over", userNumber: game.userNumber, guesses });
  }

  function startNewGameHandler() {
    setGame({ status: "idle" });
  }

  function renderScreen() {
    switch (game.status) {
      case "playing":
        return (
          <GameScreen
            userNumber={game.userNumber}
            onGameOver={gameOverHandler}
          />
        );
      case "over":
        return (
          <GameOverScreen
            userNumber={game.userNumber}
            guesses={game.guesses}
            onStartNewGame={startNewGameHandler}
          />
        );
      default:
        return <StartGameScreen onPickNumber={pickNumberHandler} />;
    }
  }

  return (
    <LinearGradient
      colors={[Colors.primary700, Colors.accent500]}
      style={styles.rootScreen}
    >
      <ImageBackground
        source={require("@/assets/images/guessing-game-background.png")}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.rootScreen}>{renderScreen()}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: BACKGROUND_IMAGE_OPACITY,
  },
});
