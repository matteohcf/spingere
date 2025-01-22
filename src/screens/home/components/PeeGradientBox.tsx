import React from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useStylesheet } from '../../../hooks/useStylesheet.ts';
import { Theme } from '../../../types';
import { Row } from '../../../components';

type Props = {
  children: React.ReactNode;
  colors: string[];
  onPress?: () => void;
  angle?: number;
};

export const PeeGradientBox = ({ children, colors, onPress, angle = 90 }: Props) => {
  const styles = useStylesheet(createStyles);

  return (
    <LinearGradient colors={colors} useAngle angle={angle} style={styles.container}>
      <Row alignItems={'center'} onPress={onPress}>
        <Row flex={1} alignItems={'center'}>
          {children}
        </Row>
      </Row>
    </LinearGradient>
  );
};

const createStyles = ({ colors }: Theme) =>
  StyleSheet.create({
    container: {
      width: 300,
      height: 300,
      borderRadius: 150,
      borderWidth: 6,
      borderColor: colors.borderDefault,
      justifyContent: 'center',
    },
  });
