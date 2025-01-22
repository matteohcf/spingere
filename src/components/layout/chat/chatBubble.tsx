import React from 'react';
import Bubble, { BubbleProps } from 'react-native-gifted-chat/lib/Bubble';
import { ChatMessage, ChatMessageTypes } from '../../../types/chat';
import { ChatInfoMessage } from './chatInfoMessage';
import { ChatMessageVideo } from './chatMessageVideo';
import { ChatMessageImage } from './chatMessageImage';
import { Col, Text } from '../../ui';
import { lightTheme } from '../../../constant';

type ChatBubbleProps = BubbleProps<ChatMessage> & { userId: string };

export const ChatBubble = (props: ChatBubbleProps) => {
  const message = props.currentMessage;

  if (!message) {
    return null;
  }

  if (message.type === ChatMessageTypes.INFO) {
    return <ChatInfoMessage {...props} />;
  }

  return (
    <Bubble
      {...props}
      renderMessageText={() => null}
      renderMessageImage={() => null}
      renderMessageVideo={() => null}
      renderCustomView={(bubbleProps: Bubble<ChatMessage>['props']) => (
        <ChatCustomView {...bubbleProps} userId={props.userId} />
      )}
    />
  );
};

type ChatCustomViewProps = Bubble<ChatMessage>['props'] & { userId: string };

const ChatCustomView = (props: ChatCustomViewProps) => {
  // console.log({ props });
  const message = props.currentMessage;
  const isMyMessage = message?.user?._id === props.userId;
  const colors = lightTheme.colors;

  return (
    <Col ph={8} pt={8} pb={4}>
      {!isMyMessage && (
        <Text fontSize={13} color={colors.grayDefault} mb={4}>
          {message?.sender?.name}
        </Text>
      )}
      {message?.type === ChatMessageTypes.IMAGE && <ChatMessageImage {...props} />}
      {message?.type === ChatMessageTypes.VIDEO && <ChatMessageVideo {...props} />}
      <Text color={isMyMessage ? colors.white : colors.black} fontSize={15}>
        {message?.message}
      </Text>
    </Col>
  );
};
