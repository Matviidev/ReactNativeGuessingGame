import { PropsWithChildren } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

import { Colors } from "@/constants/colors";
import { Fonts } from "@/constants/fonts";

type ButtonVariant = "primary" | "secondary";

type PrimaryButtonProps = PropsWithChildren<{
  onPress: () => void;
  variant?: ButtonVariant;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}>;

export function PrimaryButton({
  children,
  onPress,
  variant = "primary",
  accessibilityLabel,
  style,
}: PrimaryButtonProps) {
  const isSecondary = variant === "secondary";

  return (
    <View style={[styles.outerContainer, style]}>
      <Pressable
        style={({ pressed }) => [
          styles.innerContainer,
          isSecondary && styles.secondaryContainer,
          pressed && styles.pressed,
        ]}
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        android_ripple={{
          color: isSecondary ? Colors.overlay : Colors.primary600,
        }}
      >
        {typeof children === "string" ? (
          <Text style={styles.text}>{children}</Text>
        ) : (
          children
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: "hidden",
  },
  innerContainer: {
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary500,
    borderWidth: 1,
    borderColor: Colors.primary400,
    borderRadius: 28,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  secondaryContainer: {
    backgroundColor: "transparent",
    borderColor: Colors.accent500,
  },
  text: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: 16,
    textAlign: "center",
  },
  pressed: {
    opacity: 0.75,
  },
});
