import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SharedStackParamList} from '../../core/navigation/RootNavigator.tsx';
import {Button, Col, Container, Separator, Text} from '../../components';
import {t} from 'i18next';
import React, {useState} from 'react';
import {Theme} from '../../types';
import {StyleSheet} from 'react-native';
import {useStylesheet} from '../../hooks/useStylesheet.ts';
import {useSelector} from 'react-redux';
import {userSelectors} from '../../store/user.ts';
import {deleteMe} from '../../api/user.ts';
import {logout} from '../../utils/user.ts';
import {showAlertSiteModal} from '../../components/floatingModal';
import {colors} from "../../constant";

type Props = NativeStackScreenProps<SharedStackParamList, 'DeleteAccount'>;

export const DeleteAccount = ({navigation}: Props) => {
  const styles = useStylesheet(createStyles);
  const [loading, setLoading] = useState(false);
  const userData = useSelector(userSelectors.detail);

  const onPressDeleteAccount = (email: string) => {
    showAlertSiteModal({
      title: t('delete account title'),
      description: t('delete account description', {email: email}),
      confirmText: t('delete account'),
      showUndo: true,
      undoText: t('cancel'),
      type: 'error',
      onConfirm: async () => {
        setLoading(true);
        await deleteMe();
        setLoading(false);
        logout();
      },
    });
  };

  return (
    <Container>
      <Col br={24} p={12} gap={12} bgColor={'bgSurface2'} mv={20}>
        <Text lineHeight={24} fontSize={16} fontWeight={'400'} color={colors.textPrimary}>
          {t('delete account text 1')}
        </Text>
        <Button
          variant={'error'}
          text={t('delete account')}
          loading={loading}
          onPress={() => {
            onPressDeleteAccount(userData?.email || '');
          }}
        />
      </Col>
      {/*<Separator pv={15} ph={15} />*/}
      <Col style={styles.bottomCol}>
        <Text lineHeight={24} fontSize={14} fontWeight={'400'}>
          {t('delete account text 2')}
        </Text>
      </Col>
    </Container>
  );
};

const createStyles = ({insets, spacing}: Theme) =>
  StyleSheet.create({
    bottomCol: {
      position: 'absolute',
      bottom: insets.bottom,
      marginHorizontal: spacing.screenHorizontal,
      left: 0,
      right: 0,
      alignItems: 'center',
    },
  });
