import React, { PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { ModalProps as RNModalProps } from 'react-native-modal';
import { ModalManager } from './ModalManager';
import { BottomSheetBackdropProps, BottomSheetModal, BottomSheetModalProps, BottomSheetView } from '@gorhom/bottom-sheet';
import { CustomBackdrop, BottomSheetBackdropMethods } from './CustomBackdrop';
import { omit } from 'lodash';
import { Row } from '../ui';
import { colors } from '../../constant';

export type ModalProps = Partial<RNModalProps> &
  PropsWithChildren<{
    dismissable?: boolean;
    containerStyle?: StyleProp<ViewStyle>;
    bottomSheetModalProps?: Partial<BottomSheetModalProps>;
    onDismiss?: () => void;
    handleBackgroundColor?: string;
  }>;

export const Modal = () => {
  const [modalProps, setModalProps] = useState<ModalProps>({});
  const { children, bottomSheetModalProps } = modalProps;
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const backdropRef = useRef<BottomSheetBackdropMethods>(null);
  const [snapPoints] = useState<BottomSheetModalProps['snapPoints']>(bottomSheetModalProps?.snapPoints);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const showModal = useCallback(
    (passedProps: ModalProps) => {
      passedProps.dismissable = passedProps.dismissable === undefined ? true : passedProps.dismissable;
      passedProps.handleBackgroundColor = passedProps.handleBackgroundColor || colors.white;
      // passedProps.onDismiss = passedProps
      setModalProps(() => passedProps);
      setTimeout(() => {
        handlePresentModalPress();
      }, 50);
    },
    [handlePresentModalPress],
  );

  const hideModal = useCallback(() => {
    backdropRef.current?.close();
    setModalProps(() => ({}));
  }, []);

  useEffect(() => {
    ModalManager.register({ showModal, hideModal });
  }, [hideModal, showModal]);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => <CustomBackdrop ref={backdropRef} dismissable={modalProps.dismissable} {...props} />,
    [modalProps.dismissable],
  );

  if (!children) {
    return null;
  }
  // Improve with close methods. At the moment, close not working with duynamicSize
  return (
    <BottomSheetModal
      keyboardBehavior={'interactive'}
      keyboardBlurBehavior={'restore'}
      ref={bottomSheetModalRef}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      enablePanDownToClose={modalProps.dismissable}
      onDismiss={modalProps?.onDismiss}
      handleComponent={() => (
        <Row style={styles.handleComponent} bgColor={modalProps.handleBackgroundColor}>
          <Row w={35} h={5} br={5} bgColor={colors.bgSurface1} />
        </Row>
      )}
      {...omit(bottomSheetModalProps, 'snapPoints')}>
      <BottomSheetView>{children}</BottomSheetView>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  handleComponent: {
    height: 30,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
});
