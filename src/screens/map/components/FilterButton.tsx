import { useStylesheet } from '../../../hooks/useStylesheet.ts';
import { Col, Icon, Text } from '../../../components';
import { colors, SHADOW } from '../../../constant';
import { Theme } from '../../../types';
import { Animated, StyleSheet } from 'react-native';
import { useRef } from 'react';
import { trigger } from 'react-native-haptic-feedback';
import { t } from 'i18next';
import { FilterEnum } from "./MapMarkers.tsx";

type Props = {
  onPress: () => void;
  selectedFilter: FilterEnum;
  disabled?: boolean;
};

export const FilterButton = ({ onPress, selectedFilter, disabled }: Props) => {
  const styles = useStylesheet(createStyles);
  const isAll = selectedFilter === FilterEnum.ALL;
  const scaleAnimation = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    if (disabled) return;
    trigger('impactLight');
    Animated.sequence([
      Animated.timing(scaleAnimation, {
        toValue: 1.2,
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnimation, {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start();

    onPress();
  };

  return (
    <Col style={isAll ? styles.filterButtonAll : styles.filterButtonLast100} onPress={handlePress}>
      <Animated.View style={{ transform: [{ scale: scaleAnimation }] }}>
        {isAll ? (
          <Col alignItems={'center'} alignContent={'center'}>
            <Icon icon={['fal', 'filters']} size={14} mt={-4} color={colors.primary} />
            <Text fontWeight={'400'} fontSize={8} mt={-4} color={colors.textPrimary}>
              {t('all pees')}
            </Text>
          </Col>
        ) : (
          <Col alignItems={'center'} alignContent={'center'}>
            <Icon icon={['fal', 'filter']} size={14} mt={-4} color={colors.primary} />
            <Text fontWeight={'400'} fontSize={8} mt={-4} color={colors.textPrimary}>
              {t('last pees')}
            </Text>
          </Col>
        )}
      </Animated.View>
    </Col>
  );
};

const createStyles = ({ colors, insets, shapes }: Theme) =>
  StyleSheet.create({
    filterButtonAll: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 40,
      height: 40,
      borderRadius: shapes.md,
      backgroundColor: colors.white,
      ...SHADOW.MEDIUM,
    },
    filterButtonLast100: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 40,
      height: 40,
      borderRadius: shapes.md,
      backgroundColor: colors.white,
      ...SHADOW.MEDIUM,
    },
  });
