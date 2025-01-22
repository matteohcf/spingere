import React from 'react';
import { StyleSheet } from 'react-native';
import { Quest } from '../../../../types/quest.ts';
import { useStylesheet } from '../../../../hooks/useStylesheet.ts';
import { Col, Icon, Row, Separator } from '../../../../components';
import { colors } from '../../../../constant';
import { Theme } from '../../../../types';

type Props = {
  quest: Quest;
  onPress?: () => void;
};

export const HiddenQuestListRow = ({ quest, onPress }: Props) => {
  const styles = useStylesheet(createStyles);

  return (
    <Row mb={16} flex={1} onPress={onPress}>
      <Col bgColor={'bgSurface1'} justifyContent={'center'} style={styles.avatar}>
        <Icon icon={['far', 'lock']} size={32} color={colors.textSecondary} />
      </Col>
      <Col flex={1} justifyContent={'center'}>
        <Row gap={8} mt={10}>
          <Col flex={0.5} h={10} bgColor={'bgSurface1'} br={12}></Col>
          <Col flex={0.2} h={10} bgColor={'bgSurface1'} br={12}></Col>
        </Row>
        <Row flex={1} mt={8} h={8} bgColor={'bgSurface1'} br={12}></Row>
        <Row flex={1}></Row>
        <Separator />
      </Col>
    </Row>
  );
};

const createStyles = ({ colors, shapes }: Theme) =>
  StyleSheet.create({
    avatar: {
      width: 64,
      height: 64,
      borderRadius: 32,
      marginRight: 16,
    },
  });
