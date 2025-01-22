import Toast from 'react-native-toast-message';

type Config = {
  visibilityTime?: number;
  type: 'success' | 'info' | 'error' | 'warning';
  onPress?: () => void;
};

export const showToast = (title: string, text: string, { visibilityTime, type, onPress }: Config) => {
  Toast.show({
    type: type || 'success',
    text1: title,
    text2: text,
    autoHide: true,
    visibilityTime: visibilityTime,
    onPress: onPress,
  });
};

export const hideToast = () => {
  Toast.hide();
};
