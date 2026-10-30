import { PropsWithChildren } from "react";
import { StyleSheet, Text, View } from "react-native";

import { Colors } from "@/constants/colors";
import { Fonts } from "@/constants/fonts";
import { Radius, Spacing } from "@/constants/layout";

type NumberContainerProps = PropsWithChildren<{
  label?: string;
}>;

export function NumberContainer({ children, label }: NumberContainerProps) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Text style={styles.numberText}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    minWidth: 200,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.xxxl,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.accentBorder,
    backgroundColor: Colors.accentSoft,
    boxShadow: `0 0 80px -10px ${Colors.accentGlow}`,
  },
  label: {
    fontFamily: Fonts.bold,
    fontSize: 12,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: Colors.textMuted,
  },
  numberText: {
    fontFamily: Fonts.bold,
    fontSize: 80,
    lineHeight: 96,
    letterSpacing: -2,
    color: Colors.accent,
    fontVariant: ["tabular-nums"],
  },
});
