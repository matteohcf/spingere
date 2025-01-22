import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../hooks/useTheme';
import { Icon } from './Icon';
import { Row } from './Row';
import { Text } from './Text';
import { LottieHeaderLogo } from './LottieHeaderLogo.tsx';
import { IS_ANDROID } from "../../utils/platform.ts";

type HeaderLeftProps = {
  showBack?: boolean;
  headerLogo?: boolean;
  addPadding?: boolean;
  onPressGoBack?: () => void;
  goBackText?: string;
  text?: string;
  goBackTextColor?: string;
  leftLogo?: boolean;
};

export const HeaderLeft = ({
  showBack,
  onPressGoBack,
  text,
  goBackText,
  goBackTextColor,
  addPadding = false,
  headerLogo,
  leftLogo,
}: HeaderLeftProps) => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { colors, spacing } = useTheme();
  const onPressBack = () => {
    onPressGoBack ? onPressGoBack() : navigation.goBack();
  };

  const goBackIcon = (
    <Row
      onPress={onPressBack}
      alignItems={'center'}
      justifyContent={'center'}
      bgColor={colors.white}
      h={40}
      w={40}
      br={20}
      shadow={true}
      style={
        {
          marginRight: IS_ANDROID ? 12 : 0,
        }
      }
      hitSlop={10}>
      <Icon size={20} icon={['fal', 'arrow-left']} color={colors.primary} />
      {goBackText && (
        <Text color={goBackTextColor || colors.textPrimary} fontSize={20}>
          {goBackText}
        </Text>
      )}
    </Row>
  );

  const TextHeader = (
    <Text fontWeight={'700'} fontSize={20}>
      {text}
    </Text>
  );

  return (
    <Row ph={addPadding ? spacing.screenHorizontal : 0} gap={spacing.screenHorizontal} style={{}} alignItems={'center'}>
      {showBack && goBackIcon}
      {leftLogo && <HeaderLeftLogo {...leftLogo} />}
      {!!text && TextHeader}
      {headerLogo && <HeaderLogo />}
    </Row>
  );
};

type HeaderRightProps = {
  icon?: any;
  onPress?: () => void;
  addPadding: boolean;
  text?: string;
  source?: any;
};

export const HeaderRight = ({ icon, text, source, onPress, addPadding = false }: HeaderRightProps) => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { colors, spacing } = useTheme();

  const TextRight = (
    <Row onPress={onPress} alignItems={'center'} justifyContent={'center'} pr={addPadding ? spacing.screenHorizontal : 0}>
      <Text color={colors.secondary} fontSize={20}>
        {text}
      </Text>
    </Row>
  );

  return (
    <Row alignItems={'center'}>
      <Icon pr={addPadding ? spacing.screenHorizontal : 0} onPress={onPress} size={24} source={source} icon={icon} color={'white'} style={{}} />
      {text && TextRight}
    </Row>
  );
};

const HeaderLogo = () => {
  return (
    <Row>
      <LottieHeaderLogo />
    </Row>
  );
};

const HeaderLeftLogo = (image: any) => {
  return (
    <Row>
      {/*<Image*/}
      {/*  resizeMode={"contain"}*/}
      {/*  source={logoImage}*/}
      {/*  style={{ width: 100, height: 32, marginRight: 12, marginBottom: 8 }}*/}
      {/*/>*/}
    </Row>
  );
};
