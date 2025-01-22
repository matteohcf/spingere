import { Palette, Theme } from "../types";

const gray: Palette = {
  50: "#F9FAFB",
  100: "#F3F5F7",
  200: "#E0E6EB",
  300: "#CBD5DC",
  400: "#91A6B6",
  500: "#5C778A",
  600: "#415462",
  700: "#33424D",
  800: "#1F282E",
  900: "#12181C",
};

const red: Palette = {
  50: "#FEF2F2",
  100: "#FEE2E2",
  200: "#FECACA",
  300: "#FCA5A5",
  400: "#F87171",
  500: "#EF4444",
  600: "#DC2626",
  700: "#B91C1C",
  800: "#991B1B",
  900: "#7F1D1D",
};

export const lightTheme: Omit<Theme, "insets"> = {
  spacing: {
    screenHorizontal: 16,
    screenHorizontalModal: 8,
    screenVertical: 18,
    nativeHorizontalHeaderPadding: 16,
    lightMargin: 8,
  },
  shapes: {
    sm: 6,
    md: 12,
    lg: 24,
    xl: 32,
  },
  fontSizes: {
    "2xs": 10,
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    "2xl": 24,
    "3xl": 30,
    "4xl": 36,
    "5xl": 48,
    "6xl": 60,
    "7xl": 72,
    "8xl": 96,
    "9xl": 128,
  },
  colors: {
    primary: "#2B5AFF",
    link: "#00D6DC",
    header: "#C80D0D",
    containerBckGround: "#FAFBFC",
    primaryLight: "#0070C0",
    primaryDark: "#052111",
    textPrimary: "#172126E5",
    textPrimaryInverse: "#03120D",
    textSecondary: "#17212680",
    textTertiary: "rgba(115,115,115,0.51)",
    textTertiaryInverse: "rgba(3, 18, 13, 0.60)",
    textBrand2: "#E879F9",
    white: "white",
    black: "black",
    info: "#38BDF8",
    textGrey: "rgb(155,160,158)",
    bgPrimary: "#ffffff",
    bgSurface1: "#e4e4e4",
    bgSurface2: "#f3f5f7",
    bgSubtitleWarning: "#422006",
    bgSubtitleNegative: "#450A0A",
    borderDefault: "#1721261A",
    borderColorWarning: "#FACC15",
    bgTertiary: "rgba(49,76,152,0.15)",
    secondary: "#17212680",
    error: "#EF4444",
    orange: "#FFA500",
    darkViolet: "rgba(39, 33, 72, 1)",
    lightViolet: "rgba(39, 33, 72, 0.05)",
    green: "rgba(32, 216, 106, 1)",
    grey: "rgba(244, 244, 246, 1)",
    greyDark: "rgb(218,218,218)",
    backgroundError: "rgba(255, 227, 231, 1)",
    blue: "#1E99FC",
    obsidian: '#3E494E',
    subtle: 'rgba(234,239,234,0.82)',

    positive: "#A3E635",
    negative: "#F87171",
    negativeDark: "#b65353",
    warning: "#dfc250",

    backgroundGradientFrom: "#b9e0ff",
    backgroundGradientTo: "#1144fb",
  },
  palettes: {
    gray,
    red,
  },
  fonts: {
    main: {
      regular: "Poppins-Regular",
      medium: "Poppins-Medium",
      bold: "Poppins-Bold",
      black: "Poppins-Black",
    },
  },
};

export const darkTheme = {
  ...lightTheme,
};

export const { shapes, spacing, colors } = lightTheme;

export const styles = {
  flex: { flex: 1 },
};

export const SHADOW = {
  SMALL: {
    shadowColor: "#272148",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  MEDIUM: {
    shadowColor: "#2d2847",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.13,
    shadowRadius: 2,
    elevation: 1,
  },
  HEAVY: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,

    elevation: 18,
  },
};

export const cardStyle = {
  backgroundColor: colors.white,
  borderRadius: 10,
  paddingHorizontal: 20,
  ...SHADOW.MEDIUM,
};

export const listStyle = {
  paddingHorizontal: spacing.screenHorizontal,
};
