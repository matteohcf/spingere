import { FlexProps, StyleProps, Theme, User } from '../../../types';
import { Col, Icon, Loader, Row, Text } from '../../../components';
import { StyleSheet, ViewStyle } from 'react-native';
import React, { useMemo, useState } from 'react';
import { useStylesheet } from '../../../hooks/useStylesheet.ts';
import { colors, SHADOW } from '../../../constant';
import { FriendStatusesEnum } from '../../../types/friend.ts';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { t } from 'i18next';
import { useSelector } from 'react-redux';
import { userSelectors } from '../../../store/user.ts';

enum ButtonTypesEnum {
  TOSEND = 'toSend',
  ACCEPTED = 'accepted',
  PENDING = 'pending',
  GOTONOTIFICATIONS = 'goToNotifications',
  ERROR = 'error',
}

type Props = StyleProps &
  FlexProps & {
    user: User;
    navigation: any;
    onPress: () => void;
    loading?: boolean;
    style?: ViewStyle;
    disabled?: boolean;
  };

export const FriendButton = ({ user, navigation, disabled, loading, style, onPress, ...rest }: Props) => {
  const styles = useStylesheet(createStyles);
  const userData = useSelector(userSelectors.detail);

  const buttonType = useMemo(() => {
    if (!user.friend) {
      return ButtonTypesEnum.TOSEND;
    }
    if (user.friend) {
      if (user.friend.status === FriendStatusesEnum.ACCEPTED) {
        return ButtonTypesEnum.ACCEPTED;
      }
      if (user.friend.status === FriendStatusesEnum.PENDING) {
        if (user.friend.toUserId === userData?._id) {
          return ButtonTypesEnum.GOTONOTIFICATIONS;
        } else {
          return ButtonTypesEnum.PENDING;
        }
      }
    }
    return 'error';
  }, [user]);

  const buttonStyle = [styles.container, styles[buttonType], style];
  const buttonStyleDisabled = [styles.container, styles[buttonType], style, { opacity: 0.5 }];
  // @ts-ignore
  const textStyle = [styles[buttonType + 'Text']];

  return (
    <Row style={disabled ? buttonStyleDisabled : buttonStyle} onPress={onPress} {...rest} disabled={disabled}>
      {loading && <Loader color={FRIEND_BUTTON[buttonType].color} />}
      {!loading && (
        <Row>
          <Row flex={1} justifyContent={'center'} alignItems={'center'} gap={5}>
            <Icon size={24} icon={FRIEND_BUTTON[buttonType].icon} color={FRIEND_BUTTON[buttonType].color} />
            <Text style={textStyle} fontWeight={'700'} center>
              {FRIEND_BUTTON[buttonType].text}
            </Text>
          </Row>
        </Row>
      )}
    </Row>
  );
};

const FRIEND_BUTTON: Record<ButtonTypesEnum, { icon: IconProp; color: string; text: string }> = {
  [ButtonTypesEnum.TOSEND]: {
    icon: ['far', 'user-plus'],
    color: colors.white,
    text: t('sendFriendRequest'),
  },
  [ButtonTypesEnum.PENDING]: {
    icon: ['far', 'hourglass-clock'],
    color: colors.white,
    text: t('pendingFriendRequest'),
  },
  [ButtonTypesEnum.ACCEPTED]: {
    icon: ['far', 'user-check'],
    color: colors.black,
    text: t('acceptedFriendRequest'),
  },
  [ButtonTypesEnum.GOTONOTIFICATIONS]: {
    icon: ['far', 'bell'],
    color: colors.black,
    text: t('goToNotifications'),
  },
  [ButtonTypesEnum.ERROR]: {
    icon: ['far', 'x'],
    color: colors.white,
    text: 'Errore',
  },
};

const createStyles = ({ colors }: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.primary,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      height: 56,
      width: '100%',
    },
    error: {
      backgroundColor: colors.negative,
    },
    /*TOSEND*/
    toSend: {
      backgroundColor: colors.primary,
    },
    toSendText: {
      color: colors.white,
      fontSize: 20,
    },
    /*PENDING*/
    pending: {
      backgroundColor: colors.warning,
    },
    pendingText: {
      color: colors.white,
      fontSize: 20,
    },
    /*ACCEPTED*/
    accepted: {
      backgroundColor: colors.white,
      ...SHADOW.SMALL,
    },
    acceptedText: {
      color: colors.black,
      fontSize: 20,
    },
    /*GOTONOTIFICATIONS*/
    goToNotifications: {
      backgroundColor: colors.white,
      ...SHADOW.SMALL,
    },
    goToNotificationsText: {
      color: colors.black,
      fontSize: 20,
    },
  });
