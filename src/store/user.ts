import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, UserState } from '../types';
import { Languages } from '../i18n';

const initialState: UserState = {
  token: undefined,
  detail: undefined,
  language: Languages.IT,
  // visitedTutorial: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserToken: (state: UserState, { payload }: PayloadAction<UserState['token']>) => {
      state.token = payload;
    },
    setUserDetail: (state: UserState, { payload }: PayloadAction<UserState['detail']>) => {
      state.detail = payload;
    },
    clearUserLoggedState: (state: UserState) => {
      state.token = undefined;
      state.detail = undefined;
    },
  },
});

const {
  setUserToken,
  setUserDetail,
  clearUserLoggedState,
} = userSlice.actions;

export const userActions = {
  setUserDetail,
  setUserToken,
  clearUserLoggedState,
};

export const userSelectors = {
  token: (state: RootState) => state.user.token,
  detail: (state: RootState) => state.user.detail,
  isLogged: (state: RootState) => !!state.user.token,
  language: (state: RootState) => state.user.language,
};

export default userSlice.reducer;
