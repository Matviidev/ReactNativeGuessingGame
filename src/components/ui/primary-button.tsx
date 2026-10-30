import { PropsWithChildren, useState } from "react";
import {
  Platform,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

import { Colors } from "@/constants/colors";
import { Fonts } from "@/constants/fonts";
import { Radius, Spacing } from "@/constants/layout";
import { webStyle } from "@/utils/web-style";

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
  const [hovered, setHovered] = useState(false);
  const isSecondary = variant === "secondary";

  return (
    <View
      style={[
        styles.outerContainer,
        Platform.OS === "android" && styles.clipped,
        !isSecondary && styles.primaryShadow,
        style,
      ]}
    >
      <Pressable
        style={({ pressed }) => [
          styles.innerContainer,
          isSecondary ? styles.secondaryContainer : styles.primaryContainer,
          hovered &&
            (isSecondary ? styles.secondaryHovered : styles.primaryHovered),
          pressed &&
            (isSecondary ? styles.secondaryPressed : styles.primaryPressed),
          pressed && styles.pressed,
        ]}
        onPress={onPress}
        onHoverIn={() => setHovered(true)}
        onHoverOut={() => setHovered(false)}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        android_ripple={{
          color: isSecondary ? Colors.surfacePressed : Colors.primaryPressed,
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
    borderRadius: Radius.md,
  },
  clipped: {
    overflow: "hidden",
  },
  primaryShadow: {
    boxShadow: `0 12px 28px -12px ${Colors.primaryGlow}`,
  },
  innerContainer: {
    minHeight: 52,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: Radius.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    cursor: "pointer",
    ...webStyle({
      transitionProperty: "background-color, border-color, transform",
      transitionDuration: "150ms",
      transitionTimingFunction: "ease-out",
      userSelect: "none",
    }),
  },
  primaryContainer: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primaryHover,
  },
  primaryHovered: {
    backgroundColor: Colors.primaryHover,
  },
  primaryPressed: {
    backgroundColor: Colors.primaryPressed,
  },
  secondaryContainer: {
    backgroundColor: Colors.surface,
    borderColor: Colors.borderStrong,
  },
  secondaryHovered: {
    backgroundColor: Colors.surfaceHover,
  },
  secondaryPressed: {
    backgroundColor: Colors.surfacePressed,
  },
  pressed: {
    transform: [{ scale: 0.98 }],
  },
  text: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: 16,
    letterSpacing: 0.2,
    textAlign: "center",
  },
});
