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
import { Container } from "@/components/ui/container";
import { InstructionText } from "@/components/ui/instruction-text";
import { PrimaryButton } from "@/components/ui/primary-button";
import { Title } from "@/components/ui/title";
import { Colors } from "@/constants/colors";
import { Fonts } from "@/constants/fonts";
import { MAX_NUMBER, MIN_NUMBER } from "@/constants/game";
import { Radius, Spacing } from "@/constants/layout";
import { webStyle } from "@/utils/web-style";

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
  const [isFocused, setIsFocused] = useState(false);

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
      setError(
        `Please enter a number between ${MIN_NUMBER} and ${MAX_NUMBER}.`,
      );
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
        <Container style={styles.container}>
          <Title
            eyebrow="Number game"
            subtitle={`Think of a number from ${MIN_NUMBER} to ${MAX_NUMBER}, then give hints while your phone tries to guess it.`}
          >
            Guess My Number
          </Title>
          <Card style={styles.card}>
            <InstructionText>Enter your number</InstructionText>
            <TextInput
              style={[
                styles.numberInput,
                isFocused && styles.numberInputFocused,
                error && styles.numberInputInvalid,
              ]}
              maxLength={INPUT_MAX_LENGTH}
              keyboardType="number-pad"
              returnKeyType="done"
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="00"
              placeholderTextColor={Colors.textSubtle}
              onChangeText={numberInputHandler}
              onSubmitEditing={confirmInputHandler}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              value={enteredNumber}
              accessibilityLabel="Your number"
            />
            <Text style={[styles.helperText, error && styles.errorText]}>
              {error ?? "Your number stays secret, only your hints are shared."}
            </Text>
            <View style={styles.buttonsRow}>
              <PrimaryButton
                style={styles.button}
                variant="secondary"
                onPress={resetInputHandler}
              >
                Reset
              </PrimaryButton>
              <PrimaryButton
                style={styles.button}
                onPress={confirmInputHandler}
              >
                Confirm
              </PrimaryButton>
            </View>
          </Card>
        </Container>
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
    justifyContent: "center",
    paddingVertical: Spacing.xxxl,
  },
  container: {
    gap: Spacing.xxl,
  },
  card: {
    alignItems: "center",
    gap: Spacing.lg,
  },
  numberInput: {
    width: 140,
    height: 88,
    fontSize: 48,
    fontFamily: Fonts.bold,
    color: Colors.accent,
    textAlign: "center",
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.borderStrong,
    backgroundColor: Colors.surface,
    ...webStyle({
      outlineStyle: "none",
      transitionProperty: "border-color, box-shadow",
      transitionDuration: "150ms",
    }),
  },
  numberInputFocused: {
    borderColor: Colors.accent,
    boxShadow: `0 0 0 4px ${Colors.accentSoft}`,
  },
  numberInputInvalid: {
    borderColor: Colors.error,
    boxShadow: `0 0 0 4px ${Colors.errorSoft}`,
  },
  helperText: {
    minHeight: 20,
    fontFamily: Fonts.regular,
    fontSize: 14,
    lineHeight: 20,
    color: Colors.textSubtle,
    textAlign: "center",
  },
  errorText: {
    color: Colors.error,
  },
  buttonsRow: {
    flexDirection: "row",
    alignSelf: "stretch",
    gap: Spacing.md,
  },
  button: {
    flex: 1,
  },
});
