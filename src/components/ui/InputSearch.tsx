import React from 'react';
import { Keyboard, StyleSheet, TextInput } from 'react-native';
import { BoxProps, Grid, Icon } from '../ui';
import { useTranslation } from 'react-i18next';
import { Theme } from '../../types';
import { useStylesheet } from '../../hooks/useStylesheet';
import {colors, spacing} from '../../constant';

export type InputSearchProps = {
  value: string;
  onChangeText: (newText: string) => void;
  placeholder?: string;
} & BoxProps;

const placeholderColor = colors.textGrey;

export const InputSearch = ({ value, onChangeText, placeholder = 'search', ...rest }: InputSearchProps) => {
  const { t } = useTranslation();
  const styles = useStylesheet(createStyles);

  const onPressCancel = () => {
    onChangeText('');
    Keyboard.dismiss();
  };

  return (
    <Grid direction={'row'} alignItems={'center'} mb={spacing.lightMargin} {...rest}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={t(placeholder)}
        placeholderTextColor={placeholderColor}
      />
      <Icon icon={['fas', 'search']} color={placeholderColor} style={styles.iconSearch} size={18} />
      {!!value && <Icon icon={['fas', 'times']} color={placeholderColor} style={styles.iconCancel} size={20} onPress={onPressCancel} />}
    </Grid>
  );
};

const createStyles = ({ colors, shapes }: Theme) =>
  StyleSheet.create({
    iconSearch: {
      position: 'absolute',
      left: 10,
    },
    iconCancel: {
      position: 'absolute',
      right: 10,
    },
    input: {
      paddingLeft: 48,
      paddingVertical: 12,
      backgroundColor: colors.bgSurface2,
      width: '100%',
      borderRadius: shapes.md,
      fontSize: 16,
      fontWeight: '400',
      color: colors.textGrey,
      /*borderWidth: 1,
      borderColor: colors.bgSurface1,*/
    },
  });
