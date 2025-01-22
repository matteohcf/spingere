import React from 'react';
import { BoxProps, Row } from '../ui';
import { OdinImageType } from '../../types/odin';
import Image from 'react-native-fast-image';
import { getOdinImage } from '../../utils/images';

type OdinImageProps = BoxProps & {
  image: OdinImageType;
  height?: number;
  width?: number;
  resizeMode?: 'contain' | 'cover' | 'stretch' | 'center';
};

export const OdinImage = ({ image, height, width, resizeMode = 'contain', ...box }: OdinImageProps) => {
  const realProportion = image.metadata.width / image.metadata.height;
  const source = getOdinImage({ image, format: 'medium' });
  let imageHeight, imageWidth;
  if (height) {
    imageHeight = height;
    imageWidth = height * realProportion;
  }
  if (width) {
    imageWidth = width;
    imageHeight = width / realProportion;
  }

  return (
    <Row {...box}>
      <Image
        source={source}
        resizeMode={resizeMode}
        style={{
          height: imageHeight,
          width: imageWidth,
        }}
      />
    </Row>
  );
};
