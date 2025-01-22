import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SharedStackParamList } from '../../core/navigation/RootNavigator.tsx';
import { useStylesheet } from '../../hooks/useStylesheet.ts';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll.ts';
import { Theme, User } from '../../types';
import { FlatList, ScrollView, StyleSheet } from 'react-native';
import { Chip, Col, Container, ListEmptyComponent, Row } from '../../components';
import React, { useState } from 'react';
import { t } from 'i18next';
import { trigger } from 'react-native-haptic-feedback';
import { Leaderboard } from '../../types/leaderboard.ts';
import { LeaderBoardListRow } from './components/LeaderboardListRow.tsx';
import { useSelector } from 'react-redux';
import { userSelectors } from '../../store/user.ts';

type Props = NativeStackScreenProps<SharedStackParamList, 'Leaderboards'>;

type Filters = {
  section: availableFilters;
};

enum availableFilters {
  ALL = 'all',
  YEAR = 'year',
  MONTH = 'month',
  WEEK = 'week',
  DAY = 'day',
}

export const Leaderboards = ({ navigation }: Props) => {
  const styles = useStylesheet(createStyles);
  const [selectedFilter, setSelectedFilter] = useState(availableFilters.ALL);
  const userData = useSelector(userSelectors.detail);

  const displayFilters = [
    { id: availableFilters.ALL, value: t('all') },
    { id: availableFilters.YEAR, value: t('year') },
    { id: availableFilters.MONTH, value: t('month') },
    { id: availableFilters.WEEK, value: t('week') },
    { id: availableFilters.DAY, value: t('today') },
  ];

  const { ...infiniteScrollProps } = useInfiniteScroll<Leaderboard, Filters>({
    key: `friends/leaderboard-${selectedFilter}`,
    url: 'friends/leaderboard',
    limit: 99,
    filters: {
      section: selectedFilter,
    },
  });

  const onPressUser = (user: User) => {
    if (userData?._id === user._id) {
      return;
    }
    navigation.push('UserDetail', { user: user });
  };

  const onPressFilter = (id: availableFilters) => {
    if (id === selectedFilter) return;
    trigger('impactLight');
    setSelectedFilter(id);
  };

  return (
    <Container>
      <Col mb={12}>
        <ScrollView horizontal={true} contentContainerStyle={styles.scrollViewContent} showsHorizontalScrollIndicator={false}>
          {/*<Icon icon={['fal', 'gear']} h={40} w={40} size={16} color={colors.black} bgColor={'bgSurface1'} br={12} />*/}
          {displayFilters.map(item => (
            <Chip key={item.id} value={item.value} selected={item.id === selectedFilter} onPress={() => onPressFilter(item.id)} />
          ))}
        </ScrollView>
        <Row style={styles.separator} />
      </Col>
      <FlatList
        {...infiniteScrollProps}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior={'automatic'}
        ListEmptyComponent={<ListEmptyComponent text={'noResults.leaderboards'} />}
        renderItem={({ item, index }) => <LeaderBoardListRow leaderboard={item} index={index} onPress={() => onPressUser(item.user)} />}
      />
    </Container>
  );
};

const createStyles = ({ insets, colors, spacing, shapes }: Theme) =>
  StyleSheet.create({
    separator: {
      width: '200%',
      marginLeft: -50,
      backgroundColor: colors.bgSurface1,
      height: 1,
      opacity: 0.6,
    },
    scrollViewContent: {
      gap: 8,
      /*paddingLeft: spacing.screenHorizontal,*/
      paddingRight: spacing.screenHorizontal,
      marginVertical: spacing.lightMargin,
    },
  });
