import { EdgeInsets } from "react-native-safe-area-context";

export type Palette = {
  50: string | undefined;
  100: string | undefined;
  200: string | undefined;
  300: string | undefined;
  400: string | undefined;
  500: string | undefined;
  600: string | undefined;
  700: string | undefined;
  800: string | undefined;
  900: string | undefined;
};

type FontSizes = {
  "2xs": number;
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  "2xl": number;
  "3xl": number;
  "4xl": number;
  "5xl": number;
  "6xl": number;
  "7xl": number;
  "8xl": number;
  "9xl": number;
};

type Spacing = {
  screenHorizontal: number;
  screenHorizontalModal: number;
  screenVertical: number;
  nativeHorizontalHeaderPadding: number;
  // standardMargin: number;
  lightMargin: number;
};

type Shapes = {
  sm: number;
  md: number;
  lg: number;
  xl: number;
};

type Colors = {
  primary: string;
  link: string;
  primaryLight: string;
  primaryDark: string;
  bgPrimary: string;
  bgSurface1: string;
  bgSubtitleWarning: string;
  bgSubtitleNegative: string;
  borderColorWarning: string;
  bgTertiary: string;
  info: string;
  bgSurface2: string;
  textGrey: string;
  textPrimary: string;
  textPrimaryInverse: string;
  textSecondary: string;
  textTertiary: string;
  textTertiaryInverse: string;
  textBrand2: string;
  containerBckGround: string;
  header: string;
  secondary: string;
  white: string;
  background: string;
  black: string;
  borderDefault: string;
  grayDefault: string;
  success: string;
  iconSecondary: string;
  error: string;
  gray: Palette;
  red: Palette;
  orange: string;
  button: {
    shaded: {
      "4": string;
    };
  };
  positive: string;
  negative: string;
  negativeDark: string;
  warning: string;
  obsidian: string;
  subtle: string;
  backgroundGradientFrom: string;
  backgroundGradientTo: string;
};

type FullInsets = EdgeInsets & {
  safeTop: number;
  safeBottom: number;
};

export type Theme = {
  colors: Colors;
  spacing: Spacing;
  shapes: Shapes;
  fontSizes: FontSizes;
  insets: FullInsets;
};
