import React from 'react';
import { StyleSheet } from 'react-native';
import { Pee } from '../../../../types/pee.ts';
import { useStylesheet } from '../../../../hooks/useStylesheet.ts';
import { Card, Col, Icon, Row, Text } from '../../../../components';
import { colors, SHADOW } from '../../../../constant';
import { Theme } from '../../../../types';
import { fromIsoToHumanDateTime } from '../../../../utils/date.ts';
import { t } from 'i18next';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { PeeRatingButton } from '../../peeDetail/components/PeeRatingButton.tsx';
import { PeeColorButton } from '../../peeDetail/components/PeeColorButton.tsx';

type Props = {
  pee: Pee;
  onPress?: () => void;
  rightArrow?: boolean;
};

export const PeeListRow = ({ pee, onPress, rightArrow = true }: Props) => {
  return (
    <Col mb={12} onPress={onPress}>
      <PeeInfoBoxWithIcon
        pee={pee}
        icon={['fal', 'toilet']}
        rightArrow={rightArrow}
        title={t('pee').toUpperCase()}
        subtitle={fromIsoToHumanDateTime(pee?.createdAt)}
      />
    </Col>
  );
};

type PeeInfoBoxIconProps = {
  pee: Pee;
  icon?: IconProp;
  title?: string;
  subtitle?: string | JSX.Element;
  onPress?: () => void;
  titleFontSize?: number;
  rightArrow?: boolean;
};

export const PeeInfoBoxWithIcon = ({ pee, icon, title, subtitle, titleFontSize, onPress, rightArrow = false }: PeeInfoBoxIconProps) => {
  const styles = useStylesheet(createStyles);

  return (
    <Card bgColor={'bgSurface1'} br={12} onPress={onPress} style={styles.card}>
      <Row gap={4} alignItems={'center'}>
        {icon && (
          <Col alignItems={'center'} justifyContent={'center'} bgColor={'bgSurface1'} br={40} h={48} w={48} mr={8}>
            <Icon icon={icon} size={20} color={colors.textPrimary} />
            {pee?.friendIds?.length > 0 && (
              <Col style={styles.badge} w={18} h={18} br={9} bgColor={'primary'} alignItems={'center'} justifyContent={'center'}>
                <Text color={colors.white} fontSize={10} fontWeight={'700'}>
                  {pee?.friendIds?.length > 9 ? '9+' : pee?.friendIds?.length}
                </Text>
              </Col>
            )}
          </Col>
        )}
        <Col flex={1}>
          {!!title && <Text fontSize={titleFontSize || 12}>{title}</Text>}
          {!!subtitle && (
            <Text fontSize={16} mt={4}>
              {subtitle}
            </Text>
          )}
        </Col>
        {pee?.color && (
          // <PeeColorButton
          //   style={styles.peeColorButton}
          //   selectedStyle={styles.peeColorButtonSelected}
          //   selectedPeeColor={pee?.color}
          //   type={pee?.color}
          // />
          <Col style={styles.peeColorButton} bgColor={pee?.color}></Col>
        )}
        {pee?.rating && (
          <PeeRatingButton
            style={styles.peeRatingButton}
            selectedStyle={styles.peeRatingButtonSelected}
            iconSize={40}
            selectedPeeRating={pee?.rating}
            type={pee?.rating}
          />
        )}
        {rightArrow && (
          <Col>
            <Icon icon={['fal', 'chevron-right']} size={20} color={colors.textPrimary} />
          </Col>
        )}
      </Row>
    </Card>
  );
};

const createStyles = ({ colors, spacing, shapes }: Theme) =>
  StyleSheet.create({
    card: {
      ...SHADOW.SMALL,
    },
    peeColorButton: {
      width: 40,
      height: 40,
      borderWidth: 2,
      borderColor: colors.borderDefault,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    // peeColorButtonSelected: {
    //   width: 40,
    //   height: 40,
    //   borderWidth: 2,
    //   borderColor: colors.borderDefault,
    //   borderRadius: 12,
    //   alignItems: 'center',
    //   justifyContent: 'center',
    // },
    peeRatingButton: {
      width: 40,
      height: 40,
      borderColor: 'transparent',
      alignItems: 'center',
      justifyContent: 'center',
    },
    peeRatingButtonSelected: {
      width: 40,
      height: 40,
      borderColor: 'transparent',
      alignItems: 'center',
      justifyContent: 'center',
    },
    badge: {
      position: 'absolute',
      top: -2,
      right: -4,
    },
  });
