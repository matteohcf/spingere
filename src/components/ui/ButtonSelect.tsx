import React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Text } from './Text';
import { Row } from './Row';
import { Icon } from './Icon';
import { FlexProps, StyleProps, Theme } from '../../types';
import { useTheme } from '../../hooks/useTheme';
import { useStylesheet } from '../../hooks/useStylesheet';

type Props = StyleProps &
  FlexProps & {
    style?: StyleProp<ViewStyle>;
    text?: string;
    onPress: () => void;
  };

export const ButtonSelect = ({ style, text, ...rest }: Props) => {
  const { spacing, colors } = useTheme();
  const styles = useStylesheet(createStyles);
  const buttonStyle = [styles.buttonSelect, style];

  return (
    <Row style={buttonStyle} {...rest}>
      <Text color={colors.secondary} fontSize={20}>
        {text}
      </Text>
      <Icon size={15} icon={['fas', 'chevron-down']} color={colors.secondary} />
    </Row>
  );
};

const createStyles = ({ colors, spacing }: Theme) =>
  StyleSheet.create({
    buttonSelect: {
      borderColor: colors.secondary,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
      borderWidth: 1,
      height: 34,
      paddingHorizontal: spacing.standardMargin / 2,
      columnGap: spacing.standardMargin / 2,
    },
  });
