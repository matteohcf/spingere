import React from 'react';
import { StyleSheet } from 'react-native';
import { useStylesheet } from '../../../hooks/useStylesheet.ts';
import { Col, Icon, Row, Separator, Text } from '../../../components';
import { colors } from '../../../constant';
import { Theme } from '../../../types';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

type Props = {
  icon?: IconProp;
  title?: string;
  subtitle?: string;
};

export const GeneralNotificationListRow = ({ icon, title = '', subtitle = '' }: Props) => {
  const styles = useStylesheet(createStyles);

  return (
    <Row flex={1} mb={16}>
      <Col bgColor={'bgSurface1'} style={styles.avatar} justifyContent={'center'}>
        <Icon icon={icon} size={24} color={colors.secondary} />
      </Col>
      <Col flex={1} justifyContent={'center'} mt={4}>
        <Text fontWeight={'500'} fontSize={16} color={colors.textPrimary}>
          {title}
        </Text>
        <Text mt={2} fontWeight={'400'} fontSize={12} color={colors.textSecondary}>
          {subtitle}
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
  });
