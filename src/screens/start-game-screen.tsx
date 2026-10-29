import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { Card } from "@/components/ui/card";
import { InstructionText } from "@/components/ui/instruction-text";
import { PrimaryButton } from "@/components/ui/primary-button";
import { Title } from "@/components/ui/title";
import { Colors } from "@/constants/colors";
import { Fonts } from "@/constants/fonts";
import { MAX_NUMBER, MIN_NUMBER } from "@/constants/game";

type StartGameScreenProps = {
  onPickNumber: (pickedNumber: number) => void;
};

const INPUT_MAX_LENGTH = String(MAX_NUMBER).length;

function isValidNumber(value: number) {
  return Number.isInteger(value) && value >= MIN_NUMBER && value <= MAX_NUMBER;
}

export function StartGameScreen({ onPickNumber }: StartGameScreenProps) {
  const [enteredNumber, setEnteredNumber] = useState("");
  const [error, setError] = useState<string | null>(null);

  function numberInputHandler(enteredText: string) {
    setEnteredNumber(enteredText.replace(/[^0-9]/g, ""));
    setError(null);
  }

  function resetInputHandler() {
    setEnteredNumber("");
    setError(null);
  }

  function confirmInputHandler() {
    const chosenNumber = parseInt(enteredNumber, 10);

    if (!isValidNumber(chosenNumber)) {
      setError(`Please enter a number between ${MIN_NUMBER} and ${MAX_NUMBER}.`);
      return;
    }

    onPickNumber(chosenNumber);
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Title>Guess My Number</Title>
        <Card>
          <InstructionText>Enter a Number</InstructionText>
          <Text style={styles.hint}>
            Pick a number from {MIN_NUMBER} to {MAX_NUMBER} and let your phone
            guess it.
          </Text>
          <TextInput
            style={[styles.numberInput, error && styles.numberInputInvalid]}
            maxLength={INPUT_MAX_LENGTH}
            keyboardType="number-pad"
            returnKeyType="done"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={numberInputHandler}
            onSubmitEditing={confirmInputHandler}
            value={enteredNumber}
            accessibilityLabel="Your number"
          />
          {error && <Text style={styles.errorText}>{error}</Text>}
          <View style={styles.buttonsRow}>
            <PrimaryButton
              style={styles.button}
              variant="secondary"
              onPress={resetInputHandler}
            >
              Reset
            </PrimaryButton>
            <PrimaryButton style={styles.button} onPress={confirmInputHandler}>
              Confirm
            </PrimaryButton>
          </View>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 64,
    paddingBottom: 24,
  },
  hint: {
    marginTop: 8,
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.accent300,
    textAlign: "center",
  },
  numberInput: {
    width: 72,
    height: 56,
    marginTop: 16,
    marginBottom: 8,
    fontSize: 32,
    fontFamily: Fonts.bold,
    color: Colors.accent500,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    textAlign: "center",
  },
  numberInputInvalid: {
    borderBottomColor: Colors.error,
  },
  errorText: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.error,
    textAlign: "center",
  },
  buttonsRow: {
    flexDirection: "row",
    alignSelf: "stretch",
    marginTop: 16,
  },
  button: {
    flex: 1,
  },
});
