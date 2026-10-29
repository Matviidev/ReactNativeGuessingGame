import { SymbolView } from "expo-symbols";
import { useState } from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";

import { GuessLogItem } from "@/components/game/guess-log-item";
import { NumberContainer } from "@/components/game/number-container";
import { Card } from "@/components/ui/card";
import { InstructionText } from "@/components/ui/instruction-text";
import { PrimaryButton } from "@/components/ui/primary-button";
import { Title } from "@/components/ui/title";
import { Colors } from "@/constants/colors";
import { Fonts } from "@/constants/fonts";
import { MAX_NUMBER, MIN_NUMBER } from "@/constants/game";
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
  const [guesses, setGuesses] = useState<number[]>(() => [
    generateRandomBetween(MIN_NUMBER, MAX_NUMBER, userNumber),
  ]);
  const [boundaries, setBoundaries] = useState<Boundaries>({
    min: MIN_NUMBER,
    max: MAX_NUMBER,
  });

  const currentGuess = guesses[guesses.length - 1];

  function nextGuessHandler(direction: Direction) {
    const isLie =
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "greater" && currentGuess > userNumber);

    if (isLie) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }

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
    <View style={styles.screen}>
      <Title>Opponent&apos;s Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText>Higher or lower?</InstructionText>
        <Text style={styles.rangeText}>
          Searching between {boundaries.min} and {boundaries.max}
        </Text>
        <View style={styles.buttonsRow}>
          <PrimaryButton
            style={styles.button}
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
      </Card>
      <Text style={styles.logTitle}>Guess log</Text>
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContent}
        data={reversedGuesses}
        keyExtractor={(guess) => guess.toString()}
        renderItem={({ item, index }) => (
          <GuessLogItem roundNumber={guesses.length - index} guess={item} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  rangeText: {
    marginTop: 4,
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.accent300,
  },
  buttonsRow: {
    flexDirection: "row",
    alignSelf: "stretch",
    marginTop: 16,
  },
  button: {
    flex: 1,
  },
  logTitle: {
    marginTop: 24,
    marginBottom: 4,
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: Colors.white,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 24,
  },
});
