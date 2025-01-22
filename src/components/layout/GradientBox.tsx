import React from 'react';
import {Image, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useStylesheet} from '../../hooks/useStylesheet.ts';
import {Col, Icon, Row} from '../ui';
import {Theme} from '../../types';

type Props = {
  children: React.ReactNode;
  colors: string[];
  onPress?: () => void;
  image?: boolean;
  angle?: number;
  rightArrow?: boolean;
  imageSource?: any;
};

export const GradientBox = ({ children, colors, onPress, image = true, angle = 90, rightArrow = true, imageSource  }: Props) => {
  const styles = useStylesheet(createStyles);

  return (
    <LinearGradient colors={colors} useAngle angle={angle} style={styles.container}>
      {image && (
        <Col style={styles.imageContainer}>
          <Image source={imageSource} style={styles.image} />
        </Col>
      )}
      <Row alignItems={'center'} onPress={onPress}>
        <Row flex={1} alignItems={'center'}>
          {children}
        </Row>
        {rightArrow && <Icon icon={['fal', 'arrow-right']} size={24} color={'white'} pr={20} />}
      </Row>
    </LinearGradient>
  );
};

const createStyles = ({}: Theme) =>
  StyleSheet.create({
    container: {
      width: '100%',
      borderRadius: 24,
      height: 80,
      justifyContent: 'center',
    },
    wrapper: {
      paddingHorizontal: 12,
      paddingVertical: 15,
    },
    imageContainer: {
      position: 'absolute',
      right: 0,
      top: 0,
      bottom: 0,
      height: '100%',
    },
    image: {
      height: '100%',
      aspectRatio: 585 / 288,
      resizeMode: 'cover',
      opacity: 0.6,
    },
  });
