import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Col } from '../Col';
import { Text } from '../Text';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { WIDTH_DEVICE } from '../../../constant';
import { useTheme } from '../../../hooks/useTheme';
import _ from 'lodash';
import { Row } from '../Row';
import { Question } from '../../../types/report';
import { QuestionName } from './QuestionName';

type SliderInputProps = {
  question: Question;
  onAnswer: (question: Question, answer: number) => void;
};

export const SliderInput = ({ question, onAnswer }: SliderInputProps) => {
  const { spacing } = useTheme();
  const [value, setValue] = useState<number>(
    (question.userAnswer?.answer as number) || question.minValue,
  );

  const minValue = question.minValue || 0;
  const maxValue = question.maxValue || 20;
  const step = question.stepIncrement || 1;

  const onValuesChange = (values: number[]) => {
    if (_.isEmpty(values)) {
      return;
    }
    setValue(values[0]);
    onAnswer(question, values[0]);
  };

  return (
    <Col>
      <QuestionName question={question} />
      <Row
        w={WIDTH_DEVICE - 2 * spacing.screenHorizontal}
        justifyContent={'space-between'}
        alignItems={'center'}>
        <Text color={'#8a8a8e'} fontSize={16}>
          {minValue}
        </Text>
        <MultiSlider
          snapped
          onValuesChange={onValuesChange}
          min={minValue}
          max={maxValue}
          step={step}
          values={[value]}
          selectedStyle={{
            backgroundColor: '#e9e9eb',
          }}
          sliderLength={WIDTH_DEVICE - spacing.screenHorizontal * 2 - 80}
          unselectedStyle={{
            backgroundColor: '#e9e9eb',
          }}
          customMarkerLeft={CustomMarker}
        />
        <Text color={'#8a8a8e'} fontSize={16}>
          {maxValue}
        </Text>
      </Row>
      <Row justifyContent={'center'} w={'100%'}>
        <Text fontSize={16}>{value}</Text>
      </Row>
    </Col>
  );
};

const CustomMarker = () => {
  return <View style={styles.markerCircle} />;
};

const styles = StyleSheet.create({
  markerCircle: {
    width: 23,
    height: 23,
    borderRadius: 23,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.25)',
    position: 'absolute',
    zIndex: 999,
    // left: 0,
    top: -11.5,
  },
});
