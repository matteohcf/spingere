import { ActivityIndicator, Image, ImageProps, Pressable, StyleSheet } from 'react-native';
import { useState } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { handleSocialLogin, LoginResponse } from '../../api/user.ts';
import { getAxiosErrorInfo } from '../../utils';
import { showToast } from '../../utils/toast';
import { useTranslation } from 'react-i18next';
import { Platform } from 'react-native';
import { Theme, User } from '../../types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';
import { userActions } from '../../store/user';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import { IS_IOS, SHADOW, shapes } from '../../constant';
import { useStylesheet } from '../../hooks/useStylesheet.ts';
import { Button, Col, Row, Text } from '../ui';
import { AppleIcon, GoogleIcon } from '../../assets';
import { CONFIG } from '../../../config';

enum SocialLoginType {
  Apple = 'apple',
  Google = 'google',
  Facebook = 'facebook',
}

const isAndroid = Platform.OS === 'android';
const androidWebClientId = CONFIG.ANDROID_WEB_CLIENT_ID;
const iosWebClientId = CONFIG.IOS_WEB_CLIENT_ID;
try {
  GoogleSignin.configure({
    webClientId: isAndroid ? androidWebClientId : iosWebClientId,
  });
} catch (e) {
  console.log(e);
}

const isUserProfileCompleted = (user: User) => !!user.email && !!user.name && !!user.surname && !!user.phoneNumber && !!user.birthDate;

const SocialLoginButton = ({ source, loading, onPress }: ImageProps & { loading: boolean; onPress: () => void }) => {
  const styles = useStylesheet(createStyles);
  return (
    <Col>
      <Col alignItems={'center'} justifyContent={'center'} style={styles.button} onPress={onPress}>
        {loading ? <ActivityIndicator /> : <Image source={source} style={styles.image} />}
      </Col>
    </Col>
  );
};

export const SocialLogin = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loading, setLoading] = useState<SocialLoginType>();
  const styles = useStylesheet(createStyles);

  const handleSocialLoginError = (error: any) => {
    setLoading(undefined);
    showToast(t('toasts.loginErrorTitle'), t('toasts.loginErrorMessage'), { type: 'error' });
  };

  const handleSocialLoginSuccess = async (socialLoginResponse: LoginResponse) => {
    console.debug({ socialLoginResponse });
    // const isCompleted = isUserProfileCompleted(socialLoginResponse.user);
    navigation.navigate('Home');
    dispatch(userActions.setUserToken(socialLoginResponse.token));
    dispatch(userActions.setUserDetail(socialLoginResponse.user));
    setLoading(undefined);
  };

  const handleAppleLogin = async () => {
    try {
      setLoading(SocialLoginType.Apple);
      // Start the sign-in request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        // As per the FAQ of react-native-apple-authentication, the name should come first in the following array.
        // See: https://github.com/invertase/react-native-apple-authentication#faqs
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });

      console.debug({ appleAuthRequestResponse });

      // Ensure Apple returned a user identityToken
      if (!appleAuthRequestResponse.identityToken) {
        return Promise.reject('Apple Sign-In failed - no identify token returned');
      }

      // Create a Firebase credential from the response
      const { identityToken, nonce } = appleAuthRequestResponse;
      const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);
      // Sign the user in with the credential
      const {user} = await auth().signInWithCredential(appleCredential);
      const userToken = await auth().currentUser?.getIdToken();
      if (!userToken) {
        return Promise.reject('Apple Sign-In failed - no user token returned');
      }
      // const { data: socialLoginResponse } = await handleSocialLogin({
      //   token: userToken,
      //   provider: SocialLoginType.Apple,
      // });
      await handleSocialLoginSuccess({token: userToken, user});
    } catch (e) {
      console.debug({ e });
      handleSocialLoginError(e);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(SocialLoginType.Google);
      await GoogleSignin.hasPlayServices();
      const { idToken, user } = await GoogleSignin.signIn();
      const { token } = auth.GoogleAuthProvider.credential(idToken);
      // const { data: socialLoginResponse } = await handleSocialLogin({
      //   token,
      //   provider: SocialLoginType.Google,
      // });
      await handleSocialLoginSuccess({token, user});
    } catch (e) {
      console.log({ e });
      handleSocialLoginError(e);
    }
  };

  return (
    <Col style={styles.container}>
      {/*{IS_IOS && <SocialLoginButton source={AppleIcon} onPress={handleAppleLogin} loading={loading === SocialLoginType.Apple} />}
      <SocialLoginButton source={GoogleIcon} onPress={handleGoogleLogin} loading={loading === SocialLoginType.Google} />*/}
      {IS_IOS && (
        <Button
          icon={['fab', 'apple']}
          iconSize={30}
          text={t('apple login')}
          variant={'secondary'}
          loading={loading === SocialLoginType.Apple}
          onPress={handleAppleLogin}
        />
      )}
      <Button
        icon={['fab', 'google']}
        iconSize={25}
        text={t('google login')}
        variant={'secondary'}
        loading={loading === SocialLoginType.Google}
        onPress={handleGoogleLogin}
      />
    </Col>
  );
};

const createStyles = ({ colors }: Theme) =>
  StyleSheet.create({
    container: {
      marginBottom: 4,
      gap: 16,
    },
    image: {
      // height: 30,
      // width: 30,
    },
  });
