import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { SharedStackParamList } from '../../../core/navigation/RootNavigator.tsx';
import { useStylesheet } from '../../../hooks/useStylesheet.ts';
import { Theme, User } from '../../../types';
import { useFocusEffect } from '@react-navigation/native';
import { getFriendDetail } from '../../../api/user.ts';
import { Col, Container, HeaderLeft, Loader, Row, Text } from '../../../components';
import { StyleSheet } from 'react-native';
import { colors, HEIGHT_DEVICE, spacing } from '../../../constant';
import { FriendButton } from './FriendButton.tsx';
import { FriendStatusesEnum } from '../../../types/friend.ts';
import { deleteFriendRequest, getCommonFriends, sendFriendRequest } from '../../../api/friend.ts';
import { showAlertSiteModal } from '../../../components/floatingModal';
import { t } from 'i18next';
import { TabSwitch } from '../../../components/layout/TabSwitch.tsx';
import { UserDetailBadges } from './UserDetailBadges.tsx';
import { UserDetailStatistics } from './UserDetailStatistics.tsx';
import { UserDetailInfo } from './UserDetailInfo.tsx';
import { userSelectors } from '../../../store/user.ts';
import { useSelector } from 'react-redux';
import { CommonFriendsBox } from './CommonFriendsBox.tsx';
import { UserDetailCommonPees } from './UserDetailCommonPees.tsx';

type Props = NativeStackScreenProps<SharedStackParamList, 'UserDetail'>;

enum Tabs {
  STATISTICS = 'statistics',
  // COMMON_PEES = 'commonPees',
  BADGES = 'badges',
}

const tabs = [Tabs.STATISTICS, /*Tabs.COMMON_PEES,*/ Tabs.BADGES];

export const UserDetail = ({ navigation, route }: Props) => {
  const passedUser = route.params.user;
  const [selectedTab, setSelectedTab] = useState<Tabs>(Tabs.STATISTICS);
  const styles = useStylesheet(createStyles);
  const [user, setUser] = useState<User>(passedUser);
  const [commonFriends, setCommonFriends] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const userData = useSelector(userSelectors.detail);
  const isFriend = user?.friend?.status === FriendStatusesEnum.ACCEPTED;
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    navigation.setOptions({ headerLeft: () => <HeaderLeft showBack addPadding={false} text={user?.username} /> });
  }, [user?.username, navigation]);

  const fetchFriendDetail = async () => {
    try {
      setIsReady(false);
      const res = await getFriendDetail(user._id);
      if (res) {
        setUser(res);
      }
      setIsReady(true);
    } catch (e) {
      setIsReady(true);
    }
  };

  const fetchCommonFriends = async () => {
    try {
      const res = await getCommonFriends(user._id);
      if (res) {
        setCommonFriends(res);
      }
    } catch (e) {}
  };

  useEffect(() => {
    fetchFriendDetail();
    fetchCommonFriends();
  }, []);

  const addFriend = async () => {
    try {
      setLoading(true);
      await sendFriendRequest(user._id);
      await fetchFriendDetail();
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  const deleteFriend = async () => {
    try {
      setLoading(true);
      await deleteFriendRequest(user.friend._id);
      await fetchFriendDetail();
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  const onPressFriendButton = async () => {
    if (!user.friend) {
      await addFriend();
    }
    if (user.friend.status === FriendStatusesEnum.PENDING) {
      if (user.friend.toUserId === userData?._id) {
        navigation.push('Notifications');
      } else {
        await deleteFriend();
      }
    }
    if (user.friend.status === FriendStatusesEnum.ACCEPTED) {
      showAlertSiteModal({
        title: t('alerts.removeFriendTitle'),
        description: t('alerts.removeFriendMessage'),
        confirmText: t('alerts.removeFriend'),
        type: 'removeFriend',
        showUndo: true,
        undoText: t('cancel'),
        onConfirm: async () => {
          await deleteFriendRequest(user.friend._id);
          await fetchFriendDetail();
        },
      });
    }
  };

  const onPressCommonFriendsBox = () => {
    navigation.push('CommonFriends', { friendId: user._id });
  };

  const HeaderComponent = (
    <>
      <Col mt={12} mb={12} gap={8}>
        <UserDetailInfo user={user} isFriend={isFriend} navigation={navigation} />
        <CommonFriendsBox commonFriends={commonFriends} onPress={onPressCommonFriendsBox} />
        <FriendButton onPress={onPressFriendButton} mv={4} user={user} navigation={navigation} loading={loading} />
        {isFriend && <TabSwitch tabs={tabs} selectedTab={selectedTab} onPressTab={setSelectedTab} />}
      </Col>
    </>
  );

  return (
    <Container>
      {!isReady ? (
        <Loader size={'large'} mt={HEIGHT_DEVICE / 3} color={colors.secondary} />
      ) : (
        <>
          <UserDetailStatistics headerComponent={HeaderComponent} user={user} isFriend={isFriend} visible={selectedTab === Tabs.STATISTICS} />
          {/*<UserDetailCommonPees headerComponent={HeaderComponent} user={user} isFriend={isFriend} visible={selectedTab === Tabs.COMMON_PEES} />*/}
          <UserDetailBadges headerComponent={HeaderComponent} user={user} isFriend={isFriend} visible={selectedTab === Tabs.BADGES} />
        </>
      )}
    </Container>
  );
};

const createStyles = ({ shapes, spacing }: Theme) => StyleSheet.create({});
