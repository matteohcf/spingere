import React, { Ref, useCallback, useMemo, useState } from 'react';
import { StyleSheet, TextInput, TextInputProps, View, ViewProps } from 'react-native';
import { useStylesheet } from '../../hooks/useStylesheet';
import { IS_IOS } from '../../constant';
import { Theme } from '../../types';
import { useTheme } from '../../hooks/useTheme';
import { Row } from './Row';
import { Text } from './Text';
import { Col } from './Col';
import { DimensionValue } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import { OdinDateTimePicker } from './OdinDateTimePicker.tsx';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Icon } from './Icon.tsx';
import { fromIsoToHumanDate, fromIsoToHumanDateTime, fromIsoToHumanTime } from '../../utils/date.ts';
import { t } from 'i18next';

export type ErrorProps = {
  error?: string;
};

export type TextFieldProps = Omit<TextInputProps, 'placeholder' | 'editable'> &
  ErrorProps & {
    inputRef?: Ref<TextInput>;
    label?: string;
    type?: 'text' | 'password' | 'email' | 'number' | 'date' | 'time' | 'datetime' | 'phone';
    style?: ViewProps['style'];
    inputStyle?: TextInputProps['style'];
    disabled?: boolean;
    right?: React.ReactElement;
    width?: DimensionValue;
    placeholder?: string;
    showError?: boolean;
    iconRight?: IconProp;
    pinterEvents?: 'none' | 'auto';
    onPress?: () => void;
    showClearInput?: boolean;
    onPressClear?: () => void;
    onPressInput?: () => void;
    pointerEventsBlock?: boolean;
  };

/**
 * Text input field
 */
