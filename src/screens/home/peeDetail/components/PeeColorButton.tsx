import { StyleSheet } from 'react-native';
import { Col } from '../../../../components';
import { useStylesheet } from '../../../../hooks/useStylesheet.ts';
import { Theme } from '../../../../types';
import { PeeColorType } from '../../../../types/pee.ts';
import { SHADOW, WIDTH_DEVICE } from '../../../../constant';

type Props = {
  onPress?: () => void;
  selectedPeeColor: PeeColorType | undefined;
  type: PeeColorType;
  style?: any;
  selectedStyle?: any;
};

export const PeeColorButton = ({ onPress, selectedPeeColor, type, style, selectedStyle }: Props) => {
  const styles = useStylesheet(createStyles);
  const isSelected = selectedPeeColor === type;
  const { color } = PEE_COLOR[type];

  const peeButtonStyle = style || styles.peeButton;
  const peeButtonSelectedStyle = selectedStyle || styles.peeButtonSelected;

  return (
    <Col style={isSelected ? peeButtonSelectedStyle : peeButtonStyle} bgColor={color} mh={4} onPress={onPress}>
      {/*<Col alignItems={'center'} justifyContent={'center'} br={40} h={48} w={48}>
        {isSelected && <Icon icon={['far', 'check']} color={colors.black} size={32} />}
      </Col>*/}
    </Col>
  );
};

const PEE_COLOR: Record<PeeColorType, { color: PeeColorType }> = {
  [PeeColorType.TRANSPARENT]: { color: PeeColorType.TRANSPARENT },
  [PeeColorType.LIGHT_YELLOW]: { color: PeeColorType.LIGHT_YELLOW },
  [PeeColorType.YELLOW]: { color: PeeColorType.YELLOW },
  [PeeColorType.DARK_YELLOW]: { color: PeeColorType.DARK_YELLOW },
  [PeeColorType.AMBER]: { color: PeeColorType.AMBER },
};

const numberOfColumns = Object.keys(PeeColorType).length;

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
      ...SHADOW.MEDIUM,
    },
  });
