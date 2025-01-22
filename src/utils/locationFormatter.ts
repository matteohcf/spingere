import _, { compact } from 'lodash';

export const setDta = (data: any) => {
  return _(data)
    .filter(s => !!s.location)
    .map(mapStation)
    .value();
};

const mapStation = (stationRes: any) => {
  return {
    ...stationRes,
    id: stationRes._id || `station-${Math.random()}`,
    distance: stationRes.distance || NaN,
    name: stationRes.name,
    chargers: mapChargers(stationRes.chargers || []),
    location: stationRes.location ? mapLocation(stationRes.location) : undefined,
    state: stationRes.state || null,
    provider: stationRes.provider || null,
    clusterSize: stationRes.clusterSize || 1,
    privateProperty: stationRes.privateProperty,
  };
};

const mapLocation = (locationRes: any) => {
  return {
    id: locationRes._id,
    name: locationRes.name,
    address: locationRes.address,
    city: locationRes.city,
    province: locationRes.province,
    zipCode: locationRes.zipCode,
    coordinates: mapCoordinates(locationRes.coordinates),
    fullAddress: locationRes.fullAddress || '',
    // clusterin components requires coordinates
    // to be at this level
    ...mapCoordinates(locationRes.coordinates),
  };
};

const mapCoordinates = (coordinatesRes: number[]) => {
  return {
    longitude: coordinatesRes[0] || 0,
    latitude: coordinatesRes[1] || 0,
  };
};

const mapChargers = (response: any[]) => {
  return response.map(mapCharger);
};

const mapCharger = (chargerRes: any) => {
  return {
    ...chargerRes,
    id: chargerRes._id,
    name: chargerRes.name,
    stationId: chargerRes.stationId,
    images: mapResources(chargerRes.images),
    connectors: mapConnectors(chargerRes.connectors),
    additionalInfo: chargerRes.additionalInfo || '',
    state: chargerRes.state,
    isAvailable: chargerIsAvailable(chargerRes),
    labelText: chargerRes.labelText,
    labelColor: chargerRes.labelColor,
    managedOffline: chargerRes.managedOffline,
    contactPhone: chargerRes.contactPhone,
  };
};

const chargerIsAvailable = charger => {
  return _.chain(charger)
    .get('connectors')
    .reduce((a, c) => a || c.isAvailable, false)
    .value();
};

const mapConnectors = (response: any[]) => {
  if (!response) {
    return [];
  }

  return response.map(mapConnector);
};

const mapConnector = (connectorRes: any) => {
  return {
    ...connectorRes,
    id: connectorRes._id,
    number: connectorRes.number,
    connectorType: connectorRes.connectorType
      ? mapConnectorType(connectorRes.connectorType)
      : undefined,
    power: connectorRes.power,
    state: connectorRes.state || 'offline',
    isAvailable: connectorRes.isAvailable,
    busyUntil: connectorRes.reservedUntil,
    prices: connectorRes.prices ? mapPrices(compact(connectorRes.prices)) : [],
    labelText: connectorRes.labelText,
    labelColor: connectorRes.labelColor,
    reservedBy: connectorRes.reservedBy,
  };
};

const mapConnectorType = ({ name, icon }: any) => {
  return {
    name,
    icon: icon ? mapResource(icon) : undefined,
  };
};

const mapPrices = (response: any[]) => {
  if (!response) {
    return [];
  }

  return response.map(mapPrice);
};

const mapPrice = priceRes => {
  return {
    id: priceRes._id,
    time: priceRes.time,
    price: priceRes.price,
    kwPrice: priceRes.kwPrice,
    isFree: priceRes.isFree,
    discountedPrice: priceRes.discountedPrice,
    chargingType: priceRes.chargingType,
    currency: priceRes.chargingType === 'time' ? '€' : '€/kWh',
  };
};

const mapResources = (response: any) => {
  if (!response) {
    return [];
  }

  return response.map(mapResource);
};

const mapResource = ({ _id, documentType, full, thumbnail }: any) => {
  return {
    id: _id,
    full,
    thumbnail: mapResourceThumbnail(thumbnail),
    type: documentType,
  };
};

const mapResourceThumbnail = ({ medium, squared }: any) => {
  return {
    medium,
    squared,
  };
};
