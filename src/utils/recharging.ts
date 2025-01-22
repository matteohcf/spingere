import { Transaction, TransactionStatus } from '../types/transaction';
import _ from 'lodash';
import { showInfoModal, showMapStationModal, showTouchAndChargeModal } from '../components/modal';
import { store } from '../store';
import { userSelectors } from '../store/user';
import { getMyValidCoordinates } from './geolocation';
import { getMaxDistanceForRecharge, getStationsApp } from '../api/stations';
import { t } from 'i18next';
import { getChargerStation } from '../api/chargersStations';
import { ChargerState } from '../types/charger';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootDrawerParamList } from '../screens/drawer';
import { DateTime } from 'luxon';
import { Coupon } from '../types/coupon';
import { checkUserDistanceFromCharger } from './stations';

export const getCurrentRechargedAmount = (transaction: Transaction) => {
  if (!transaction) {
    return 0;
  }
  if (transaction.rechargeKwh) {
    return transaction.rechargeKwh;
  }
  const start = transaction.meterStart;
  const current = transaction.currentMeterValue;
  const kwh = current - start < 0 ? 0 : current - start;
  return _.round(kwh / 1000, 2) || 0;
};

const showNoStationAvailable = (maxDistance: number) => {
  showInfoModal({
    title: t('attention'),
    text: t('no chargers available near you', { maxDistance }),
    buttonText: t('ok'),
  });
};
type StartTouchAndRechargeProps = {
  navigation: NativeStackScreenProps<RootDrawerParamList, 'Map'>;
};

export const startTouchAndRecharge = async ({ navigation }: StartTouchAndRechargeProps) => {
  try {
    const awaitShowTouchAndChargeModal = async () => {
      return new Promise(resolve => {
        showTouchAndChargeModal({
          onConfirm: () => {
            resolve(true);
          },
        });
      });
    };

    return new Promise(async (resolve, reject) => {
      const state = store.getState();
      const canShowModal = userSelectors.canShowMapTouchAndChargeModal(state);

      if (canShowModal) {
        await awaitShowTouchAndChargeModal();
      }

      const userGeolocation = await getMyValidCoordinates(true);
      if (!userGeolocation) {
        return reject('no coordinates');
      }

      const region = {
        longitude: userGeolocation.coordinates[0],
        latitude: userGeolocation.coordinates[1],
        longitudeDelta: 0.5,
        latitudeDelta: 0.5,
        limit: 1,
        // state: StationState.online,
      };
      const nearestStations = await getStationsApp(region);
      const maxDistance = await getMaxDistanceForRecharge();
      const nearestStation = nearestStations[0];

      if (!nearestStation || !maxDistance) {
        showNoStationAvailable(maxDistance || 200);
        return reject();
      }

      const distance = await checkUserDistanceFromCharger({ station: nearestStation, userGeolocation });

      const nearestStationRefreshed = await getChargerStation(nearestStation._id);

      if (distance > maxDistance || !nearestStationRefreshed) {
        showNoStationAvailable(maxDistance);
        return reject();
      }

      const availableChargers = nearestStationRefreshed.chargers.filter(charger => charger.state === ChargerState.online);

      if (!availableChargers.length) {
        showInfoModal({
          title: t('attention'),
          text: t('no chargers available near you'),
          buttonText: t('ok'),
        });
      }

      // se è presente un charger con più connettori vado alla pagina di selezione connettore
      // se è presente più di un charger vado alla pagina di selezione charger
      if (availableChargers.length === 1) {
        // @ts-ignore
        navigation.navigate('ChargerScreen', { charger: availableChargers[0], station: nearestStationRefreshed });
      } else {
        showMapStationModal({ chargersStation: nearestStationRefreshed, navigation });
      }
    });
  } catch (e) {
    console.log({ errorStartTouchAndRecharge: e });
  }
};

export const isToRestoreTransaction = (transaction: Transaction) => {
  return isToPayTransaction(transaction) || isInProgressTransaction(transaction);
};

export const isToPayTransaction = (transaction: Transaction) => {
  return (
    transaction.status === TransactionStatus.TRANSACTION_ENDED &&
    !transaction.isPayed &&
    !transaction.isFree &&
    transaction.rechargeKwh !== 0 &&
    transaction.requiresConfirmation
  );
};
export const isInProgressTransaction = (transaction: Transaction) => {
  const inProgressStatuses = [TransactionStatus.PARKING, TransactionStatus.CHARGING];
  return inProgressStatuses.includes(transaction.status);
};

export const getRechargingStatusName = (transactionStatus: TransactionStatus) => {
  switch (transactionStatus) {
    case TransactionStatus.CHARGING:
      return t('transactionStatus.charging');
    case TransactionStatus.SUSPENDED:
      return t('transactionStatus.suspended');
    case TransactionStatus.ERROR:
      return t('transactionStatus.error');
    case TransactionStatus.PARKING:
    case TransactionStatus.TRANSACTION_ENDED:
    case TransactionStatus.RECHARGE_ENDED:
      return t('transactionStatus.rechargeEnded');
    default:
      return '';
  }
};

export const isTransactionInGracePeriod = (transaction: Transaction) => {
  const gracePeriodStatus = [TransactionStatus.PARKING, TransactionStatus.SUSPENDED, TransactionStatus.RECHARGE_ENDED];
  return DateTime.fromISO(transaction?.gracePeriodEndingOn).diffNow().milliseconds > 0 && gracePeriodStatus.includes(transaction.status);
};
export const isTransactionInParking = (transaction: Transaction) => {
  return transaction.status === TransactionStatus.PARKING && !isTransactionInGracePeriod(transaction);
};

export const getTransactionPrice = (transaction: Transaction): number => {
  const coupon = transaction.coupon as Coupon;
  const kwPrice = transaction.rechargePlan.kwPrice;
  const kwh = getCurrentRechargedAmount(transaction);
  const basePrice = kwh * kwPrice;

  if (!coupon || !coupon.typology) {
    return basePrice;
  }

  if (coupon.typology.type === 'discount') {
    const discountPercentage = coupon.typology.discountPercentage || 0;
    return kwh * kwPrice - (kwh * kwPrice * discountPercentage) / 100;
  }
  if (coupon.typology.type === 'fixedPrice') {
    const priceInCents = coupon.typology.priceInCents || 0;
    return (priceInCents / 100) * kwh;
  }
  if (coupon.typology.type === 'free') {
    return 0;
  }
  if (coupon.typology.type === 'freeKwh') {
    const remainingKwh = coupon.typology.remainingKwh || 0;
    if (remainingKwh >= kwh) {
      return 0;
    }
    return (kwh - remainingKwh) * kwPrice;
  }

  return basePrice;
};

export const isNecessaryToPay = (coupon?: Coupon) => {
  if (!coupon) {
    return true;
  }
  return coupon.typology.hasParkingFree && coupon.typology.hasEndlessRecharges;
};
