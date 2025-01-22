import React from 'react';
import { StyleSheet, Animated } from 'react-native';
import { colors } from '../../../../constant';
import { Col, Row, Text } from '../../../../components';

type Props = {
  advancement: number;
  goal: number;
  height?: number;
};

export const QuestProgressBar = ({ advancement, goal, height = 20 }: Props) => {
  const percentage = Math.min((advancement / goal) * 100, 100);

  const [animation] = React.useState(new Animated.Value(0));
  React.useEffect(() => {
    Animated.timing(animation, {
      toValue: percentage,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [percentage]);

  const width = animation.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <Col flex={1} mv={4}>
      <Row style={[styles.progressContainer, { height, backgroundColor: colors.bgSurface1 }]}>
        <Animated.View
          style={[
            styles.progressBar,
            {
              width,
              backgroundColor: colors.primary,
              height: '100%',
            },
          ]}
        />
      </Row>
      <Row justifyContent={'space-between'} mt={4}>
        <Text fontWeight={'500'} fontSize={14} color={colors.textSecondary}>{`${Math.round(percentage)}%`}</Text>
        <Text fontWeight={'500'} fontSize={14} color={colors.textSecondary}>{`${advancement}/${goal}`}</Text>
      </Row>
    </Col>
  );
};

const styles = StyleSheet.create({
  progressContainer: {
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressBar: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
});
