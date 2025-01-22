import React, { useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useStylesheet } from '../../../hooks/useStylesheet.ts';
import { useInfiniteScroll } from '../../../hooks/useInfiniteScroll.ts';
import { Theme } from '../../../types';
import { ListEmptyComponent } from '../../../components';
import { Quest } from '../../../types/quest.ts';
import { QuestListRow } from './components/QuestListRow.tsx';
import { HiddenQuestListRow } from './components/HiddenQuestListRow.tsx';
import { useSelector } from 'react-redux';
import { userSelectors } from '../../../store/user.ts';

type Props = {
  visible: boolean;
  navigation: any;
};

type Filters = {
  isCompleted: boolean;
  sort: string;
  userId?: string;
};

export const Quests = ({ visible, navigation }: Props) => {
  const styles = useStylesheet(createStyles);
  const userData = useSelector(userSelectors.detail);

  const { ...infiniteScrollProps } = useInfiniteScroll<Quest, Filters>({
    key: `questsChallenges`,
    url: 'quests',
    limit: 10,
    filters: {
      isCompleted: false,
      userId: userData?._id,
      sort: 'isHidden, -advancement',
    },
  });

  if (!visible) {
    return null;
  }

  const onPressQuest = (quest: Quest) => {
    navigation.navigate('QuestDetail', { quest: quest });
  };

  return (
    <>
      <FlatList
        {...infiniteScrollProps}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior={'automatic'}
        ListEmptyComponent={<ListEmptyComponent text={'noResults.quests'} />}
        renderItem={({ item }) => {
          if (item.isHidden) {
            return <HiddenQuestListRow quest={item} />;
          }
          return <QuestListRow quest={item} onPress={() => onPressQuest(item)} />;
        }}
      />
    </>
  );
};

const createStyles = ({ shapes, colors, insets, spacing }: Theme) => StyleSheet.create({});
