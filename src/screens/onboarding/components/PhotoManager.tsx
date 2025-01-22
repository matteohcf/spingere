import { StyleSheet } from 'react-native';
import { Col, Icon, Row, Text } from '../../../components';
import { useStylesheet } from '../../../hooks/useStylesheet.ts';
import { Theme } from '../../../types';
import React, { useState } from 'react';

type PhotoManagerProps = {
  image: any;
  setImage: (image: any) => void;
};
export const PhotoManager = ({ image, setImage }: PhotoManagerProps) => {
  const styles = useStylesheet(createStyles);

  const deleteImage = () => {
    setImage(null);
  };
  return (
    <Col>
      <Row alignItems={'center'} br={12} bgColor={'bgSurface1'} gap={12} p={12} h={64}>
        <Col w={20} h={20} justifyContent={'center'} br={12}>
          <Icon icon={['fas', 'check-circle']} size={24} color={'#A3E635'}></Icon>
        </Col>
        <Col flex={1}>
          <Text fontSize={14} fontWeight={'500'}>
            {image?.mime}
          </Text>
          <Text fontSize={12} fontWeight={'400'}>
            {(image?.size / 1e6).toFixed(2)} MB
          </Text>
        </Col>
        <Col w={32} h={32} justifyContent={'center'} bgColor={'bgSurface2'} p={4} gap={4} br={12} onPress={deleteImage}>
          <Icon icon={['fas', 'x']} size={16} color={'white'}></Icon>
        </Col>
      </Row>
    </Col>
  );
};

const createStyles = ({ shapes }: Theme) => StyleSheet.create({});
