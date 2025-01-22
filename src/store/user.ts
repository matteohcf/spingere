import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, UserState } from '../types';
import { Languages } from '../i18n';

const initialState: UserState = {
  token: undefined,
  detail: undefined,
  language: Languages.IT,
  visitedTutorial: false,
  geolocation: undefined,
  bottomNotifications: undefined,
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
    setVisitedTutorial: (state: UserState, { payload }: PayloadAction<UserState['visitedTutorial']>) => {
      state.visitedTutorial = payload;
    },
    setGeolocation: (state: UserState, { payload }: PayloadAction<UserState['geolocation']>) => {
      state.geolocation = payload;
    },
    setBottomNotifications: (state: UserState, { payload }: any) => {
      state.bottomNotifications = payload;
    },
    clearUserLoggedState: (state: UserState) => {
      state.token = undefined;
      state.detail = undefined;
    },
  },
});

const {
  setUserToken,
  setVisitedTutorial,
  setGeolocation,
  setBottomNotifications,
  setUserDetail,
  clearUserLoggedState,
} = userSlice.actions;

export const userActions = {
  setUserDetail,
  setUserToken,
  setVisitedTutorial,
  setGeolocation,
  setBottomNotifications,
  clearUserLoggedState,
};

export const userSelectors = {
  token: (state: RootState) => state.user.token,
  detail: (state: RootState) => state.user.detail,
  isLogged: (state: RootState) => !!state.user.token,
  visitedTutorial: (state: RootState) => state.user.visitedTutorial,
  language: (state: RootState) => state.user.language,
  geolocation: (state: RootState) => state.user.geolocation,
  bottomNotifications: (state: RootState) => state.user.bottomNotifications,
};

export default userSlice.reducer;
