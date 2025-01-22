import { useEffect } from 'react';
import { Alert, Linking } from 'react-native';
import { t } from 'i18next';
import { IS_ANDROID } from '../utils/platform';
import { masterAxios } from '../api/config';
import { ANDROID_GOOGLE_PLAY_STORE_URL, APPLE_STORE_URL } from '../../config';
import DeviceInfo from 'react-native-device-info';

const getAppSettingsMinRequiredVersion = async () => {
  try {
    const params = {
      key: 'requiredVersion',
    };
    const { data } = await masterAxios.get('labels', { params });
    console.log('appVersion', data);
    if (data[0]) {
      return data[0];
    }
    return Promise.reject('no appVersion required');
  } catch (e) {
    console.log('appVersion', e);
    return Promise.reject(e);
  }
};

const checkForceUpdateApp = async () => {
  try {
    const appSetting = await getAppSettingsMinRequiredVersion();
    if (appSetting) {
      const appVersion = DeviceInfo.getVersion();
      const minVersion = appSetting.value;
      console.log('appVersion, minVersion', appVersion, minVersion);
      const vApp = appVersion.split('.');
      const vMin = minVersion.split('.');
      console.log({ vApp, vMin });
      if (
        Number(vApp[0]) < Number(vMin[0]) ||
        (Number(vApp[0]) <= Number(vMin[0]) && Number(vApp[1]) < Number(vMin[1])) ||
        (Number(vApp[0]) <= Number(vMin[0]) && Number(vApp[1]) <= Number(vMin[1]) && Number(vApp[2]) < Number(vMin[2]))
      ) {
        Alert.alert(t('updateMandatory'), t('updateMandatoryText'), [
          {
            text: t('update'),
            onPress: () => {
              const url = IS_ANDROID ? ANDROID_GOOGLE_PLAY_STORE_URL : APPLE_STORE_URL;
              Linking.openURL(url);
              checkForceUpdateApp();
            },
          },
        ]);
      }
    }
  } catch (e) {
    console.log({ errorSettings: e });
  }
};

export const useCheckForceUpdate = () => {
  useEffect(() => {
    checkForceUpdateApp().catch(console.error);
    // Notifications.requestNotificationPermissionAndSubscribeToTopics();
  }, []);
};
