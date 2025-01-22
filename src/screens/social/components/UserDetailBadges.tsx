import { FlatList, StyleSheet } from 'react-native';
import { ListEmptyComponent } from '../../../components';
import { useInfiniteScroll } from '../../../hooks/useInfiniteScroll.ts';
import { Theme, User } from '../../../types';
import { useStylesheet } from '../../../hooks/useStylesheet.ts';
import React, { useCallback, useEffect } from 'react';
import { BadgeListRow } from '../../results/badges/components/BadgeListRow.tsx';
import { Quest } from '../../../types/quest.ts';
import { useFocusEffect } from '@react-navigation/native';

type Props = {
  visible: boolean;
  headerComponent?: React.ReactNode;
  user: User;
  isFriend: boolean;
};

type Filters = {
  isCompleted: boolean;
  userId?: string;
  sort: string;
};

export const UserDetailBadges = ({ visible, headerComponent, user, isFriend }: Props) => {
  const styles = useStylesheet(createStyles);

  if (!isFriend) {
    return;
  }

  const { refetch, ...infiniteScrollProps } = useInfiniteScroll<Quest, Filters>({
    key: `quests-${user._id}`,
    url: 'quests',
    limit: 10,
    filters: {
      isCompleted: true,
      userId: user._id,
      sort: '-completedAt',
    },
    staleTime: 0,
  });

  // useFocusEffect(
  //   useCallback(() => {
  //     refetch();
  //   }, [refetch]),
  // );

  // useEffect(() => {
  //   refetch();
  // }, [user._id]);

  if (!visible) {
    return null;
  }

  return (
    <>
      {isFriend && (
        <FlatList
          {...infiniteScrollProps}
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentInsetAdjustmentBehavior={'automatic'}
          ListHeaderComponent={headerComponent}
          ListEmptyComponent={<ListEmptyComponent text={'noResults.badges'} />}
          renderItem={({ item, index }) => <BadgeListRow quest={item} />}
        />
      )}
    </>
  );
};

const createStyles = ({ colors, spacing, shapes }: Theme) =>
  StyleSheet.create({
    scrollView: {
      marginTop: spacing.lightMargin,
    },
  });
