import React, { useState } from 'react';
import { Button, Col, Container, TextField } from '../../components';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootTabParamList, SharedStackParamList } from '../../core/navigation/RootNavigator.tsx';
import { StyleSheet } from 'react-native';
import { Theme, UserSexType } from '../../types';
import { useStylesheet } from '../../hooks/useStylesheet.ts';
import { useTranslation } from 'react-i18next';
import { updateMe } from '../../api/user.ts';
import { useFormik } from 'formik';
import { formFieldProps, formikProps } from '../../utils/form.ts';
import { profileMyDataSchema } from '../../utils/validations.ts';
import { useSelector } from 'react-redux';
import { userSelectors } from '../../store/user.ts';
import { OdinKeyboardAwareScrollView } from '../../components/ui/OdinKeyboardAwareScrollView.tsx';
import { RadioButtonGroup } from '../../components/ui/RadioButtonGroup.tsx';
import { UsernameField } from '../onboarding/components/UsernameField.tsx';
import { useUsernameValidation } from '../../hooks/useUsernameValidation.ts';

type FormValues = {
  username: string;
  name: string;
  surname: string;
  email: string;
  birthDate: string;
  sex: UserSexType | undefined;
};
type Props = NativeStackScreenProps<SharedStackParamList, 'ProfileMyData'>;

export const ProfileMyData = ({ navigation }: Props) => {
  const { t } = useTranslation();
  const styles = useStylesheet(createStyles);
  const userData = useSelector(userSelectors.detail);
  const [loading, setLoading] = useState(false);
  const usernameValidation = useUsernameValidation();

  const sexOptions = [
    { label: t('male'), value: UserSexType.MALE },
    { label: t('female'), value: UserSexType.FEMALE },
  ];

  const { values, errors, setFieldError, setFieldValue, handleSubmit } = useFormik<FormValues>({
    initialValues: {
      username: userData?.username || '',
      name: userData?.name || '',
      surname: userData?.surname || '',
      email: userData?.email || '',
      birthDate: userData?.birthDate || '',
      sex: userData?.sex || undefined,
    },
    ...formikProps,
    validationSchema: profileMyDataSchema,
    onSubmit: async val => {
      const isUsernameValid = await usernameValidation.validateForSubmit(val.username);
      if (!isUsernameValid) {
        setFieldError('username', usernameValidation.error || '');
        return;
      }
      setLoading(true);
      try {
        await updateMe(val);
        navigation.pop();
      } catch (e) {
        setLoading(false);
      }
    },
  });

  const fieldProps = formFieldProps(errors, values, setFieldError, setFieldValue);

  return (
    <Container>
      <OdinKeyboardAwareScrollView style={styles.contentContainerStyle}>
        <Col br={18} p={12} gap={16}>
          <UsernameField label={t('username')} type={'text'} autoCapitalize={'none'} {...fieldProps('username')} />
          <TextField label={t('name')} type={'text'} {...fieldProps('name')} />
          <TextField label={t('surname')} type={'text'} {...fieldProps('surname')} />
          <TextField label={t('email')} autoCapitalize={'none'} disabled={true} type={'email'} {...fieldProps('email')} />
          <TextField label={t('birthDate')} type={'date'} {...fieldProps('birthDate')} />
          <RadioButtonGroup
            label={t('sex')}
            options={sexOptions}
            value={values.sex}
            onChange={value => {
              setFieldValue('sex', value);
              setFieldError('sex', '');
            }}
            {...fieldProps('sex')}
          />
          <Button mt={8} onPress={() => handleSubmit()} loading={loading} text={t('save')} />
        </Col>
      </OdinKeyboardAwareScrollView>
    </Container>
  );
};

const createStyles = ({ spacing }: Theme) =>
  StyleSheet.create({
    contentContainerStyle: {
      paddingTop: spacing.screenVertical,
    },
  });
