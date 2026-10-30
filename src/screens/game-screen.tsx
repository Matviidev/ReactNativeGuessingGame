import { SymbolView } from "expo-symbols";
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import { GuessLogItem } from "@/components/game/guess-log-item";
import { NumberContainer } from "@/components/game/number-container";
import { RangeBar } from "@/components/game/range-bar";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { InstructionText } from "@/components/ui/instruction-text";
import { PrimaryButton } from "@/components/ui/primary-button";
import { Title } from "@/components/ui/title";
import { Colors } from "@/constants/colors";
import { Fonts } from "@/constants/fonts";
import { MAX_NUMBER, MIN_NUMBER } from "@/constants/game";
import { Radius, Spacing, WIDE_BREAKPOINT } from "@/constants/layout";
import { generateRandomBetween } from "@/utils/random";

type Direction = "lower" | "greater";

type Boundaries = {
  min: number;
  max: number;
};

type GameScreenProps = {
  userNumber: number;
  onGameOver: (guesses: number[]) => void;
};

const ICON_SIZE = 24;

export function GameScreen({ userNumber, onGameOver }: GameScreenProps) {
  const { width } = useWindowDimensions();
  const isWide = width >= WIDE_BREAKPOINT;
  const [guesses, setGuesses] = useState<number[]>(() => [
    generateRandomBetween(MIN_NUMBER, MAX_NUMBER, userNumber),
  ]);
  const [boundaries, setBoundaries] = useState<Boundaries>({
    min: MIN_NUMBER,
    max: MAX_NUMBER,
  });
  const [isLieWarningVisible, setIsLieWarningVisible] = useState(false);

  const currentGuess = guesses[guesses.length - 1];

  function nextGuessHandler(direction: Direction) {
    const isLie =
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "greater" && currentGuess > userNumber);

    if (isLie) {
      setIsLieWarningVisible(true);
      return;
    }

    setIsLieWarningVisible(false);

    const nextBoundaries =
      direction === "lower"
        ? { ...boundaries, max: currentGuess - 1 }
        : { ...boundaries, min: currentGuess + 1 };

    const nextGuess = generateRandomBetween(
      nextBoundaries.min,
      nextBoundaries.max,
    );
    const nextGuesses = [...guesses, nextGuess];

    if (nextGuess === userNumber) {
      onGameOver(nextGuesses);
      return;
    }

    setBoundaries(nextBoundaries);
    setGuesses(nextGuesses);
  }

  const reversedGuesses = [...guesses].reverse();

  return (
    <Container
      size={isWide ? "wide" : "narrow"}
      style={[styles.screen, isWide && styles.screenWide]}
    >
      <View style={[styles.gamePanel, isWide && styles.gamePanelWide]}>
        <Title eyebrow={`Round ${guesses.length}`}>Opponent&apos;s Guess</Title>
        <NumberContainer label="Is it">{currentGuess}</NumberContainer>
        <Card style={styles.card}>
          <InstructionText>Higher or lower?</InstructionText>
          <RangeBar
            min={MIN_NUMBER}
            max={MAX_NUMBER}
            lowerBound={boundaries.min}
            upperBound={boundaries.max}
          />
          <View style={styles.buttonsRow}>
            <PrimaryButton
              style={styles.button}
              variant="secondary"
              onPress={() => nextGuessHandler("lower")}
              accessibilityLabel="Lower"
            >
              <SymbolView
                name={{ ios: "minus", android: "remove", web: "remove" }}
                size={ICON_SIZE}
                tintColor={Colors.white}
              />
            </PrimaryButton>
            <PrimaryButton
              style={styles.button}
              onPress={() => nextGuessHandler("greater")}
              accessibilityLabel="Higher"
            >
              <SymbolView
                name={{ ios: "plus", android: "add", web: "add" }}
                size={ICON_SIZE}
                tintColor={Colors.white}
              />
            </PrimaryButton>
          </View>
          {isLieWarningVisible && (
            <Text style={styles.warningText} accessibilityRole="alert">
              Don&apos;t lie! You know that this is wrong...
            </Text>
          )}
        </Card>
      </View>
      <View style={isWide ? styles.logPanelWide : styles.logPanel}>
        <View style={styles.logHeader}>
          <Text style={styles.logTitle}>Guess log</Text>
          <Text style={styles.logCount}>{guesses.length}</Text>
        </View>
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.listContent}
          data={reversedGuesses}
          keyExtractor={(guess) => guess.toString()}
          renderItem={({ item, index }) => (
            <GuessLogItem
              roundNumber={guesses.length - index}
              guess={item}
              isLatest={index === 0}
            />
          )}
        />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: Spacing.xxl,
    gap: Spacing.xxl,
  },
  screenWide: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: Spacing.xxxl,
  },
  gamePanel: {
    gap: Spacing.xl,
  },
  gamePanelWide: {
    flex: 1,
    alignSelf: "center",
  },
  card: {
    gap: Spacing.xl,
  },
  buttonsRow: {
    flexDirection: "row",
    gap: Spacing.md,
  },
  button: {
    flex: 1,
  },
  warningText: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.sm,
    backgroundColor: Colors.errorSoft,
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: Colors.error,
    textAlign: "center",
  },
  logPanel: {
    flex: 1,
  },
  logPanelWide: {
    width: 360,
    alignSelf: "stretch",
    padding: Spacing.xl,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  logHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Spacing.md,
  },
  logTitle: {
    fontFamily: Fonts.bold,
    fontSize: 13,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    color: Colors.textMuted,
  },
  logCount: {
    minWidth: 28,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: Radius.pill,
    backgroundColor: Colors.surfaceStrong,
    fontFamily: Fonts.bold,
    fontSize: 12,
    color: Colors.text,
    textAlign: "center",
    overflow: "hidden",
  },
  list: {
    flex: 1,
  },
  listContent: {
    gap: Spacing.sm,
    paddingBottom: Spacing.xl,
  },
});
