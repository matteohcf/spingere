import React from 'react';
import { KeyboardAwareScrollView, KeyboardAwareScrollViewProps } from 'react-native-keyboard-aware-scroll-view';
import { ViewStyle } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

type Props = {
  style?: ViewStyle;
  children?: React.ReactNode;
} & KeyboardAwareScrollViewProps;

export const OdinKeyboardAwareScrollView = ({ children, style, ...rest }: Props) => {
  const { spacing } = useTheme();

  return (
    <KeyboardAwareScrollView
      contentInsetAdjustmentBehavior="automatic"
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      style={{ flexGrow: 1, height: '100%' }}
      contentContainerStyle={[style, { paddingBottom: spacing.screenVertical }]}
      {...rest}>
      {children}
    </KeyboardAwareScrollView>
  );
};
