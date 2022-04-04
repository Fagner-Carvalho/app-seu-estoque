import * as yup from 'yup';

export const wrapValidation: any = (object: any) => yup.object().shape(object);

export const USER_FORM = {
  VALUES: {
    name: '',
    email: '',
    password: '',
  },
  VALIDATION: {
    name: yup.string().required('Este campo é obrigatório.'),
    email: yup.string().email('Email inválido!').required('Este campo é obrigatório.'),
    password: yup.string().required('Este campo é obrigatório.'),
  },
};

export const FORM_VALUES = {
  ...USER_FORM.VALUES,
};

export const FORM_VALIDATION = wrapValidation({
  ...USER_FORM.VALIDATION,
});
