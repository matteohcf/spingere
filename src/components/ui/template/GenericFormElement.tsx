import React, { useCallback, useState } from "react";
import { Col } from "../Col";
import { StyleSheet } from "react-native";
import { Theme } from "../../../types";
import { useStylesheet } from "../../../hooks/useStylesheet";
import { OpenAnswer } from "./OpenAnswer";
import { MultipleChoice } from "./MultipleChoice";
import { SingleChoice } from "./SingleChoice";
import { BooleanChoice } from "./BooleanChoice";
import { MediaInput } from "./MediaInput";
import { DateInput } from "./DateInput";
import { UsersInput } from "./UsersInput";
import { Instructions } from "./Instructions";
import { PlanimetryInput } from "./PlanimetryInput";
import { SliderInput } from "./SliderInput";
import {
  Answer,
  AnswerElement,
  Question,
  QuestionTypes,
} from "../../../types/report";
import { LocationInput } from "./index";
import _ from "lodash";
import { upsertAnswer } from "../../../api/reports";

type Props = {
  question: Question;
  reportId: string;
  disabled: boolean;
  fromCourses?: boolean;
};

export const GenericFormElement = ({
  question,
  reportId,
  disabled,
  fromCourses = false,
}: Props) => {
  const styles = useStylesheet(createStyles);
  const [currentAnswer, setCurrentAnswer] = useState<Answer | undefined>(
    question.userAnswer
  );

  const onAnswer = _.debounce(
    useCallback(
      async (selectedQuestion: Question, answer: AnswerElement) => {
        console.log({ question: selectedQuestion, answer });
        const answerRes = await upsertAnswer({
          question: { ...selectedQuestion, reportId: reportId },
          answer,
          fromCourses: fromCourses,
          currentAnswer,
        });
        if (answerRes) {
          setCurrentAnswer(answerRes);
        }
        return answerRes;
      },
      [currentAnswer, reportId]
    ),
    500
  );

  const input = useCallback(() => {
    const commonProps = { question, onAnswer };
    switch (question.questionType) {
      case QuestionTypes.TEXT:
        return <OpenAnswer {...commonProps} />;
      case QuestionTypes.NUMBER:
        return <OpenAnswer {...commonProps} isNumber />;
      case QuestionTypes.MULTIPLE_CHOICE:
      case QuestionTypes.COURSES_MULTIPLE_CHOICE:
        return <MultipleChoice {...commonProps} />;
      case QuestionTypes.SINGLE_CHOICE:
      case QuestionTypes.COURSES_SINGLE_CHOICE:
        return <SingleChoice {...commonProps} />;
      case QuestionTypes.BOOLEAN_CHOICE:
      case QuestionTypes.COURSES_BOOLEAN:
        return <BooleanChoice {...commonProps} />;
      case QuestionTypes.PHOTO:
        return <MediaInput {...commonProps} />;
      case QuestionTypes.DATE:
        return <DateInput {...commonProps} type={"date"} />;
      case QuestionTypes.TIME:
        return <DateInput {...commonProps} type={"time"} />;
      case QuestionTypes.DATE_TIME:
        return <DateInput {...commonProps} type={"datetime"} />;
      case QuestionTypes.CORRELATION:
        return <UsersInput {...commonProps} />;
      case QuestionTypes.INSTRUCTION:
        return <Instructions question={question} />;
      case QuestionTypes.PLANIMETRY:
        return <PlanimetryInput {...commonProps} />;
      case QuestionTypes.SLIDER:
        return <SliderInput {...commonProps} />;
      case QuestionTypes.POSITION:
        return <LocationInput {...commonProps} />;
      default:
        return null;
    }
  }, [question, onAnswer]);

  const pointerEvents = disabled ? "none" : "auto";

  return (
    <Col pointerEvents={pointerEvents}>
      <Col style={styles.templateContainer}>{input()}</Col>
    </Col>
  );
};

const createStyles = ({ spacing }: Theme) =>
  StyleSheet.create({
    templateContainer: {
      paddingHorizontal: spacing.screenHorizontal,
    },
  });
