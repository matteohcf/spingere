import { FormikErrors } from 'formik/dist/types';

export const formFieldProps =
  <T>(
    errors: FormikErrors<T>,
    values: T,
    setFieldError?: CallableFunction,
    setFieldValue?: CallableFunction,
  ) =>
  (fieldName: keyof T) => {
    const onChangeText = (value: any) => {
      setFieldValue?.(fieldName, value);
      setFieldError?.(fieldName, '');
    };

    return {
      value: values[fieldName],
      error: errors[fieldName],
      onChangeText: onChangeText,
    };
  };

export const formikProps = {
  validateOnChange: false,
  validateOnBlur: false,
  validateOnMount: false,
  enableReinitialize: true,
};
