import { Station, StationState } from '../types/station';
import { UserGeolocation } from '../types';
import { getMaxDistanceForRecharge } from '../api/stations';
import { getDistanceBetweenTwoCoordinates } from './geolocation';

export const findStationCircleColorByStatus = (status: StationState) => {
  // TODO status switch
  switch (status) {
    case StationState.online:
      return '#20D86A';
    case StationState.busy:
      return '#FFCB12';
    case StationState.underMaintenance:
      return '#FF455A';
    case StationState.underConstruction:
      return '#FF455A';
    default:
      return 'blue';
  }
};

type CheckUserDistanceFromChargerProps = {
  station: Station;
  userGeolocation: UserGeolocation;
};

export const checkUserDistanceFromCharger = async ({ station, userGeolocation }: CheckUserDistanceFromChargerProps): Promise<number> => {
  const userCoordinates = userGeolocation.coordinates;
  const stationCoordinates = station.location.coordinates;
  const distanceKm = getDistanceBetweenTwoCoordinates(userCoordinates, stationCoordinates);
  return distanceKm * 1000;
};
