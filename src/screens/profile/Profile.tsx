import React from 'react';
import { Card, Col, Container, Icon, Row, Text } from '../../components';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootTabParamList, SharedStackParamList } from '../../core/navigation/RootNavigator.tsx';
import { Linking, ScrollView, StyleSheet } from 'react-native';
import { Theme } from '../../types';
import { useStylesheet } from '../../hooks/useStylesheet.ts';
import { useTranslation } from 'react-i18next';
import { colors } from '../../constant';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useSelector } from 'react-redux';
import { userActions, userSelectors } from '../../store/user.ts';
import { logout } from '../../utils/user.ts';
import { CONFIG } from '../../../config.js';
import { ProfileImageComponent } from './components/ProfileImageComponent.tsx';
import { store } from '../../store';
import { MyStatisticsButton } from './components/MyStatisticsButton.tsx';
import { StreakPeesBox } from '../social/components/StreakPeesBox.tsx';
import { useQueryClient } from '@tanstack/react-query';

type Props = NativeStackScreenProps<SharedStackParamList, 'TabNavigator'>;

export const Profile = ({ navigation }: Props) => {
  const { t } = useTranslation();
  const styles = useStylesheet(createStyles);
  const userDetail = useSelector(userSelectors.detail);
  const queryClient = useQueryClient();

  const onPressUserDetail = () => {
    navigation.push('ProfileMyData');
  };

  const onPressPrivacyPolicy = () => {
    Linking.openURL(CONFIG.PRIVACY_AND_POLICY_URL);
  };

  /*const onPressTermsAndConditions = () => {};*/

  const onPressDeleteAccount = () => {
    navigation.push('DeleteAccount');
  };

  const onPressTutorial = () => {
    store.dispatch(userActions.setVisitedTutorial(false));
  };

  const onPressMyStatisticsButton = () => {
    navigation.push('MyStatistics');
  };

  const onPressLogout = () => {
    queryClient.clear();
    logout();
  };

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Col alignItems={'center'}>
          <ProfileImageComponent />
          <Text mv={12} fontSize={20} fontWeight={'700'}>
            {userDetail?.name} {userDetail?.surname}
          </Text>
        </Col>
        {/*<MyStatisticsButton onPress={onPressMyStatisticsButton} />*/}
        <Text fontSize={14} fontWeight={'500'} color={colors.textPrimary} mb={4} mt={12}>
          {t('account and privacy')}
        </Text>
        <Card>
          <MenuRow title={t('my data')} onPress={onPressUserDetail} icon={['fal', 'user']} />
          <MenuRow title={t('tutorial')} onPress={onPressTutorial} icon={['fal', 'book-font']} />
          {/*<MenuRow title={t('terms and conditions')} onPress={onPressTermsAndConditions} icon={['fal', 'memo']} />*/}
          <MenuRow title={t('privacy e policy')} onPress={onPressPrivacyPolicy} icon={['fal', 'shield']} showBorder={false} />
        </Card>
        <Text mt={16} fontSize={14} fontWeight={'500'} color={colors.textPrimary} mb={4}>
          {t('handle account')}
        </Text>
        <Card>
          <MenuRow title={t('delete account')} onPress={onPressDeleteAccount} icon={['fal', 'user-xmark']} />
          <MenuRow title={t('exit')} onPress={onPressLogout} icon={['fal', 'arrow-right-from-bracket']} showBorder={false} />
        </Card>
      </ScrollView>
    </Container>
  );
};

type MenuRowProps = {
  title: string;
  onPress: () => void;
  icon: IconProp;
  showBorder?: boolean;
};

const MenuRow = ({ title, onPress, icon, showBorder = true }: MenuRowProps) => {
  return (
    <Col onPress={onPress}>
      <Row alignItems={'center'} h={48}>
        <Icon size={22} icon={icon} color={colors.textPrimary} />
        <Text fontSize={14} fontWeight={'500'} ml={4}>
          {title}
        </Text>
      </Row>
      {showBorder && <Row ml={34} h={1} bgColor={'borderDefault'} />}
    </Col>
  );
};

const createStyles = ({ shapes }: Theme) => StyleSheet.create({});
