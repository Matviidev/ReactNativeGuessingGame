import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { PrimaryButton } from "@/components/ui/primary-button";
import { Title } from "@/components/ui/title";
import { Colors } from "@/constants/colors";
import { Fonts } from "@/constants/fonts";
import { Radius, Spacing } from "@/constants/layout";

type GameOverScreenProps = {
  userNumber: number;
  guesses: number[];
  onStartNewGame: () => void;
};

const MAX_IMAGE_SIZE = 240;
const IMAGE_WIDTH_RATIO = 0.6;

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
      <Container style={styles.container}>
        <View
          style={[
            styles.imageContainer,
            {
              width: imageSize,
              height: imageSize,
              borderRadius: imageSize / 2,
            },
          ]}
        >
          <Image
            style={styles.image}
            source={require("@/assets/images/guessing-game-success.png")}
          />
        </View>
        <Title eyebrow="Game over">Got it!</Title>
        <Card style={styles.card}>
          <Text style={styles.summaryText}>
            Your phone needed{" "}
            <Text style={styles.highlight}>{roundsNumber}</Text>{" "}
            {roundsNumber === 1 ? "round" : "rounds"} to guess the number{" "}
            <Text style={styles.highlight}>{userNumber}</Text>.
          </Text>
          <View style={styles.guesses}>
            {guesses.map((guess, index) => (
              <Text
                key={guess}
                style={[
                  styles.guessChip,
                  index === guesses.length - 1 && styles.finalGuessChip,
                ]}
              >
                {guess}
              </Text>
            ))}
          </View>
          <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
        </Card>
      </Container>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: Spacing.xxxl,
  },
  container: {
    alignItems: "center",
    gap: Spacing.xl,
  },
  imageContainer: {
    borderWidth: 3,
    borderColor: Colors.accent,
    overflow: "hidden",
    boxShadow: `0 0 0 8px ${Colors.accentSoft}, 0 24px 80px -16px ${Colors.accentGlow}`,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  card: {
    gap: Spacing.xl,
  },
  summaryText: {
    fontFamily: Fonts.regular,
    fontSize: 18,
    lineHeight: 28,
    color: Colors.textMuted,
    textAlign: "center",
  },
  highlight: {
    fontFamily: Fonts.bold,
    color: Colors.accent,
  },
  guesses: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: Spacing.sm,
  },
  guessChip: {
    minWidth: 40,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.pill,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: Colors.textMuted,
    textAlign: "center",
    overflow: "hidden",
    fontVariant: ["tabular-nums"],
  },
  finalGuessChip: {
    borderColor: Colors.accentBorder,
    backgroundColor: Colors.accentSoft,
    color: Colors.accent,
  },
});
