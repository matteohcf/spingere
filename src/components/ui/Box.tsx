import { Pressable, StyleProp, View, ViewStyle } from 'react-native';
import { PropsWithChildren } from 'react';
import { FlexProps, StyleProps } from '../../types';
import { useStyleProps } from '../../hooks/useStyleProps';
import { useFlexProps } from '../../hooks/useFlexProps';

type WithFlexProps<T> = FlexProps & StyleProps & T;
type BoxInnerProps = {
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  disabled?: boolean;
  hitSlop?: number;
  pointerEvents?: 'box-none' | 'none' | 'box-only' | 'auto';
};

export type BoxProps = PropsWithChildren<WithFlexProps<BoxInnerProps>>;

export const Box = ({ children, style, onPress, hitSlop, pointerEvents, ...rest }: BoxProps) => {
  const styleProps = useStyleProps(rest) as StyleProp<ViewStyle>;
  const flexProps = useFlexProps(rest) as StyleProp<ViewStyle>;

  const Component = onPress ? Pressable : View;
  return (
    <Component
      onPress={onPress}
      disabled={rest.disabled}
      style={[styleProps, flexProps, style]}
      pointerEvents={pointerEvents}
      hitSlop={{ top: hitSlop, bottom: hitSlop, left: hitSlop, right: hitSlop }}>
      {children}
    </Component>
  );
};
