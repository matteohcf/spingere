import { NativeModules, Platform } from 'react-native';

export enum Languages {
  EN = 'en',
  IT = 'it',
}

export let language = 'it';

export const getDeviceLanguage = () => {
  const deviceLocale =
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
      : NativeModules.I18nManager.localeIdentifier;

  const truncateString = deviceLocale?.substring(0, 2)?.toLowerCase();
  const existLanguage = Object.values(Languages).includes(truncateString?.toLowerCase());

  return existLanguage ? truncateString : Languages.IT;
};

language = getDeviceLanguage();
