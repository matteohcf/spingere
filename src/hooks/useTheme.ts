import { useColorScheme } from 'react-native';
import { useMemo } from 'react';
import { darkTheme, lightTheme } from '../constant';
import { Theme } from '../types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IS_ANDROID } from '../utils/platform';

export const useTheme = (): Theme => {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  return useMemo((): Theme => {
    const safeInsets = {
      ...insets,
      safeTop: IS_ANDROID ? insets.top + 10 : insets.top,
      safeBottom: insets.bottom || 10,
    };
    if (colorScheme === 'light') {
      return { ...lightTheme, insets: safeInsets };
    } else {
      return { ...darkTheme, insets: safeInsets };
    }
  }, [insets, colorScheme]);
};
