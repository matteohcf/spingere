import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { colors, lightTheme } from '../../constant';
import { Col, FONTS, HeaderLeft, Icon, Text } from '../../components';
import { Home } from '../../screens/home/Home.tsx';
import { Profile } from '../../screens/profile/Profile.tsx';
import { useSelector } from 'react-redux';
import { userSelectors } from '../../store/user.ts';
import { baseOptionsHeader } from '../../screens/onboarding/OnBoardingNavigator.tsx';
import { Friends } from '../../screens/social/Friends.tsx';
import { Results } from '../../screens/results/Results.tsx';
import { UserDetail } from '../../screens/social/components/UserDetail.tsx';
import { User } from '../../types';
import { Notifications } from '../../screens/notifications/Notifications.tsx';
import { Map } from '../../screens/map/Map.tsx';
import { Pee } from '../../types/pee.ts';
import { DeleteAccount } from '../../screens/profile/DeleteAccount.tsx';
import { Leaderboards } from '../../screens/leaderboards/Leaderboards.tsx';
import { MyStatistics } from '../../screens/profile/MyStatistics.tsx';
import { CommonFriends } from '../../screens/social/components/CommonFriends.tsx';
import { ProfileMyData } from '../../screens/profile/profileMyData.tsx';
import { useFocusEffect } from '@react-navigation/native';
import { getNotificationsCount } from '../../api/user.ts';
import { useAppState } from '../../hooks/useAppState.ts';
import { PeeDetail } from '../../screens/home/peeDetail/PeeDetail.tsx';
import { Quest } from '../../types/quest.ts';
import { QuestDetail } from '../../screens/results/quests/QuestDetail.tsx';
import { UnlockedQuests } from '../../screens/results/quests/UnlockedQuests.tsx';
import {FriendsOfFriend} from "../../screens/social/components/FriendsOfFriend.tsx";

export const headerTitleStyle = {
  fontSize: 24,
  fontFamily: FONTS['600'],
  color: colors.textPrimary,
};

export type RootTabParamList = {
  Home: undefined;
  Friends: undefined;
  Profile: undefined;
  Results: undefined;
};
export type SharedStackParamList = {
  TabNavigator: undefined;
  UserDetail: { user: User };
  ProfileMyData: undefined;
  MyStatistics: undefined;
  Notifications: undefined;
  CommonFriends: { friendId?: string };
  FriendsOfFriends: { friend?: User };
  DeleteAccount: undefined;
  Map: { pee?: Pee };
  Leaderboards: undefined;
  PeeDetail: { pee: Pee; isAdd?: boolean };
  QuestDetail: { quest: Quest };
  UnlockedQuests: { quests: Quest[] };
};

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createNativeStackNavigator<SharedStackParamList>();

export const baseTabOptionsHeader = {
  headerStyle: {
    backgroundColor: 'transparent',
  },
  headerTitleStyle: headerTitleStyle,
  headerBackTitleVisible: false,
  headerTransparent: true,
  statusBarHidden: false,
  statusBarColor: 'transparent',
  statusBarStyle: 'light',
  headerShadowVisible: false,
};

export const transparentTabOptionsHeader = {
  headerStyle: {
    backgroundColor: 'transparent',
  },
  headerTitle: '',
  headerTransparent: true,
};

// export const baseOptionsHeader = {
//   headerStyle: {
//     backgroundColor: "transparent",
//   },
//   headerTitleStyle: headerTitleStyle,
//   headerBackTitleVisible: false,
//   headerTransparent: true,
//   statusBarTranslucent: true,
//   statusBarHidden: false,
//   statusBarColor: "transparent",
//   headerShadowVisible: false,
//   // headerTitleAlign: 'left',
// };

