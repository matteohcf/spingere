import React from 'react';
import { StyleSheet } from 'react-native';
import { useStylesheet } from '../../hooks/useStylesheet.ts';
import { Row } from '../ui';
import { Theme } from '../../types';

type Props = {};

export const ListSeparator = ({}: Props) => {
  const styles = useStylesheet(createStyles);

  return <Row style={styles.separator} />;
};

const createStyles = ({ colors }: Theme) =>
  StyleSheet.create({
    separator: {
      borderBottomWidth: 1,
      borderBlockColor: colors.borderDefault,
      flex: 1,
    },
  });
