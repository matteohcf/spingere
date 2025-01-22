import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon, Row, Text } from '../ui';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { StyleProps, Theme } from '../../types';
import { useTheme } from '../../hooks/useTheme';
import { useStylesheet } from '../../hooks/useStylesheet';

type ActionButtonProps = StyleProps & {
  onPress: () => void;
  source?: string;
  text: string;
  iconRight?: string;
  iconSize?: number;
  sourceColor?: string;
};
// TO DISMISS
export const ActionButton = ({
  onPress,
  source,
  sourceColor,
  iconSize,
  iconRight,
  text,
  ...rest
}: ActionButtonProps) => {
  const { colors } = useTheme();
  const styles = useStylesheet(createStyles);

  return (
    <Row
      style={[styles.container]}
      alignItems={'center'}
      justifyContent={'center'}
      onPress={onPress}
      w={'100%'}
      {...rest}>
      <Icon source={source} size={iconSize || 15} color={sourceColor || colors.secondary} />
      <Text numberOfLines={1} fontSize={15} color={colors.secondary} fontWeight={'400'}>
        {text}
      </Text>
    </Row>
  );
};

const createStyles = ({ colors }: Theme) =>
  StyleSheet.create({
    icon: {
      width: 53,
      height: 53,
      borderRadius: 50,
      marginRight: 4,
      backgroundColor: colors.secondary,
    },
    container: {
      borderWidth: 1,
      borderColor: colors.secondary,
      borderRadius: 10,
      height: 40,
    },
  });
