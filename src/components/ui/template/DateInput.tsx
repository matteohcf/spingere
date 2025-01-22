import React, { useState } from 'react';
import { Col } from '../Col';
import { useTranslation } from 'react-i18next';
import { ActionButton } from '../ActionButton';
import { OdinDateTimePicker } from '../OdinDateTimePicker';
import { DateTime } from 'luxon';
import { DateFormats } from '../../../utils/date';
import { Question } from '../../../types/report';
import { QuestionName } from './QuestionName';

type DataInputProps = {
  question: Question;
  onAnswer: (question: Question, answer: string) => void;
  type: 'date' | 'time' | 'datetime';
};

const MAP_TYPE_TO_FORMATS = {
  date: DateFormats.EXTENDED_DATE,
  time: DateFormats.TIME,
  datetime: DateFormats.EXTENDED_DATE_TIME,
};

export const DateInput = ({ question, onAnswer, type }: DataInputProps) => {
  const { t } = useTranslation();
  const [show, setShow] = React.useState(false);
  const [value, setValue] = useState<string | undefined>(
    question.userAnswer?.answer as string | undefined,
  );

  const onChangeValue = (newValue: string) => {
    setValue(newValue);
    onAnswer(question, newValue);
  };

  const buttonValue = value
    ? DateTime.fromISO(value).toFormat(MAP_TYPE_TO_FORMATS[type])
    : t('select date and time');

  return (
    <Col>
      <QuestionName question={question} />
      <OdinDateTimePicker
        mode={type}
        show={show}
        onchangeShow={setShow}
        onChange={onChangeValue}
        value={new Date()}
      />
      <ActionButton
        onPress={() => {
          setShow(!show);
        }}
        text={buttonValue}
      />
    </Col>
  );
};
