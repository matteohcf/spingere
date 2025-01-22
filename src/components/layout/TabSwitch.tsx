import React from 'react';
import { StyleSheet } from 'react-native';
import { BoxProps, Row, Text } from '../ui';
import { Theme } from '../../types';
import { useTranslation } from 'react-i18next';
import {useStylesheet} from "../../hooks/useStylesheet.ts";

type Props = {
  tabs: string[];
  selectedTab: string;
  onPressTab: (newTab: string) => void;
} & BoxProps;

export const TabSwitch = ({ tabs, selectedTab, onPressTab, ...rest }: Props) => {
  const { t } = useTranslation();
  const styles = useStylesheet(createStyles);

  return (
    <Row {...rest} style={styles.container}>
      {tabs.map(tab => {
        const isSelected = tab === selectedTab;
        return (
          <Row
            key={tab}
            flex={1}
            h={48}
            pv={12}
            ph={8}
            gap={4}
            style={isSelected ? styles.selectedTab : styles.tab}
            alignItems={'center'}
            justifyContent={'center'}
            onPress={() => onPressTab(tab)}>
            <Text fontSize={14} fontWeight={isSelected ? '700' : '500'} color={isSelected ? 'primary' : 'textPrimary'}>
              {t(`tabs.${tab}`)}
            </Text>
          </Row>
        );
      })}
    </Row>
  );
};

const createStyles = ({ colors }: Theme) =>
  StyleSheet.create({
    container: {
      borderColor: colors.borderDefault,
      borderTopWidth: 0,
      borderBottomWidth: 1,
      borderLeftWidth: 0,
      borderRightWidth: 0,
    },
    tab: {
    },
    selectedTab: {
      borderColor: colors.primary,
      borderTopWidth: 0,
      borderBottomWidth: 2,
      borderLeftWidth: 0,
      borderRightWidth: 0,
    }
  });
