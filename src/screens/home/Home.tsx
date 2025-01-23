import React, { useEffect } from 'react';
import { SharedStackParamList } from '../../core/navigation/RootNavigator';
import { Container, Text } from '../../components';
import { Theme } from '../../types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import { useStylesheet } from '../../hooks/useStylesheet.ts';
import { requestTrackingPermission } from 'react-native-tracking-transparency';
import { useDispatch, useSelector } from 'react-redux';
import { userSelectors } from '../../store/user.ts';

type Props = NativeStackScreenProps<SharedStackParamList, 'TabNavigator'>;


export const Home = ({ navigation }: Props) => {
  const styles = useStylesheet(createStyles);
  const dispatch = useDispatch();
  const userData = useSelector(userSelectors.detail);
  const isLogged = useSelector(userSelectors.isLogged);
  // const appStateStatus = useAppState();
  // const queryClient = useQueryClient();
  // useGetCurrentCoordinates();
  // useCheckForceUpdate();

  console.log('userData', userData);
  console.log('isLogged',isLogged)

  // useEffect(() => {
  //   queryClient.resetQueries();
  //   queryClient.invalidateQueries();
  //   queryClient.clear();
  // }, [userData?._id]);

  useEffect(() => {
    requestTrackingPermission();
  }, []);

  // useEffect(() => {
  //   if (isLogged) {
  //     getMe().then(user => {
  //       // re add preferences
  //       console.log(user);
  //     });
  //     updateUserNotificationToken();
  //   } else {
  //     // navigation.navigate('Home');
  //   }
  // }, [dispatch, isLogged, navigation]);

  return (
    <Container>
      <Text>{userData?.email}</Text>
      <Text>{userData?.displayName}</Text>
    </Container>
  );
};

const createStyles = ({ colors, spacing, shapes }: Theme) => StyleSheet.create({});
