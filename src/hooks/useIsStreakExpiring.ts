import { useMemo } from 'react';
import { DateTime } from 'luxon';
import { store } from '../store';

export const useIsStreakExpiring = () => {
  const userData = store.getState().user.detail;
  return useMemo(() => {
    if (!userData?.lastPee || !userData?.streakPees || userData.streakPees === 0) {
      return false;
    }
    const now = DateTime.now();
    const lastPeeDate = DateTime.fromISO(userData.lastPee);
    const isLastPeeToday = lastPeeDate.hasSame(now, 'day');
    if (!isLastPeeToday && now.hour >= 17) {
      return true;
    }
    return false;
  }, [userData?.lastPee, userData?.streakPees]);
};
