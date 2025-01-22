import { Theme, User } from '../../../types';
import { Row, Text } from '../../../components';
import React from 'react';
import { useStylesheet } from '../../../hooks/useStylesheet.ts';
import { StyleSheet } from 'react-native';

type Props = {
  user?: User;
};

export const StreakPeesBox = ({ user }: Props) => {
  const styles = useStylesheet(createStyles);

  if (!user || !user?.streakPees || user?.streakPees < 1) {
    return null;
  }

  return (
    <Row style={styles.streak}>
      <Text fontSize={14} fontWeight={'500'}>
        🔥
      </Text>
      <Text fontSize={16} fontWeight={'500'} mt={2}>
        {user?.streakPees}
      </Text>
    </Row>
  );
};

const createStyles = ({ shapes, colors }: Theme) =>
  StyleSheet.create({
    streak: {
      // width: 50,
      // height: 25,
      paddingHorizontal: 10.5,
      paddingVertical: 0.5,
      borderRadius: shapes.md,
      backgroundColor: colors.subtle,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 2,
      position: 'absolute',
      bottom: -5,
      right: -5,
    },
  });
