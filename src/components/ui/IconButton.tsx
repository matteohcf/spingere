import { Icon, IconProps } from './Icon';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import React from 'react';

type Props = TouchableOpacityProps & {
  icon: IconProps['icon'];
  iconProps?: Omit<IconProps, 'icon'>;
};

export const IconButton = ({ icon, iconProps, ...rest }: Props) => {
  return (
    <TouchableOpacity {...rest} hitSlop={{ top: 10, bottom: 10, right: 10, left: 10 }}>
      <Icon icon={icon} {...iconProps} />
    </TouchableOpacity>
  );
};
