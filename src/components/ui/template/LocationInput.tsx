import React, { useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useStylesheet } from '../../../hooks/useStylesheet';
import { Col } from '../Col';
import { Text } from '../Text';
import { Theme } from '../../../types';
import { useTranslation } from 'react-i18next';
import { showLocationModal } from '../../modal';
import { Row } from '../Row';
import { useTheme } from '../../../hooks/useTheme';
import { Question } from '../../../types/report';
import { Address } from '../../../types/map';
import { QuestionName } from './QuestionName';

type UsersInputProps = {
  question: Question;
  onAnswer: (question: Question, answer: Address) => void;
};

export const LocationInput = ({ question, onAnswer }: UsersInputProps) => {
  const styles = useStylesheet(createStyles);
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [value, setValue] = useState<Address | undefined>(
    (question.userAnswer?.answer as Address) || undefined,
  );

  const onChangeAddress = useCallback(
    (newAddress: Address) => {
      setValue(newAddress);
      onAnswer(question, newAddress);
    },
    [onAnswer, question],
  );

  const openLocationSelect = useCallback(() => {
    showLocationModal({
      onSelectAddress: onChangeAddress,
    });
  }, [onChangeAddress]);

  return (
    <Col>
      <QuestionName question={question} />
      <Row
        onPress={openLocationSelect}
        p={5}
        style={styles.containerInput}
        h={35}
        justifyContent={'space-between'}
        alignItems={'center'}>
        <Row flex={1} pr={20}>
          <Text color={'#565555'} numberOfLines={1} w={'100%'}>
            {value?.plainAddress}
          </Text>
        </Row>
        <Text color={colors.secondary}>{t('update')}</Text>
      </Row>
    </Col>
  );
};

const createStyles = ({}: Theme) =>
  StyleSheet.create({
    containerInput: {
      borderColor: '#D9D9D9',
      borderWidth: 1,
      borderRadius: 10,
    },
  });
