import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SharedStackParamList } from '../../../core/navigation/RootNavigator.tsx';
import { Theme, User } from '../../../types';
import { FlatList, StyleSheet } from 'react-native';
import { useStylesheet } from '../../../hooks/useStylesheet.ts';
import { Container, ListEmptyComponent } from '../../../components';
import React from 'react';
import { useInfiniteScroll } from '../../../hooks/useInfiniteScroll.ts';
import { FriendListRow } from './FriendListRow.tsx';

type Props = NativeStackScreenProps<SharedStackParamList, 'CommonFriends'>;

type Filters = {};

export const CommonFriends = ({ navigation, route }: Props) => {
  const friendId = route.params.friendId;
  const styles = useStylesheet(createStyles);

  if (!friendId) {
    return;
  }

  const { ...infiniteScrollProps } = useInfiniteScroll<User, Filters>({
    key: `friends/of/${friendId}`,
    url: `friends/of/${friendId}`,
    limit: 10,
    filters: {},
  });

  return (
    <Container>
      <FlatList
        {...infiniteScrollProps}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior={'automatic'}
        ListEmptyComponent={<ListEmptyComponent text={'noResults.commonFriends'} />}
        renderItem={({ item }) => <FriendListRow user={item} onPress={() => navigation.push('UserDetail', { user: item })} />}
      />
    </Container>
  );
};

const createStyles = ({ insets, colors, spacing, shapes }: Theme) =>
  StyleSheet.create({
    scrollView: {
      marginTop: spacing.lightMargin,
    },
  });
