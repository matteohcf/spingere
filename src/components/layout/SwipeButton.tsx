import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useStylesheet } from '../../hooks/useStylesheet.ts';
import { Col, Icon, Loader, Row, Text } from '../ui';
import { Theme } from '../../types';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { WIDTH_DEVICE } from '../../constant';
import { useTheme } from '../../hooks/useTheme.ts';

type Props = {
  text: string;
  onPress: () => Promise<void>;
  loading: boolean;
};

const buttonWidth = 80;

export const SwipeButton = ({ text, onPress, loading }: Props) => {
  const styles = useStylesheet(createStyles);
  const swipableRef = React.useRef(null);
  const { spacing } = useTheme();
  const width = WIDTH_DEVICE - spacing.screenHorizontal * 2;
  const coverWidth = width - buttonWidth;

  const onSwipableOpen = async (direction: 'left' | 'right') => {
    console.log('direction', direction);
    if (direction === 'left') {
      await onPress();
      swipableRef.current.close();
      // onPress();
    }
  };

  return (
    <Row w={'100%'} bgColor={'bgSurface1'} br={12}>
      <Swipeable
        ref={swipableRef}
        onSwipeableOpen={onSwipableOpen}
        renderLeftActions={() => {
          return <Col w={coverWidth} h={100} />;
        }}
        containerStyle={{ width: width, zIndex: 10 }}>
        <View style={styles.swiper}>
          {loading && <Loader />}
          {!loading && <Icon icon={['far', 'chevron-double-right']} size={24} color={'black'} />}
        </View>
      </Swipeable>
      <View style={{ position: 'absolute', right: 0, top: 0, height: 40, width: coverWidth }} />
      <View style={styles.container}>
        <Text color={'textTertiary'} fontSize={18} fontWeight={'700'}>
          {text}
        </Text>
      </View>
    </Row>
  );
};

const createStyles = ({ colors }: Theme) =>
  StyleSheet.create({
    swiper: {
      backgroundColor: colors.primary,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      height: 60,
      width: buttonWidth,
      zIndex: 1,
    },
    container: {
      position: 'absolute',
      right: 0,
      top: 0,
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      pointerEvents: 'none',
      zIndex: 0,
    },
  });
