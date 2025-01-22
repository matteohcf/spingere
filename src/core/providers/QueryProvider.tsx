import { PropsWithChildren, useEffect } from 'react';
import { onlineManager, QueryClient } from '@tanstack/react-query';
import NetInfo from '@react-native-community/netinfo';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { APP_BUNDLE_ID, IS_PROD } from '../../../config';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
      staleTime: 300000, // 5 minutes
      retry: IS_PROD ? 2 : 1,
      refetchOnWindowFocus: IS_PROD,
    },
  },
});

const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
  key: APP_BUNDLE_ID,
  deserialize: JSON.parse,
  serialize: JSON.stringify,
});

export const QueryProvider = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    onlineManager.setEventListener(setOnline => {
      return NetInfo.addEventListener(state => {
        const wasOnline = onlineManager.isOnline();
        if (wasOnline && !state.isConnected) {
          setOnline(false);
          console.warn('Phone just went offline');
        } else if (!wasOnline && state.isConnected) {
          console.warn('Phone is back online');
          setOnline(true);
        }
      });
    });
  }, []);

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister: asyncStoragePersister,
        maxAge: Infinity,
      }}>
      {children}
    </PersistQueryClientProvider>
  );
};
