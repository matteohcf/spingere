import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Loader } from '../../../components';
import { colors } from '../../../constant';
import { Theme, User } from '../../../types';
import { useStylesheet } from '../../../hooks/useStylesheet.ts';
import { useSelector } from 'react-redux';
import { userSelectors } from '../../../store/user.ts';
import { UserDetailCharts } from './UserDetailCharts.tsx';
import { getPeesWeeklyKpi } from '../../../api/pee.ts';

type Props = {
  visible: boolean;
  headerComponent?: React.ReactNode;
  user: User;
  isFriend: boolean;
};

export const UserDetailStatistics = ({ visible, headerComponent, user, isFriend }: Props) => {
  const styles = useStylesheet(createStyles);
  const userData = useSelector(userSelectors.detail);
  const [kpi, setKpi] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUserStatistics = async () => {
    try {
      if (!user?._id || !userData?._id || !isFriend) {
        return;
      }
      setLoading(true);
      const kpi = await getPeesWeeklyKpi([user?._id, userData?._id]);
      if (kpi) {
        setKpi(kpi);
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserStatistics();
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
      {headerComponent}
      {isFriend && (
        <>
          {loading && <Loader color={colors.secondary} />}
          {!loading && (
            <>
              <UserDetailCharts user={user} kpi={kpi} />
            </>
          )}
        </>
      )}
    </ScrollView>
  );
};

const createStyles = ({ colors, spacing, shapes, fontSizes }: Theme) =>
  StyleSheet.create({
    scrollView: {
      marginTop: spacing.lightMargin,
    },
  });
