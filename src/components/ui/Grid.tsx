import { StyleProp, View, ViewStyle } from 'react-native';
import { PropsWithChildren } from 'react';
import { FlexProps, StyleProps } from '../../types';
import { useStyleProps } from '../../hooks/useStyleProps';
import { useFlexProps } from '../../hooks/useFlexProps';

type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse' | undefined;

export type GridProps = PropsWithChildren<
  StyleProps & FlexProps & { style?: StyleProp<ViewStyle>; direction: FlexDirection }
>;

export const Grid = ({ children, style, direction, ...rest }: GridProps) => {
  const styleProps = useStyleProps(rest);
  const flexProps = useFlexProps(rest);

  return (
    <View
      style={[
        {
          ...styleProps,
          ...flexProps,
          flexDirection: direction,
        },
        style,
      ]}>
      {children}
    </View>
  );
};
