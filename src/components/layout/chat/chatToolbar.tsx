import React from 'react';
import { ChatMessage } from '../../../types/chat';
import { Icon, Loader, Row } from '../../ui';
import { lightTheme } from '../../../constant';
import { InputToolbar, Send } from 'react-native-gifted-chat';
import { InputToolbarProps } from 'react-native-gifted-chat/lib/InputToolbar';

type ChatToolbarProps = InputToolbarProps<ChatMessage> & {
  loading: boolean;
  onPressPickImage: () => void;
};

export const ChatToolbar = ({ loading, onPressPickImage, ...props }: ChatToolbarProps) => {
  const colors = lightTheme.colors;

  return (
    <InputToolbar
      {...props}
      multiline={true}
      containerStyle={{
        paddingHorizontal: 10,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
      }}
      textInputStyle={{
        color: colors.black,
      }}
      renderSend={props => (
        <Row gap-10 alignItems={'center'}>
          <Row onPress={onPressPickImage}>
            <Icon icon={['fas', 'camera']} size={25} color={colors.primary} />
          </Row>
          <Send
            {...props}
            text={props.text || ' '}
            alwaysShowSend
            // disabled={loading}
            containerStyle={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingRight: 10,
            }}>
            {!loading ? (
              <Icon color={colors.primary} size={25} icon={['fas', 'paper-plane']} />
            ) : (
              <Loader size={'small'} w={35} />
            )}
          </Send>
        </Row>
      )}
    />
  );
};
