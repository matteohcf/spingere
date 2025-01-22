import { BoxProps } from './Box';
import { Text } from './Text';
import { Col } from './Col';
import React from 'react';
import { Theme } from '../../types';
import { StyleSheet } from 'react-native';
import { useStylesheet } from '../../hooks/useStylesheet';
import { colors } from '../../constant';

type ChipProps = {
  value: string;
  textColor?: string;
  fontSize?: number;
  color?: string;
  selected?: boolean;
} & BoxProps;

export const Chip = ({ selected, value, style, fontSize = 14, ...rest }: ChipProps) => {
  const styles = useStylesheet(createStyles);

  return (
    <Col justifyContent={'center'} alignItems={'center'} style={[selected ? styles.containerSelected : styles.container, style]} {...rest}>
      <Text color={selected ? colors.bgPrimary : colors.textPrimary} fontWeight={'500'} fontSize={fontSize}>
        {value}
      </Text>
    </Col>
  );
};

const createStyles = ({ colors }: Theme) =>
  StyleSheet.create({
    container: {
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.bgSurface2,
      backgroundColor: colors.bgSurface1,
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    containerSelected: {
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.bgSurface2,
      backgroundColor: colors.primary,
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
  });
