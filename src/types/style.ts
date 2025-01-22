import { DimensionValue, FlexStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import { Theme } from './theme';

export type OdinDimensionsValue = DimensionValue | keyof Theme['spacing'] | keyof Theme['shapes'];

export type StyleProps = {
  m?: OdinDimensionsValue;
  mt?: OdinDimensionsValue;
  mb?: OdinDimensionsValue;
  ml?: OdinDimensionsValue;
  mr?: OdinDimensionsValue;
  mh?: OdinDimensionsValue;
  mv?: OdinDimensionsValue;
  p?: OdinDimensionsValue;
  pt?: OdinDimensionsValue;
  pb?: OdinDimensionsValue;
  pl?: OdinDimensionsValue;
  pr?: OdinDimensionsValue;
  ph?: OdinDimensionsValue;
  pv?: OdinDimensionsValue;
  w?: OdinDimensionsValue;
  h?: OdinDimensionsValue;
  minW?: OdinDimensionsValue;
  minH?: OdinDimensionsValue;
  maxW?: OdinDimensionsValue;
  maxH?: OdinDimensionsValue;
  br?: OdinDimensionsValue;
  bgColor?: keyof Theme['colors'] | string;
  shadow?: boolean;
};

export type FlexProps = {
  alignContent?: FlexStyle['alignContent'];
  justifyContent?: FlexStyle['justifyContent'];
  alignSelf?: FlexStyle['alignSelf'];
  alignItems?: FlexStyle['alignItems'];
  rowGap?: FlexStyle['rowGap'];
  gap?: FlexStyle['gap'];
  flexWrap?: FlexStyle['flexWrap'];
  flex?: FlexStyle['flex'] | Boolean;
};

export type ButtonProps = {
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
};
