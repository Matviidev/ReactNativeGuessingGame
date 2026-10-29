import { PropsWithChildren } from "react";
import { StyleSheet, Text, View } from "react-native";

import { Colors } from "@/constants/colors";
import { Fonts } from "@/constants/fonts";

export function NumberContainer({ children }: PropsWithChildren) {
  return (
    <View style={styles.container}>
      <Text style={styles.numberText}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    minWidth: 160,
    borderWidth: 4,
    borderColor: Colors.accent500,
    backgroundColor: Colors.primary900,
    paddingVertical: 20,
    paddingHorizontal: 32,
    marginTop: 24,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  numberText: {
    color: Colors.accent500,
    fontSize: 48,
    fontFamily: Fonts.bold,
  },
});
