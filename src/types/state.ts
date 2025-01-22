import { User } from './user';
import { Languages } from '../i18n';
import { GeolocationResponse } from '@react-native-community/geolocation';
import {Pee} from "./pee.ts";

export type UserState = {
  token?: string;
  detail?: User;
  language: Languages;
  visitedTutorial: boolean;
  geolocation?: UserGeolocation;
  bottomNotifications?: any;
};

export type AppState = {
};

export type LabelsState = {
  it: Record<string, string>;
  en: Record<string, string>;
};

export type RootState = {
  user: UserState;
  labels: LabelsState;
  app: AppState;
};

export type Position = [number, number] | number[];

export type UserGeolocation = {
  lastUpdate: string;
  coordinates: Position;
} & GeolocationResponse;
