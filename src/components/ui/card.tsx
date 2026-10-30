import { PropsWithChildren } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import { Colors } from "@/constants/colors";
import { Radius, Spacing } from "@/constants/layout";
import { webStyle } from "@/utils/web-style";

type CardProps = PropsWithChildren<{
  style?: StyleProp<ViewStyle>;
}>;

export function Card({ children, style }: CardProps) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    alignSelf: "stretch",
    padding: Spacing.xl,
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    boxShadow: `0 24px 60px -24px ${Colors.shadow}`,
    ...webStyle({ backdropFilter: "blur(18px)" }),
  },
});
