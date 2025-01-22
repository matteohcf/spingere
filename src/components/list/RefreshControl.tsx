import { RefreshControl as RNRefreshControl, RefreshControlProps } from 'react-native';

export const RefreshControl = ({ refreshing, ...rest }: RefreshControlProps) => {
  return <RNRefreshControl refreshing={refreshing} {...rest} />;
};
