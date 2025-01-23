import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useApiUseQuery } from '../../../hooks/useApiUseQuery.ts';
import { useStylesheet } from '../../../hooks/useStylesheet.ts';
import { Col, Icon, Row } from '../../../components';
import { colors, SHADOW } from '../../../constant';
import { FilterButton } from './FilterButton.tsx';
import { useLocationPermission } from 'react-native-vision-camera';
import { Theme } from '../../../types';
import _ from 'lodash';
import { point } from '@turf/turf';
import { trigger } from 'react-native-haptic-feedback';
import { useSelector } from 'react-redux';
import { userSelectors } from '../../../store/user.ts';
import { featureCollection } from '@turf/helpers';
import { MapManager } from '../../../managers/MapManager.tsx';

type Props = {
  navigation: any;
};

export enum FilterEnum {
  ALL = '',
  LAST = 100,
}

export const MapMarkers = ({ navigation }: Props) => {
  const styles = useStylesheet(createStyles);
  const [selectedFilter, setSelectedFilter] = useState<FilterEnum>(FilterEnum.LAST);
  const { hasPermission } = useLocationPermission();
  const userCoordinates = useSelector(userSelectors.geolocation);
  const { data: pees, isLoading, error } = useApiUseQuery({
    queryKey: [`pees/history-map-${selectedFilter}`],
    queryUrl: 'pees/history',
    filters: { limit: selectedFilter, sort: '-createdAt' },
  });

  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        hasPermission && (
          <Row gap={8}>
            <Col style={styles.centerButton} onPress={onPressCenterPosition}>
              <Icon icon={['fal', 'location-arrow']} size={18} color={colors.primary} />
            </Col>
            <FilterButton onPress={() => onPressSelectedFilter(selectedFilter)} selectedFilter={selectedFilter} disabled={isLoading} />
          </Row>
        ),
    });
  }, [navigation, hasPermission, selectedFilter, isLoading]);

  const mappedPees = useMemo(() => {
    return _.chain(pees)
      .filter(item => !!item?.position?.coordinates?.[0] && !!item?.position?.coordinates?.[1])
      .map(item => {
        return point([item?.position?.coordinates?.[0], item?.position?.coordinates?.[1]], {
          id: item._id,
          color: item.color,
        });
      })
      .value();
  }, [pees]);

  const onPressSelectedFilter = (filter: FilterEnum) => {
    if (filter === FilterEnum.ALL) {
      setSelectedFilter(FilterEnum.LAST);
    }
    if (filter === FilterEnum.LAST) {
      setSelectedFilter(FilterEnum.ALL);
    }
  };

  const onPressCenterPosition = () => {
    if (userCoordinates?.coordinates) {
      trigger('impactLight');
      MapManager.setCamera({
        position: userCoordinates.coordinates,
        zoomLevel: 16,
        animationDuration: 1000,
      })
    }
  };

  // const onPressMarker = useCallback(
  //   e => {
  //     console.log('onPressMarker', e, devices);
  //     const selectedDevice = devices.find(device => device._id === e?.features?.[0]?.properties?.id);
  //     if (selectedDevice) {
  //       navigation.navigate('MachineDetail', { device: selectedDevice });
  //     }
  //     console.log('selectedDevice', selectedDevice);
  //   },
  //   [navigation, devices],
  // );

  console.log('mappedPees', mappedPees);

  return (
    <>
      <Mapbox.ShapeSource id={'clusterds'} shape={featureCollection(mappedPees)} cluster>
        <Mapbox.SymbolLayer
          id={'cluster-count'}
          style={{
            textField: ['get', 'point_count'],
            textSize: 18,
            textColor: 'white',
            textPitchAlignment: 'map',
          }}
        />
        <Mapbox.CircleLayer
          id={'clusters'}
          belowLayerID={'cluster-count'}
          filter={['has', 'point_count']}
          style={{
            circlePitchAlignment: 'map',
            circleColor: colors.primary,
            circleRadius: [
              'interpolate',
              ['linear'],
              ['get', 'point_count'],
              1,
              12, // per 1 punto, raggio 20
              5,
              15, // per 5 punti, raggio 22
              10,
              20, // per 10 punti, raggio 20
              50,
              22, // per 50 punti, raggio 22
              100,
              25, // per 100 punti, raggio 25
              200,
              30, // per 200 punti, raggio 30
              500,
              30, // per 500 punti, raggio 30
              750,
              30, // per 750 punti, raggio 30
            ],
            circleOpacity: 0.9,
            circleStrokeWidth: 2,
            circleStrokeColor: 'white',
          }}
        />
      </Mapbox.ShapeSource>

      {/* Shape source per i marker non clusterizzati */}
      <Mapbox.ShapeSource id={'markers-source'} shape={featureCollection(mappedPees)} cluster >
        <Mapbox.CircleLayer
          id={'unclustered-point'}
          filter={['!', ['has', 'point_count']]}
          style={{
            circleColor: colors.primary,
            circleRadius: 10,
            circleOpacity: 0.9,
            circleStrokeWidth: 1,
            circleStrokeColor: 'white',
          }}
        />
      </Mapbox.ShapeSource>
    </>
  );
};

const createStyles = ({ colors, shapes, spacing }: Theme) =>
  StyleSheet.create({
    centerButton: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 40,
      height: 40,
      borderRadius: shapes.md,
      backgroundColor: colors.white,
      ...SHADOW.MEDIUM,
    },
  });
