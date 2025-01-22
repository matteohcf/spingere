import _ from 'lodash';
import { Platform, Linking } from 'react-native';
// import { GooglePlaceDetail, PlaceType } from 'react-native-google-places-autocomplete';

export const findAddressComponent = (details: GooglePlaceDetail, placeType: PlaceType, path: 'short_name' | 'long_name' = 'short_name') => {
  const addressComponents = _.get(details, 'address_components');
  if (addressComponents) {
    return _.get(
      _.find(addressComponents, d => _.includes(d.types, placeType)),
      path,
      '',
    );
  }
};

export const getFormattedAddressFromPlaceDetail = (place: GooglePlaceDetail) => {
  const formattedAddress = {
    // address: _.get(place, 'formatted_address'),
    position: {
      type: 'Point',
      coordinates: [_.get(place, 'geometry.location.lng'), _.get(place, 'geometry.location.lat')],
    },
    plainAddress: _.get(place, 'formatted_address'),
    placeId: _.get(place, 'place_id'),
    country: findAddressComponent(place, 'country'),
    region: findAddressComponent(place, 'administrative_area_level_1'),
    province: findAddressComponent(place, 'administrative_area_level_2', 'long_name'),
    city: findAddressComponent(place, 'administrative_area_level_3'),
    zipCode: findAddressComponent(place, 'postal_code'),
    streetNumber: findAddressComponent(place, 'street_number'),
  };
  return _.cloneDeep(formattedAddress);
};

export const getFormattedAddressFromPlaceDetailSecond = (place: GooglePlaceDetail) => {
  const formattedAddress = {
    placeId: _.get(place, 'place_id'),
    plainAddress: _.get(place, 'formatted_address'),
    position: {
      type: 'Point',
      coordinates: [_.get(place, 'geometry.location.lng'), _.get(place, 'geometry.location.lat')],
    },
    address: findAddressComponent(place, 'route'),
    country: findAddressComponent(place, 'country'),
    countryLong: findAddressComponent(place, 'country', 'long_name'),
    province: findAddressComponent(place, 'administrative_area_level_2', 'short_name'),
    city: findAddressComponent(place, 'administrative_area_level_3'),
    zipCode: findAddressComponent(place, 'postal_code'),
    streetNumber: findAddressComponent(place, 'street_number'),
  };
  return _.cloneDeep(formattedAddress);
};

export const openMapsByAddress = (address: string) => {
  const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
  const url = Platform.select({
    ios: `${scheme}${address}@`,
    android: `${scheme}(${address})`,
  });

  if (url) {
    Linking.openURL(url).catch(console.error);
  }
};

export const openMapsByCoordinates = (coordinates: Array<number>) => {
  const lat = coordinates[1];
  const lng = coordinates[0];
  const latLng = `${lat},${lng}`;
  if (!lat || !lng) {
    return;
  }
  const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
  const url = Platform.select({
    ios: `${scheme}${latLng}`,
    android: `${scheme}${latLng}`,
  });

  if (url) {
    Linking.openURL(url).catch(console.error);
  }
};

export const openIosGoogleMapsByCoordinates = (coordinates: Array<number>) => {
  const lat = coordinates[1];
  const lng = coordinates[0];

  const url = `https://maps.google.com/?ll=${lat},${lng}&q=${lat},${lng}`;

  if (url) {
    Linking.openURL(url).catch(console.error);
  }
};

export const getServerPositionFromCoordinates = async (coordinates: Array<number>) => {
  if (coordinates) {
    return {
      type: 'Point',
      coordinates,
    };
  }
  return null;
};

export const CUSTOM_MAP_STYLES = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#ebe3cd',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#523735',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#f5f1e6',
      },
    ],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#c9b2a6',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#dcd2be',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#ae9e90',
      },
    ],
  },
  {
    featureType: 'landscape.natural',
    elementType: 'geometry',
    stylers: [
      {
        color: '#dfd2ae',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [
      {
        color: '#dfd2ae',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#93817c',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#a5b076',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#447530',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        color: '#f5f1e6',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [
      {
        color: '#fdfcf8',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#f8c967',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#e9bc62',
      },
    ],
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry',
    stylers: [
      {
        color: '#e98d58',
      },
    ],
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#db8555',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#806b63',
      },
    ],
  },
  {
    featureType: 'transit.line',
    elementType: 'geometry',
    stylers: [
      {
        color: '#dfd2ae',
      },
    ],
  },
  {
    featureType: 'transit.line',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#8f7d77',
      },
    ],
  },
  {
    featureType: 'transit.line',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#ebe3cd',
      },
    ],
  },
  {
    featureType: 'transit.station',
    elementType: 'geometry',
    stylers: [
      {
        color: '#dfd2ae',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#b9d3c2',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#92998d',
      },
    ],
  },
];
