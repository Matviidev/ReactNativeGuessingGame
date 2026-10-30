import { Platform, ViewStyle } from "react-native";

type WebOnlyStyle = {
  transitionProperty?: string;
  transitionDuration?: string;
  transitionTimingFunction?: string;
  backdropFilter?: string;
  outlineStyle?: string;
  userSelect?: string;
};

export function webStyle(style: WebOnlyStyle): ViewStyle {
  return Platform.OS === "web" ? (style as ViewStyle) : {};
}
