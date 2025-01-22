import React, { useEffect } from 'react';
import { TextField, TextFieldProps } from '../../../components';
import { useUsernameValidation } from '../../../hooks/useUsernameValidation.ts';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

type UsernameFieldProps = TextFieldProps & {
  value: string | undefined;
  onChangeText: (value: string) => void;
  error?: string | undefined;
};

export const UsernameField: React.FC<UsernameFieldProps> = ({ value, onChangeText, error: formikError, ...textFieldProps }) => {
  const { isAvailable, isChecking, error: validationError, checkUsername } = useUsernameValidation();

  useEffect(() => {
    if (value) {
      checkUsername(value);
    }
  }, [value, checkUsername]);

  const iconRight = React.useMemo(() => {
    if (isChecking) {
      return ['far', 'spinner'] as IconProp;
    }
    if (isAvailable && !formikError) {
      return ['far', 'check-circle'] as IconProp;
    }
    if (validationError || formikError) {
      return ['far', 'times-circle'] as IconProp;
    }
    return undefined;
  }, [isChecking, isAvailable, validationError, formikError]);

  const displayError = validationError || formikError;

  return (
    <TextField
      {...textFieldProps}
      value={value}
      onChangeText={newValue => {
        onChangeText(newValue);
      }}
      error={displayError}
      iconRight={iconRight}
      showError={true}
      /*disabled={isChecking}*/
    />
  );
};
