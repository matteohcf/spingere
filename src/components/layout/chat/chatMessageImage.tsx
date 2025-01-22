import React from 'react';
import Bubble from 'react-native-gifted-chat/lib/Bubble';
import { Col } from '../../ui';
import { ChatMessage } from '../../../types/chat';
import { WIDTH_DEVICE } from '../../../constant';
import Image from 'react-native-fast-image';
// @ts-ignore
import Pinchable from 'react-native-pinchable';

const videoWith = WIDTH_DEVICE * 0.7;

export const ChatMessageImage = (props: Bubble<ChatMessage>['props']) => {
  const message = props.currentMessage;
  const originalWidth = message?.attachments?.[0]?.thumbnail?.mediumMetadata.width;
  const originalHeight = message?.attachments?.[0]?.thumbnail?.mediumMetadata.height;
  const imageUrl = message?.attachments?.[0]?.thumbnail?.medium;
  if (!originalWidth || !originalHeight) {
    return <></>;
  }

  const imageHeight = (videoWith * originalHeight) / originalWidth;

  return (
    <Col style={{ borderRadius: 10, overflow: 'hidden' }} mb={8}>
      <Pinchable>
        <Image source={{ uri: imageUrl }} style={{ width: videoWith, height: imageHeight }} />
      </Pinchable>
    </Col>
  );
};
