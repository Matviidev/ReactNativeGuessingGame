import { PropsWithChildren } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import { ContentWidth, Spacing } from "@/constants/layout";

type ContainerProps = PropsWithChildren<{
  size?: keyof typeof ContentWidth;
  style?: StyleProp<ViewStyle>;
}>;

export function Container({
  children,
  size = "narrow",
  style,
}: ContainerProps) {
  return (
    <View style={[styles.container, { maxWidth: ContentWidth[size] }, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignSelf: "center",
    paddingHorizontal: Spacing.xl,
  },
});
