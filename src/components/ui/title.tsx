import { PropsWithChildren } from "react";
import { StyleSheet, Text } from "react-native";

import { Colors } from "@/constants/colors";
import { Fonts } from "@/constants/fonts";

export function Title({ children }: PropsWithChildren) {
  return (
    <Text style={styles.title} accessibilityRole="header">
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  title: {
    alignSelf: "center",
    maxWidth: "90%",
    fontFamily: Fonts.bold,
    fontSize: 26,
    letterSpacing: 0.5,
    color: Colors.white,
    textAlign: "center",
    borderWidth: 2,
    borderColor: Colors.white,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
