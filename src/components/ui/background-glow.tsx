import { Platform, StyleSheet, View } from "react-native";

import { Colors } from "@/constants/colors";

const GLOW_SIZE = 560;

export function BackgroundGlow() {
  if (Platform.OS !== "web") {
    return null;
  }

  return (
    <View style={styles.container} pointerEvents="none">
      <View style={[styles.glow, styles.primaryGlow]} />
      <View style={[styles.glow, styles.accentGlow]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    overflow: "hidden",
  },
  glow: {
    position: "absolute",
    width: GLOW_SIZE,
    height: GLOW_SIZE,
    borderRadius: GLOW_SIZE / 2,
    filter: "blur(120px)",
  },
  primaryGlow: {
    top: -GLOW_SIZE / 3,
    left: -GLOW_SIZE / 4,
    backgroundColor: Colors.primaryGlow,
  },
  accentGlow: {
    bottom: -GLOW_SIZE / 2,
    right: -GLOW_SIZE / 4,
    backgroundColor: Colors.accentGlow,
  },
});
