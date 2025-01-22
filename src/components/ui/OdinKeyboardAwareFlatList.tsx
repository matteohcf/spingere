import React from 'react';
import { ViewStyle } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import {  KeyboardAwareFlatList, KeyboardAwareFlatListProps } from "react-native-keyboard-aware-scroll-view";

type Props = {
  style?: ViewStyle;
  children?: React.ReactNode;
} & KeyboardAwareFlatListProps<any>;

export const OdinKeyboardAwareFlatList = ({ children, style, ...rest }: Props) => {
  const { spacing } = useTheme();

  return (
    <KeyboardAwareFlatList
      contentInsetAdjustmentBehavior="automatic"
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      style={[style]}
      contentContainerStyle={{ paddingBottom: spacing.screenVertical }}
      {...rest}>
      {children}
    </KeyboardAwareFlatList>
  );
};
