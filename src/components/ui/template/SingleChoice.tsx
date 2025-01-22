import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useStylesheet } from '../../../hooks/useStylesheet';
import { Col } from '../Col';
import { Text } from '../Text';
import { Theme } from '../../../types';
import { Question } from '../../../types/report';
import { Row } from '../Row';
import { Icon } from '../Icon';
import { QuestionName } from './QuestionName';

type SingleChoiceProps = {
  question: Question;
  onAnswer: (question: Question, answer: string) => void;
};

export const SingleChoice = ({ question, onAnswer }: SingleChoiceProps) => {
  const styles = useStylesheet(createStyles);
  const [selected, setSelected] = useState<string>((question.userAnswer?.answer as string) || '');

  const onPressRadio = (option: string) => {
    setSelected(option);
    onAnswer(question, option);
  };

  return (
    <Col>
      <QuestionName question={question} />
      <View>
        {question.possibleAnswers.map((option: string) => {
          return (
            <Row
              key={option}
              style={styles.container}
              onPress={() => onPressRadio(option)}
              hitSlop={5}>
              <View style={styles.radioCircle}>
                {option === selected && (
                  <View style={styles.selectedRb}>
                    <Icon icon={['fas', 'check']} color={'white'} size={12} />
                  </View>
                )}
              </View>
              <Pressable>
                <Text fontWeight={'400'} fontSize={14} ml={8}>
                  {option}
                </Text>
              </Pressable>
            </Row>
          );
        })}
      </View>
    </Col>
  );
};

const createStyles = ({ colors }: Theme) =>
  StyleSheet.create({
    container: {
      marginBottom: 10,
      alignItems: 'center',
      flexDirection: 'row',
    },
    radioCircle: {
      height: 20,
      width: 20,
      borderRadius: 100,
      borderWidth: 1,
      borderColor: '#E2E8F0',
      alignItems: 'center',
      justifyContent: 'center',
    },
    selectedRb: {
      width: '100%',
      height: '100%',
      borderRadius: 50,
      backgroundColor: colors.secondary,
    },
    result: {
      marginTop: 20,
      color: 'white',
      fontWeight: '600',
      backgroundColor: '#F3FBFE',
    },
    subtitle: {
      marginBottom: 10,
      color: colors.primary,
    },
  });
