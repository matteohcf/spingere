import React, {useState} from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Col, Text } from '../ui';
import { useTheme } from '../../hooks/useTheme';
import { HEIGHT_DEVICE, WIDTH_DEVICE } from '../../constant';
import { Theme } from '../../types';
import { useStylesheet } from '../../hooks/useStylesheet';

import { useTranslation } from 'react-i18next';
import { ModalManager } from './ModalManager.ts';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll.ts';
import { SelectRow } from './components/SelectRow.tsx';
import { masterAxios } from '../../api/config.ts';

export type SelectModalProps = {
  key: string;
  entity: string;
  filters?: any;
  onSelect: (value: any) => void;
  title?: string;
};

export const SelectModal = ({ key, entity, filters = {}, onSelect, title }: SelectModalProps) => {
  const { colors, spacing } = useTheme();
  const styles = useStylesheet(createStyles);
  const { t } = useTranslation();

  const { ...infiniteScrollProps } = useInfiniteScroll<any>({
    key: key,
    url: entity,
    axiosInstance: masterAxios,
    limit: 10,
    filters: filters,
  });
  console.log('filters', filters);
  console.log('entity', entity);
  console.log(infiniteScrollProps);

  /*const options = [
    {
      label: t("ProcessSelectModal option 1"),
      value: "",
    },
    {
      label: t("ProcessSelectModal option 2"),
      value: "",
    },
  ];*/

  const options = infiniteScrollProps.data.map((item, index) => ({
    label: item.name,
    value: item._id,
  }));

  return (
    <Col style={styles.container}>
      <Text fontWeight={'700'} fontSize={15}>
        {title || t('select modal title')}
      </Text>
      <FlatList
        {...infiniteScrollProps}
        data={options}
        /*style={styles.scrollView}*/
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior={'automatic'}
        ListEmptyComponent={() => <Text>{t('ProcessSelectModal noData')}</Text>}
        style={{
          width: '100%',
          height: '100%',
        }}
        contentContainerStyle={{
          paddingTop: spacing.screenVertical,
        }}
        renderItem={({ item }) => (
          <SelectRow
            item={item}
            onPress={() => {
              // @ts-ignore
              onSelect(item);
              ModalManager.hide();
            }}
          />
        )}
      />
    </Col>
  );
};

const createStyles = ({ colors, spacing }: Theme) =>
  StyleSheet.create({
    container: {
      alignItems: 'flex-start',
      paddingHorizontal: spacing.screenHorizontal,
      width: WIDTH_DEVICE,
      height: HEIGHT_DEVICE * 0.8,
      borderRadius: 10,
      marginBottom: 50,
      marginTop: spacing.screenVertical,
    },
  });
