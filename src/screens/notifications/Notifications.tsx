import { Container, ListEmptyComponent, Text } from '../../components';
import { SharedStackParamList } from '../../core/navigation/RootNavigator.tsx';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll.ts';
import { Theme } from '../../types';
import { SectionList, StyleSheet } from 'react-native';
import { useStylesheet } from '../../hooks/useStylesheet.ts';
import React, { useEffect, useMemo, useState } from 'react';
import { NotificationListRow } from './components/NotificationListRow.tsx';
import { manageFriendRequest } from '../../api/friend.ts';
import { resetNotificationBadge } from '../../utils/notifications.ts';
import { getNotificationsCount, readAllNotification } from '../../api/user.ts';
import { Notification, NotificationEventType } from '../../types/notification.ts';
import { GeneralNotificationListRow } from './components/GeneralNotificationListRow.tsx';
import _ from 'lodash';
import {isLast30Days, isLast7Days, isToday, isYesterday} from '../../utils/date.ts';
import { t } from 'i18next';

type Props = NativeStackScreenProps<SharedStackParamList, 'Notifications'>;

type Filters = {};

enum LoadingTypesEnum {
  ACCEPT = 'accept',
  REJECT = 'reject',
}

export const Notifications = ({ navigation }: Props) => {
  const styles = useStylesheet(createStyles);
  const [loadingFriends, setLoadingFriends] = useState<{ [key: string]: LoadingTypesEnum }>({});

  const { refetch, ...infiniteScrollProps } = useInfiniteScroll<Notification, Filters>({
    key: `notifications`,
    url: 'notifications',
    limit: 10,
    filters: {},
    staleTime: 0,
  });

  useEffect(() => {
    resetNotificationBadge(0);
    readAllNotification().then(r => {
      getNotificationsCount();
    });
  }, [navigation]);

  const onPressAccept = async (item: Notification) => {
    if (!item.genericId) return;
    try {
      setLoadingFriends(prev => ({ ...prev, [item._id]: LoadingTypesEnum.ACCEPT }));
      await manageFriendRequest(item.genericId, true);
      await refetch();
    } catch (e) {
    } finally {
      setLoadingFriends(prev => {
        const newState = { ...prev };
        delete newState[item._id];
        return newState;
      });
    }
  };

  const onPressReject = async (item: Notification) => {
    if (!item.genericId) return;
    try {
      setLoadingFriends(prev => ({ ...prev, [item._id]: LoadingTypesEnum.REJECT }));
      await manageFriendRequest(item.genericId, false);
      await refetch();
    } catch (e) {
    } finally {
      setLoadingFriends(prev => {
        const newState = { ...prev };
        delete newState[item._id];
        return newState;
      });
    }
  };

  const onPress = (item: Notification) => () => {
    if (!item.createdByUser) return;
    navigation.navigate('UserDetail', { user: item.createdByUser });
  };

  const groupedNotifications = useMemo(() => {
    const grouped = _.groupBy(infiniteScrollProps.data, item => {
      if (isToday(item.createdAt)) {
        return t('today');
      }
      if (isYesterday(item.createdAt)) {
        return t('yesterday');
      }
      if (isLast7Days(item.createdAt)) {
        return t('last7Days');
      }
      if (isLast30Days(item.createdAt)) {
        return t('last30Days');
      }
      return t('older');
    });
    return Object.entries(grouped).map(([item, data]) => ({
      title: item,
      data: data,
    }));
  }, [infiniteScrollProps.data]);

  console.log('groupedNotifications', groupedNotifications);

  const renderItem = ({ item }: any) => {
    if (item.event === NotificationEventType.FRIEND_REQUEST) {
      return (
        <NotificationListRow
          onPress={onPress(item)}
          user={item.createdByUser}
          loading={loadingFriends[item._id]}
          onPressAccept={() => onPressAccept(item)}
          onPressReject={() => onPressReject(item)}
        />
      );
    }
    if (item.event === NotificationEventType.QUEST_COMPLETED) {
      return <GeneralNotificationListRow icon={['far', 'circle-check']} title={item.title} subtitle={item.body} />;
    }
    if (item.event === NotificationEventType.PEE_TAG) {
      return <GeneralNotificationListRow icon={['far', 'at']} title={item.title} subtitle={item.body} />;
    }
    return null;
  };

  const renderSectionHeader = ({ section }: any) => (
    <Text mb={4} fontSize={16} fontWeight={'500'}>
      {section.title}
    </Text>
  );

  return (
    <Container>
      <SectionList
        {...infiniteScrollProps}
        sections={groupedNotifications}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior={'automatic'}
        stickySectionHeadersEnabled={false}
        ListEmptyComponent={<ListEmptyComponent text={'noResults.notifications'} />}
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
