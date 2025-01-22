import { StyleSheet, View } from 'react-native';
import { PropsWithChildren } from 'react';
import { ViewProps } from 'react-native/Libraries/Components/View/ViewPropTypes';
import { useStylesheet } from '../../hooks/useStylesheet';
import { Theme } from '../../types';
import { useHeaderHeight } from '@react-navigation/elements';
import { useTheme } from '../../hooks/useTheme';
import LinearGradient from 'react-native-linear-gradient';

type ScreenContainerProps = {
  useInset?: boolean;
  defaultPadding?: boolean;
  paddingTop?: number;
  darkStatusBar?: boolean;
  addPaddingHeader?: boolean;
  addPaddingHorizontal?: boolean;
  useGradient?: boolean;
  gradient?: [string, string];
} & ViewProps &
  PropsWithChildren;

export const Container = ({
  children,
  style,
  paddingTop,
  addPaddingHeader = false,
  defaultPadding = false,
  addPaddingHorizontal = true,
  useGradient,
  gradient,
  ...rest
}: ScreenContainerProps) => {
  const styles = useStylesheet(createStyles);
  const headerHeight = useHeaderHeight();
  const paddingTopDefault = addPaddingHeader ? headerHeight : 0;

  const { spacing } = useTheme();
  const Component = useGradient ? LinearGradient : View;

  const containerPaddingTop = paddingTop
    ? paddingTop + paddingTopDefault
    : defaultPadding
    ? paddingTopDefault + spacing.screenVertical
    : paddingTopDefault;

  return (
    <Component
      {...rest}
      colors={gradient || ['#eff6f8', '#acc2fb']}
      style={[
        styles.container,
        { paddingTop: containerPaddingTop },
        {
          paddingHorizontal: addPaddingHorizontal ? spacing.screenHorizontal : 0,
        },
        style,
      ]}>
      {children}
    </Component>
  );
};

const createStyles = ({ colors }: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.containerBckGround,
    },
  });
