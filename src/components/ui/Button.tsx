import React from 'react';
import { useStylesheet } from '../../hooks/useStylesheet';
import { FlexProps, StyleProps, Theme } from '../../types';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Text } from './Text';
import { useTheme } from '../../hooks/useTheme';
import { Row } from './Row';
import { Icon, IconProps } from './Icon';
import { Loader } from './Loader';
import LinearGradient from 'react-native-linear-gradient';
import { Col } from './Col';
import { useTranslation } from 'react-i18next';
import { SHADOW } from '../../constant';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'error' | 'gradient';

type Props = StyleProps &
  FlexProps & {
    style?: ViewStyle;
    styleText?: TextStyle;
    text?: string;
    loading?: boolean;
    variant?: ButtonVariant;
    source?: IconProps['source'];
    icon?: IconProps['icon'];
    iconRight?: IconProps['icon'];
    iconColor?: string;
    onPress?: () => void;
    disabled?: boolean;
    iconSize?: number;
    gradientColors?: string[];
    gradientAngle?: number;
  };

export const Button = ({
  loading,
  style,
  styleText,
  text,
  variant = 'primary',
  iconSize = 20,
  icon,
  source,
  iconColor,
  onPress,
  iconRight,
  disabled,
  gradientColors = ['#0070C0', '#2B5AFF', '#54ADFF'],
  gradientAngle = 160,
  ...rest
}: Props) => {
  const styles = useStylesheet(createStyles);
  const { colors } = useTheme();
  const { t } = useTranslation();

  const buttonStyle = [styles.container, styles[variant], style];
  const buttonStyleDisabled = [styles.container, styles[variant], style, { opacity: 0.5 }];
  // @ts-ignore
  const textStyle = [styles[variant + 'Text'], styleText];

  if (variant === 'gradient') {
    return (
      <Col {...rest}>
        <LinearGradient colors={gradientColors} style={[styles.gradient, { ...style }]} useAngle={true} angle={gradientAngle}>
          <Row gap={12} p={16} alignItems={'center'} onPress={onPress} disabled={disabled}>
            <Col flex={1} alignItems={'center'} h={24}>
              {loading && <Loader color={colors.white} />}
              {!loading && (
                <Text variant={'Label/Medium/SemiBold'} color={colors.white}>
                  {text}
                </Text>
              )}
            </Col>
          </Row>
        </LinearGradient>
      </Col>
    );
  }

  return (
    <Row style={disabled ? buttonStyleDisabled : buttonStyle} onPress={onPress} {...rest} disabled={disabled}>
      {loading && <Loader color={colors.white} />}
      {!loading && (
        <Row alignItems={'center'} justifyContent={'center'} gap={5}>
          {(icon || source) && <Icon size={iconSize} source={source} icon={icon} color={iconColor} />}
          {!!text && (
            <Text style={textStyle} color={colors.white} fontWeight={'700'} fontSize={16} center>
              {text}
            </Text>
          )}
          {iconRight && <Icon size={iconSize} icon={iconRight} color={iconColor} />}
        </Row>
      )}
    </Row>
  );
};

const createStyles = ({ colors }: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.primary,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      height: 56,
      width: '100%',
    },
    primary: {
      backgroundColor: colors.primary,
    },
    secondary: {
      backgroundColor: colors.bgSurface2,
      ...SHADOW.SMALL,
    },
    error: {
      backgroundColor: colors.negative,
    },
    tertiary: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: colors.secondary,
      height: 40,
      borderRadius: 8,
    },
    gradient: {
      justifyContent: 'center',
      borderRadius: 1000,
      overflow: 'hidden',
    },
    primaryText: {
      color: colors.white,
      fontSize: 16,
    },
    secondaryText: {
      color: colors.black,
    },
    tertiaryText: {
      color: colors.secondary,
    },
    gradientText: {
      color: colors.white,
    },
    errorText: {
      color: colors.white,
    },
  });
