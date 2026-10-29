import { PropsWithChildren } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import { Colors } from "@/constants/colors";

type CardProps = PropsWithChildren<{
  style?: StyleProp<ViewStyle>;
}>;

export function Card({ children, style }: CardProps) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 32,
    padding: 20,
    backgroundColor: Colors.primary800,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.primary600,
    elevation: 6,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    shadowOpacity: 0.3,
  },
});
