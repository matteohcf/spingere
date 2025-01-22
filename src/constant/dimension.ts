import { Dimensions, Platform, StatusBar } from 'react-native';
import { IS_ANDROID } from '../utils/platform';

export const WIDTH_DEVICE = Dimensions.get('window').width;
export const HEIGHT_DEVICE = Dimensions.get('window').height;
export const HEIGHT_DEVICE_WITH_STATUS_BAR = IS_ANDROID
  ? HEIGHT_DEVICE + (StatusBar?.currentHeight || 0)
  : HEIGHT_DEVICE;

export const IS_IOS = Platform.OS === 'ios';
