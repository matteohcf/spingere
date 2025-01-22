import React, { useEffect, useMemo, useState } from 'react';
import { SharedStackParamList } from '../../core/navigation/RootNavigator';
import { Col, Container, Icon, Row, Text } from '../../components';
import { Theme } from '../../types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import { PeeButton } from './components/PeeButton.tsx';
import { useStylesheet } from '../../hooks/useStylesheet.ts';
import { colors, spacing } from '../../constant';
import { useGetCurrentCoordinates } from '../../hooks/useGetCurrentCoordinates.ts';
import { requestTrackingPermission } from 'react-native-tracking-transparency';
import { useDispatch, useSelector } from 'react-redux';
import { userSelectors } from '../../store/user.ts';
import { getMe } from '../../api/user.ts';
import { useAppState } from '../../hooks/useAppState.ts';
import { TabSwitch } from '../../components/layout/TabSwitch.tsx';
import { Statistics } from './statistics/Statistics.tsx';
import { History } from './history/History.tsx';
import { t } from 'i18next';
import { updateUserNotificationToken } from '../../utils/notifications.ts';
import { showAlertSiteModal } from '../../components/floatingModal';
import { useQueryClient } from '@tanstack/react-query';
import { useIsStreakExpiring } from '../../hooks/useIsStreakExpiring.ts';
import { IS_DEV } from '../../../config';
import { useCheckForceUpdate } from "../../hooks/useCheckForceUpdate.ts";
import { FilterEnum } from "../map/components/MapMarkers.tsx";

type Props = NativeStackScreenProps<SharedStackParamList, 'TabNavigator'>;

enum Tabs {
  STATISTICS = 'statistics',
  HISTORY = 'history',
}

const tabs = [Tabs.STATISTICS, Tabs.HISTORY];

export const Home = ({ navigation }: Props) => {
  const styles = useStylesheet(createStyles);
  const [selectedTab, setSelectedTab] = useState<Tabs>(Tabs.STATISTICS);
  const dispatch = useDispatch();
  const userData = useSelector(userSelectors.detail);
  const isLogged = useSelector(userSelectors.isLogged);
  const isStreakExpiring = useIsStreakExpiring();
  const appStateStatus = useAppState();
  const queryClient = useQueryClient();
  useGetCurrentCoordinates();
  useCheckForceUpdate();

  // useEffect(() => {
  //   queryClient.resetQueries();
  //   queryClient.invalidateQueries();
  //   queryClient.clear();
  // }, [userData?._id]);

  useEffect(() => {
    requestTrackingPermission();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Row mh={spacing.screenHorizontal}>
          <Row alignItems={'flex-end'}>
            <Text fontSize={20} fontWeight={'500'} mb={2}>
              {userData?.streakPees || 0}
            </Text>
            <Text fontSize={24} ml={4}>
              🔥
            </Text>
            {isStreakExpiring && (
              <Text fontSize={14} ml={0} mb={2}>
                ⏳
              </Text>
            )}
          </Row>
          {IS_DEV && (
            <Col justifyContent={'center'} ml={44}>
              <Text>DEV</Text>
            </Col>
          )}
        </Row>
      ),
      headerRight: () => (
        <Icon
          icon={['fal', 'map-location-dot']}
          size={28}
          mh={spacing.screenHorizontal}
          color={colors.black}
          onPress={() => {
            navigation.push('Map', {});
          }}
        />
      ),
    });
  }, [navigation, userData]);

  useEffect(() => {
    if (isLogged) {
      getMe().then(user => {
        // re add preferences
        console.log(user);
      });
      updateUserNotificationToken();
    } else {
      // navigation.navigate('Home');
    }
  }, [dispatch, isLogged, navigation]);

  const onPressPeeButton = (peeResponse: any) => {
    setTimeout(async () => {
      queryClient.invalidateQueries({ queryKey: ['pees/history-history'] });
      queryClient.invalidateQueries({ queryKey: ['peesWeeklyKpi'] });
      queryClient.invalidateQueries({ queryKey: ['questsChallenges'] });
      queryClient.invalidateQueries({ queryKey: ['questsBadges'] });
      queryClient.invalidateQueries({ queryKey: [`pees/history-map-${FilterEnum.ALL}`] });
      queryClient.invalidateQueries({ queryKey: [`pees/history-map-${FilterEnum.LAST}`] });
      await getMe();
      if (peeResponse?.quests?.length > 0) {
        navigation.push('UnlockedQuests', { quests: peeResponse.quests });
      } else {
        showAlertSiteModal({
          title: t('add pee information title'),
          description: t('add pee information description'),
          showConfirm: true,
          confirmText: t('add'),
          type: 'success',
          showUndo: true,
          undoText: t('cancel'),
          onConfirm: () => {
            navigation.push('PeeDetail', { pee: peeResponse.pee, isAdd: true });
          },
        });
      }
    }, 400);
  };

  const HeaderComponent = (
    <>
      <Col mt={12} mb={12}>
        <PeeButton onPress={onPressPeeButton} />
        <TabSwitch tabs={tabs} selectedTab={selectedTab} onPressTab={setSelectedTab} mt={spacing.screenVertical} />
      </Col>
    </>
  );

  return (
    <Container>
      <Statistics headerComponent={HeaderComponent} visible={selectedTab === Tabs.STATISTICS} />
      <History navigation={navigation} headerComponent={HeaderComponent} visible={selectedTab === Tabs.HISTORY} />
    </Container>
  );
};

const createStyles = ({ colors, spacing, shapes }: Theme) => StyleSheet.create({});
