import React from 'react';
import { Col } from './Col';
import { ActivityIndicator } from 'react-native';
import { ViewProps } from 'react-native/Libraries/Components/View/ViewPropTypes';
import { useTheme } from '../../hooks/useTheme';
import { BoxProps } from './Box';

type Props = BoxProps & {
  style?: ViewProps['style'];
  size?: 'small' | 'large';
  rest?: any;
  color?: string;
};

export const Loader = ({ style, size = 'small', color, ...rest }: Props) => {
  const { colors } = useTheme();

  return (
    <Col alignItems={'center'} justifyContent={'center'} style={style} {...rest}>
      <ActivityIndicator color={color || colors.bgPrimary} size={size} />
    </Col>
  );
};
