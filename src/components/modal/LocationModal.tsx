import React from 'react';
import { StyleSheet } from 'react-native';
import { Col, Icon, Row, Text } from '../ui';
import { useTheme } from '../../hooks/useTheme';
import { HEIGHT_DEVICE, WIDTH_DEVICE } from '../../constant';
import { Theme } from '../../types';
import { useStylesheet } from '../../hooks/useStylesheet';
import { showLocationModalProps } from './Modals';
import { useTranslation } from 'react-i18next';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { CONFIG } from '../../../config';
import { getFormattedAddressFromPlaceDetail } from '../../utils/maps';
import { ModalManager } from './ModalManager';
import { getAddressFromCoordinates, getMyValidCoordinates } from '../../utils/geolocation';

export const LocationModal = ({ onSelectAddress }: showLocationModalProps) => {
  const { colors, spacing } = useTheme();
  const styles = useStylesheet(createStyles);
  const { t } = useTranslation();

  const onPress = (data, details) => {
    ModalManager.hide();
    if (!details?.geometry) {
      return;
    }
    console.log({ details });
    const addressDetails = getFormattedAddressFromPlaceDetail(details);
    if (onSelectAddress) {
      onSelectAddress(addressDetails);
      return;
    }
    // navigation.navigate({
    //   name: routes[routes.length - 2]?.name,
    //   params: {
    //     addressDetails: getFormattedAddressFromPlaceDetail(details),
    //   },
    //   merge: true,
    // });
  };

  const onPressAutoLocation = async () => {
    const myPosition = await getMyValidCoordinates(true);
    console.log({ myPosition });
    if (myPosition) {
      const myAddress = await getAddressFromCoordinates({
        latitude: myPosition.coords.latitude,
        longitude: myPosition.coords.longitude,
      });
      if (myAddress) {
        onSelectAddress(myAddress);
        ModalManager.hide();
        return;
      }
    }
  };

  return (
    <Col style={styles.container}>
      <Row alignItems={'center'} w={'100%'} justifyContent={'space-between'} mb={10}>
        <Text fontSize={16}>{t('search address')}</Text>
        <Icon onPress={onPressAutoLocation} icon={['fas', 'location']} color={colors.secondary} size={30} />
      </Row>
      <GooglePlacesAutocomplete
        styles={{
          container: {
            width: WIDTH_DEVICE - spacing.screenHorizontal * 2,
            backgroundColor: 'transparent',
          },
          row: {
            backgroundColor: 'transparent',
          },
          listView: {},
          description: {
            color: colors.black,
          },
        }}
        enablePoweredByContainer={false}
        listUnderlayColor="transparent"
        placeholder={t('search')}
        numberOfLines={10}
        nearbyPlacesAPI="GooglePlacesSearch"
        textInputProps={{
          autoFocus: true,
          placeholderTextColor: 'grey',
          borderWidth: 0.5,
          backgroundColor: 'transparent',
          borderColor: 'gray',
          height: 50,
          cursorColor: 'gray',
          color: 'gray',
        }}
        fetchDetails
        onPress={onPress}
        query={{
          key: CONFIG.GOOGLE_API_KEY,
          language: 'it',
        }}
      />
    </Col>
  );
};

const createStyles = ({ colors, spacing }: Theme) =>
  StyleSheet.create({
    container: {
      alignItems: 'flex-start',
      paddingHorizontal: spacing.screenHorizontal,
      width: WIDTH_DEVICE,
      height: HEIGHT_DEVICE * 0.8,
      backgroundColor: colors.white,
      borderRadius: 10,
      marginBottom: 50,
      marginTop: spacing.screenVertical,
    },
  });
