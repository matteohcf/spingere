import React from 'react';
import { Col } from '../Col';
import { Text } from '../Text';
import { Question } from '../../../types/report';
import { useTranslation } from 'react-i18next';
// @ts-ignore
import Pinchable from 'react-native-pinchable';
import { OdinImage } from '../OdinImage';
import { WIDTH_DEVICE } from '../../../constant';

type UsersInputProps = {
  question: Question;
};

export const Instructions = ({ question }: UsersInputProps) => {
  const { t } = useTranslation();

  return (
    <Col>
      <Text fontSize={20} mb={10}>
        {t('instructions')}
      </Text>
      <Text fontWeight={'400'} fontSize={14} mb={10}>
        {question.name}
      </Text>
      {question.document && (
        <Pinchable>
          <OdinImage width={WIDTH_DEVICE - 40} image={question.document} resizeMode={'contain'} />
        </Pinchable>
      )}
    </Col>
  );
};
