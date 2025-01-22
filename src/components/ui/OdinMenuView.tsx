import React from 'react';
import { StyleSheet } from 'react-native';
import { MenuView as RNMenuView, NativeActionEvent } from '@react-native-menu/menu';
import { MenuAction } from '@react-native-menu/menu/src/types';

type Props = {
  children?: React.ReactNode;
  onPress?: () => void;
  actions: MenuAction[];
};

export const OdinMenuView = ({ children, actions }: Props) => {
  const onPressAction = ({ nativeEvent }: NativeActionEvent) => {
    if (nativeEvent.event) {
      const selectedAction = actions.find(action => action.id === nativeEvent.event);
      if (selectedAction && selectedAction.onPress) {
        selectedAction.onPress();
      }
    }
  };

  return (
    <RNMenuView onPressAction={onPressAction} actions={actions} shouldOpenOnLongPress={false}>
      {children}
    </RNMenuView>
  );
};

const styles = StyleSheet.create({});
