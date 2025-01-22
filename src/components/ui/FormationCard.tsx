import React from 'react';
import { StyleSheet } from 'react-native';
import { Col, Row, Separator, Text } from '../ui';
import { StyleProps, Theme } from '../../types';
import { useTheme } from '../../hooks/useTheme';
import { useStylesheet } from '../../hooks/useStylesheet';
import { Course } from '../../types/course';
import { useTranslation } from 'react-i18next';

type FormationCardProps = StyleProps & {
  onPress: () => void;
  course: Course;
};

export const FormationCard = ({ onPress, course, ...rest }: FormationCardProps) => {
  const { colors, spacing } = useTheme();
  const styles = useStylesheet(createStyles);
  const status = undefined;
  const { t } = useTranslation();

  return (
    <Col>
      <Row
        alignItems={'center'}
        pt={13}
        pb={8}
        style={[styles.container]}
        onPress={onPress}
        w={'100%'}
        {...rest}>
        <Col style={{ flex: 1 }}>
          <Text mb={3} numberOfLines={1} fontWeight={'400'} fontSize={20}>
            {course?.name}
          </Text>
          <Text fontSize={15} mb={5} numberOfLines={1} fontWeight={'300'}>
            {t(course?.courseType)}
          </Text>
        </Col>
        {status && (
          <Col alignItems={'flex-end'} w={50} style={{}}>
            <Text fontWeight={'200'} fontSize={15}>
              {status}%
            </Text>
          </Col>
        )}
      </Row>
      {status && <Separator status={status} />}
    </Col>
  );
};

const createStyles = ({ colors, spacing }: Theme) =>
  StyleSheet.create({
    icon: {
      width: 53,
      height: 53,
      borderRadius: 50,
      marginRight: spacing.standardMargin,
      backgroundColor: colors.primary,
    },
    container: {},
    descriptionContainer: {
      backgroundColor: '#D9D9D9',
      paddingHorizontal: 13,
      height: 22,
      borderRadius: 10,
    },
  });
