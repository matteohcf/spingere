import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import RNModal, { ModalProps as RNModalProps } from 'react-native-modal';
import { FloatingModalManager } from './FloatingModalManager';
import { Col, Row } from '../ui';
import { IS_ANDROID } from '../../utils/platform';
import { HEIGHT_DEVICE, WIDTH_DEVICE } from '../../constant';
import { Theme } from '../../types';
import { useStylesheet } from '../../hooks/useStylesheet';

export type ModalProps = Partial<RNModalProps> & {
  children?: React.JSX.Element;
  dismissable?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  animationIn?: RNModalProps['animationIn'];
};
const HEIGHT_DEVICE_WITH_STATUS_BAR = IS_ANDROID ? HEIGHT_DEVICE + (StatusBar?.currentHeight || 0) : HEIGHT_DEVICE;

export const FloatingModal = () => {
  const [modalProps, setModalProps] = useState<ModalProps>({});
  const { children, dismissable, animationIn, containerStyle } = modalProps;
  const styles = useStylesheet(createStyles);

  const showModal = (passedProps: ModalProps) => {
    // @ts-ignore
    const childrenWithExtraProps = React.cloneElement(passedProps.children, {
      closeModal: () => setModalProps({}),
    });

    setModalProps({ ...passedProps, children: childrenWithExtraProps });
  };

  const closeModal = useCallback(() => {
    if (dismissable) {
      setModalProps({});
    }
  }, [dismissable]);

  useEffect(() => {
    FloatingModalManager.register({ showModal });
  }, []);

  return (
    <RNModal
      animationIn={animationIn || 'fadeIn'}
      isVisible={!!children}
      useNativeDriver
      supportedOrientations={['portrait']}
      deviceHeight={HEIGHT_DEVICE_WITH_STATUS_BAR}
      deviceWidth={WIDTH_DEVICE}
      avoidKeyboard={true}
      coverScreen={!IS_ANDROID}
      style={{ padding: 0, margin: 0 }}
      onBackdropPress={closeModal}>
      <Row alignItems={'center'} justifyContent={'center'} h={'100%'} style={[containerStyle]} onPress={closeModal}>
        <Col style={styles.modalContainer}>{children}</Col>
      </Row>
    </RNModal>
  );
};

const createStyles = ({ insets, spacing, colors }: Theme) =>
  StyleSheet.create({
    modalContainer: {
      width: WIDTH_DEVICE - spacing.screenHorizontal * 2,
      paddingHorizontal: 20,
      paddingTop: 25,
      paddingBottom: 25,
      overflow: 'hidden',
    },
  });
