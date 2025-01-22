import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from './Text';
import { Row } from './Row';
import { Theme } from '../../types';
import { useTheme } from '../../hooks/useTheme';
import { useStylesheet } from '../../hooks/useStylesheet';

type ListEmptyComponentProps = {
  text: string;
  containerStyle?: any;
};

export const ListEmptyComponent = ({ text, containerStyle }: ListEmptyComponentProps) => {
  const { colors } = useTheme();
  const styles = useStylesheet(createStyles);
  return (
    <Row alignItems={'center'} style={[styles.content, containerStyle]}>
      <Text color={'gray'} fontSize={16} style={styles.text}>
        {text}
      </Text>
    </Row>
  );
};

const createStyles = ({ spacing }: Theme) =>
  StyleSheet.create({
    content: {
      paddingHorizontal: spacing.screenHorizontal,
      paddingTop: spacing.screenVertical,
    },
    text: {
      width: '100%',
      marginTop: spacing.standardMargin,
      textAlign: 'center',
    },
  });
