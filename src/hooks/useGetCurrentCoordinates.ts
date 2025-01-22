import { useEffect } from 'react';
import { getMyValidCoordinates } from '../utils/geolocation.ts';
import { useAppState } from './useAppState.ts';

export const useGetCurrentCoordinates = () => {
  const appStateStatus = useAppState();
  useEffect(() => {
    if (appStateStatus === 'active') {
      getMyValidCoordinates(false);
    }
  }, [appStateStatus]);
};
