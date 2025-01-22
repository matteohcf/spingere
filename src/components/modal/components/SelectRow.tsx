import React from 'react';
import { Checkbox, Row, Text } from '../../ui';
import { useTranslation } from 'react-i18next';
import { Theme } from '../../../types';
import { StyleSheet } from 'react-native';
import { useStylesheet } from '../../../hooks/useStylesheet.ts';

type Props = {
  item: any;
  onPress: (item: any) => void;
  multiple?: boolean;
  checked?: boolean;
};

export const SelectRow = ({ item, onPress, multiple = false, checked }: Props) => {
  const { t } = useTranslation();
  const styles = useStylesheet(createStyles);

  return (
    <Row alignItems={'center'} justifyContent={'space-between'} pb={5} style={styles.container} mb={12} onPress={() => onPress(item)}>
      <Text fontSize={14} fontWeight={'500'} numberOfLines={1} lineHeight={24} color={'black'}>
        {item?.label}
      </Text>
      {multiple && <Checkbox br={4} checked={checked} />}
    </Row>
  );
};

const createStyles = ({ shapes, colors }: Theme) =>
  StyleSheet.create({
    container: {
      borderBottomWidth: 1,
      borderBottomColor: '#E5E5E5',
    },
  });
