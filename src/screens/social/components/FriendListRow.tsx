import React from 'react';
import { StyleSheet } from 'react-native';
import Image from 'react-native-fast-image';
import { useStylesheet } from '../../../hooks/useStylesheet.ts';
import { getOdinImage } from '../../../utils/images.ts';
import { Col, Icon, Row, Separator, Text } from '../../../components';
import { Theme, User } from '../../../types';
import { colors } from '../../../constant';
import { getInitials } from '../../../utils/user.ts';
import { useProfileImageColor } from '../../../hooks/useProfileImageColor.ts';
import { useSelector } from 'react-redux';
import { userSelectors } from '../../../store/user.ts';
import { t } from 'i18next';

type Props = {
  user: User;
  onPress?: () => void;
};

export const FriendListRow = ({ user, onPress }: Props) => {
  const styles = useStylesheet(createStyles);
  const initial = getInitials(user);
  const color = useProfileImageColor(user);
  const userData = useSelector(userSelectors.detail);
  const isMe = userData?._id === user?._id;

  const image = getOdinImage({
    image: user?.profileImage,
  });

  return (
    <Row mb={16} flex={1} onPress={onPress}>
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
        {/*<Text fontWeight={'500'} fontSize={16} color={colors.textPrimary}>*/}
        {/*  {user?.name} {user?.surname}*/}
        {/*</Text>*/}
        <Text style={isMe ? styles.isMeText : styles.notMeText} color={colors.textPrimary}>
          {user?.name} {user?.surname} {isMe ? '(' + t('you') + ')' : ''}
        </Text>
        <Text mt={2} fontWeight={'400'} fontSize={12} color={colors.textSecondary}>
          @{user?.username}
        </Text>
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
    isMeText: {
      fontWeight: '700',
      fontSize: 16,
    },
    notMeText: {
      fontWeight: '500',
      fontSize: 16,
    },
  });
