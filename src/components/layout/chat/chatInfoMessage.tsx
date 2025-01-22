import React from 'react';
import Bubble from 'react-native-gifted-chat/lib/Bubble';
import { Row, Text } from '../../ui';
import { useTheme } from '../../../hooks/useTheme';
import { ChatMessage } from '../../../types/chat';
import { WIDTH_DEVICE } from '../../../constant';

export const ChatInfoMessage = (props: Bubble<ChatMessage>['props']) => {
  const { colors } = useTheme();
  const message = props.currentMessage;
  console.log({ props, message });

  return (
    <Row pr={10} w={WIDTH_DEVICE} justifyContent={'center'} style={{ opacity: 0.5 }}>
      <Row ph={6} pv={3} bgColor={colors.primaryLight} br={5}>
        <Text color={colors.white}>{message?.text}</Text>
      </Row>
    </Row>
  );
};
