import React from 'react';
import { StyleSheet } from 'react-native';
import { Checkbox, Row, Text } from '../ui';
import { StyleProps, Theme, User } from '../../types';
import { useTheme } from '../../hooks/useTheme';
import { useStylesheet } from '../../hooks/useStylesheet';

type UserSelectRowProps = StyleProps & {
  user: User;
  onPress: (user: User) => void;
  currentSelectedUserIds?: string[];
};

export const UserSelectRow = ({
  user,
  onPress,
  currentSelectedUserIds,
  ...rest
}: UserSelectRowProps) => {
  const styles = useStylesheet(createStyles);
  const userText = user?.email;
  const isSelected = currentSelectedUserIds?.includes(user._id);
  console.log({ isSelected, currentSelectedUserIds });
  return (
    <Row
      alignItems={'center'}
      pv={20}
      style={[styles.container]}
      w={'100%'}
      onPress={() => onPress(user)}
      {...rest}>
      <Checkbox checked={isSelected} />
      <Text style={{ lineHeight: 22 }} ml={8} numberOfLines={1} fontWeight={'600'} fontSize={22}>
        {userText}
      </Text>
    </Row>
  );
};

const createStyles = ({ colors, spacing }: Theme) =>
  StyleSheet.create({
    container: {},
    descriptionContainer: {
      backgroundColor: '#D9D9D9',
      paddingHorizontal: 13,
      height: 22,
      borderRadius: 10,
    },
  });
