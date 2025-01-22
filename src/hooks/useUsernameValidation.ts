import { useState, useCallback } from 'react';
import debounce from 'lodash/debounce';
import { t } from 'i18next';
import * as yup from 'yup';
import { checkUsernameAvailability } from '../api/user.ts';
import { useSelector } from 'react-redux';
import { userSelectors } from '../store/user.ts';

const usernameSchema = yup
  .string()
  .required(t('validations.required'))
  .min(5, t('validations.usernameMinLength'))
  .max(15, t('validations.usernameMaxLength'))
  .matches(/^[a-zA-Z0-9._]+$/, t('validations.usernameInvalidCharacters'))
  .test('no-consecutive-dots', t('validations.usernameNoConsecutiveDots'), value => !(value && /\.{2,}/.test(value)))
  .test('no-consecutive-underscores', t('validations.usernameNoConsecutiveUnderscores'), value => !(value && /_{2,}/.test(value)))
  .test('start-alphanumeric', t('validations.usernameNoSpecialStart'), value => !(value && /^[._]/.test(value)))
  .test('end-alphanumeric', t('validations.usernameNoSpecialEnd'), value => !(value && /[._]$/.test(value)))
  .test('start-end-alphanumeric', t('validations.usernameStartEndAlphanumeric'), value => (value ? /^[a-zA-Z0-9].*[a-zA-Z0-9]$/.test(value) : true));

interface ValidationState {
  isAvailable: boolean;
  isChecking: boolean;
  error: string | null;
  lastCheckedUsername: string;
}

export const useUsernameValidation = () => {
  const [validationState, setValidationState] = useState<ValidationState>({
    isAvailable: false,
    isChecking: false,
    error: null,
    lastCheckedUsername: '',
  });

  const isLogged = useSelector(userSelectors.isLogged);
  const userData = useSelector(userSelectors.detail);

  const validateWithYup = async (username: string): Promise<string | null> => {
    try {
      await usernameSchema.validate(username);
      return null;
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        return error.message;
      }
      return t('validations.genericError');
    }
  };

  const checkUsername = useCallback(
    debounce(async (username: string) => {
      if (isLogged && userData?.username === username) {
        setValidationState(prev => ({
          ...prev,
          isAvailable: true,
          error: null,
          lastCheckedUsername: username,
        }));
        return;
      }

      if (!username) {
        setValidationState(prev => ({
          ...prev,
          isAvailable: false,
          error: t('validations.required'),
          lastCheckedUsername: '',
        }));
        return;
      }

      const yupError = await validateWithYup(username);
      if (yupError) {
        setValidationState(prev => ({
          ...prev,
          isAvailable: false,
          error: yupError,
          lastCheckedUsername: '',
        }));
        return;
      }

      setValidationState(prev => ({ ...prev, isChecking: true }));

      try {
        await checkUsernameAvailability(username);
        setValidationState(prev => ({
          ...prev,
          isAvailable: true,
          error: null,
          lastCheckedUsername: username,
          isChecking: false,
        }));
      } catch (e) {
        setValidationState(prev => ({
          ...prev,
          isAvailable: false,
          error: t('validations.usernameNotAvailable'),
          lastCheckedUsername: '',
          isChecking: false,
        }));
      }
    }, 500),
    [isLogged, userData?.username],
  );

  const validateForSubmit = async (username: string): Promise<boolean> => {
    if (isLogged && userData?.username === username) {
      return true;
    }

    if (username === validationState.lastCheckedUsername && validationState.isAvailable) {
      return true;
    }

    const yupError = await validateWithYup(username);
    if (yupError) {
      setValidationState(prev => ({
        ...prev,
        isAvailable: false,
        error: yupError,
        lastCheckedUsername: '',
      }));
      return false;
    }

    try {
      await checkUsernameAvailability(username);
      setValidationState(prev => ({
        ...prev,
        isAvailable: true,
        error: null,
        lastCheckedUsername: username,
      }));
      return true;
    } catch (e) {
      setValidationState(prev => ({
        ...prev,
        isAvailable: false,
        error: t('validations.usernameNotAvailable'),
        lastCheckedUsername: '',
      }));
      return false;
    }
  };

  return {
    ...validationState,
    checkUsername,
    validateForSubmit,
  };
};
