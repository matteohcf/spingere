import React from 'react';
import { useTheme } from '@react-navigation/native';
import { useStylesheet } from '../../../hooks/useStylesheet.ts';
import { useTranslation } from 'react-i18next';
import { Col, ListEmptyComponent, Text } from '../../../components';
import { Theme } from '../../../types';
import { FlatList, StyleSheet } from 'react-native';
import { HEIGHT_DEVICE, spacing, WIDTH_DEVICE } from '../../../constant';
import { Pee } from '../../../types/pee.ts';
import { PeeListRow } from '../../home/history/components/PeeListRow.tsx';
import {ModalManager} from "../../../components/modal/ModalManager.ts";

export type PeeDetailMapModal = {
  navigation: any;
  pees?: Pee[];
};

export const PeeDetailMapModal = ({ navigation, pees }: PeeDetailMapModal) => {
  const { colors } = useTheme();
  const styles = useStylesheet(createStyles);
  const { t } = useTranslation();

  // const onPresPeeDetail = (pee: Pee) => {
  //   ModalManager.hide()
  //   navigation.push('PeeDetail', { pee: pee });
  // };

  return (
    <>
      <Col style={styles.scrollView}>
        <Text fontSize={20} fontWeight={'700'} mb={spacing.lightMargin}>
          {pees?.length} {t('pee in this area')}
        </Text>
        <FlatList
          data={pees}
          style={styles.flatList}
          showsVerticalScrollIndicator={false}
          contentInsetAdjustmentBehavior={'automatic'}
          ListEmptyComponent={<ListEmptyComponent text={'noResults.pees'} />}
          renderItem={({ item, index }) => <PeeListRow pee={item} rightArrow={false} />}
        />
      </Col>
    </>
  );
};

const createStyles = ({ colors, spacing, insets }: Theme) =>
  StyleSheet.create({
    scrollView: {
      paddingHorizontal: spacing.screenHorizontal,
      width: WIDTH_DEVICE,
      height: HEIGHT_DEVICE * 0.55,
      borderRadius: 10,
      marginBottom: 50,
      /* marginTop: spacing.screenVertical,*/
    },
    flatList: {
      paddingTop: spacing.lightMargin,
    }
  });
