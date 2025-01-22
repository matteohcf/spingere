import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppState } from '../types';
import _ from 'lodash';

const initialState: AppState = {
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    clearAppState: () => initialState,
  },
});

const { clearAppState } = appSlice.actions;

export const appActions = {
  clearAppState,
};
export const appSelectors = {
};
export default appSlice.reducer;
