import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Loader } from '../../../components';
import { colors } from '../../../constant';
import { Theme, User } from '../../../types';
import { useStylesheet } from '../../../hooks/useStylesheet.ts';
import { useSelector } from 'react-redux';
import { userSelectors } from '../../../store/user.ts';
import { UserDetailMap } from './UserDetailMap.tsx';
import { getPeesMap } from '../../../api/pee.ts';
import { useFocusEffect } from '@react-navigation/native';

type Props = {
  visible: boolean;
  headerComponent?: React.ReactNode;
  user: User;
  isFriend: boolean;
};

export const UserDetailCommonPees = ({ visible, headerComponent, user, isFriend }: Props) => {
  const styles = useStylesheet(createStyles);
  const userData = useSelector(userSelectors.detail);
  const [userPeesMap, setUserPeesMap] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCommonPees = async () => {
    try {
      if (!user?._id || !userData?._id || !isFriend) {
        return;
      }
      setLoading(true);
      const map = await getPeesMap([user?._id, userData?._id], true);
      if (map) {
        setUserPeesMap(map);
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getCommonPees();
    }, []),
  );

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
              <UserDetailMap user={user} userPeesMap={userPeesMap} />
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
