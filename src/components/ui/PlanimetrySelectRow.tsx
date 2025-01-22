import React from 'react';
import {StyleSheet} from 'react-native';
import {Col, Text} from '../ui';
import {StyleProps, Theme, User} from '../../types';
import {useTheme} from '../../hooks/useTheme';
import {useStylesheet} from '../../hooks/useStylesheet';

type PlanimetrySelectRowProps = StyleProps & {
  user: User;
};

export const PlanimetrySelectRow = ({
  user,
  ...rest
}: PlanimetrySelectRowProps) => {
  const {colors, spacing} = useTheme();
  const styles = useStylesheet(createStyles);

  return (
    <Col pv={20} style={[styles.container]} w={'100%'} {...rest}>
      <Text numberOfLines={1} fontWeight={'600'} fontSize={22}>
        {/*{user?.name + ' ' + user?.surname}*/} title
      </Text>
      <Text numberOfLines={1} fontWeight={'400'} fontSize={14}>
        {/*{user?.name + ' ' + user?.surname}*/} subtitle
      </Text>
    </Col>
  );
};

const createStyles = ({colors, spacing}: Theme) =>
  StyleSheet.create({
    container: {},
    descriptionContainer: {
      backgroundColor: '#D9D9D9',
      paddingHorizontal: 13,
      height: 22,
      borderRadius: 10,
    },
  });
