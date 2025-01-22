import React from 'react';
import {Col, Row, Separator, Text} from '../ui';

type InformationRowProps = {
  label: string;
  value?: string;
  addSeparator?: boolean;
  pv?: number;
};

export const InformationRow = ({
  label,
  value,
  pv = 8,
  addSeparator,
}: InformationRowProps) => {
  return (
    <Col w={'100%'}>
      <Row justifyContent={'space-between'} w={'100%'} pv={pv}>
        <Text fontWeight={'600'} fontSize={17}>
          {label}
        </Text>
        <Text fontSize={17}>{value}</Text>
      </Row>
      {addSeparator && <Separator />}
    </Col>
  );
};
