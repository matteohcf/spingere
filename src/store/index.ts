import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import user from './user';
import app from './app';
import labels from './labels';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logger from 'redux-logger';
import { DEBUG } from '../../config';

const reducers = combineReducers({
  user,
  labels,
  app,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware => {
    const middleware = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    });
    if (DEBUG) {
      middleware.push(logger);
    }
    return middleware;
  },
});

export const persistor = persistStore(store);

function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const awaitRehydrate = async (): Promise<boolean> => {
  const state = store.getState();
  const rehydrated = state?._persist?.rehydrated;
  console.debug('rehydrated', rehydrated);
  if (rehydrated) {
    return true;
  } else {
    await timeout(10);
    return awaitRehydrate();
  }
};

// Aggiungi queste righe per la tipizzazione
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
