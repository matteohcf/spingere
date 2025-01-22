import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Col, Icon, Row, Text } from '../ui';
import { t } from 'i18next';
import { Theme } from '../../types';
import { useStylesheet } from '../../hooks/useStylesheet';
import { colors } from '../../constant';

export type AlertSiteModalProps = {
  title?: string;
  description: string;
  confirmText?: string;
  undoText?: string;
  closeModal?: () => void;
  onConfirm?: () => void;
  onDismiss?: () => void;
  showConfirm?: boolean;
  showUndo?: boolean;
  awaitConfirm?: boolean;
  awaitCloseToConfirm?: boolean;
  type?: 'success' | 'error' | 'warning' | 'removeFriend';
};

export const AlertSiteModal = ({
  title,
  description,
  showConfirm = true,
  showUndo = true,
  confirmText = t('confirm'),
  undoText = t('close'),
  closeModal,
  onConfirm,
  awaitConfirm,
  onDismiss,
  awaitCloseToConfirm,
  type = 'success',
}: AlertSiteModalProps) => {
  const [loading, setLoading] = useState(false);
  const styles = useStylesheet(createStyles);

  const onPressClose = () => {
    onDismiss && onDismiss();
    closeModal && closeModal();
  };

  const onPressConfirm = async () => {
    setTimeout(
      async () => {
        if (onConfirm) {
          if (awaitConfirm) {
            setLoading(true);
            await onConfirm();
          } else {
            onConfirm();
          }
        }
      },
      awaitCloseToConfirm ? 700 : 0,
    );
    onPressClose();
  };

  return (
    <Col style={styles.container}>
      <Col p={12}>
        {type === 'success' && <Icon mb={12} icon={['fas', 'circle-check']} size={52} color={colors.primary} />}
        {type === 'error' && <Icon mb={12} icon={['fas', 'circle-xmark']} size={52} color={colors.negative} />}
        {type === 'warning' && <Icon mb={12} icon={['fas', 'circle-exclamation']} size={52} color={colors.warning} />}
        {type === 'removeFriend' && <Icon mb={12} icon={['far', 'face-frown']} size={64} color={colors.primary} />}
        {title && (
          <Text mb={12} fontSize={20} center fontWeight={'700'}>
            {title}
          </Text>
        )}
        {description && (
          <Text fontSize={18} fontWeight={'400'} mv={11} center>
            {description}
          </Text>
        )}
        <Row mt={15} justifyContent={showConfirm ? 'space-between' : 'center'} alignItems={'center'} gap={10}>
          {showUndo && <Button flex={1} onPress={onPressClose} text={undoText} variant={'secondary'} />}
          {showConfirm && <Button flex={1} variant={type} onPress={onPressConfirm} text={confirmText} loading={loading} />}
        </Row>
      </Col>
    </Col>
  );
};

const createStyles = ({}: Theme) =>
  StyleSheet.create({
    container: {
      borderRadius: 15,
      paddingHorizontal: 0,
      paddingBottom: 0,
      backgroundColor: colors.bgPrimary,
      borderWidth: 1,
      borderColor: colors.bgSurface2,
    },
  });
