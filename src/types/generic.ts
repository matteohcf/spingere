export type AddressSchema = {
  streetNumber: string;
  streetName: string;
  zipCode: string;
  city: string;
  province: string;
  provinceCode: string;
  region: string;
  country: string;
  countryCode: string;
  plainAddress: string;
  position: {
    type: string;
    coordinates: [number, number];
  };
  placeId: string;
};
