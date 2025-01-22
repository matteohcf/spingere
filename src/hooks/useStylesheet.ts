import { useMemo } from 'react';

import { useTheme } from './useTheme';
import { Theme } from '../types';

export const useStylesheet = <T>(stylesheetCreator: (theme: Theme) => T) => {
  const theme = useTheme();
  return useMemo(() => stylesheetCreator(theme), [stylesheetCreator, theme]);
};
