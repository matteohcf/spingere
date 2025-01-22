import { ScrollView, StyleSheet } from 'react-native';
import { Col } from '../../../../components';
import { useStylesheet } from '../../../../hooks/useStylesheet.ts';
import { Theme } from '../../../../types';
import { PeePositionType } from '../../../../types/pee.ts';
import { WIDTH_DEVICE } from '../../../../constant';
import { SittingIcon, SquattingIcon, StandingIcon, StandingWallIcon } from '../../../../assets';
import Image from 'react-native-fast-image';

type Props = {
  onPress: () => void;
  selectedPeePosition: PeePositionType | undefined;
  type: PeePositionType;
};

export const PeePositionButton = ({ onPress, selectedPeePosition, type }: Props) => {
  const styles = useStylesheet(createStyles);
  const isSelected = selectedPeePosition === type;
  const { image } = PEE_POSITION[type];

  return (
    <Col style={isSelected ? styles.peeButtonSelected : styles.peeButton} bgColor={'transparent'} flex={1} mh={4} onPress={onPress}>
      <Col alignItems={'center'} justifyContent={'center'} br={40} h={48} w={48}>
        <Image source={image} style={{ width: 64, height: 64 }} />
      </Col>
    </Col>
  );
};

const PEE_POSITION: Record<PeePositionType, { image: any }> = {
  [PeePositionType.SITTING]: { image: SittingIcon },
  [PeePositionType.STANDING]: { image: StandingIcon },
  [PeePositionType.SQUATTING]: { image: SquattingIcon },
  [PeePositionType.STANDING_WALL]: { image: StandingWallIcon },
};

const numberOfColumns = Object.keys(PeePositionType).length;

const createStyles = ({ colors, spacing, shapes }: Theme) =>
  StyleSheet.create({
    peeButton: {
      width: (WIDTH_DEVICE - 64) / numberOfColumns,
      height: (WIDTH_DEVICE - 64) / numberOfColumns,
      borderWidth: 2,
      borderColor: colors.borderDefault,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    peeButtonSelected: {
      width: (WIDTH_DEVICE - 64) / numberOfColumns,
      height: (WIDTH_DEVICE - 64) / numberOfColumns,
      borderWidth: 2,
      borderColor: colors.black,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
