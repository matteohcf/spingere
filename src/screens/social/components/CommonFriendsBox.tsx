import React, { useEffect, useMemo, useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Col, Icon, Row, Text } from '../../../components';
import { User } from '../../../types';
import { t } from 'i18next';
import { useProfileImageColor } from '../../../hooks/useProfileImageColor.ts';
import { colors, spacing, WIDTH_DEVICE } from '../../../constant';
import { getInitials } from '../../../utils/user.ts';
import { getOdinImage } from '../../../utils/images.ts';

type Props = {
  commonFriends: User[];
  size?: number;
  onPress?: () => void;
};

export const CommonFriendsBox = ({ commonFriends, size = 32, onPress }: Props) => {
  const [loading, setLoading] = useState(false);
  const profileImageStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    marginRight: -10,
  };

  const DISPLAYED_FRIENDS = 2;

  const commonFriendsNumber = useMemo(() => {
    return Math.max(0, commonFriends.length - DISPLAYED_FRIENDS);
  }, [commonFriends.length]);

  if (!commonFriends.length) {
    return null;
  }

  const renderFriendAvatar = (friend: User) => {
    const initial = getInitials(friend);
    const color = useProfileImageColor(friend);
    const profileImage = getOdinImage({ image: friend?.profileImage });

    if (!friend?._id) {
      return null;
    }

    return (
      <Col key={friend?._id}>
        {profileImage ? (
          <Image source={profileImage} style={profileImageStyle} />
        ) : (
          <Col bgColor={color} style={profileImageStyle} justifyContent={'center'} alignItems={'center'}>
            {initial ? (
              <Text color={colors.white} fontSize={14} fontWeight={'400'}>
                {initial}
              </Text>
            ) : (
              <Icon icon={['far', 'user']} color={colors.white} size={14} />
            )}
          </Col>
        )}
      </Col>
    );
  };

  return (
    <Row alignItems={'center'} onPress={onPress}>
      <Row>{commonFriends.slice(0, DISPLAYED_FRIENDS).map(renderFriendAvatar)}</Row>
      <Row ml={14}>
        <Col w={WIDTH_DEVICE / 1.5}>
          <Text fontSize={14} fontWeight={'500'}>
            {t('common friends')}
            {commonFriends.slice(0, DISPLAYED_FRIENDS).map((item: any, index) => (
              <Text key={item?._id} fontSize={14} fontWeight={'700'}>
                {item?.username}
                {commonFriends.length - 1 !== index && ', '}
              </Text>
            ))}
            {commonFriendsNumber > 0 && (
              <Text fontSize={14} fontWeight={'500'}>
                {t(' and')} {commonFriendsNumber} {t('more')}
              </Text>
            )}
          </Text>
        </Col>
      </Row>
    </Row>
  );
};

const styles = StyleSheet.create({});
