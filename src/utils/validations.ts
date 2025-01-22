import * as yup from 'yup';
import { t } from 'i18next';

export const REGEX = {
  EMAIL: /^\S+@\S+\.\S+$/,
  PHONE:
    /\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&+.-])[A-Za-z\d@#$!%*?&+.-]{8,}$/,
};

const errors = {
  required: t('required field'),
  invalidEmail: t('invalid email'),
  passwordMinLength: t('validations.passwordMinLength'),
  usernameMinLength: t('validations.usernameMinLength'),
  passwordMustBeTheSame: t('validations.passwordMustBeTheSame'),
  invalidPhone: t('validations.invalidPhone'),
  usernameInvalidCharacters: t('validations.usernameInvalidCharacters'),
  usernameNoConsecutiveDots: t('validations.usernameNoConsecutiveDots'),
  usernameNoConsecutiveUnderscores: t('validations.usernameNoConsecutiveUnderscores'),
  usernameStartEndAlphanumeric: t('validations.usernameStartEndAlphanumeric'),
  usernameMaxLength: t('validations.usernameMaxLength'),
  invalidDate: t('validations.invalidDate'),
};

const requiredField = yup.string().required(errors.required);

export const rules = {
  requiredField,
};

export const loginSchema = yup.object().shape({
  email: requiredField,
  password: requiredField,
});

export const profileMyDataSchema = yup.object().shape({
  username: requiredField,
  name: requiredField,
  surname: requiredField,
  birthDate: yup.date().required(errors.required).min(new Date('1900-01-01'), errors.invalidDate).max(new Date(), errors.invalidDate),
  sex: requiredField,
  email: yup.string().required(errors.required).email(errors.invalidEmail),
});

export const reportSchema = yup.object().shape({
  name: requiredField,
  surname: requiredField,
  reason: requiredField,
});

export const forgotPasswordSchema = yup.object().shape({
  email: yup.string().required(errors.required).email(errors.invalidEmail),
});

export const changePasswordSchema = yup.object().shape({
  password: yup.string().required(errors.required).min(6, errors.passwordMinLength),
  confirmPassword: yup
    .string()
    .required(errors.required)
    .min(6, errors.passwordMinLength)
    .oneOf([yup.ref('password')], errors.passwordMustBeTheSame),
});

export const registerSchema = yup.object().shape({
  username: requiredField,
  name: requiredField,
  surname: requiredField,
  email: yup.string().required(errors.required).email(errors.invalidEmail),
  birthDate: yup.date().min(new Date('1900-01-01'), errors.invalidDate).max(new Date(), errors.invalidDate),
  password: yup.string().required(errors.required).min(6, errors.passwordMinLength),
  repeatPassword: yup
    .string()
    .required(errors.required)
    .min(6, errors.passwordMinLength)
    .oneOf([yup.ref('password')], errors.passwordMustBeTheSame),
});

export const peeDetailsSchema = yup.object().shape({
});

export const profileSchema = yup.object().shape({
  firstname: requiredField,
  lastname: requiredField,
  telephoneNumber: requiredField,
});

export const ratedReviewsSchema = yup.object().shape({
  title: requiredField,
  message: requiredField,
});

export const billingInfoSchema = yup.object().shape({
  businessName: requiredField,
  country: requiredField,
  vatCode: requiredField,
  address: requiredField,
  stateLabel: requiredField,
  city: requiredField,
  province: requiredField,
  zipCode: requiredField,
  type: requiredField,
  fiscalCode: requiredField,
  // pecEmail: requiredField,
  // identifyCode: requiredField,
});

export const chargerTagSchema = yup.object().shape({
  state: requiredField,
  address: requiredField,
  city: requiredField,
  province: requiredField,
  cap: requiredField,
});

export const completeRegisterSchema = yup.object().shape({
  firstname: requiredField,
  lastname: requiredField,
  telephoneNumber: requiredField,
  email: yup.string().required(errors.required).email(errors.invalidEmail),
});
