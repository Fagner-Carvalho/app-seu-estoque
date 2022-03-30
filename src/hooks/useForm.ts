import React, { useState } from 'react';
import useValidationErrors, { UseValidationErrors } from './useValidationErrors';

export interface UseForm<S> {
  reset: () => void,
  values: S,
  setValue: (key: string, value: any) => void,
  setAll: React.Dispatch<React.SetStateAction<S>>,
  errors: UseValidationErrors,
  isValid: boolean,
  setFromChangeEvent: (arg0: any) => void,
  validate: (customValidationSchema?: any, valuesValidation?: any) => Promise<boolean>,
}

function useForm<S>(defaultValues: S, validationSchema?: any) {
  const validationErrors = useValidationErrors();
  const [values, setValues] = useState<S>(defaultValues || {} as S);

  const reset = () => setValues({ ...defaultValues });

  const setValue = (key: string, value: any) => {
    setValues((prevState: S) => ({
      ...prevState,
      [key]: value,
    }));
    validationErrors.setErrors(key, []);
  };

  const setFromChangeEvent = (event: any) => {
    if (event.target.name === undefined) {
      throw new Error('Wrong event');
    }

    setValue(event.target.name, event.target.value);
  };

  const validate = async (customValidationSchema?: any, valuesValidation?: any) => {
    const validation = customValidationSchema || validationSchema;
    if (validation === undefined) {
      throw new Error('Schema not defined');
    }
    try {
      await validation.validate(valuesValidation, {
        abortEarly: false,
      });
      return true;
    } catch (err: any) {
      validationErrors.setValidationError(err);
      return false;
    }
  };

  return {
    reset,
    values,
    setValue,
    setAll: setValues,
    errors: validationErrors.errors,
    isValid: !validationErrors.errors.hasAny,
    setFromChangeEvent,
    validate,
  };
}

export default useForm;
