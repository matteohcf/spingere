import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useStylesheet } from '../../../hooks/useStylesheet';
import { Col } from '../Col';
import { Text } from '../Text';
import { Theme } from '../../../types';
import { useTranslation } from 'react-i18next';
import { Row } from '../Row';
import { useTheme } from '../../../hooks/useTheme';
import { Question } from '../../../types/report';
import { QuestionName } from './QuestionName';

type BooleanChoiceProps = {
  question: Question;
  onAnswer: (question: Question, answer: boolean) => void;
};

export const BooleanChoice = ({ question, onAnswer }: BooleanChoiceProps) => {
  const styles = useStylesheet(createStyles);
  const { colors } = useTheme();
  const { t } = useTranslation();

  const [value, setValue] = useState<boolean | undefined>(
    question.userAnswer?.answer as boolean | undefined,
  );
  console.log('value', value);
  const onPressResponse = (newValue: boolean) => {
    setValue(newValue);
    onAnswer(question, newValue);
  };

  return (
    <Col>
      <QuestionName question={question} />
      <Row style={styles.container} alignItems={'center'}>
        <Col
          justifyContent={'center'}
          alignItems={'center'}
          h={40}
          flex={1}
          bgColor={value === true ? colors.secondary : 'transparent'}
          onPress={() => onPressResponse(true)}>
          <Text color={'#D9D9D9'} fontWeight={'600'} fontSize={18}>
            {t('yes')}
          </Text>
        </Col>
        <Col style={styles.divider} />
        <Col
          justifyContent={'center'}
          alignItems={'center'}
          h={40}
          flex={1}
          bgColor={value === false ? colors.secondary : 'transparent'}
          onPress={() => onPressResponse(false)}>
          <Text color={'#D9D9D9'} fontWeight={'600'} fontSize={18}>
            {t('no')}
          </Text>
        </Col>
      </Row>
    </Col>
  );
};

const createStyles = ({ colors }: Theme) =>
  StyleSheet.create({
    subtitle: {
      marginBottom: 10,
      color: colors.primary,
    },
    divider: {
      height: 24,
      width: 1,
      backgroundColor: '#D9D9D9',
    },
    container: {
      borderColor: colors.borderDefault,
      borderWidth: 1,
      borderRadius: 7,
      overflow: 'hidden',
    },
  });
