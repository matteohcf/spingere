import { DimensionValue } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import { OdinDimensionsValue, StyleProps, Theme } from '../types';
import { StyleProp, ViewProps, ViewStyle } from 'react-native';
import { colors, lightTheme, SHADOW } from '../constant';

export const useStyleProps = (
  styleProps: StyleProps,
): {
  marginTop?: OdinDimensionsValue;
  marginBottom?: OdinDimensionsValue;
  marginLeft?: OdinDimensionsValue;
  marginRight?: OdinDimensionsValue;
  marginVertical?: OdinDimensionsValue;
  marginHorizontal?: OdinDimensionsValue;
  margin?: OdinDimensionsValue;
  paddingTop?: OdinDimensionsValue;
  paddingBottom?: OdinDimensionsValue;
  paddingLeft?: OdinDimensionsValue;
  paddingRight?: OdinDimensionsValue;
  paddingVertical?: OdinDimensionsValue;
  paddingHorizontal?: OdinDimensionsValue;
  padding?: OdinDimensionsValue;
  width?: OdinDimensionsValue;
  height?: OdinDimensionsValue;
  minHeight?: OdinDimensionsValue;
  minWidth?: OdinDimensionsValue;
  maxWidth?: OdinDimensionsValue;
  maxHeight?: OdinDimensionsValue;
  borderRadius?: number;
  backgroundColor?: Theme['colors'][keyof Theme['colors']];
  shadow?: StyleProp<ViewStyle>;
} => {
  const { m, br, mt, mb, ml, mr, mv, mh, p, pt, pb, pl, pr, ph, pv, w, h, minH, minW, maxW, maxH, bgColor, shadow } = styleProps;
  let style = {
    marginTop: lightTheme.spacing[mt] || mt,
    marginBottom: lightTheme.spacing[mb] || mb,
    marginLeft: lightTheme.spacing[ml] || ml,
    marginRight: lightTheme.spacing[mr] || mr,
    marginVertical: lightTheme.spacing[mv] || mv,
    marginHorizontal: lightTheme.spacing[mh] || mh,
    margin: lightTheme.spacing[m] || m,
    paddingTop: lightTheme.spacing[pt] || pt,
    paddingBottom: lightTheme.spacing[pb] || pb,
    paddingLeft: lightTheme.spacing[pl] || pl,
    paddingRight: lightTheme.spacing[pr] || pr,
    paddingVertical: lightTheme.spacing[pv] || pv,
    paddingHorizontal: lightTheme.spacing[ph] || ph,
    padding: lightTheme.spacing[p] || p,
    width: lightTheme.spacing[w] || w,
    height: lightTheme.spacing[h] || h,
    minHeight: minH,
    minWidth: minW,
    maxWidth: maxW,
    maxHeight: maxH,
    borderRadius: lightTheme.shapes[br] || br,
    backgroundColor: colors[bgColor] || bgColor,
  };
  if (shadow) {
    style = {
      ...style,
      ...SHADOW.MEDIUM,
    };
  }
  return style;
};
