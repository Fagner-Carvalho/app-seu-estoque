import { ValidationError } from 'yup';
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

export interface Errors {
  [key: string]: string[]
}

export interface UseValidationErrors {
  getFirst: (key: string) => string | undefined,
  hasAny: boolean,
  all: Errors,
}

const useValidationErrors = (defErrors?: ValidationError) => {
  const [validationError, setValidationError] = useState<ValidationError | undefined>(defErrors);
  const [handledErrors, setHandledErrors] = useState<Errors>({} as Errors);

  const groupErrors = useCallback((_validationError: ValidationError) => {
    if (_validationError === undefined) {
      return {};
    }
    return _validationError.inner.reduce((accErr: any, error) => {
      const path = error.path || 'unknown';
      accErr[path] = [
        ...accErr[path] || [],
        ...error.errors,
      ];
      return accErr;
    }, {});
  }, []);

  useEffect(() => {
    if (validationError !== undefined) {
      setHandledErrors(groupErrors(validationError));
    }
  }, [validationError, groupErrors]);

  const hasAny: boolean = useMemo(() => (
    Object.values(handledErrors).some((_errors: string[]) => _errors.length > 0)
  ), [handledErrors]);

  const getFirst = (path: string): string => {
    const capturedErrors = handledErrors[path];
    if (capturedErrors && capturedErrors.length > 0) {
      return capturedErrors[0];
    }
    return '';
  };

  const setErrors = (path: string, error: string[]) => (
    setHandledErrors((prevState) => ({ ...prevState, [path]: error }))
  );

  return {
    setValidationError,
    setErrors,
    errors: {
      all: handledErrors,
      getFirst,
      hasAny,
    },
  };
};

export default useValidationErrors;
