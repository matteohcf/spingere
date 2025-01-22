import { Col, Icon, Row, Text } from '../../../components';
import { spacing } from '../../../constant';
import { UserDetailImage } from './UserDetailImage.tsx';
import React from 'react';
import { Theme, User } from '../../../types';
import { t } from 'i18next';
import { fromIsoToHumanDateTime, fromIsoToTime, isToday } from '../../../utils/date.ts';
import { useStylesheet } from '../../../hooks/useStylesheet.ts';
import { StyleSheet } from 'react-native';
import { StreakPeesBox } from './StreakPeesBox.tsx';

type Props = {
  user: User;
  isFriend: boolean;
  navigation: any;
};

export const UserDetailInfo = ({ user, isFriend, navigation }: Props) => {
  const styles = useStylesheet(createStyles);
  const isLastPeeToday = isToday(user?.lastPee);

  const onPressTotalFriends = () => {
    if (!isFriend) return;
    navigation.push('FriendsOfFriends', { friend: user });
  };

  return (
    <>
      <Row>
        <Col>
          <UserDetailImage user={user} />
          <StreakPeesBox user={user} />
        </Col>
        <Row alignItems={'center'} justifyContent={'space-between'} flex={1} ml={spacing.screenHorizontal}>
          <Col alignItems={'center'}>
            <Text fontSize={16} fontWeight={'500'}>
              {user?.totalPees}
            </Text>
            <Text fontSize={12} fontWeight={'400'}>
              {t('pee')}
            </Text>
          </Col>
          <Col alignItems={'center'}>
            <Text fontSize={16} fontWeight={'500'}>
              {user?.dailyPees}
            </Text>
            <Text fontSize={12} fontWeight={'400'}>
              {t('pees today')}
            </Text>
          </Col>
          <Col alignItems={'center'} onPress={onPressTotalFriends}>
            <Text fontSize={16} fontWeight={'500'}>
              {user?.totalFriends}
            </Text>
            <Text fontSize={12} fontWeight={'400'}>
              {t('friends')}
            </Text>
          </Col>
          {isLastPeeToday && (
            <Col alignItems={'center'}>
              <Text fontSize={16} fontWeight={'500'}>
                {fromIsoToTime(user?.lastPee)}
              </Text>
              <Text fontSize={12} fontWeight={'400'}>
                {t('last pee')}
              </Text>
            </Col>
          )}
        </Row>
      </Row>
      <Col>
        <Text fontSize={14} fontWeight={'500'}>
          {user?.name} {user?.surname}
        </Text>
      </Col>
    </>
  );
};

const createStyles = ({ shapes, spacing, colors }: Theme) => StyleSheet.create({});
