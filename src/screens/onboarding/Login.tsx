import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Col, Container, Row, Text, TextField } from '../../components';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { formFieldProps, formikProps } from '../../utils/form';
import { loginSchema } from '../../utils/validations';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DEBUG } from '../../../config';
import { Theme } from '../../types';
import { useStylesheet } from '../../hooks/useStylesheet';
import { OdinKeyboardAwareScrollView } from '../../components/ui/OdinKeyboardAwareScrollView.tsx';
import { FormContainer } from '../../components/ui/FormContainer.tsx';
import { useTheme } from '../../hooks/useTheme.ts';
import { loginUser } from '../../api/user.ts';
import { showToast } from '../../utils/toast.ts';
import { OnBoardingStackParamList } from './OnBoardingNavigator.tsx';
import { SocialLogin } from '../../components/layout/SocialLogin.tsx';
import {useFirebaseApi} from "../../utils/firebase/firebaseApi.ts";

type FormValues = {
  email: string;
  password: string;
};
type Props = NativeStackScreenProps<OnBoardingStackParamList, 'Login'>;

export const Login = ({ navigation }: Props) => {
  const { t } = useTranslation();
  const styles = useStylesheet(createStyles);
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();
  const { login } = useFirebaseApi()

  const { values, errors, setFieldError, setFieldValue, handleSubmit } = useFormik<FormValues>({
    initialValues: {
      email: DEBUG ? 'test1@gmail.com' : '',
      password: DEBUG ? 'adminadmin' : '',
    },
    ...formikProps,
    validationSchema: loginSchema,
    onSubmit: async val => {
      setLoading(true);
      try {
        await login(val.email, val.password);
        showToast(t('toasts.loginSuccessTitle'), t('toasts.loginSuccessMessage'), {
          type: 'success',
        });
        console.log({ loginData: val });
      } catch (e) {
        setLoading(false);
        showToast(t('toasts.loginErrorTitle'), t('toasts.loginErrorMessage'), {
          type: 'error',
        });
      }
    },
  });
  const fieldProps = formFieldProps(errors, values, setFieldError, setFieldValue);

  return (
    <Container>
      <OdinKeyboardAwareScrollView>
        {/*<Col alignItems={'center'}>*/}
        {/*  <Image source={LogoNoBg} style={{ width: '40%', height: 120 }} />*/}
        {/*</Col>*/}
        <FormContainer>
          <Col gap={20}>
            <Col alignItems={'center'}>
              <Text fontSize={24} fontWeight={'400'}>
                {t('login text')}
                <Text fontSize={24} fontWeight={'700'}>
                  {t('peetogether')}
                </Text>
              </Text>
            </Col>
            <TextField label={t('email')} autoCapitalize={'none'} type={'email'} {...fieldProps('email')} />
            <TextField label={t('password')} type={'password'} autoCapitalize={'none'} {...fieldProps('password')} />
          </Col>
          <Text
            mb={16}
            mt={4}
            variant={'Paragraph/X Small/Regular'}
            color={colors.obsidian}
            style={{ textDecorationLine: 'underline' }}
            onPress={() => navigation.navigate('ForgotPassword')}>
            {t('forgotPassword')}
          </Text>
        </FormContainer>
        <Button variant={'gradient'} text={t('login')} onPress={() => handleSubmit()} loading={loading} />
        <Row mv={18} alignItems={'center'} justifyContent={'space-between'}>
          <Col style={styles.divider} />
          <Text mh={12} color={colors.textPrimary} fontWeight={'400'} fontSize={14}>
            {t('or login with')}
          </Text>
          <Col style={styles.divider} />
        </Row>
        <SocialLogin />
        <Col mt={12} alignItems={'center'} onPress={() => navigation.navigate('Register')} hitSlop={4}>
          <Text color={colors.textSecondary} variant={'Paragraph/Small/Regular'}>
            {t('register text')}{' '}
            <Text color={colors.textSecondary} style={{ textDecorationLine: 'underline' }} variant={'Link/Small/SemiBold'}>
              {t('register')}
            </Text>
          </Text>
        </Col>
      </OdinKeyboardAwareScrollView>
    </Container>
  );
};

const createStyles = ({ colors, spacing, shapes }: Theme) =>
  StyleSheet.create({
    divider: {
      height: 1,
      flex: 1,
      backgroundColor: colors.textPrimary,
    },
  });
