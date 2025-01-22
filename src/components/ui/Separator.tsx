import React from 'react';
import { StyleSheet } from 'react-native';
import { Row } from './Row';
import { FlexProps, StyleProps, Theme } from '../../types';
import { useTheme } from '../../hooks/useTheme';
import { useStylesheet } from '../../hooks/useStylesheet';
import { Col } from './Col';

type Props = StyleProps &
  FlexProps & {
    status?: number;
  };

export const Separator = ({ status, ...rest }: Props) => {
  const { colors, spacing } = useTheme();
  const styles = useStylesheet(createStyles);
  return (
    <Row {...rest}>
      <Row style={styles.separator} />
      {status && <Col style={[styles.statusContainer, { width: `${status}%` }]} />}
    </Row>
  );
};

const createStyles = ({ colors, spacing }: Theme) =>
  StyleSheet.create({
    separator: {
      width: '100%',
      backgroundColor: colors.bgSurface1,
      height: 1,
      // backgroundColor: colors.black,
      // opacity: 0.1,
    },
    statusContainer: {
      backgroundColor: colors.secondary,
      width: '60%',
      position: 'absolute',
      zIndex: 1,
      height: 2,
    },
  });
