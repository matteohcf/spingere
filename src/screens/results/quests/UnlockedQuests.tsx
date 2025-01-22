import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SharedStackParamList } from '../../../core/navigation/RootNavigator.tsx';
import { Animated, FlatList, StyleSheet } from 'react-native';
import { Col, Container } from '../../../components';
import { Theme } from '../../../types';
import { useStylesheet } from '../../../hooks/useStylesheet.ts';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Quest } from '../../../types/quest.ts';
import { colors, WIDTH_DEVICE } from '../../../constant';
import { IS_ANDROID } from '../../../utils/platform.ts';
import { ExpandingDot } from 'react-native-animated-pagination-dots';
import { UnlockedQuestListRow } from './components/UnlockedQuestListRow.tsx';
import { t } from 'i18next';

type Props = NativeStackScreenProps<SharedStackParamList, 'UnlockedQuests'>;

export const UnlockedQuests = ({ navigation, route }: Props) => {
  const passedQuests = route.params.quests;
  const [quests, setQuests] = useState<Quest[]>(passedQuests || []);
  const styles = useStylesheet(createStyles);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  if (!quests) {
    return null;
  }

  const questsLength = quests.length;
  const isMoreThanOneQuest = questsLength > 1;

  useEffect(() => {
    navigation.setOptions({
      headerTitle: isMoreThanOneQuest ? t('unlocked quests') : t('unlocked quest'),
    });
  }, [navigation, isMoreThanOneQuest]);

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
        data={quests}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: false,
        })}
        keyExtractor={item => item.id}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        renderItem={({ item, index }) => <UnlockedQuestListRow quest={item} index={index} length={questsLength} navigation={navigation} />}
        snapToInterval={WIDTH_DEVICE}
        snapToAlignment="start"
        decelerationRate={IS_ANDROID ? 'fast' : 0}
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={currentIndex}
      />
      <Col h={10} mt={50}>
        <Dots scrollX={scrollX} quests={quests} />
      </Col>
    </Container>
  );
};

const Dots = ({ scrollX, quests }: { scrollX: any; quests: Quest[] }) => {
  return (
    <Col>
      <ExpandingDot
        data={quests}
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
