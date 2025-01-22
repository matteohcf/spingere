import React from 'react';
import { StyleSheet } from 'react-native';
import Image from 'react-native-fast-image';
import { Quest } from '../../../../types/quest.ts';
import { useStylesheet } from '../../../../hooks/useStylesheet.ts';
import { getOdinImage } from '../../../../utils/images.ts';
import { Col, Row, Separator, Text } from '../../../../components';
import { colors } from '../../../../constant';
import { Theme } from '../../../../types';
import { fromIsoToHumanDate, fromIsoToHumanTime } from '../../../../utils/date.ts';
import { t } from 'i18next';

type Props = {
  quest: Quest;
  onPress?: () => void;
};

export const BadgeListRow = ({ quest, onPress }: Props) => {
  const styles = useStylesheet(createStyles);

  const image = getOdinImage({
    image: quest?.image,
    format: 'squared',
  });

  return (
    <Row mb={16} flex={1} onPress={onPress}>
      {image && (
        <Col>
          <Image source={image} style={styles.avatar} />
          {/*{quest?.level && (*/}
          {/*  <Col style={styles.badge} w={18} h={18} br={9} bgColor={'primary'} alignItems={'center'} justifyContent={'center'}>*/}
          {/*    <Text color={colors.white} fontSize={10} fontWeight={'700'}>*/}
          {/*      {quest?.level}*/}
          {/*    </Text>*/}
          {/*  </Col>*/}
          {/*)}*/}
        </Col>
      )}
      <Col flex={1} justifyContent={'center'} mt={4} gap={2}>
        <Text fontWeight={'500'} fontSize={16} color={colors.textPrimary}>
          {quest?.name}
        </Text>
        <Text fontWeight={'500'} fontSize={14} color={colors.textSecondary}>
          {t('level')} {quest?.level}
        </Text>
        <Text fontWeight={'400'} fontSize={12} mt={2} color={colors.textSecondary}>
          {t('unlocked at')} {fromIsoToHumanDate(quest?.completedAt)} ({fromIsoToHumanTime(quest?.completedAt)})
        </Text>
        <Row flex={1}></Row>
        <Separator />
      </Col>
    </Row>
  );
};

const createStyles = ({ colors }: Theme) =>
  StyleSheet.create({
    avatar: {
      width: 72,
      height: 72,
      borderRadius: 36,
      marginRight: 16,
    },
    badge: {
      position: 'absolute',
      top: 0,
      right: 10,
    },
  });
