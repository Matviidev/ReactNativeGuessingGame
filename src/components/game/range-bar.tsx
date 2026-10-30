import { StyleSheet, Text, View } from "react-native";

import { Colors } from "@/constants/colors";
import { Fonts } from "@/constants/fonts";
import { Radius, Spacing } from "@/constants/layout";
import { webStyle } from "@/utils/web-style";

type RangeBarProps = {
  min: number;
  max: number;
  lowerBound: number;
  upperBound: number;
};

export function RangeBar({ min, max, lowerBound, upperBound }: RangeBarProps) {
  const span = max - min + 1;
  const left = ((lowerBound - min) / span) * 100;
  const width = ((upperBound - lowerBound + 1) / span) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.labels}>
        <Text style={styles.labelText}>Search range</Text>
        <Text style={styles.valueText}>
          {lowerBound} – {upperBound}
        </Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { left: `${left}%`, width: `${width}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
    gap: Spacing.sm,
  },
  labels: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  labelText: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: Colors.textMuted,
  },
  valueText: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: Colors.text,
    fontVariant: ["tabular-nums"],
  },
  track: {
    height: 8,
    borderRadius: Radius.pill,
    backgroundColor: Colors.surfaceStrong,
    overflow: "hidden",
  },
  fill: {
    position: "absolute",
    top: 0,
    bottom: 0,
    borderRadius: Radius.pill,
    backgroundColor: Colors.accent,
    ...webStyle({
      transitionProperty: "left, width",
      transitionDuration: "300ms",
      transitionTimingFunction: "ease-out",
    }),
  },
});
