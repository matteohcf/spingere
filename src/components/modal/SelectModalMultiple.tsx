import React, { useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import {Button, Col, Icon, Row, Text} from '../ui';
import { useTheme } from '../../hooks/useTheme';
import { HEIGHT_DEVICE, WIDTH_DEVICE } from '../../constant';
import { Theme } from '../../types';
import { useStylesheet } from '../../hooks/useStylesheet';

import { useTranslation } from 'react-i18next';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll.ts';
import { SelectRow } from './components/SelectRow.tsx';
import { appAxios } from '../../api/config.ts';
import { ModalManager } from './ModalManager.ts';
import { trigger } from 'react-native-haptic-feedback';
import { InputSearch } from '../ui/InputSearch.tsx';
import { ListEmptyComponent } from '../ui/ListEmptyComponent.tsx';
import {KeyboardAwareFlatList} from "react-native-keyboard-aware-scroll-view";
import {OdinKeyboardAwareFlatList} from "../ui/OdinKeyboardAwareFlatList.tsx";

export type SelectModalMultipleProps = {
  keyProp: string;
  entity: string;
  filters?: any;
  onSelect: (value: any) => void;
  value?: any;
  title?: string;
  rowValue?: any;
  inputSearch?: boolean;
};

export const SelectModalMultiple = ({
  keyProp,
  entity,
  filters = {},
  onSelect,
  title,
  value,
  rowValue = 'name',
  inputSearch = false,
}: SelectModalMultipleProps) => {
  const { colors, spacing } = useTheme();
  const styles = useStylesheet(createStyles);
  const [search, setSearch] = useState('');
  const { t } = useTranslation();

  const [selectedItems, setSelectedItems] = useState(value || []);

  const { ...infiniteScrollProps } = useInfiniteScroll<any>({
    key: keyProp,
    url: entity,
    axiosInstance: appAxios,
    limit: 20,
    filters: {
      ...filters,
      q: search,
    },
  });
  console.log('key', keyProp);
  console.log('filters', filters);
  console.log('entity', entity);
  console.log('search', inputSearch, ':', search);
  console.log(infiniteScrollProps);

  const options = infiniteScrollProps.data.map((item, index) => ({
    label: item[rowValue],
    value: item._id,
  }));

  const onPressConfirm = () => {
    const itemLabel = options
      .filter((item: any) => selectedItems.includes(item.value))
      .map((item: any) => item.label)
      .join(', ');
    const formattedItem = {
      value: selectedItems,
      label: itemLabel,
    };
    onSelect(formattedItem);
    ModalManager.hide();
  };

  const selectItem = (item: any) => {
    if (!selectedItems.includes(item.value)) {
      setSelectedItems([...selectedItems, item.value]);
    } else {
      setSelectedItems(selectedItems.filter((selectedItem: any) => selectedItem !== item.value));
    }
  };

  return (
    <Col>
      <Col style={styles.container}>
        <Text fontWeight={'700'} fontSize={20} mb={8}>
          {title || t('select modal title')}
        </Text>
        {inputSearch && <InputSearch value={search} onChangeText={setSearch} />}
        <OdinKeyboardAwareFlatList
          {...infiniteScrollProps}
          data={options}
          showsVerticalScrollIndicator={false}
          contentInsetAdjustmentBehavior={'automatic'}
          ListEmptyComponent={() => <ListEmptyComponent text={t('noData')} />}
          style={{
            width: '100%',
            height: '100%',
          }}
          contentContainerStyle={{
            paddingTop: 8,
          }}
          renderItem={({ item }) => (
            <SelectRow
              multiple
              checked={selectedItems.includes(item.value)}
              item={item}
              onPress={() => {
                trigger('impactLight');
                selectItem(item);
              }}
            />
          )}
        />
      </Col>
      <Col style={styles.absoluteButton}>
        <Button variant={'gradient'} text={t('confirm')} onPress={() => onPressConfirm()} />
      </Col>
    </Col>
  );
};

const createStyles = ({ colors, spacing, insets }: Theme) =>
  StyleSheet.create({
    container: {
      alignItems: 'flex-start',
      paddingHorizontal: spacing.screenHorizontal,
      width: WIDTH_DEVICE,
      height: HEIGHT_DEVICE * 0.8,
      borderRadius: 10,
      marginBottom: 50,
     /* marginTop: spacing.screenVertical,*/
    },
    absoluteButton: {
      backgroundColor: colors.white,
      position: 'absolute',
      bottom: insets.safeBottom,
      zIndex: 1,
      width: WIDTH_DEVICE,
      paddingTop: spacing.screenVertical,
      paddingHorizontal: spacing.screenHorizontal,
    },
  });
