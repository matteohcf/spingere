import { StyleSheet, Text as RNText, TextProps } from 'react-native';
import { useStylesheet } from '../../hooks/useStylesheet';
import { StyleProps, Theme } from '../../types';
import { useStyleProps } from '../../hooks/useStyleProps';
import { colors } from '../../constant';

type Props = TextProps &
  StyleProps & {
    color?: string | keyof Theme['colors'];
    fontSize?: number;
    fontWeight?: '400' | '500' | '600' | '700' | '800';
    variant?: FontVariants;
    textDecorationLine?: 'none' | 'underline' | 'line-through' | 'underline line-through' | undefined;
    letterSpacing?: number;
    lineHeight?: number;
    center?: boolean;
  };

export const Text = ({
  color = colors.textPrimary,
  fontSize = 12,
  textDecorationLine,
  fontWeight = '400',
  letterSpacing,
  style,
  variant,
  center,
  lineHeight,
  ...rest
}: Props) => {
  const styles = useStylesheet(createStyles);
  const textStyle = variant ? variantStyles[variant] : {};
  const styleProps = useStyleProps(rest);

  // @ts-ignore
  return (
    <RNText
      {...styleProps}
      style={[
        {
          fontSize,
          textDecorationLine,
        },
        { fontFamily: FONTS[fontWeight] },
        color && { color: colors[color] || color },
        letterSpacing && { letterSpacing },
        center && { textAlign: 'center' },
        lineHeight && { lineHeight },
        textStyle,
        style,
      ]}
      {...rest}
    />
  );
};

const createStyles = ({ colors }: Theme) =>
  StyleSheet.create({
    labelSmallSemiBold: {
      fontSize: 14,
      fontWeight: '700',
      color: colors.textTertiary,
      marginBottom: 4,
    },
  });

export const FONTS = {
  400: 'Montserrat-Regular',
  500: 'Montserrat-Medium',
  600: 'Montserrat-SemiBold',
  700: 'Montserrat-Bold',
  800: 'Montserrat-ExtraBold',
};

const fontFamily = 'Plus Jakarta Sans';

type FontVariants =
  | 'Heading/Large/Medium'
  | 'Heading/Small/Medium'
  | 'Heading/Small/SemiBold'
  | 'Paragraph/Large/SemiBold'
  | 'Paragraph/Medium/Regular'
  | 'Paragraph/Small/Regular'
  | 'Paragraph/X Small/Regular'
  | 'Label/Large/Medium'
  | 'Label/Large/SemiBold'
  | 'Label/Medium/Medium'
  | 'Label/Medium/SemiBold'
  | 'Label/Small/Medium'
  | 'Label/Small/SemiBold'
  | 'Label/X Small/Medium'
  | 'Label/X Small/SemiBold'
  | 'Link/Small/SemiBold';

const fontWeights = {
  medium: FONTS[400],
  regular: FONTS[400],
  semibold: FONTS[600],
};

const fontSizes = {
  fs32: 32,
  fs28: 28,
  fs24: 24,
  fs20: 20,
  fs18: 18,
  fs16: 16,
  fs14: 14,
  fs12: 12,
};

const lineHeights = {
  lh40: 40,
  lh36: 36,
  lh32: 32,
  lh28: 28,
  lh24: 24,
  lh16: 16,
};

// Può includere altre proprietà comuni
const baseStyles = {
  fontFamily,
};

const variantStyles = {
  // Headings
  'Heading/Small/Medium': {
    ...baseStyles,
    fontSize: fontSizes.fs24,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.lh32,
  },
  'Heading/Small/SemiBold': {
    ...baseStyles,
    fontSize: fontSizes.fs24,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.lh32,
  },

  // Paragraphs
  'Paragraph/Large/SemiBold': {
    ...baseStyles,
    fontSize: fontSizes.fs18,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.lh28,
  },
  'Paragraph/Medium/Regular': {
    ...baseStyles,
    fontSize: fontSizes.fs16,
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.lh24,
  },
  'Paragraph/Small/Regular': {
    ...baseStyles,
    fontSize: fontSizes.fs14,
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.lh24,
  },
  'Paragraph/X Small/Regular': {
    ...baseStyles,
    fontSize: fontSizes.fs12,
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.lh16,
  },

  // Labels
  'Label/Large/Medium': {
    ...baseStyles,
    fontSize: fontSizes.fs18,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.lh28,
  },
  'Label/Large/SemiBold': {
    ...baseStyles,
    fontSize: fontSizes.fs18,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.lh28,
  },
  'Label/Medium/Medium': {
    ...baseStyles,
    fontSize: fontSizes.fs16,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.lh24,
  },
  'Label/Medium/SemiBold': {
    ...baseStyles,
    fontSize: fontSizes.fs16,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.lh24,
  },
  'Label/Small/Medium': {
    ...baseStyles,
    fontSize: fontSizes.fs14,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.lh24,
  },
  'Label/Small/SemiBold': {
    ...baseStyles,
    fontSize: fontSizes.fs14,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.lh24,
  },
  'Label/X Small/Medium': {
    ...baseStyles,
    fontSize: fontSizes.fs12,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.lh16,
  },
  'Label/X Small/SemiBold': {
    ...baseStyles,
    fontSize: fontSizes.fs12,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.lh16,
  },

  // Link
  'Link/Small/SemiBold': {
    ...baseStyles,
    fontSize: fontSizes.fs14,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.lh24,
  },
};
