import { check, openSettings, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { store } from '../store';
import Geolocation from '@react-native-community/geolocation';
import { Linking } from 'react-native';
import { userActions, userSelectors } from '../store/user';
import { t } from 'i18next';
import { IS_ANDROID } from './platform';
import { showInfoModal } from '../components/modal';
import { Position, UserGeolocation } from '../types';
import { DateTime } from 'luxon';
import {showAlertModal, showAlertSiteModal} from '../components/floatingModal';
import { GeoPoint } from 'ts-geopoint';
import {Pee} from "../types/pee.ts";
import _ from "lodash";

// Geocoder.init(CONFIG.GOOGLE_API_KEY);

Geolocation.setRNConfiguration({
  skipPermissionRequests: false,
  authorizationLevel: 'whenInUse',
  locationProvider: 'auto',
});
// Recoursive retry for x seconds
export const getCurrentLocation = async (): Promise<UserGeolocation> => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      geolocation => {
        const { coords: coordinates } = geolocation;
        const mongoCoords = [coordinates.longitude, coordinates.latitude];
        resolve({ ...geolocation, coordinates: mongoCoords, lastUpdate: DateTime.now().toISO() });
      },
      async error => {
        console.log('getCurrentPosition error', error);
        reject(error);
      },
      {
        timeout: 5000,
        maximumAge: 60e3,
        accuracy: {
          android: 'high',
          ios: 'best',
        },
        showLocationDialog: true,
      },
    );
  });
};

export const acceptLocationPermission = async () => {
  return new Promise(async (resolve, reject) => {
    const result = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    if (result !== RESULTS.GRANTED) {
      const requestResult = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      console.log({ requestResult });
      if (requestResult !== RESULTS.GRANTED) {
        resolve(false);
      }
    }

    resolve(true);
  });
};

export const getGeolocationPermissions = async (askToOpenSettings, t) => {
  try {
    const permission = await new Promise(async (resolve, reject) => {
      const result = await smartCheckPermission(isAndroid ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      // console.log({result});
      if (result !== RESULTS.GRANTED) {
        let requestResult = await smartRequestPermission(isAndroid ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        // console.log({requestResult});

        if (isAndroid && requestResult !== RESULTS.GRANTED) {
          requestResult = await smartRequestPermission(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION);
        }
        if (requestResult !== RESULTS.GRANTED) {
          resolve(false);
        }
      }
      resolve(true);
    });
    console.log({ permission });

    if (!permission && askToOpenSettings) {
      showAlertModal({
        title: t('attention'),
        description: t('denied location permission'),
        onConfirm: async () => {
          await openSettings();
        },
      });
    }
  } catch (e) {
    console.log({ getGeolocationPermissionsError: e });
  }
};

const smartRequestPermission = async permission => {
  let requestResult = await request(permission);
  store.dispatch(appActions.setPermissions({ type: permission, value: requestResult }));
  return requestResult;
};
const smartCheckPermission = async permission => {
  let requestResult = await check(permission);
  store.dispatch(appActions.setPermissions({ type: permission, value: requestResult }));
  return requestResult;
};

const openNativeSettings = async t => {};

export const getPositionAndSaveToStorage = async (): Promise<UserGeolocation> => {
  try {
    const coordinates = await getCurrentLocation();
    console.log({ coordinates });
    store.dispatch(userActions.setGeolocation(coordinates));
    return coordinates;
  } catch (e) {
    return false;
  }
};

export const getMyValidCoordinates = async (showError: boolean): Promise<UserGeolocation | undefined> => {
  try {
    const state = store.getState();
    const oldCoordinates = userSelectors.geolocation(state);
    const newCoordinates = await getPositionAndSaveToStorage();
    console.log('newCoordinates', newCoordinates);

    if (newCoordinates) {
      return newCoordinates;
    }

    if (oldCoordinates) {
      const { lastUpdate } = oldCoordinates;
      const now = DateTime.now();
      const lastUpdateDate = DateTime.fromISO(lastUpdate);
      const diff = now.diff(lastUpdateDate, 'minutes').toObject();
      if (diff.minutes < 15) {
        return oldCoordinates;
      }
    }

    if (showError) {
      showAlertSiteModal({
        title: t('attention'),
        description: t('location is not enabled'),
        confirmText: t('open settings'),
        onConfirm: async () => {
          if (IS_ANDROID) {
            await Linking.sendIntent('android.settings.LOCATION_SOURCE_SETTINGS');
          } else {
            await Linking.openURL('app-settings:');
          }
        },
      });
    }
    return undefined;
  } catch (e) {
    console.log({ getMyValidCoordinatesError: e });
  }
};

export const getDistanceBetweenTwoCoordinates = (a: Position, b: Position) => {
  const pointA = new GeoPoint(a[1], a[0]);
  const pointB = new GeoPoint(b[1], b[0]);

  return pointA.distanceTo(pointB, true); // output in kilometers
};

export const clusterPoints = (points: any[]) => {
  const CLUSTER_THRESHOLD = 0.1;
  const clusters:any = [];
  const clustered = new Set();

  points.forEach((point, i) => {
    if (clustered.has(i)) return;

    const cluster = [point];
    clustered.add(i);

    points.forEach((otherPoint, j) => {
      if (point.position?.coordinates && otherPoint.position?.coordinates) {
        if (i !== j && !clustered.has(j)) {
          const distance = new GeoPoint(point.position.coordinates[1], point.position.coordinates[0])
            .distanceTo(new GeoPoint(otherPoint.position.coordinates[1], otherPoint.position.coordinates[0]));

          if (distance <= CLUSTER_THRESHOLD) {
            cluster.push(otherPoint);
            clustered.add(j);
          }
        }
      }
    });

    clusters.push(cluster);
  });

  return clusters;
};

