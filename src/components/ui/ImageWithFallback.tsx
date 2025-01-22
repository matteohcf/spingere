import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon, Row } from '../ui';
import Image from 'react-native-fast-image';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Theme } from '../../types';
import { useTheme } from '../../hooks/useTheme';
import { useStylesheet } from '../../hooks/useStylesheet';

type ImageWithFallbackProps = {
  image?: string;
  fallback?: IconProp;
  size?: number;
  fallbackImage?: string;
  fallbackBackgroundColor?: string;
};

export const ImageWithFallback = ({
  image,
  fallback,
  fallbackBackgroundColor,
  fallbackImage,
  size = 98,
}: ImageWithFallbackProps) => {
  const { colors } = useTheme();
  const styles = useStylesheet(createStyles);
  return (
    <Row justifyContent={'center'} w={size} h={size} br={size / 2} alignItems={'center'} style={styles.container}>
      {image ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : (
        <Icon
          style={{
            backgroundColor: fallbackBackgroundColor || colors.primary,
            width: '100%',
            height: '100%',
          }}
          icon={fallback}
          source={fallbackImage}
          imageStyle={{
            width: size * 0.6,
            height: size * 0.6,
          }}
          size={size * 0.6}
          color={colors.white}
        />
      )}
    </Row>
  );
};

const createStyles = ({}: Theme) =>
  StyleSheet.create({
    container: {
      overflow: 'hidden',
      backgroundColor: 'red',
    },
    image: {
      width: '100%',
      height: '100%',
    },
    icon: {
      width: '100%',
      height: '100%',
    },
  });
