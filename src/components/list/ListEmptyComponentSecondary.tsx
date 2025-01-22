import { Col, Text } from '../ui';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../hooks/useTheme';
import { HEIGHT_DEVICE } from '../../constant';
import { Image, StyleSheet } from 'react-native';
import { userSleeping } from '../../assets';
import React from 'react';
import { Theme } from '../../types';
import { useStylesheet } from '../../hooks/useStylesheet';

type Props = {
  text: string;
  paddingTop?: number;
};
export const ListEmptyComponentSecondary = ({ text, paddingTop = 0 }: Props) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = useStylesheet(createStyles);

  return (
    <Col pt={paddingTop} style={styles.wrapper}>
      <Image tintColor={colors.darkViolet} source={userSleeping} style={styles.image} />
      <Text size={14} fontWeight={'bold'} style={{ lineHeight: 18 }}>
        {t('listEmptyComponentSecondary title')}
      </Text>
      <Text size={14} style={{ lineHeight: 18 }}>
        {text}
      </Text>
    </Col>
  );
};

const createStyles = ({ colors, insets, spacing }: Theme) =>
  StyleSheet.create({
    wrapper: {
      height: HEIGHT_DEVICE,
      alignItems: 'center',
    },
    image: {
      width: 30,
      height: 30,
      marginBottom: 10,
    },
  });
