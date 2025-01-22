import React, { useCallback } from 'react';
import { Col } from '../Col';
import { useTranslation } from 'react-i18next';
import { showPlanimetrySelectModal } from '../../modal';
import { QuestionName } from './QuestionName';
import { Planimetry } from '../../../types/planimetry';
import { useNavigation } from '@react-navigation/native';
import { Answer, Question } from '../../../types/report';
import { Button } from '../Button';
import { getAnswerDetail } from '../../../api/reports';

type UsersInputProps = {
  question: Question;
  onAnswer: (question: Question, option: Planimetry) => Promise<Answer | undefined>;
};

export const PlanimetryInput = ({ question, onAnswer }: UsersInputProps) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  console.log({ planimetryInputQuestion: question });

  const onSelectPlanimetry = useCallback(
    async (selectedPlanimetry: Planimetry) => {
      const answerRes = await onAnswer(question, selectedPlanimetry);
      console.log({ answerRes });
      const currentQuestion = { ...question, userAnswer: answerRes };
      navigation.push('EditPlanimetry', {
        planimetry: selectedPlanimetry,
        question: currentQuestion,
      });
    },
    [navigation, onAnswer, question],
  );

  const onPressEditPlanimetry = useCallback(async () => {
    if (question.userAnswer?._id === undefined) {
      return;
    }
    const refreshedAnswer = await getAnswerDetail(question.userAnswer?._id);
    if (!refreshedAnswer || !refreshedAnswer.planimetry) {
      return;
    }
    const currentQuestion = { ...question, userAnswer: refreshedAnswer };
    navigation.push('EditPlanimetry', {
      planimetry: refreshedAnswer.planimetry,
      question: currentQuestion,
    });
  }, [navigation, question]);

  const openPlanimetry = useCallback(() => {
    showPlanimetrySelectModal({
      onSelectPlanimetry,
    });
  }, [onSelectPlanimetry]);

  return (
    <Col>
      <QuestionName question={question} />
      {!question.userAnswer && (
        <Button variant={'tertiary'} onPress={openPlanimetry} text={t('open planimetry')} />
      )}
      {question.userAnswer && (
        <Button variant={'tertiary'} onPress={onPressEditPlanimetry} text={t('edit planimetry')} />
      )}
    </Col>
  );
};
