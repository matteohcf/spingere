import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text } from '../../../components';
import { colors, HEIGHT_DEVICE, WIDTH_DEVICE } from '../../../constant';
import { Theme, User } from '../../../types';
import { useStylesheet } from '../../../hooks/useStylesheet.ts';
import { useSelector } from 'react-redux';
import { userSelectors } from '../../../store/user.ts';
import Mapbox from '@rnmapbox/maps';
import _ from 'lodash';
import { clusterPoints } from '../../../utils/geolocation.ts';

type Props = {
  user: User;
  userPeesMap: any;
};

export const UserDetailMap = ({ user, userPeesMap }: Props) => {
  const styles = useStylesheet(createStyles);
  const userData = useSelector(userSelectors.detail);
  const userCoordinates = useSelector(userSelectors.geolocation);

  const getUserPees = (userId: string, data: [], index = 0): any[] => {
    const user = data[index];
    if (index >= data.length) {
      return [];
    }
    const id = _.get(user, '_id', '');
    if (userId !== id) {
      return getUserPees(userId, data, index + 1);
    }
    return _.get(user, 'pees', []);
  };

  const myPees = getUserPees(userData?._id || '', userPeesMap);
  const myPeesRecords: any[] = useMemo(() => clusterPoints(myPees), [myPees]);

  const friendPees = getUserPees(user?._id || '', userPeesMap);
  const friendPeesRecords: any[] = useMemo(() => clusterPoints(friendPees), [friendPees]);


  return (
    <ScrollView style={styles.scrollView}>
      <Mapbox.MapView style={styles.map} styleURL={Mapbox.StyleURL.Light} logoEnabled={false} attributionEnabled={false} scaleBarEnabled={false}>
        <Mapbox.Camera zoomLevel={10} centerCoordinate={userCoordinates?.coordinates} animationMode={'flyTo'} animationDuration={2000} />

        {myPeesRecords?.map((item, index) => (
          <Mapbox.PointAnnotation key={`cluster-${index}`} id={`cluster-${index}`} coordinate={item[0]?.position?.coordinates}>
            <View style={styles.myPeesAnnotationContainer}>
              <View style={styles.myPeesAnnotationFill}>
                {item.length > 1 && (
                  <Text color={colors.white} fontSize={20} fontWeight={'700'}>
                    {item.length}
                  </Text>
                )}
              </View>
            </View>
          </Mapbox.PointAnnotation>
        ))}

        {friendPeesRecords?.map((item, index) => (
          <Mapbox.PointAnnotation key={`cluster-${index}`} id={`cluster-${index}`} coordinate={item[0]?.position?.coordinates}>
            <View style={styles.friendPeesAnnotationContainer}>
              <View style={styles.friendPeesAnnotationFill}>
                {item.length > 1 && (
                  <Text color={colors.white} fontSize={20} fontWeight={'700'}>
                    {item.length}
                  </Text>
                )}
              </View>
            </View>
          </Mapbox.PointAnnotation>
        ))}
      </Mapbox.MapView>
    </ScrollView>
  );
};

const createStyles = ({ colors, spacing, shapes, fontSizes, insets }: Theme) =>
  StyleSheet.create({
    scrollView: {
      marginBottom: insets.safeBottom * 3,
      borderRadius: shapes.md,
    },
    map: {
      width: WIDTH_DEVICE - spacing.screenHorizontal,
      height: HEIGHT_DEVICE / 2,
    },
    myPeesAnnotationContainer: {
      width: 24,
      height: 24,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.bgSurface1,
      borderRadius: 12,
    },
    myPeesAnnotationFill: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: colors.secondary,
      transform: [{ scale: 0.6 }],
      alignItems: 'center',
      justifyContent: 'center',
    },
    friendPeesAnnotationContainer: {
      width: 24,
      height: 24,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primary,
      borderRadius: 12,
    },
    friendPeesAnnotationFill: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: colors.secondary,
      transform: [{ scale: 0.6 }],
      alignItems: 'center',
      justifyContent: 'center',
    },
    commonPeesAnnotationContainer: {
      width: 24,
      height: 24,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.success,
      borderRadius: 12,
    },
    commonPeesAnnotationFill: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: colors.secondary,
      transform: [{ scale: 0.6 }],
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
