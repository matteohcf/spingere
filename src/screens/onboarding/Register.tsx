import React, { useState } from 'react';
import { Linking, StyleSheet } from 'react-native';
import { Button, Checkbox, Col, Container, Row, Text, TextField } from '../../components';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { formFieldProps, formikProps } from '../../utils/form';
import { registerSchema } from '../../utils/validations';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Theme, UserSexType } from '../../types';
import { useStylesheet } from '../../hooks/useStylesheet';
import { OdinKeyboardAwareScrollView } from '../../components/ui/OdinKeyboardAwareScrollView.tsx';
import { FormContainer } from '../../components/ui/FormContainer.tsx';
import { useTheme } from '../../hooks/useTheme.ts';
import { showToast } from '../../utils/toast.ts';
import { OnBoardingStackParamList } from './OnBoardingNavigator.tsx';
import { SocialLogin } from '../../components/layout/SocialLogin.tsx';
import { CONFIG, DEBUG } from '../../../config';
import { useUsernameValidation } from '../../hooks/useUsernameValidation.ts';
import { useFirebaseApi } from '../../utils/firebase/firebaseApi.ts';

type FormValues = {
  email: string;
  password: string;
  repeatPassword: string;
};
type Props = NativeStackScreenProps<OnBoardingStackParamList, 'Register'>;

export const Register = ({ navigation }: Props) => {
  const { t } = useTranslation();
  const styles = useStylesheet(createStyles);
  const [loading, setLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);
  const { colors } = useTheme();
  const { register } = useFirebaseApi();

  const { values, errors, setFieldError, setFieldValue, handleSubmit } = useFormik<FormValues>({
    initialValues: {
      email: DEBUG ? 'test1@gmail.com' : '',
      password: DEBUG ? 'adminadmin' : '',
      repeatPassword: DEBUG ? 'adminadmin' : '',
    },
    ...formikProps,
    validationSchema: registerSchema,
    onSubmit: async val => {
      setLoading(true);
      try {
        const res = await register(val.email, val.password);
        console.log('registerRes', res);
        navigation.navigate('Home');
        showToast(t('toasts.registerSuccessTitle'), t('toasts.registerSuccessMessage'), {
          type: 'success',
        });
      } catch (e) {
        setLoading(false);
        showToast(t('toasts.registerErrorTitle'), t('toasts.registerErrorMessage'), {
          type: 'error',
        });
      }
    },
  });
  const fieldProps = formFieldProps(errors, values, setFieldError, setFieldValue);

  const onPressOpenTerms = () => {
    Linking.openURL(CONFIG.PRIVACY_AND_POLICY_URL);
  };

  return (
    <Container>
      <OdinKeyboardAwareScrollView>
        {/*<Col alignItems={'center'}>*/}
        {/*  <Image source={LogoNoBg} style={{ width: '40%', height: 120 }} />*/}
        {/*</Col>*/}
        <FormContainer>
          <Col gap={20} pb={20}>
            <Col alignItems={'center'}>
              <Text fontSize={24} fontWeight={'400'}>
                {t('register text1')}
                <Text fontSize={24} fontWeight={'700'}>
                  {t('peetogether')}
                </Text>
              </Text>
            </Col>
            <TextField label={t('email')} autoCapitalize={'none'} type={'email'} {...fieldProps('email')} />
            <TextField label={t('password')} type={'password'} autoCapitalize={'none'} {...fieldProps('password')} />
            <TextField label={t('repeatPassword')} type={'password'} autoCapitalize={'none'} {...fieldProps('repeatPassword')} />
          </Col>
          <Row>
            <Col>
              <Checkbox br={4} checked={acceptedTerms} onCheck={() => setAcceptedTerms(!acceptedTerms)} />
            </Col>
            <Col justifyContent={'center'} ml={8} gap={2} flex={1} onPress={onPressOpenTerms}>
              <Text fontSize={14} color={'textPrimary'} textDecorationLine={'underline'}>
                {t('privacy policy')}
              </Text>
              <Text fontSize={14} color={'textSecondary'}>
                {t('privacy policy text')}
              </Text>
            </Col>
          </Row>
        </FormContainer>
        <Button variant={'gradient'} text={t('register')} onPress={() => handleSubmit()} loading={loading} />
        <Row mv={18} alignItems={'center'} justifyContent={'space-between'}>
          <Col style={styles.divider} />
          <Text mh={12} color={colors.textPrimary} fontWeight={'400'} fontSize={14}>
            {t('or register with')}
          </Text>
          <Col style={styles.divider} />
        </Row>
        <SocialLogin />
        <Col mt={12} alignItems={'center'} onPress={() => navigation.navigate('Login')} hitSlop={4}>
          <Text color={colors.textSecondary} variant={'Paragraph/Small/Regular'}>
            {t('already have account')}{' '}
            <Text color={colors.textSecondary} style={{ textDecorationLine: 'underline' }} variant={'Link/Small/SemiBold'}>
              {t('login')}
            </Text>
          </Text>
        </Col>
      </OdinKeyboardAwareScrollView>
    </Container>
  );
};

const createStyles = ({ colors, spacing }: Theme) =>
  StyleSheet.create({
    divider: {
      height: 1,
      flex: 1,
      backgroundColor: colors.textPrimary,
    },
  });
