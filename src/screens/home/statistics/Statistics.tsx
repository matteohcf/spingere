import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Col, Loader } from '../../../components';
import { BarChart } from 'react-native-chart-kit';
import { colors, SHADOW, spacing, WIDTH_DEVICE } from '../../../constant';
import { Theme } from '../../../types';
import { useStylesheet } from '../../../hooks/useStylesheet.ts';
import { useSelector } from 'react-redux';
import { userSelectors } from '../../../store/user.ts';
import { t } from 'i18next';
import { getKpi } from '../../../utils/kpi.ts';
import { fromIsoToHumanDateTime } from '../../../utils/date.ts';
import { InfoBoxWithIcon } from '../components/InfoBoxWithIcon.tsx';
import { useApiUseQuery } from '../../../hooks/useApiUseQuery.ts';

type Props = {
  visible: boolean;
  headerComponent?: React.ReactNode;
};

export const Statistics = ({ visible, headerComponent }: Props) => {
  const styles = useStylesheet(createStyles);
  const userData = useSelector(userSelectors.detail);
  const { data, isLoading, error } = useApiUseQuery({
    queryKey: ['peesWeeklyKpi'],
    queryUrl: 'pees/weekly/kpi',
    filters: { friendIds: [userData?._id] },
  });

  const myKpi = getKpi(userData?._id || '', data || []);

  if (!visible) {
    return null;
  }

  const chartConfig = {
    backgroundGradientFrom: colors.white,
    backgroundGradientTo: colors.white,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(43, 130, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    barPercentage: 0.8,
    propsForLabels: {
      fontSize: 12,
    },
    propsForVerticalLabels: {
      fontSize: 12,
    },
  };

  const weeklyDays = {
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
        color: (opacity = 1) => `rgba(81, 152, 114, ${opacity})`,
      },
    ],
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
      {headerComponent}
      <Col gap={12} mb={12}>
        <InfoBoxWithIcon title={t('total pees').toUpperCase()} subtitle={userData?.totalPees?.toString() || '0'} icon={['fal', 'droplet']} />
        <InfoBoxWithIcon title={t('pees today').toUpperCase()} subtitle={userData?.dailyPees?.toString() || '0'} icon={['fal', 'calendar-check']} />
        <InfoBoxWithIcon title={t('last pee').toUpperCase()} subtitle={fromIsoToHumanDateTime(userData?.lastPee)} icon={['fal', 'clock']} />
      </Col>
      {!isLoading && (
        <View style={styles.chartContainer}>
          <BarChart
            style={styles.chart}
            data={weeklyDays}
            width={WIDTH_DEVICE - spacing.screenHorizontal}
            height={220}
            chartConfig={chartConfig}
            yAxisSuffix={''}
            yAxisLabel={''}
            withHorizontalLabels={false}
            showValuesOnTopOfBars={true}
            withInnerLines={false}
          />
        </View>
      )}
      {isLoading && <Loader color={colors.secondary} />}
    </ScrollView>
  );
};

const createStyles = ({ colors, spacing, shapes, insets }: Theme) =>
  StyleSheet.create({
    scrollView: {
      paddingBottom: insets.safeBottom,
    },
    chartContainer: {
      flexGrow: 1,
      alignItems: 'flex-end',
      backgroundColor: colors.white,
      borderRadius: shapes.md,
      paddingVertical: spacing.lightMargin,
      paddingRight: 20,
      ...SHADOW.SMALL,
    },
    chart: {
      borderRadius: shapes.sm,
    },
  });
