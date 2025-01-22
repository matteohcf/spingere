import React from 'react';
import { Text } from '../Text';
import { Question } from '../../../types/report';
import { lightTheme } from '../../../constant';
import { Icon } from '../Icon';
import { Row } from '../Row';
import { deleteQuestion, duplicateQuestion } from '../../../api/reports';
import { ReportManager } from '../../../screens/sites/reports/CreateReportScreen';

type QuestionNameProps = {
  question: Question;
};

export const QuestionName = ({ question }: QuestionNameProps) => {
  const showDuplicable = !!question.userAnswer && question.isDuplicable;

  const onPressDuplicate = async () => {
    await ReportManager.duplicateQuestion(question._id);
  };
  const onPressDelete = async () => {
    await ReportManager.deleteQuestion(question._id);
  };

  return (
    <Row alignItems={'flex-start'} h={37}>
      <Text fontWeight={'400'} fontSize={20}>
        {question.name}{' '}
        <Text color={lightTheme.colors.error} fontSize={20}>
          {question.isRequired && '*'}
        </Text>
      </Text>
      <Row flex={1} />
      {question.isDuplicated && (
        <Icon
          icon={['far', 'trash']}
          color={lightTheme.colors.gray['400']}
          size={20}
          onPress={onPressDelete}
        />
      )}
      {showDuplicable && (
        <Icon
          icon={['far', 'clone']}
          color={lightTheme.colors.gray['400']}
          size={20}
          onPress={onPressDuplicate}
        />
      )}
    </Row>
  );
};
