import { PropsWithChildren } from "react";
import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";

import { Colors } from "@/constants/colors";
import { Fonts } from "@/constants/fonts";

type InstructionTextProps = PropsWithChildren<{
  style?: StyleProp<TextStyle>;
}>;

export function InstructionText({ children, style }: InstructionTextProps) {
  return <Text style={[styles.instructionText, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  instructionText: {
    fontFamily: Fonts.bold,
    fontSize: 20,
    lineHeight: 28,
    color: Colors.text,
    textAlign: "center",
  },
});
