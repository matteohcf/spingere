import React, { useCallback, useRef, useState } from 'react';
import { Animated, FlatList, StyleSheet } from 'react-native';
import { Col, Container } from '../../components';
import { ExpandingDot } from 'react-native-animated-pagination-dots';
import { useStylesheet } from '../../hooks/useStylesheet.ts';
import { colors, WIDTH_DEVICE } from '../../constant';
import { IS_ANDROID } from '../../utils/platform.ts';
import { ActivationStepCard } from './components/ActivationStepCard.tsx';
import { Theme } from '../../types';
import { Tutorial1, Tutorial2, Tutorial3, Tutorial4, Tutorial5, Tutorial_Disclaimer } from '../../assets';

export const STEPS_DATA = [
  {
    id: 0,
    image: Tutorial1,
    title: 'tutorial 1 title',
    subtitle: 'tutorial 1 description',
  },
  {
    id: 1,
    image: Tutorial2,
    title: 'tutorial 2 title',
    subtitle: 'tutorial 2 description',
  },
  {
    id: 3,
    image: Tutorial3,
    title: 'tutorial 3 title',
    subtitle: 'tutorial 3 description',
  },
  {
    id: 4,
    image: Tutorial4,
    title: 'tutorial 4 title',
    subtitle: 'tutorial 4 description',
  },
  {
    id: 5,
    image: Tutorial5,
    title: 'tutorial 5 title',
    subtitle: 'tutorial 5 description',
  },
  {
    id: 6,
    image: Tutorial_Disclaimer,
    title: 'tutorial disclaimer title',
    subtitle: 'tutorial disclaimer description',
  },
];

export const TutorialScreen = () => {
  const styles = useStylesheet(createStyles);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const onViewableItemsChanged = useCallback(
    ({ changed }: { changed: any[] }) => {
      const selectedItem = changed[0];
      if (selectedItem) {
        const newIndex = selectedItem.index || 0;
        setCurrentIndex(newIndex);
      }
    },
    [setCurrentIndex],
  );

  const viewabilityConfig = {
    viewAreaCoveragePercentThreshold: 90,
    waitForInteraction: false,
  };

  const viewabilityConfigCallbackPairs = useRef([{ viewabilityConfig, onViewableItemsChanged }]);

  return (
    <Container addPaddingHorizontal={false}>
      <Animated.FlatList
        ref={flatListRef}
        horizontal={true}
        style={styles.flatList}
        data={STEPS_DATA}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: false,
        })}
        keyExtractor={item => item.id}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        renderItem={({ item, index }) => <ActivationStepCard data={item} index={index} />}
        snapToInterval={WIDTH_DEVICE}
        snapToAlignment="start"
        decelerationRate={IS_ANDROID ? 'fast' : 0}
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={currentIndex}
      />
      <Col h={10} mt={50}>
        <Dots scrollX={scrollX} />
      </Col>
    </Container>
  );
};

const Dots = ({ scrollX }: { scrollX: any }) => {
  return (
    <Col>
      <ExpandingDot
        data={STEPS_DATA}
        expandingDotWidth={10}
        scrollX={scrollX}
        inActiveDotOpacity={0.6}
        activeDotColor={colors.textPrimary}
        inActiveDotColor={'#afaeae'}
        dotStyle={{
          width: 10,
          height: 10,
          backgroundColor: '#ffffff',
          borderRadius: 5,
          marginHorizontal: 5,
        }}
        containerStyle={{}}
      />
    </Col>
  );
};

const createStyles = ({}: Theme) =>
  StyleSheet.create({
    flatList: {
      width: WIDTH_DEVICE,
      flex: 1,
    },
  });
