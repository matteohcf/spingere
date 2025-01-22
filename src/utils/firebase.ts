import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';
import DeviceInfo from 'react-native-device-info';
import _ from 'lodash';
import { User } from '../types';
import { useSelector } from 'react-redux';
import { userSelectors } from '../store/user';
import { useEffect } from 'react';

export const logLogin = (method: 'credential') => {
  analytics()
    .logLogin({ method })
    .then(() => console.debug('logAppOpen'))
    .catch(e => console.error({ e }));
};

export const logAppOpen = () => {
  analytics()
    .logAppOpen()
    .then(() => console.debug('logAppOpen'))
    .catch(e => console.error({ e }));
};

export const logScreenView = (routeName?: string) => {
  if (routeName) {
    analytics()
      .logScreenView({
        screen_name: routeName,
        screen_class: routeName,
      })
      .then(() => console.debug('logScreenView'))
      .catch(e => console.error({ e }));
  }
};

export const getDeviceInformation = () => {
  const infos = {
    deviceModel: DeviceInfo.getModel(),
    brand: DeviceInfo.getBrand(),
    systemName: DeviceInfo.getSystemName(),
    systemVersion: DeviceInfo.getSystemVersion(),
    deviceType: DeviceInfo.getDeviceType(),
    appVersion: DeviceInfo.getVersion(),
  };
  return {
    ...infos,
    deviceInfoMerged: `${infos.deviceModel} - ${infos.brand} - ${infos.systemName} - ${infos.systemVersion} - ${infos.deviceType} - ${infos.appVersion}`,
  };
};

export const setCrashlyticsAttributes = async (userDetail?: User) => {
  if (!userDetail?._id) {
    return;
  }
  try {
    const deviceInfos = getDeviceInformation();
    const attributes = {
      ...userDetail,
      ...deviceInfos,
    };

    const data = extractTopLevelProperties(attributes);

    await analytics().setUserId(userDetail?._id);
    await analytics().setUserProperties(data);
    await crashlytics().setAttributes(data);
  } catch (e) {
    console.log({ setCrashlyticsAttributes: e });
  }
};

export const Crashlytics = {
  logMessage: (message: string) => {
    try {
      crashlytics().log(message);
    } catch (e) {
      console.debug({ errorLogMessage: e });
    }
  },
  logObject: (object: object) => {
    try {
      console.debug({ object });
      crashlytics().log(JSON.stringify(object || {}));
    } catch (e) {
      console.debug({ errorLogObject: e });
    }
  },
  recordError: (error: Error) => {
    try {
      crashlytics().recordError(error);
    } catch (e) {
      console.debug({ errorLogObject: e });
    }
  },
  crash: () => {
    crashlytics().crash();
  },
};

const extractTopLevelProperties = (input: any): any => {
  const result: any = {};
  for (const key in input) {
    if (input.hasOwnProperty(key)) {
      const value = input[key];
      // Verifico che il valore non sia un oggetto (o che sia null), per prendere solo le proprietà di primo livello
      if (value === null || typeof value !== 'object' || value instanceof Date || Array.isArray(value)) {
        result[key] = value;
      }
    }
  }
  for (const key in result) {
    if (result.hasOwnProperty(key)) {
      result[key] = _.toString(result[key]);
    }
  }
  return result;
};

export const useFirebase = () => {
  const userDetail = useSelector(userSelectors.detail);

  useEffect(() => {
    setCrashlyticsAttributes(userDetail);
  }, [userDetail]);
};

type AnalyticsEventName = 'button_press';

const genericLog = (eventName: AnalyticsEventName, params: any) => {
  analytics()
    .logEvent(eventName, params)
    .then(() => console.debug('logEvent'))
    .catch(e => console.error({ e }));
};

export const Analytics = {
  logScreenView,
  logLogin,
  logAppOpen,
  genericLog,
};
