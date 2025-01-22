import React from 'react';
import { StyleSheet } from 'react-native';
import { Col, Icon, Row, Text } from '../ui';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { StyleProps, Theme } from '../../types';
import { useTheme } from '../../hooks/useTheme';
import { useStylesheet } from '../../hooks/useStylesheet';

type MenuItemProps = StyleProps & {
  icon?: IconProp;
  onPress: () => void;
  source?: string;
  title: string;
  description: string;
  showBorder?: boolean;
  iconRight?: string;
  iconSize?: number;
  titleFontWeight?: '300' | '400' | '500' | '600' | '700' | '800' | '900';
  titleFontSize?: number;
};

export const MenuItem = ({
  icon,
  onPress,
  iconSize = 53,
  source,
  iconRight,
  showBorder = true,
  titleFontWeight = '400',
  titleFontSize = 20,
  title,
  description,
  ...rest
}: MenuItemProps) => {
  const { colors, spacing } = useTheme();
  const styles = useStylesheet(createStyles);

  return (
    <Row
      pv={13}
      style={[showBorder && styles.container]}
      alignItems={'center'}
      onPress={onPress}
      w={'100%'}
      {...rest}>
      <Icon
        icon={icon}
        source={source}
        style={{
          width: iconSize,
          height: iconSize,
          borderRadius: 50,
          marginRight: spacing.standardMargin,
          backgroundColor: colors.primary,
        }}
        color={colors.white}
        size={iconSize * 0.5}
      />
      <Col style={{ flex: 1 }}>
        <Text numberOfLines={1} fontWeight={titleFontWeight} fontSize={titleFontSize}>
          {title}
        </Text>
        {description && (
          <Text numberOfLines={1} fontSize={15} fontWeight={'300'}>
            {description}
          </Text>
        )}
      </Col>
      <Icon source={iconRight} size={10} imageStyle={styles.image} />
    </Row>
  );
};

const createStyles = ({ colors, spacing }: Theme) =>
  StyleSheet.create({
    icon: {
      width: 53,
      height: 53,
      borderRadius: 50,
      marginRight: spacing.standardMargin,
      backgroundColor: colors.primary,
    },
    container: {
      borderTopWidth: 1,
      borderTopColor: colors.gray[200],
    },
    image: {
      width: 15,
      resizeMode: 'contain',
    },
  });
