import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { Image, ImageProps, Pressable, ViewStyle } from 'react-native';
import { StyleProps } from '../../types';
import { useStyleProps } from '../../hooks/useStyleProps';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { ImageSourcePropType } from 'react-native/Libraries/Image/Image';

/**
 * @description Icon component
 * The available prefix depends on which icon set you use. free-solid-svg-icons uses fas.
 * Use the pro icon to get access to all icons in the Pro package. // FONTAWESOME_NPM_AUTH_TOKEN is required if you use pro icons
 */

export type IconProps = StyleProps & {
  source?: ImageSourcePropType | string;
  icon?: IconProp;
  onPress?: () => void;
  disabled?: boolean;
  imageStyle?: any;
  size?: number;
  style?: ViewStyle;
  color?: string;
};

export const Icon = ({
  source,
  onPress,
  imageStyle,
  disabled,
  style,
  color,
  size = 30,
  icon,
  ...rest
}: IconProps) => {
  const styleProps = useStyleProps(rest);
  const imageSource = typeof source === 'string' ? { uri: source } : source;

  return (
    <Pressable
      disabled={!onPress || disabled}
      {...rest}
      style={{
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
      {...styleProps}
      onPress={onPress}>
      {icon && <FontAwesomeIcon icon={icon} color={color} size={size} />}
      {source && (
        <Image
          source={imageSource as ImageProps['source']}
          style={{
            width: size,
            height: size,
            ...imageStyle,
            tintColor: color,
          }}
        />
      )}
    </Pressable>
  );
};
