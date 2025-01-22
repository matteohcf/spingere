import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { IS_ANDROID } from './platform';
import { getNotificationsCount, updateMe, getAppVersionNumber } from '../api/user';
import { language } from '../i18n';
import notifee from '@notifee/react-native';
import { PermissionsAndroid, Platform } from 'react-native';
import { navigationRef } from '../core/providers/NavigatorProvider.tsx';
import { showToast } from "./toast.ts";
import { getDeviceInformation } from "./firebase.ts";

export const requestNotificationPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
    } catch (error) {}
  } else {
    const request = await messaging().requestPermission();
    console.log({ request });
  }
};

export const getNotificationToken = async () => {
    // Timeout per richiedere il token dopo aver controllato i permessi
    await new Promise(resolve => setTimeout(resolve, 1000));
    const notificationToken = await messaging().getToken();
    console.log('notificationToken', { notificationToken });
    return notificationToken;
};

const onMessageNotification = async (notification: FirebaseMessagingTypes.RemoteMessage) => {
  console.log('onMessage', { notification });
  // await Promise.all([getMyNotificationList(), getMyNotificationCount()]);
  await getNotificationsCount()
  if (notification.notification?.title && notification.notification?.body) {
    showToast(
      notification.notification?.title,
      notification.notification?.body,
      {
        type: "info",
        onPress: () => {
          if (notification.data?.screen) {
            navigationRef.navigate(notification.data?.screen);
          }
        },
        visibilityTime: 5000,
      },
    );
  }
};

const onMessageNotificationOpenedApp = async (notification: FirebaseMessagingTypes.RemoteMessage) => {
  console.log('onMessageOpenedApp', { notification });
  if (notification.data?.screen) {
    navigationRef.navigate(notification.data?.screen);
  }
  // await Promise.all([getMyNotificationList(), getMyNotificationCount()]);
};

messaging().onMessage(onMessageNotification);
messaging().onNotificationOpenedApp(onMessageNotificationOpenedApp);

export const updateUserNotificationToken = async () => {
  try {
    await requestNotificationPermission();
    const notificationToken = await getNotificationToken();
    const data = {
      devices: [
        {
          os: IS_ANDROID ? 'android' : 'ios',
          token: notificationToken,
        },
      ],
      appVersion: getAppVersionNumber,
      deviceInfo: getDeviceInformation()?.deviceInfoMerged,
    };
    await updateMe(data);
    await subscribeToTopic(TOPICS.APP);
  } catch (e) {
    console.log({ e });
    return null;
  }
};

export const subscribeToTopic = async (topic: TOPICS) => {
  await messaging().subscribeToTopic(`${language}-${topic}`);
};

export enum TOPICS {
  APP = 'app',
}

export const resetNotificationBadge = async (newNumber: number) => {
  try {
    await notifee.setBadgeCount(newNumber);
  } catch (e) {
    console.log({ e });
  }
};
