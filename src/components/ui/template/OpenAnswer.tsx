import React from 'react';
import { Col } from '../Col';
import { TextField } from '../TextField';
import { useTranslation } from 'react-i18next';
import { Question } from '../../../types/report';
import { QuestionName } from './QuestionName';

type OpenAnswerProps = {
  question: Question;
  onAnswer: (question: Question, value: string) => void;
  isNumber?: boolean;
};

export const OpenAnswer = ({ question, onAnswer, isNumber }: OpenAnswerProps) => {
  const { t } = useTranslation();
  const [text, setText] = React.useState<string>(question.userAnswer?.answer.toString() || '');
  const numberOfLines = isNumber ? undefined : 4;
  const placeholder = isNumber ? t('insert number') : t('insert text');

  const onChangeText = (newValue: string) => {
    if (isNumber) {
      const number = Number(newValue);
      if (isNaN(number)) {
        return;
      }
    }
    setText(newValue.toString());
    onAnswer(question, newValue);
  };

  return (
    <Col>
      <QuestionName question={question} />
      <TextField
        keyboardType={isNumber ? 'numeric' : 'default'}
        showError={false}
        style={{ borderColor: '#DFDFDF' }}
        placeholder={placeholder}
        multiline={!isNumber}
        numberOfLines={numberOfLines}
        value={text}
        onChangeText={onChangeText}
      />
    </Col>
  );
};