export const TextField = ({
  inputRef,
  error,
  disabled,
  label,
  placeholder,
  showClearInput,
  onPressClear,
  pointerEventsBlock = false,
  width = '100%',
  type,
  style,
  inputStyle,
  numberOfLines = 1,
  autoCapitalize = 'none',
  showError = true,
  right,
  pinterEvents,
  iconRight: inputIconRight,
  onPress: inputOnPress,
  onPressInput,
  ...rest
}: TextFieldProps) => {
  const { colors } = useTheme();
  const styles = useStylesheet(createStyles);
  const [showPicker, setShowPicker] = useState(false);
  const hasValue = !!rest.value;
  const enablePicker = type === 'date' || type === 'time' || type === 'datetime';

  const [secureTextEntry, setSecureTextEntry] = useState(type === 'password');

  const textInputProps: TextInputProps = useMemo(() => {
    switch (type) {
      case 'password':
        return {
          autoComplete: 'password',
          secureTextEntry: true,
        };
      case 'email':
        return {
          autoComplete: 'email',
          keyboardType: 'email-address',
        };
      case 'number':
        return {
          keyboardType: 'number-pad',
        };
      case 'phone':
        return {
          keyboardType: 'phone-pad',
        };
      case 'date':
        return {
          value: fromIsoToHumanDate(rest.value),
        };
      case 'time':
        return {
          value: fromIsoToHumanTime(rest.value),
        };
      case 'datetime':
        return {
          value: fromIsoToHumanDateTime(rest.value),
        };
      default:
        return {};
    }
  }, [rest.value, type]);

  const onChange = useCallback(
    (newValue: string) => {
      if (rest?.onChangeText) {
        rest.onChangeText(newValue);
      }
    },
    [rest],
  );

  const onPress = useCallback(() => {
    if (onPressInput) {
      onPressInput();
    }

    if (enablePicker && !disabled) {
      setShowPicker(true);
      return;
    }
    inputOnPress && inputOnPress();
  }, [enablePicker, disabled]);

  const pointerEvents = useMemo(() => {
    if (enablePicker || pointerEventsBlock) {
      return 'none';
    }
    return pinterEvents || 'auto';
  }, [enablePicker]);

  const iconRight = useMemo(() => {
    if (enablePicker) {
      return ['far', 'calendar-alt'] as IconProp;
    }
    return inputIconRight;
  }, [enablePicker, inputIconRight]);

  const dateValue = useMemo(() => {
    if (rest.value) {
      return new Date(rest.value);
    }
    return new Date();
  }, [rest.value]);

  const iconRightPassword = useMemo(() => {
    return ['far', secureTextEntry ? 'eye' : 'eye-slash'];
  }, [secureTextEntry]);

  const onPressIconRightPassword = useMemo(() => {
    return () => setSecureTextEntry(!secureTextEntry);
  }, [secureTextEntry]);

  return (
    <Col w={width} onPress={onPress}>
      {enablePicker && <OdinDateTimePicker mode={type} show={showPicker} onchangeShow={setShowPicker} onChange={onChange} value={dateValue} />}
      {!!label && (
        <Row style={styles.labelContainer}>
          <Text color={colors.textPrimary} fontSize={14} fontWeight={'500'} lineHeight={24}>
            {label}
          </Text>
        </Row>
      )}
      <View style={[styles.container, style, error ? styles.containerWithError : {}]} pointerEvents={pointerEvents}>
        <TextInput
          ref={inputRef}
          autoCapitalize={autoCapitalize}
          placeholder={placeholder || label}
          placeholderTextColor={'gray'}
          style={[
            styles.input,
            {
              // textAlignVertical: numberOfLines === 1 ? 'center' : 'top',
              minHeight: IS_IOS ? (numberOfLines ?? 1) * 17 : undefined,
              marginLeft: 10,
            },
            inputStyle,
            disabled && styles.disabled,
            hasValue && styles.withValues,
          ]}
          numberOfLines={numberOfLines}
          editable={!disabled}
          {...rest}
          {...textInputProps}
          secureTextEntry={secureTextEntry}
        />
        <View style={styles.rightContainer}>{right}</View>
        {iconRight && <Icon style={styles.iconRight} icon={iconRight} color={'grey'} size={18} />}
        {type === 'password' && (
          <Icon
            style={styles.iconRight}
            onPress={onPressIconRightPassword}
            // @ts-ignore
            icon={iconRightPassword}
            color={'grey'}
            size={18}
          />
        )}
      </View>

      {showClearInput && (
        <Col style={styles.iconClear}>
          <Icon
            color={'grey'}
            style={styles.iconRight}
            onPress={() => (onPressClear ? onPressClear() : onChange(''))}
            icon={['far', 'times']}
            size={18}
          />
        </Col>
      )}

      {showError && (
        <View style={styles.errorContainer}>
          {!!error && (
            <Text fontSize={12} color={'red'}>
              {t(error)}
            </Text>
          )}
        </View>
      )}
    </Col>
  );
};

const createStyles = ({ colors, fontSizes, spacing, shapes }: Theme) =>
  StyleSheet.create({
    rightContainer: {
      position: 'absolute',
      // @ts-ignore
      right: spacing[3],
      top: '50%',
    },
    container: {
      // @ts-ignore
      paddingVertical: spacing[2],
      borderRadius: 4,
      borderWidth: 1,
      borderColor: colors.borderDefault,
      backgroundColor: colors.white,
    },
    containerWithError: {
      borderColor: 'red',
    },
    disabled: {
      opacity: 0.5,
    },
    input: {
      height: 48,
      fontSize: fontSizes.md,
      // @ts-ignore
      paddingHorizontal: spacing[3],
      // @ts-ignore
      paddingVertical: spacing[2],
      // @ts-ignore
      paddingBottom: spacing[2],
      color: colors.textPrimary,
      borderRadius: 12,
    },
    labelContainer: {
      // position: 'absolute',
      // top: spacing[1.5],
      marginBottom: 4,
    },
    errorContainer: {
      // @ts-ignore
      minHeight: spacing[4],
      // @ts-ignore
      paddingHorizontal: spacing[2],
      // @ts-ignore
      paddingTop: spacing[0.5],
    },
    withValues: {
      // paddingVertical: spacing[3.5],
      // paddingBottom: spacing[0.5],
    },
    iconRight: {
      position: 'absolute',
      right: 8,
      height: '100%',
    },
    iconClear: {
      height: 48,
      position: 'absolute',
      right: 0,
      bottom: 0,
    },
  });
