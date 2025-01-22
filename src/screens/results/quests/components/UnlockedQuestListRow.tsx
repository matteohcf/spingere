import { Image, StyleSheet } from 'react-native';
import React from 'react';
import { Quest } from '../../../../types/quest.ts';
import { useStylesheet } from '../../../../hooks/useStylesheet.ts';
import { useTranslation } from 'react-i18next';
import { getOdinImage } from '../../../../utils/images.ts';
import { WIDTH_DEVICE } from '../../../../constant';
import { Button, Col, Row, Text } from '../../../../components';
import { Theme } from '../../../../types';
import { QuestProgressBar } from './QuestProgressBar.tsx';

type UnlockedQuestListRowProps = {
  quest: Quest;
  index: number;
  length: number;
  navigation: any;
};

export const UnlockedQuestListRow = ({ quest, index, length, navigation }: UnlockedQuestListRowProps) => {
  const styles = useStylesheet(createStyles);
  const { t } = useTranslation();
  const isLast = index === length - 1;

  const image = getOdinImage({
    image: quest?.image,
    format: 'full',
  });

  const onPressContinue = () => {
    navigation.pop();
  };

  return (
    <Col alignItems={'center'} w={WIDTH_DEVICE} style={styles.container}>
      <Col flex={1}>
        <Image resizeMode={'contain'} source={image} style={styles.image} />
      </Col>
      <Col bgColor={'primaryLight'} br={24} w={'100%'} p={12} mt={10}>
        <Text color={'white'} fontWeight={'700'} fontSize={24} mb={10}>
          {quest?.name} - {quest?.level}
        </Text>
        <Text color={'white'} fontSize={16} lineHeight={22}>
          {quest?.description}
        </Text>
      </Col>
      {/*<Row w={'100%'} mt={10} mb={-4}>*/}
      {/*  <QuestProgressBar advancement={quest.advancement} goal={quest.goal} />*/}
      {/*</Row>*/}
      {isLast && <Button mt={10} text={t('continue')} onPress={onPressContinue} />}
    </Col>
  );
};

const createStyles = ({ spacing, insets }: Theme) =>
  StyleSheet.create({
    container: {
      width: WIDTH_DEVICE,
      paddingHorizontal: spacing.screenHorizontal,
      paddingTop: insets.safeTop,
    },
    image: {
      width: WIDTH_DEVICE / 1.2,
      height: WIDTH_DEVICE / 1.2,
      borderRadius: WIDTH_DEVICE / 4 / 1.2,
      objectFit: 'cover',
    },
    bottomContainer: {
      position: 'absolute',
      bottom: 100,
    },
    imageContainer: {
      marginTop: 132,
      backgroundColor: '#e7e7f5',
      borderRadius: 100,
    },
  });
