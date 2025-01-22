import React from 'react';
import {Col, Text} from '../ui';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {Theme} from '../../types';
import {useStylesheet} from '../../hooks/useStylesheet.ts';
import {WIDTH_DEVICE} from '../../constant';

type Props = {
  text: string;
  showImage?: boolean;
};

export const ListEmptyComponent = ({ text, showImage = true }: Props) => {
  const { t } = useTranslation();
  const styles = useStylesheet(createStyles);
  return (
    <Col alignItems={'center'} justifyContent={'center'} mt={50} gap={16} ph={20}>
      <Text center={true} fontSize={16}>
        {t(text)}
      </Text>
    </Col>
  );
};

const createStyles = ({ insets }: Theme) =>
  StyleSheet.create({
    imageContainer: {},
    image: {
      height: WIDTH_DEVICE * 0.5,
      aspectRatio: 1,
      resizeMode: 'contain',
    },
  });
