import React from 'react';
import { StyleSheet } from 'react-native';
import { Col, Row, Text, Checkbox } from '../../components';
import { Theme } from '../../types';
import { useStylesheet } from '../../hooks/useStylesheet';
import { useTheme } from '../../hooks/useTheme';
import { useTranslation } from 'react-i18next';
import {t} from "i18next";

type Option = {
  label: string;
  value: string;
};

type Props  = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  label?: string;
};

export const RadioButtonGroup = ({ options, value, onChange, error, label }: Props) => {
  const styles = useStylesheet(createStyles);
  const { colors } = useTheme();
  const { t } = useTranslation();

  return (
    <Col gap={4}>
      {label && (
        <Text color={colors.textPrimary} fontSize={14} fontWeight={'500'} lineHeight={24}>
          {label}
        </Text>
      )}
      <Row gap={16}>
        {options.map(option => (
          <Row key={option.value} alignItems="center" gap={8}>
            <Checkbox style={{ borderRadius: 16 }} checked={value === option.value} onCheck={() => onChange(option.value)} />
            <Text color={colors.textPrimary} fontSize={14}>
              {t(option.label)}
            </Text>
          </Row>
        ))}
      </Row>
      {!!error && (
        <Text fontSize={12} color={'red'}>
          {t(error)}
        </Text>
      )}
    </Col>
  );
};

const createStyles = ({ colors }: Theme) =>
  StyleSheet.create({
    container: {
      marginVertical: 8,
    },
  });
