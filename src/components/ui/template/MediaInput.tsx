import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useStylesheet } from '../../../hooks/useStylesheet';
import { Col } from '../Col';
import { Theme } from '../../../types';
import { useTranslation } from 'react-i18next';
import { Question } from '../../../types/report';
import { ImageType } from '../../../types/media';
import { QuestionName } from './QuestionName';
import Image from 'react-native-fast-image';
import { ImageSelect } from '../../layout';

type MediaInputProps = {
  question: Question;
  onAnswer: (question: Question, option: ImageType) => void;
};

export const MediaInput = ({ question, onAnswer }: MediaInputProps) => {
  const styles = useStylesheet(createStyles);
  const [selectedMedia, setSelectedMedia] = useState<ImageType | null>(null);
  const answerUrl = question.userAnswer?.document?.thumbnail?.medium;

  const onSelectImage = (image: ImageType) => {
    setSelectedMedia(image);
    onAnswer(question, image);
  };

  const uri = selectedMedia?.sourceURL || answerUrl;

  return (
    <Col>
      <QuestionName question={question} />
      <ImageSelect onSelectImage={onSelectImage} />
      <Col alignItems={'center'}>
        {!!uri && <Image source={{ uri }} style={styles.image} resizeMode={'contain'} />}
      </Col>
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
      borderColor: '#D9D9D9',
      borderWidth: 1,
      borderRadius: 5,
    },
    image: {
      height: 200,
      width: 200,
      borderRadius: 8,
      marginTop: 10,
      resizeMode: 'contain',
      borderWidth: 1,
      borderColor: colors.borderDefault,
    },
  });
