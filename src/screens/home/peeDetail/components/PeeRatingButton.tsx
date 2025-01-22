import { StyleSheet } from 'react-native';
import { Col, Icon } from '../../../../components';
import { useStylesheet } from '../../../../hooks/useStylesheet.ts';
import { Theme } from '../../../../types';
import { PeeRatingType } from '../../../../types/pee.ts';
import { WIDTH_DEVICE } from '../../../../constant';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

type Props = {
  onPress?: () => void;
  selectedPeeRating: PeeRatingType | undefined;
  type: PeeRatingType;
  style?: any;
  selectedStyle?: any;
  iconSize?: number;
};

export const PeeRatingButton = ({ onPress, selectedPeeRating, type, style, selectedStyle, iconSize = 48 }: Props) => {
  const styles = useStylesheet(createStyles);
  const isSelected = selectedPeeRating === type;
  const { color, icon } = PEE_RATING[type];

  const peeButtonStyle = style || styles.peeButton;
  const peeButtonSelectedStyle = selectedStyle || styles.peeButtonSelected;

  return (
    <Col style={isSelected ? peeButtonSelectedStyle : peeButtonStyle} bgColor={'transparent'} mh={4} onPress={onPress}>
      <Col alignItems={'center'} justifyContent={'center'} br={40} h={48} w={48}>
        <Icon icon={icon} color={color} size={iconSize} />
      </Col>
    </Col>
  );
};

const PEE_RATING: Record<PeeRatingType, { color: string; icon: IconProp }> = {
  [PeeRatingType.VERY_BAD]: { color: '#dc4747', icon: ['far', 'frown'] },
  [PeeRatingType.BAD]: { color: '#FF6F61', icon: ['far', 'frown'] },
  [PeeRatingType.NORMAL]: { color: '#ffcd33', icon: ['far', 'meh'] },
  [PeeRatingType.GOOD]: { color: '#79c67d', icon: ['far', 'smile'] },
  [PeeRatingType.VERY_GOOD]: { color: '#36a83b', icon: ['far', 'smile'] },
};

const numberOfColumns = Object.keys(PeeRatingType).length / 2;

const createStyles = ({ colors, spacing, shapes }: Theme) =>
  StyleSheet.create({
    peeButton: {
      flex: 1,
      width: (WIDTH_DEVICE - 64) / numberOfColumns,
      height: (WIDTH_DEVICE - 64) / numberOfColumns,
      borderWidth: 2,
      borderColor: colors.borderDefault,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    peeButtonSelected: {
      flex: 1,
      width: (WIDTH_DEVICE - 64) / numberOfColumns,
      height: (WIDTH_DEVICE - 64) / numberOfColumns,
      borderWidth: 2,
      borderColor: colors.black,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
