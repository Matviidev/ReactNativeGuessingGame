import { StyleSheet, Text, View } from "react-native";

import { Colors } from "@/constants/colors";
import { Fonts } from "@/constants/fonts";
import { Radius, Spacing } from "@/constants/layout";

type GuessLogItemProps = {
  roundNumber: number;
  guess: number;
  isLatest?: boolean;
};

export function GuessLogItem({
  roundNumber,
  guess,
  isLatest = false,
}: GuessLogItemProps) {
  return (
    <View style={[styles.listItem, isLatest && styles.latestItem]}>
      <View style={styles.roundBadge}>
        <Text style={styles.roundText}>#{roundNumber}</Text>
      </View>
      <Text style={styles.itemText}>Opponent&apos;s guess</Text>
      <Text style={[styles.guessText, isLatest && styles.latestGuessText]}>
        {guess}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  latestItem: {
    borderColor: Colors.accentBorder,
    backgroundColor: Colors.accentSoft,
  },
  roundBadge: {
    minWidth: 40,
    alignItems: "center",
    paddingVertical: 2,
    paddingHorizontal: Spacing.sm,
    borderRadius: Radius.pill,
    backgroundColor: Colors.surfaceStrong,
  },
  roundText: {
    fontFamily: Fonts.bold,
    fontSize: 12,
    color: Colors.textMuted,
    fontVariant: ["tabular-nums"],
  },
  itemText: {
    flex: 1,
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.textMuted,
  },
  guessText: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: Colors.text,
    fontVariant: ["tabular-nums"],
  },
  latestGuessText: {
    color: Colors.accent,
  },
});
