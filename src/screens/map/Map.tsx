import React, { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import Mapbox from '@rnmapbox/maps';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SharedStackParamList } from '../../core/navigation/RootNavigator.tsx';
import { useStylesheet } from '../../hooks/useStylesheet.ts';
import { Theme } from '../../types';
import { userSelectors } from '../../store/user.ts';
import { useSelector } from 'react-redux';
import { colors, HEIGHT_DEVICE, spacing } from '../../constant';
import { CONFIG } from '../../../config';
import { Col, Text } from '../../components';
import { useLocationPermission } from 'react-native-vision-camera';
import { t } from 'i18next';
import { MapManager } from '../../managers/MapManager.tsx';
import { MapMarkers } from './components/MapMarkers.tsx';

Mapbox.setAccessToken(CONFIG.MAPBOX_ACCESS_TOKEN).catch(console.error);

type Props = NativeStackScreenProps<SharedStackParamList, 'Map'>;


export const Map = ({ navigation, route }: Props) => {
  const passedPee = route.params?.pee;
  const styles = useStylesheet(createStyles);
  const mapViewRef = useRef<Mapbox.MapView>(null);
  const cameraRef = useRef<Mapbox.Camera>(null);
  const { hasPermission } = useLocationPermission();
  const userCoordinates = useSelector(userSelectors.geolocation);


  useEffect(() => {
    MapManager.registerView(mapViewRef);
    MapManager.registerCamera(cameraRef);
  }, []);

  const zoomLevel = passedPee ? 16 : 10;
  const centerCoordinates = passedPee ? passedPee?.position?.coordinates : userCoordinates?.coordinates;

  return (
    <View style={{ flex: 1, backgroundColor: colors.containerBckGround }}>
      {hasPermission && (
        <Mapbox.MapView
          ref={mapViewRef}
          style={{ flex: 1 }}
          styleURL="mapbox://styles/mapbox/light-v11"
          projection={'globe'}
          logoEnabled={false}
          attributionEnabled={false}
          scaleBarEnabled={false}>
          <Mapbox.Camera ref={cameraRef} zoomLevel={zoomLevel} centerCoordinate={centerCoordinates} animationMode={'flyTo'} animationDuration={2000} />
          <MapMarkers navigation={navigation} />
        </Mapbox.MapView>
      )}
      {!hasPermission && (
        <Col alignItems={'center'} mt={HEIGHT_DEVICE / 3} mh={spacing.screenHorizontal}>
          <Text mt={50} fontSize={16}>
            {t('you do not have location permission')}
          </Text>
        </Col>
      )}
    </View>
  );
};

const createStyles = ({ colors, insets, shapes }: Theme) =>
  StyleSheet.create({
  });
