import { Image, StyleSheet } from 'react-native';
import React from 'react';
import { Button, Col, Text } from '../../../components';
import { Theme } from '../../../types';
import { useStylesheet } from '../../../hooks/useStylesheet';
import { WIDTH_DEVICE } from '../../../constant';
import { useTranslation } from 'react-i18next';
import { store } from '../../../store';
import { userActions } from '../../../store/user.ts';

type ActivationStepCardProps = {
  data: {
    image: any;
    title: string;
    subtitle: string;
  };
  index: number;
};

export const ActivationStepCard = ({ data, index }: ActivationStepCardProps) => {
  const styles = useStylesheet(createStyles);
  const { t } = useTranslation();
  const isLast = index === 5;
  const { image, title, subtitle } = data;

  const onPressContinue = () => {
    store.dispatch(userActions.setVisitedTutorial(true));
  };

  return (
    <Col alignItems={'center'} w={WIDTH_DEVICE} style={styles.container}>
      <Col w={'100%'} flex={1}>
        <Image resizeMode={'contain'} source={image} style={styles.image} />
      </Col>
      <Col bgColor={'primaryLight'} br={24} w={'100%'} p={12} mt={10}>
        <Text color={'white'} fontWeight={'700'} fontSize={24} mb={10}>
          {t(title)}
        </Text>
        <Text color={'white'} fontSize={16} lineHeight={22}>
          {t(subtitle)}
        </Text>
      </Col>
      {isLast && <Button mt={10} text={t('continue')} onPress={onPressContinue} />}
    </Col>
  );
};

const createStyles = ({ spacing, insets }: Theme) =>
  StyleSheet.create({
    container: {
      width: WIDTH_DEVICE,
      paddingHorizontal: spacing.screenHorizontal,
      paddingTop: insets.top,
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: 25,
      objectFit: 'cover',
    },
    bottomContainer: {
      position: 'absolute',
      bottom: 100,
    },
    imageContainer: {
      marginTop: 132,
      backgroundColor: '#e7e7f5',
      borderRadius: 100,
    },
  });
