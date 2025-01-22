import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/pro-regular-svg-icons';
import { fal } from '@fortawesome/pro-light-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { AppNavigator } from './src/core/navigation/AppNavigator';
import { ToastProvider } from './src/core/providers/ToastProvider';
import { QueryProvider } from './src/core/providers/QueryProvider';
import 'react-native-gesture-handler';
import { Modal } from './src/components/modal/Modal';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TranslationProvider } from './src/i18n/translationProvider.tsx';
import { NavigatorProvider } from './src/core/providers/NavigatorProvider.tsx';
import { FloatingModal } from './src/components/floatingModal/FloatingModal.tsx';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { IS_ANDROID } from './src/utils/platform.ts';
import { Text } from 'react-native';

library.add(far, fas, fab, fal);
const androidWebClientId = '433933312208-2ibtn5hktjurub408sd1s3negvtt5jgc.apps.googleusercontent.com';
const iosWebClientId = '433933312208-4r09veu4as2oq7bu9o4bv60i7cqtcgi4.apps.googleusercontent.com';
try {
  GoogleSignin.configure({
    webClientId: IS_ANDROID ? androidWebClientId : iosWebClientId,
    offlineAccess: true,
    scopes: ['https://www.googleapis.com/auth/wallet', 'https://www.googleapis.com/auth/wallet_object.issuer'],
  });
} catch (e) {
  console.log(e);
}

// @ts-ignore
Text.defaultProps = Text.defaultProps || {};
// @ts-ignore
Text.defaultProps.allowFontScaling = false;

export const App = () => {
  return (
    <Provider store={store}>
      <QueryProvider>
        <SafeAreaProvider>
          <GestureHandlerRootView>
            <TranslationProvider>
              <NavigatorProvider>
                <BottomSheetModalProvider>
                  <AppNavigator />
                  <ToastProvider />
                  <Modal />
                  <FloatingModal />
                </BottomSheetModalProvider>
              </NavigatorProvider>
            </TranslationProvider>
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </QueryProvider>
    </Provider>
  );
};
