import React from 'react';
import { Chip, Col, Row, Text } from '../ui';
import { StyleProps } from '../../types';
import { useTranslation } from 'react-i18next';
import { Sign, SignStatus } from '../../types/sign';
import { colors } from '../../constant';
import { DateTime } from 'luxon';
import { DateFormats } from '../../utils/date';

type SummarySignatureRowProps = StyleProps & {
  sign: Sign;
};

const SIGNATURE_COLORS = {
  [SignStatus.SIGNED]: colors.secondary,
  [SignStatus.PENDING]: colors.orange,
  [SignStatus.REJECTED]: colors.grayDefault,
};

const SECOND_TIME_LABEL = {
  [SignStatus.SIGNED]: 'signed at',
  [SignStatus.PENDING]: '',
  [SignStatus.REJECTED]: 'rejected at',
};
const SECOND_TIME_VALUE = {
  [SignStatus.SIGNED]: 'signedAt',
  [SignStatus.REJECTED]: 'rejectedAt',
};

export const SummarySignatureRow = ({ sign }: SummarySignatureRowProps) => {
  const { t } = useTranslation();

  return (
    <Row w={'100%'} alignItems={'center'} mb={15}>
      <Col flex={1} pr={10}>
        <Text numberOfLines={1} fontWeight={'600'} fontSize={16}>
          {sign.user.surname} {sign.user.name}
        </Text>
        <Text numberOfLines={1} fontWeight={'400'} fontSize={14}>
          {sign.user.email}
        </Text>
        <Text numberOfLines={1} fontWeight={'200'} fontSize={12}>
          {t('requested at')} {DateTime.fromISO(sign.createdAt).toFormat(DateFormats.EXTENDED_DATE_TIME)}
        </Text>
        {sign.status !== SignStatus.PENDING && (
          <Text numberOfLines={1} fontWeight={'200'} fontSize={12}>
            {t(SECOND_TIME_LABEL[sign.status])}{' '}
            {DateTime.fromISO(sign[SECOND_TIME_VALUE[sign.status]]).toFormat(DateFormats.EXTENDED_DATE_TIME)}
          </Text>
        )}
      </Col>
      <Chip
        value={t(`signatureStatus.${sign.status}`)}
        color={SIGNATURE_COLORS[sign.status]}
        textColor={colors.white}
      />
    </Row>
  );
};
