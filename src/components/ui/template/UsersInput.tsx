import React, { useCallback, useState } from 'react';
import { Col } from '../Col';
import { User } from '../../../types';
import { useTranslation } from 'react-i18next';
import { showUsersSelectModal } from '../../modal';
import { CorrelationAnswer, Question } from '../../../types/report';
import { Button } from '../Button';
import { QuestionName } from './QuestionName';

type UsersInputProps = {
  question: Question;
  onAnswer: (question: Question, answer: CorrelationAnswer) => void;
};

export const UsersInput = ({ question, onAnswer }: UsersInputProps) => {
  const { t } = useTranslation();
  const [selectedUser, setSelectedUser] = useState<CorrelationAnswer | undefined>(
    (question.userAnswer?.answer as CorrelationAnswer) || undefined,
  );

  const openUserSelect = useCallback(() => {
    showUsersSelectModal({
      selectedUserId: selectedUser?._id,
      onSelect: (user: User) => {
        const selectedAnswer = { _id: user._id, materializedInfo: user.email };
        setSelectedUser(selectedAnswer);
        onAnswer(question, selectedAnswer);
      },
    });
  }, [selectedUser?._id, onAnswer, question]);

  const buttonText = selectedUser ? selectedUser.materializedInfo : t('select users');
  return (
    <Col>
      <QuestionName question={question} />
      <Button onPress={openUserSelect} text={buttonText} variant={'tertiary'} />
    </Col>
  );
};
