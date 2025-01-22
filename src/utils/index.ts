import { Linking, NativeModules, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { spacing } from '../constant';
import { useSafeBottomBarHeight } from '../hooks/useSafeBottomBarHeight';
import { Languages } from '../i18n';

export const Normalize = (size: number) => size;

export const modalPaddingDefault = {
  paddingHorizontal: spacing.screenHorizontalModal,
  paddingTop: spacing.md,
  paddingBottom: useSafeBottomBarHeight() + 10,
};

export const modalPaddingVerticalDefault = {
  paddingTop: spacing.md,
  paddingBottom: useSafeBottomBarHeight() + 10,
};

export const openLink = (url: string) => {
  if (url?.includes('https://')) {
    Linking.openURL(url).catch(() => {
      // TODO: handle error
    });
  } else {
    Linking.openURL(`https://${url}`).catch(() => {
      // TODO: handle error
    });
  }
};

export const SHADOW_DEFAULT = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 5,
};

export const openEmail = (email: string) => {
  Linking.openURL(`mailto:${email}`).catch(() => {
    // TODO: handle error
  });
};

export const getAppVersionNumber = DeviceInfo.getVersion();

export const findFormattedAddress = (address: any) => {
  const addressLocation = address?.address ? address?.address + ', ' : '';
  const zipCode = address?.zipCode ? address?.zipCode + ', ' : '';
  const city = address?.city ? address?.city + ', ' : '';
  const province = address?.province || '';
  return addressLocation + zipCode + city + province;
};

export const getDeviceLanguage = () => {
  const deviceLocale =
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
      : NativeModules.I18nManager.localeIdentifier;
  console.log({ deviceLocale });
  const truncateString = deviceLocale?.substring(0, 2)?.toLowerCase();
  const existLanguage = Object.values(Languages).includes(truncateString?.toLowerCase());
  console.log({ truncateString });
  console.log({ existLanguage });
  return existLanguage ? truncateString : Languages.IT;
};

export const getAxiosErrorInfo = (error: any) => {
  const message = error?.response?.data || error?.response?.data?.message || 'generic error';
  const status = error?.response?.status || error?.response?.data?.status || 400;

  return {
    status,
    message,
  };
};

export const findIconByType = (type: string) => {
  switch (type) {
    case 'masterCard':
      return masterCard;
    case 'visa':
      return visa;
    case 'amex':
      return amex;
    default:
      return masterCard;
  }
};

export const openDocument = async (url: string) => {
  const supported = await Linking.canOpenURL(url);
  if (supported) {
    Linking.openURL(url);
  }
};
