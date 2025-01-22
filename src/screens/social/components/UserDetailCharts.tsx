import React from 'react';
import { ScrollView, StyleSheet, View, Dimensions } from 'react-native';
import { BarChart, LineChart } from 'react-native-chart-kit';
import { colors, SHADOW, shapes, spacing, WIDTH_DEVICE } from '../../../constant';
import { Theme, User } from '../../../types';
import { useStylesheet } from '../../../hooks/useStylesheet.ts';
import { useSelector } from 'react-redux';
import { userSelectors } from '../../../store/user.ts';
import _ from 'lodash';
import { t } from 'i18next';
import { getKpi } from '../../../utils/kpi.ts';
import {Col, Text} from "../../../components";

type Props = {
  user: User;
  kpi: any;
};

export const UserDetailCharts = ({ user, kpi }: Props) => {
  const styles = useStylesheet(createStyles);
  const userData = useSelector(userSelectors.detail);

  const myKpi = getKpi(userData?._id || '', kpi);
  const friendKpi = getKpi(user?._id || '', kpi);

  const chartConfig = {
    backgroundGradientFrom: colors.white,
    backgroundGradientTo: colors.white,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    useShadowColorFromDataset: true,
    propsForBackgroundLines: {
      strokeDasharray: '5, 5',
      strokeWidth: 1,
      stroke: 'rgba(0, 0, 0, 0.1)',
    },
    propsForLabels: {
      fontSize: 12,
    },
    propsForVerticalLabels: {
      fontSize: 12,
    },
  };

  const data = {
    labels: [
      t('weeklyDays.monday'),
      t('weeklyDays.tuesday'),
      t('weeklyDays.wednesday'),
      t('weeklyDays.thursday'),
      t('weeklyDays.friday'),
      t('weeklyDays.saturday'),
      t('weeklyDays.sunday'),
    ],
    datasets: [
      {
        data: myKpi,
        color: (opacity = 1) => `rgba(128, 128, 128, ${opacity})`,
        strokeWidth: 2,
      },
      {
        data: friendKpi,
        color: (opacity = 1) => `rgba(43, 130, 255, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: [t('you'), user?.name || t('friend')],
  };

  return (
    <>
      <View style={styles.chartContainer}>
        <LineChart
          data={data}
          width={WIDTH_DEVICE - spacing.screenHorizontal}
          height={220}
          chartConfig={chartConfig}
          bezier
          withShadow={false}
        />
      </View>
    </>
  );
};

const createStyles = ({ colors, spacing, shapes, fontSizes }: Theme) =>
  StyleSheet.create({
    chartContainer: {
      flexGrow: 1,
      alignItems: 'flex-end',
      backgroundColor: colors.white,
      borderRadius: shapes.md,
      padding: spacing.lightMargin,
      ...SHADOW.SMALL
    },
    chart: {
      borderRadius: shapes.sm,
    },
    title: {
      fontSize: fontSizes.lg,
      fontWeight: 'bold',
      color: colors.textPrimary,
    },
  });
