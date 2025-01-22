import {useEffect} from 'react';
import {BackHandler} from 'react-native';
import {IS_ANDROID} from '../utils/platform';

export const usePreventHardwareGoBack = (onGoBack?: () => void) => {
  useEffect(() => {
    const handleHardwareBackPress = () => {
      onGoBack && onGoBack();
      return IS_ANDROID;
    };

    if (IS_ANDROID) {
      BackHandler.addEventListener('hardwareBackPress', handleHardwareBackPress);
    }

    return () => {
      if (IS_ANDROID) {
        BackHandler.removeEventListener('hardwareBackPress', handleHardwareBackPress);
      }
    };
  }, [onGoBack]);
};
