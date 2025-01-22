import { useEffect, useState } from 'react';
import { awaitRehydrate } from '../store';

export const useStoreRehydrate = () => {
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    awaitRehydrate().then(() => {
      setIsReady(true);
    });
  }, []);

  return {
    isReady,
  };
};
