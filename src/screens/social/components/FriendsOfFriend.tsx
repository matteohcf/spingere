import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SharedStackParamList } from '../../../core/navigation/RootNavigator.tsx';
import { Theme, User } from '../../../types';
import { FlatList, StyleSheet } from 'react-native';
import { useStylesheet } from '../../../hooks/useStylesheet.ts';
import { Container, ListEmptyComponent } from '../../../components';
import React, { useEffect } from 'react';
import { useInfiniteScroll } from '../../../hooks/useInfiniteScroll.ts';
import { FriendListRow } from './FriendListRow.tsx';
import { t } from 'i18next';
import { useSelector } from 'react-redux';
import { userSelectors } from '../../../store/user.ts';

type Props = NativeStackScreenProps<SharedStackParamList, 'FriendsOfFriends'>;

type Filters = {};

export const FriendsOfFriend = ({ navigation, route }: Props) => {
  const friend = route.params.friend;
  const styles = useStylesheet(createStyles);
  const userData = useSelector(userSelectors.detail);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: t('friends of friends', { username: route.params.friend?.username }),
    });
  }, [navigation, friend?._id]);

  if (!friend) {
    return;
  }

  const { ...infiniteScrollProps } = useInfiniteScroll<User, Filters>({
    key: `friends/user/${friend._id}`,
    url: `friends/user/${friend._id}`,
    limit: 10,
    filters: {},
  });

  const onPressUser = (user: User) => {
    if (userData?._id === user._id) {
      return;
    }
    navigation.push('UserDetail', { user: user });
  };

  return (
    <Container>
      <FlatList
        {...infiniteScrollProps}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior={'automatic'}
        ListEmptyComponent={<ListEmptyComponent text={'noResults.friends'} />}
        renderItem={({ item }) => <FriendListRow user={item} onPress={() => onPressUser(item)} />}
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
