import { StyleSheet } from 'react-native';
import { Col, Icon, Row, Text } from '../../../components';
import { useStylesheet } from '../../../hooks/useStylesheet.ts';
import { Theme } from '../../../types';
import React from 'react';
import _ from 'lodash';

type PhotoManagerProps = {
  ciImages: any;
  setCiImages: (image: any) => void;
};
export const CiPhotoManager = ({ ciImages, setCiImages }: PhotoManagerProps) => {
  const styles = useStylesheet(createStyles);

  const deleteImage = (index: any) => {
    const newImages = [...ciImages];
    _.pullAt(newImages, index);
    setCiImages(newImages);
  };
  return (
    <>
      {_.map(ciImages, (image, index) => (
        <Col mb={4} key={index}>
          <Row alignItems={'center'} br={12} bgColor={'bgSurface1'} gap={12} p={12} h={64}>
            <Col w={20} h={20} justifyContent={'center'} br={12}>
              <Icon icon={['fas', 'file-image']} size={34} color={'white'} />
            </Col>
            <Col flex={1}>
              <Text fontSize={14} fontWeight={'500'}>
                {image?.mime} ({index + 1})
              </Text>
              <Text fontSize={12} fontWeight={'400'}>
                {(image?.size / 1e6).toFixed(2)} MB
              </Text>
            </Col>
            <Col w={32} h={32} justifyContent={'center'} bgColor={'bgSurface2'} p={4} gap={4} br={12} onPress={() => deleteImage(index)}>
              <Icon icon={['fas', 'close']} size={16} color={'white'} />
            </Col>
          </Row>
        </Col>
      ))}
    </>
  );
};

const createStyles = ({ shapes }: Theme) => StyleSheet.create({});
