import { Col, Container, Icon, ListEmptyComponent, Row, Text } from '../../components';
import { SharedStackParamList } from '../../core/navigation/RootNavigator.tsx';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll.ts';
import { Theme, User } from '../../types';
import { Keyboard, StyleSheet } from 'react-native';
import { useStylesheet } from '../../hooks/useStylesheet.ts';
import { InputSearch } from '../../components/ui/InputSearch.tsx';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FriendListRow } from './components/FriendListRow.tsx';
import { colors, spacing } from '../../constant';
import { useFocusEffect } from '@react-navigation/native';
import { OdinKeyboardAwareFlatList } from '../../components/ui/OdinKeyboardAwareFlatList.tsx';
import { useSelector } from 'react-redux';
import { userSelectors } from '../../store/user.ts';

type Props = NativeStackScreenProps<SharedStackParamList, 'TabNavigator'>;
type Filters = {
  q?: string;
  inFriends?: boolean;
};

export const Friends = ({ navigation }: Props) => {
  const styles = useStylesheet(createStyles);
  const [search, setSearch] = useState('');
  const bottomNotifications = useSelector(userSelectors.bottomNotifications);
  const count = bottomNotifications.count;

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Row gap={8} mh={spacing.screenHorizontal}>
          <Icon
            icon={['far', 'chart-user']}
            size={30}
            color={colors.black}
            onPress={() => {
              navigation.push('Leaderboards');
            }}
          />
          <Col>
            <Icon
              icon={['far', 'bell']}
              size={26}
              color={colors.black}
              onPress={() => {
                navigation.push('Notifications');
              }}
            />
            {count > 0 && (
              <Col style={styles.badge} w={18} h={18} br={9} bgColor={'primary'} alignItems={'center'} justifyContent={'center'}>
                <Text color={colors.white} fontSize={10} fontWeight={'700'}>
                  {count > 9 ? '9+' : count}
                </Text>
              </Col>
            )}
          </Col>
        </Row>
      ),
      /*headerTitle: search ? 'Utenti' : 'Amici',*/
    });
  }, [navigation, count]);

  const qFilter = useMemo(() => {
    if (search) {
      if (search.length >= 2) {
        return { q: search };
      }
      return {};
    }
    return {};
  }, [search]);

  const { refetch, ...infiniteScrollProps } = useInfiniteScroll<User, Filters>({
    key: `friends/list`,
    url: 'friends/list',
    limit: 30,
    filters: {
      ...qFilter,
      inFriends: search ? false : true,
    },
    debounceMs: 300,
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const onPressUser = (user: User) => {
    Keyboard.dismiss();
    navigation.push('UserDetail', { user: user });
  };

  return (
    <Container>
      <Col mb={12}>
        <InputSearch value={search} onChangeText={setSearch} placeholder={'find friends'} />
        <Row style={styles.separator} />
      </Col>
      <OdinKeyboardAwareFlatList
        {...infiniteScrollProps}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior={'automatic'}
        ListEmptyComponent={<ListEmptyComponent text={search ? 'noResults.users' : 'noResults.friends'} />}
        renderItem={({ item }) => <FriendListRow user={item} onPress={() => onPressUser(item)} />}
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
    badge: {
      position: 'absolute',
      top: 0,
      right: 4,
    },
  });
