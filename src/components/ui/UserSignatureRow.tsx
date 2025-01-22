import React from 'react';
import {StyleSheet} from 'react-native';
import {Col, Text} from '../ui';
import {StyleProps, Theme, User} from '../../types';
import {useTheme} from '../../hooks/useTheme';
import {useStylesheet} from '../../hooks/useStylesheet';
import {useTranslation} from 'react-i18next';

type UserSignaturetRowProps = StyleProps & {
  user: User;
};

export const UserSignatureRow = ({user, ...rest}: UserSignaturetRowProps) => {
  const {colors, spacing} = useTheme();
  const styles = useStylesheet(createStyles);
  const {t} = useTranslation();

  return (
    <Col mb={20} style={[styles.container]} w={'100%'} {...rest}>
      <Text numberOfLines={1} fontWeight={'300'} fontSize={18}>
        {/*{user?.name + ' ' + user?.surname}*/} user name surname{' '}
        {t('already signature')}
      </Text>
    </Col>
  );
};

const createStyles = ({colors, spacing}: Theme) =>
  StyleSheet.create({
    container: {},
    descriptionContainer: {
      backgroundColor: '#D9D9D9',
      paddingHorizontal: 13,
      height: 22,
      borderRadius: 10,
    },
  });
