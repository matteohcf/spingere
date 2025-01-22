import React, { useState } from 'react';
import { Col } from '../Col';
import { Report, ReportTypes } from '../../../types/report';
import { Button } from '../Button';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../hooks/useTheme';
import { concludeWarning } from '../../../api/reports';
import { showAlertModal } from '../../floatingModal';
import { useNavigation } from '@react-navigation/native';
import { Text } from '../Text';

type TemplateFormFooterProps = {
  report: Report;
};

export const TemplateFormFooter = ({ report }: TemplateFormFooterProps) => {
  const { t } = useTranslation();
  const { spacing } = useTheme();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  if (report.reportType !== ReportTypes.WARNING) {
    return <></>;
  }

  if (report.status === 'compiled') {
    return (
      <Col ph={spacing.screenHorizontal} mt={20} alignItems={'center'}>
        <Text center fontSize={14}>
          {t('warning is in reviewing from the operator')}
        </Text>
      </Col>
    );
  }

  const onPressConclude = async () => {
    setLoading(true);
    const concludeRes = await concludeWarning(report._id);
    if (concludeRes.error) {
      showAlertModal({
        title: t('attention'),
        description: t('error concluding warning question not compiled'),
        showConfirm: false,
      });
    } else {
      navigation.goBack();
    }
    setLoading(false);
  };

  return (
    <Col ph={spacing.screenHorizontal} mt={20}>
      <Button text={t('finish warning')} onPress={onPressConclude} loading={loading} />
    </Col>
  );
};
