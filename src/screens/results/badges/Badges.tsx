import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useStylesheet } from '../../../hooks/useStylesheet.ts';
import { useInfiniteScroll } from '../../../hooks/useInfiniteScroll.ts';
import { Theme } from '../../../types';
import { ListEmptyComponent } from '../../../components';
import { Quest } from '../../../types/quest.ts';
import { BadgeListRow } from './components/BadgeListRow.tsx';
import { useSelector } from 'react-redux';
import { userSelectors } from '../../../store/user.ts';

type Props = {
  visible: boolean;
  navigation: any;
};

type Filters = {
  isCompleted: boolean;
  userId?: string;
  sort: string;
};

export const Badges = ({ visible, navigation }: Props) => {
  const styles = useStylesheet(createStyles);
  const userData = useSelector(userSelectors.detail);

  const { ...infiniteScrollProps } = useInfiniteScroll<Quest, Filters>({
    key: `questsBadges`,
    url: 'quests',
    limit: 10,
    filters: {
      isCompleted: true,
      userId: userData?._id,
      sort: '-completedAt',
    },
  });

  if (!visible) {
    return null;
  }

  const onPressBadge = (quest: Quest) => {
    navigation.navigate('QuestDetail', { quest: quest });
  };

  return (
    <>
      <FlatList
        {...infiniteScrollProps}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior={'automatic'}
        ListEmptyComponent={<ListEmptyComponent text={'noResults.badges'} />}
        renderItem={({ item }) => <BadgeListRow quest={item} onPress={() => onPressBadge(item)} />}
      />
    </>
  );
};

const createStyles = ({ shapes, colors, insets, spacing }: Theme) => StyleSheet.create({});
