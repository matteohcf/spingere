import React from 'react';
import { StyleSheet } from 'react-native';
import Image from 'react-native-fast-image';
import { useStylesheet } from '../../../hooks/useStylesheet.ts';
import { getOdinImage } from '../../../utils/images.ts';
import { Col, Icon, Row, Separator, Text } from '../../../components';
import { Theme } from '../../../types';
import { colors } from '../../../constant';
import { getInitials } from '../../../utils/user.ts';
import { useProfileImageColor } from '../../../hooks/useProfileImageColor.ts';
import { Leaderboard } from '../../../types/leaderboard.ts';
import { t } from 'i18next';
import { useSelector } from 'react-redux';
import { userSelectors } from '../../../store/user.ts';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

type Props = {
  leaderboard: Leaderboard;
  index: number;
  onPress?: () => void;
};

export const LeaderBoardListRow = ({ leaderboard, index, onPress }: Props) => {
  const styles = useStylesheet(createStyles);
  const initial = getInitials(leaderboard.user);
  const color = useProfileImageColor(leaderboard.user);
  const userData = useSelector(userSelectors.detail);
  const isMe = userData?._id === leaderboard.user?._id;

  const image = getOdinImage({
    image: leaderboard.user?.profileImage,
  });

  return (
    <Row mb={16} flex={1} onPress={onPress}>
      <Col justifyContent={'center'} w={40} alignItems={'center'} ml={-8}>
        {index < 3 && <Icon icon={LEADERBOARD_ICON[index + 1].icon} color={LEADERBOARD_ICON[index + 1].color} size={28} />}
        {index >= 3 && (
          <Text color={colors.textPrimary} fontWeight={'500'} fontSize={20}>
            {index + 1}
          </Text>
        )}
      </Col>
      <Col>
        {image && <Image source={image} style={styles.avatar} />}
        {!image && (
          <Col bgColor={color} style={styles.avatar} justifyContent={'center'} alignItems={'center'}>
            {initial && (
              <Text color={colors.white} fontSize={20} fontWeight={'700'}>
                {initial}
              </Text>
            )}
            {!initial && <Icon icon={['far', 'user']} color={colors.white} size={20} />}
          </Col>
        )}
      </Col>
      <Col flex={1} justifyContent={'center'} mt={4}>
        <Row>
          <Col flex={1}>
            <Text style={isMe ? styles.isMeText : styles.notMeText} color={colors.textPrimary}>
              {leaderboard?.user?.name} {leaderboard?.user?.surname} {isMe ? '(' + t('you') + ')' : ''}
            </Text>
            <Text mt={2} fontWeight={'400'} fontSize={12} color={colors.textSecondary}>
              @{leaderboard?.user?.username}
            </Text>
          </Col>
          <Row justifyContent={'center'} alignItems={'center'} gap={2}>
            <Text fontWeight={'500'} fontSize={24} color={colors.textPrimary}>
              {leaderboard?.count}
            </Text>
            <Text fontWeight={'400'} mt={6} fontSize={12} color={colors.textPrimary}>
              {t('pee')}
            </Text>
          </Row>
        </Row>
        <Row flex={1}></Row>
        <Separator />
      </Col>
    </Row>
  );
};

const LEADERBOARD_ICON: Record<number, { color: string; icon: IconProp }> = {
  [1]: { color: '#ffc702', icon: ['far', 'award'] },
  [2]: { color: '#b6c2cd', icon: ['far', 'award-simple'] },
  [3]: { color: '#d19c6e', icon: ['far', 'award-simple'] },
};

const createStyles = ({ colors }: Theme) =>
  StyleSheet.create({
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 16,
    },
    isMeText: {
      fontWeight: '700',
      fontSize: 16,
    },
    notMeText: {
      fontWeight: '500',
      fontSize: 16,
    },
  });
