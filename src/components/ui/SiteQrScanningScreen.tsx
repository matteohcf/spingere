import React, { useCallback, useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, StyleSheet } from 'react-native';
import { Camera } from 'react-native-camera-kit';
import { throttle } from '../../utils/throttle';
import { QrCodeScanIcon } from '../../assets';
import { useIsFocused } from '@react-navigation/native';

import { SharedStackParamList } from '../../screens/RootNavigator';
import { Container } from './Container';
import { Row } from './Row';
import { useTheme } from '../../hooks/useTheme';
import { useStylesheet } from '../../hooks/useStylesheet';
import { Theme } from '../../types';
import { WIDTH_DEVICE } from '../../constant';
import { useCameraPermissions } from '../../hooks/useCameraPermissions';
import { showResponseStatusModal } from '../modal';
import { openAppSettings } from '../../utils/settings';
import { getResourceFromBadge, recordResourceStamping } from '../../api/resource';
import { useSelector } from 'react-redux';
import { companiesSelectors } from '../../store/companies';
import { userSelectors } from '../../store/user';
import { showAlertModal } from '../floatingModal';

type SiteQrScanningScreenProps = NativeStackScreenProps<SharedStackParamList, 'SiteQrScanning'>;

export const SiteQrScanningScreen = ({ navigation, route }: SiteQrScanningScreenProps) => {
  const { t } = useTranslation();
  const { searchMode } = route.params;
  const site = route.params?.site;
  const selectedCompany = useSelector(companiesSelectors.selectedCompany);
  const userDetail = useSelector(userSelectors.detail);
  const { status, requestPermission } = useCameraPermissions();
  const isFocused = useIsFocused();
  const styles = useStylesheet(createStyles);

  useEffect(() => {
    requestPermission();
  }, [requestPermission]);

  useEffect(() => {
    // const parsedBadgeCode = parseInt('04CE0CBA926784', 16);
    // const parsedBadgeCode = parseInt('04d5efba926780', 16);
    // console.log({parsedBadgeCode: parsedBadgeCode});
    // doStamping(parsedBadgeCode.toString());
  }, []);

  useEffect(() => {
    if (status === 'denied') {
      showAlertModal({
        title: t('camera permission title'),
        description: t('camera permission description'),
        confirmText: t('open settings'),
        onConfirm: () => {
          openAppSettings();
          navigation.pop();
        },
      });
    }
  }, [status]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onReadCode = useCallback(
    throttle(async (event: any) => {
      const code = event?.nativeEvent?.codeStringValue || '';
      if (code && typeof code === 'string') {
        const parsedBadgeCode = parseInt(code, 16);
        console.log({ badgeCode: code });
        console.log({ parsedBadgeCode: parsedBadgeCode });
        if (searchMode) {
          await searchResource(code);
        } else {
          await doStamping(code);
        }
      } else {
        showResponseStatusModal({
          title: t('attention'),
          description: t('qr code not valid'),
          status: 'error',
        });
      }
    }, 3000),
    [throttle, searchMode],
  );

  const doStamping = useCallback(
    async (badgeCode: string) => {
      try {
        console.log({ badgeCode });
        const res = await recordResourceStamping({
          badgeCode,
          siteId: site.id,
          companyId: selectedCompany.id,
          userId: userDetail._id,
          badgeType: 'QR Code',
        });
        console.log({ res });
        showResponseStatusModal({
          title: t('success'),
          description: t('resource stamped'),
          status: 'success',
        });
      } catch (e) {
        showResponseStatusModal({
          title: t('manual stamping error title'),
          description: t('manual stamping error description'),
          status: 'error',
        });
        console.log({ errorManualStamping: e });
      }
    },
    [t, site, selectedCompany, userDetail],
  );

  const searchResource = useCallback(
    async (badgeCode: string) => {
      // Need number based 10
      try {
        const resource = await getResourceFromBadge({
          badgeCode: badgeCode,
          badgeType: 'NFC',
          siteId: site.id,
          companyId: selectedCompany.id,
        });
        navigation.push('ResourceDetail', { resource, site });
      } catch (e) {
        showResponseStatusModal({
          title: t('search badge qr code error title'),
          description: t('search badge qr code error description'),
          status: 'error',
        });
        console.log({ errorManualStamping: e });
      }
    },
    [navigation, site, t, selectedCompany],
  );

  return (
    <Container addPaddingHorizontal={false}>
      {isFocused && (
        <Camera
          style={styles.camera}
          scanBarcode={true}
          onReadCode={onReadCode} // optional
          showFrame={false}
        />
      )}
      <Row style={styles.overlay}>
        <Image source={QrCodeScanIcon} style={styles.image} />
      </Row>
    </Container>
  );
};

const createStyles = ({ colors, spacing }: Theme) =>
  StyleSheet.create({
    camera: {
      flex: 1,
    },
    image: {
      width: WIDTH_DEVICE * 0.7,
      height: WIDTH_DEVICE * 0.7,
      tintColor: colors.white,
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
