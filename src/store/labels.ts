import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';
import { LabelsState, RootState } from '../types';
import { Languages } from '../i18n';

const initialState: LabelsState = {
  it: {},
  en: {},
};

export const labelSlice = createSlice({
  name: 'labels',
  initialState,
  reducers: {
    setLabels: (
      state: LabelsState,
      { payload }: PayloadAction<{ language: Languages; labels: Record<string, string> }>,
    ) => {
      state[payload.language] = payload.labels;
    },
  },
});

export const { setLabels } = labelSlice.actions;

export const labelsAction = {
  setLabels,
};

export const labelSelectors = {
  it: (state: RootState) => _.get(state, 'labels.it', {}),
  en: (state: RootState) => _.get(state, 'labels.en', {}),
};

export default labelSlice.reducer;
