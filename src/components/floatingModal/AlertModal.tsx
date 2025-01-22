import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Col, Loader, Row, Text } from '../ui';
import { t } from 'i18next';
import { useTheme } from '../../hooks/useTheme';
import { Theme } from '../../types';
import { useStylesheet } from '../../hooks/useStylesheet';

export type AlertModalProps = {
  title?: string;
  description: string;
  confirmText?: string;
  undoText?: string;
  closeModal?: () => void;
  onConfirm?: () => void;
  onDismiss?: () => void;
  showConfirm?: boolean;
  awaitConfirm?: boolean;
};

export const AlertModal = ({
  title,
  description,
  showConfirm = true,
  confirmText = t('confirm'),
  undoText = t('close'),
  closeModal,
  onConfirm,
  awaitConfirm,
  onDismiss,
}: AlertModalProps) => {
  const [loading, setLoading] = useState(false);
  const { colors, spacing } = useTheme();
  const styles = useStylesheet(createStyles);

  const onPressClose = () => {
    onDismiss && onDismiss();
    closeModal && closeModal();
  };

  const onPressConfirm = async () => {
    console.log({ onConfirm });
    if (onConfirm) {
      if (awaitConfirm) {
        setLoading(true);
        await onConfirm();
      } else {
        onConfirm();
      }
    }
    onPressClose();
  };

  return (
    <Col style={styles.container}>
      {title && (
        <Text fontSize={20} mb={spacing.standardMargin} center>
          {title}
        </Text>
      )}
      {description && (
        <Text fontSize={14} fontWeight={'400'} center mb={spacing.standardMargin}>
          {description}
        </Text>
      )}
      <Row alignItems={'center'} mt={15}>
        {showConfirm && (
          <Row style={{ flex: 1 }} alignItems={'center'} justifyContent={'center'} onPress={onPressConfirm} disabled={loading}>
            {loading && <Loader color={colors.primary} />}
            {!loading && (
              <Text fontSize={15} color={colors.secondary}>
                {confirmText}
              </Text>
            )}
          </Row>
        )}
        <Row style={{ flex: 1 }} alignItems={'center'} justifyContent={'center'} onPress={onPressClose}>
          <Text fontSize={15}>{undoText}</Text>
        </Row>
      </Row>
    </Col>
  );
};

const createStyles = ({ colors }: Theme) =>
  StyleSheet.create({
    container: {
      width: '100%',
      backgroundColor: colors.primaryDark,
      paddingBottom: 0,
    },
  });
