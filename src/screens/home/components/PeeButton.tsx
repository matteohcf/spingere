import React, { useMemo, useRef, useState } from 'react';
import { Animated, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Col } from '../../../components';
import { useStylesheet } from '../../../hooks/useStylesheet.ts';
import { Theme } from '../../../types';
import { colors, HEIGHT_DEVICE, SHADOW, spacing, WIDTH_DEVICE } from '../../../constant';
import { t } from 'i18next';
import { PeeGradientBox } from './PeeGradientBox.tsx';
import { trigger } from 'react-native-haptic-feedback';
import LottieView from 'lottie-react-native';
import Image from 'react-native-fast-image';
import { LogoNoBg } from '../../../assets';
import { pee } from '../../../api/pee.ts';
import { useSelector } from 'react-redux';
import { userSelectors } from '../../../store/user.ts';
import { showToast } from '../../../utils/toast.ts';
import analytics from '@react-native-firebase/analytics';
import { Analytics } from '../../../utils/firebase/firebaseUtils.ts';

type Props = {
  onPress: (peeResponse: any) => void;
};

export const PeeButton = ({ onPress }: Props) => {
  const styles = useStylesheet(createStyles);
  const userCoordinates = useSelector(userSelectors.geolocation);
  const animatedValue = useRef(new Animated.Value(1)).current;
  const lottieRef = useRef<LottieView>(null);
  const [pressing, setPressing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const disabled = useMemo(() => loading || isAnimating, [loading, isAnimating]);

  const onPressIn = () => {
    if (disabled) return;
    setPressing(true);
    Animated.spring(animatedValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    setPressing(false);
    Animated.spring(animatedValue, {
      toValue: 1,
      friction: 3,
      tension: 50,
      useNativeDriver: true,
    }).start();
  };

  const onPressButton = async () => {
    if (disabled) return;
    try {
      const params = {
        position: {
          coordinates: userCoordinates?.coordinates,
          altitude: userCoordinates?.coords?.altitude,
        },
      };
      setLoading(true);
      const res = await pee(params);
      onPress && onPress(res);
      /*Firebase analytics*/
      Analytics.genericLog('button_press', { button_name: 'pee-button-home' });
      setLoading(false);
      trigger('impactHeavy');
      if (!isAnimating) {
        setIsAnimating(true);
        lottieRef.current?.play();
      }
    } catch (e) {
      setLoading(false);
      showToast(t('toasts.peeButtonErrorTitle'), t('toasts.peeButtonErrorMessage'), { type: 'error' });
      console.log(e);
    }
  };

  const onAnimationFinish = () => {
    setIsAnimating(false);
    lottieRef.current?.reset();
  };

  const animatedStyle = {
    transform: [{ scale: animatedValue }],
    opacity: animatedValue.interpolate({
      inputRange: [0.95, 1],
      outputRange: [0.8, 1],
    }),
  };

  return (
    <Col alignItems={'center'}>
      <TouchableWithoutFeedback onPressIn={onPressIn} onPressOut={onPressOut} onPress={onPressButton}>
        <Animated.View style={[styles.container, animatedStyle]}>
          <PeeGradientBox colors={[colors.backgroundGradientFrom, colors.backgroundGradientTo]} angle={100}>
            <Col mh={spacing.screenHorizontal} flex={1} alignItems={'center'}>
              <Image source={LogoNoBg} style={{ width: 150, height: 150, opacity: 0.8 }} />
              <Col h={HEIGHT_DEVICE / 2} w={WIDTH_DEVICE - 40} style={styles.animationContainer}>
                <LottieView
                  source={require('../../../assets/lottie/confettiAnimation3.json')}
                  style={styles.animation}
                  ref={lottieRef}
                  loop={false}
                  onAnimationFinish={onAnimationFinish}
                />
              </Col>
            </Col>
          </PeeGradientBox>
        </Animated.View>
      </TouchableWithoutFeedback>
    </Col>
  );
};

const createStyles = ({ colors }: Theme) =>
  StyleSheet.create({
    container: {
      ...SHADOW.HEAVY,
    },
    animationContainer: {
      position: 'absolute',
      top: -100,
      bottom: 0,
    },
    animation: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
  });
