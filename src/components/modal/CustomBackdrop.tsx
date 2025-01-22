import React, { forwardRef, memo, useCallback, useEffect, useImperativeHandle, useMemo } from 'react';
import { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Pressable } from 'react-native';
import { ModalManager } from './ModalManager';

export type BottomSheetBackdropMethods = {
  close: () => void;
  dismissable?: boolean;
};

const CustomBackdropComponent = forwardRef<BottomSheetBackdropMethods, BottomSheetBackdropProps>(
  ({ style, dismissable }, ref) => {
    const opacity = useSharedValue(0);

    const containerAnimatedStyle = useAnimatedStyle(() => ({
      opacity: opacity.value,
    }));

    const close = useCallback(() => {
      opacity.value = withTiming(0, {
        duration: 500,
      });
    }, [opacity]);

    useImperativeHandle(
      ref,
      () => ({
        close,
      }),
      [close],
    );

    useEffect(() => {
      opacity.value = withTiming(1, {
        duration: 300,
      });
    }, []);

    const containerStyle = useMemo(
      () => [
        style,
        {
          backgroundColor: 'rgba(0,0,0,0.3)',
        },
        containerAnimatedStyle,
      ],
      [style, containerAnimatedStyle],
    );

    return (
      <Animated.View style={containerStyle}>
        <Pressable
          style={{ height: '100%' }}
          onPress={() => {
            dismissable && ModalManager.hide();
          }}
        />
      </Animated.View>
    );
  },
);

export const CustomBackdrop = memo(CustomBackdropComponent);
