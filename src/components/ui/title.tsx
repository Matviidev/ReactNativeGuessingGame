import { PropsWithChildren } from "react";
import { StyleSheet, Text, View } from "react-native";

import { Colors } from "@/constants/colors";
import { Fonts } from "@/constants/fonts";
import { Spacing } from "@/constants/layout";

type TitleProps = PropsWithChildren<{
  eyebrow?: string;
  subtitle?: string;
}>;

export function Title({ children, eyebrow, subtitle }: TitleProps) {
  return (
    <View style={styles.container}>
      {eyebrow && <Text style={styles.eyebrow}>{eyebrow}</Text>}
      <Text style={styles.title} accessibilityRole="header">
        {children}
      </Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: Spacing.sm,
  },
  eyebrow: {
    fontFamily: Fonts.bold,
    fontSize: 12,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: Colors.accent,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 36,
    lineHeight: 44,
    letterSpacing: -0.5,
    color: Colors.text,
    textAlign: "center",
  },
  subtitle: {
    maxWidth: 380,
    fontFamily: Fonts.regular,
    fontSize: 16,
    lineHeight: 24,
    color: Colors.textMuted,
    textAlign: "center",
  },
});
