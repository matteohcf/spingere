import React from 'react';
import Bubble from 'react-native-gifted-chat/lib/Bubble';
import { Col, Icon } from '../../ui';
import { ChatMessage } from '../../../types/chat';
import Video from 'react-native-video';
import { WIDTH_DEVICE } from '../../../constant';
import { IS_ANDROID, IS_IOS } from '../../../utils/platform';
import Image from 'react-native-fast-image';
import { Theme } from '../../../types';
import { StyleSheet } from 'react-native';
import { useStylesheet } from '../../../hooks/useStylesheet';
import { navigationRef } from '../../../hooks/useNavigationListener';

const videoWith = WIDTH_DEVICE * 0.7;

export const ChatMessageVideo = (props: Bubble<ChatMessage>['props']) => {
  const message = props.currentMessage;
  const originalWidth = message?.attachments?.[0]?.thumbnail?.mediumMetadata.width;
  const originalHeight = message?.attachments?.[0]?.thumbnail?.mediumMetadata.height;
  const videoUrl = message?.attachments?.[0]?.thumbnail?.medium;
  const styles = useStylesheet(createStyles);

  if (!originalWidth || !originalHeight) {
    return <></>;
  }

  const onPressGoToVideo = () => {
    navigationRef.navigate('PlayVideo', { video: message?.attachments?.[0] });
  };

  const videoHeight = (videoWith * originalHeight) / originalWidth;

  return (
    <Col style={{ borderRadius: 10, overflow: 'hidden' }} mb={8}>
      {IS_IOS && (
        <Video
          source={{ uri: videoUrl }}
          style={{ width: videoWith, height: videoHeight }}
          controls={true}
          resizeMode={'contain'}
          muted={true}
          paused={true}
        />
      )}
      {IS_ANDROID && (
        <Col>
          <Image source={{ uri: videoUrl }} style={{ width: videoWith, height: videoHeight }} />
          <Col style={styles.colWrapperPlay} onPress={onPressGoToVideo}>
            <Icon icon={['fas', 'play']} style={styles.iconPlay} />
          </Col>
        </Col>
      )}
    </Col>
  );
};

const createStyles = ({ colors }: Theme) =>
  StyleSheet.create({
    colWrapperPlay: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    iconPlay: {
      width: 53,
      height: 53,
      borderRadius: 50,
      backgroundColor: colors.primary,
    },
  });
