import { PropsWithChildren } from "react";
import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";

import { Colors } from "@/constants/colors";

type InstructionTextProps = PropsWithChildren<{
  style?: StyleProp<TextStyle>;
}>;

export function InstructionText({ children, style }: InstructionTextProps) {
  return <Text style={[styles.instructionText, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  instructionText: {
    fontFamily: "open-sans",
    color: Colors.accent500,
    fontSize: 24,
  },
});
