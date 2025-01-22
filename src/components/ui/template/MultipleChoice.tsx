import React, { useState } from 'react';
import { Col } from '../Col';
import { Text } from '../Text';
import { Checkbox } from '../Checkbox';
import { Row } from '../Row';
import { Question } from '../../../types/report';
import { QuestionName } from './QuestionName';

type MultipleChoiceProps = {
  question: Question;
  onAnswer: (question: Question, answer: string[]) => void;
};

export const MultipleChoice = ({ question, onAnswer }: MultipleChoiceProps) => {
  const [selected, setSelected] = useState<string[]>(
    (question.userAnswer?.answer as string[]) || [],
  );

  const onPressCheckbox = (option: string) => {
    const newSelected = selected.includes(option)
      ? selected.filter(item => item !== option)
      : [...selected, option];
    setSelected(newSelected);
    onAnswer(question, newSelected);
  };

  return (
    <Col>
      <QuestionName question={question} />
      {question?.possibleAnswers.map((option: string) => {
        const isSelected = selected.includes(option);
        return (
          <Row
            key={option}
            alignItems={'center'}
            mb={10}
            onPress={() => onPressCheckbox(option)}
            hitSlop={5}>
            <Checkbox checked={isSelected} />
            <Text fontWeight={'400'} fontSize={14} ml={8}>
              {option}
            </Text>
          </Row>
        );
      })}
    </Col>
  );
};
