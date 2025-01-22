import React from 'react';
import { Loader, Row } from '../ui';
import { colors } from "../../constant";

type Props = {
  loading: boolean;
};

export const ListFooterComponent = ({ loading }: Props) => {
  return (
    <Row h={100} justifyContent={'center'} alignItems={'center'}>
      {loading && <Loader color={colors.secondary} />}
    </Row>
  );
};