export const RootNavigator = () => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator
      screenOptions={{
        ...baseOptionsHeader,
        statusBarStyle: 'dark',
      }}>
      <Stack.Screen
        name={'TabNavigator'}
        component={TabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Group
        screenOptions={{
          ...baseOptionsHeader,
        }}>
        <Stack.Screen
          name={'PeeDetail'}
          component={PeeDetail}
          options={{
            headerTitle: t('add pee details'),
            headerLeft: () => <HeaderLeft showBack />,
            /*presentation: 'modal',*/
          }}
        />
        <Stack.Screen
          name={'QuestDetail'}
          component={QuestDetail}
          options={{
            headerTitle: t('quest details'),
            headerLeft: () => <HeaderLeft showBack />,
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          name={'UnlockedQuests'}
          component={UnlockedQuests}
          options={{
            headerTitle: t('unlocked quests'),
            headerLeft: () => <HeaderLeft showBack />,
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          name={'ProfileMyData'}
          component={ProfileMyData}
          options={{
            headerTitle: t('my data'),
            headerLeft: () => <HeaderLeft showBack />,
          }}
        />
        <Stack.Screen
          name={'MyStatistics'}
          component={MyStatistics}
          options={{
            headerTransparent: true,
            headerStyle: {
              backgroundColor: 'transparent',
            },
            headerTitle: t('my statistics'),
            headerLeft: () => <HeaderLeft showBack />,
          }}
        />
        <Stack.Screen
          name={'DeleteAccount'}
          component={DeleteAccount}
          options={{
            headerTitle: t('delete account'),
            headerLeft: () => <HeaderLeft showBack />,
          }}
        />
        <Stack.Screen
          name={'UserDetail'}
          component={UserDetail}
          options={{
            headerTitle: t(''),
          }}
        />
        <Stack.Screen
          name={'Notifications'}
          component={Notifications}
          options={{
            headerTitle: t('notifications'),
            headerLeft: () => <HeaderLeft showBack addPadding={false} />,
          }}
        />
        <Stack.Screen
          name={'CommonFriends'}
          component={CommonFriends}
          options={{
            headerTitle: t('common friends'),
            headerLeft: () => <HeaderLeft showBack addPadding={false} />,
          }}
        />
        <Stack.Screen
          name={'FriendsOfFriends'}
          component={FriendsOfFriend}
          options={{
            headerTitle: t('friends of friend'),
            headerLeft: () => <HeaderLeft showBack addPadding={false} />,
          }}
        />
        <Stack.Screen
          name={'Leaderboards'}
          component={Leaderboards}
          options={{
            headerTitle: t('leaderboards'),
            headerLeft: () => <HeaderLeft showBack addPadding={false} />,
          }}
        />
        <Stack.Screen
          name={'Map'}
          component={Map}
          options={{
            headerLeft: () => <HeaderLeft showBack />,
            ...transparentTabOptionsHeader,
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  const tabBarInactiveTintColor = lightTheme.colors.secondary;
  const tabBarActiveTintColor = lightTheme.colors.primary;
  const { t } = useTranslation();
  const appStateStatus = useAppState();

  const screenOptions = {
    tabBarInactiveTintColor,
    tabBarActiveTintColor,
    headerShadowVisible: false,
    headerShown: true,
  };

  const bottomNotifications = useSelector(userSelectors.bottomNotifications);
  const friends = bottomNotifications?.count || 0;

  useFocusEffect(
    React.useCallback(() => {
      if (appStateStatus === 'active') {
        console.log('update bottom notifications');
        getNotificationsCount();
      }
    }, [appStateStatus]),
  );

  return (
    <Tab.Navigator
      backBehavior={'history'}
      detachInactiveScreens={true}
      screenOptions={{
        tabBarStyle: {
          height: 84,
          backgroundColor: lightTheme.colors.bgPrimary,
          borderTopWidth: 1,
          borderColor: colors.secondary,
        },
        tabBarShowLabel: false,
        headerTitle: '',
        ...baseTabOptionsHeader,
        ...baseOptionsHeader,
      }}>
      <Tab.Screen
        name={'Home'}
        component={Home}
        options={{
          ...screenOptions,
          tabBarIcon: props => <BottomItem props={props} icon={['far', 'home']} iconSelected={['far', 'home']} text={t('home')} size={24} />,
        }}
      />
      <Tab.Screen
        name={'Results'}
        component={Results}
        options={{
          ...screenOptions,
          headerTitleAlign: 'left',
          headerTitle: t('results'),
          tabBarIcon: props => (
            <BottomItem props={props} icon={['far', 'party-horn']} iconSelected={['far', 'party-horn']} text={t('results')} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name={'Friends'}
        component={Friends}
        options={{
          ...screenOptions,
          headerTitleAlign: 'left',
          headerTitle: t('friends'),
          tabBarIcon: props => (
            <BottomItem props={props} notifications={friends} icon={['far', 'heart']} iconSelected={['far', 'heart']} text={t('friends')} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name={'Profile'}
        component={Profile}
        options={{
          ...screenOptions,
          headerTitleAlign: 'left',
          headerTitle: t('profile'),
          tabBarIcon: props => <BottomItem props={props} icon={['far', 'user']} iconSelected={['far', 'user']} text={t('profile')} size={24} />,
        }}
      />
    </Tab.Navigator>
  );
};

type BottomItemProps = {
  icon: any;
  iconSelected?: any;
  text?: string;
  props?: any;
  source?: any;
  size?: any;
  notifications?: any;
};

export const BottomItem = ({ icon, text, iconSelected, props, size, notifications }: BottomItemProps) => {
  const isSelect = props?.focused;
  return (
    <Col justifyContent={'center'} alignItems={'center'} gap={4} pt={12}>
      {!!notifications ? (
        <Col
          justifyContent={'center'}
          alignItems={'center'}
          ph={4}
          style={{
            position: 'absolute',
            zIndex: 1,
            top: 5,
            height: 20,
            minWidth: 20,
            backgroundColor: colors.primary,
            borderRadius: 10,
            right: -2,
          }}>
          <Text fontSize={12} fontWeight={'700'} color={colors.white} center>
            {notifications > 9 ? '9+' : notifications}
          </Text>
        </Col>
      ) : null}
      <Col alignItems={'center'} justifyContent={'center'} bgColor={isSelect ? 'subtle' : 'bgPrimary'} w={64} h={32} br={24}>
        <Icon icon={isSelect ? iconSelected : icon} {...props} size={isSelect ? size * 1.05 : size} />
      </Col>
      <Text fontWeight={isSelect ? '600' : '400'} {...props} fontSize={14}>
        {text}
      </Text>
    </Col>
  );
};
