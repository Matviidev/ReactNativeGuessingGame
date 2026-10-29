import { StyleSheet, Text, View } from "react-native";

import { Colors } from "@/constants/colors";
import { Fonts } from "@/constants/fonts";

type GuessLogItemProps = {
  roundNumber: number;
  guess: number;
};

export function GuessLogItem({ roundNumber, guess }: GuessLogItemProps) {
  return (
    <View style={styles.listItem}>
      <Text style={styles.roundText}>#{roundNumber}</Text>
      <Text style={styles.itemText}>
        Opponent&apos;s guess: <Text style={styles.guessText}>{guess}</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 6,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.primary800,
    backgroundColor: Colors.accent500,
    elevation: 3,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  roundText: {
    fontFamily: Fonts.bold,
    color: Colors.primary700,
  },
  itemText: {
    fontFamily: Fonts.regular,
    color: Colors.primary800,
  },
  guessText: {
    fontFamily: Fonts.bold,
  },
});
