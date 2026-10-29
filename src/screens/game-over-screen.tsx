import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import { PrimaryButton } from "@/components/ui/primary-button";
import { Title } from "@/components/ui/title";
import { Colors } from "@/constants/colors";
import { Fonts } from "@/constants/fonts";

type GameOverScreenProps = {
  userNumber: number;
  guesses: number[];
  onStartNewGame: () => void;
};

const MAX_IMAGE_SIZE = 300;
const IMAGE_WIDTH_RATIO = 0.7;

export function GameOverScreen({
  userNumber,
  guesses,
  onStartNewGame,
}: GameOverScreenProps) {
  const { width } = useWindowDimensions();
  const imageSize = Math.min(width * IMAGE_WIDTH_RATIO, MAX_IMAGE_SIZE);
  const roundsNumber = guesses.length;

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Title>Game Over!</Title>
      <View
        style={[
          styles.imageContainer,
          { width: imageSize, height: imageSize, borderRadius: imageSize / 2 },
        ]}
      >
        <Image
          style={styles.image}
          source={require("@/assets/images/guessing-game-success.png")}
        />
      </View>
      <Text style={styles.summaryText}>
        Your phone needed{" "}
        <Text style={styles.highlight}>{roundsNumber}</Text>{" "}
        {roundsNumber === 1 ? "round" : "rounds"} to guess the number{" "}
        <Text style={styles.highlight}>{userNumber}</Text>.
      </Text>
      <Text style={styles.guessesText}>{guesses.join("  →  ")}</Text>
      <PrimaryButton style={styles.button} onPress={onStartNewGame}>
        Start New Game
      </PrimaryButton>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: "hidden",
    marginVertical: 32,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  summaryText: {
    fontFamily: Fonts.regular,
    fontSize: 22,
    lineHeight: 32,
    color: Colors.primary900,
    textAlign: "center",
  },
  highlight: {
    fontFamily: Fonts.bold,
    color: Colors.primary500,
  },
  guessesText: {
    marginTop: 12,
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.primary700,
    textAlign: "center",
  },
  button: {
    marginTop: 32,
    minWidth: 220,
  },
});
