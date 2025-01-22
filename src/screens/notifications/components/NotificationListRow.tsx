import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import Image from 'react-native-fast-image';
import { useStylesheet } from '../../../hooks/useStylesheet.ts';
import { getOdinImage } from '../../../utils/images.ts';
import { defaultAvatar } from '../../../assets';
import { Col, Icon, Loader, Row, Separator, Text } from '../../../components';
import { Theme, User } from '../../../types';
import { colors } from '../../../constant';
import { getInitials } from '../../../utils/user.ts';
import { useProfileImageColor } from '../../../hooks/useProfileImageColor.ts';
import { Friend } from '../../../types/friend.ts';

type Props = {
  user: User;
  onPress: () => void;
  onPressAccept: () => void;
  onPressReject: () => void;
  loading: LoadingTypesEnum | undefined;
};

enum LoadingTypesEnum {
  ACCEPT = 'accept',
  REJECT = 'reject',
}

export const NotificationListRow = ({ user, onPressAccept, onPressReject, loading, onPress }: Props) => {
  const styles = useStylesheet(createStyles);
  const initial = getInitials(user);
  const color = useProfileImageColor(user);

  const image = getOdinImage({
    image: user?.profileImage,
  });

  return (
    <Row flex={1} mb={16} onPress={onPress}>
      <Col>
        {image && <Image source={image} style={styles.avatar} />}
        {!image && (
          <Col bgColor={color} style={styles.avatar} justifyContent={'center'} alignItems={'center'}>
            {initial && (
              <Text color={colors.white} fontSize={20} fontWeight={'500'}>
                {initial}
              </Text>
            )}
            {!initial && <Icon icon={['far', 'user']} color={colors.white} size={20} />}
          </Col>
        )}
      </Col>
      <Col flex={1} justifyContent={'center'} mt={4}>
        <Row gap={8}>
          <Col flex={1}>
            <Text fontWeight={'500'} fontSize={16} color={colors.textPrimary}>
              {user?.name} {user?.surname}
            </Text>
            <Text mt={2} fontWeight={'400'} fontSize={12} color={colors.textSecondary}>
              @{user?.username}
            </Text>
          </Col>
          <Col bgColor={'primary'} h={36} w={36} br={8} justifyContent={'center'} onPress={onPressAccept}>
            {loading !== LoadingTypesEnum.ACCEPT && <Icon icon={['far', 'check']} size={20} color={colors.white} />}
            {loading === LoadingTypesEnum.ACCEPT && <Loader color={colors.white} />}
          </Col>
          <Col bgColor={'error'} h={36} w={36} br={8} justifyContent={'center'} onPress={onPressReject}>
            {loading !== LoadingTypesEnum.REJECT && <Icon icon={['far', 'x']} size={20} color={colors.white} />}
            {loading === LoadingTypesEnum.REJECT && <Loader color={colors.white} />}
          </Col>
        </Row>
        <Row flex={1}></Row>
        <Separator />
      </Col>
    </Row>
  );
};

const createStyles = ({ colors }: Theme) =>
  StyleSheet.create({
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 16,
    },
  });
